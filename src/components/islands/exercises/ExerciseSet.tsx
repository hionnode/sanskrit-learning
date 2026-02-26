import { useState } from 'preact/hooks';
import MCQ from './MCQ';
import DragMatch from './DragMatch';

interface MCQExercise {
  type: 'mcq';
  question_hi: string;
  options: { id: string; text: string }[];
  correct: string;
  explanation_hi?: string;
}

interface DragMatchExercise {
  type: 'drag-match';
  instruction_hi: string;
  pairs: { left: string; right: string }[];
  explanation_hi?: string;
}

type Exercise = MCQExercise | DragMatchExercise;

interface Props {
  exercises: Exercise[];
  nextLessonUrl?: string;
  nextLessonTitle?: string;
}

export default function ExerciseSet({ exercises, nextLessonUrl, nextLessonTitle }: Props) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const total = exercises.length;
  if (total === 0) return null;
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
      <div class="text-center py-8 space-y-4" aria-live="polite">
        <div class="text-4xl font-bold text-vermillion dark:text-vermillion-light">
          {score}/{total}
        </div>
        <p class="text-lg text-stone-600 dark:text-stone-400 font-serif">
          {percentage >= 80 ? 'बहुत अच्छा! आप अगले पाठ पर जा सकते हैं।' :
           percentage >= 50 ? 'अच्छा प्रयास! थोड़ा और अभ्यास करें।' :
           'पाठ दोबारा पढ़ें और पुनः प्रयास करें।'}
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={handleRestart}
            class="px-6 py-3 border-2 border-vermillion text-vermillion dark:text-vermillion-light hover:bg-vermillion/10 rounded-lg font-medium transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermillion"
          >
            पुनः प्रयास करें
          </button>
          {nextLessonUrl && (
            <a
              href={nextLessonUrl}
              class="inline-flex items-center gap-2 px-6 py-3 bg-vermillion hover:bg-vermillion-dark text-white rounded-lg font-medium transition-colors min-h-[44px]"
            >
              {nextLessonTitle || 'अगला पाठ'}
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </a>
          )}
        </div>
      </div>
    );
  }

  const progress = current + (answered ? 1 : 0);

  return (
    <div class="space-y-6">
      <div class="flex items-center justify-between text-sm text-clay dark:text-stone-400">
        <span>प्रश्न {current + 1} / {total}</span>
        <span>{score} सही</span>
      </div>

      <div
        class="w-full bg-surface-bark dark:bg-charcoal-700 rounded-full h-2"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="अभ्यास प्रगति"
      >
        <div
          class="bg-vermillion h-2 rounded-full transition-all duration-300"
          style={{ width: `${(progress / total) * 100}%` }}
        />
      </div>

      {exercise.type === 'mcq' ? (
        <MCQ
          key={current}
          question={exercise.question_hi}
          options={exercise.options}
          correctId={exercise.correct}
          explanation={exercise.explanation_hi}
          onAnswer={handleAnswer}
        />
      ) : exercise.type === 'drag-match' ? (
        <DragMatch
          key={current}
          instruction={exercise.instruction_hi}
          pairs={exercise.pairs}
          explanation={exercise.explanation_hi}
          onAnswer={handleAnswer}
        />
      ) : null}

      {answered && (
        <div class="flex justify-end">
          <button
            onClick={handleNext}
            class="px-6 py-3 bg-vermillion hover:bg-vermillion-dark text-white rounded-lg font-medium transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermillion"
          >
            {current + 1 >= total ? 'परिणाम देखें' : 'अगला प्रश्न'}
          </button>
        </div>
      )}
    </div>
  );
}
