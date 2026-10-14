# Page Structure

## Global shell

- **Fixed header:** circular S·W mark, Still, We Bloom wordmark, and links to all six pages. On small screens the links open from a menu button.
- **Main area:** one active route at a time, using simple hash navigation (`#home`, `#documentary`, `#art-works`, `#picture-book`, `#other-works`, `#leave-love`).
- **Footer:** LOVE seal, “Made with love for every child and every caregiver.”, and a back-to-top link.
- **Painting detail dialog:** shared accessible modal for opening any gallery painting.

## Route map

| Page | Sections and content | Main actions |
|---|---|---|
| Home | Hero biography → Caregiver definition → five destination cards | Open another page |
| Documentary | Page introduction → 16:9 video/player placeholder → title, description, director credit | Play video when its source is configured |
| Art Works | Opening 28-work wall → exhibition choice → chronological rooms or age timeline → return wall → Gender / Appearance / Who Is She? | Continue, browse rooms, select timeline point, split, guess, retry |
| Picture Book | Book introduction → English/Chinese edition switch → book spread or PDF viewer → page controls and download | Change edition, turn pages, download |
| Other Works | Recovery-story purpose statement → nine article cards | Open a story in a new tab |
| Leave Love | Guestbook form → note-card wall, newest first | Submit or anonymously sign a note; hide notes in local demo |

## Art Works flow

```text
Opening wall
   └── Continue → Exhibition choices
                    ├── Chronological Order → Rooms 1–8 → Return to full wall
                    └── Age Order → Selectable age timeline → Return to full wall
                                                           ├── Gender split
                                                           ├── Appearance split
                                                           └── Who Is She? → wrong guesses fade / correct answer → Play again
```

The “Return to full wall” view exposes the three interactive options above the wall. “View exhibition options” returns to the two viewing modes.

## Minimal implementation map

- `index.html`: semantic page shell and shared navigation/footer/dialog.
- `styles.css`: visual system, gallery layouts, transitions, responsive rules, reduced motion.
- `data.js`: one content source for text, links, video/book paths, guestbook settings, and painting metadata.
- `app.js`: route switching, rendering, gallery interaction, book preview, and local demo guestbook behavior.
- `assets/paintings/`: editable placeholder images. `assets/books/` and `assets/video/` are ready for final media.
