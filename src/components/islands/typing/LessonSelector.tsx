import { useState, useEffect } from 'preact/hooks';
import { createPortal } from 'preact/compat';
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
  onRestart: () => void;
}

const timeOptions = [15, 30, 60, 120];
const wordOptions = [10, 25, 50];
const quoteOptions = [
  { value: 1, label: 'short' },
  { value: 2, label: 'medium' },
  { value: 3, label: 'long' },
];

const stageLabels: Record<string, string> = {
  A: 'होम रो',
  B: 'ऊपरी रो',
  C: 'निचली रो',
  D: 'शिफ़्ट',
  E: 'विशेष / संयुक्त',
  F: 'शब्द अभ्यास',
};

const modeDefaults: Record<TestMode, number> = {
  words: 25,
  time: 30,
  quote: 2,
  zen: 0,
};

// ─── Inline SVG Icons ────────────────────────────────────────────────

function IconWords() {
  return (
    <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <line x1="2" y1="4" x2="14" y2="4" />
      <line x1="2" y1="8" x2="14" y2="8" />
      <line x1="2" y1="12" x2="10" y2="12" />
    </svg>
  );
}

function IconTime() {
  return (
    <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <circle cx="8" cy="8" r="6" />
      <polyline points="8 4 8 8 11 10" />
    </svg>
  );
}

function IconQuote() {
  return (
    <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor" opacity="0.8">
      <path d="M3.5 9.5c-.8 0-1.5-.7-1.5-1.5 0-2.2 1.8-4 4-4v1.5C4.6 5.5 3.5 6.6 3.5 8h1c.6 0 1 .4 1 1v1.5c0 .6-.4 1-1 1h-1zm6 0c-.8 0-1.5-.7-1.5-1.5 0-2.2 1.8-4 4-4v1.5c-1.4 0-2.5 1.1-2.5 2.5h1c.6 0 1 .4 1 1v1.5c0 .6-.4 1-1 1h-1z" />
    </svg>
  );
}

function IconZen() {
  return (
    <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <circle cx="8" cy="5" r="2" />
      <path d="M4 14c0-2.2 1.8-4 4-4s4 1.8 4 4" />
      <path d="M8 3V1" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <path d="M2 8a6 6 0 0 1 10.3-4.1" />
      <path d="M14 8a6 6 0 0 1-10.3 4.1" />
      <polyline points="12 2 12.5 4.5 10 4" />
      <polyline points="4 14 3.5 11.5 6 12" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────

export default function LessonSelector({
  lessons,
  selectedLessonId,
  mode,
  modeValue,
  disabled,
  onSelectLesson,
  onSelectMode,
  onRestart,
}: Props) {
  const selectedLesson = lessons.find((l) => l.id === selectedLessonId);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    if (!overlayOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOverlayOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [overlayOpen]);

  const modes: { key: TestMode; label: string; Icon: () => any }[] = [
    { key: 'words', label: 'Words', Icon: IconWords },
    { key: 'time', label: 'Time', Icon: IconTime },
    { key: 'quote', label: 'Quote', Icon: IconQuote },
    { key: 'zen', label: 'Zen', Icon: IconZen },
  ];

  function switchMode(m: TestMode) {
    const val = m === mode ? modeValue : modeDefaults[m];
    onSelectMode(m, val);
  }

  const btnBase =
    'flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-xl transition-all font-bold text-xs uppercase tracking-wider min-h-[40px]';
  const btnActive =
    'text-vermillion dark:text-vermillion-light bg-vermillion/5 dark:bg-vermillion/10 border border-vermillion/20';
  const btnInactive =
    'text-manuscript-accent dark:text-stone-500 hover:text-vermillion dark:hover:text-vermillion-light hover:bg-white/40 dark:hover:bg-charcoal-700 border border-transparent';

  const optBtnBase = 'min-h-[36px] px-1.5 transition-colors font-bold';
  const optActive = 'text-vermillion dark:text-vermillion-light';
  const optInactive =
    'text-manuscript-accent dark:text-stone-500 hover:text-ink dark:hover:text-stone-300';

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
            {modes.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => switchMode(key)}
                class={`${btnBase} ${mode === key ? btnActive : btnInactive}`}
                aria-pressed={mode === key}
              >
                <Icon />
                {label}
              </button>
            ))}
          </div>

          {/* Refresh button */}
          <button
            onClick={onRestart}
            class="p-2 rounded-xl text-manuscript-accent/50 dark:text-stone-600 hover:text-vermillion dark:hover:text-vermillion-light hover:bg-white/40 dark:hover:bg-charcoal-700 transition-colors"
            aria-label="पुनः आरम्भ"
          >
            <IconRefresh />
          </button>
        </div>

        {/* Bottom row: lesson pill + value options */}
        <div class="px-3 md:px-4 py-2.5 bg-white/30 dark:bg-charcoal-750/30">
          <div class="flex flex-wrap items-center justify-center gap-3">
            {/* Lesson pill — shown for words, time, zen */}
            {mode !== 'quote' && (
              <>
                <button
                  onClick={() => setOverlayOpen(true)}
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-vermillion/10 dark:bg-vermillion/15 border border-vermillion/20 text-vermillion dark:text-vermillion-light font-bold text-xs min-h-[36px]"
                >
                  <span class="w-4 text-center opacity-50">{selectedLesson?.id}</span>
                  <span>{selectedLesson?.label_hi || selectedLessonId}</span>
                </button>

                <div class="w-px h-4 bg-manuscript-accent/10 dark:bg-charcoal-700" />
              </>
            )}

            {/* Value options — mode specific */}
            {mode === 'words' && (
              <div class="flex items-center gap-3 text-[11px] uppercase tracking-tighter">
                {wordOptions.map((v) => (
                  <button
                    key={v}
                    onClick={() => onSelectMode('words', v)}
                    class={`${optBtnBase} ${modeValue === v ? optActive : optInactive}`}
                    aria-pressed={modeValue === v}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}

            {mode === 'time' && (
              <div class="flex items-center gap-3 text-[11px] uppercase tracking-tighter">
                {timeOptions.map((v) => (
                  <button
                    key={v}
                    onClick={() => onSelectMode('time', v)}
                    class={`${optBtnBase} ${modeValue === v ? optActive : optInactive}`}
                    aria-pressed={modeValue === v}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}

            {mode === 'quote' && (
              <div class="flex items-center gap-3 text-[11px] uppercase tracking-tighter">
                {quoteOptions.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => onSelectMode('quote', value)}
                    class={`${optBtnBase} ${modeValue === value ? optActive : optInactive}`}
                    aria-pressed={modeValue === value}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* Zen: no value options, just lesson pill */}
          </div>
        </div>
      </div>

      {/* Lesson overlay — portalled to body */}
      {overlayOpen &&
        createPortal(
          <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e: MouseEvent) => {
              if (e.target === e.currentTarget) setOverlayOpen(false);
            }}
          >
            <div class="bg-paper dark:bg-charcoal-800 border border-border-subtle dark:border-charcoal-700 rounded-2xl shadow-page w-[90vw] max-w-md max-h-[70vh] overflow-y-auto no-scrollbar p-3">
              {Object.keys(stageLabels).map((stage) => {
                const stageLessons = lessons.filter((l) => l.stage === stage);
                if (stageLessons.length === 0) return null;
                return (
                  <div key={stage}>
                    <div class="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-manuscript-accent/50 dark:text-stone-600 select-none first:pt-1">
                      {stage}: {stageLabels[stage]}
                    </div>
                    {stageLessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          onSelectLesson(lesson.id);
                          setOverlayOpen(false);
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
                );
              })}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
