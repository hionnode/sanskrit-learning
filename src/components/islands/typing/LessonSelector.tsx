import type { TestMode } from '../../../lib/typing-types';
import type { Lesson } from '../../../lib/typing-types';

interface Props {
  lessons: Lesson[];
  selectedLessonId: number;
  mode: TestMode;
  modeValue: number;
  disabled?: boolean;
  onSelectLesson: (id: number) => void;
  onSelectMode: (mode: TestMode, value: number) => void;
}

const timeOptions = [15, 30, 60];
const wordOptions = [10, 25, 50];

export default function LessonSelector({
  lessons,
  selectedLessonId,
  mode,
  modeValue,
  disabled,
  onSelectLesson,
  onSelectMode,
}: Props) {
  const selectedLesson = lessons.find((l) => l.id === selectedLessonId);

  const activeClass = 'text-vermillion dark:text-vermillion-light font-bold';
  const inactiveClass =
    'text-clay/50 dark:text-stone-600 hover:text-clay dark:hover:text-stone-400';
  const separatorClass = 'text-border-subtle dark:text-charcoal-700';

  return (
    <div
      class={`text-center transition-opacity ${
        disabled ? 'pointer-events-none opacity-40' : ''
      }`}
    >
      {/* Single-line mode bar */}
      <div
        class="flex items-center justify-center gap-2 flex-wrap text-sm"
        role="group"
        aria-label="पाठ और मोड चुनें"
      >
        {/* Lesson numbers */}
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => onSelectLesson(lesson.id)}
            class={`min-w-[28px] min-h-[44px] inline-flex items-center justify-center transition-colors ${
              lesson.id === selectedLessonId ? activeClass : inactiveClass
            }`}
            aria-pressed={lesson.id === selectedLessonId}
          >
            {lesson.id}
          </button>
        ))}

        <span class={`mx-1 ${separatorClass}`}>|</span>

        {/* Time options */}
        <span class={`text-xs ${separatorClass}`}>time</span>
        {timeOptions.map((t) => (
          <button
            key={`time-${t}`}
            onClick={() => onSelectMode('time', t)}
            class={`min-h-[44px] px-1 inline-flex items-center transition-colors ${
              mode === 'time' && modeValue === t ? activeClass : inactiveClass
            }`}
            aria-pressed={mode === 'time' && modeValue === t}
          >
            {t}
          </button>
        ))}

        <span class={`mx-1 ${separatorClass}`}>|</span>

        {/* Word count options */}
        <span class={`text-xs ${separatorClass}`}>words</span>
        {wordOptions.map((w) => (
          <button
            key={`words-${w}`}
            onClick={() => onSelectMode('words', w)}
            class={`min-h-[44px] px-1 inline-flex items-center transition-colors ${
              mode === 'words' && modeValue === w ? activeClass : inactiveClass
            }`}
            aria-pressed={mode === 'words' && modeValue === w}
          >
            {w}
          </button>
        ))}
      </div>

      {/* Lesson description */}
      {selectedLesson && (
        <p class="text-xs text-clay/40 dark:text-stone-600 mt-1">
          {selectedLesson.label_hi}
        </p>
      )}
    </div>
  );
}
