# Photo Journal — Slideshow Portfolio

A cute-but-professional filmstrip-style slideshow for showing off your photography.

## Folder structure

```
photo-portfolio/
├── index.html        ← the page itself
├── css/
│   └── style.css      ← all styling
├── js/
│   └── main.js         ← slideshow logic + YOUR PHOTO LIST
└── photos/
    └── 01.jpg – 10.jpg  ← sample placeholder photos (replace these!)
```

## How to add your own photos

1. Open `js/main.js`.
2. At the very top you'll see a section labeled:
   ```
   📸 YOUR PHOTOS GO HERE
   ```
   This is a list called `slides`, one line per photo:
   ```js
   { src: "photos/01.jpg", title: "First Light, Dolomites", loc: "Dolomites, Italy", year: 2024 },
   ```
3. Put your image files into the `photos` folder (any name you like — .jpg, .png, .webp all work).
4. Update `src` to match your filename, and fill in `title`, `loc`, and `year` — these appear as the caption under each photo.
5. Add more lines for more photos, or delete lines to remove some. The order in the list is the order they play in.

You can also use photos hosted online instead of local files — just set `src` to the full web address (e.g. `"https://yoursite.com/photo.jpg"`).

**Tip:** photos at least 1600px wide, landscape orientation, look sharpest on the main stage.

## Customizing the name/branding

In `index.html`, near the top of the `<body>`, look for:
```html
<!-- ✏️ EDIT ME: your name and tagline -->
```
Change "Mira Voss" and "Photo Journal · Vol. 04" to your own name and tagline.

## Customizing colors

All colors live as variables at the top of `css/style.css`:
```css
:root{
  --bg: #1B1A21;      /* background */
  --peach: #E8A87C;   /* accent color */
  --sage: #8FBFA6;    /* secondary accent */
  ...
}
```
Change any of these hex values to reskin the whole site.

## Viewing the site

Just open `index.html` in any browser — no build step, no installs needed. To host it online, upload the whole folder to any static host (Netlify, GitHub Pages, Vercel, etc.).

## Controls

- **← / →** arrow keys, or the arrow buttons on the photo, to move between slides
- **Space** to play/pause the slideshow
- Click any thumbnail in the filmstrip to jump straight to it
- Swipe left/right on mobile
- Tap the heart icon to mark a favorite (resets on page reload)
