# Sanskrit Shiksha — Action Plan

## MVP Scope (Phase 1): Content-Only Static Site

Pure static Astro site deployed on Cloudflare Pages. No auth, no database, no progress tracking, no streaks. Focus entirely on structuring the content well and making it accessible. Validate interest first, add engagement features in Phase 2.

### Content Sources (Public Domain)

- **Part 1:** https://archive.org/details/20211101_20211101_1057
- **Part 2:** https://archive.org/details/in.ernet.dli.2015.545637
- **Ashtadhyayi Sutrapath (reference/advanced):** https://archive.org/details/ashtadhyayi-sutrapath-yatibodh-yukt

---

## MVP Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Astro 5+** (static output) | Zero JS by default, content collections, MDX support, fast builds |
| Interactive Islands | **Preact** | Lightweight islands for exercises, word popups, toggles |
| Styling | **Tailwind CSS** | Rapid responsive UI, dark mode via `class` strategy |
| Hosting | **Cloudflare Pages** (free tier) | Global CDN, unlimited bandwidth, zero config |
| Content | **Astro Content Collections** (MDX) | Type-safe, validated frontmatter, built-in |
| i18n | **Astro i18n routing** | `/hi/...` (default) and `/en/...` |

### What MVP Does NOT Have

- No user accounts / authentication
- No database (no D1, no Supabase, nothing)
- No progress tracking / streaks / XP
- No backend API routes
- Exercises work client-side only, results are not persisted
- No analytics (add Cloudflare Web Analytics in week 2 if desired — it's a single script tag)

### Astro Config

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',                    // Fully static — no SSR, no server
  integrations: [preact(), tailwind(), mdx()],
  i18n: {
    defaultLocale: 'hi',
    locales: ['hi', 'en'],
    routing: { prefixDefaultLocale: true }
  }
});
```

---

## Information Architecture

### Learning Path (4 Stages)

```
Stage 1: Foundation (Sanskrit Swayam Shikshak Part 1)
├── Module 1: Varnamala & Pronunciation (वर्णमाला)
├── Module 2: Basic Sandhi (संधि)
├── Module 3: Shabd Roop — Noun Declensions (शब्द रूप)
├── Module 4: Dhatu Roop — Verb Conjugations (धातु रूप)
├── Module 5: Karak & Vibhakti (कारक और विभक्ति)
├── Module 6: Simple Sentence Construction (वाक्य रचना)
└── ... (remaining lessons from Part 1)

Stage 2: Intermediate (Sanskrit Swayam Shikshak Part 2)
├── Module N: Advanced Sandhi Rules
├── Module N+1: Samasa (Compound Words)
├── Module N+2: Kridanta & Taddhita (Verbal Derivatives)
├── Module N+3: Complex Sentence Structures
└── ... (remaining lessons from Part 2)

Stage 3: Reading Practice (Curated Public Domain Texts)
├── Subhashitas (standalone wisdom verses — easiest)
├── Hitopadesha Stories (short fables with moral lessons)
├── Panchatantra Stories (slightly longer narratives)
├── Bhagavad Gita (with word-by-word anvaya/prose order)
└── Simple Stotras & Shlokas (devotional/poetic)

Stage 4: Advanced Pathways (Guided References)
├── Maheshwara Sutras (माहेश्वर सूत्राणि) — interactive module
├── Pratyahara System — interactive explainer
├── Introduction to Ashtadhyayi structure
├── Recommended texts: Laghu Siddhanta Kaumudi, etc.
└── External resource links (YouTube channels, courses, books)
```

### Content Structure per Lesson (Stages 1-2)

```
Lesson N: [Title in Sanskrit] — [Title in Hindi/English]
├── Concept Introduction (text + examples)
│   ├── Grammar rule explained with examples
│   ├── Tables (e.g., declension tables, conjugation tables)
│   └── Audio pronunciation (future, not MVP)
├── Worked Examples
│   ├── 3-5 example sentences demonstrating the rule
│   └── Word-by-word breakdown (anvaya)
├── Exercises (Preact island, client-side only, not persisted)
│   ├── 5-8 MCQ questions
│   └── 3-5 drag-and-drop matching exercises
├── Real Text Application
│   └── A short Sanskrit passage using ONLY grammar taught so far
│       with word-by-word breakdown on tap/click
└── Lesson Summary
    └── Key rules/tables for quick reference
