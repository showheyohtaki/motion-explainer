# Prompt: independent review

Run this in a **separate conversation**, or with a different AI, that did not make the set. A maker reviewing its own work misses the same things it missed while making it.
Give it access to the files (or attach them). Fill the parts in `<...>`.

```
You are an independent reviewer. You did not make these files. Judge whether this set is
ready to post, and answer PASS, REVISE or HOLD. Do not edit the files.

## What it is
A "24 names" set for <FIELD>, for <AUDIENCE>, labels in <LANGUAGE>.
Three videos (9.4 s each, 8 animated cards per video, 1200x1350) and one cheat-sheet image.
- Videos: <paths>
- Cheat sheet: <path>
- Source HTML: <path> (the names are in ITEMS)
- The 24 names with descriptions: <path to NAMES.md, or paste the table>
- Post text:
---
<post text>
---

## Check, in this order
1. Terms. Is each name, second line and description correct and in current use in the field?
   Check with the web, using primary or well-known sources (standards, official docs,
   textbooks, recognized glossaries). Look hard at names with two meanings in different tools
   or regions, at names that only work in one country, and at names that are slang or rude in
   another language. In a set that is not in English, every card must show an English name
   under the local name: check that each one is the term English-speaking practitioners really
   use (not a made-up translation). Give a source for every problem you report.
2. Name vs card. Does each animation show what the name means? Pick the end state and the
   key moment of each card and say whether it matches. Can look-alike pairs be told apart?
   With the label hidden, which cards would you not recognize?
3. Cheat sheet. Zoom in and read every row. Typos, broken characters, missing rows, numbers
   out of order. Is every name and second line identical to the video labels? Do the icons
   match the names (especially mirrored pairs)?
4. Video. Make stills every 0.5 s with ffmpeg (in a temporary folder; delete it afterwards).
   Text cut off or overlapping? Readable on a phone (the video shows at about a third of its
   size)? Loop seam: compare the last and first frames. Flashing: measure the mean brightness
   of each card area per frame; three or more light/dark reversals within one second is a fail
   (small moving edges do not count; a large area changing does).
5. Look. Glance at one still next to the example it is based on (by default
   examples/camera-moves, plus any look changes the user asked for). Does it feel like the same
   series? Is the subject easy to find? Does anything look eerie or scary (unless the names are
   for horror)? Any card that looks
   like a dull diagram rather than real work?
6. Post text. Overclaiming ("always", "perfect", guarantees), stiff or machine-like wording,
   and any number or achievement without a source (that is a HOLD).

## How to answer (15 lines or fewer)
First line: PASS, REVISE or HOLD.
Then the items to fix, most important first: which file, where, and how to fix it (suggest the
new wording). Mark each item "required" or "optional". Say what you could not check.
```

## How the maker uses the answer

- **REVISE:** fix every required item, then ask the same reviewer to check again. Optional items are the maker's call.
- **HOLD:** a number or claim has no source. Find a source, or remove it, or say it without a number. Do not hedge it ("I feel like ...").
- After three rounds on the same problem, stop and ask the person who owns the set.
- If the labels are in a language the reviewer does not speak natively, also ask a native speaker (or a reviewer prompted to act as one) whether the title, group titles and descriptions sound natural.
