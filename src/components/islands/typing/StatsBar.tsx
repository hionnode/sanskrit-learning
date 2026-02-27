import type { TestMode } from '../../../lib/typing-types';

interface Props {
  wpm: number;
  accuracy: number;
  elapsed: number;
  mode: TestMode;
  modeValue: number;
  wordsCompleted: number;
}

export default function StatsBar({
  wpm,
  accuracy,
  elapsed,
  mode,
  modeValue,
  wordsCompleted,
}: Props) {
  const timeDisplay =
    mode === 'time'
      ? Math.max(0, modeValue - Math.floor(elapsed))
      : Math.floor(elapsed);

  return (
    <div class="flex items-center justify-center gap-6 text-sm text-center">
      <span class="text-2xl font-bold text-vermillion dark:text-vermillion-light tabular-nums">
        {wpm}
      </span>
      <span class="text-clay/60 dark:text-stone-500 tabular-nums">
        {accuracy}%
      </span>
      {mode === 'words' && (
        <span class="text-clay/60 dark:text-stone-500 tabular-nums">
          {wordsCompleted}/{modeValue}
        </span>
      )}
      <span class="text-clay/60 dark:text-stone-500 tabular-nums">
        {timeDisplay}s
      </span>
    </div>
  );
}
