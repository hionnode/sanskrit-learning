import { useState, useEffect, useRef } from 'preact/hooks';
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

const timeOptions = [15, 30, 60, 120];
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
  const [lessonDropdownOpen, setLessonDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    if (!lessonDropdownOpen) return;

    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLessonDropdownOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setLessonDropdownOpen(false);
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [lessonDropdownOpen]);

  return (
    <div
      class={`w-full max-w-2xl transition-opacity shrink-0 ${
        disabled ? 'pointer-events-none opacity-40' : ''
      }`}
    >
      <div class="bg-surface-paper/60 dark:bg-charcoal-800/60 backdrop-blur-md border border-manuscript-accent/15 dark:border-charcoal-700 rounded-3xl shadow-lg overflow-hidden flex flex-col">
        {/* Top row: mode tabs + refresh */}
        <div class="flex items-center justify-between px-3 md:px-4 py-2.5 border-b border-manuscript-accent/10 dark:border-charcoal-700">
          <div class="flex items-center gap-0.5" role="group" aria-label="मोड चुनें">
            <button
              onClick={() => {
                const val = mode === 'words' ? modeValue : wordOptions[1];
                onSelectMode('words', val);
              }}
              class={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-xl transition-all font-bold text-xs uppercase tracking-wider min-h-[40px] ${
                mode === 'words'
                  ? 'text-vermillion dark:text-vermillion-light bg-vermillion/5 dark:bg-vermillion/10 border border-vermillion/20'
                  : 'text-manuscript-accent dark:text-stone-500 hover:text-vermillion dark:hover:text-vermillion-light hover:bg-white/40 dark:hover:bg-charcoal-700 border border-transparent'
              }`}
              aria-pressed={mode === 'words'}
            >
              Words
            </button>
            <button
              onClick={() => {
                const val = mode === 'time' ? modeValue : timeOptions[1];
                onSelectMode('time', val);
              }}
              class={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-xl transition-all font-bold text-xs uppercase tracking-wider min-h-[40px] ${
                mode === 'time'
                  ? 'text-vermillion dark:text-vermillion-light bg-vermillion/5 dark:bg-vermillion/10 border border-vermillion/20'
                  : 'text-manuscript-accent dark:text-stone-500 hover:text-vermillion dark:hover:text-vermillion-light hover:bg-white/40 dark:hover:bg-charcoal-700 border border-transparent'
              }`}
              aria-pressed={mode === 'time'}
            >
              Time
            </button>
          </div>
        </div>

        {/* Bottom row: lesson pill + duration/count options */}
        <div class="px-3 md:px-4 py-2.5 bg-white/30 dark:bg-charcoal-750/30">
          <div class="flex flex-wrap items-center justify-center gap-3">
            {/* Lesson pill */}
            <div class="relative" ref={dropdownRef}>
              <button
                onClick={() => setLessonDropdownOpen(!lessonDropdownOpen)}
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-vermillion/10 dark:bg-vermillion/15 border border-vermillion/20 text-vermillion dark:text-vermillion-light font-bold text-xs min-h-[36px]"
              >
                <span class="opacity-50 font-medium">Lesson:</span>
                <span>{selectedLesson?.label_hi || selectedLessonId}</span>
                <svg
                  class={`w-3 h-3 transition-transform ${lessonDropdownOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="2 4 6 8 10 4" />
                </svg>
              </button>

              {/* Lesson dropdown */}
              {lessonDropdownOpen && (
                <div class="absolute top-full left-0 mt-2 z-50 bg-paper dark:bg-charcoal-800 border border-border-subtle dark:border-charcoal-700 rounded-xl shadow-page p-2 min-w-[200px] max-h-[240px] overflow-y-auto no-scrollbar">
                  {lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        onSelectLesson(lesson.id);
                        setLessonDropdownOpen(false);
                      }}
                      class={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors min-h-[36px] flex items-center gap-2 ${
                        lesson.id === selectedLessonId
                          ? 'bg-vermillion/10 text-vermillion dark:text-vermillion-light font-bold'
                          : 'text-ink dark:text-stone-300 hover:bg-surface-paper dark:hover:bg-charcoal-700'
                      }`}
                    >
                      <span class="w-5 text-center font-bold opacity-50">{lesson.id}</span>
                      <span>{lesson.label_hi}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div class="w-px h-4 bg-manuscript-accent/10 dark:bg-charcoal-700"></div>

            {/* Duration / count options */}
            <div class="flex items-center gap-3 text-[11px] font-bold text-manuscript-accent dark:text-stone-500 uppercase tracking-tighter">
              {(mode === 'time' ? timeOptions : wordOptions).map((v) => (
                <button
                  key={v}
                  onClick={() => onSelectMode(mode, v)}
                  class={`min-h-[36px] px-1 transition-colors ${
                    modeValue === v
                      ? 'text-vermillion dark:text-vermillion-light scale-110'
                      : 'hover:text-ink dark:hover:text-stone-300'
                  }`}
                  aria-pressed={modeValue === v}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
