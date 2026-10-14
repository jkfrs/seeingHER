# seeingHER — Product and MVP Specification

## Product intent

Create a warm, quietly hopeful personal showcase for Jinyuan He's cancer patient advocacy work. The site should feel like a contemporary museum: editorial typography, a dark charcoal opening, warm off-white gallery surfaces, framed artwork, and a restrained vermilion accent. The supplied museum website screenshot is the visual reference for its dark/light contrast, dense exhibit cards, and bold collection color block.

The site is a video-demo-ready front-end MVP built with plain HTML, CSS, and JavaScript. It avoids a build step and keeps editable content in `data.js`.

## Audience and tone

- Children with cancer, their caregivers, families, and visitors learning about caregiving.
- Use English throughout the interface, with the book edition labeled “Chinese” in English.
- Keep language respectful, plain, and hopeful. The supplied personal and medical details are shown as provided and should be reviewed by the site owner before public launch.

## Page structure

The fixed navigation has five hash-routed pages: Home, Documentary, Art Works, Published Artbook, and Published Stories. Details are in [page-structure.md](page-structure.md).

## Requirements

### Shared shell

- Fixed charcoal header with five page links and a compact mobile menu.
- Responsive layout, keyboard-accessible buttons and dialog, descriptive image alt text, reduced-motion support, and a shared footer: “Made with love for every child and every caregiver.”
- Smooth page, card, and exhibit transitions. Serif display type and sans-serif interface/body type.
- Keep visible website copy in English.

### Home

#### Home visual refinements — October 6, 2026

- Set the hero heading to “seeing HER”; emphasize “HER” with the accent color and a striking italic display serif.
- Add the subheading “Caregivers: An Overlooked Population Affected by Cancer”. Give “Caregivers”, “Overlooked”, and “Cancer” distinct type treatments while keeping the remaining words in the regular subheading style.
- Place Jinyuan He's supplied introduction in its own quiet, spacious block between the hero heading area and the caregiver definition card. Preserve its wording exactly.
- Preserve the caregiver definition wording and emphasize “unpaid individual”, “care”, “assistance”, and “supervision” with a larger accent-colored display style.
- Preserve the existing table of contents and all other Home content.

- Hero introduction with the supplied biography.
- Caregiver definition card with the supplied definition.
- Four large cards linking to the other pages, each with a title and one-line description.

#### Home and page content updates — October 7, 2026

- Place `assets/mainpage.png` beside the Home title on desktop and stacked with it on mobile; provide descriptive alt text and explicit dimensions.
- Place `assets/jinyuan.png` beside Jinyuan's unchanged introduction on desktop and above it on mobile, with the alt text “Portrait of Jinyuan He”. Keep the introduction in its own block.
- Change the Home collection heading to “Four ways to see HER.” and style HER to match the main “seeing HER” heading.
- Rename the visible “Picture Book” labels to “Published Artbook” and “Other Works” labels to “Published Stories” in the navigation, Home cards, and page headings. Keep the existing section IDs and anchors.
- Keep the nine approved Published Stories article records and their links in `data.js`. The ninth story has an empty URL until supplied and displays “Link coming soon” as a non-clickable card.
- Use `assets/books/english.pdf` and `assets/books/chinese.pdf` for downloads. Render the converted page images from `assets/books/english/` and `assets/books/chinese/`; each source PDF page is landscape and represents a spread. Show the cover as one page, spreads on desktop, and one half-page at a time on mobile. Keep page image paths in `data.js`.

### Documentary

- Large responsive video player, title, description, and director credit.
- `documentary.video` and `documentary.poster` in `data.js` hold the media paths. The player uses native controls, metadata preload, inline mobile playback, and a poster.
- The documentary intro, heading, credit, and six policy points are editable in `data.js`.

#### Home and Documentary updates — October 14, 2026

- Rename the visible brand to “seeingHER” and update the document title to “seeingHER — Jinyuan He”. Keep the brand link pointed at `#home` and share the hero heading's display treatment.
- Remove the CSS arch, border, backdrop, rounding, and shadow from Jinyuan's portrait. Keep the source PNG unchanged and show it uncropped at full column width; it contains an abstract geometric burst behind the portrait, but no door-shaped arch.
- Change the collection heading to “Four ways to see HER.” and remove the fifth table-of-contents card.
- Use `assets/video/documentary.mp4` with `controls`, `preload="metadata"`, `playsinline`, a poster path, and a browser fallback. The source remains unchanged; no conversion was made because `ffmpeg` and `ffprobe` were unavailable.
- Use the requested documentary question, “What Can Society Do?” heading, director credit, and six policy points. Keep the copy and video paths in `data.js`, including the specific emphasis markup.
- Remove the Leave Love navigation link, section, Home card, guestbook renderer, event handlers, styles, and data setting. The former browser-local storage value is not cleared.

