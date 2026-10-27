import React, { useState } from 'react';
import { 
  CreditCard, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  AlertCircle, 
  Trash2, 
  Lock, 
  Printer, 
  Sparkles, 
  MessageSquare,
  Building,
  Check,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { UserProgress, SavedDebitCard, ConsultancyBooking } from '../types';
import { saveDebitCard, removeDebitCard, addConsultancyBooking, updateUserContact } from '../utils/storage';

interface ConsultancyViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

interface PackageOption {
  id: 'eligibility_check' | 'comprehensive_review' | 'express_advisory';
  title: string;
  duration: string;
  priceNZD: number;
  popular?: boolean;
  description: string;
  features: string[];
}

const PACKAGES: PackageOption[] = [
  {
    id: 'eligibility_check',
    title: 'Eligibility & Presence Assessment',
    duration: '30 Minutes',
    priceNZD: 65,
    description: 'Verify your statutory presence requirements (1,350 days rule), character criteria, and initial application paperwork.',
    features: [
      'Physical presence calculation & travel gap audit',
      'Good character & minor conviction review',
      'Document checklist verification (Passports, Birth Cert)',
      'Direct phone or video call with a Licensed Adviser'
    ]
  },
  {
    id: 'comprehensive_review',
    title: 'Comprehensive Case & Special Grounds Review',
    duration: '60 Minutes',
    popular: true,
    priceNZD: 120,
    description: 'In-depth file review for complex applications, ministerial discretion, prolonged overseas absences, or family applications.',
    features: [
      'Detailed audit of complex absences & waiver submissions',
      'Child citizenship & dual-nationality implications',
      'Ceremony declaration & interview prep guidance',
      'Written action summary report provided post-session',
      'Priority follow-up email support for 14 days'
    ]
  },
  {
    id: 'express_advisory',
    title: 'Express 24-Hour Urgent Advisory',
    duration: '45 Minutes (Fast-Track)',
    priceNZD: 185,
    description: 'Fast-track consultation scheduled within 24 business hours for urgent deadline responses or imminent DIA requests.',
    features: [
      'Guaranteed consultation slot within 24 hours',
      'Senior Barrister or Specialist LIA consultation',
      'Direct WhatsApp & phone hotline access',
      'Emergency response draft for DIA inquiries',
      'Full documentation audit'
    ]
  }
];

const ADVISERS = [
  {
    name: 'Aroha Henderson, LLB',
    license: 'LIA #201800291',
    role: 'Senior Citizenship & Constitutional Law Specialist',
    location: 'Wellington & Online',
    rating: '4.98 / 5.0 (310+ reviews)'
  },
  {
    name: 'David Macfarlane, BA/LLB',
    license: 'LIA #201600845',
    role: 'Principal Immigration & Civic Law Counsel',
    location: 'Auckland CBD & Online',
    rating: '4.96 / 5.0 (420+ reviews)'
  }
];

const COUNTRY_CODES = [
  { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+1', name: 'USA / Canada', flag: '🇺🇸' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
  { code: '+63', name: 'Philippines', flag: '🇵🇭' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
];

export const ConsultancyView: React.FC<ConsultancyViewProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [selectedPackageId, setSelectedPackageId] = useState<'eligibility_check' | 'comprehensive_review' | 'express_advisory'>('eligibility_check');
  const [selectedAdviserIdx, setSelectedAdviserIdx] = useState(0);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 AM NZST (Morning)');
  
  // Client Contact Details
  const [countryCode, setCountryCode] = useState('+64');
  const [phoneNumber, setPhoneNumber] = useState(progress.userPhone ? progress.userPhone.replace(/^\+\d+\s*/, '') : '');
  const [clientName, setClientName] = useState(progress.userName && progress.userName !== 'Aotearoa Candidate' ? progress.userName : '');
  const [clientEmail, setClientEmail] = useState(progress.userEmail || '');
  const [consultationNotes, setConsultationNotes] = useState('');

  // Payment Options State
  const [paymentMethod, setPaymentMethod] = useState<'debit_card' | 'credit_card' | 'poli_pay'>('debit_card');
  const [useSavedCard, setUseSavedCard] = useState<boolean>(!!progress.savedDebitCard);
  
  // Debit Card Fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState(clientName || '');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [saveCardForFuture, setSaveCardForFuture] = useState(false);

  // Flow State
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeConfirmation, setActiveConfirmation] = useState<ConsultancyBooking | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const selectedPackage = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];
  const selectedAdviser = ADVISERS[selectedAdviserIdx];

  // Debit Card auto-formatting
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setExpiry(raw);
    }
  };

  const handleCvcChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    setCvc(raw);
  };

  const handleRemoveSavedCard = () => {
    const updated = removeDebitCard();
    onUpdateProgress(updated);
    setUseSavedCard(false);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const fullPhone = `${countryCode} ${phoneNumber.trim()}`;
    if (!phoneNumber.trim()) {
      setFormError('Please provide your contact phone number so our adviser can call you.');
      return;
    }
    if (!clientName.trim()) {
      setFormError('Please provide your full legal name for the consultation record.');
      return;
    }

    if (paymentMethod === 'debit_card' && !useSavedCard) {
      const cleanDigits = cardNumber.replace(/\s/g, '');
      if (cleanDigits.length < 15) {
        setFormError('Please enter a valid 16-digit Debit Card number.');
        return;
      }
      if (expiry.length < 5) {
        setFormError('Please enter a valid card expiry date (MM/YY).');
        return;
      }
      if (cvc.length < 3) {
        setFormError('Please enter the 3 or 4-digit security code (CVC) from the back of your card.');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate bank authorization & appointment booking
    window.setTimeout(() => {
      let last4 = '4242';
      let brand: 'visa' | 'mastercard' | 'eftpos' | 'generic' = 'visa';

      if (paymentMethod === 'debit_card') {
        if (useSavedCard && progress.savedDebitCard) {
          last4 = progress.savedDebitCard.last4;
          brand = progress.savedDebitCard.cardBrand;
        } else {
          const raw = cardNumber.replace(/\s/g, '');
          last4 = raw.slice(-4) || '8910';
          if (raw.startsWith('4')) brand = 'visa';
          else if (raw.startsWith('5')) brand = 'mastercard';
          else brand = 'eftpos';

          if (saveCardForFuture) {
            const [mm, yy] = expiry.split('/');
            const newCard: SavedDebitCard = {
              last4,
              cardBrand: brand,
              cardholderName: cardholderName || clientName,
              expiryMonth: mm || '12',
              expiryYear: yy || '28',
              cardType: 'Debit Card'
            };
            saveDebitCard(newCard);
          }
        }
      }

      const bookingRef = `NZCIT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newBooking: ConsultancyBooking = {
        id: `book-${Date.now()}`,
        bookingRef,
        consultantName: selectedAdviser.name,
        consultantLicenseNo: selectedAdviser.license,
        consultationType: selectedPackage.id,
        consultationTitle: selectedPackage.title,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        clientName: clientName.trim(),
        clientPhone: fullPhone,
        clientEmail: clientEmail.trim(),
        notes: consultationNotes.trim(),
        amountNZD: selectedPackage.priceNZD,
        paymentMethod,
        cardLast4: last4,
        paidAt: new Date().toISOString(),
        status: 'confirmed'
      };

      const updatedProgress = addConsultancyBooking(newBooking);
      onUpdateProgress(updatedProgress);

      setIsProcessing(false);
      setActiveConfirmation(newBooking);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Banner: Professional Advisory Chambers & Direct Contact Helpline */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100 dark:border-stone-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-800 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>LICENSED IMMIGRATION ADVISERS & LEGAL CONSULTANTS</span>
              <span aria-hidden="true">·</span>
              <span>LIA REGISTRY VERIFIED</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Professional Citizenship Consultancy
            </h1>
            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Book one-on-one legal and procedural guidance with certified New Zealand citizenship specialists. Have your physical presence audited, waivers reviewed, and citizenship ceremony declaration prepared.
            </p>
          </div>

          {/* Quick Direct Helpline Badge */}
          <div className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 rounded-2xl p-4 sm:p-5 shrink-0 space-y-2.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 block">
              Consultancy Helpline & Chambers
            </span>
            <div className="space-y-1.5 text-xs text-stone-800 dark:text-stone-200">
              <a 
                href="tel:0800692448" 
                className="flex items-center gap-2 font-mono font-semibold text-emerald-900 dark:text-emerald-400 hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>0800 692 448 (NZ Freephone)</span>
              </a>
              <div className="flex items-center gap-2 font-mono text-stone-600 dark:text-stone-300 text-[11px]">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>+64 9 889 2410 (Intl Hotline)</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-stone-600 dark:text-stone-300 text-[11px]">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp: +64 21 893 2410</span>
              </div>
            </div>
            <div className="pt-1 text-[10px] text-stone-400 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Advisers Online · Mon–Fri 8:30 AM–5:30 PM NZST</span>
            </div>
          </div>
        </div>

        {/* Chambers Locations Strip */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-stone-400 shrink-0" />
            <span><strong>Auckland:</strong> Level 14, 45 Queen St</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-stone-400 shrink-0" />
            <span><strong>Wellington:</strong> 110 Lambton Quay</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-stone-400 shrink-0" />
            <span><strong>Email:</strong> advisory@citizenshipprep.nz</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal if just completed */}
      {activeConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                Booking Confirmed & Paid
              </span>
              <h2 className="text-2xl font-editorial font-bold text-stone-900 dark:text-stone-100">
                Consultancy Session Confirmed
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                Your payment of <strong>NZ${activeConfirmation.amountNZD}.00</strong> has been processed via your Debit Card. A calendar invite and receipt have been dispatched.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 dark:bg-stone-800/60 rounded-2xl p-5 border border-stone-200 dark:border-stone-700/80 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-700">
                <span className="text-stone-500 dark:text-stone-400">Booking Reference</span>
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-sm">
                  {activeConfirmation.bookingRef}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400">Consultant Assigned</span>
                <strong className="text-stone-900 dark:text-stone-100">{activeConfirmation.consultantName} ({activeConfirmation.consultantLicenseNo})</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400">Consultation Date & Time</span>
                <strong className="text-stone-900 dark:text-stone-100">{activeConfirmation.date} · {activeConfirmation.timeSlot}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400">Contact Number for Call</span>
                <strong className="text-emerald-800 dark:text-emerald-400 font-mono">{activeConfirmation.clientPhone}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400">Payment Method</span>
                <span className="font-mono text-stone-700 dark:text-stone-300">
                  Debit Card ending in •••• {activeConfirmation.cardLast4}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-700">
                <span className="font-semibold text-stone-800 dark:text-stone-200">Total Paid (incl. 15% NZ GST)</span>
                <span className="font-mono font-bold text-emerald-900 dark:text-emerald-400 text-sm">
                  NZ${activeConfirmation.amountNZD}.00
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <strong>What happens next?</strong>
              <p className="text-[11px] text-emerald-800/90 dark:text-emerald-300/90 leading-relaxed">
                Our adviser will call your verified contact number ({activeConfirmation.clientPhone}) at your chosen time slot. Please have your current passport and travel dates ready.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Tax Invoice</span>
              </button>
              <button
                onClick={() => setActiveConfirmation(null)}
                className="px-5 py-2 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 rounded-xl text-xs font-semibold text-white transition-colors"
              >
                Close & View My Bookings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Layout: Packages & Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 Cols): Consultancy Package Selection & Assigned Specialist */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-editorial font-bold text-stone-900 dark:text-stone-100">
              1. Select Advisory Package
            </h2>
            <div className="space-y-3">
              {PACKAGES.map((pkg) => {
                const isSelected = pkg.id === selectedPackageId;

                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-emerald-800 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-xs ring-1 ring-emerald-800 dark:ring-emerald-500'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-emerald-900 text-white text-[10px] font-mono tracking-wider uppercase font-semibold">
                        Most Popular
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-400 font-semibold">
                          {pkg.duration}
                        </span>
                        <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                          {pkg.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold font-editorial text-stone-900 dark:text-stone-100 font-mono-numbers">
                          NZ${pkg.priceNZD}
                        </span>
                        <span className="text-[10px] text-stone-400 block">incl. 15% GST</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                      {pkg.description}
                    </p>

                    <ul className="mt-3 space-y-1.5 pt-3 border-t border-stone-200/60 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-300">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assigned Consultant Selector */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 space-y-3">
            <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider block">
              Assigned Legal Consultant
            </span>
            <div className="space-y-2">
              {ADVISERS.map((adv, idx) => (
                <label
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    selectedAdviserIdx === idx
                      ? 'border-emerald-800 dark:border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/30'
                      : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="adviser"
                    checked={selectedAdviserIdx === idx}
                    onChange={() => setSelectedAdviserIdx(idx)}
                    className="mt-1 accent-emerald-800"
                  />
                  <div className="space-y-0.5 text-xs">
                    <strong className="text-stone-900 dark:text-stone-100 block">{adv.name}</strong>
                    <p className="text-[11px] text-emerald-800 dark:text-emerald-400 font-mono">{adv.license}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">{adv.role}</p>
                    <span className="text-[10px] text-stone-400 block">⭐ {adv.rating}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Past Bookings / Existing Sessions */}
          {progress.consultancyBookings && progress.consultancyBookings.length > 0 && (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                  My Booked Consultations ({progress.consultancyBookings.length})
                </span>
              </div>
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {progress.consultancyBookings.map((b) => (
                  <div key={b.id} className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 text-xs space-y-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="font-bold text-stone-900 dark:text-stone-100">{b.bookingRef}</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold uppercase">{b.status}</span>
                    </div>
                    <div className="text-stone-700 dark:text-stone-300 font-medium">
                      {b.consultationTitle}
                    </div>
                    <div className="text-stone-500 dark:text-stone-400 text-[11px]">
                      📅 {b.date} at {b.timeSlot}
                    </div>
                    <div className="text-stone-500 dark:text-stone-400 text-[11px]">
                      📞 Call to: <span className="font-mono text-emerald-800 dark:text-emerald-400 font-semibold">{b.clientPhone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (7 Cols): Contact Number & Debit Card Payment Form */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xl font-editorial font-bold text-stone-900 dark:text-stone-100">
              2. Appointment & Payment Details
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Provide your contact phone number for the consultation call and enter your Debit Card for secure instant payment.
            </p>
          </div>

          {formError && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center gap-2 text-xs text-rose-800 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleProcessPayment} className="space-y-6">
            
            {/* Step A: Contact Number & Client Info */}
            <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                <Phone className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Your Contact Number & Schedule</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Legal Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (!cardholderName) setCardholderName(e.target.value);
                    }}
                    placeholder="e.g. Jane Citizen"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                    Email for Confirmation & Tax Invoice *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. applicant@domain.nz"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                </div>
              </div>

              {/* Contact Phone Number Input with Country Code Selector */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300 flex items-center justify-between">
                  <span>Contact Number for Consultation Call *</span>
                  <span className="text-[11px] text-stone-500 font-normal">Our adviser calls you directly</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-32 px-2.5 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-mono text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-800 shrink-0"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="21 000 0000"
                    className="flex-1 px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm font-mono text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                </div>
                <p className="text-[10px] text-stone-500 dark:text-stone-400">
                  Adviser will reach out on <strong className="text-stone-700 dark:text-stone-300 font-mono">{countryCode} {phoneNumber || '...'}</strong> via Phone Call or WhatsApp.
                </p>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Preferred Time Slot (NZST)</span>
                  </label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  >
                    <option value="09:00 AM NZST (Early Morning)">09:00 AM NZST (Early Morning)</option>
                    <option value="10:00 AM NZST (Morning)">10:00 AM NZST (Morning)</option>
                    <option value="11:30 AM NZST (Midday)">11:30 AM NZST (Midday)</option>
                    <option value="02:00 PM NZST (Afternoon)">02:00 PM NZST (Afternoon)</option>
                    <option value="04:00 PM NZST (Late Afternoon)">04:00 PM NZST (Late Afternoon)</option>
                    <option value="06:30 PM NZST (After-Hours)">06:30 PM NZST (After-Hours)</option>
                  </select>
                </div>
              </div>

              {/* Consultation Notes */}
              <div className="space-y-1 pt-1">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  Application Background / Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={consultationNotes}
                  onChange={(e) => setConsultationNotes(e.target.value)}
                  placeholder="e.g. Travel dates inquiry, child dual citizenship questions, character waiver queries..."
                  className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                />
              </div>
            </div>

            {/* Step B: Payment Options - Debit Card Focused */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Payment Method</span>
                </span>
                <span className="text-[11px] text-stone-400 font-mono">
                  256-Bit SSL Encrypted
                </span>
              </div>

              {/* Payment Method Selector Pills */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('debit_card')}
                  className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === 'debit_card'
                      ? 'border-emerald-800 dark:border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-800'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                  <span>Debit Card</span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-normal">Visa / MC / EFTPOS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'border-emerald-800 dark:border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-800'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                  <span>Credit Card</span>
                  <span className="text-[10px] text-stone-400 font-normal">Visa / Mastercard / Amex</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('poli_pay')}
                  className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === 'poli_pay'
                      ? 'border-emerald-800 dark:border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-800'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <Building className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                  <span>POLi Internet Banking</span>
                  <span className="text-[10px] text-stone-400 font-normal">ANZ, ASB, BNZ, Westpac</span>
                </button>
              </div>

              {/* Saved Card Option if available */}
              {progress.savedDebitCard && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-950 dark:text-emerald-200">
                        Saved {progress.savedDebitCard.cardType} Available
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveSavedCard}
                      className="text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 text-xs flex items-center gap-1 transition-colors"
                      title="Remove saved debit card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300">
                    <span className="font-mono">
                      {progress.savedDebitCard.cardBrand.toUpperCase()} Debit Card ending in •••• {progress.savedDebitCard.last4}
                    </span>
                    <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                      Exp: {progress.savedDebitCard.expiryMonth}/{progress.savedDebitCard.expiryYear}
                    </span>
                  </div>

                  <div className="pt-1 flex items-center gap-2">
                    <label className="flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-200 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useSavedCard}
                        onChange={(e) => setUseSavedCard(e.target.checked)}
                        className="accent-emerald-800 rounded"
                      />
                      <span>Use this saved debit card for instant payment</span>
                    </label>
                  </div>
                </div>
              )}

              {/* New Debit Card Entry Fields */}
              {(!useSavedCard || !progress.savedDebitCard) && paymentMethod !== 'poli_pay' && (
                <div className="space-y-4 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850">
                  
                  {/* Visual Debit Card Hologram Strip */}
                  <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-stone-950 text-white rounded-xl p-4 shadow-sm space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px] text-emerald-300">
                      <span>NEW ZEALAND DEBIT CARD</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/10 uppercase tracking-widest text-[9px]">
                        EFTPOS / VISA DEBIT
                      </span>
                    </div>
                    <div className="text-base sm:text-lg tracking-widest font-bold">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-stone-300">
                      <div>
                        <span className="block text-stone-400 text-[8px] uppercase">Cardholder</span>
                        <span>{cardholderName || clientName || 'YOUR FULL NAME'}</span>
                      </div>
                      <div>
                        <span className="block text-stone-400 text-[8px] uppercase">Expires</span>
                        <span>{expiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Debit Card Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 dark:text-stone-300 flex items-center justify-between">
                      <span>Debit Card Number *</span>
                      <span className="text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">Visa Debit · Mastercard Debit · EFTPOS</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        placeholder="4520 1234 5678 9010"
                        maxLength={19}
                        className="w-full pl-9 pr-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm font-mono text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                      />
                    </div>
                  </div>

                  {/* Name on Card & Expiry & CVC Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1 space-y-1">
                      <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="Name as on card"
                        className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        required
                        value={expiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm font-mono text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-stone-700 dark:text-stone-300 flex items-center justify-between">
                        <span>CVC / CVV *</span>
                        <Lock className="w-3 h-3 text-stone-400" />
                      </label>
                      <input
                        type="password"
                        required
                        value={cvc}
                        onChange={(e) => handleCvcChange(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-xs sm:text-sm font-mono text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                      />
                    </div>
                  </div>

                  {/* Postal Code & Save Card Checkbox */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-stone-200/60 dark:border-stone-800 text-xs">
                    <div className="flex items-center gap-2">
                      <label className="text-stone-600 dark:text-stone-400">NZ Postcode:</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value.slice(0, 4))}
                        placeholder="1010"
                        className="w-20 px-2 py-1 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs font-mono text-stone-900 dark:text-stone-100"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-stone-700 dark:text-stone-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveCardForFuture}
                        onChange={(e) => setSaveCardForFuture(e.target.checked)}
                        className="accent-emerald-800 rounded"
                      />
                      <span>Save debit card for future consultancy sessions</span>
                    </label>
                  </div>
                </div>
              )}

              {/* POLi Bank Transfer Notice */}
              {paymentMethod === 'poli_pay' && (
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                  <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                    Instant Bank Transfer via POLi NZ
                  </span>
                  <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                    You will be securely routed to authenticate directly with your New Zealand online banking portal (ANZ, ASB, Bank of New Zealand, Kiwibank, TSB, or Westpac).
                  </p>
                </div>
              )}

            </div>

            {/* Price Summary & Submit Button */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600 dark:text-stone-400">
                  {selectedPackage.title} ({selectedPackage.duration})
                </span>
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                  NZ${selectedPackage.priceNZD}.00
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Includes 15% New Zealand Goods & Services Tax (GST)</span>
                <span>NZ${(selectedPackage.priceNZD * 0.15).toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Debit Card Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-emerald-300" />
                    <span>Pay NZ${selectedPackage.priceNZD}.00 via Debit Card & Confirm Session</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Licensed Adviser Guarantee</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>Full Refund if not 100% Satisfied</span>
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
