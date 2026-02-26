import { useState, useEffect } from 'preact/hooks';

export default function DarkModeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch(e) {}
  }

  // Don't render icon until we know the theme (prevents flash)
  if (dark === null) {
    return (
      <button
        aria-label="थीम बदलें"
        class="w-10 h-10 flex items-center justify-center rounded-lg text-stone-600 dark:text-stone-300 hover:bg-surface-bark dark:hover:bg-charcoal-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermillion"
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'लाइट मोड' : 'डार्क मोड'}
      class="w-10 h-10 flex items-center justify-center rounded-lg text-stone-600 dark:text-stone-300 hover:bg-surface-bark dark:hover:bg-charcoal-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermillion"
    >
      {dark ? (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