#### Home introduction, Documentary player, and Published Stories — October 14, 2026

- Replace the Home introduction with two biography paragraphs, a lead line, five activity statements, and a closing paragraph in `data.js`. The activity list uses emoji markers and accent-colored display numerals. Keep the portrait large, uncropped, and next to the copy on desktop; stack it above the copy on mobile.
- Set the two-line Published Stories purpose statement in `data.js`, with one block line per sentence and a 0.4em visual gap. Retain its existing typography, size, and color.
- Match “daily necessities” to the same sans-serif family used by the “A short documentary” eyebrow; preserve all other emphasis styling.
- The documentary file is 1930 × 1080 with 1:1 sample aspect ratio and no rotation metadata, giving a 1.787:1 display ratio. The player uses those dimensions from `data.js`, a full-width natural-height video, and a matching aspect-ratio frame on desktop and mobile.
- The original theme used an automatic wrapper ratio alongside a base 100%-height player rule, leaving the frame without a reliable intrinsic height. The frame and video now share the measured aspect ratio, and the video has explicit intrinsic dimensions.
- `ffprobe` is not installed, so the ratio was read from the MP4 track metadata with an available local parser; no video conversion was performed. Install `ffprobe` with `brew install ffmpeg` to inspect it with the requested utility.

### Art Works

- 28 replaceable image assets and records in `SITE_DATA.paintings`; every record has an id, image, session (1–8), date, age, gender, hair attribute, and caption.
- Step 1: opening wall of all 28 works (4 columns × 7 rows on desktop) and Continue.
- Step 2: chronological room walkthrough, with eight session rooms, wall-mounted framed work, museum labels, arrows, and a room map; or an age timeline with selectable works.
- Step 3: return to the wall with Gender, Appearance, and Who Is She? views. In the game, wrong choices fade; the correct choice reveals the supplied Xuan caption, Play again, and View other options.
- Responsive grid: two columns on small screens, four on desktop. A perfect 4 × 7 wall is only possible at desktop widths.

#### Updated Art Works implementation

The requirements below are the current Art Works experience and supersede the earlier Art Works bullets above wherever they conflict. Implement it in the existing `#page-art-works` section using plain JavaScript and CSS; do not use React, Tailwind, shadcn, or framework modules. Keep all other page sections and the navigation unchanged. Load `art-works.css` and `art-works.js` with relative stylesheet and classic script tags. Keep painting records together in the Art Works data in `art-works.js`.

- Preserve a copy of `index.html` at `index.backup.html` before editing.
- The local image sources are in `assets/paintings/` and `assets/steps/`. Keep originals. Convert all TIFFs to resized, optimized JPEG or WebP files in `assets/art/`; use those browser-safe files for the exhibition.
- Artwork IDs are internal only. Never display an ID in page copy, image alt text, accessible labels, cards, captions, or session labels. The visible artwork title and alt text are exactly `Name | Diagnosis`.
- A painting card is centered over a dimmed background and contains, in order: the original painting without its session mat, the title, `Date Created | [date]`, and the full description. Cap its height and let long descriptions scroll inside the card.
- The experience has seven separate views; only the current view is rendered. View changes fade gently and start at the top. View 2, containing the introduction and process steps, is the only vertically scrolling view.
- **View 1 — infinite canvas:** black background; one centered 7 × 4 block of all paintings at rest, with the whole block in the viewport. Repeat the same block in every direction beyond it. Mouse movement pans without click or drag. Keep the arrow fixed at bottom center.
- **View 2 — introduction and process:** show `Seeing HER Burdens & Needs` and its supplied reflection, then `From Memory to Art` with the four supplied step images and text. Recreate Skiper52's gentle expandable interaction in CSS and JavaScript. The bottom arrow opens View 3.
- **View 3 — exhibition choice:** offer `Sequence of Art Therapy` and `Age` as two large options. They open Views 4 and 5 respectively.
- **View 4 — session rooms:** show one of eight sessions at a time in a room viewed from inside. The back wall faces the visitor; side walls converge toward the center; show a dark narrow ceiling, visible floor, soft lights, and frame shadows. Put the session date on a wall plaque. Arrows, scrolling, and an eight-dot room map move between sessions. Clicking a painting opens its detail card. A bottom arrow opens View 6.
- **Session mats:** every mat has the same 3:4 width-to-height ratio, #f8e8cf color, and subtle paper texture. The image is centered and scaled with `contain`; never crop or stretch it. No black may show within the mat. The detail card shows the image without this mat.
- **View 5 — age sequence:** use 28 expandable vertical columns filling desktop width, in the supplied youngest-to-oldest order. Show only the child's name at the bottom by default; hover/focus reveals age and diagnosis at the top. Clicking opens the detail card. Touch screens show age and diagnosis and scroll horizontally. Recreate Skiper35's expanding-column behavior in plain CSS and JavaScript. A bottom arrow opens View 6.
- **View 6 — Who is she?:** show the riddle image and a fixed 7 × 4 painting grid. Wrong guesses fade away and leave their cells empty. Count every click. A correct guess shows the riddle and matching paintings side by side, `You found her in [number] try/tries.`, the supplied Xuan story, Play again, a return-to-choices control, and an arrow to View 7.
- **View 7 — final gallery:** show the static 7 × 4 grid; clicking any painting opens its detail card.
- Keep all visible copy in English. Do not add gender or hair groupings. Preserve the existing site footer and shared navigation.

