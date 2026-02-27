import { useRef, useEffect, useState } from 'preact/hooks';
import type { WordState } from '../../../lib/typing-types';

interface Props {
  words: WordState[];
  currentWordIndex: number;
  currentCharIndex: number;
  focused: boolean;
  onFocusRequest: () => void;
}

export default function WordDisplay({
  words,
  currentWordIndex,
  currentCharIndex,
  focused,
  onFocusRequest,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const [caretPos, setCaretPos] = useState({ left: 0, top: 0, height: 0 });

  // Calculate caret position from data attributes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const selector = `[data-word="${currentWordIndex}"][data-char="${currentCharIndex}"]`;
    const target = container.querySelector(selector) as HTMLElement | null;

    if (target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setCaretPos({
        left: targetRect.left - containerRect.left + container.scrollLeft,
        top: targetRect.top - containerRect.top + container.scrollTop + 4,
        height: targetRect.height - 8,
      });
    } else {
      const lastCharSel = `[data-word="${currentWordIndex}"][data-char="${Math.max(0, currentCharIndex - 1)}"]`;
      const lastChar = container.querySelector(lastCharSel) as HTMLElement | null;
      if (lastChar) {
        const containerRect = container.getBoundingClientRect();
        const charRect = lastChar.getBoundingClientRect();
        setCaretPos({
          left: charRect.right - containerRect.left + container.scrollLeft,
          top: charRect.top - containerRect.top + container.scrollTop + 4,
          height: charRect.height - 8,
        });
      }
    }
  }, [currentWordIndex, currentCharIndex, words]);

  // Scroll so the caret line is visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lineHeight = 72;
    const targetScroll = Math.max(0, caretPos.top - lineHeight * 0.25);
    container.scrollTop = targetScroll;
  }, [caretPos.top]);

  return (
    <div
      class="w-full relative py-4 md:py-8 group transition-all duration-500 focus-within:scale-[1.005] rounded-3xl select-none cursor-text"
      onClick={onFocusRequest}
    >
      {/* Subtle grid pattern */}
      <div class="absolute inset-0 lotus-pattern pointer-events-none opacity-[0.05]"></div>

      {/* Unfocused overlay */}
      {!focused && (
        <div class="absolute inset-0 z-10 flex items-center justify-center rounded-3xl">
          <span class="text-manuscript-accent dark:text-stone-400 text-lg font-medium">
            टाइप करने के लिए यहाँ क्लिक करें
          </span>
        </div>
      )}

      <div
        ref={containerRef}
        class={`relative z-[1] overflow-hidden font-devanagari text-2xl md:text-4xl lg:text-5xl leading-[1.8] h-[5rem] md:h-[10rem] text-center break-words outline-none max-w-4xl mx-auto px-2 md:px-4 transition-opacity ${
          !focused ? 'opacity-15' : ''
        }`}
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Caret */}
        {focused && (
          <div
            ref={caretRef}
            class="absolute w-[3px] md:w-[4px] bg-vermillion dark:bg-vermillion-light rounded-full animate-cursor-blink z-10 pointer-events-none"
            style={{
              left: `${caretPos.left}px`,
              top: `${caretPos.top}px`,
              height: `${caretPos.height || 40}px`,
              transition: 'left 100ms ease-out, top 100ms ease-out',
            }}
          />
        )}

        <div class="flex flex-wrap justify-center">
          {words.map((word, wi) => (
            <span key={wi} class="inline-flex mr-[0.4em]">
              {word.chars.map((ch, ci) => {
                const isPastWord = wi < currentWordIndex;
                const isCurrentWord = wi === currentWordIndex;

                let colorClass: string;
                if (ch.status === 'correct') {
                  colorClass = 'text-ink dark:text-stone-200';
                } else if (ch.status === 'incorrect') {
                  colorClass = 'text-red-500 dark:text-red-400';
                } else if (ch.status === 'extra') {
                  colorClass = 'text-red-400 bg-red-50/50 dark:bg-red-900/20 rounded-sm';
                } else {
                  colorClass =
                    isPastWord || (isCurrentWord && ci < currentCharIndex)
                      ? 'text-red-500 dark:text-red-400'
                      : 'text-ink-light/30 dark:text-stone-700';
                }

                return (
                  <span
                    key={ci}
                    data-word={wi}
                    data-char={ci}
                    class={`inline-block ${colorClass}`}
                  >
                    {ch.expected || ch.typed}
                  </span>
                );
              })}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
