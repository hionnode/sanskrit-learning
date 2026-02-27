export interface Quote {
  text: string;
  source: string;
  length: 'short' | 'medium' | 'long';
}

export const quotes: Quote[] = [
  // ─── Short (< 8 words) ────────────────────────────────────────────
  { text: 'सत्यमेव जयते', source: 'मुण्डकोपनिषद', length: 'short' },
  { text: 'अहिंसा परमो धर्मः', source: 'महाभारत', length: 'short' },
  { text: 'वसुधैव कुटुम्बकम', source: 'महोपनिषद', length: 'short' },
  { text: 'विद्या ददाति विनयम', source: 'सुभाषित', length: 'short' },
  { text: 'धर्मो रक्षति रक्षितः', source: 'मनुस्मृति', length: 'short' },
  { text: 'योगः कर्मसु कौशलम', source: 'भगवद्गीता', length: 'short' },
  { text: 'सर्वे भवन्तु सुखिनः', source: 'शान्ति मन्त्र', length: 'short' },
  { text: 'जहाँ चाह वहाँ राह', source: 'लोकोक्ति', length: 'short' },
  { text: 'करो या मरो', source: 'महात्मा गाँधी', length: 'short' },
  { text: 'एकता में बल है', source: 'लोकोक्ति', length: 'short' },
  { text: 'ज्ञान ही शक्ति है', source: 'लोकोक्ति', length: 'short' },
  { text: 'समय बहुत बलवान है', source: 'लोकोक्ति', length: 'short' },
  { text: 'सादा जीवन उच्च विचार', source: 'लोकोक्ति', length: 'short' },
  { text: 'धैर्य का फल मीठा होता है', source: 'लोकोक्ति', length: 'short' },
  { text: 'परिश्रम सफलता की कुंजी है', source: 'लोकोक्ति', length: 'short' },

  // ─── Medium (8-18 words) ──────────────────────────────────────────
  {
    text: 'बूँद बूँद से सागर भरता है मेहनत से सफलता मिलती है',
    source: 'लोकोक्ति',
    length: 'medium',
  },
  {
    text: 'जो मेहनत करता है उसे सफलता अवश्य मिलती है',
    source: 'लोकोक्ति',
    length: 'medium',
  },
  {
    text: 'शिक्षा सबसे बड़ा धन है जो कोई चुरा नहीं सकता',
    source: 'चाणक्य',
    length: 'medium',
  },
  {
    text: 'अच्छे विचार रखो अच्छे काम करो अच्छा जीवन बिताओ',
    source: 'सुभाषित',
    length: 'medium',
  },
  {
    text: 'हर दिन एक नई शुरुआत है इसे सार्थक बनाओ',
    source: 'सुभाषित',
    length: 'medium',
  },
  {
    text: 'सच्चा मित्र वही है जो कठिन समय में साथ दे',
    source: 'लोकोक्ति',
    length: 'medium',
  },
  {
    text: 'समय का सदुपयोग करो यही जीवन की सबसे बड़ी सीख है',
    source: 'सुभाषित',
    length: 'medium',
  },
  {
    text: 'विद्या से विनय आती है विनय से योग्यता आती है',
    source: 'सुभाषित',
    length: 'medium',
  },
  {
    text: 'अपने सपनों को पूरा करने के लिए निरंतर प्रयास करो',
    source: 'सुभाषित',
    length: 'medium',
  },
  {
    text: 'जीवन में सफलता पाने के लिए कठिन परिश्रम करना पड़ता है',
    source: 'लोकोक्ति',
    length: 'medium',
  },
  {
    text: 'खाली बैठने से कुछ नहीं होता मेहनत करो तो सफलता मिलती है',
    source: 'लोकोक्ति',
    length: 'medium',
  },
  {
    text: 'किताबें मनुष्य की सबसे अच्छी मित्र होती हैं',
    source: 'सुभाषित',
    length: 'medium',
  },
  {
    text: 'सत्य की राह कठिन होती है पर अंत में विजय सत्य की ही होती है',
    source: 'लोकोक्ति',
    length: 'medium',
  },

  // ─── Long (18+ words) ─────────────────────────────────────────────
  {
    text: 'जीवन एक संघर्ष है और इस संघर्ष में जो डटकर खड़ा रहता है वही सफल होता है',
    source: 'सुभाषित',
    length: 'long',
  },
  {
    text: 'शिक्षा का उद्देश्य केवल नौकरी पाना नहीं है बल्कि एक अच्छा इंसान बनना भी है',
    source: 'सुभाषित',
    length: 'long',
  },
  {
    text: 'भारत एक महान देश है जहाँ अनेक भाषाएँ बोली जाती हैं और विविध परंपराएँ फलती फूलती हैं',
    source: 'सामान्य ज्ञान',
    length: 'long',
  },
  {
    text: 'अगर आप सच में कुछ पाना चाहते हैं तो पूरी लगन और मेहनत से उसके पीछे लग जाओ',
    source: 'सुभाषित',
    length: 'long',
  },
  {
    text: 'संसार हमारा सबसे बड़ा शिक्षक है इससे हम धैर्य और संतोष सीख सकते हैं',
    source: 'सुभाषित',
    length: 'long',
  },
  {
    text: 'अच्छे लोगों की संगति में रहने से मन शुद्ध होता है और बुरे विचार दूर हो जाते हैं',
    source: 'सुभाषित',
    length: 'long',
  },
  {
    text: 'विद्यालय में बच्चे पढ़ाई के साथ साथ अनुशासन और सहयोग भी सीखते हैं जो जीवन में काम आता है',
    source: 'सामान्य ज्ञान',
    length: 'long',
  },
  {
    text: 'हर व्यक्ति के जीवन में कठिन समय आता है लेकिन जो हार नहीं मानता वही आगे बढ़ता है',
    source: 'लोकोक्ति',
    length: 'long',
  },
  {
    text: 'देश की प्रगति उसके नागरिकों के परिश्रम और समर्पण पर निर्भर करती है इसलिए हर किसी को अपना कर्तव्य निभाना चाहिए',
    source: 'सुभाषित',
    length: 'long',
  },
  {
    text: 'भाषा सीखना एक ऐसी यात्रा है जिसमें धैर्य और निरंतर अभ्यास की आवश्यकता होती है पर इसका फल अनमोल है',
    source: 'सुभाषित',
    length: 'long',
  },
];

/** Get a random quote, optionally filtered by length */
export function getRandomQuote(length?: 'short' | 'medium' | 'long'): Quote {
  const filtered = length ? quotes.filter((q) => q.length === length) : quotes;
  return filtered[Math.floor(Math.random() * filtered.length)];
}
