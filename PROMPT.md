# Motion Explainer — make "24 names" explainer videos for your field

This file is a prompt for a coding AI (Claude Code, Codex, Cursor, and so on). It takes you from "my field" to a finished set:
three looping videos with 8 animated cards each, one cheat-sheet image, and a post text.

## How to use (for you, the human)

1. Open this repository with your coding AI.
2. Paste this, written in your own language, with your own field:

```
Read PROMPT.md and follow it.
Field: <your field, e.g. "coffee brewing", "stage lighting", "UI components">
Who it is for: <e.g. "people who ask AI image models for product photos">
```

The set is made in the language you write in. A version in English or another language is optional: the AI asks once at the end.

3. The AI stops twice for your OK: when the list of 24 names is ready, and when the look is decided. Your knowledge of the field matters most at the first stop. Fix names, swap them, argue with it.

You need Node.js 18+, ffmpeg, and `npm install && npx playwright install chromium` once. The cheat-sheet image needs an image-generation AI that can draw text.

---

## Instructions for the AI

You are making a "24 names" set for the field given by the user: 24 names that people in that field really use, each with a small looping animation that makes the name obvious, split into 3 videos of 8 cards, plus a one-page cheat sheet. The point of the set is a shared vocabulary: someone who knows the name can ask for exactly that thing, from an AI, a colleague or a search box. Vague requests ("make it look nice") get vague results; names get specific ones.

Work through the stages in order. **Stop where it says STOP** and wait for the user. Do not skip a stop because you feel confident.

Before you start, read: `README.md`, `render.mjs`, `check.mjs`, `template/index.html`, and both `examples/*/NAMES.md`. Skim one example HTML (`examples/camera-moves/en/index.html`) to see how a finished card is drawn. **The default look is `examples/camera-moves`** (see Stage 2): you match it by looking at the example itself, not by a description.

**Language.** Make the set in the language the user writes to you in, which is usually their native language: names, group titles, descriptions, cheat sheet and post text. Only if you cannot tell (for example, the English request above was pasted unchanged), ask once before Stage 1 which language to make it in. Do not make an English version unless the user asks for it.

If the user did not give the field or the audience, ask before Stage 1. If the request only says where the set will be used (for example "for my course" or "for X"), that is not the audience: ask who will watch it, and do not guess. Everything you put on screen is in the set's language, plus the second line.

### Stage 1 — Choose the 24 names (STOP at the end)

This is the most important stage. A beautiful video with wrong or made-up names is worse than none.

**1-1. Decide what the audience wants to ask for.** Write two sentences: who will watch, and what they will do with the names (type them into an AI prompt, use them in a brief, search for them). If the field mixes "how it is done" and "what the result looks like", lean to the side the audience will actually ask for. Example: for video captions, people wanted the names of text styles (outline, glow, drop shadow) more than the names of entrance animations.

**1-2. Collect 40 to 60 candidates from real sources.** Use the web if you can. Good sources: standards and official documentation, textbooks and course material, glossaries published by professional bodies or well-known schools, manufacturer and tool documentation, and how practitioners name things in their own articles and videos. Write down at least one source per candidate. If you cannot browse the web, say so, mark every source as "from memory, not checked", and ask the user to check those names. **Do not invent names, and do not make up a translation.** If a thing has no established name, leave it out. Use the names practitioners really use in the set's language; find them there, do not translate them from English. If practitioners in that language use the English term, use the English term.

**1-3. Filter with these tests.** A name stays only if it passes all of them.

1. **Real and current.** Practitioners use it today, and you found it in at least one source (two is better).
2. **The name alone decides the result.** If two people, or two AIs, got only this name, would they do the same thing and get a similar result? Drop names that mean nothing without an extra number or setting (example: "long shot" needed a distance before it described a picture, so it was dropped). Extra settings belong in the cheat sheet's bottom line ("add timing, speed and direction").
3. **It can be shown.** You can make a 2 to 4 second loop where a viewer can tell which name it is with the label hidden. If motion alone cannot show it, you need a plan (see Stage 2). If no plan works, drop it.
4. **It is distinct.** No two cards would look the same. If two names are close and both are important, keep both and plan to put them side by side and make the difference visible. Otherwise drop one.
5. **It is wanted.** The audience would save it. Prefer names they half-know or keep needing over trivia.
6. **One meaning.** If the name means different things in different tools, regions or schools, choose one meaning, write the description so it pins that meaning, and make the animation match the stricter meaning. Examples: "range slider" usually means a slider with two handles that picks a range, so a one-handle demo was wrong; "stepper" means a +/− control in one design system and a step indicator in another, so the description had to say "+/− buttons".
7. **Safe in every language it will be seen in.** Check each name in English and in the set's language, and think about viewers from other countries. Avoid expressions that only make sense in one country (a Japanese name for centered composition that refers to the national flag was replaced by "centered composition"), and avoid names with slang or offensive meanings in another language (the English "back shot" was replaced by "shot from behind"). A name that contains a place is fine when it is the standard name everywhere (for example a brewing method named after a country). The same goes for numbers shown on screen: use units your viewers read (mm and in, °C and °F, g and oz), or show both.

