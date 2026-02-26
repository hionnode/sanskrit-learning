#!/usr/bin/env node
/**
 * split-lessons.mjs
 *
 * Splits the _djvu.txt files from Satavalekar's "संस्कृत स्वयं शिक्षक" into
 * per-lesson chunks. Handles OCR-garbled numbers and Hindi ordinal lesson headers.
 *
 * Usage:  node scripts/content-pipeline/split-lessons.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const RAW_DIR = join(ROOT, "content-source", "raw");
const CHUNKS_DIR = join(ROOT, "content-source", "chunks");
const META_DIR = join(ROOT, "content-source", "metadata");

// ---------------------------------------------------------------------------
// Hindi ordinals used in Part 2 headers (पाठ पहला, पाठ दूसरा, ...)
// ---------------------------------------------------------------------------
const HINDI_ORDINALS = [
  "पहला",
  "दूसरा",
  "तीसरा",
  "चौथा",
  "पांचवां",
  "पाँचवां",
  "छठा",
  "सातवां",
  "आठवां",
  "नवां",
  "दसवां",
  "ग्यारहवां",
  "बारहवां",
  "तेरहवाँ",
  "तेरहवां",
  "चौदहवां",
  "पन्द्रहवां",
  "पंद्रहवां",
  "सोलहवां",
  "सत्रहवां",
  "अठारहवां",
  "उनन्‍नीसवां",
  "उन्नीसवां",
  "बीसवां",
  "इक्कीसवां",
  "बाईसवां",
  "तेईसवां",
  "चौबीसवां",
  "पच्चौसवां",
  "पच्चीसवां",
  "छब्बीसवां",
  "सत्ताईसवां",
  "अट्डाईसवां",
  "अट्ठाईसवां",
  "उनतीसवां",
  "तीसवां",
  "इकतीसवां",
  "बत्तीसवां",
  "तेंतीसवां",
  "चौंतीसवां",
  "पेंतीसवां",
  "छत्तीसवां",
  "सेंतीसवां",
  "अड़तीसवां",
  "उन्तालीसवां",
  "चालीसवां",
  "इकतालीसवां",
  "बयालीसवां",
  "तैंतालीसवां",
  "चौवालीसवां",
  "पेंतालीसवां",
  "छयालीसवां",
  "सैंतालीसवां",
  "अड्भतालीसवां",
  "अड़तालीसवां",
  "उनचासवां",
  "पच्तासवां",
  "पचासवां",
  "इक्‍्यावनवां",
  "इक्यावनवां",
  "बावनवां",
  "तरेपनवां",
  "तिरेपनवां",
  "चौवनवां",
  "पचपनवां",
  "छप्पनवां",
  "सत्तावनवां",
  "अट्टावनवां",
  "उनसठवा",
  "उनसठवां",
  "साठवां",
];

// Build ordinal regex (match any of them, possibly with trailing punctuation/spaces)
const ordinalPattern = HINDI_ORDINALS.map((o) => o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");

/**
 * Detect if a line is a lesson header.
 * Returns { isHeader: true, rawLabel: string } or { isHeader: false }.
 */
function detectHeader(line) {
  const trimmed = line.trim();

  // Skip empty or very long lines (headers are short, ≤ 40 chars typically)
  if (!trimmed || trimmed.length > 50) return { isHeader: false };

  // Pattern 1: "() प्रथम पाठ" or "(१) प्रथम पाठ" — the very first lesson in Part 1
  if (/प्रथम\s+पाठ/.test(trimmed) && trimmed.length < 30) {
    return { isHeader: true, rawLabel: trimmed };
  }

  // Pattern 2: Line starts with "पाठ " followed by content
  const match = trimmed.match(/^पाठ\s+(.+)$/);
  if (!match) return { isHeader: false };

  const afterPaath = match[1].trim();

  // Exclude false positives: lines where what follows पाठ is a sentence
  // (contains common Hindi postpositions or verb forms)
  if (/\s+(में|को|का|के|से|है|हैं|और|तथा|पर|कि|जो|यह|वह|इस|उस)[\s।]/.test(" " + afterPaath + " ")) {
    return { isHeader: false };
  }

  // Pattern 2a: Hindi ordinals (Part 2 style)
  const ordRe = new RegExp(`^(${ordinalPattern})\\s*[-–.।]*\\s*$`);
  // More relaxed: ordinal possibly followed by some OCR noise
  const ordReRelaxed = new RegExp(`^(${ordinalPattern})`);
  if (ordRe.test(afterPaath)) {
    return { isHeader: true, rawLabel: trimmed };
  }
  // Relaxed match: ordinal at start, line still short
  if (ordReRelaxed.test(afterPaath) && trimmed.length < 35) {
    return { isHeader: true, rawLabel: trimmed };
  }

  // Pattern 2b: Number-like string (digits, OCR artifacts like |, ], $, व, ०-९)
  // Lesson headers are short: "पाठ 2", "पाठ 35", "पाठ 80", "पाठ |", "पाठ ]2"
  if (/^[0-9|$\][\)व०-९\s]{1,6}$/.test(afterPaath)) {
    return { isHeader: true, rawLabel: trimmed };
  }

  return { isHeader: false };
}