#### Art Works refinements — October 6, 2026

These refinements extend the seven-view Art Works implementation above. They are the current wording and visual behavior for these interactions.

- **View 3 — exhibition choice:** the two option labels are exactly “In Sequence of Art Therapy Sessions” and “In Sequence of Age of Cancer Children.” Emphasize “Art Therapy” and “Age” in very large italic display serif type in the accent color; set the surrounding words smaller in widely tracked sans-serif type. Use gentle hover transitions.
- **View 4 — session rooms:** build a closed, five-face room in CSS 3D using shared width, height, and depth variables for its perspective container, back wall, left wall, right wall, floor, and ceiling. Each face meets at the same edge. Remove per-painting museum labels and black frame borders. Retain the date plaque, arrows, eight dots, soft lighting, and click-to-open detail. Mats share a 3:4 ratio, #f8e8cf color, equal dimensions within each room, and subtle shadows; center each group of two, three, or four works horizontally and vertically.
- **View 5 — age gallery:** show 28 columns in youngest-to-oldest order. At rest, show only the child's name at the bottom, rotated 90 degrees counterclockwise and sized to the column. Hover reveals age and diagnosis at the top in the same vertical orientation, while the painting fills the column as a centered, proportional, clipped background at 50% opacity. Clicking still opens the painting card. On touch screens, columns scroll horizontally and age and diagnosis are always visible in the same orientation.
- **Painting detail:** use a single close button in the top-right. The card is dark frosted glass with a light border and backdrop blur (including the WebKit fallback). Show the original image without a colored mat, followed by its title, “Date Created | [date]”, and a scrollable description within the existing maximum height. Keep the page dimmed behind it.
- **View 6 — Who is she?:** before guessing, show “Choose how to view the exhibition” linking to View 3. Give the puzzle and success layouts more vertical spacing and slightly larger paintings. The success state includes “Play again”, “Choose how to view the exhibition”, and the existing arrow to View 7.
- **View 7 — final gallery:** add “Back to the beginning”, which fades to View 1 and clears the guessing attempts and result.
- **Shared visual theme:** load the visual-only `theme.css` stylesheet after the site styles. Use the reference image's charcoal, warm off-white, and strong vermilion palette with contemporary serif and sans-serif typography, outlined display lettering, asymmetry, and gentle motion. Do not change the other sections' content, links, structure, or behavior, or the shared navigation's behavior.
- Keep painting ID numbers hidden everywhere in the visible site and accessible text.

#### Art Works adjustments — October 6, 2026

These are the latest Art Works refinements and supersede earlier wording or behavior above where they differ.

- **View 5 — age sequence:** restore a smooth flex expansion on the hovered/focused column; neighboring columns contract so the 28 columns still fill the available width. Preserve the vertical labels, background painting, touch behavior, and click-to-open card.
- **View 4 — session gallery:** ensure paintings in the 3D room are clickable and open the same detail card as in other views. Decorative faces must not intercept painting clicks. Add the session's Roman numeral above a more prominent date plaque. The sequence uses Session I through Session VIII.
- **Painting detail:** retain one close control, frosted dark glass, title/date/scrollable description, and maximum height. The card backdrop is fully transparent and must not dim or blur the rest of the page; outside clicks and Escape close the card. Split description text at line breaks into separate paragraphs with about one line of space between them.
- **View 3 — exhibition choice:** the first option remains exactly “In Sequence of Art Therapy Sessions”. The second option is exactly “In Sequence of Age of Children with Cancer”. Emphasize “Art Therapy” and “Age” through size and type only; their color matches the rest of the option text.
- **Views 6 and 7 — controls:** enlarge the choose-view, play-again, and back-to-beginning buttons, along with the View 6 arrow. Allow buttons to stack and fill a sensible maximum width on mobile.

#### Art Works reset and gallery fixes — October 7, 2026

