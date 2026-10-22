import { HistoryMilestone, TreatyArticle } from '../types';

export const HISTORICAL_MILESTONES: HistoryMilestone[] = [
  {
    id: 'm1',
    year: 'c. 1250–1300 CE',
    period: 'Early Settlement',
    title: 'The Great Polynesian Voyaging & Arrival in Aotearoa',
    teReoTitle: 'Te Hekenga Nui o ngā Waka',
    category: 'Foundations & Voyaging',
    summary: 'Polynesian navigators crossed thousands of kilometers of open ocean in double-hulled waka hourua to settle Aotearoa, founding Māori civilization.',
    fullStory: [
      'Using extraordinary navigational science—reading ocean swell patterns, prevailing trade winds, star constellations, cloud formations over landmasses, and wildlife migratory pathways—Māori ancestors voyaged from eastern Polynesian homelands (Hawaiki).',
      'According to tribal traditions, the legendary explorer Kupe discovered Aotearoa while pursuing Te Wheke-a-Muturangi, a giant mythical octopus. Kupe’s wife, Kuramārōtini, is credited with naming the new land "He Ao! He Ao! He Aotea! He Aotearoa!" ("A cloud! A white cloud! A long white cloud!").',
      'Subsequent waves of great ancestral voyaging waka—including Tainui, Te Arawa, Mātaatua, Kurahaupō, Tokomaru, Aotea, and Tākitimu—brought founding ancestors whose descendants established iwi (tribes) and hapū (sub-tribes) across the North and South Islands.'
    ],
    significance: 'Established Tangata Whenua (the indigenous people of the land) who developed a rich, sophisticated oral culture, social structure based on whakapapa (genealogy), and deep kaitiakitanga (stewardship) of the natural environment.',
    keyFigures: ['Kupe', 'Kuramārōtini', 'Tamatekapua', 'Hoturoa']
  },
  {
    id: 'm2',
    year: '1642 & 1769',
    period: 'European Exploration',
    title: 'First European Contact: Abel Tasman & Captain James Cook',
    teReoTitle: 'Te Taenga Mai o ngā Pākehā Tuatahi',
    category: 'Foundations & Voyaging',
    summary: 'Dutch navigator Abel Tasman first sighted New Zealand in 1642, followed by British navigator James Cook and Tahitian navigator Tupaia in 1769.',
    fullStory: [
      'In December 1642, Dutch navigator Abel Tasman of the Dutch East India Company sighted the South Island. An encounter in Golden Bay (Mohua) with Ngāti Tūmatakōkiri led to conflict, and Tasman departed without landing, mapping the western coast as "Staten Landt", later renamed "Nova Zeelandia" by Dutch cartographers.',
      'In October 1769, Captain James Cook on the HMS Endeavour arrived at Poverty Bay (Tūranganui-a-Kiwa). Crucially, Cook was accompanied by Tupaia, an aristocratic Tahitian high priest and master navigator whose Polynesian language allowed him to communicate directly with Māori leaders.',
      'Cook circumnavigated and mapped both the North and South Islands with remarkable accuracy, paving the way for whalers, sealers, traders, and Christian missionaries in subsequent decades.'
    ],
    significance: 'Brought Aotearoa into global trade networks and initiated reciprocal exchanges between Māori and European (Pākehā) visitors.',
    keyFigures: ['Abel Tasman', 'James Cook', 'Tupaia']
  },
  {
    id: 'm3',
    year: '1835',
    period: 'Declaration of Independence',
    title: 'He Whakaputanga: The Declaration of Independence',
    teReoTitle: 'He Whakaputanga o te Rangatiratanga o Nu Tirene',
    category: 'Treaty & Crown',
    summary: 'Thirty-four northern Māori rangatira signed a formal declaration asserting independence, sovereignty, and confederated governance of New Zealand.',
    fullStory: [
      'Organized at Waitangi by British Resident James Busby and signed on 28 October 1835, He Whakaputanga was signed initially by 34 northern rangatira (paramount chiefs), and eventually signed by 52 chiefs, including influential southern leaders such as Te Wherowhero of Waikato.',
      'The declaration proclaimed "te Rangatiratanga" (all sovereign power and authority) resided entirely within the hereditary chiefs and heads of tribes, under the collective entity "Te Whakaminenga o ngā Hapū o Nu Tirene" (The Confederation of United Tribes).',
      'The British government and King William IV formally acknowledged and accepted the Declaration of Independence, recognizing New Zealand as an independent sovereign nation under international law.'
    ],
    significance: 'He Whakaputanga is the foundational constitutional document acknowledging Māori national independence and sovereignty before 1840, and the essential context for understanding Te Tiriti o Waitangi.',
    keyFigures: ['James Busby', 'Tamati Waka Nene', 'Patuone', 'Eruera Maihi Patuone', 'Te Kēmara']
  },
  {
    id: 'm4',
    year: '6 February 1840',
    period: 'Founding Document',
    title: 'Te Tiriti o Waitangi: The Treaty of Waitangi',
    teReoTitle: 'Te Tiriti o Waitangi',
    category: 'Treaty & Crown',
    summary: 'The founding compact between the British Crown and Māori chiefs, establishing British governorship while guaranteeing Māori chieftainship and royal protection.',
    fullStory: [
      'On 6 February 1840, British Lieutenant-Governor William Hobson and over 40 Māori chiefs signed the Treaty at Waitangi. In the months that followed, nine copies of the Treaty were taken around the country, gathering more than 500 signatures, nearly all on the Māori-language version.',
      'The Treaty contains three primary written articles and an unwritten fourth pledge concerning freedom of religion. However, profound linguistic discrepancies exist between the English and Māori texts.',
      'In Article One of the Māori text, chiefs ceded "kāwanatanga" (governorship/civil administration), while the English text stated they ceded "sovereignty". In Article Two of the Māori text, chiefs were guaranteed "tino rangatiratanga" (full chieftainship and authority) over their lands, settlements, and all treasures (taonga).',
      'In Article Three, the Crown granted Māori the royal protection of the Queen and all the identical rights and privileges of British subjects.'
    ],
    significance: 'Te Tiriti o Waitangi is recognized as New Zealand’s founding document and the constitutional basis for the ongoing partnership between Māori and the Crown.',
    keyFigures: ['William Hobson', 'Hone Heke', 'Tamati Waka Nene', 'Henry Williams', 'Eruera Maihi Patuone']
  },
  {
    id: 'm5',
    year: '1845–1872',
    period: 'Conflict & Confiscation',
    title: 'The New Zealand Wars & Land Confiscations (Raupatu)',
    teReoTitle: 'Ngā Pakanga o Aotearoa me te Raupatu',
    category: 'Treaty & Crown',
    summary: 'A series of armed conflicts between Crown forces and Māori defending land, sovereignty, and autonomy, followed by millions of acres of confiscation.',
    fullStory: [
      'As British settler immigration boomed following 1840, intense pressure to acquire land mounted. Conflicts erupted first in the North (Flagstaff War 1845–46 led by Hone Heke and Te Ruki Kawiti), and later in Taranaki (1860) and the Waikato (1863 invasion).',
      'The Kīngitanga (Māori King Movement) was founded in 1858 with Pōtatau Te Wherowhero as the first Māori King to unite tribes, halt land sales, and preserve Māori autonomy.',
      'Following the wars, the colonial government enacted the New Zealand Settlements Act 1863, carrying out widespread "raupatu" (confiscation) of over 3 million acres of fertile Māori land across Waikato, Taranaki, Bay of Plenty, and Hawke’s Bay.',
      'The Native Land Acts also individualized communal land titles, resulting in the alienation of tens of millions of further acres over subsequent decades.'
    ],
    significance: 'These conflicts and confiscations caused lasting economic, cultural, and spiritual disruption for iwi, providing the fundamental basis for modern Waitangi Tribunal claims and Crown apologies.',
    keyFigures: ['Hone Heke', 'Te Ruki Kawiti', 'Pōtatau Te Wherowhero', 'Wiremu Tamihana', 'Titokowaru', 'Te Kooti']
  },
  {
    id: 'm6',
    year: '1893',
    period: 'Democratic Milestone',
    title: 'Women’s Suffrage: First in the World to Grant Voting Rights',
    teReoTitle: 'Te Pōtitanga Wahine o te Ao',
    category: 'Social Rights',
    summary: 'New Zealand became the first self-governing country in the world where women won the right to vote in national parliamentary elections.',
    fullStory: [
      'Led by Kate Sheppard and the Women’s Christian Temperance Union (WCTU), suffragists organized three nationwide petitions to Parliament in 1891, 1892, and 1893.',
      'The 1893 petition was signed by nearly 32,000 women—representing nearly a quarter of all adult European women in New Zealand, alongside thousands of Māori women who also advocated for franchise.',
      'The monster petition was glued together into a massive continuous roll 270 metres long, theatrically rolled down the central aisle of the House of Representatives by MP Sir John Hall.',
      'Despite fierce opposition from the liquor trade and conservative politicians, the Electoral Act was passed by the Legislative Council and signed into law by Governor Lord Glasgow on 19 September 1893. Just ten weeks later, women turned out in record numbers to cast their votes in the November general election.'
    ],
    significance: 'Solidified New Zealand’s international reputation as an egalitarian pioneer in democratic rights and gender equality. Kate Sheppard’s portrait is proudly featured on the New Zealand $10 banknote.',
    keyFigures: ['Kate Sheppard', 'Meri Te Tai Mangakāhia', 'Sir John Hall', 'Amey Daldy', 'Lord Glasgow']
  },
  {
    id: 'm7',
    year: '1915',
    period: 'World War I',
    title: 'Gallipoli & The Emergence of the ANZAC Spirit',
    teReoTitle: 'Te Pakanga i Karipori me te Wairua ANZAC',
    category: 'Constitution & Governance',
    summary: 'The landings at Gallipoli in April 1915 galvanized New Zealand’s national consciousness, commemorated every year on ANZAC Day.',
    fullStory: [
      'On 25 April 1915, the Australian and New Zealand Army Corps (ANZAC) landed on the shores of Gallipoli Peninsula in the Ottoman Empire (modern Turkey).',
      'Over eight grueling months of trench warfare, extreme heat, disease, and steep cliffs, New Zealand soldiers showed extraordinary courage, resourcefulness, and camaraderie under harrowing conditions.',
      'Over 2,779 New Zealand soldiers lost their lives at Gallipoli—around one in five who served there. Across the entire First World War, with a total population of just over 1 million, more than 100,000 New Zealanders served abroad, and over 18,000 died.',
      'The Māori Pioneer Battalion and Pacific Island volunteers also served with distinction, earning widespread respect.'
    ],
    significance: 'Gallipoli is widely seen as a defining crucible of New Zealand nationhood, forging a distinct national identity separate from Great Britain. 25 April is observed as ANZAC Day, a solemn national day of remembrance.',
    keyFigures: ['William Malone (Wellington Battalion commander)', 'Sir Peter Buck (Te Rangi Hīroa)', 'Mustafa Kemal Atatürk']
  },
  {
    id: 'm8',
    year: '1935–1938',
    period: 'The Welfare State',
    title: 'The First Labour Government & Social Security Act',
    teReoTitle: 'Te Whakatūnga o te Hauora me te Toko i te Ora',
    category: 'Social Rights',
    summary: 'Michael Joseph Savage’s government created the world’s most comprehensive cradle-to-grave welfare state, introducing free public healthcare and pensions.',
    fullStory: [
      'Emerging from the severe poverty of the Great Depression, the First Labour Government was elected in 1935, led by the beloved and compassionate Prime Minister Michael Joseph Savage.',
      'The government passed the landmark Social Security Act 1938, creating universal superannuation, unemployment relief, disability benefits, family allowances, and free public hospital care.',
      'The government also initiated an ambitious state housing construction programme, building thousands of quality brick homes for working families that remain beloved architectural icons across New Zealand suburbs today.'
    ],
    significance: 'Established the enduring expectation that government has a duty to ensure health, housing, and financial dignity for all citizens.',
    keyFigures: ['Michael Joseph Savage', 'Peter Fraser', 'Walter Nash']
  },
  {
    id: 'm9',
    year: '1975',
    period: 'Māori Renaissance',
    title: 'The Māori Land March & The Waitangi Tribunal Act',
    teReoTitle: 'Te Hikoi o te Tiriti me te Taraipiunara o Waitangi',
    category: 'Modern Aotearoa',
    summary: 'Dame Whina Cooper led the historic Land March from the Far North to Parliament under the banner “Not One More Acre of Māori Land”.',
    fullStory: [
      'On 14 September 1975, 79-year-old Dame Whina Cooper set off from Te Hāpua in the Far North at the head of Te Rōpū o te Matakite (Those with Foresight). Walking down State Highway 1, thousands of marchers joined them over four weeks.',
      'The march arrived at Parliament in Wellington on 13 October 1975 with over 5,000 people, presenting a petition signed by 60,000 people demanding an end to the alienation of Māori land.',
      'That same year, Parliament passed the Treaty of Waitangi Act 1975, creating the permanent Waitangi Tribunal to hear and report on contemporary Crown breaches of Treaty principles.',
      'In 1985, Parliament amended the Act to allow the Tribunal to investigate claims dating back to 1840, beginning the formal era of historical Treaty settlements.'
    ],
    significance: 'Catalyzed modern bi-cultural Aotearoa, leading to extensive Crown apologies, financial restitution, statutory co-governance arrangements, and the resurgence of Te Reo Māori in public life.',
    keyFigures: ['Dame Whina Cooper', 'Matiu Rata', 'Eva Rickard']
  },
  {
    id: 'm10',
    year: '1987 & 1996',
    period: 'Modern Governance',
    title: 'Nuclear-Free New Zealand & The Introduction of MMP',
    teReoTitle: 'Te Ao Tōrangapū Hou: MMP me te Rohe Whakangao-Kore',
    category: 'Constitution & Governance',
    summary: 'New Zealand established its principled nuclear-free legislation in 1987 and revolutionized democracy by adopting the MMP voting system in 1996.',
    fullStory: [
      'Following decades of French atmospheric nuclear testing in the South Pacific and the 1985 state-sponsored French sabotage of the Greenpeace flagship Rainbow Warrior in Auckland, Prime Minister David Lange enacted the New Zealand Nuclear Free Zone, Disarmament, and Arms Control Act 1987.',
      'In 1992 and 1993, New Zealanders voted in nationwide referendums to abandon the old British First-Past-The-Post voting system in favor of Mixed Member Proportional (MMP).',
      'Under MMP, first used in the 1996 general election, Parliament became far more diverse, with increased representation of Māori, Pacific peoples, women, and smaller political parties in coalition governments.'
    ],
    significance: 'Reshaped New Zealand’s modern independent foreign policy and made its Parliament one of the most proportionally representative democracies in the world.',
    keyFigures: ['David Lange', 'Sir Geoffrey Palmer', 'Jim Bolger']
  },
  {
    id: 'm11',
    year: '2022 to Present',
    period: 'Contemporary Identity',
    title: 'Matariki as a National Holiday & Modern Bicultural Nation',
    teReoTitle: 'Te Whakanui i a Matariki hei Rā Whakatā ā-Motu',
    category: 'Modern Aotearoa',
    summary: 'Matariki was enacted as New Zealand’s first indigenous public holiday, marking a new era of celebration, remembrance, and shared cultural identity.',
    fullStory: [
      'In June 2022, New Zealand officially celebrated Matariki as a nationwide public holiday for the first time, marking the reappearance of the Pleiades star cluster in mid-winter skies.',
      'Led by renowned Māori astronomy scholar Professor Rangi Mātāmua and the Matariki Advisory Group, the holiday is grounded in three core principles: Matariki Hunga Nui (Remembrance of those who passed), Matariki Ahunga Nui (Celebrating the present harvest and community), and Matariki Manako Nui (Looking ahead to the future).',
      'Today, New Zealand continues to build an inclusive, multicultural society founded upon its unique bicultural constitutional partnership.'
    ],
    significance: 'Represents the modern maturity of Aotearoa New Zealand—honoring indigenous mātauranga (knowledge) as a shared national treasure for all citizens from every background.',
    keyFigures: ['Professor Rangi Mātāmua', 'Dame Cindy Kiro (Governor-General)']
  }
];

