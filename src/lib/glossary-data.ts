export interface GlossaryEntry {
  term_sa: string;
  term_hi: string;
  term_en: string;
  definition_hi: string;
  category: 'vyakarana' | 'vibhakti' | 'dhatu' | 'sandhi' | 'samanya';
  lesson_slug?: string;
}

export const CATEGORY_LABELS_GLOSSARY: Record<string, string> = {
  vyakarana: 'व्याकरण शब्दावली',
  vibhakti: 'विभक्ति एवं कारक',
  dhatu: 'धातु एवं क्रिया',
  sandhi: 'सन्धि',
  samanya: 'सामान्य शब्द',
};

export const glossaryData: GlossaryEntry[] = [
  // --- व्याकरण शब्दावली ---
  { term_sa: 'व्याकरणम्', term_hi: 'व्याकरण', term_en: 'Grammar', definition_hi: 'भाषा के नियमों का शास्त्र।', category: 'vyakarana' },
  { term_sa: 'स्वरः', term_hi: 'स्वर', term_en: 'Vowel', definition_hi: 'बिना किसी अन्य वर्ण की सहायता से उच्चारित वर्ण — अ, आ, इ, ई आदि।', category: 'vyakarana', lesson_slug: 'foundation/varnamala/swar' },
  { term_sa: 'व्यञ्जनम्', term_hi: 'व्यञ्जन', term_en: 'Consonant', definition_hi: 'स्वर की सहायता से उच्चारित वर्ण — क, ख, ग आदि।', category: 'vyakarana', lesson_slug: 'foundation/varnamala/vyanjan' },
  { term_sa: 'ह्रस्वः', term_hi: 'ह्रस्व', term_en: 'Short (vowel)', definition_hi: 'एक मात्रा वाला स्वर — अ, इ, उ, ऋ, ऌ।', category: 'vyakarana', lesson_slug: 'foundation/varnamala/swar' },
  { term_sa: 'दीर्घः', term_hi: 'दीर्घ', term_en: 'Long (vowel)', definition_hi: 'दो मात्रा वाला स्वर — आ, ई, ऊ, ॠ।', category: 'vyakarana', lesson_slug: 'foundation/varnamala/swar' },
  { term_sa: 'वर्गः', term_hi: 'वर्ग', term_en: 'Class (consonant group)', definition_hi: 'स्पर्श व्यञ्जनों का समूह — क-वर्ग, च-वर्ग आदि।', category: 'vyakarana', lesson_slug: 'foundation/varnamala/vyanjan' },
  { term_sa: 'विसर्गः', term_hi: 'विसर्ग', term_en: 'Visarga', definition_hi: 'शब्द के अन्त में आने वाली हल्की श्वास-ध्वनि (ः)।', category: 'vyakarana', lesson_slug: 'foundation/varnamala/visarga-anusvara' },
  { term_sa: 'अनुस्वारः', term_hi: 'अनुस्वार', term_en: 'Anusvara', definition_hi: 'म् का स्थानापन्न (ं), व्यञ्जन से पहले प्रयुक्त।', category: 'vyakarana', lesson_slug: 'foundation/varnamala/visarga-anusvara' },
  { term_sa: 'उपसर्गः', term_hi: 'उपसर्ग', term_en: 'Prefix', definition_hi: 'धातु के पहले लगने वाला शब्दांश — आ, प्र, उप, सम् आदि।', category: 'vyakarana', lesson_slug: 'foundation/vaakya-rachna/aa-upsarg-aur-bhakshay' },
  { term_sa: 'अव्ययम्', term_hi: 'अव्यय', term_en: 'Indeclinable', definition_hi: 'जिसके रूप नहीं बदलते — न, च, अपि, तत्र, कुत्र आदि।', category: 'vyakarana' },
  { term_sa: 'प्रत्ययः', term_hi: 'प्रत्यय', term_en: 'Suffix', definition_hi: 'शब्द या धातु के बाद लगने वाला अंश — -ति, -सि, -मि आदि।', category: 'vyakarana' },
  { term_sa: 'प्रातिपदिकम्', term_hi: 'प्रातिपदिक', term_en: 'Noun stem', definition_hi: 'शब्द का मूल रूप, विभक्ति लगने से पहले — राम, नर, बालक।', category: 'vyakarana' },
  { term_sa: 'वचनम्', term_hi: 'वचन', term_en: 'Number', definition_hi: 'एकवचन (1), द्विवचन (2), बहुवचन (2+)।', category: 'vyakarana' },
  { term_sa: 'पुरुषः', term_hi: 'पुरुष', term_en: 'Person', definition_hi: 'प्रथम (वह), मध्यम (तू), उत्तम (मैं)।', category: 'vyakarana' },
  { term_sa: 'लकारः', term_hi: 'लकार', term_en: 'Tense/Mood', definition_hi: 'क्रिया के काल और भाव को दर्शाने वाला प्रत्यय-समूह।', category: 'vyakarana' },
  { term_sa: 'गणः', term_hi: 'गण', term_en: 'Conjugation class', definition_hi: 'धातुओं का वर्गीकरण — भ्वादि (1st), अदादि (2nd) आदि।', category: 'vyakarana', lesson_slug: 'foundation/dhatu-roop/bhvadi-lat' },

  // --- विभक्ति एवं कारक ---
  { term_sa: 'विभक्तिः', term_hi: 'विभक्ति', term_en: 'Case ending', definition_hi: 'शब्द के रूप-परिवर्तन जो वाक्य में भूमिका बताते हैं।', category: 'vibhakti', lesson_slug: 'foundation/shabd-roop/vibhakti-parichay' },
  { term_sa: 'कारकम्', term_hi: 'कारक', term_en: 'Case role', definition_hi: 'क्रिया से सम्बन्धित शब्द की भूमिका — कर्ता, कर्म, करण आदि।', category: 'vibhakti', lesson_slug: 'foundation/shabd-roop/vibhakti-parichay' },
  { term_sa: 'प्रथमा', term_hi: 'प्रथमा विभक्ति', term_en: 'Nominative', definition_hi: 'कर्ता (—ने) — रामः गच्छति।', category: 'vibhakti', lesson_slug: 'foundation/shabd-roop/vibhakti-parichay' },
  { term_sa: 'द्वितीया', term_hi: 'द्वितीया विभक्ति', term_en: 'Accusative', definition_hi: 'कर्म (—को) — रामम् पश्य।', category: 'vibhakti', lesson_slug: 'foundation/shabd-roop/vibhakti-parichay' },
  { term_sa: 'तृतीया', term_hi: 'तृतीया विभक्ति', term_en: 'Instrumental', definition_hi: 'करण (—से/द्वारा) — रामेण कृतम्।', category: 'vibhakti', lesson_slug: 'foundation/shabd-roop/ram-shabd' },
  { term_sa: 'चतुर्थी', term_hi: 'चतुर्थी विभक्ति', term_en: 'Dative', definition_hi: 'सम्प्रदान (—के लिए) — रामाय फलम्।', category: 'vibhakti', lesson_slug: 'foundation/shabd-roop/ram-shabd' },
  { term_sa: 'पञ्चमी', term_hi: 'पञ्चमी विभक्ति', term_en: 'Ablative', definition_hi: 'अपादान (—से, अलग होना) — रामात् आगच्छति।', category: 'vibhakti', lesson_slug: 'foundation/shabd-roop/ram-shabd' },
  { term_sa: 'षष्ठी', term_hi: 'षष्ठी विभक्ति', term_en: 'Genitive', definition_hi: 'सम्बन्ध (—का/के/की) — रामस्य गृहम्।', category: 'vibhakti', lesson_slug: 'foundation/shabd-roop/ram-shabd' },
  { term_sa: 'सप्तमी', term_hi: 'सप्तमी विभक्ति', term_en: 'Locative', definition_hi: 'अधिकरण (—में/पर) — रामे विश्वासः।', category: 'vibhakti', lesson_slug: 'foundation/shabd-roop/ram-shabd' },
  { term_sa: 'सम्बोधनम्', term_hi: 'सम्बोधन', term_en: 'Vocative', definition_hi: 'पुकारना — हे राम!', category: 'vibhakti', lesson_slug: 'foundation/shabd-roop/ram-shabd' },

  // --- धातु एवं क्रिया ---
  { term_sa: 'धातुः', term_hi: 'धातु', term_en: 'Verb root', definition_hi: 'क्रिया का मूल रूप — गम्, पठ्, भू आदि।', category: 'dhatu', lesson_slug: 'foundation/dhatu-roop/bhvadi-lat' },
  { term_sa: 'लट् लकारः', term_hi: 'लट् लकार', term_en: 'Present tense', definition_hi: 'वर्तमान काल — गच्छति (वह जाता है)।', category: 'dhatu', lesson_slug: 'foundation/dhatu-roop/bhvadi-lat' },
  { term_sa: 'लृट् लकारः', term_hi: 'लृट् लकार', term_en: 'Future tense', definition_hi: 'भविष्यत् काल — गमिष्यति (वह जाएगा)।', category: 'dhatu', lesson_slug: 'foundation/dhatu-roop/bhvadi-lrt' },
  { term_sa: 'गम्', term_hi: 'गम् धातु', term_en: 'gam (to go)', definition_hi: 'जाना। लट्: गच्छति। लृट्: गमिष्यति।', category: 'dhatu', lesson_slug: 'foundation/vaakya-rachna/sarvanam-aur-gam' },
  { term_sa: 'पठ्', term_hi: 'पठ् धातु', term_en: 'paṭh (to read)', definition_hi: 'पढ़ना। लट्: पठति। लृट्: पठिष्यति।', category: 'dhatu', lesson_slug: 'foundation/dhatu-roop/bhvadi-lat' },
  { term_sa: 'भू', term_hi: 'भू धातु', term_en: 'bhū (to be)', definition_hi: 'होना। लट्: भवति। लृट्: भविष्यति।', category: 'dhatu', lesson_slug: 'foundation/dhatu-roop/bhvadi-lat' },
  { term_sa: 'नय्', term_hi: 'नय् धातु', term_en: 'nay (to carry)', definition_hi: 'ले जाना। लट्: नयति। लृट्: नेष्यति।', category: 'dhatu', lesson_slug: 'foundation/vaakya-rachna/nay-aanay-vibhakti' },
  { term_sa: 'भक्षय्', term_hi: 'भक्षय् धातु', term_en: 'bhakṣay (to eat)', definition_hi: 'खाना। लट्: भक्षयति। लृट्: भक्षयिष्यति।', category: 'dhatu', lesson_slug: 'foundation/vaakya-rachna/aa-upsarg-aur-bhakshay' },

  // --- सन्धि ---
  { term_sa: 'सन्धिः', term_hi: 'सन्धि', term_en: 'Sandhi (joining)', definition_hi: 'दो वर्णों के निकट आने पर होने वाला ध्वनि-परिवर्तन।', category: 'sandhi', lesson_slug: 'foundation/sandhi/swar-sandhi' },
  { term_sa: 'स्वरसन्धिः', term_hi: 'स्वर सन्धि', term_en: 'Vowel sandhi', definition_hi: 'दो स्वरों के मेल से होने वाली सन्धि।', category: 'sandhi', lesson_slug: 'foundation/sandhi/swar-sandhi' },
  { term_sa: 'व्यञ्जनसन्धिः', term_hi: 'व्यञ्जन सन्धि', term_en: 'Consonant sandhi', definition_hi: 'व्यञ्जन + स्वर/व्यञ्जन के मेल से होने वाली सन्धि।', category: 'sandhi', lesson_slug: 'foundation/sandhi/vyanjan-sandhi' },
  { term_sa: 'सवर्णदीर्घः', term_hi: 'सवर्ण दीर्घ', term_en: 'Savarna Dirgha', definition_hi: 'समान स्वर मिलें → दीर्घ — अ+अ=आ, इ+इ=ई।', category: 'sandhi', lesson_slug: 'foundation/sandhi/swar-sandhi' },
  { term_sa: 'गुणः', term_hi: 'गुण सन्धि', term_en: 'Guna sandhi', definition_hi: 'अ/आ + इ/ई=ए, अ/आ + उ/ऊ=ओ।', category: 'sandhi', lesson_slug: 'foundation/sandhi/swar-sandhi' },
  { term_sa: 'वृद्धिः', term_hi: 'वृद्धि सन्धि', term_en: 'Vriddhi sandhi', definition_hi: 'अ/आ + ए/ऐ=ऐ, अ/आ + ओ/औ=औ।', category: 'sandhi', lesson_slug: 'foundation/sandhi/swar-sandhi' },
  { term_sa: 'जश्त्वम्', term_hi: 'जश्त्व', term_en: 'Jashtva (voicing)', definition_hi: 'अघोष + घोष/स्वर → घोष — क→ग, त→द।', category: 'sandhi', lesson_slug: 'foundation/sandhi/vyanjan-sandhi' },

  // --- सामान्य शब्द ---
  { term_sa: 'सर्वनाम', term_hi: 'सर्वनाम', term_en: 'Pronoun', definition_hi: 'संज्ञा के स्थान पर प्रयुक्त शब्द — अहम्, त्वम्, सः।', category: 'samanya', lesson_slug: 'foundation/vaakya-rachna/sarvanam-aur-gam' },
  { term_sa: 'शब्दरूपम्', term_hi: 'शब्द रूप', term_en: 'Declension table', definition_hi: 'किसी शब्द के सभी विभक्ति-वचन रूपों की सारणी।', category: 'samanya', lesson_slug: 'foundation/shabd-roop/ram-shabd' },
  { term_sa: 'धातुरूपम्', term_hi: 'धातु रूप', term_en: 'Conjugation table', definition_hi: 'किसी धातु के सभी पुरुष-वचन रूपों की सारणी।', category: 'samanya', lesson_slug: 'foundation/dhatu-roop/bhvadi-lat' },
];
