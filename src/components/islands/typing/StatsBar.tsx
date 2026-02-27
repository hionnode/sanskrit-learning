import type { TestMode } from '../../../lib/typing-types';

interface Props {
  wpm: number;
  accuracy: number;
  elapsed: number;
  mode: TestMode;
  modeValue: number;
}

export default function StatsBar({
  wpm,
  accuracy,
  elapsed,
  mode,
  modeValue,
}: Props) {
  const timeDisplay =
    mode === 'time'
      ? Math.max(0, modeValue - Math.floor(elapsed))
      : Math.floor(elapsed);

  const minutes = Math.floor(timeDisplay / 60);
  const seconds = timeDisplay % 60;
  const timeFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div class="flex items-center gap-12 md:gap-16 text-center mb-4 shrink-0 transition-all duration-500">
      <div class="flex flex-col items-center">
        <span class="text-3xl md:text-4xl font-extrabold text-vermillion dark:text-vermillion-light tabular-nums">
          {wpm}
        </span>
        <span class="text-[10px] uppercase tracking-widest text-manuscript-accent/60 dark:text-stone-600">
          wpm
        </span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-3xl md:text-4xl font-extrabold text-ink dark:text-stone-100 tabular-nums">
          {accuracy}%
        </span>
        <span class="text-[10px] uppercase tracking-widest text-manuscript-accent/60 dark:text-stone-600">
          acc
        </span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-3xl md:text-4xl font-extrabold text-manuscript-accent/60 dark:text-stone-600 tabular-nums">
          {timeFormatted}
        </span>
        <span class="text-[10px] uppercase tracking-widest text-manuscript-accent/60 dark:text-stone-600">
          time
        </span>
      </div>
    </div>
  );
}
