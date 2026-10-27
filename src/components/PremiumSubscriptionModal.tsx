import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  CreditCard, 
  CheckCircle2, 
  Phone, 
  Mail, 
  UserCheck, 
  Sparkles, 
  ShieldCheck, 
  Award,
  ArrowRight,
  RefreshCw,
  Lock,
  Check,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { UserProgress, SavedDebitCard } from '../types';
import { 
  activatePremiumSubscription, 
  cancelPremiumSubscription, 
  removeDebitCard,
  saveDebitCard
} from '../utils/storage';

interface PremiumSubscriptionModalProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  onClose: () => void;
}

export const PremiumSubscriptionModal: React.FC<PremiumSubscriptionModalProps> = ({
  progress,
  onUpdateProgress,
  onClose
}) => {
  const isSubscribed = !!progress.subscription?.isActive;
  const savedCard = progress.savedDebitCard;

  const [useConnectedCard, setUseConnectedCard] = useState<boolean>(!!savedCard);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Card inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState(progress.userName && progress.userName !== 'Aotearoa Candidate' ? progress.userName : '');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [saveForFuture, setSaveForFuture] = useState(true);

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

  const handleRemoveCard = () => {
    const updated = removeDebitCard();
    onUpdateProgress(updated);
    setUseConnectedCard(false);
    setActionNotice('Your credit/debit card details have been completely removed from your account.');
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    let cardToUse: SavedDebitCard | undefined = undefined;

    if (useConnectedCard && savedCard) {
      cardToUse = savedCard;
    } else {
      const cleanDigits = cardNumber.replace(/\s/g, '');
      if (cleanDigits.length < 15) {
        setFormError('Please enter a valid 16-digit debit or credit card number.');
        return;
      }
      if (expiry.length < 5) {
        setFormError('Please enter a valid card expiry date (MM/YY).');
        return;
      }
      if (cvc.length < 3) {
        setFormError('Please enter your 3 or 4-digit security code (CVC).');
        return;
      }

      const last4 = cleanDigits.slice(-4);
      let brand: 'visa' | 'mastercard' | 'eftpos' | 'generic' = 'generic';
      if (cleanDigits.startsWith('4')) brand = 'visa';
      else if (cleanDigits.startsWith('5')) brand = 'mastercard';
      else if (cleanDigits.startsWith('6')) brand = 'eftpos';

      const [mm, yy] = expiry.split('/');
      cardToUse = {
        last4,
        cardBrand: brand,
        cardholderName: cardholderName.trim() || 'NZ Candidate',
        expiryMonth: mm || '12',
        expiryYear: yy ? `20${yy}` : '2028',
        cardType: 'Debit Card'
      };

      if (saveForFuture) {
        saveDebitCard(cardToUse);
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      const updated = activatePremiumSubscription(cardToUse);
      onUpdateProgress(updated);
      setIsProcessing(false);
      setSuccessMessage('Welcome to Premium! Your Personal Civic Tutor Aroha Henderson is now assigned to your preparation.');
    }, 900);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your Premium Service & Personal Tutor subscription?')) {
      const updated = cancelPremiumSubscription();
      onUpdateProgress(updated);
      setSuccessMessage(null);
      setActionNotice('Your subscription has been cancelled.');
      setTimeout(() => setActionNotice(null), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto no-print">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Banner Header */}
        <div className="relative bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white p-6 sm:p-8">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 text-emerald-200 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shadow-lg font-bold">
              <Crown className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-300">
                Official Study Upgrade
              </span>
              <h2 className="text-xl sm:text-2xl font-editorial font-bold text-white">
                Premium Service & Personal Tutor
              </h2>
            </div>
          </div>

          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl leading-relaxed mt-1">
            Get personalized 1-on-1 mentorship, direct phone & WhatsApp guidance, in-depth test coaching, and verified presence audit for your New Zealand citizenship application.
          </p>

          <div className="mt-4 inline-flex items-baseline gap-2 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/15">
            <span className="text-2xl font-editorial font-bold text-white">$15</span>
            <span className="text-xs text-emerald-200 font-mono">NZD / month (All-Inclusive Fee)</span>
          </div>
        </div>

        {/* Action / Removal Notification Toast */}
        {actionNotice && (
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-200 dark:border-emerald-800 p-3 px-6 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{actionNotice}</span>
            </div>
            <button 
              onClick={() => setActionNotice(null)}
              className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-200 text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-stone-700 dark:text-stone-300 max-h-[70vh] overflow-y-auto">
          
          {/* Active Subscription View */}
          {isSubscribed ? (
            <div className="space-y-6">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-6 h-6 text-emerald-700 dark:text-emerald-400 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-emerald-950 dark:text-emerald-100 text-sm">
                        Premium Service & Personal Tutor is Active
                      </h3>
                      <p className="text-[11px] text-emerald-900/80 dark:text-emerald-300/80">
                        {progress.subscription?.cardLast4 
                          ? `Billed to your card ending in •••• ${progress.subscription.cardLast4} at $15/month`
                          : 'Monthly fee of $15/month'
                        }
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-200/60 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200 font-mono text-[10px] font-bold uppercase tracking-wider">
                    Active Member
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
                  <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                    <span className="text-stone-500 dark:text-stone-400 block text-[10px]">Your Personal Civic Tutor:</span>
                    <strong className="text-stone-900 dark:text-stone-100 block text-xs mt-0.5">
                      {progress.subscription?.personalTutorName || 'Aroha Henderson, LLB'}
                    </strong>
                    <span className="text-emerald-700 dark:text-emerald-400 text-[10px]">Senior Citizenship Specialist</span>
                  </div>

                  <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                    <span className="text-stone-500 dark:text-stone-400 block text-[10px]">Direct Phone & WhatsApp:</span>
                    <strong className="text-stone-900 dark:text-stone-100 block text-xs mt-0.5">
                      {progress.subscription?.personalTutorPhone || '+64 21 029 4812'}
                    </strong>
                    <span className="text-stone-500 dark:text-stone-400 text-[10px]">Available 9am–7pm NZST</span>
                  </div>
                </div>

                {/* Tutor Contact CTAs */}
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <a
                    href="tel:+64210294812"
                    className="flex-1 py-2.5 px-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Personal Tutor Now</span>
                  </a>

                  <a
                    href="mailto:tutor@nzcitizenshipguide.co.nz"
                    className="flex-1 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-stone-200 dark:border-stone-700"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Study Question</span>
                  </a>
                </div>
              </div>

              {/* Card Management Bar */}
              <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
                    <CreditCard className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-stone-900 dark:text-stone-100 font-semibold block">
                      {savedCard 
                        ? `${savedCard.cardBrand.toUpperCase()} Debit Card Attached`
                        : 'No Card Saved on Profile'
                      }
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {savedCard 
                        ? `Ending in •••• ${savedCard.last4} · Renewal: ${progress.subscription?.nextRenewalDate}`
                        : `Next Renewal Date: ${progress.subscription?.nextRenewalDate}`
                      }
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {savedCard && (
                    <button
                      type="button"
                      onClick={handleRemoveCard}
                      className="text-[11px] text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Saved Card</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-[11px] text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 underline cursor-pointer"
                  >
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Checkout & Subscription Form */
            <form onSubmit={handleSubscribe} className="space-y-6">
              
              {/* Feature Highlights Grid */}
              <div className="space-y-2">
                <span className="font-semibold text-stone-900 dark:text-stone-100 text-xs uppercase tracking-wider font-mono">
                  What's Included in Your $15 Plan
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850 flex items-start gap-2.5">
                    <UserCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 dark:text-stone-100 block text-xs">
                        1-on-1 Personal Tutor Access
                      </strong>
                      <span className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                        Direct support from Senior Civic Specialist Aroha Henderson (+64 21 029 4812).
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 dark:text-stone-100 block text-xs">
                        Te Reo Māori Speech Guidance
                      </strong>
                      <span className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                        Personal review of your pronunciation for citizenship ceremony oaths & national anthem.
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850 flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 dark:text-stone-100 block text-xs">
                        Unlimited Mock Exam Coaching
                      </strong>
                      <span className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                        Personalized question breakdown so you easily surpass the 85% passing benchmark.
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 dark:text-stone-100 block text-xs">
                        1,350 Days Presence Audit
                      </strong>
                      <span className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                        Assistance verifying travel dates and statutory criteria prior to filing with DIA.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Alert */}
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Payment Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900 dark:text-stone-100 text-xs uppercase tracking-wider font-mono">
                    Payment Method
                  </span>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <Lock className="w-3 h-3" />
                    <span>Encrypted 256-bit Payment</span>
                  </span>
                </div>

                {/* If user already has a saved card */}
                {savedCard ? (
                  <div className="space-y-2">
                    <div 
                      onClick={() => setUseConnectedCard(true)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        useConnectedCard
                          ? 'border-emerald-700 dark:border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs ring-1 ring-emerald-700 dark:ring-emerald-500'
                          : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-[10px] tracking-wider uppercase border border-stone-700">
                            <span className="text-amber-400">{savedCard.cardBrand.slice(0, 3).toUpperCase()}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-stone-900 dark:text-stone-100 text-xs">
                                {savedCard.cardBrand.toUpperCase()} {savedCard.cardType}
                              </span>
                              <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 rounded text-[9px] font-mono font-medium">
                                Saved Card
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-600 dark:text-stone-400 font-mono mt-0.5">
                              •••• •••• •••• {savedCard.last4} · Exp {savedCard.expiryMonth}/{savedCard.expiryYear}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveCard();
                            }}
                            className="p-1.5 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
                            title="Remove this card"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            useConnectedCard ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-stone-300'
                          }`}>
                            {useConnectedCard && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setUseConnectedCard(!useConnectedCard)}
                        className="text-[11px] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
                      >
                        {useConnectedCard ? '+ Enter a different card' : `← Use saved card (•••• ${savedCard.last4})`}
                      </button>

                      <button
                        type="button"
                        onClick={handleRemoveCard}
                        className="text-[11px] text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove Saved Card</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Notice when no card is saved */
                  <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                      <CreditCard className="w-4 h-4 text-stone-400" />
                      <span>No card is currently saved. Enter your card details below to subscribe.</span>
                    </div>
                  </div>
                )}

                {/* Card Entry Fields when user chooses to enter a card or no saved card exists */}
                {(!savedCard || !useConnectedCard) && (
                  <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-850 space-y-3.5 animate-in fade-in duration-150">
                    <div>
                      <label className="text-[11px] font-medium text-stone-700 dark:text-stone-300 block mb-1">
                        Debit / Credit Card Number *
                      </label>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          placeholder="4520 0000 0000 0000"
                          maxLength={19}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono text-xs focus:ring-2 focus:ring-emerald-700 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-stone-700 dark:text-stone-300 block mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="Full name as printed on card"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-emerald-700 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-stone-700 dark:text-stone-300 block mb-1">
                          Expiry (MM/YY) *
                        </label>
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono text-xs focus:ring-2 focus:ring-emerald-700 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-stone-700 dark:text-stone-300 block mb-1">
                          Security CVC *
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cvc}
                          onChange={(e) => handleCvcChange(e.target.value)}
                          placeholder="3 digits"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono text-xs focus:ring-2 focus:ring-emerald-700 outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-[11px] text-stone-600 dark:text-stone-400">
                        <input
                          type="checkbox"
                          checked={saveForFuture}
                          onChange={(e) => setSaveForFuture(e.target.checked)}
                          className="accent-emerald-700 rounded"
                        />
                        <span>Save this card securely for convenient monthly renewals</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary & Pricing Breakdown */}
              <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-600 dark:text-stone-400">Premium Service & Personal Tutor</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">$15.00 NZD</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-600 dark:text-stone-400">Direct Personal Tutor Phone Helpline</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">Included</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-600 dark:text-stone-400">NZ Goods & Services Tax (GST 15%)</span>
                  <span className="text-stone-500">Included</span>
                </div>
                <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs font-bold text-stone-900 dark:text-stone-100">
                  <span>Total Due Today:</span>
                  <span className="text-emerald-800 dark:text-emerald-400 font-editorial text-sm">$15.00 NZD</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Payment ($15 NZD)...</span>
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4 fill-current text-amber-300" />
                    <span>
                      {useConnectedCard && savedCard 
                        ? `Subscribe with Saved Card (•••• ${savedCard.last4})` 
                        : 'Confirm & Subscribe ($15 NZD / Month)'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-stone-500 dark:text-stone-400">
                Cancel anytime directly from this menu. No hidden cancellation penalties.
              </p>
            </form>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>NZ Certified Civic Advisory Network</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            {isSubscribed ? 'Close' : 'Maybe Later'}
          </button>
        </div>

      </div>
    </div>
  );
};
