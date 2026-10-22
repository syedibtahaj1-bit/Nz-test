import { Flashcard } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc1',
    category: 'maori_culture',
    front: 'Kaitiakitanga',
    phoneticOrPronunciation: 'kai-tee-ah-kee-tah-ngah',
    audioPronunciationText: 'Kaitiakitanga',
    syllables: ['Kai', 'tia', 'ki', 'ta', 'nga'],
    isMaoriTerm: true,
    back: 'Guardianship and stewardship, particularly of the natural environment, land, waters, and cultural treasures for future generations.',
    context: 'Embedded in NZ environmental law, resource management, and conservation ethic.'
  },
  {
    id: 'fc2',
    category: 'maori_culture',
    front: 'Manaakitanga',
    phoneticOrPronunciation: 'mah-nah-kee-tah-ngah',
    audioPronunciationText: 'Manaakitanga',
    syllables: ['Ma', 'naa', 'ki', 'ta', 'nga'],
    isMaoriTerm: true,
    back: 'Hospitality, kindness, generosity, and showing respect that uplifts the dignity (mana) of others.',
    context: 'The heart of Kiwi hospitality and how communities welcome visitors and newcomers.'
  },
  {
    id: 'fc3',
    category: 'maori_culture',
    front: 'Whanaungatanga',
    phoneticOrPronunciation: 'fah-nah-oo-ngah-tah-ngah',
    audioPronunciationText: 'Whanaungatanga',
    syllables: ['Wha', 'nau', 'nga', 'ta', 'nga'],
    isMaoriTerm: true,
    back: 'Relationship, kinship, sense of familial connection and collective community belonging.',
    context: 'Valuing group wellbeing and mutual responsibility over pure individualism.'
  },
  {
    id: 'fc4',
    category: 'treaty_and_history',
    front: '6 February 1840',
    phoneticOrPronunciation: 'Waitangi Day (wai-tah-ngi)',
    audioPronunciationText: 'Te Tiriti o Waitangi',
    syllables: ['Wai', 'ta', 'ngi'],
    isMaoriTerm: true,
    back: 'The date Te Tiriti o Waitangi (The Treaty of Waitangi) was first signed at Waitangi in the Bay of Islands.',
    context: 'Celebrated every year as New Zealand’s national day.'
  },
  {
    id: 'fc5',
    category: 'treaty_and_history',
    front: 'Tino Rangatiratanga',
    phoneticOrPronunciation: 'tee-noh rah-ngah-tee-rah-tah-ngah',
    audioPronunciationText: 'Tino Rangatiratanga',
    syllables: ['Ti', 'no', 'Ra', 'nga', 'ti', 'ra', 'ta', 'nga'],
    isMaoriTerm: true,
    back: 'Full chieftainship, self-determination, and authority over lands, villages, and all treasures (taonga katoa).',
    context: 'Guaranteed to Māori chiefs and tribes under Article Two of the Māori text of Te Tiriti.'
  },
  {
    id: 'fc6',
    category: 'treaty_and_history',
    front: 'Kāwanatanga',
    phoneticOrPronunciation: 'kah-wah-nah-tah-ngah',
    audioPronunciationText: 'Kāwanatanga',
    syllables: ['Kā', 'wa', 'na', 'ta', 'nga'],
    isMaoriTerm: true,
    back: 'Governorship / civil governance granted to the British Crown under Article One of the Māori text of Te Tiriti.',
    context: 'Distinguished from "mana" or absolute sovereignty, which chiefs retained.'
  },
  {
    id: 'fc7',
    category: 'treaty_and_history',
    front: '19 September 1893',
    phoneticOrPronunciation: 'Suffrage Day',
    audioPronunciationText: 'Suffrage Day',
    syllables: ['Suf', 'frage', 'Day'],
    isMaoriTerm: false,
    back: 'New Zealand became the first self-governing country in the world where women won the right to vote in parliamentary elections.',
    context: 'Led by Kate Sheppard with a 31,872-signature petition; honored on the $10 note.'
  },
  {
    id: 'fc8',
    category: 'government_and_law',
    front: 'MMP (Mixed Member Proportional)',
    phoneticOrPronunciation: 'Electoral System since 1996',
    audioPronunciationText: 'Mixed Member Proportional',
    syllables: ['M', 'M', 'P'],
    isMaoriTerm: false,
    back: 'Voting system where each voter has two votes: the Party Vote (decides total seat share) and the Electorate Vote (elects local MP).',
    context: 'Parties must reach 5% of party vote or win 1 electorate seat to enter Parliament.'
  },
  {
    id: 'fc9',
    category: 'government_and_law',
    front: 'The Governor-General',
    phoneticOrPronunciation: 'Te Kāwana Tianara o Aotearoa',
    audioPronunciationText: 'Te Kāwana Tianara o Aotearoa',
    syllables: ['Te', 'Kā', 'wa', 'na', 'Tia', 'na', 'ra'],
    isMaoriTerm: true,
    back: 'The personal representative of the Sovereign (King Charles III) in New Zealand, acting on the advice of democratically elected ministers.',
    context: 'Performs constitutional and ceremonial duties including granting Royal Assent to bills.'
  },
  {
    id: 'fc10',
    category: 'geography_and_society',
    front: 'Matariki',
    phoneticOrPronunciation: 'mah-tah-ree-kee',
    audioPronunciationText: 'Matariki',
    syllables: ['Ma', 'ta', 'ri', 'ki'],
    isMaoriTerm: true,
    back: 'The Pleiades star cluster whose mid-winter dawn rising signals the Māori New Year; celebrated as a public holiday since 2022.',
    context: 'Core themes: Remembrance of ancestors, celebrating community in the present, and planning the future.'
  },
  {
    id: 'fc11',
    category: 'geography_and_society',
    front: 'Aoraki / Mount Cook',
    phoneticOrPronunciation: 'ow-rah-kee',
    audioPronunciationText: 'Aoraki',
    syllables: ['Ao', 'ra', 'ki'],
    isMaoriTerm: true,
    back: 'New Zealand’s highest mountain at 3,724 metres, located in the Southern Alps (Kā Tiritiri o te Moana).',
    context: 'Sacred ancestor mountain to Ngāi Tahu iwi.'
  },
  {
    id: 'fc12',
    category: 'citizenship_ceremony',
    front: 'Oath vs Affirmation of Allegiance',
    phoneticOrPronunciation: 'Ceremony Declaration',
    audioPronunciationText: 'Oath and Affirmation of Allegiance',
    syllables: ['Oath', 'and', 'Af', 'fir', 'ma', 'tion'],
    isMaoriTerm: false,
    back: 'The Oath invokes God ("so help me God"), whereas the Affirmation is a solemn secular promise of loyalty; both have identical legal force.',
    context: 'Candidates may choose either, and recite it in English, Te Reo Māori, or both.'
  },
  {
    id: 'fc13',
    category: 'citizenship_ceremony',
    front: 'Electoral Enrolment Requirement',
    phoneticOrPronunciation: 'Civic Duty',
    audioPronunciationText: 'Electoral Enrolment',
    syllables: ['E', 'lec', 'to', 'ral', 'En', 'rol', 'ment'],
    isMaoriTerm: false,
    back: 'It is compulsory by law for all eligible citizens aged 18+ to enrol on the parliamentary electoral roll (though voting itself is voluntary).',
    context: 'Enrolled citizens may also be randomly summoned for jury service.'
  },
  {
    id: 'fc14',
    category: 'maori_culture',
    front: 'Pōwhiri',
    phoneticOrPronunciation: 'poh-fee-ree',
    audioPronunciationText: 'Pōwhiri',
    syllables: ['Pō', 'whi', 'ri'],
    isMaoriTerm: true,
    back: 'A formal Māori welcoming ceremony onto a marae, involving karanga, whaikōrero, waiata, hongi, and sharing kai (food).',
    context: 'Removes tapu (sacred restriction) and binds hosts and visitors together in peace.'
  },
  {
    id: 'fc15',
    category: 'geography_and_society',
    front: 'Cook Strait',
    phoneticOrPronunciation: 'Te Moana-o-Raukawa (teh maw-ah-nah)',
    audioPronunciationText: 'Te Moana-o-Raukawa',
    syllables: ['Te', 'Moa', 'na', 'o', 'Rau', 'ka', 'wa'],
    isMaoriTerm: true,
    back: 'The body of water separating the North Island (Te Ika-a-Māui) and the South Island (Te Waipounamu).',
    context: 'Inter-island ferries connect Wellington and Picton across this scenic strait.'
  },
  {
    id: 'fc16',
    category: 'maori_culture',
    front: 'Whakapapa',
    phoneticOrPronunciation: 'fah-kah-pah-pah',
    audioPronunciationText: 'Whakapapa',
    syllables: ['Wha', 'ka', 'pa', 'pa'],
    isMaoriTerm: true,
    back: 'Genealogy, lineage, ancestry, and the foundational framework connecting living people to ancestors, landmarks, and the natural world.',
    context: 'Fundamental to understanding tribal identity (Iwi and Hapū) and collective belonging.'
  },
  {
    id: 'fc17',
    category: 'maori_culture',
    front: 'Taonga',
    phoneticOrPronunciation: 'tah-aw-ngah',
    audioPronunciationText: 'Taonga',
    syllables: ['Tao', 'nga'],
    isMaoriTerm: true,
    back: 'Highly treasured possession or cultural asset—both physical (land, waterways, forests) and intangible (Te Reo Māori, spiritual beliefs, songs).',
    context: 'Guaranteed protection to Māori under Article Two of Te Tiriti o Waitangi.'
  },
  {
    id: 'fc18',
    category: 'maori_culture',
    front: 'Aotearoa',
    phoneticOrPronunciation: 'ow-teh-ah-raw-ah',
    audioPronunciationText: 'Aotearoa',
    syllables: ['Ao', 'tea', 'roa'],
    isMaoriTerm: true,
    back: 'The Māori name for New Zealand, most famously translated as "The Land of the Long White Cloud" (attributed to Kupe’s wife Kuramārōtini).',
    context: 'Used alongside New Zealand on passports, currency, legislation, and national anthems.'
  }
];
