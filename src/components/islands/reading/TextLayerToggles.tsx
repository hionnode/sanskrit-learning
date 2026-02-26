import { useState, useMemo } from 'preact/hooks';

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

const toggleBase = 'px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermillion';
const toggleOn = 'bg-vermillion text-white';
const toggleOff = 'bg-surface-bark dark:bg-charcoal-700 text-stone-700 dark:text-stone-300 hover:bg-border-subtle dark:hover:bg-charcoal-600';

export default function TextLayerToggles({ sanskritText, padachheda, wordMeanings, anvaya, translationHi }: Props) {
  const [showPadachheda, setShowPadachheda] = useState(false);
  const [showMeanings, setShowMeanings] = useState(false);
  const [showAnvaya, setShowAnvaya] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const lines = useMemo(() => sanskritText.split('\n'), [sanskritText]);

  return (
    <div class="space-y-6">
      {/* Original Sanskrit Text */}
      <div class="sanskrit-example text-sanskrit-lg" lang="sa">
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </div>

      {/* Toggle Buttons */}
      <div class="flex flex-wrap gap-2" role="group" aria-label="पाठ परतें टॉगल करें">
        {padachheda && (
          <button
            onClick={() => setShowPadachheda(!showPadachheda)}
            aria-pressed={showPadachheda}
            class={`${toggleBase} ${showPadachheda ? toggleOn : toggleOff}`}
          >
            पदच्छेद
          </button>
        )}
        {wordMeanings.length > 0 && (
          <button
            onClick={() => setShowMeanings(!showMeanings)}
            aria-pressed={showMeanings}
            class={`${toggleBase} ${showMeanings ? toggleOn : toggleOff}`}
          >
            शब्दार्थ
          </button>
        )}
        {anvaya && (
          <button
            onClick={() => setShowAnvaya(!showAnvaya)}
            aria-pressed={showAnvaya}
            class={`${toggleBase} ${showAnvaya ? toggleOn : toggleOff}`}
          >
            अन्वय
          </button>
        )}
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          aria-pressed={showTranslation}
          class={`${toggleBase} ${showTranslation ? toggleOn : toggleOff}`}
        >
          हिन्दी अनुवाद
        </button>
      </div>

      {/* Toggled Layers */}
      <div aria-live="polite">
        {showPadachheda && padachheda && (
          <div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mb-4">
            <p class="text-sm font-bold text-blue-700 dark:text-blue-400 mb-2">पदच्छेद</p>
            <p class="font-serif text-ink dark:text-stone-200 leading-relaxed" lang="sa">
              {padachheda}
            </p>
          </div>
        )}

        {showMeanings && wordMeanings.length > 0 && (
          <div class="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 mb-4">
            <p class="text-sm font-bold text-purple-700 dark:text-purple-400 mb-3">शब्दार्थ</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {wordMeanings.map((wm) => (
                <div key={wm.word} class="flex gap-2 text-sm">
                  <span class="font-bold text-ink dark:text-stone-200 font-serif" lang="sa">{wm.word}</span>
                  <span class="text-clay dark:text-stone-400">—</span>
                  <span class="text-stone-600 dark:text-stone-400">{wm.meaning_hi}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {showAnvaya && anvaya && (
          <div class="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 mb-4">
            <p class="text-sm font-bold text-green-700 dark:text-green-400 mb-2">अन्वय (गद्य-क्रम)</p>
            <p class="font-serif text-ink dark:text-stone-200 leading-relaxed" lang="sa">
              {anvaya}
            </p>
          </div>
        )}

        {showTranslation && (
          <div class="p-4 rounded-lg bg-surface-palm dark:bg-amber-900/20 border border-turmeric/30 dark:border-amber-800">
            <p class="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2">हिन्दी अनुवाद</p>
            <p class="text-ink dark:text-stone-200 leading-relaxed">
              {translationHi}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
