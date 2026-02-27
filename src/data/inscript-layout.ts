export interface KeyDef {
  /** KeyboardEvent.code (e.g. 'KeyQ', 'ShiftLeft') */
  code: string;
  /** Character produced without Shift */
  normal: string;
  /** Character produced with Shift */
  shift: string;
  /** Override display label for special keys */
  label?: string;
  /** Width multiplier (default 1 = 2.5rem / 40px) */
  width?: number;
  /** Whether this is a modifier / non-character key */
  special?: boolean;
}

export type KeyboardRow = KeyDef[];

export const INSCRIPT_LAYOUT: KeyboardRow[] = [
  // Row 1 — top row (QWERTY Q→])
  [
    { code: 'KeyQ', normal: 'ौ', shift: 'औ' },
    { code: 'KeyW', normal: 'ै', shift: 'ऐ' },
    { code: 'KeyE', normal: 'ा', shift: 'आ' },
    { code: 'KeyR', normal: 'ी', shift: 'ई' },
    { code: 'KeyT', normal: 'ू', shift: 'ऊ' },
    { code: 'KeyY', normal: 'ब', shift: 'भ' },
    { code: 'KeyU', normal: 'ह', shift: 'ङ' },
    { code: 'KeyI', normal: 'ग', shift: 'घ' },
    { code: 'KeyO', normal: 'द', shift: 'ध' },
    { code: 'KeyP', normal: 'ज', shift: 'झ' },
    { code: 'BracketLeft', normal: 'ड', shift: 'ढ' },
    { code: 'BracketRight', normal: '़', shift: 'ञ' },
  ],
  // Row 2 — home row (QWERTY A→')
  [
    { code: 'KeyA', normal: 'ो', shift: 'ओ' },
    { code: 'KeyS', normal: 'े', shift: 'ए' },
    { code: 'KeyD', normal: '्', shift: 'अ' },
    { code: 'KeyF', normal: 'ि', shift: 'इ' },
    { code: 'KeyG', normal: 'ु', shift: 'उ' },
    { code: 'KeyH', normal: 'प', shift: 'फ' },
    { code: 'KeyJ', normal: 'र', shift: 'ऱ' },
    { code: 'KeyK', normal: 'क', shift: 'ख' },
    { code: 'KeyL', normal: 'त', shift: 'थ' },
    { code: 'Semicolon', normal: 'च', shift: 'छ' },
    { code: 'Quote', normal: 'ट', shift: 'ठ' },
  ],
  // Row 3 — bottom row (QWERTY Z→M) with Shift keys
  [
    { code: 'ShiftLeft', normal: '', shift: '', label: 'Shift', width: 1.5, special: true },
    { code: 'KeyZ', normal: 'ं', shift: 'ँ' },
    { code: 'KeyX', normal: 'म', shift: 'ण' },
    { code: 'KeyC', normal: 'न', shift: 'ऩ' },
    { code: 'KeyV', normal: 'व', shift: 'ऴ' },
    { code: 'KeyB', normal: 'ल', shift: 'ळ' },
    { code: 'KeyN', normal: 'स', shift: 'श' },
    { code: 'KeyM', normal: 'य', shift: 'ष' },
    { code: 'ShiftRight', normal: '', shift: '', label: 'Shift', width: 1.5, special: true },
  ],
  // Row 4 — space bar
  [
    { code: 'Space', normal: ' ', shift: ' ', label: 'Space', width: 6, special: true },
  ],
];
