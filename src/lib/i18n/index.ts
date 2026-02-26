import hi from './hi.json';
import en from './en.json';

const strings: Record<string, Record<string, string>> = { hi, en };

export function t(locale: string, key: string, params?: Record<string, string | number>): string {
  const dict = strings[locale] ?? strings.hi;
  let text = dict[key] ?? strings.hi[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }
  return text;
}

export function createT(locale: string) {
  return (key: string, params?: Record<string, string | number>) => t(locale, key, params);
}
