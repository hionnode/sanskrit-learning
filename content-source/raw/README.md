# Source Material — संस्कृत स्वयं शिक्षक

## Author

**श्रीपाद दामोदर सातवलेकर** (Shripad Damodar Satavalekar)
Vedic scholar, author of commentaries on all four Vedas and numerous Sanskrit texts.

## Source

Both books were downloaded from [Archive.org](https://archive.org/) (text-based OCR formats only).

### Part 1 — संस्कृत स्वयं शिक्षक (भाग १)

- **Archive.org item:** [20211101_20211101_1057](https://archive.org/details/20211101_20211101_1057)
- **Contains:** 50 introductory lessons + appendix material (alphabet, sandhi, basic grammar, conversation)
- **Note:** This scan appears to contain both Part 1 and Part 2 of the book in a single file

### Part 2 — Sanskrit Swayam Shikshak (भाग २)

- **Archive.org item:** [in.ernet.dli.2015.545637](https://archive.org/details/in.ernet.dli.2015.545637)
- **Contains:** 59 intermediate/advanced lessons (declensions, conjugations, compounds, readings)
- **Source:** Digital Library of India (DLI) collection

## License

**Public domain.** The author passed away in 1968. Under Indian copyright law, works enter the public domain 60 years after the author's death (i.e., since 2028, but Archive.org/DLI have made these available as public domain).

## Downloaded Formats

| File | Format | Purpose |
|------|--------|---------|
| `*_djvu.txt` | Plain text (DjVu OCR) | Primary text for splitting into lessons |
| `*_hocr.html` | HOCR HTML | OCR with bounding boxes — useful for table reconstruction |
| `*_chocr.html.gz` | Compressed HOCR | Alternative HOCR format |
| `*_hocr_pageindex.json.gz` | HOCR page index | Maps byte offsets to pages in HOCR |
| `*_hocr_searchtext.txt.gz` | Search text | Cleaned OCR text (may be better quality) |
| `*_page_numbers.json` | Page numbers | Page number mapping from OCR |
| `*_djvu.xml` | DjVu XML | Full structural markup from DjVu |

## Download Date

2026-02-26

## Reproduction

```bash
npm run pipeline:download    # Download all 14 files
npm run pipeline:split       # Split into per-lesson chunks
```
