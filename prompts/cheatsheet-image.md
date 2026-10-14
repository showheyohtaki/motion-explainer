# Prompt: the one-page cheat-sheet image

The cheat sheet is the fourth attachment: one image that lists all 24 names in the same order as the videos, so people can save it.
Use an image-generation AI that can draw text. Fill the parts in `<...>`.

You can attach a reference image for the layout: `examples/camera-moves/en/cheatsheet.png` (line icons) or `examples/motion-graphics/ja/cheatsheet.png` (color thumbnails).

## The request

```
Create a cheat-sheet image in <LANGUAGE>.
<If a reference image is attached: keep its layout and spacing, but use only the text below.
Do not copy any text from the reference.>

## Output
- Aspect ratio 8:9 (for example 1024x1152). Compose for 8:9 from the start, so nothing needs
  cropping or padding afterwards.
- Make 3 variants. Vary spacing, text size and icon drawing slightly between them. The text is
  the same in all three.

## Layout
- Top: big bold title "<TITLE>"; below it a gray subtitle "<SUBTITLE>"
- White or very light gray background. One rounded box (thin light-gray border) per group.
  Group headings in the accent color.
- Each row, as a table with aligned columns:
  icon -> number (accent color) -> bold name -> <second line, gray> -> gray one-line description
  (in a set that is not in English, the second line is the English name, on every row)
- Bottom: one line in a light-gray band.
- <Colors: e.g. one blue accent + black + gray only. No emoji, photos or gradients.>
- 24 rows must fit in 8:9. Spacing can be a bit tight, but the text must stay crisp.

## Text (use EXACTLY as written, character for character. Do not rephrase, shorten or add.
## "|" separates columns and must not be drawn.)
Title: <TITLE>
Subtitle: <SUBTITLE, e.g. "Numbers match the videos — use the name in your prompt">
Group heading 1: <Video 1/3   GROUP TITLE   01–08>
01 | <name> | <second line> | <description>
...
08 | ...
Group heading 2: <Video 2/3   GROUP TITLE   09–16>
09 | ...
...
Group heading 3: <Video 3/3   GROUP TITLE   17–24>
17 | ...
...
24 | ...
Bottom line: <Add A, B and C for better results: "example" / "example" / "example">

## Icons
<Option A or B from below, with one hint per row.>
```

### Icons, option A: simple line icons

One accent color, thin lines, a small rounded square per row. **Give one hint per row**, or the model draws the same icon for different rows:

```
Icons (line art in the accent color, small and simple):
01 <name> = <what to draw, e.g. "horizontal double arrow + camera">
02 <name> = <...>
...
For pairs that mirror each other, say which way: e.g. "audio bar BEFORE the video bar (audio leads)".
```

### Icons, option B: small color thumbnails of each card

Better when your cards use color. Render a contact sheet with one still per card at its key moment (for example, take one frame per card from `--sheet` and put them in a numbered grid), attach it, and write:

```
The left column is a small thumbnail of each card in the video, not a line icon.
Attached cards.png shows each card at its key moment, numbered 01 to 24.
- Same position and size for all 24 thumbnails (small rounded rectangles, left edges aligned).
- Use only these colors: <palette with hex codes>. Flat fills. No gradients, photos or emoji.
- Simplify a lot: draw the main shape big and bold. No small text inside a thumbnail
  (at most the 1 to 3 characters listed below).
01 <what to draw, from card 01>
...
24 <...>
```

## After it is made: check every cell

Image models still misspell, swap characters and drop rows. In real use they turned 隅 into 隣, 額縁 into 額線, and an English quote mark style into another.

1. Pick the best variant. Zoom in to full size and read every row, group heading, title, subtitle and the bottom line against your list. Check that numbers run 01 to 24 with no gaps or repeats.
2. Check that every icon matches its name, especially pairs that mirror each other (start/end, before/after, left/right).
3. If something is broken, ask for a fix that names the broken rows only ("Keep everything else exactly the same. In row 08, the description must read ..."). Regenerating the whole image tends to break other rows.
4. If the same row stays broken after a few tries, you have two choices: keep the best variant and list what is still wrong for the user, or draw the sheet yourself as HTML (same text, same layout) and screenshot it. Tell the user which you did.
5. Scale the final image to 1200x1350 so it matches the videos in a post (many models output a size close to 8:9, such as 1182x1330).
6. Save the request text next to the image, so it can be made again.