If fewer than 24 names pass, say so. Ask the user whether to widen the topic or make a shorter set (16 names in 2 videos). Do not fill the gaps with weak names.

**1-4. Group and order.** Make 3 groups of 8. Each group gets a short title (about 2 to 5 words). Group by what the viewer is trying to do, or by where it is used (for caption styles: bright/variety, calm/explainer, cinematic/horror worked well). Inside each group, go from basic to advanced. Put the most widely recognized names at the start of video 1: the first card is what people see first.

**1-5. Write the second line and the description.** The video shows only the number, the name and the second line. **In a set that is not in English, the second line must be the English name, on every card.** That way anyone in the world can watch a set made in any language and still know what to type into an AI. Use the name English-speaking practitioners in the field really use (one you could paste into an AI prompt as it is), found in English sources; do not translate the local name into a made-up English phrase. If you cannot find an established English name, say so in the list and ask the user. In a set with English labels, the second line can be the short description itself (`examples/camera-moves/en` does this). The description appears on the cheat sheet: one short line per name saying what you see or get, in plain words. About 40 characters in English, about 20 in Japanese or Chinese. No history, no "used to", no praise.

**1-6. Show the user and STOP.** Show:

- A table: `# | name | second line (the English name, for a non-English set) | description | what the card will show (one sentence) | source(s) | confidence (high/medium/low)`
- The group titles, a series title, and a bottom line for the cheat sheet in the form "Add A, B and C to the name for better results: example / example / example", where A, B, C are the settings people usually have to add in this field.
- **Dropped candidates** with one reason each (which test they failed). Experts often want one of these back.
- **Names you are unsure about**, and what you would need to check.
- Two or three questions for the user, for example "Is X used in your region, or do people say Y?"

Ask the user to correct the list. Revise and show it again until they say OK.

### Stage 2 — Decide how to show them (STOP at the end)

**Fixed format** (this is what made the series readable on a phone; keep it):

- 3 videos, one page each. One page = 8 cards in 2 columns x 4 rows. (One 30-second video that slid through the three pages did worse than three short videos posted together.)
- 1200x1350 pixels, 30 fps, 9.4 seconds per video, no sound, seamless loop.
- Each card plays a 4.7-second cycle twice per video.
- Under each card: number + name (about 36px, bold), second line below (about 22px). Heading at the top left: series title, page number (1/3), group title. Page dots at the bottom so viewers know there are three videos.

**The look.** Look at the example videos and `index.html` files in `examples/` and make yours in the same style. If the user says nothing about the look, match `examples/camera-moves`; if they say "colorful", match `examples/motion-graphics`. If they ask for anything else about the look, change only what they asked for.

**Tips for showing the names** (they come from fixing real versions of this series):

- **Show the real thing, not a diagram.** A simple drawing is fine, but it should show the actual object or scene from the field (a cup, a chart, a room, a product, a stage), not abstract dots and arrows explaining it. A dull, diagram-like card is a failed card even if it is correct.
- **Look-alike pairs share the same scene, side by side,** so the only thing that changes is the difference itself.
- **If motion alone cannot explain it, change the way you show it.** Options that worked: a two-stage card (a big clean sample for about 3 seconds, then a small scene of it in real use for about 6 seconds, with a tiny "sample / in use" tag); a second track (for audio that starts before the picture, a small video bar and audio bar); a side-by-side comparison (constant speed vs eased); a small readout (24mm → 87mm). Do not rely on small readouts alone: text below about 20px cannot be read on a phone.
- **If the result is not visual** (a taste, a sound, a smell, a feeling in the hand), show the cause clearly and give the effect one big visual sign: a meter that moves (sour ← → bitter), a waveform, a short word in large type. Keep it to one sign per card.
- **Hold, move, hold.** Each cycle: show the start state for about 0.5 seconds, do the thing, hold the result long enough to read it, then return to the start before the cycle ends. For actions that cannot run backwards in real life (cutting, pouring, baking), do not play them in reverse: cross-fade from the result back to the start state at the end of the cycle.
- **Stagger the cards.** Start the eight cycles at slightly different times so the key moments do not all happen at once.

For each of the 24 cards write one line: subject, start state, what happens, end state, and how it differs from the closest other card.

Then make one still: build page 1 with two or three cards drawn in the chosen look and show a frame (`node render.mjs <file> --page 1 --sheet`, or a screenshot of `?t=2`).

**Show the user the look and the card plan, and STOP.** Revise until they say OK.

### Stage 3 — Build and render