/**
 * Split a text file into lessons by पाठ markers.
 * Returns { preamble: string, lessons: [{ number, headerLine, lineStart, text }] }
 */
function splitByPaath(text, partLabel) {
  const lines = text.split("\n");
  const boundaries = []; // { lineIndex, rawLabel }

  for (let i = 0; i < lines.length; i++) {
    const result = detectHeader(lines[i]);
    if (result.isHeader) {
      // Skip if the previous boundary was within 5 lines (likely a page-top repeat)
      const prev = boundaries[boundaries.length - 1];
      if (prev && i - prev.lineIndex < 5) {
        // Keep the later one (more likely to be the actual header before content)
        boundaries[boundaries.length - 1] = { lineIndex: i, rawLabel: result.rawLabel };
      } else {
        boundaries.push({ lineIndex: i, rawLabel: result.rawLabel });
      }
    }
  }

  console.log(`  [${partLabel}] Found ${boundaries.length} lesson boundaries`);

  if (boundaries.length === 0) {
    return { preamble: text, lessons: [] };
  }

  // Preamble: everything before the first boundary
  const preambleLines = lines.slice(0, boundaries[0].lineIndex);
  const preamble = preambleLines.join("\n").trim();

  // Lessons: from each boundary to the next
  const lessons = [];
  for (let i = 0; i < boundaries.length; i++) {
    const start = boundaries[i].lineIndex;
    const end = i + 1 < boundaries.length ? boundaries[i + 1].lineIndex : lines.length;
    const lessonText = lines.slice(start, end).join("\n").trim();
    const lineCount = end - start;

    lessons.push({
      number: i + 1,
      headerLine: boundaries[i].rawLabel,
      lineStart: start + 1, // 1-indexed
      lineCount,
      text: lessonText,
    });
  }

  return { preamble, lessons };
}

/**
 * Write chunks to disk.
 */
function writeChunks(partName, preamble, lessons) {
  const dir = join(CHUNKS_DIR, partName);
  mkdirSync(dir, { recursive: true });

  // Preamble
  const preamblePath = join(dir, "preamble.txt");
  writeFileSync(preamblePath, preamble, "utf-8");
  console.log(`  Written: ${partName}/preamble.txt (${preamble.split("\n").length} lines)`);

  // Lessons
  for (const lesson of lessons) {
    const filename = `paath-${String(lesson.number).padStart(2, "0")}.txt`;
    writeFileSync(join(dir, filename), lesson.text, "utf-8");
  }
  console.log(`  Written: ${lessons.length} lesson files to ${partName}/`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  console.log("=== Splitting lessons from _djvu.txt files ===\n");

  const inventory = { generatedAt: new Date().toISOString(), parts: {} };

  for (const [partName, filename] of [
    ["part1", "part1_djvu.txt"],
    ["part2", "part2_djvu.txt"],
  ]) {
    const filepath = join(RAW_DIR, filename);
    if (!existsSync(filepath)) {
      console.error(`  [ERROR] ${filename} not found. Run pipeline:download first.`);
      process.exit(1);
    }

    console.log(`Processing ${filename}...`);
    const text = readFileSync(filepath, "utf-8");
    console.log(`  Total lines: ${text.split("\n").length}`);

    const { preamble, lessons } = splitByPaath(text, partName);
    writeChunks(partName, preamble, lessons);

    // Inventory entry
    inventory.parts[partName] = {
      sourceFile: filename,
      totalLessons: lessons.length,
      lessons: lessons.map((l) => ({
        file: `paath-${String(l.number).padStart(2, "0")}.txt`,
        lessonNumber: l.number,
        headerLine: l.headerLine,
        sourceLineStart: l.lineStart,
        lineCount: l.lineCount,
      })),
    };

    console.log("");
  }

  // Write inventory
  mkdirSync(META_DIR, { recursive: true });
  const inventoryPath = join(META_DIR, "lesson-inventory.json");
  writeFileSync(inventoryPath, JSON.stringify(inventory, null, 2), "utf-8");
  console.log(`Written: metadata/lesson-inventory.json`);
  console.log(`\nDone! Part 1: ${inventory.parts.part1.totalLessons} lessons, Part 2: ${inventory.parts.part2.totalLessons} lessons`);
}

main();
