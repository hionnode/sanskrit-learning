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
      <p class="text-lg font-medium text-stone-800 dark:text-stone-200 leading-relaxed font-devanagari">
        {question}
      </p>
      <div class="grid gap-3">
        {options.map((opt) => {
          let style = 'border-amber-200 dark:border-charcoal-700 hover:border-saffron-500 dark:hover:border-saffron-500 bg-white dark:bg-charcoal-800';

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
              class={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all min-h-[44px] font-devanagari text-stone-700 dark:text-stone-300 ${style} ${!answered ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'}`}
            >
              <span class="font-medium text-saffron-600 dark:text-saffron-500 mr-2">
                {opt.id.toUpperCase()}.
              </span>
              {opt.text}
            </button>
          );
        })}
      </div>

      {answered && explanation && (
        <div class={`p-4 rounded-lg text-sm leading-relaxed font-devanagari ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300'}`}>
          <span class="font-bold">{isCorrect ? 'सही!' : 'गलत।'}</span>{' '}
          {explanation}
        </div>
      )}
    </div>
  );
}
