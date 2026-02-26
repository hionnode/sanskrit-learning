import { useState } from 'preact/hooks';

interface Reading {
  id: string;
  title_hi: string;
  category: string;
  difficulty: string;
  sanskrit_text: string;
}

interface Props {
  readings: Reading[];
  categoryLabels: Record<string, string>;
  difficultyLabels: Record<string, string>;
}

const pillBase = 'px-3 py-1.5 rounded-full text-sm font-medium transition-colors min-h-[36px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermillion';
const pillActive = 'bg-vermillion text-white';
const pillInactive = 'bg-surface-bark dark:bg-charcoal-700 text-stone-600 dark:text-stone-400 hover:bg-border-subtle dark:hover:bg-charcoal-600';

export default function LibraryFilter({ readings, categoryLabels, difficultyLabels }: Props) {
  const [category, setCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  const categories = [...new Set(readings.map((r) => r.category))];
  const difficulties = [...new Set(readings.map((r) => r.difficulty))];

  const filtered = readings.filter((r) => {
    if (category && r.category !== category) return false;
    if (difficulty && r.difficulty !== difficulty) return false;
    return true;
  });

  return (
    <div class="space-y-6">
      {/* Filters */}
      <div class="space-y-3">
        <div class="flex flex-wrap gap-2" role="group" aria-label="श्रेणी">
          <button
            onClick={() => setCategory(null)}
            class={`${pillBase} ${category === null ? pillActive : pillInactive}`}
          >
            सभी
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(category === cat ? null : cat)}
              class={`${pillBase} ${category === cat ? pillActive : pillInactive}`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
        {difficulties.length > 1 && (
          <div class="flex flex-wrap gap-2" role="group" aria-label="कठिनाई">
            <button
              onClick={() => setDifficulty(null)}
              class={`${pillBase} ${difficulty === null ? pillActive : pillInactive}`}
            >
              सभी स्तर
            </button>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(difficulty === diff ? null : diff)}
                class={`${pillBase} ${difficulty === diff ? pillActive : pillInactive}`}
              >
                {difficultyLabels[diff] || diff}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <p class="text-sm text-clay dark:text-stone-400">
        {filtered.length} पाठ्य सामग्री
      </p>

      {filtered.length > 0 ? (
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((reading) => (
            <a
              key={reading.id}
              href={`/hi/library/${reading.id}`}
              class="block p-5 rounded-xl border border-border-subtle dark:border-charcoal-700 bg-white dark:bg-charcoal-800 hover:border-vermillion dark:hover:border-vermillion hover:shadow-card-hover transition-all shadow-card group"
            >
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-medium px-2 py-0.5 rounded-full bg-vermillion/10 text-vermillion dark:text-vermillion-light">
                  {categoryLabels[reading.category] || reading.category}
                </span>
                <span class="text-xs font-medium px-2 py-0.5 rounded-full bg-stone-100 dark:bg-charcoal-700 text-clay dark:text-stone-400">
                  {difficultyLabels[reading.difficulty] || reading.difficulty}
                </span>
              </div>
              <h3 class="font-bold text-ink dark:text-stone-100 group-hover:text-vermillion dark:group-hover:text-vermillion-light transition-colors mb-2">
                {reading.title_hi}
              </h3>
              <p class="text-base text-clay dark:text-stone-400 font-serif leading-relaxed line-clamp-2" lang="sa">
                {reading.sanskrit_text.split('\n')[0]}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p class="text-center text-stone-500 dark:text-stone-400 py-8">
          इस श्रेणी में अभी कोई सामग्री उपलब्ध नहीं है।
        </p>
      )}
    </div>
  );
}
