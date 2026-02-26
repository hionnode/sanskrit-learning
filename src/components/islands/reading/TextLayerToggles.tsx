import { useState } from 'preact/hooks';

interface WordMeaning {
  word: string;
  meaning_hi: string;
}

interface Props {
  sanskritText: string;
  padachheda?: string;
  wordMeanings: WordMeaning[];
  anvaya?: string;
  translationHi: string;
}

export default function TextLayerToggles({ sanskritText, padachheda, wordMeanings, anvaya, translationHi }: Props) {
  const [showPadachheda, setShowPadachheda] = useState(false);
  const [showMeanings, setShowMeanings] = useState(false);
  const [showAnvaya, setShowAnvaya] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div class="space-y-6">
      {/* Original Sanskrit Text */}
      <div class="sanskrit-example text-sanskrit-lg" lang="sa">
        {sanskritText.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < sanskritText.split('\n').length - 1 && <br />}
          </span>
        ))}
      </div>

      {/* Toggle Buttons */}
      <div class="flex flex-wrap gap-2">
        {padachheda && (
          <button
            onClick={() => setShowPadachheda(!showPadachheda)}
            class={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
              showPadachheda
                ? 'bg-saffron-500 text-white'
                : 'bg-amber-100 dark:bg-charcoal-700 text-stone-700 dark:text-stone-300 hover:bg-amber-200 dark:hover:bg-charcoal-700'
            }`}
          >
            पदच्छेद
          </button>
        )}
        {wordMeanings.length > 0 && (
          <button
            onClick={() => setShowMeanings(!showMeanings)}
            class={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
              showMeanings
                ? 'bg-saffron-500 text-white'
                : 'bg-amber-100 dark:bg-charcoal-700 text-stone-700 dark:text-stone-300 hover:bg-amber-200 dark:hover:bg-charcoal-700'
            }`}
          >
            शब्दार्थ
          </button>
        )}
        {anvaya && (
          <button
            onClick={() => setShowAnvaya(!showAnvaya)}
            class={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
              showAnvaya
                ? 'bg-saffron-500 text-white'
                : 'bg-amber-100 dark:bg-charcoal-700 text-stone-700 dark:text-stone-300 hover:bg-amber-200 dark:hover:bg-charcoal-700'
            }`}
          >
            अन्वय
          </button>
        )}
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          class={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
            showTranslation
              ? 'bg-saffron-500 text-white'
              : 'bg-amber-100 dark:bg-charcoal-700 text-stone-700 dark:text-stone-300 hover:bg-amber-200 dark:hover:bg-charcoal-700'
          }`}
        >
          हिन्दी अनुवाद
        </button>
      </div>

      {/* Toggled Layers */}
      {showPadachheda && padachheda && (
        <div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <h3 class="text-sm font-bold text-blue-700 dark:text-blue-400 mb-2">पदच्छेद</h3>
          <p class="font-devanagari text-stone-800 dark:text-stone-200 leading-relaxed" lang="sa">
            {padachheda}
          </p>
        </div>
      )}

      {showMeanings && wordMeanings.length > 0 && (
        <div class="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
          <h3 class="text-sm font-bold text-purple-700 dark:text-purple-400 mb-3">शब्दार्थ</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {wordMeanings.map((wm) => (
              <div key={wm.word} class="flex gap-2 text-sm">
                <span class="font-bold text-stone-800 dark:text-stone-200 font-devanagari" lang="sa">{wm.word}</span>
                <span class="text-stone-500 dark:text-stone-400">—</span>
                <span class="text-stone-600 dark:text-stone-400">{wm.meaning_hi}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAnvaya && anvaya && (
        <div class="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <h3 class="text-sm font-bold text-green-700 dark:text-green-400 mb-2">अन्वय (गद्य-क्रम)</h3>
          <p class="font-devanagari text-stone-800 dark:text-stone-200 leading-relaxed" lang="sa">
            {anvaya}
          </p>
        </div>
      )}

      {showTranslation && (
        <div class="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <h3 class="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2">हिन्दी अनुवाद</h3>
          <p class="text-stone-800 dark:text-stone-200 leading-relaxed">
            {translationHi}
          </p>
        </div>
      )}
    </div>
  );
}
