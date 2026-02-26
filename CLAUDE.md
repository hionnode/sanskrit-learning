# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sanskrit Shiksha — a free, open-source Sanskrit learning platform. Static site that teaches Sanskrit from zero to reading real texts, using public domain textbooks (Satavalekar's "Sanskrit Swayam Shikshak" Parts 1 & 2) as primary content source.

**Current status:** Pre-implementation (planning phase). See `learning-plan.md` for the full specification.

## Tech Stack

- **Framework:** Astro 5+ with static output (no SSR)
- **Interactive islands:** Preact (exercises, toggles, word popups)
- **Styling:** Tailwind CSS with class-based dark mode
- **Content:** Astro Content Collections with MDX
- **i18n:** Astro i18n routing — `/hi/...` (Hindi, default) and `/en/...` (English)
- **Hosting:** Cloudflare Pages (free tier)
- **Fonts:** Noto Sans Devanagari + Inter (self-hosted, subsetted)

## Common Commands

```bash
npm install              # Install dependencies
npm run dev              # Dev server with hot reload
npm run build            # Build static site (validates content collections)
npm run preview          # Preview production build locally
```

## Architecture

### MVP Constraints

No auth, no database, no progress tracking, no backend API routes. Exercises are client-side only with ephemeral state. This is a pure static site served from CDN.

### Content Collections (3 types)

1. **`lessons`** — Grammar instruction (Stages 1-2). MDX files with YAML frontmatter containing metadata (title_hi/en, stage, module, sort_order, prerequisites) and structured exercise data (MCQ, drag-match).
2. **`readings`** — Curated Sanskrit texts (Stage 3). Each text has toggleable layers: Devanagari, IAST transliteration, padachheda (word splitting), word-by-word meanings, anvaya (prose order), full translation.
3. **`advanced`** — Reference materials (Stage 4). Maheshwara Sutras, Pratyahara system, Ashtadhyayi intro.

### Hydration Strategy

Static Astro components (layouts, navigation, grammar tables, cards) use zero JavaScript. Interactive Preact islands use `client:visible` for exercises and text features (lazy hydration), `client:load` only for controls needed immediately (language switcher, dark mode toggle, library filters).

### Bilingual System

Sanskrit content always renders in Devanagari regardless of UI language. IAST transliteration is a separate per-page toggle. UI strings come from JSON files (hi.json, en.json). Each locale gets separate pre-built HTML via Astro i18n routing.

### 4-Stage Learning Path

- **Stage 1 (Foundation):** Alphabet, sandhi, noun declensions, verb conjugations, cases, sentence construction
- **Stage 2 (Intermediate):** Advanced sandhi, compound words (samasa), verbal derivatives
- **Stage 3 (Reading Practice):** Subhashitas → Hitopadesha → Panchatantra → Bhagavad Gita → Stotras
- **Stage 4 (Advanced):** Maheshwara Sutras, Pratyahara, Ashtadhyayi introduction

## Design Considerations

- **Mobile-first:** Primary audience is on phones in India. All touch targets minimum 44x44px. Grammar tables horizontally scroll on mobile.
- **Devanagari typography:** Use 1.25-1.5rem for examples, line-height 1.8-2.0 (conjuncts need vertical space). Must be crisp and highly readable.
- **Color palette:** Light mode uses warm cream (#FFFBEB) with saffron/amber accents (#D97706, #F59E0B). Dark mode uses deep charcoal (#1C1917).
