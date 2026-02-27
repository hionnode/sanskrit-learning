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

    // Find the target character span
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
      // Caret is past the last char of the current word — find the word's last char
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

    const lineHeight = 48; // ~3rem line
    const targetScroll = Math.max(0, caretPos.top - lineHeight * 0.25);
    container.scrollTop = targetScroll;
  }, [caretPos.top]);

  return (
    <div
      class="relative select-none cursor-text"
      onClick={onFocusRequest}
    >
      {/* Unfocused state — text fades */}
      {!focused && (
        <div class="absolute inset-0 z-10 flex items-center justify-center">
          <span class="text-clay dark:text-stone-400 text-lg font-medium">
            टाइप करने के लिए यहाँ क्लिक करें
          </span>
        </div>
      )}

      <div
        ref={containerRef}
        class={`relative overflow-hidden font-devanagari text-2xl leading-[3rem] h-[6rem] md:h-[9rem] px-4 py-2 transition-opacity ${
          !focused ? 'opacity-20' : ''
        }`}
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Smooth caret */}
        {focused && (
          <div
            ref={caretRef}
            class="absolute w-[2px] bg-vermillion dark:bg-vermillion-light rounded-full caret-pulse z-10 pointer-events-none"
            style={{
              left: `${caretPos.left}px`,
              top: `${caretPos.top}px`,
              height: `${caretPos.height || 32}px`,
              transition: 'left 100ms ease-out, top 100ms ease-out',
            }}
          />
        )}

        <div class="flex flex-wrap">
          {words.map((word, wi) => (
            <span key={wi} class="inline-flex mr-[0.5em]">
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
                  // pending
                  colorClass =
                    isPastWord || (isCurrentWord && ci < currentCharIndex)
                      ? 'text-red-500 dark:text-red-400' // missed
                      : 'text-clay/25 dark:text-stone-700';
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
