import { INSCRIPT_LAYOUT } from '../../../data/inscript-layout';
import type { KeyDef } from '../../../data/inscript-layout';

interface Props {
  pressedKeys: Set<string>;
  shiftHeld: boolean;
}

function Key({
  keyDef,
  pressed,
  shiftHeld,
}: {
  keyDef: KeyDef;
  pressed: boolean;
  shiftHeld: boolean;
}) {
  const display = keyDef.special
    ? keyDef.label
    : shiftHeld
      ? keyDef.shift
      : keyDef.normal;

  const widthClass = keyDef.width
    ? keyDef.width >= 6
      ? 'w-72 md:w-80'
      : keyDef.width >= 1.5
        ? 'w-16 md:w-20'
        : 'w-10 md:w-11'
    : 'w-10 md:w-11';

  const baseClass =
    'h-10 md:h-11 flex items-center justify-center rounded-lg transition-all duration-75 select-none';

  let colorClass: string;
  if (pressed) {
    colorClass =
      'bg-turmeric shadow-key border-b-2 border-orange-400 text-ink font-bold ring-2 ring-turmeric/50 ring-offset-1';
  } else if (keyDef.special) {
    colorClass =
      'bg-manuscript-accent/10 dark:bg-charcoal-700 backdrop-blur-sm shadow-key border-b-2 border-manuscript-accent/20 dark:border-charcoal-600';
  } else {
    colorClass =
      'bg-white/60 dark:bg-charcoal-700/60 backdrop-blur-sm shadow-key border-b-2 border-manuscript-accent/10 dark:border-charcoal-600';
  }

  const fontClass = keyDef.special
    ? 'text-[10px] text-manuscript-accent dark:text-stone-500 uppercase tracking-tighter font-bold'
    : 'font-devanagari text-sm md:text-lg text-ink dark:text-stone-300';

  return (
    <div class={`${baseClass} ${widthClass} ${colorClass} ${fontClass}`}>
      {display}
    </div>
  );
}

export default function Keyboard({ pressedKeys, shiftHeld }: Props) {
  return (
    <div class="hidden md:block w-full shrink-0">
      <div class="bg-white/20 dark:bg-charcoal-800/40 backdrop-blur-md rounded-[2rem] p-4 md:p-6 shadow-2xl border border-white/30 dark:border-charcoal-700/50 relative overflow-hidden transition-all duration-700 hover:bg-white/25 dark:hover:bg-charcoal-800/50">
        <div class="relative z-10 flex flex-col gap-2 md:gap-2.5 items-center select-none">
          {INSCRIPT_LAYOUT.map((row, ri) => (
            <div key={ri} class="flex justify-center gap-1.5 md:gap-2">
              {row.map((keyDef: KeyDef) => (
                <Key
                  key={keyDef.code}
                  keyDef={keyDef}
                  pressed={pressedKeys.has(keyDef.code)}
                  shiftHeld={shiftHeld}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
