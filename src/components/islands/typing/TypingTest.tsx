import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import type {
  TestMode,
  TestPhase,
  TestResult,
  WordState,
  CharState,
  TypingPrefs,
} from '../../../lib/typing-types';
import { lessons, generateSequence } from '../../../data/typing-lessons';
import { getRandomQuote } from '../../../data/typing-quotes';
import WordDisplay from './WordDisplay';
import StatsBar from './StatsBar';
import LessonSelector from './LessonSelector';
import ResultsScreen from './ResultsScreen';
import Keyboard from './Keyboard';

const STORAGE_KEY = 'typing-prefs';
const TIMER_INTERVAL = 100;

/** Split text into grapheme clusters using Intl.Segmenter */
function segmentGraphemes(text: string): string[] {
  const segmenter = new Intl.Segmenter('hi', { granularity: 'grapheme' });
  return Array.from(segmenter.segment(text), (s) => s.segment);
}

function loadPrefs(): TypingPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { lessonId: 1, mode: 'time', value: 30 };
}

function savePrefs(prefs: TypingPrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {}
}

/** Build WordState[] from a list of word strings */
function buildWords(wordStrings: string[]): WordState[] {
  return wordStrings.map((w) => ({
    chars: segmentGraphemes(w).map(
      (g): CharState => ({
        expected: g,
        typed: '',
        status: 'pending',
      })
    ),
    completed: false,
  }));
}

function computeWpm(correctChars: number, elapsed: number): number {
  if (elapsed <= 0) return 0;
  return Math.round(correctChars / 5 / (elapsed / 60));
}

function computeAccuracy(correct: number, total: number): number {
  if (total <= 0) return 100;
  return Math.round((correct / total) * 100);
}

interface Props {
  locale: string;
}

