# Prompt: the same set in another language

Use this with a coding AI to make a version of an existing set (one of the examples, or your own) in another language. The pictures and timing stay the same; only the words change.
Replace `<...>`. `<lang>` is a short code such as `es`, `zh`, `fr`.

```
Read README.md, PROMPT.md and <path to the source index.html> in this repository.

Goal: a <LANGUAGE> version of this set, with the same pictures and timing.

1. Copy <source folder>/index.html to <source topic folder>/<lang>/index.html.
2. Translate only the text that appears on screen: the series title, PAGES (group titles),
   ITEMS (names and second lines), and any small labels drawn inside cards (search the CELLS
   code for quoted strings). Do not translate tool readouts that people read as-is in every
   language (for example "REC", "24mm").
3. Do not change layout, colors, timing or drawing code.
4. For each name, use the term practitioners in <LANGUAGE> really use. Check each one with
   the web. Many fields keep the English term in other languages; then keep it in English.
   Do not invent a literal translation. Check that no name is local slang or rude in
   <LANGUAGE>. If <LANGUAGE> is not English, the second line under every
   name must be the English name practitioners really use (not a made-up translation).
5. Fonts: if <LANGUAGE> needs another script (CJK, Arabic, Thai, Devanagari ...), change the
   font constants to a font installed on this machine and make sure the glyphs render (no
   boxes). For a right-to-left language, tell me before changing the layout.
6. Text must fit: a name stays on one line inside its card. If one is too long, first look
   for a shorter accepted term; shrink the font only as a last resort, and then for all 24.
7. Render and check:
     node render.mjs <topic>/<lang>/index.html --all --sheet
   Look at all three contact sheets yourself: nothing cut off, nothing overlapping, no
   missing glyphs.
8. Report: a table (source language -> <LANGUAGE>) with the 24 names and descriptions, the
   ones you were unsure about and why, and the fonts you used.
```

Then make the cheat sheet with `prompts/cheatsheet-image.md`, and have the wording checked with `prompts/review.md` by a native speaker of the new language, or by a reviewer told to read it as one. In the English camera set, that check changed the title, the subtitle, the bottom line and five descriptions.
