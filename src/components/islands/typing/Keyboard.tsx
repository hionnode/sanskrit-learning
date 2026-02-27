import { INSCRIPT_LAYOUT } from '../../../data/inscript-layout';
import type { KeyDef } from '../../../data/inscript-layout';

interface Props {
  pressedKeys: Set<string>;
  shiftHeld: boolean;
}

const BASE_SIZE = 40; // px

function Key({
  keyDef,
  pressed,
  shiftHeld,
}: {
  keyDef: KeyDef;
  pressed: boolean;
  shiftHeld: boolean;
}) {
  const width = keyDef.width ? keyDef.width * BASE_SIZE : BASE_SIZE;
  const display = keyDef.special
    ? keyDef.label
    : shiftHeld
      ? keyDef.shift
      : keyDef.normal;

  const baseClass =
    'h-10 flex items-center justify-center rounded-md border transition-all duration-75 select-none';
  const colorClass = pressed
    ? 'bg-vermillion text-white border-vermillion scale-95'
    : 'bg-surface-bark dark:bg-charcoal-700 text-ink dark:text-stone-300 border-border-subtle dark:border-charcoal-600 shadow-sm';
  const fontClass = keyDef.special
    ? 'font-sans text-[10px] tracking-wide uppercase'
    : 'font-devanagari text-sm';

  return (
    <div
      class={`${baseClass} ${colorClass} ${fontClass}`}
      style={{ width: `${width}px` }}
    >
      {display}
    </div>
  );
}

export default function Keyboard({ pressedKeys, shiftHeld }: Props) {
  return (
    <div class="hidden md:flex flex-col items-center gap-1 py-4">
      {INSCRIPT_LAYOUT.map((row, ri) => (
        <div key={ri} class="flex justify-center gap-1">
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
  );
}
