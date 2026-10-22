import { StudyModule } from '../types';

export const STUDY_MODULES: StudyModule[] = [
  {
    id: 'mod-treaty',
    title: 'Te Tiriti o Waitangi: Articles & Differences',
    teReoTitle: 'Te Tiriti o Waitangi me ngā Whakaritenga',
    category: 'treaty_and_history',
    estimatedMinutes: 20,
    description: 'Understand the 1840 Treaty compact, the significant differences between the Māori and English texts, and modern Treaty principles.',
    keyPoints: [
      'Signed on 6 February 1840 at Waitangi in the Bay of Islands.',
      'Article 1 Māori text cedes "kāwanatanga" (governorship) to the Crown, while the English text states "sovereignty".',
      'Article 2 Māori text guarantees "tino rangatiratanga" (full chieftainship) over lands, villages, and all treasures (taonga).',
      'Article 3 guarantees Māori the royal protection and equal rights (ōritetanga) of British subjects.',
      'Core principles: Partnership, Active Protection, Participation, and Redress.'
    ]
  },
  {
    id: 'mod-foundations',
    title: 'Tangata Whenua & Polynesian Voyaging',
    teReoTitle: 'Te Hekenga Nui me ngā Tangata Whenua',
    category: 'treaty_and_history',
    estimatedMinutes: 15,
    description: 'Explore the ancestral ocean voyaging of Kupe, the waka hourua migrations (~1250-1300 CE), and the founding of Māori society.',
    keyPoints: [
      'Polynesian navigators arrived around 1250–1300 CE using sophisticated astronomical and oceanographic science.',
      'Kupe is the legendary discoverer who named Aotearoa (Land of the Long White Cloud).',
      'Founding waka include Tainui, Te Arawa, Mātaatua, Kurahaupō, Tokomaru, Aotea, and Tākitimu.',
      'Māori society organized around iwi (tribe), hapū (sub-tribe), and whānau (extended family).'
    ]
  },
  {
    id: 'mod-wars-raupatu',
    title: 'New Zealand Wars & Land Confiscation',
    teReoTitle: 'Ngā Pakanga o Aotearoa me te Raupatu',
    category: 'treaty_and_history',
    estimatedMinutes: 18,
    description: 'Study the armed conflicts of the 19th century, the Kīngitanga movement, widespread land confiscation (raupatu), and modern redress.',
    keyPoints: [
      'Northern War (1845–46) led by Hone Heke and Kawiti over Crown authority.',
      'Founding of the Kīngitanga (Māori King Movement) in 1858 under Pōtatau Te Wherowhero.',
      'Invasion of the Waikato in 1863 and confiscation of over 3 million acres under the New Zealand Settlements Act.',
      'Formation of the Waitangi Tribunal in 1975 to investigate and provide redress for historical breaches.'
    ]
  },
  {
    id: 'mod-suffrage',
    title: 'Women’s Suffrage & Social Pioneer History',
    teReoTitle: 'Te Pōtitanga Wahine me ngā Tikanga Toko i te Ora',
    category: 'treaty_and_history',
    estimatedMinutes: 15,
    description: 'Learn how Kate Sheppard and fellow suffragists won voting rights in 1893, and how the 1938 Social Security Act built the welfare state.',
    keyPoints: [
      'New Zealand became the first self-governing nation to grant women the vote on 19 September 1893.',
      'The monster 1893 petition carried nearly 32,000 signatures, rolled down the floor of Parliament.',
      'Kate Sheppard’s portrait is honored on the New Zealand $10 banknote.',
      'First Labour Government under Michael Joseph Savage created universal pensions, health care, and state housing in 1938.'
    ]
  },
  {
    id: 'mod-government',
    title: 'Government System & The Constitution',
    teReoTitle: 'Te Kōwhiringa me te Pūnaha Tōrangapū',
    category: 'government_and_law',
    estimatedMinutes: 20,
    description: 'Discover how New Zealand’s constitutional monarchy and parliamentary democracy operate without a single codified constitution.',
    keyPoints: [
      'Head of State: The Sovereign (King Charles III), represented in NZ by the Governor-General.',
      'Head of Government: The Prime Minister, who leads the Cabinet of Ministers.',
      'Three branches of government: Legislature (makes laws), Executive (runs government), Judiciary (interprets laws independently).',
      'Parliament sits in Wellington in the iconic Executive Wing known as "The Beehive".'
    ]
  },
  {
    id: 'mod-mmp',
    title: 'MMP Voting System & Parliamentary Elections',
    teReoTitle: 'Te Pūnaha Pōti MMP',
    category: 'government_and_law',
    estimatedMinutes: 16,
    description: 'Master how the Mixed Member Proportional (MMP) voting system works, including the Party Vote, Electorate Vote, and 5% threshold.',
    keyPoints: [
      'MMP was adopted in 1996 to ensure Parliament proportionally reflects voter support.',
      'Every voter receives two votes: the Party Vote (most important) and the Electorate Vote.',
      'The Party Vote determines each party’s overall share of the 120 parliamentary seats.',
      'A party must win 5% of the Party Vote or at least one electorate seat to enter Parliament.',
      'General elections occur at least once every three years.'
    ]
  },
  {
    id: 'mod-tikanga',
    title: 'Te Ao Māori: Values, Tikanga & Marae Protocol',
    teReoTitle: 'Tikanga Māori me ngā Uara',
    category: 'maori_culture',
    estimatedMinutes: 18,
    description: 'Explore the fundamental principles of Māori society: Manaakitanga, Whanaungatanga, Kaitiakitanga, and the pōwhiri welcome.',
    keyPoints: [
      'Manaakitanga: Hospitality, generosity, uplifting others, and making visitors feel valued.',
      'Whanaungatanga: Kinship, family connection, and prioritizing collective community wellbeing.',
      'Kaitiakitanga: Guardianship and environmental stewardship of land, waters, and future generations.',
      'The Marae is the community gathering complex centered around the carved meeting house (wharenui).',
      'The pōwhiri is the traditional welcoming ritual involving karanga, whaikōrero, waiata, and the hongi.'
    ]
  },
  {
    id: 'mod-language',
    title: 'Official Languages & Te Reo Māori Words',
    teReoTitle: 'Ngā Reo Whaimana o Aotearoa',
    category: 'maori_culture',
    estimatedMinutes: 15,
    description: 'Learn about New Zealand’s official languages (Te Reo Māori and NZ Sign Language) and essential everyday terminology.',
    keyPoints: [
      'Te Reo Māori became an official language under the Māori Language Act 1987.',
      'New Zealand Sign Language (NZSL) became an official language in 2006.',
      'English is the predominant de facto language used across public life and business.',
      'Essential words: Kia ora (hello/thank you), Whānau (family), Aotearoa (NZ), Karakia (blessing), Waiata (song).'
    ]
  },
  {
    id: 'mod-geography',
    title: 'Geography, Islands & Sacred Mountains',
    teReoTitle: 'Te Matawhenua o Aotearoa',
    category: 'geography_and_society',
    estimatedMinutes: 15,
    description: 'Learn the geography of the North and South Islands, Cook Strait, Lake Taupō, Aoraki Mount Cook, and major urban centres.',
    keyPoints: [
      'Two principal islands: North Island (Te Ika-a-Māui) and South Island (Te Waipounamu), separated by Cook Strait.',
      'Aoraki / Mount Cook is the highest peak at 3,724 metres in the Southern Alps.',
      'Lake Taupō is the largest lake, occupying a massive volcanic caldera.',
      'Wellington is the capital city (since 1865); Auckland is the largest city by population.'
    ]
  },
  {
    id: 'mod-symbols',
    title: 'National Symbols, Anthems & Holidays',
    teReoTitle: 'Ngā Tohu ā-Motu me ngā Rā Whakatā',
    category: 'geography_and_society',
    estimatedMinutes: 16,
    description: 'Discover the Kiwi bird, Silver Fern (ponga/koru), Southern Cross flag, national anthems, Waitangi Day, and Matariki.',
    keyPoints: [
      'The Kiwi is the unique nocturnal flightless bird and national emblem.',
      'The Silver Fern (ponga) and unfurling koru symbolize new life, growth, and resilience.',
      'NZ Flag displays the Southern Cross constellation with four red five-pointed stars with white borders.',
      'Two national anthems: "God Defend New Zealand" (Aotearoa) and "God Save the King".',
      'National holidays include Waitangi Day (6 Feb), ANZAC Day (25 Apr), and Matariki (mid-winter).'
    ]
  },
  {
    id: 'mod-ceremony',
    title: 'The Citizenship Ceremony: Oath & Affirmation',
    teReoTitle: 'Te Hui Whakawhiwhi Kirirarau',
    category: 'citizenship_ceremony',
    estimatedMinutes: 14,
    description: 'Walk through what happens on your ceremony day, the choice between Oath and Affirmation, and receiving your certificate.',
    keyPoints: [
      'Organized by local district/city councils and presided over by the local Mayor.',
      'Candidates choose either the Oath of Allegiance (religious) or Affirmation of Allegiance (secular).',
      'The declaration can be spoken in English, Te Reo Māori, or both languages.',
      'Candidates are presented with their official Certificate of Citizenship and often a native plant seedling.',
      'The national anthem is sung together in both Māori and English.'
    ]
  },
  {
    id: 'mod-civic-rights',
    title: 'Civic Rights, Electoral Enrollment & Passports',
    teReoTitle: 'Ngā Tika me ngā Haepapa Kirirarau',
    category: 'citizenship_ceremony',
    estimatedMinutes: 15,
    description: 'Understand the legal rights and duties of new citizens: compulsory electoral enrollment, jury service, and passport applications.',
    keyPoints: [
      'Compulsory by law for all eligible citizens aged 18+ to enrol on the Parliamentary electoral roll (voting is voluntary).',
      'Citizens can stand for election to Parliament or local councils.',
      'Citizens are eligible to hold a New Zealand Passport issued by the Department of Internal Affairs (DIA).',
      'NZ allows dual or multiple citizenships without requiring surrender of existing nationality.',
      'Citizens may be summoned for jury service to uphold the justice system.'
    ]
  }
];