export const TREATY_ARTICLES_COMPARISON: TreatyArticle[] = [
  {
    number: 1,
    title: 'Article 1: Government & Governance',
    englishVersion: {
      text: 'The Chiefs of the Confederation of the United Tribes of New Zealand and the separate and independent Chiefs... cede to Her Majesty the Queen of England absolutely and without reservation all the rights and powers of Sovereignty which the said Confederation or Individual Chiefs respectively exercise or possess...',
      interpretation: 'The English text explicitly states that Māori chiefs ceded total, absolute "sovereignty" over New Zealand to Queen Victoria.'
    },
    maoriVersion: {
      text: 'Ko ngā Rangatira o te Wakaminenga me ngā Rangatira katoa hoki kīhai i uru ki taua wakaminenga ka tuku rawa atu ki te Kuini o Ingarangi ake tonu atu—te Kāwanatanga katoa o ō rātou whenua.',
      translation: 'The Chiefs of the Confederation and all the Chiefs who have not joined that Confederation give absolutely to the Queen of England for ever the complete governorship (kāwanatanga) of their land.',
      keyConcept: 'Kāwanatanga (Governorship)',
      interpretation: 'Māori chiefs understood they were granting the Crown the power of "kāwanatanga"—the civil governorship over British settlers to maintain order, while retaining their own mana (authority) and rangatiratanga (chieftainship).'
    },
    modernSignificance: 'The core conflict lies between "sovereignty" (supreme power) and "kāwanatanga" (governorship). The Waitangi Tribunal confirmed in 2014 (Te Paparahi o Te Raki inquiry) that the northern rangatira did not cede their sovereignty when signing Te Tiriti.'
  },
  {
    number: 2,
    title: 'Article 2: Lands, Treasures & Chieftainship',
    englishVersion: {
      text: 'Her Majesty the Queen of England confirms and guarantees to the Chiefs and Tribes of New Zealand and to the respective families and individuals thereof the full exclusive and undisturbed possession of their Lands and Estates Forests Fisheries and other properties which they may collectively or individually possess so long as it is their wish and desire to retain the same in their possession...',
      interpretation: 'Guaranteed property ownership of lands, estates, forests, and fisheries, with Crown pre-emption (exclusive first right to purchase land).'
    },
    maoriVersion: {
      text: 'Ko te Kuini o Ingarangi ka whakarite ka whakaae ki ngā Rangatira ki ngā hapū—ki ngā tangata katoa o Nu Tireni te tino rangatiratanga o ō rātou whenua ō rātou kāinga me ō rātou taonga katoa...',
      translation: 'The Queen of England agrees to protect the chiefs, the subtribes and all the people of New Zealand in the unqualified exercise of their chieftainship (tino rangatiratanga) over their lands, their villages, and all their treasures (taonga katoa)...',
      keyConcept: 'Te Tino Rangatiratanga & Taonga',
      interpretation: 'Guaranteed "tino rangatiratanga"—supreme authority and self-determination—not just over physical land and villages, but over all "taonga" (treasured possessions, including language, culture, waterways, and sacred places).'
    },
    modernSignificance: 'Article 2 is the foundation for Māori self-determination, language revitalization, fisheries settlements, and environmental guardianship co-governance today.'
  },
  {
    number: 3,
    title: 'Article 3: Royal Protection & Equal Rights',
    englishVersion: {
      text: 'In consideration thereof Her Majesty the Queen of England extends to the Natives of New Zealand Her royal protection and imparts to them all the Rights and Privileges of British Subjects.',
      interpretation: 'Māori individuals were granted the protection of the Crown and all the civil and legal rights of British citizens.'
    },
    maoriVersion: {
      text: 'Hei whakaritenga mai hoki tēnei mō te whakaaetanga ki te Kāwanatanga o te Kuini—Ka tiakina e te Kuini o Ingarangi ngā tangata māori katoa o Nu Tireni ka tukua ki a rātou ngā tikanga katoa rite tahi ki ana mea ki ngā tāngata o Ingarangi.',
      translation: 'For this agreed arrangement towards the Government of the Queen, the Queen of England will protect all the ordinary people of New Zealand and will give them the same rights and customs (tikanga) equal to the people of England.',
      keyConcept: 'Ōritetanga (Equality)',
      interpretation: 'Both texts agree on this article: guaranteeing equality (ōritetanga) before the law and state protection for all Māori individuals.'
    },
    modernSignificance: 'Ensures non-discrimination, equal access to justice, education, health, and civic life for all citizens of Aotearoa.'
  }
];

export const TREATY_PRINCIPLES = [
  {
    principle: 'Partnership (Whakahoahoa)',
    description: 'The Crown and Māori are partners acting in good faith, with mutual respect, cooperation, and reciprocal duty toward one another.'
  },
  {
    principle: 'Active Protection (Tiaki Motuhake)',
    description: 'The Crown has an active, positive duty to safeguard Māori interests, land, cultural treasures (taonga), and language (Te Reo Māori).'
  },
  {
    principle: 'Participation (Whai Wāhitanga)',
    description: 'Māori must be provided meaningful opportunities to participate in decision-making and governance at local, regional, and national levels.'
  },
  {
    principle: 'Redress (Whakatika)',
    description: 'The Crown must provide fair and equitable resolution and apology for past breaches of Treaty promises, confiscations, and grievances.'
  }
];
