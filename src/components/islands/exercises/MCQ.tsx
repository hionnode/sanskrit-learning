import { useState } from 'preact/hooks';

interface Option {
  id: string;
  text: string;
}

interface Props {
  question: string;
  options: Option[];
  correctId: string;
  explanation?: string;
  onAnswer: (correct: boolean) => void;
}

export default function MCQ({ question, options, correctId, explanation, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === correctId;

  function handleSelect(id: string) {
    if (answered) return;
    setSelected(id);
    onAnswer(id === correctId);
  }

  return (
    <div class="space-y-4">
      <p class="text-xl font-medium text-ink dark:text-stone-200 leading-relaxed font-serif" id="mcq-question">
        {question}
      </p>
      <div class="grid gap-3" role="radiogroup" aria-labelledby="mcq-question">
        {options.map((opt) => {
          let style = 'border-border-subtle dark:border-charcoal-700 hover:border-vermillion dark:hover:border-vermillion bg-white dark:bg-charcoal-800';

          if (answered) {
            if (opt.id === correctId) {
              style = 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-500';
            } else if (opt.id === selected) {
              style = 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-500';
            } else {
              style = 'border-stone-200 dark:border-charcoal-700 opacity-50 bg-white dark:bg-charcoal-800';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={answered}
              role="radio"
              aria-checked={selected === opt.id}
              class={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all min-h-[44px] font-serif text-lg text-stone-700 dark:text-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermillion ${style} ${!answered ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'}`}
            >
              <span class="font-medium text-vermillion dark:text-vermillion-light mr-2">
                {opt.id.toUpperCase()}.
              </span>
              {opt.text}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {answered && explanation && (
          <div class={`p-4 rounded-lg text-sm leading-relaxed font-serif ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-surface-palm dark:bg-amber-900/20 text-amber-800 dark:text-amber-300'}`}>
            <span class="font-bold">{isCorrect ? 'सही!' : 'गलत।'}</span>{' '}
            {explanation}
          </div>
        )}
      </div>
    </div>
  );
}
