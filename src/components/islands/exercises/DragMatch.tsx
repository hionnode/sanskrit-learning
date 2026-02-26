import { useState, useMemo } from 'preact/hooks';

interface Pair {
  left: string;
  right: string;
}

interface Props {
  instruction: string;
  pairs: Pair[];
  explanation?: string;
  onAnswer: (correct: boolean) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function DragMatch({ instruction, pairs, explanation, onAnswer }: Props) {
  const shuffledRight = useMemo(() => shuffle(pairs.map((p) => p.right)), [pairs]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [submitted, setSubmitted] = useState(false);

  const allMatched = matches.size === pairs.length;

  function handleLeftClick(idx: number) {
    if (submitted) return;
    setSelectedLeft(selectedLeft === idx ? null : idx);
  }

  function handleRightClick(rightIdx: number) {
    if (submitted || selectedLeft === null) return;
    const newMatches = new Map(matches);
    // Remove any existing match for this left or right
    for (const [l, r] of newMatches) {
      if (l === selectedLeft || r === rightIdx) newMatches.delete(l);
    }
    newMatches.set(selectedLeft, rightIdx);
    setMatches(newMatches);
    setSelectedLeft(null);
  }

  function handleSubmit() {
    setSubmitted(true);
    const allCorrect = pairs.every((pair, leftIdx) => {
      const rightIdx = matches.get(leftIdx);
      return rightIdx !== undefined && shuffledRight[rightIdx] === pair.right;
    });
    onAnswer(allCorrect);
  }

  function getLeftMatch(leftIdx: number): number | undefined {
    return matches.get(leftIdx);
  }

  function getRightMatch(rightIdx: number): number | undefined {
    for (const [l, r] of matches) {
      if (r === rightIdx) return l;
    }
    return undefined;
  }

  function isCorrectPair(leftIdx: number, rightIdx: number): boolean {
    return shuffledRight[rightIdx] === pairs[leftIdx].right;
  }

  return (
    <div class="space-y-4">
      <p class="text-xl font-medium text-ink dark:text-stone-200 leading-relaxed font-serif">
        {instruction}
      </p>

      <div class="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div class="space-y-2">
          {pairs.map((pair, idx) => {
            const matched = getLeftMatch(idx);
            let style = 'border-border-subtle dark:border-charcoal-700 bg-white dark:bg-charcoal-800';
            if (submitted && matched !== undefined) {
              style = isCorrectPair(idx, matched)
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-red-500 bg-red-50 dark:bg-red-900/20';
            } else if (selectedLeft === idx) {
              style = 'border-vermillion bg-vermillion/10 dark:bg-vermillion/20';
            } else if (matched !== undefined) {
              style = 'border-turmeric/50 bg-surface-palm dark:bg-charcoal-700';
            }

            return (
              <button
                key={idx}
                onClick={() => handleLeftClick(idx)}
                disabled={submitted}
                class={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all min-h-[44px] font-serif text-lg text-stone-700 dark:text-stone-300 ${style} ${!submitted ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {pair.left}
              </button>
            );
          })}
        </div>

        {/* Right column */}
        <div class="space-y-2">
          {shuffledRight.map((text, idx) => {
            const matchedLeft = getRightMatch(idx);
            let style = 'border-border-subtle dark:border-charcoal-700 bg-white dark:bg-charcoal-800';
            if (submitted && matchedLeft !== undefined) {
              style = isCorrectPair(matchedLeft, idx)
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-red-500 bg-red-50 dark:bg-red-900/20';
            } else if (matchedLeft !== undefined) {
              style = 'border-turmeric/50 bg-surface-palm dark:bg-charcoal-700';
            } else if (selectedLeft !== null) {
              style = 'border-border-subtle dark:border-charcoal-700 bg-white dark:bg-charcoal-800 hover:border-vermillion';
            }

            return (
              <button
                key={idx}
                onClick={() => handleRightClick(idx)}
                disabled={submitted}
                class={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all min-h-[44px] font-serif text-lg text-stone-700 dark:text-stone-300 ${style} ${!submitted && selectedLeft !== null ? 'cursor-pointer' : submitted ? 'cursor-default' : 'cursor-default'}`}
              >
                {text}
              </button>
            );
          })}
        </div>
      </div>

      {!submitted && allMatched && (
        <div class="flex justify-end">
          <button
            onClick={handleSubmit}
            class="px-6 py-3 bg-vermillion hover:bg-vermillion-dark text-white rounded-lg font-medium transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermillion"
          >
            जाँचें
          </button>
        </div>
      )}

      <div aria-live="polite">
        {submitted && explanation && (
          <div class={`p-4 rounded-lg text-sm leading-relaxed font-serif ${
            pairs.every((pair, i) => {
              const r = matches.get(i);
              return r !== undefined && shuffledRight[r] === pair.right;
            }) ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-surface-palm dark:bg-charcoal-700 text-ink dark:text-stone-300'
          }`}>
            {explanation}
          </div>
        )}
      </div>
    </div>
  );
}
