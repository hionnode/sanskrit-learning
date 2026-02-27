import type { Lesson } from '../lib/typing-types';

export const lessons: Lesson[] = [
  {
    id: 1,
    label_hi: 'होम रो — व्यंजन',
    label_en: 'Home Row — Consonants',
    keys: ['प', 'र', 'क', 'त', 'च', 'ट'],
  },
  {
    id: 2,
    label_hi: 'होम रो — मात्राएँ',
    label_en: 'Home Row — Matras',
    keys: ['ो', 'े', '्', 'ि', 'ु'],
  },
  {
    id: 3,
    label_hi: 'होम रो — संयोजन',
    label_en: 'Home Row — Combinations',
    keys: ['क', 'प', 'र', 'त', 'च', 'ट'],
    combos: [
      'का', 'कि', 'कु', 'के', 'को',
      'पा', 'पि', 'पु', 'पे', 'पो',
      'रा', 'रि', 'रु', 'रे', 'रो',
      'ता', 'ति', 'तु', 'ते', 'तो',
      'चा', 'चि', 'चु', 'चे', 'चो',
      'टा', 'टि', 'टु', 'टे', 'टो',
    ],
  },
  {
    id: 4,
    label_hi: 'ऊपरी रो — व्यंजन',
    label_en: 'Upper Row — Consonants',
    keys: ['ब', 'ह', 'ग', 'द', 'ज', 'ड'],
  },
  {
    id: 5,
    label_hi: 'ऊपरी रो — मात्राएँ',
    label_en: 'Upper Row — Matras',
    keys: ['ौ', 'ै', 'ा', 'ी', 'ू'],
  },
  {
    id: 6,
    label_hi: 'ऊपरी + होम संयोजन',
    label_en: 'Upper + Home Combos',
    keys: ['ब', 'ह', 'ग', 'द', 'ज', 'ड'],
    combos: [
      'बा', 'बि', 'बु', 'बे', 'बो',
      'हा', 'ही', 'हु', 'हे', 'हो',
      'गा', 'गि', 'गु', 'गे', 'गो',
      'दा', 'दि', 'दु', 'दे', 'दो',
      'जा', 'जि', 'जु', 'जे', 'जो',
      'डा', 'डि', 'डु', 'डे', 'डो',
    ],
  },
  {
    id: 7,
    label_hi: 'निचली रो',
    label_en: 'Bottom Row',
    keys: ['म', 'न', 'व', 'ल', 'स', 'य', 'ं'],
  },
  {
    id: 8,
    label_hi: 'शिफ़्ट — स्वर व महाप्राण',
    label_en: 'Shift — Vowels & Aspirates',
    keys: [
      'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ',
      'ख', 'घ', 'छ', 'झ', 'फ', 'थ', 'ठ', 'ढ',
    ],
  },
  {
    id: 9,
    label_hi: 'सामान्य संयुक्ताक्षर',
    label_en: 'Common Conjuncts',
    keys: ['क', 'त', 'ज', 'श', '्'],
    combos: [
      'क्ष', 'त्र', 'ज्ञ', 'श्र',
      'क्क', 'त्त', 'प्र', 'स्त',
      'न्द', 'न्त', 'म्ब', 'ल्ल',
      'द्ध', 'द्व', 'ट्ठ', 'ड्ड',
    ],
  },
  {
    id: 10,
    label_hi: 'छोटे शब्द',
    label_en: 'Short Words',
    keys: [],
    words: [
      'नम', 'कर', 'घर', 'पर', 'जल', 'फल', 'वन', 'दल', 'मन', 'तन',
      'रात', 'दिन', 'काम', 'नाम', 'दाम', 'राम', 'बात', 'हाथ', 'साथ', 'पाठ',
      'चार', 'पाँच', 'सात', 'दस', 'सब', 'अब', 'तब', 'जब', 'कब', 'यह',
      'वह', 'इस', 'उस', 'कुछ', 'बहुत', 'लोग', 'देश', 'काल', 'गाँव', 'शहर',
      'पानी', 'खाना', 'जाना', 'आना', 'करना', 'देना', 'लेना', 'कहना', 'सुनना', 'पढ़ना',
    ],
  },
  {
    id: 11,
    label_hi: 'बड़े शब्द',
    label_en: 'Long Words',
    keys: [],
    words: [
      'विद्यालय', 'पुस्तकालय', 'अध्यापक', 'विद्यार्थी', 'परिवार',
      'सरकार', 'व्यापार', 'अस्पताल', 'समाचार', 'स्वतंत्रता',
      'प्रधानमंत्री', 'लोकतंत्र', 'गणतंत्र', 'अभिनेता', 'कार्यक्रम',
      'शिक्षाक्रम', 'परिस्थिति', 'अनुभव', 'प्रयोगशाला', 'सहयोग',
      'प्रतिनिधि', 'उत्तरदायी', 'महाविद्यालय', 'राजधानी', 'उपलब्ध',
      'संस्कृत', 'व्याकरण', 'अभ्यास', 'विज्ञान', 'प्रकृति',
    ],
  },
  {
    id: 12,
    label_hi: 'मिश्रित अभ्यास',
    label_en: 'Mixed Practice',
    keys: [],
    words: [
      // Short
      'नम', 'कर', 'घर', 'पर', 'जल', 'फल', 'वन', 'दल', 'मन', 'तन',
      'रात', 'दिन', 'काम', 'नाम', 'बात', 'हाथ', 'साथ', 'पाठ', 'देश', 'गाँव',
      'पानी', 'खाना', 'जाना', 'आना', 'करना', 'देना', 'लेना',
      // Long
      'विद्यालय', 'अध्यापक', 'विद्यार्थी', 'परिवार', 'सरकार',
      'व्यापार', 'समाचार', 'अभ्यास', 'संस्कृत', 'व्याकरण',
      'प्रकृति', 'अनुभव', 'राजधानी', 'कार्यक्रम', 'लोकतंत्र',
    ],
  },
];

/** Pick a random element from an array */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Shuffle array (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generate practice content for a lesson.
 * Returns an array of "words" (space-separated groups).
 */
export function generateSequence(lesson: Lesson, count: number): string[] {
  // Word-based lessons (10-12)
  if (lesson.words && lesson.words.length > 0) {
    const result: string[] = [];
    const shuffled = shuffle(lesson.words);
    for (let i = 0; i < count; i++) {
      result.push(shuffled[i % shuffled.length]);
    }
    return result;
  }

  // Combination lessons (3, 6, 9)
  if (lesson.combos && lesson.combos.length > 0) {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(pick(lesson.combos));
    }
    return result;
  }

  // Key-only lessons (1, 2, 4, 5, 7, 8): groups of 3-5 characters
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const groupSize = 3 + Math.floor(Math.random() * 3); // 3-5
    let group = '';
    for (let j = 0; j < groupSize; j++) {
      group += pick(lesson.keys);
    }
    result.push(group);
  }
  return result;
}