export default function TypingTest({ locale: _locale }: Props) {
  // Preferences (persisted)
  const [lessonId, setLessonId] = useState(1);
  const [mode, setMode] = useState<TestMode>('time');
  const [modeValue, setModeValue] = useState(30);
  const [prefsLoaded, setPrefsLoaded] = useState(false);

  // Test state
  const [phase, setPhase] = useState<TestPhase>('idle');
  const [words, setWords] = useState<WordState[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [result, setResult] = useState<TestResult | null>(null);

  // Keyboard state
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [shiftHeld, setShiftHeld] = useState(false);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const composingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load prefs on mount
  useEffect(() => {
    const prefs = loadPrefs();
    setLessonId(prefs.lessonId);
    setMode(prefs.mode);
    setModeValue(prefs.value);
    setPrefsLoaded(true);
  }, []);

  // Generate content when lesson/mode/value changes (and prefs loaded)
  useEffect(() => {
    if (!prefsLoaded) return;
    resetTest();
  }, [lessonId, mode, modeValue, prefsLoaded]);

  // Timer
  useEffect(() => {
    if (phase === 'running') {
      timerRef.current = setInterval(() => {
        setElapsed(() => {
          const now = (Date.now() - startTime) / 1000;
          return now;
        });
      }, TIMER_INTERVAL);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase, startTime]);

  // Check time-mode expiry
  useEffect(() => {
    if (phase === 'running' && mode === 'time' && elapsed >= modeValue) {
      finishTest();
    }
  }, [elapsed, phase, mode, modeValue]);

  // Global keyboard listeners for key highlighting + Tab+Enter restart
  useEffect(() => {
    let tabPressed = false;

    function onKeyDown(e: KeyboardEvent) {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(e.code);
        return next;
      });
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        setShiftHeld(true);
      }

      if (e.key === 'Tab') {
        tabPressed = true;
      } else if (e.key === 'Enter' && tabPressed) {
        e.preventDefault();
        resetTest();
      } else {
        tabPressed = false;
      }
    }

    function onKeyUp(e: KeyboardEvent) {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        setShiftHeld(false);
      }
      if (e.key === 'Tab') tabPressed = false;
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [lessonId, mode, modeValue, prefsLoaded]);

  const lesson = lessons.find((l) => l.id === lessonId) || lessons[0];

  function resetTest() {
    let seq: string[];

    if (mode === 'quote') {
      const lengthMap: Record<number, 'short' | 'medium' | 'long'> = {
        1: 'short',
        2: 'medium',
        3: 'long',
      };
      const quote = getRandomQuote(lengthMap[modeValue] || 'medium');
      seq = quote.text.split(/\s+/);
    } else if (mode === 'zen') {
      seq = generateSequence(lesson, 200);
    } else {
      const count = mode === 'words' ? modeValue : modeValue * 3;
      seq = generateSequence(lesson, count);
    }

    setWords(buildWords(seq));
    setWordIndex(0);
    setCharIndex(0);
    setStartTime(0);
    setElapsed(0);
    setCorrectChars(0);
    setIncorrectChars(0);
    setExtraChars(0);
    setPhase('idle');
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function finishTest() {
    setPhase('finished');
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const finalElapsed = startTime > 0 ? (Date.now() - startTime) / 1000 : 0;

    let correct = 0;
    let incorrect = 0;
    let extra = 0;
    let missed = 0;

    const countUpTo = mode === 'words' || mode === 'quote' ? words.length : wordIndex + 1;
    for (let wi = 0; wi < Math.min(countUpTo, words.length); wi++) {
      const w = words[wi];
      for (const ch of w.chars) {
        if (ch.status === 'correct') correct++;
        else if (ch.status === 'incorrect') incorrect++;
        else if (ch.status === 'extra') extra++;
        else if (ch.status === 'pending') {
          if (wi < wordIndex || (wi === wordIndex && w.completed)) missed++;
        }
      }
    }

    const totalTyped = correct + incorrect + extra;
    const rawWpm = computeWpm(totalTyped, finalElapsed);
    const netWpm = computeWpm(correct, finalElapsed);
    const accuracy = computeAccuracy(correct, totalTyped);

    setResult({
      netWpm,
      rawWpm,
      accuracy,
      correctChars: correct,
      incorrectChars: incorrect,
      extraChars: extra,
      missedChars: missed,
      totalTime: Math.round(finalElapsed),
    });
  }

  function handleSelectLesson(id: number) {
    setLessonId(id);
    savePrefs({ lessonId: id, mode, value: modeValue });
  }

  function handleSelectMode(m: TestMode, v: number) {
    setMode(m);
    setModeValue(v);
    savePrefs({ lessonId, mode: m, value: v });
  }

  function handleNextLesson() {
    const nextId = Math.min(lessonId + 1, lessons.length);
    handleSelectLesson(nextId);
  }

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  function handleInput(e: Event) {
    if (composingRef.current) return;
    const input = e.target as HTMLInputElement;
    processInput(input.value);
    input.value = '';
  }

  function handleCompositionStart() {
    composingRef.current = true;
  }

  function handleCompositionEnd(e: Event) {
    composingRef.current = false;
    const input = e.target as HTMLInputElement;
    processInput(input.value);
    input.value = '';
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (composingRef.current) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      handleBackspace();
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      advanceWord();
      return;
    }
  }

  function processInput(value: string) {
    if (!value) return;

    const graphemes = segmentGraphemes(value);

    if (phase === 'idle') {
      const now = Date.now();
      setStartTime(now);
      setPhase('running');
    }

    let wi = wordIndex;
    let ci = charIndex;

    setWords((prev) => {
      const next = prev.map((w) => ({
        ...w,
        chars: w.chars.map((c) => ({ ...c })),
      }));

      let newCorrect = 0;
      let newIncorrect = 0;
      let newExtra = 0;

      for (const g of graphemes) {
        if (wi >= next.length) break;
        const word = next[wi];

        if (ci < word.chars.length) {
          word.chars[ci].typed = g;
          if (g === word.chars[ci].expected) {
            word.chars[ci].status = 'correct';
            newCorrect++;
          } else {
            word.chars[ci].status = 'incorrect';
            newIncorrect++;
          }
          ci++;
        } else {
          word.chars.push({
            expected: '',
            typed: g,
            status: 'extra',
          });
          ci++;
          newExtra++;
        }
      }

      setCorrectChars((p) => p + newCorrect);
      setIncorrectChars((p) => p + newIncorrect);
      setExtraChars((p) => p + newExtra);
      setWordIndex(wi);
      setCharIndex(ci);

      return next;
    });
  }

  function advanceWord() {
    if (phase !== 'running' && phase !== 'idle') return;

    if (phase === 'idle') {
      return;
    }

    const nextWordIndex = wordIndex + 1;

    setWords((prev) => {
      const next = [...prev];
      next[wordIndex] = { ...next[wordIndex], completed: true };
      return next;
    });

    if ((mode === 'words') && nextWordIndex >= modeValue) {
      setTimeout(() => finishTest(), 0);
      return;
    }

    if (nextWordIndex >= words.length) {
      setTimeout(() => finishTest(), 0);
      return;
    }

    setWordIndex(nextWordIndex);
    setCharIndex(0);
  }

  function handleBackspace() {
    if (phase !== 'running') return;

    setWords((prev) => {
      const next = prev.map((w) => ({
        ...w,
        chars: w.chars.map((c) => ({ ...c })),
      }));

      let ci = charIndex;
      const word = next[wordIndex];

      if (ci > 0) {
        ci--;
        const ch = word.chars[ci];

        if (ch.status === 'extra') {
          word.chars.splice(ci, 1);
          setExtraChars((p) => Math.max(0, p - 1));
        } else {
          if (ch.status === 'correct') {
            setCorrectChars((p) => Math.max(0, p - 1));
          } else if (ch.status === 'incorrect') {
            setIncorrectChars((p) => Math.max(0, p - 1));
          }
          ch.typed = '';
          ch.status = 'pending';
        }

        setCharIndex(ci);
      }

      return next;
    });
  }

  // Compute live stats
  const totalTyped = correctChars + incorrectChars + extraChars;
  const liveWpm = computeWpm(correctChars, elapsed);
  const liveAccuracy = computeAccuracy(correctChars, totalTyped);

  if (!prefsLoaded) {
    return <div class="h-64" />;
  }

  return (
    <div class="flex flex-col items-center w-full h-full min-h-0">
      {/* Hidden input for capturing keystrokes */}
      <input
        ref={inputRef}
        type="text"
        class="sr-only"
        aria-label="टाइपिंग इनपुट"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck={false}
      />

      {phase === 'finished' && result ? (
        <ResultsScreen
          result={result}
          lessonLabel={lesson.label_hi}
          hasNextLesson={lessonId < lessons.length}
          onRestart={resetTest}
          onNextLesson={handleNextLesson}
        />
      ) : (
        <>
          {/* Stats — visible during running */}
          {phase === 'running' ? (
            <StatsBar
              wpm={liveWpm}
              accuracy={liveAccuracy}
              elapsed={elapsed}
              mode={mode}
              modeValue={modeValue}

            />
          ) : (
            /* Empty spacer matching stats height during idle */
            <div class="h-4 shrink-0" />
          )}

          {/* Word display — fills available space */}
          <WordDisplay
            words={words}
            currentWordIndex={wordIndex}
            currentCharIndex={charIndex}
            focused={focused}
            onFocusRequest={focusInput}
          />

          {/* Control panel — always visible */}
          <div class="w-full flex flex-col items-center mt-auto mb-3 gap-3">
            <LessonSelector
              lessons={lessons}
              selectedLessonId={lessonId}
              mode={mode}
              modeValue={modeValue}
              disabled={phase === 'running'}
              onSelectLesson={handleSelectLesson}
              onSelectMode={handleSelectMode}
              onRestart={resetTest}
            />
          </div>

          {/* On-screen keyboard (desktop only) */}
          <Keyboard pressedKeys={pressedKeys} shiftHeld={shiftHeld} />

          {/* Bottom hints */}
          <div class="w-full hidden md:flex justify-between items-center text-[10px] uppercase tracking-widest text-manuscript-accent/40 dark:text-stone-700 mt-2 md:mt-3 px-4 shrink-0">
            <div class="flex items-center gap-1.5">
              <span class="px-1.5 py-0.5 border border-manuscript-accent/15 dark:border-charcoal-700 rounded-md bg-white/50 dark:bg-charcoal-800/50 text-manuscript-accent/50 dark:text-stone-600">tab</span>
              <span>+</span>
              <span class="px-1.5 py-0.5 border border-manuscript-accent/15 dark:border-charcoal-700 rounded-md bg-white/50 dark:bg-charcoal-800/50 text-manuscript-accent/50 dark:text-stone-600">enter</span>
              <span class="ml-1">to restart</span>
            </div>
            <span>Layout: Devanagari Inscript</span>
          </div>
        </>
      )}
    </div>
  );
}