```

### Content Structure for Stage 3 (Reading Practice)

```
Text Entry: [Title]
├── Original Sanskrit text (Devanagari)
├── Transliteration toggle (IAST)
├── Padachheda (word splitting for compounds/sandhi)
├── Word-by-word meaning (Hindi + English)
├── Anvaya (prose word order rearrangement)
├── Full translation (Hindi + English)
├── Grammar notes (which rules from Stage 1-2 are used here)
└── Difficulty tag (beginner-friendly / intermediate / advanced)
```

---

## Content Collections & Schema

### Collection Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    title_hi: z.string(),
    title_en: z.string(),
    stage: z.enum(['foundation', 'intermediate']),
    module_slug: z.string(),
    module_title_hi: z.string(),
    module_title_en: z.string(),
    sort_order: z.number(),
    estimated_minutes: z.number().default(15),
    prerequisites: z.array(z.string()).optional(),
    exercises: z.array(z.discriminatedUnion('type', [
      // MCQ
      z.object({
        type: z.literal('mcq'),
        question_hi: z.string(),
        question_en: z.string(),
        options: z.array(z.object({
          id: z.string(),
          text: z.string(),
        })),
        correct: z.string(),             // option id
        explanation_hi: z.string().optional(),
        explanation_en: z.string().optional(),
      }),
      // Drag-match
      z.object({
        type: z.literal('drag_match'),
        question_hi: z.string(),
        question_en: z.string(),
        pairs: z.array(z.object({
          left: z.string(),
          right: z.string(),
        })),
      }),
    ])).default([]),
  }),
});

const readings = defineCollection({
  type: 'content',
  schema: z.object({
    title_hi: z.string(),
    title_en: z.string(),
    category: z.enum(['subhashita', 'hitopadesha', 'panchatantra', 'gita', 'stotra']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    sort_order: z.number(),
    sanskrit_text: z.string(),
    transliteration: z.string().optional(),
    padachheda: z.string().optional(),
    word_meanings: z.array(z.object({
      word: z.string(),
      meaning_hi: z.string(),
      meaning_en: z.string(),
      grammar_note: z.string().optional(),
    })).default([]),
    anvaya: z.string().optional(),
    translation_hi: z.string(),
    translation_en: z.string(),
    related_lessons: z.array(z.string()).optional(),   // lesson slugs
  }),
});

const advanced = defineCollection({
  type: 'content',
  schema: z.object({
    title_hi: z.string(),
    title_en: z.string(),
    sort_order: z.number(),
    has_interactive: z.boolean().default(false),
  }),
});

export const collections = { lessons, readings, advanced };
```

### Exercise Data in Frontmatter

Exercises live directly in the MDX frontmatter — no database needed. The Preact island reads them as props.

```yaml
# Example: src/content/lessons/foundation/shabd-roop/ram-shabd.mdx
---
title_hi: "राम शब्द — अकारान्त पुल्लिंग"
title_en: "Ram Shabda — A-stem Masculine"
stage: "foundation"
module_slug: "shabd-roop"
module_title_hi: "शब्द रूप"
module_title_en: "Noun Declensions"
sort_order: 1
estimated_minutes: 20
prerequisites: ["varnamala/swar", "varnamala/vyanjan"]
exercises:
  - type: mcq
    question_hi: "'राम' शब्द का द्वितीया विभक्ति एकवचन रूप क्या है?"
    question_en: "What is the accusative singular form of 'राम'?"
    options:
      - id: a
        text: "रामम्"
      - id: b
        text: "रामेण"
      - id: c
        text: "रामाय"
      - id: d
        text: "रामात्"
    correct: "a"
    explanation_hi: "अकारान्त पुल्लिंग शब्दों का द्वितीया विभक्ति एकवचन रूप 'अम्' प्रत्यय से बनता है।"
    explanation_en: "Accusative singular of a-stem masculine nouns is formed with the 'am' suffix."
  - type: mcq
    question_hi: "'रामाय' किस विभक्ति का रूप है?"
    question_en: "Which vibhakti is 'रामाय'?"
    options:
      - id: a
        text: "तृतीया"
      - id: b
        text: "चतुर्थी"
      - id: c
        text: "पञ्चमी"
      - id: d
        text: "षष्ठी"
    correct: "b"
  - type: drag_match
    question_hi: "सही विभक्ति से मिलान कीजिए:"
    question_en: "Match with the correct vibhakti:"
    pairs:
      - left: "रामेण"
        right: "तृतीया (by/with)"
      - left: "रामाय"
        right: "चतुर्थी (for/to)"
      - left: "रामात्"
        right: "पञ्चमी (from)"
      - left: "रामस्य"
        right: "षष्ठी (of)"
---

## राम शब्द रूप (अकारान्त पुल्लिंग)

राम शब्द संस्कृत व्याकरण में अकारान्त पुल्लिंग शब्दों का प्रतिनिधि शब्द है...

(lesson MDX content here)
```