1. Copy `template/index.html` to a new folder, for example `my-names/<topic>/<lang>/index.html`. Fill `SERIES`, `PAGES`, `ITEMS`, the colors and the font. Write one drawing function per card in `CELLS[0..23]`. Change the frame if the look needs it, but keep the fixed format above.
2. Technical rules:
   - Every frame is a pure function of the frame number. No `Date`, no `performance.now`, no CSS animation, no `Math.random` without a fixed seed. Keep the render contract: `window.N_FRAMES`, `window.renderFrame(i)`, `window.READY`, `?page=N`, `?render=1`.
   - Whatever a card draws at the end of its cycle must match the start, so the video loops without a jump. Anything that repeats on its own (a blinking light, a spinner) completes a whole number of repeats in 9.4 seconds.
   - **No flashing:** no part of the screen switches between light and dark three or more times per second. Cuts and glitches can be shown with position and color shifts instead of brightness flips.
   - Load nothing from the network. Use fonts installed on the machine, check that they really render (missing glyphs show as boxes or a fallback font), and tell the user which fonts you used. Do not add font files unless their license allows redistribution.
   - Text must fit: the heading stays on one line (shorten the group title if needed), and a name stays on one line inside its card. If one is too long, first look for a shorter accepted name, then shrink.
   - Use only made-up, neutral text inside the scenes (no real people, companies or logos).
3. Render all three pages with a contact sheet:

```
node render.mjs my-names/<topic>/<lang>/index.html --all --sheet --cards
```

This writes, for each page, the mp4, one contact sheet of the whole page (`-sheet.png`, a still every 0.5 seconds), and one image per card (`-card01.png` to `-card08.png`: that card only, at full size, a still every 0.25 seconds over one 4.7-second cycle, time printed on each). If you change the layout, update `window.CARD_RECTS` so the card images are cut in the right place.

### Stage 4 — Review your own work (at least two rounds)

**Look at the card images one at a time** (24 images). Do not judge cards from the whole-page sheet: there a card shrinks to a thumbnail, and cards that fail (two cuts that look the same, a result you cannot read) still look fine. For **every card**, answer in writing:

1. Label hidden: could someone who knows the field tell which of the 24 names this is?
2. Is it dull or diagram-like? Would a professional in the field use this shot in real work?
3. Could it be confused with its neighbor or another card?
4. Does the key moment show up in the stills, and is the result held long enough to read?
5. Text: cut off, overlapping, too small for a phone?
6. Does it still feel like the same series as the example (with the user's look changes, if any)? Does anything look eerie or scary?

Then use the whole-page sheets for what only they show: the order of the cards, whether neighbors are easy to tell apart, and whether the key moments of the eight cards happen at different times.

Then measure:

```
node check.mjs out/<topic>-<lang>-page1.mp4 out/<topic>-<lang>-page2.mp4 out/<topic>-<lang>-page3.mp4
```

- **format:** 1200x1350, 30 fps, h264, yuv420p, 9.4 s, 282 frames, no audio.
- **seam:** the difference between the last and the first frame (0-255) must be no bigger than the largest step between two neighboring frames inside the video. In the bundled examples it is 0.9 to 3.2. A value far above the normal steps means the loop jumps.
- **flashing:** the most flashes (pairs of light/dark changes of 10% or more) within any one second, per card and for the whole frame. It must be under 3. The bundled examples are all 0. Small moving edges barely change a card's average, so they do not count; a card that turns dark and light does.

Fix what fails, render again, and do the whole review again. Do at least two rounds. When you report, name the cards you still think are weak. Do not say "all good" if you have not looked.

### Stage 5 — Cheat-sheet image

Follow `prompts/cheatsheet-image.md`. The text on the image must be exactly the text in the videos. Image models misspell; check every cell at full size.

### Stage 6 — Independent review

You cannot review your own work fairly. Ask the user to run `prompts/review.md` in a **separate conversation** (or with a different AI) that did not make the set. Fix every required item it reports, then have it check again. If the same problem comes back three times, stop and ask the user. If the labels are not in the reviewer's native language, ask for a native-speaker check of the wording too.

### Stage 7 — Post text

Follow `prompts/post.md` to draft the post that goes with the four attachments (three videos and the cheat sheet). End the post with the hashtag #MotionExplainer, so people who make these sets can find each other.

### What to hand over

- `my-names/<topic>/<lang>/index.html` and the three mp4 files (`--all` writes them to `out/`)
- the cheat-sheet PNG (1200x1350)
- a `NAMES.md` like the ones in `examples/`: the 24 names with second line and description, the bottom line, and short notes on decisions (what you dropped and why, how you showed the hard ones)
- the post text
- a short report: what the reviewer said, what you fixed, what is still weak

### Last — Another language?

Ask once: "Do you also want an English version (or a version in another language)?" For an English set, ask about another language. If the user says yes, use `prompts/translate.md`. If not, you are done. Do not make one without being asked.