- Every activation of the Art Works navigation link, including when `#art-works` is already the current hash, resets the experience to View 1 at the centered resting canvas. Clear attempts, restore removed guesses, hide the result, close the painting card, reset to Session I, and scroll to the top. Apply the same reset on a hashchange to `#art-works` and on page load with that hash.
- Route the existing app shell's Art Works render through `resetArtWorks()` so it does not briefly render the legacy placeholder gallery before the current gallery.
- On the unsolved Who Is She? page, use the exact question “Which painting in the gallery portrays the same girl?” Provide a plain “← Choose a Way to View” return control aligned to the grid width; it opens View 3. Leave the success screen controls as approved.
- Opening the art therapy session sequence always starts at Session I and updates the camera, room indicator, and dots. Enlarge the Roman numeral/session line and date plaque for visibility.
- Make session mats directly clickable with `data-painting-id` identifiers that resolve to the Art Works records. Keep one delegated click listener on the persistent Art Works container and use `document.elementsFromPoint` as a hit-test fallback; it invokes the same `openPaintingCard(id)` used by other gallery views. Decorative room layers ignore pointer input. Keep the dialog at the document level, fixed above the room, and avoid dimming or blurring the page outside it.
- Use one shared frosted-glass painting card style in every Art Works view, with a single close control, title, Date Created line, scrollable description, and paragraph spacing.

### Picture Book

- English and Chinese edition controls and per-edition download links.
- The MVP shows a page-turning spread preview until PDF paths are added. When a PDF path is configured, the browser's native PDF viewer is embedded and a download link is enabled. Native PDF controls and exact page-flip behavior vary by browser.

#### Published Artbook update — October 7, 2026

- The visible heading is “Published Artbook”. Its eyebrow is “Store memories in two languages”, and the introduction reads “Turn through a commemorative book made from the images and moments of art therapy sessions”.
- Offer “English” and “中文” edition controls and keep a direct download link to each original PDF.
- Convert each landscape PDF page to a WebP spread image. On desktop show the first sheet as a single front cover (right half) and later sheets as spreads. On mobile show the cover as one page, then the left and right page of each following spread one at a time. Store the generated image paths in `data.js`; include page-specific alt text.

### Other Works

- Introductory purpose statement and nine numbered article cards.
- Each card has placeholder title, summary, and an external link opened in a new tab. Replace placeholder URLs in `data.js` before publishing.

#### Published Stories update — October 7, 2026

- The visible section heading is “Published Stories”; the purpose sentence remains unchanged.
- Replace the nine placeholders with the supplied story titles, descriptions, and article URLs in `data.js`. Each available link opens in a new tab with `rel="noopener noreferrer"`.
- The ninth story keeps an empty URL with the code comment “Link will be provided later”. Render it as a non-clickable card with “Link coming soon”; it becomes a normal linked card automatically when a URL is supplied.

### Leave Love — removed October 14, 2026

The guestbook page, navigation link, Home card, front-end behaviors, styles, and data setting were removed at the site owner's request. Existing browser-local storage values are left untouched. No separate guestbook backend or storage file was present.

## MVP file structure

```text
vibe coding/
├── index.html
├── styles.css
├── app.js
├── data.js
├── spec.md
├── page-structure.md
└── assets/
    ├── paintings/        # 28 replaceable SVG placeholders
    ├── books/            # add the English and Chinese PDF files here
    └── video/            # add the documentary file here
```

## Content editing

- Update all editable copy, media paths, article links, book paths, and painting metadata in `data.js`.
- Replace `assets/paintings/painting-01.svg` through `painting-28.svg` with the real artwork, keeping the names or updating the matching data records.
- Add book PDFs and set `books.english.pdf` / `books.chinese.pdf` to their paths.
- Add the documentary file and set `documentary.video`.
- Replace the nine `articles[].url` values.

## Demo acceptance checklist

- Navigation works at desktop and mobile widths; page content remains readable without horizontal overflow.
- All five pages render from `index.html` without a framework or build process.
- Art Works supports all three steps, room selection, timeline selection, both splits, guessing, retry, and return to options.
- Picture Book switches editions and pages; configured PDFs show a native viewer and download link.
- All images include descriptive alt text and the shared footer is present.

## Out of scope for the static MVP

- Production video hosting, final book PDFs, final artwork, and final article URLs; the project currently contains editable placeholders.


#### YouTube Error 153 follow-up — October 15, 2026

- Replace the local video with the standard YouTube iframe at `https://www.youtube.com/embed/81N1dAJ-tpI?si=9o_MENE67TCkkFNK`, stored in `documentary.youtubeEmbedSrc` in `data.js`. Keep the requested iframe attributes and responsive 16:9 frame.
- Keep “Watch on YouTube” below the frame as a visible secondary button linking to `https://youtu.be/81N1dAJ-tpI` in a new tab.
- A source scan found no referrer meta tag, Referrer-Policy or Content-Security-Policy directive, `no-referrer` iframe policy, or iframe sandbox blocking YouTube.
- Add a README note that the embed requires a web address and is expected to fail when opened directly from the file system.