### Content Directory Structure

```
src/content/
├── lessons/
│   ├── foundation/
│   │   ├── varnamala/
│   │   │   ├── swar.mdx
│   │   │   ├── vyanjan.mdx
│   │   │   └── visarga-anusvara.mdx
│   │   ├── sandhi/
│   │   │   ├── swar-sandhi.mdx
│   │   │   ├── vyanjan-sandhi.mdx
│   │   │   └── visarga-sandhi.mdx
│   │   ├── shabd-roop/
│   │   │   ├── ram-shabd.mdx
│   │   │   ├── deva-shabd.mdx
│   │   │   ├── nadi-shabd.mdx
│   │   │   └── ...
│   │   ├── dhatu-roop/
│   │   │   ├── bhvadi-gana.mdx
│   │   │   └── ...
│   │   ├── karak-vibhakti/
│   │   └── vakya-rachna/
│   └── intermediate/
│       ├── advanced-sandhi/
│       ├── samasa/
│       ├── kridanta/
│       └── ...
├── readings/
│   ├── subhashitas/
│   │   ├── vidya-dhanam.mdx
│   │   ├── paropakarah.mdx
│   │   └── ...
│   ├── hitopadesha/
│   │   ├── simha-mushaka.mdx
│   │   └── ...
│   ├── panchatantra/
│   ├── gita/
│   │   ├── chapter-01-selected.mdx
│   │   └── chapter-02-selected.mdx
│   └── stotra/
├── advanced/
│   ├── maheshwara-sutras.mdx
│   ├── pratyahara-system.mdx
│   ├── ashtadhyayi-intro.mdx
│   └── resources.mdx
└── config.ts
```

---

## Feature Specifications (MVP)

### 1. Lesson Viewer

- Static Astro page, zero JS for content rendering
- Devanagari rendered large and clear (min 18px body, 24px+ for Sanskrit examples)
- Toggle for IAST transliteration alongside Devanagari — **Preact island** (`client:visible`)
- Grammar tables as responsive Astro components (horizontally scrollable on mobile)
- Tap/click any Sanskrit word to see breakdown popup — **Preact island** (`client:visible`)
- Prev/Next lesson navigation at bottom
- Lesson table of contents sidebar on desktop

### 2. Exercise Engine (Client-Side Only)

All exercise logic runs in the browser. No persistence. No scoring saved.

**MCQ Component (Preact island):**
- Receives exercise data as props from frontmatter
- 4 options as tappable cards
- Immediate feedback: green/red highlight + correct answer
- Show explanation after answering
- "Next question" button to advance
- Summary at end: X/Y correct (ephemeral, not saved)

**Drag-and-Drop Matching Component (Preact island):**
- Left column: Sanskrit forms
- Right column: Meanings/categories
- Desktop: drag-and-drop
- Mobile: tap-to-select (tap left item, tap right item to pair)
- Visual connecting lines between matched pairs
- "Check answers" button
- Show correct/incorrect pairs

### 3. Learning Path Overview

- Page showing all 4 stages with their modules and lessons
- No locking — everything is accessible in MVP (no auth = no tracking = no locks)
- Visual hierarchy: Stage → Module → Lesson list
- Current: simple list/accordion layout
- Phase 2: visual progress map with unlock states

### 4. Reading Library

- Card grid showing available texts
- Filter by category (Subhashita, Hitopadesha, etc.) and difficulty
- Each text opens in a reader page with toggleable layers:
  - Original Devanagari (always visible)
  - Transliteration (toggle)
  - Padachheda (toggle)
  - Word-by-word meanings (toggle)
  - Anvaya (toggle)
  - Full translation (toggle)
- "Grammar used here" links back to relevant lessons

### 5. Advanced Section

