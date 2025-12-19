#!/usr/bin/env python3
"""Identify drug entries that may lack detail based on text length."""

import json
from pathlib import Path
from statistics import mean, median
from typing import Any, List

DRUGS_DIR = Path(__file__).resolve().parent.parent / "static" / "drugs"


def gather_strings(value: Any, bucket: List[str]) -> None:
    """Collect all string content nested within JSON structures."""
    if isinstance(value, str):
        bucket.append(value.strip())
    elif isinstance(value, list):
        for item in value:
            gather_strings(item, bucket)
    elif isinstance(value, dict):
        for item in value.values():
            gather_strings(item, bucket)


def percentile(sorted_values: list[int], pct: float) -> int:
    """Return the integer percentile value from a sorted list."""
    if not sorted_values:
        return 0
    index = int((len(sorted_values) - 1) * pct)
    return sorted_values[index]


def main() -> None:
    lengths: list[tuple[int, str]] = []

    for path in sorted(DRUGS_DIR.glob("*.json")):
        with path.open(encoding="utf-8") as handle:
            content = json.load(handle)

        strings: list[str] = []
        gather_strings(content, strings)
        total_length = sum(len(text) for text in strings)
        lengths.append((total_length, path.name))

    counts = [value for value, _ in lengths]
    sorted_counts = sorted(counts)
    cutoff_25 = percentile(sorted_counts, 0.25)

    print(f"Analysed {len(lengths)} drug files in {DRUGS_DIR.relative_to(Path.cwd())}.")
    print(f"Mean character count: {mean(counts):.0f}")
    print(f"Median character count: {median(counts):.0f}")
    print(f"25th percentile cutoff: {cutoff_25}\n")

    print("Lowest 15 entries by total text length:")
    for total, name in sorted(lengths)[:15]:
        print(f"  {name:40} {total:6d}")

    print("\nEntries at or below the 25th percentile:")
    for total, name in sorted(lengths):
        if total <= cutoff_25:
            print(f"  {name:40} {total:6d}")


if __name__ == "__main__":
    main()
