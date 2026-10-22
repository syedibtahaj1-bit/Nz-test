import { Question } from '../types';

export const QUESTION_CATEGORIES = {
  treaty_and_history: {
    id: 'treaty_and_history',
    name: 'Te Tiriti & NZ History',
    description: 'Polynesian arrival, He Whakaputanga, the Treaty of Waitangi, Suffrage, and ANZAC history.',
  },
  government_and_law: {
    id: 'government_and_law',
    name: 'Government & Legal System',
    description: 'Constitutional monarchy, MMP voting, Parliament, Cabinet, and the 3 branches of power.',
  },
  maori_culture: {
    id: 'maori_culture',
    name: 'Te Ao Māori & Language',
    description: 'Core Māori values (Tikanga, Whanaungatanga, Kaitiakitanga) and official language essentials.',
  },
  geography_and_society: {
    id: 'geography_and_society',
    name: 'Geography & National Identity',
    description: 'Islands, major cities, flora, fauna, Southern Cross, and national holidays like Matariki.',
  },
  citizenship_ceremony: {
    id: 'citizenship_ceremony',
    name: 'Ceremony & Civic Responsibilities',
    description: 'The Oath & Affirmation of Allegiance, voting enrollment, jury service, and citizenship rights.',
  },
} as const;

export const CITIZENSHIP_QUESTIONS: Question[] = [
  // 1. Te Tiriti & History
  {
    id: 'q1',
    category: 'treaty_and_history',
    question: 'On what date was the Treaty of Waitangi (Te Tiriti o Waitangi) first signed?',
    options: ['6 February 1840', '1 January 1901', '25 April 1915', '18 September 1893'],
    correctAnswer: 0,
    explanation: 'The Treaty of Waitangi was first signed on 6 February 1840 at Waitangi in the Bay of Islands by representatives of the British Crown and over 40 Māori chiefs.',
    keyFact: 'Waitangi Day is observed every year on 6 February as New Zealand’s national day.',
    historicalContext: 'Following 6 February, copies of the Treaty were carried across the North and South Islands for hundreds of other rangatira (chiefs) to sign.'
  },
  {
    id: 'q2',
    category: 'treaty_and_history',
    question: 'In the Māori text of Article Two of the Treaty, what did the Crown guarantee to Māori chiefs and tribes?',
    options: [
      'Full and exclusive sovereignty over the whole country',
      'Tino rangatiratanga (unqualified chieftainship and authority over their lands, settlements, and all treasures)',
      'Immediate integration into the British peerage',
      'The right to establish a separate independent parliament'
    ],
    correctAnswer: 1,
    explanation: 'Article 2 of the Māori text guaranteed "te tino rangatiratanga"—the unqualified exercise of chieftainship over their lands (whenua), villages (kāinga), and all treasured possessions (taonga katoa).',
    keyFact: 'The English version referred to "full exclusive and undisturbed possession of their Lands and Estates", which was viewed as more limited than tino rangatiratanga.',
    historicalContext: 'The discrepancy between the Māori word "rangatiratanga" and the English concept of property ownership has been a central focus of the Waitangi Tribunal.'
  },
  {
    id: 'q3',
    category: 'treaty_and_history',
    question: 'What crucial word was used in Article One of the Māori text to translate the British Crown’s request for "sovereignty"?',
    options: ['Kāwanatanga (governance / governorship)', 'Mana (authority / prestige)', 'Tikanga (customary law)', 'Rangapu (partnership)'],
    correctAnswer: 0,
    explanation: 'The translators used "kāwanatanga" (governorship). Chiefs understood this to mean the British Governor would govern British settlers and maintain peace, while retaining their own mana and chieftainship (rangatiratanga).',
    keyFact: 'If the translators had used "mana", Māori chiefs would have rejected surrendering their absolute authority.',
    historicalContext: 'Rev. Henry Williams and his son Edward translated the English draft into Te Reo Māori overnight on 4 February 1840.'
  },
  {
    id: 'q4',
    category: 'treaty_and_history',
    question: 'In 1893, New Zealand achieved an internationally recognized democratic milestone. What was it?',
    options: [
      'It became the first self-governing nation in the world where women won the right to vote in general elections',
      'It drafted the world’s first written constitution',
      'It abolished the upper house of parliament',
      'It introduced compulsory secret ballots'
    ],
    correctAnswer: 0,
    explanation: 'On 19 September 1893, the Electoral Act was signed into law, making New Zealand the first self-governing country in the world in which women had the right to vote in parliamentary elections.',
    keyFact: 'Kate Sheppard led the women’s suffrage petition containing over 31,000 signatures to Parliament, and her portrait is on the NZ $10 banknote.',
    historicalContext: 'At the November 1893 election, over 65% of all adult New Zealand women exercised their hard-won franchise.'
  },
  {
    id: 'q5',
    category: 'treaty_and_history',
    question: 'What was "He Whakaputanga o te Rangatiratanga o Nu Tirene", signed in 1835?',
    options: [
      'The Declaration of Independence of the United Tribes of New Zealand',
      'The first formal trade agreement with Australia',
      'A peace treaty ending the Northern Wars',
      'The act dividing New Zealand into provincial councils'
    ],
    correctAnswer: 0,
    explanation: 'Signed in October 1835 by 34 northern rangatira (and later by 18 others), He Whakaputanga declared New Zealand an independent sovereign state and asked the British Monarch to be its protector.',
    keyFact: 'He Whakaputanga was officially acknowledged by King William IV and the British Crown prior to 1840.',
    historicalContext: 'British Resident James Busby helped draft the document partly to prevent a rival claim by Frenchman Baron Charles de Thierry.'
  },
  {
    id: 'q6',
    category: 'treaty_and_history',
    question: 'What is the purpose and role of the Waitangi Tribunal, established in 1975?',
    options: [
      'To pass binding criminal sentences on treaty violators',
      'A permanent commission of inquiry that hears and reports on claims brought by Māori relating to Crown actions that breach Treaty principles',
      'An electoral boundary review committee',
      'A diplomatic mission to the United Nations'
    ],
    correctAnswer: 1,
    explanation: 'The Waitangi Tribunal investigates claims submitted by Māori alleging prejudice caused by Crown laws, policies, or omissions that conflict with the principles of the Treaty of Waitangi, and makes recommendations for redress.',
    keyFact: 'In 1985, the Tribunal’s jurisdiction was expanded backwards in time to investigate historical grievances dating back to 1840.',
    historicalContext: 'Tribunal reports have led to numerous formal Crown apologies, statutory acknowledgments, and financial/cultural settlements across Aotearoa.'
  },
  {
    id: 'q7',
    category: 'treaty_and_history',
    question: 'When did the first human ancestors arrive in Aotearoa New Zealand?',
    options: [
      'Around 1250–1300 CE, when Polynesian voyagers arrived in ocean-going double-hulled waka (canoes)',
      'Around 500 BCE during the bronze age migrations',
      'In 1642 with Dutch explorer Abel Tasman',
      'In 1769 with Captain James Cook'
    ],
    correctAnswer: 0,
    explanation: 'Scientific dating and ancestral oral traditions confirm that Polynesian navigators sailed from eastern Polynesia (Hawaiki) in waka hourua around 1250–1300 CE, establishing Māori society in Aotearoa.',
    keyFact: 'According to tradition, Kupe is celebrated as the legendary Polynesian navigator who discovered Aotearoa after chasing a giant octopus.',
    historicalContext: 'Settlers navigated by ocean swells, bird flights, and stellar constellations such as the Southern Cross and Matariki.'
  },
  {
    id: 'q8',
    category: 'treaty_and_history',
    question: 'What is commemorated across New Zealand every year on ANZAC Day, 25 April?',
    options: [
      'The first landing of the Australian and New Zealand Army Corps at Gallipoli in 1915 and all New Zealanders who served and died in military operations',
      'The victory in the Battle of Britain',
      'The signing of the Treaty of Versailles',
      'The departure of troops from Wellington harbour'
    ],
    correctAnswer: 0,
    explanation: 'ANZAC Day (25 April) marks the anniversary of the dawn landings at Gallipoli, Turkey, in 1915 during WWI, and honours all New Zealand service personnel who served and died in conflicts and peacekeeping missions.',
    keyFact: 'The red poppy (pipi) is worn as a universal symbol of remembrance.',
    historicalContext: 'Dawn services are held at war memorials and cenotaphs across the country, featuring the sounding of the Last Post and the Ode of Remembrance.'
  },

  // 2. Government & Law
  {
    id: 'q9',
    category: 'government_and_law',
    question: 'What type of political system does New Zealand have?',
    options: [
      'A constitutional monarchy with a parliamentary democracy',
      'A federal republic with an elected president',
      'A direct democracy with an executive council',
      'A confederation of independent states'
    ],
    correctAnswer: 0,
    explanation: 'New Zealand is a constitutional monarchy (King Charles III is the Sovereign and Head of State) and a parliamentary democracy (the people elect MPs who form the government).',
    keyFact: 'New Zealand does not have a single codified constitution document; its constitution consists of key statutes, court judgments, conventions, and the Treaty of Waitangi.',
    historicalContext: 'The Constitution Act 1986 and the Electoral Act 1993 are central statutes of New Zealand’s uncodified constitution.'
  },
  {
    id: 'q10',
    category: 'government_and_law',
    question: 'What electoral system is used in New Zealand general elections?',
    options: [
      'MMP (Mixed Member Proportional)',
      'First-Past-The-Post (FPTP)',
      'Single Transferable Vote (STV) exclusively',
      'Alternative Vote preferential voting'
    ],
    correctAnswer: 0,
    explanation: 'New Zealand adopted Mixed Member Proportional (MMP) in 1996 following public referendums in 1992 and 1993, replacing the older First-Past-The-Post system.',
    keyFact: 'Under MMP, every eligible voter receives two votes on election day: the Party Vote and the Electorate Vote.',
    historicalContext: 'MMP was introduced to ensure Parliament more fairly reflects the overall share of votes cast for all political parties.'
  },
  {
    id: 'q11',
    category: 'government_and_law',
    question: 'Which of the two votes in an MMP election is the most important for deciding the composition of Parliament?',
    options: [
      'The Party Vote (decides the total share of seats each political party wins in Parliament)',
      'The Electorate Vote (decides who the Prime Minister is)',
      'The Local Council Referendum Vote',
      'The Mayoral preference vote'
    ],
    correctAnswer: 0,
    explanation: 'The Party Vote determines the overall proportion of the 120 seats that each party gets in Parliament, provided the party meets the 5% threshold or wins at least one electorate seat.',
    keyFact: 'The Electorate Vote chooses the local MP who will represent your specific geographic constituency.',
    historicalContext: 'If a party wins 30% of the Party Vote, it is entitled to roughly 30% of the seats in the House of Representatives (36 of 120 seats).'
  },
  {
    id: 'q12',
    category: 'government_and_law',
    question: 'Who represents the Sovereign (King Charles III) in New Zealand?',
    options: [
      'The Governor-General of New Zealand (Te Kāwana Tianara o Aotearoa)',
      'The Chief Justice of the Supreme Court',
      'The Speaker of the House of Representatives',
      'The British High Commissioner'
    ],
    correctAnswer: 0,
    explanation: 'The Governor-General is appointed by the Sovereign on the advice of the New Zealand Prime Minister to represent the Crown in New Zealand, acting as the de facto ceremonial head of state.',
    keyFact: 'The Governor-General signs bills into law (Royal Assent), summons and dissolves Parliament, and appoints the Prime Minister and Ministers.',
    historicalContext: 'By constitutional convention, the Governor-General acts strictly on the advice of democratically elected ministers with the confidence of the House.'
  },
  {
    id: 'q13',
    category: 'government_and_law',
    question: 'What is the maximum term between general parliamentary elections in New Zealand?',
    options: ['3 years', '4 years', '5 years', '2 years'],
    correctAnswer: 0,
    explanation: 'Under Section 17 of the Constitution Act 1986, the maximum term of Parliament is three years, unless it is dissolved earlier by the Governor-General on the advice of the Prime Minister.',
    keyFact: 'New Zealand has one of the shortest parliamentary terms among democratic nations, giving voters frequent accountability.',
    historicalContext: 'A 3-year term has been in place since the Triennial Parliaments Act was passed in 1879.'
  },
  {
    id: 'q14',
    category: 'government_and_law',
    question: 'What are the three distinct branches of government in New Zealand?',
    options: [
      'The Legislature (Parliament), the Executive (Ministers & Public Service), and the Judiciary (Courts)',
      'The Sovereign, the Commonwealth, and the United Nations',
      'The North Island Council, South Island Council, and Chatham Islands Board',
      'The Police, the Armed Forces, and the Corrections Department'
    ],
    correctAnswer: 0,
    explanation: 'The separation of powers divides governance into the Legislature (makes laws), the Executive (administers policy and laws), and the Judiciary (interprets and applies laws independently).',
    keyFact: 'The Judiciary is strictly independent of political influence from ministers or members of parliament.',
    historicalContext: 'The Supreme Court of New Zealand, established in 2004, is the highest appellate court, replacing appeals to the British Privy Council.'
  },
  {
    id: 'q15',
    category: 'government_and_law',
    question: 'What is the minimum Party Vote threshold for a political party to enter Parliament under MMP (if it does not win an electorate)?',
    options: ['5% of the total party vote', '2.5% of the total party vote', '10% of the total party vote', '7% of the total party vote'],
    correctAnswer: 0,
    explanation: 'A political party must secure at least 5% of all valid Party Votes, OR win at least one electorate seat (the "coat-tail" threshold), to be allocated seats in Parliament.',
    keyFact: 'List MPs are selected in the order of the party’s published list submitted before the election.',
    historicalContext: 'The Electoral Commission regularly reviews MMP thresholds to ensure fair representation and government stability.'
  },
  {
    id: 'q16',
    category: 'government_and_law',
    question: 'What is the distinctive circular executive wing of New Zealand’s Parliament buildings in Wellington commonly called?',
    options: ['The Beehive', 'The Round Tower', 'The Obsidian Dome', 'The Citadel'],
    correctAnswer: 0,
    explanation: 'The Executive Wing of Parliament is known as "The Beehive" due to its distinctive conical, tiered architecture, designed by British architect Sir Basil Spence.',
    keyFact: 'The Prime Minister’s office and the Cabinet meeting room are located on the top floors of the Beehive.',
    historicalContext: 'Construction of the Beehive was completed between 1969 and 1979 alongside the Parliamentary Library.'
  },

  // 3. Te Ao Māori & Language
  {
    id: 'q17',
    category: 'maori_culture',
    question: 'What are the official languages of New Zealand recognized by statute?',
    options: [
      'Te Reo Māori and New Zealand Sign Language (NZSL)',
      'English, French, and Māori',
      'English and Te Reo Māori only',
      'English, Samoan, and Māori'
    ],
    correctAnswer: 0,
    explanation: 'Te Reo Māori became an official language under the Māori Language Act 1987, and New Zealand Sign Language (NZSL) became an official language under the NZSL Act 2006. English is the de facto predominant official language by widespread convention.',
    keyFact: 'NZSL was recognized as an official language in April 2006, making New Zealand one of the first countries to recognize sign language in law.',
    historicalContext: 'Te Reo Māori was spoken by the majority of people in New Zealand in the early 19th century and has experienced a major revitalization movement since the 1970s.'
  },
  {
    id: 'q18',
    category: 'maori_culture',
    question: 'What does the core Māori concept of "Kaitiakitanga" mean in civic and environmental life?',
    options: [
      'Guardianship, stewardship, and responsibility to protect the environment and cultural heritage for future generations',
      'Personal prestige gained through military victory',
      'The protocol of entering a meeting house with shoes off',
      'The gift exchanged between opposing armies'
    ],
    correctAnswer: 0,
    explanation: 'Kaitiakitanga means guardianship and environmental stewardship. It embodies the duty to nurture and preserve the mauri (life force) of land, rivers, oceans, and living beings.',
    keyFact: 'Kaitiakitanga is embedded in New Zealand’s Resource Management laws and local council conservation planning.',
    historicalContext: 'In 2017, the Whanganui River (Te Awa Tupua) was granted legal personhood in New Zealand law, reflecting the deep concept that people and rivers are indivisible.'
  },
  {
    id: 'q19',
    category: 'maori_culture',
    question: 'What is "Manaakitanga", one of the most cherished values in New Zealand culture?',
    options: [
      'Hospitality, kindness, generosity, and showing deep care and respect for others',
      'Strict legal retribution for offenses',
      'The formal boundary of a tribal territory',
      'The genealogy connecting ancestors to the land'
    ],
    correctAnswer: 0,
    explanation: 'Manaakitanga expresses hospitality, uplifting another person’s dignity, and extending generosity and warmth to guests (manuhiri) and the wider community.',
    keyFact: 'Manaakitanga is frequently cited as the cornerstone of Kiwi hospitality and national character.',
    historicalContext: 'Whether on a marae or welcoming newcomers to New Zealand, manaakitanga ensures that guests feel honored and cared for.'
  },
  {
    id: 'q20',
    category: 'maori_culture',
    question: 'What is a "Marae" in Māori society?',
    options: [
      'A communal, sacred meeting ground that includes the carved meeting house (wharenui) and dining hall (wharekai)',
      'A decorative ceremonial canoe used exclusively for ocean racing',
      'A carved jade pendant worn only by chiefs',
      'A traditional woven cape made from kiwi feathers'
    ],
    correctAnswer: 0,
    explanation: 'A marae is a focal community complex comprising the open courtyard (marae ātea), carved ancestral meeting house (wharenui), and hospitality hall (wharekai). It is a centre of cultural life, tangihanga (funerals), and hui (gatherings).',
    keyFact: 'The wharenui represents an ancestor; the ridgepole is the spine, the rafters are the ribs, and the front carving is the head.',
    historicalContext: 'Shoes are taken off before stepping inside the wharenui as a sign of respect and sanctity.'
  },
  {
    id: 'q21',
    category: 'maori_culture',
    question: 'What is the traditional Māori welcoming ritual called when visiting a marae?',
    options: ['Pōwhiri (or pōhiri)', 'Kapa haka', 'Hāngī', 'Tā moko'],
    correctAnswer: 0,
    explanation: 'A pōwhiri is a formal welcome ceremony that involves a karanga (welcoming call), whaikōrero (formal speeches), waiata (songs), the hongi (sharing the breath of life), and sharing kai (food) to lift tapu.',
    keyFact: 'The hongi is performed by gently pressing noses and foreheads together.',
    historicalContext: 'The pōwhiri reconciles the manuhiri (visitors) with the tangata whenua (hosts), establishing trust and mutual respect.'
  },
  {
    id: 'q22',
    category: 'maori_culture',
    question: 'What is "Whanaungatanga"?',
    options: [
      'Kinship, close family relationships, and the deep sense of collective belonging and mutual support',
      'A formal treaty between nations',
      'The act of carving sacred pounamu greenstone',
      'A competitive speech contest'
    ],
    correctAnswer: 0,
    explanation: 'Whanaungatanga is about forming relationships, community connections, and valuing the collective wellbeing of the family and community over purely individual interest.',
    keyFact: 'Whanaungatanga provides individuals with a sense of identity and place (tūrangawaewae).',
    historicalContext: 'In contemporary New Zealand, whanaungatanga is widely embraced in schools, workplaces, and community groups.'
  },

  // 4. Geography & Society
  {
    id: 'q23',
    category: 'geography_and_society',
    question: 'What are the two main islands of New Zealand, and what is the body of water that separates them?',
    options: [
      'North Island (Te Ika-a-Māui) and South Island (Te Waipounamu); separated by Cook Strait (Te Moana-o-Raukawa)',
      'North Island and Stewart Island; separated by Foveaux Strait',
      'East Island and West Island; separated by Tasman Bay',
      'Te Wai Pounamu and Great Barrier Island; separated by Hauraki Gulf'
    ],
    correctAnswer: 0,
    explanation: 'New Zealand’s two principal landmasses are the North Island (Te Ika-a-Māui - the fish of Māui) and the South Island (Te Waipounamu - the waters of greenstone), separated by Cook Strait.',
    keyFact: 'Inter-island ferries travel between Wellington in the North Island and Picton in the South Island across Cook Strait.',
    historicalContext: 'Māori mythology tells of demigod Māui fishing up the North Island from his canoe (the South Island).'
  },
  {
    id: 'q24',
    category: 'geography_and_society',
    question: 'What is the capital city of New Zealand, and in what year did it replace Auckland as the capital?',
    options: [
      'Wellington (Te Whanganui-a-Tara), became capital in 1865',
      'Auckland (Tāmaki Makaurau), became capital in 1900',
      'Christchurch (Ōtautahi), became capital in 1882',
      'Dunedin (Ōtepoti), became capital in 1870'
    ],
    correctAnswer: 0,
    explanation: 'Wellington became the capital city in 1865, chosen because of its central geographic location at the foot of the North Island on Cook Strait, easing communication with both islands.',
    keyFact: 'Russell (Okiato) was the first capital in 1840, followed by Auckland in 1841, and Wellington in 1865.',
    historicalContext: 'During the 1860s Otago gold rush, southern parliamentarians argued the capital needed to be more accessible to the booming South Island.'
  },
  {
    id: 'q25',
    category: 'geography_and_society',
    question: 'What is New Zealand’s highest mountain, and what is its dual official name?',
    options: [
      'Aoraki / Mount Cook (3,724 metres)',
      'Mount Taranaki / Mount Egmont (2,518 metres)',
      'Mount Ruapehu (2,797 metres)',
      'Mount Aspiring / Tititea (3,033 metres)'
    ],
    correctAnswer: 0,
    explanation: 'Aoraki / Mount Cook in the Southern Alps (Kā Tiritiri o te Moana) is New Zealand’s highest peak at 3,724 metres. It is deeply sacred to Ngāi Tahu iwi.',
    keyFact: 'Under the 1998 Ngāi Tahu Claims Settlement, Aoraki became the first feature in NZ to receive an official dual Māori/English name with the Māori name first.',
    historicalContext: 'Sir Edmund Hillary honed his alpine mountaineering skills on Aoraki before summiting Mount Everest with Tenzing Norgay in 1953.'
  },
  {
    id: 'q26',
    category: 'geography_and_society',
    question: 'What public holiday, first officially celebrated across New Zealand in 2022, marks the Māori New Year?',
    options: ['Matariki', 'Waitangi Day', 'Labour Day', 'ANZAC Day'],
    correctAnswer: 0,
    explanation: 'Matariki marks the reappearance of the Pleiades star cluster in mid-winter skies, signaling the Māori New Year. In 2022, it became New Zealand’s first indigenous public holiday.',
    keyFact: 'Matariki is a time to remember those who have passed away, celebrate the present with family, and plan for the year ahead.',
    historicalContext: 'In some regions like the South Island and Whanganui, the rising of the star Puanga (Rigel) heralds the new year instead of Matariki.'
  },
  {
    id: 'q27',
    category: 'geography_and_society',
    question: 'What constellation is depicted on the New Zealand national flag, and how is it styled?',
    options: [
      'The Southern Cross (Crux), shown with four red five-pointed stars with white borders',
      'The Big Dipper, shown with seven gold stars',
      'Orion’s Belt, shown with three white stars',
      'The Southern Cross with five white stars and a Commonwealth star'
    ],
    correctAnswer: 0,
    explanation: 'The New Zealand flag features the Union Jack in the top left and four red stars edged in white representing the Southern Cross constellation against a royal blue background.',
    keyFact: 'Australia’s flag has five white stars for the Southern Cross plus a seven-pointed Federation Star; New Zealand’s has four red stars with white borders.',
    historicalContext: 'The current flag was designed in 1869 by First Lieutenant Albert Hastings Markham and officially adopted as the national flag in 1902.'
  },
  {
    id: 'q28',
    category: 'geography_and_society',
    question: 'What are the two national anthems of New Zealand that hold equal official status?',
    options: [
      '“God Defend New Zealand” (Aotearoa) and “God Save the King”',
      '“Pokarekare Ana” and “God Defend New Zealand”',
      '“Advance New Zealand” and “Land of the Long White Cloud”',
      '“Hoki Mai” and “Rule Britannia”'
    ],
    correctAnswer: 0,
    explanation: 'New Zealand is one of only two countries with two official national anthems: “God Defend New Zealand” and “God Save the King”. In civic ceremonies, the first verse is traditionally sung in Te Reo Māori followed by English.',
    keyFact: 'Thomas Bracken wrote the English poem in 1876, John Joseph Woods composed the music, and Thomas H. Smith translated it into Te Reo Māori.',
    historicalContext: '“God Defend New Zealand” was given equal status with “God Save the Queen” by Queen Elizabeth II in 1977.'
  },
  {
    id: 'q29',
    category: 'geography_and_society',
    question: 'What native bird is the flightless national emblem of New Zealand and the affectionate nickname for its people?',
    options: ['The Kiwi', 'The Kea', 'The Tūī', 'The Kakapo'],
    correctAnswer: 0,
    explanation: 'The kiwi is a unique nocturnal flightless bird native to New Zealand, having evolved over millions of years without land predators. New Zealanders around the globe are affectionately known as "Kiwis".',
    keyFact: 'Kiwi eggs are gigantic relative to the mother bird’s body size—up to 20% of her weight.',
    historicalContext: 'During World War I, New Zealand soldiers were first called "Kiwis" by fellow allied soldiers, and the symbol has represented the nation ever since.'
  },
  {
    id: 'q30',
    category: 'geography_and_society',
    question: 'What is the largest lake in New Zealand, created by a massive volcanic super-eruption thousands of years ago?',
    options: ['Lake Taupō (Taupō-nui-a-Tia)', 'Lake Wakatipu', 'Lake Te Anau', 'Lake Rotorua'],
    correctAnswer: 0,
    explanation: 'Lake Taupō, located in the central North Island, has a surface area of 616 square kilometers and occupies the caldera of a giant supervolcano that erupted around 232 CE.',
    keyFact: 'Lake Taupō is roughly the same surface area as the entire country of Singapore.',
    historicalContext: 'The Waikato River, New Zealand’s longest river at 425km, drains out of Lake Taupō and flows out to the Tasman Sea at Port Waikato.'
  },

  // 5. Ceremony & Civic Life
  {
    id: 'q31',
    category: 'citizenship_ceremony',
    question: 'When receiving New Zealand citizenship at a formal ceremony, what are candidates required to make?',
    options: [
      'Either an Oath of Allegiance (sworn before God) OR an Affirmation of Allegiance (a solemn secular declaration)',
      'A financial donation to the local city council',
      'A blood oath witnessed by three justices of the peace',
      'A loyalty test examination paper'
    ],
    correctAnswer: 0,
    explanation: 'Candidates can choose between the religious Oath of Allegiance (which mentions God) or the non-religious Affirmation of Allegiance. Both have identical legal validity.',
    keyFact: 'Candidates can make their Oath or Affirmation in English, Te Reo Māori, or both.',
    historicalContext: 'The Affirmation option ensures freedom of conscience and religious belief, in accordance with the New Zealand Bill of Rights Act 1990.'
  },
  {
    id: 'q32',
    category: 'citizenship_ceremony',
    question: 'In New Zealand, what is a legal civic duty required of every adult citizen who is eligible?',
    options: [
      'Enrolling on the Parliamentary electoral roll (it is compulsory by law to enrol, though voting is voluntary)',
      'Compulsory military conscription in peacetime',
      'Mandatory annual national community service',
      'Displaying the national flag on Waitangi Day'
    ],
    correctAnswer: 0,
    explanation: 'Under the Electoral Act 1993, all New Zealand citizens and permanent residents aged 18 and over who have lived in NZ continuously for 12 months are legally required to enrol on the electoral roll.',
    keyFact: 'While enrolling is legally required, turning out to cast your vote on election day is voluntary.',
    historicalContext: 'Eligible voters of Māori descent can choose between the General roll or the Māori roll during scheduled Māori Electoral Option periods.'
  },
  {
    id: 'q33',
    category: 'citizenship_ceremony',
    question: 'Who typically presides over the New Zealand citizenship ceremony to present your certificate?',
    options: [
      'The local Mayor of the city or district council (or a designated civic leader/councillor)',
      'A High Court judge',
      'The Minister of Foreign Affairs',
      'The Prime Minister directly in each town'
    ],
    correctAnswer: 0,
    explanation: 'Citizenship ceremonies are organized by local city and district councils. The Mayor (or a deputy mayor/councillor) presides over the ceremony on behalf of the Minister of Internal Affairs.',
    keyFact: 'New citizens often receive a native plant seedling (such as a kōwhai) from the council to plant in their home or community.',
    historicalContext: 'Local council ceremonies welcome candidates into both the national family of Aotearoa and the local district community.'
  },
  {
    id: 'q34',
    category: 'citizenship_ceremony',
    question: 'Does New Zealand allow its citizens to hold dual or multiple citizenships?',
    options: [
      'Yes, New Zealand law permits dual or multiple citizenships without requiring you to renounce your original nationality',
      'No, all candidates must formally renounce their birth citizenship',
      'Only if the second citizenship is Australian or British',
      'Only for individuals born on New Zealand soil'
    ],
    correctAnswer: 0,
    explanation: 'New Zealand allows dual and multiple citizenships. You do not need to give up your previous citizenship under New Zealand law (though you must check if your birth country allows dual citizenship).',
    keyFact: 'A New Zealand citizen holding dual nationality is entitled to hold both a New Zealand passport and a foreign passport.',
    historicalContext: 'The Citizenship Act 1977 modernized New Zealand citizenship laws and affirmed the right to hold dual nationality.'
  },
  {
    id: 'q35',
    category: 'citizenship_ceremony',
    question: 'Which government department is responsible for processing New Zealand citizenship applications and issuing passports?',
    options: [
      'Department of Internal Affairs (Te Tari Taiwhenua)',
      'Ministry of Foreign Affairs and Trade (MFAT)',
      'Ministry of Justice (Tāhū o te Ture)',
      'New Zealand Police (Ngā Pirihimana o Aotearoa)'
    ],
    correctAnswer: 0,
    explanation: 'The Department of Internal Affairs (DIA / Te Tari Taiwhenua) administers citizenship, birth/death/marriage registrations, and the issuance of New Zealand passports.',
    keyFact: 'New Zealand passports feature security motifs including silver ferns and the Southern Cross.',
    historicalContext: 'DIA is one of New Zealand’s oldest public service departments, tracing its roots to the Colonial Secretary’s Office established in 1840.'
  },
  {
    id: 'q36',
    category: 'citizenship_ceremony',
    question: 'Once you become a New Zealand citizen, what civic obligation may you be summoned by the Ministry of Justice to perform?',
    options: [
      'Jury service in the District Court or High Court',
      'Military border patrol duty',
      'Compulsory municipal tree planting',
      'Census enumerator inspections'
    ],
    correctAnswer: 0,
    explanation: 'Citizens enrolled on the electoral roll may be randomly summoned for jury service to serve on a jury of twelve peers in criminal trials or six in civil cases.',
    keyFact: 'Trial by jury is a fundamental cornerstone of the New Zealand justice system.',
    historicalContext: 'Jurors are compensated with an attendance allowance and travel expenses to fulfill their civic duty.'
  },
  {
    id: 'q37',
    category: 'government_and_law',
    question: 'What is the role of the New Zealand Bill of Rights Act 1990?',
    options: [
      'To affirm, protect, and promote human rights and fundamental freedoms in New Zealand',
      'To define trade tariffs on imported goods',
      'To govern the acquisition of state housing',
      'To set the salaries of members of Parliament'
    ],
    correctAnswer: 0,
    explanation: 'The New Zealand Bill of Rights Act 1990 affirms civil and political rights, including freedom of speech, freedom of religion, freedom from discrimination, and the right to a fair trial.',
    keyFact: 'All proposed government legislation is scrutinized by the Attorney-General for consistency with the Bill of Rights.',
    historicalContext: 'While not entrenched to strike down parliamentary acts, courts interpret statutes to be consistent with human rights wherever possible.'
  },
  {
    id: 'q38',
    category: 'treaty_and_history',
    question: 'Who was Dame Whina Cooper, and what historic event did she lead in 1975 at the age of 79?',
    options: [
      'The Māori Land March (Te Rōpū o te Matakite) from Te Hāpua to Parliament in Wellington under the banner “Not One More Acre”',
      'The first female Prime Minister of New Zealand',
      'The head of the Royal Commission on Social Security',
      'The first Māori woman admitted to the bar as a lawyer'
    ],
    correctAnswer: 0,
    explanation: 'Dame Whina Cooper led the famous 1975 Māori Land March, walking over 1,000 kilometres from the northern tip of the North Island to Wellington to demand the protection of Māori ancestral land.',
    keyFact: 'The march’s powerful rallying call was “Not one more acre of Māori land”.',
    historicalContext: 'The march united generations of Māori and Pākehā and was a turning point for modern Māori rights and cultural resurgence.'
  },
  {
    id: 'q39',
    category: 'geography_and_society',
    question: 'What is the silver fern (cyathea dealbata or ponga), and what is its cultural significance?',
    options: [
      'A native tree fern whose silver underside guided night travelers and which has become an iconic symbol of New Zealand sport, culture, and identity',
      'An invasive weed brought from Europe in the 1800s',
      'A flower that only blooms once every fifty years on Mount Ruapehu',
      'A rare seaweed found only along the Fiordland coast'
    ],
    correctAnswer: 0,
    explanation: 'The silver fern (ponga) is a native tree fern whose fronds have a distinctive silvery-white underside. Māori hunters and trackers laid the fronds silver-side up to reflect the moonlight along bush trails.',
    keyFact: 'The silver fern is the official emblem of the All Blacks, Silver Ferns netball team, and New Zealand Olympic teams.',
    historicalContext: 'The unfurling frond is called a "koru", representing new life, growth, strength, and peaceful harmony.'
  },
  {
    id: 'q40',
    category: 'treaty_and_history',
    question: 'In 1987, New Zealand enacted landmark legislation regarding nuclear weapons and propulsion. What was it?',
    options: [
      'The New Zealand Nuclear Free Zone, Disarmament, and Arms Control Act, establishing NZ as a nuclear-free zone',
      'A treaty establishing New Zealand’s first nuclear submarine fleet',
      'The authorization of nuclear power plants in the South Island',
      'A mutual defense pact requiring atomic testing in the Pacific'
    ],
    correctAnswer: 0,
    explanation: 'Prime Minister David Lange’s government passed the 1987 Nuclear Free Zone Act, banning nuclear-powered or nuclear-armed ships from entering New Zealand territorial waters and ports.',
    keyFact: 'The policy established New Zealand’s fiercely independent, principled foreign policy identity on the global stage.',
    historicalContext: 'The stance followed the French bombing of the Greenpeace ship Rainbow Warrior in Auckland Harbour in July 1985.'
  }
];