- Static pages for Maheshwara Sutras, Pratyahara system, Ashtadhyayi intro
- Maheshwara Sutras: **Preact island** — interactive component where user can:
  - See all 14 sutras
  - Click a pratyahara to see which sounds it covers
  - Quiz mode: given sounds, construct the pratyahara
- Pratyahara quiz: **Preact island**
- Resource list: curated links to books, videos, courses

### 6. Bilingual UI

- Language toggle in header (हिन्दी / English)
- Astro i18n routing: `/hi/...` and `/en/...`
- Preference stored in cookie (no auth needed)
- Sanskrit content always in Devanagari regardless of UI language
- IAST transliteration is a separate per-page toggle

### 7. Dark Mode

- Toggle in header, preference in cookie/localStorage
- Tailwind `class` strategy
- Ensure Devanagari text remains highly readable in dark mode (cream-on-dark, not pure white)

### 8. Landing Page

- Hero: "Learn Sanskrit for free, from zero to reading real texts"
- Brief explanation of the 4-stage path
- Sample lesson preview (embedded)
- "Start Learning" CTA → goes to Stage 1, Lesson 1
- Source attribution: mention Satavalekar's books, public domain, Archive.org links

---

## UI/UX Specifications

### Design Language

- **Clean, minimal, content-first** — Sanskrit text is the hero
- **Color palette:** Warm, scholarly. Saffron/amber accents (#D97706, #F59E0B) on cream (#FFFBEB) backgrounds. Dark mode: deep charcoal (#1C1917) with warm cream text.
- **Typography:**
  - Devanagari: **Noto Sans Devanagari** (self-hosted, subsetted)
  - English/Latin: **Inter**
  - Sanskrit examples: larger size (1.25-1.5rem), subtle warm background highlight
  - Grammar tables: monospaced alignment for declension/conjugation grids
- **Spacing:** Generous — Sanskrit text needs breathing room. 1.8-2.0 line height for Devanagari.

### Responsive Approach

- **Mobile-first** (majority Indian audience on phones)
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Mobile: single column, bottom nav, hamburger menu
- Desktop: sidebar nav, wider content area, grammar tables at full width
- Grammar tables: horizontal scroll on mobile (with scroll indicator shadow)
- Exercises: full-width cards on mobile, constrained max-width on desktop

### Page Layouts

**Landing page:** Full-width hero, content sections below
**Lesson page:** Sidebar (desktop) + content area + exercise section at bottom
**Library page:** Filter bar + card grid (2 cols mobile, 3-4 cols desktop)
**Reading page:** Clean single-column reader with toggle bar fixed at top

### Island Hydration Strategy (MVP)

```
Component                        | Type    | Hydration
---------------------------------|---------|------------------
Lesson MDX content               | Astro   | None (zero JS)
Grammar tables                   | Astro   | None
Navigation (navbar, sidebar)     | Astro   | None
Lesson prev/next                 | Astro   | None
Landing page                     | Astro   | None
Library card grid                | Astro   | None
Library filters                  | Preact  | client:load
Sanskrit word popup              | Preact  | client:visible
Transliteration toggle           | Preact  | client:visible
Exercise MCQ                     | Preact  | client:visible
Exercise DragMatch               | Preact  | client:visible
Reading text layer toggles       | Preact  | client:visible
Maheshwara Sutra interactive     | Preact  | client:visible
Pratyahara quiz                  | Preact  | client:visible
Language switcher                | Preact  | client:load
Dark mode toggle                 | Preact  | client:load
```

---

## Project Structure (MVP)

```
sanskrit-shiksha/
├── src/
│   ├── pages/
│   │   ├── index.astro                    # Landing page
│   │   └── [lang]/
│   │       ├── learn/
│   │       │   ├── index.astro            # Learning path overview
│   │       │   └── [...slug].astro        # Dynamic lesson pages
│   │       ├── library/
│   │       │   ├── index.astro            # Reading library grid
│   │       │   └── [...slug].astro        # Individual text reader
│   │       ├── advanced/
│   │       │   ├── index.astro            # Advanced section overview
│   │       │   └── [...slug].astro        # Individual advanced pages
│   │       └── about.astro                # About page (licensing, attribution)
│   ├── components/
│   │   ├── astro/                         # Static components (zero JS)
│   │   │   ├── Navbar.astro
│   │   │   ├── MobileNav.astro
│   │   │   ├── Sidebar.astro
│   │   │   ├── Footer.astro
│   │   │   ├── GrammarTable.astro
│   │   │   ├── LessonNav.astro            # Prev/next lesson links
│   │   │   ├── TextCard.astro             # Library card
│   │   │   ├── StageCard.astro            # Learning path stage card
│   │   │   └── ModuleAccordion.astro      # Module with lesson list
│   │   └── islands/                       # Preact interactive components
│   │       ├── exercises/
│   │       │   ├── MCQ.tsx
│   │       │   ├── DragMatch.tsx
│   │       │   └── ExerciseSet.tsx        # Wraps all exercises for a lesson
│   │       ├── lesson/
│   │       │   ├── SanskritWord.tsx        # Tappable word with popup
│   │       │   └── TranslitToggle.tsx
│   │       ├── reading/
│   │       │   └── TextLayerToggles.tsx    # Toggle bar for reading layers
│   │       ├── advanced/
│   │       │   ├── MaheshwaraSutras.tsx
│   │       │   └── PratyaharaQuiz.tsx
│   │       └── common/
│   │           ├── LanguageSwitcher.tsx
│   │           └── DarkModeToggle.tsx
│   ├── content/                           # Astro Content Collections
│   │   ├── lessons/                       # (structure shown above)
│   │   ├── readings/
│   │   ├── advanced/
│   │   └── config.ts
│   ├── layouts/
│   │   ├── BaseLayout.astro               # HTML head, fonts, meta
│   │   ├── LessonLayout.astro             # Sidebar + content + prev/next
│   │   ├── ReaderLayout.astro             # Clean reading layout
│   │   └── LibraryLayout.astro            # Filter bar + grid
│   ├── lib/
│   │   ├── i18n.ts                        # Translation helpers
│   │   ├── content-helpers.ts             # Lesson ordering, module grouping, nav
│   │   └── transliterate.ts              # Devanagari ↔ IAST conversion
│   ├── i18n/
│   │   ├── hi.json                        # Hindi UI strings
│   │   └── en.json                        # English UI strings
│   └── styles/
│       └── global.css                     # Tailwind + Devanagari custom styles
├── scripts/
│   └── content-pipeline/
│       ├── extract-ocr.py                 # Download Archive.org content
│       ├── clean-and-structure.py         # LLM-assisted: OCR → structured MDX
│       └── generate-exercises.py          # LLM-assisted exercise generation
├── public/
│   ├── fonts/
│   │   ├── NotoSansDevanagari-Regular.woff2
│   │   ├── NotoSansDevanagari-Bold.woff2
│   │   ├── Inter-Regular.woff2
│   │   └── Inter-Bold.woff2
│   └── og-image.png                       # Social sharing image
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Content Pipeline

### Step 1: Extract Raw Content

```bash
# Part 1 (higher quality scan, 600 PPI)
wget "https://archive.org/download/20211101_20211101_1057/संस्कृत%20स्वयं%20शिक्षक_djvu.txt" -O part1_raw.txt
wget "https://archive.org/download/20211101_20211101_1057/संस्कृत%20स्वयं%20शिक्षक.pdf" -O part1.pdf

# Part 2
wget "https://archive.org/download/in.ernet.dli.2015.545637/2015.545637.Sanskrit-Swayam_djvu.txt" -O part2_raw.txt
wget "https://archive.org/download/in.ernet.dli.2015.545637/2015.545637.Sanskrit-Swayam.pdf" -O part2.pdf
```

### Step 2: PDF → Page Images

```bash
# Convert PDF pages to images for Claude vision input
# Part 1
pdftoppm -jpeg -r 300 part1.pdf part1_pages/page
# Part 2
pdftoppm -jpeg -r 300 part2.pdf part2_pages/page
```

### Step 3: LLM-Assisted Structuring

For each chapter, send page images + raw OCR to Claude API:

```python
# scripts/content-pipeline/clean-and-structure.py (pseudocode)

PROMPT = """
You are structuring a Sanskrit textbook chapter into a lesson for a web app.

Given: page images and raw OCR text of a chapter from "संस्कृत स्वयं शिक्षक"

Output a valid MDX file with YAML frontmatter containing:
1. Frontmatter: title_hi, title_en, stage, module_slug, module_title_hi, module_title_en, sort_order, estimated_minutes, prerequisites, exercises[]
2. Clean lesson content in MDX with:
   - Grammar rules explained in Hindi (primary) with key terms
   - Declension/conjugation tables as markdown tables
   - 3-5 worked examples with word-by-word breakdown
   - A short real Sanskrit passage using only grammar taught
3. Exercises in frontmatter:
   - 5-8 MCQ questions testing the grammar concepts
   - 3-5 drag-match exercises for form recognition
   - All questions bilingual (Hindi + English)

Rules:
- Fix all OCR errors in Devanagari text
- Ensure all Sanskrit forms and tables are accurate
- Use standard Devanagari Unicode, no transliteration in content body
- Keep explanations clear for self-learners (no teacher assumed)
"""

for chapter in chapters:
    images = load_page_images(chapter)
    ocr_text = load_ocr_text(chapter)
    response = claude_api(
        model="claude-sonnet-4-20250514",
        messages=[{
            "role": "user",
            "content": [
                *[{"type": "image", "source": img} for img in images],
                {"type": "text", "text": f"{PROMPT}\n\nRaw OCR:\n{ocr_text}"}
            ]
        }],
        max_tokens=8000
    )
    save_mdx(chapter.slug, response)
```

### Step 4: Human Review

**Critical.** LLM output must be reviewed for:
- Grammar table accuracy (vibhakti/dhatu roop forms)
- Exercise answer correctness
- Transliteration accuracy
- Consistent terminology across lessons
- Reading level appropriateness

Budget: ~30-60 minutes per lesson for review and corrections.

### Step 5: Build and Validate

```bash
# Astro content collections will validate frontmatter against schema
npm run build

# Any schema violations will show as build errors
# Fix and rebuild until clean
```

---

## Implementation Phases (MVP)

### Phase 0: Project Setup (3-4 days)

- [ ] Initialize Astro project: `npm create astro@latest`
- [ ] Add integrations: Preact, Tailwind, MDX
- [ ] Configure `astro.config.mjs` (static output, i18n)
- [ ] Set up Tailwind config with custom Devanagari-friendly theme:
  - Warm color palette (saffron/amber/cream)
  - Dark mode colors
  - Typography scale for Devanagari (larger base, looser line height)
  - Custom font-family stacks
- [ ] Self-host fonts: Noto Sans Devanagari + Inter (subset, woff2)
- [ ] Create BaseLayout.astro (HTML head, font loading, meta tags, dark mode script)
- [ ] Create Navbar.astro, MobileNav.astro, Footer.astro
- [ ] Build LanguageSwitcher.tsx and DarkModeToggle.tsx islands
- [ ] Set up i18n: hi.json + en.json with base UI strings
- [ ] Deploy empty shell to Cloudflare Pages, confirm builds work
- [ ] Create 1 sample lesson MDX to validate content collection schema

### Phase 1a: Content Pipeline (1-2 weeks, parallel with Phase 1b)

- [ ] Download PDFs and raw text from Archive.org
- [ ] Convert PDFs to page images (pdftoppm)
- [ ] Build Claude API pipeline script
- [ ] Process Part 1 chapters 1-3 as pilot
- [ ] Human review pilot lessons
- [ ] Iterate on pipeline prompt based on review
- [ ] Process remaining Part 1 chapters
- [ ] Process Part 2 chapters
- [ ] Generate and review all exercises
- [ ] Validate all MDX files build successfully

### Phase 1b: Core Components (1-2 weeks, parallel with Phase 1a)

- [ ] Define content collection schemas in `config.ts`
- [ ] Build `content-helpers.ts`: functions to group lessons by stage/module, get prev/next, etc.
- [ ] Build LessonLayout.astro (sidebar with module nav + content area + prev/next)
- [ ] Build GrammarTable.astro (responsive, scrollable on mobile)
- [ ] Build SanskritWord.tsx island (tap for popup with meaning/grammar)
- [ ] Build TranslitToggle.tsx island
- [ ] Build `transliterate.ts` utility (Devanagari ↔ IAST)
- [ ] Build MCQ.tsx exercise island
- [ ] Build DragMatch.tsx exercise island (drag on desktop, tap-to-pair on mobile)
- [ ] Build ExerciseSet.tsx (wraps all exercises, shows summary at end)
- [ ] Build dynamic lesson page `[...slug].astro`
- [ ] Build learning path overview page (stage/module/lesson accordion)

### Phase 1c: Reading Library + Advanced (1 week)

- [ ] Curate reading texts:
  - [ ] 10-15 Subhashitas with full breakdown
  - [ ] 5-8 Hitopadesha stories
  - [ ] 5-8 Panchatantra stories
  - [ ] Gita Chapter 1-2 selected verses
  - [ ] 5-10 Stotras/Shlokas
- [ ] Build TextLayerToggles.tsx island (toggle bar for reading layers)
- [ ] Build reading text page `[...slug].astro`
- [ ] Build library index page with category/difficulty filters
- [ ] Build TextCard.astro for library grid
- [ ] Build advanced section pages (static MDX content)
- [ ] Build MaheshwaraSutras.tsx interactive island
- [ ] Build PratyaharaQuiz.tsx island
- [ ] Curate resource list for advanced/resources.mdx

### Phase 1d: Landing Page + Polish (3-5 days)

- [ ] Build landing page with hero, path overview, sample lesson embed, CTA
- [ ] Build About page (content sources, licensing, attribution)
- [ ] SEO: page titles, descriptions, Open Graph tags for all pages
- [ ] Structured data (JSON-LD) for educational content
- [ ] Test responsive design across devices (especially Devanagari rendering)
- [ ] Test dark mode thoroughly
- [ ] Test all exercises on mobile (tap interactions)
- [ ] Validate IAST transliteration accuracy
- [ ] Performance check: Lighthouse scores (should be 95+ since it's mostly static)
- [ ] Add Cloudflare Web Analytics (optional, single script tag)
- [ ] Final content review pass
- [ ] Domain setup (when decided)
- [ ] Launch

**Estimated MVP timeline: 4-6 weeks** (content pipeline is the bottleneck)

---

## Phase 2: Engagement Layer (Future)

After MVP is live and validated, add:

- [ ] Cloudflare D1 database (schema from v2 plan)
- [ ] Lucia Auth (email/password + Google OAuth)
- [ ] Switch Astro output from `static` to `hybrid` (SSR for authenticated pages)
- [ ] Add Cloudflare Pages Functions for API routes
- [ ] Progress tracking (lesson completion, exercise scores)
- [ ] Streak system (daily activity, freezes, milestones)
- [ ] XP and leveling
- [ ] Dashboard page with stats
- [ ] Visual progress map with unlock states
- [ ] Module locking (sequential progression)
- [ ] User settings page (language preference, streak history)

All Phase 2 additions layer on top of the static content without changing it. The MDX files, content collections, and exercise components stay the same — Phase 2 just adds a persistence layer around them.

---

## Edge Cases & Notes

### Devanagari Rendering
- Use `lang="sa"` on Sanskrit text elements
- Test conjunct consonants: क्ष, त्र, ज्ञ, श्र, द्ध, क्त, ष्ट
- Test vertical matras: ि, ी, ु, ू — these render differently across browsers/fonts
- Self-host Noto Sans Devanagari to avoid FOUT and cross-platform inconsistencies
- Line height: 1.8-2.0 for Devanagari body text (conjuncts need vertical space)

### Mobile Sanskrit Input
- For drag-match exercises, the tap-to-pair interaction must be very clear:
  - First tap: highlights selected item with border
  - Second tap on match: draws connection, both items grey out
  - Tap connected item to undo
- Touch targets: minimum 44x44px for all tappable elements

### Content Licensing
- Both Satavalekar books: public domain
- All ancient texts (Subhashitas, Hitopadesha, Panchatantra, Gita, Stotras): public domain
- Modern explanations/translations created for this project: CC-BY-SA 4.0
- State this clearly on About page with links to Archive.org sources

### Transliteration
- Use IAST (International Alphabet of Sanskrit Transliteration) — the academic standard
- Implement as a client-side toggle, not duplicate content
- Transliteration function should handle:
  - Basic vowels and consonants
  - Conjuncts (output as individual consonants with halant)
  - Anusvara (ं → ṃ), Visarga (ः → ḥ), Chandrabindu (ँ → m̐)

### SEO
- Static site = excellent SEO baseline
- Each lesson gets its own URL: `/hi/learn/foundation/shabd-roop/ram-shabd`
- Hindi and English versions are alternate hreflang
- Structured data: Course, LearningResource schemas
- Target keywords: "learn sanskrit online free", "संस्कृत सीखें", "sanskrit grammar", "sanskrit self study"