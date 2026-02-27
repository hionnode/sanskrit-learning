/** Typing test configuration and state types */

export type TestMode = 'words' | 'time' | 'quote' | 'zen';
export type TestPhase = 'idle' | 'running' | 'finished';

export interface TestConfig {
  lessonId: number;
  mode: TestMode;
  /** Seconds for time mode, word count for words mode */
  value: number;
}

export interface CharState {
  /** The expected grapheme cluster */
  expected: string;
  /** What the user typed (empty if not yet reached) */
  typed: string;
  /** 'correct' | 'incorrect' | 'extra' | 'pending' */
  status: 'correct' | 'incorrect' | 'extra' | 'pending';
}

export interface WordState {
  chars: CharState[];
  /** Whether the user has moved past this word */
  completed: boolean;
}

export interface TestState {
  phase: TestPhase;
  words: WordState[];
  currentWordIndex: number;
  currentCharIndex: number;
  /** Timestamp (ms) when typing started */
  startTime: number;
  /** Elapsed time in seconds (updated by timer) */
  elapsed: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
}

export interface TestResult {
  netWpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  totalTime: number;
}

export interface TypingPrefs {
  lessonId: number;
  mode: TestMode;
  value: number;
}

export interface Lesson {
  id: number;
  stage: string;
  label_hi: string;
  label_en: string;
  /** Characters in this lesson's practice pool */
  keys: string[];
  /** Pre-defined words for word-based lessons */
  words?: string[];
  /** Pre-defined combinations for combo lessons */
  combos?: string[];
}
