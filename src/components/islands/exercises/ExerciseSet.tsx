import { useState } from 'preact/hooks';
import MCQ from './MCQ';

interface Exercise {
  type: 'mcq';
  question_hi: string;
  options: { id: string; text: string }[];
  correct: string;
  explanation_hi?: string;
}

interface Props {
  exercises: Exercise[];
}

export default function ExerciseSet({ exercises }: Props) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const total = exercises.length;
  const exercise = exercises[current];

  function handleAnswer(correct: boolean) {
    if (correct) setScore((s) => s + 1);
    setAnswered(true);
  }

  function handleNext() {
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setAnswered(false);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  }

  if (finished) {
    const percentage = Math.round((score / total) * 100);
    return (
      <div class="text-center py-8 space-y-4">
        <div class="text-4xl font-bold text-saffron-600 dark:text-saffron-500">
          {score}/{total}
        </div>
        <p class="text-lg text-stone-600 dark:text-stone-400 font-devanagari">
          {percentage >= 80 ? 'बहुत अच्छा! आप अगले पाठ पर जा सकते हैं।' :
           percentage >= 50 ? 'अच्छा प्रयास! थोड़ा और अभ्यास करें।' :
           'पाठ दोबारा पढ़ें और पुनः प्रयास करें।'}
        </p>
        <button
          onClick={handleRestart}
          class="px-6 py-3 bg-saffron-500 hover:bg-saffron-600 text-white rounded-lg font-medium transition-colors min-h-[44px]"
        >
          पुनः प्रयास करें
        </button>
      </div>
    );
  }

  return (
    <div class="space-y-6">
      <div class="flex items-center justify-between text-sm text-stone-500 dark:text-stone-400">
        <span>प्रश्न {current + 1} / {total}</span>
        <span>{score} सही</span>
      </div>

      <div class="w-full bg-amber-100 dark:bg-charcoal-700 rounded-full h-2">
        <div
          class="bg-saffron-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((current + (answered ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <MCQ
        key={current}
        question={exercise.question_hi}
        options={exercise.options}
        correctId={exercise.correct}
        explanation={exercise.explanation_hi}
        onAnswer={handleAnswer}
      />

      {answered && (
        <div class="flex justify-end">
          <button
            onClick={handleNext}
            class="px-6 py-3 bg-saffron-500 hover:bg-saffron-600 text-white rounded-lg font-medium transition-colors min-h-[44px]"
          >
            {current + 1 >= total ? 'परिणाम देखें' : 'अगला प्रश्न'}
          </button>
        </div>
      )}
    </div>
  );
}
