import type { TestResult } from '../../../lib/typing-types';

interface Props {
  result: TestResult;
  lessonLabel: string;
  hasNextLesson: boolean;
  onRestart: () => void;
  onNextLesson: () => void;
}

export default function ResultsScreen({
  result,
  lessonLabel,
  hasNextLesson,
  onRestart,
  onNextLesson,
}: Props) {
  return (
    <div class="text-center py-6 space-y-6 animate-fadeIn" aria-live="polite">
      {/* Main WPM */}
      <div>
        <div class="text-5xl font-bold text-vermillion dark:text-vermillion-light tabular-nums">
          {result.netWpm}
        </div>
        <p class="text-sm text-clay dark:text-stone-400 mt-1">
          शुद्ध WPM
        </p>
      </div>

      {/* Stats grid */}
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
        <StatBox label="कच्चा WPM" value={result.rawWpm} />
        <StatBox label="सटीकता" value={`${result.accuracy}%`} />
        <StatBox label="समय" value={`${result.totalTime}s`} />
        <StatBox
          label="अक्षर"
          value={`${result.correctChars}/${result.correctChars + result.incorrectChars + result.missedChars}`}
        />
      </div>

      {/* Char breakdown */}
      <div class="flex justify-center gap-6 text-sm">
        <span class="text-ink dark:text-stone-200">
          <span class="font-bold">{result.correctChars}</span> सही
        </span>
        <span class="text-red-500 dark:text-red-400">
          <span class="font-bold">{result.incorrectChars}</span> गलत
        </span>
        <span class="text-red-500/70 dark:text-red-400/70">
          <span class="font-bold">{result.extraChars}</span> अतिरिक्त
        </span>
        <span class="text-clay dark:text-stone-500">
          <span class="font-bold">{result.missedChars}</span> छूटे
        </span>
      </div>

      <p class="text-sm text-clay dark:text-stone-400">{lessonLabel}</p>

      {/* Actions */}
      <div class="flex items-center justify-center gap-4 flex-wrap">
        <button
          onClick={onRestart}
          class="px-6 py-3 border-2 border-vermillion text-vermillion dark:text-vermillion-light hover:bg-vermillion/10 rounded-lg font-medium transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermillion"
        >
          पुनः प्रयास
        </button>
        {hasNextLesson && (
          <button
            onClick={onNextLesson}
            class="inline-flex items-center gap-2 px-6 py-3 bg-vermillion hover:bg-vermillion-dark text-white rounded-lg font-medium transition-colors min-h-[44px]"
          >
            अगला पाठ
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div class="p-3 rounded-lg bg-surface-palm dark:bg-charcoal-800 border border-border-subtle dark:border-charcoal-700">
      <div class="text-xl font-bold text-ink dark:text-stone-100 tabular-nums">
        {value}
      </div>
      <div class="text-xs text-clay dark:text-stone-400 mt-0.5">{label}</div>
    </div>
  );
}
