#!/usr/bin/env bash
# Download Satavalekar's "संस्कृत स्वयं शिक्षक" Parts 1 & 2 from Archive.org
# All text-based formats for cross-referencing OCR output.
set -euo pipefail

DEST="content-source/raw"
mkdir -p "$DEST"

# --- Part 1 ---
# Archive.org item: 20211101_20211101_1057
# Filename on archive contains Devanagari, must be URL-encoded
PART1_BASE="https://archive.org/download/20211101_20211101_1057"
PART1_PREFIX="%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A5%83%E0%A4%A4%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%AF%E0%A4%82%20%E0%A4%B6%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%95"

declare -A PART1_FILES=(
  ["part1_djvu.txt"]="${PART1_BASE}/${PART1_PREFIX}_djvu.txt"
  ["part1_hocr.html"]="${PART1_BASE}/${PART1_PREFIX}_hocr.html"
  ["part1_chocr.html.gz"]="${PART1_BASE}/${PART1_PREFIX}_chocr.html.gz"
  ["part1_hocr_pageindex.json.gz"]="${PART1_BASE}/${PART1_PREFIX}_hocr_pageindex.json.gz"
  ["part1_hocr_searchtext.txt.gz"]="${PART1_BASE}/${PART1_PREFIX}_hocr_searchtext.txt.gz"
  ["part1_page_numbers.json"]="${PART1_BASE}/${PART1_PREFIX}_page_numbers.json"
  ["part1_djvu.xml"]="${PART1_BASE}/${PART1_PREFIX}_djvu.xml"
)

# --- Part 2 ---
# Archive.org item: in.ernet.dli.2015.545637
PART2_BASE="https://archive.org/download/in.ernet.dli.2015.545637"
PART2_PREFIX="2015.545637.Sanskrit-Swayam"

declare -A PART2_FILES=(
  ["part2_djvu.txt"]="${PART2_BASE}/${PART2_PREFIX}_djvu.txt"
  ["part2_hocr.html"]="${PART2_BASE}/${PART2_PREFIX}_hocr.html"
  ["part2_chocr.html.gz"]="${PART2_BASE}/${PART2_PREFIX}_chocr.html.gz"
  ["part2_hocr_pageindex.json.gz"]="${PART2_BASE}/${PART2_PREFIX}_hocr_pageindex.json.gz"
  ["part2_hocr_searchtext.txt.gz"]="${PART2_BASE}/${PART2_PREFIX}_hocr_searchtext.txt.gz"
  ["part2_page_numbers.json"]="${PART2_BASE}/${PART2_PREFIX}_page_numbers.json"
  ["part2_djvu.xml"]="${PART2_BASE}/${PART2_PREFIX}_djvu.xml"
)

download_file() {
  local dest_name="$1"
  local url="$2"
  local dest_path="${DEST}/${dest_name}"

  if [[ -f "$dest_path" ]]; then
    echo "  [skip] ${dest_name} already exists ($(du -h "$dest_path" | cut -f1))"
    return 0
  fi

  echo "  [downloading] ${dest_name} ..."
  if curl -fSL --retry 3 --retry-delay 5 -o "$dest_path" "$url"; then
    echo "  [done] ${dest_name} ($(du -h "$dest_path" | cut -f1))"
  else
    echo "  [FAILED] ${dest_name} — curl exit code $?"
    rm -f "$dest_path"
    return 1
  fi
}

echo "=== Downloading Part 1 (संस्कृत स्वयं शिक्षक - भाग १) ==="
echo ""
FAILED=0
for name in $(echo "${!PART1_FILES[@]}" | tr ' ' '\n' | sort); do
  download_file "$name" "${PART1_FILES[$name]}" || FAILED=$((FAILED + 1))
done

echo ""
echo "=== Downloading Part 2 (संस्कृत स्वयं शिक्षक - भाग २) ==="
echo ""
for name in $(echo "${!PART2_FILES[@]}" | tr ' ' '\n' | sort); do
  download_file "$name" "${PART2_FILES[$name]}" || FAILED=$((FAILED + 1))
done

echo ""
echo "=== Download Summary ==="
echo ""
echo "Files in ${DEST}/:"
ls -lhS "$DEST"/ 2>/dev/null | grep -v '^total' | grep -v 'README' || true
echo ""

if [[ $FAILED -gt 0 ]]; then
  echo "WARNING: ${FAILED} file(s) failed to download."
  exit 1
else
  echo "All files downloaded successfully."
fi
