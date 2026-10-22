export interface AnthemVerse {
  maoriLine: string;
  englishLine: string;
  phonetic: string;
}

export const ANTHEM_VERSES: AnthemVerse[] = [
  {
    maoriLine: 'E Ihowā Atua,',
    englishLine: 'O Lord, God of Nations at Thy feet,',
    phonetic: 'eh ee-hoh-wah ah-too-ah'
  },
  {
    maoriLine: 'O ngā iwi mātou rā,',
    englishLine: 'In the bonds of love we meet,',
    phonetic: 'aw ngah ee-wee mah-toe rah'
  },
  {
    maoriLine: 'Āta whakarongona;',
    englishLine: 'Hear our voices, we entreat,',
    phonetic: 'ah-tah fah-kah-raw-ngaw-nah'
  },
  {
    maoriLine: 'Me aroha noa.',
    englishLine: 'God defend our free land.',
    phonetic: 'meh ah-raw-hah naw-ah'
  },
  {
    maoriLine: 'Kia hua ko te pai;',
    englishLine: 'Guard Pacific’s triple star,',
    phonetic: 'kee-ah hoo-ah kaw teh pie'
  },
  {
    maoriLine: 'Kia tau tō atawhai;',
    englishLine: 'From the shafts of strife and war,',
    phonetic: 'kee-ah toe taw ah-tah-fie'
  },
  {
    maoriLine: 'Manaakitia mai',
    englishLine: 'Make her praises heard afar,',
    phonetic: 'mah-nah-kee-tee-ah my'
  },
  {
    maoriLine: 'Aotearoa.',
    englishLine: 'God defend New Zealand.',
    phonetic: 'ow-teh-ah-raw-ah'
  }
];

export const CEREMONY_OATHS = {
  oathEnglish: `I, [Full Name], swear that I will be faithful and bear true allegiance to His Majesty King Charles the Third, King of New Zealand, His heirs and successors, according to law, and that I will faithfully observe the laws of New Zealand and fulfil my duties as a New Zealand citizen. So help me God.`,
  
  affirmationEnglish: `I, [Full Name], solemnly, sincerely, and truly declare and affirm that I will be faithful and bear true allegiance to His Majesty King Charles the Third, King of New Zealand, His heirs and successors, according to law, and that I will faithfully observe the laws of New Zealand and fulfil my duties as a New Zealand citizen.`,
  
  oathMaori: `Tēnei au, a [Ingoa], e oati ana ka noho pūmau, ka ngākau pono hoki ki a Kīngi Tiāre te Tuatoru, te Kīngi o Aotearoa, me ōna uri whakaheke, e ai ki te ture; ā, ka ū tonu au ki ngā ture o Aotearoa, ka whakatutuki hoki i ōku kawenga hei kirirarau nō Aotearoa. Whakapūmautia mai e te Atua.`,
  
  affirmationMaori: `Tēnei au, a [Ingoa], e kī tūturu ana, e whakapuaki pono ana, ka noho pūmau, ka ngākau pono hoki ki a Kīngi Tiāre te Tuatoru, te Kīngi o Aotearoa, me ōna uri whakaheke, e ai ki te ture; ā, ka ū tonu au ki ngā ture o Aotearoa, ka whakatutuki hoki i ōku kawenga hei kirirarau nō Aotearoa.`
};

export const CEREMONY_STEPS = [
  {
    step: 1,
    title: 'Arrival & Welcome (Whakatau)',
    description: 'You arrive at the local council chambers or town hall with up to 2-3 guests. You register at the desk with photo ID and take your assigned seat. A formal civic and cultural welcome (often including a kaumatua elder or waiata) opens the ceremony.'
  },
  {
    step: 2,
    title: 'Mayor’s Address & Reading of Rights',
    description: 'The Mayor or presiding civic dignitary speaks about the history, community value, and rich multicultural fabric of Aotearoa, reminding candidates of the privileges and responsibilities of becoming a citizen.'
  },
  {
    step: 3,
    title: 'The Declaration (Oath or Affirmation)',
    description: 'Candidates stand together in groups (or individually depending on council size) and recite either the Oath of Allegiance (religious) or the Affirmation of Allegiance (secular) in English, Te Reo Māori, or both.'
  },
  {
    step: 4,
    title: 'Certificate Presentation & Native Gift',
    description: 'Your name is called to step forward and receive your official Certificate of New Zealand Citizenship signed by the Minister of Internal Affairs. Many councils present a gift such as a native kōwhai tree seedling, lapel pin, or commemorative book.'
  },
  {
    step: 5,
    title: 'Singing the National Anthem & Afternoon Tea',
    description: 'Everyone stands together to sing “God Defend New Zealand / Aotearoa” in Te Reo Māori and English. The formal ceremony concludes with refreshments, photos, and mingling with local councillors.'
  }
];

export const POST_CITIZENSHIP_CHECKLIST = [
  {
    id: 'c1',
    task: 'Enrol on the Parliamentary Electoral Roll',
    description: 'Under NZ law, all eligible citizens aged 18+ must enrol to vote with the Electoral Commission (vote.nz). Voting on election day is voluntary, but enrolment is mandatory.',
    link: 'https://vote.nz'
  },
  {
    id: 'c2',
    task: 'Apply for your New Zealand Passport',
    description: 'Once your citizenship is registered, you can apply online for an adult 10-year New Zealand passport through Passports.govt.nz (Department of Internal Affairs).',
    link: 'https://passports.govt.nz'
  },
  {
    id: 'c3',
    task: 'Update your RealMe & Official Government Records',
    description: 'Update your RealMe verified identity with your new citizenship status to streamline interactions with IRD (Inland Revenue), NZ Transport Agency, and other public services.',
    link: 'https://realme.govt.nz'
  },
  {
    id: 'c4',
    task: 'Confirm Dual Nationality with Country of Origin',
    description: 'New Zealand permits dual and multiple citizenships. Confirm whether your home country requires any notification or registration.',
    link: 'https://govt.nz'
  }
];
