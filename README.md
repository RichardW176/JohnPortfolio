# John Recendez — Filmmaker & Writer

Static portfolio site. No build step, no dependencies, no framework — plain
HTML, CSS, and JS served straight from GitHub Pages.

**Live:** https://richardw176.github.io/JohnPortfolio/

## Pages

```
index.html          Home — name, intro, selected films, recent writing, contact
films.html          Full filmography, dense full-bleed grid
film-template.html  Copy once per film: hero still, player, synopsis, credits
writing.html        Published pieces + an in-page long-form example
about.html          Bio, selected credits, contact
404.html            Not found
```

Supporting files: `.nojekyll` (serve as-is, no Jekyll), `robots.txt`,
`sitemap.xml`, and `assets/` for CSS, JS, and images.

## Design

Two decisions worth knowing before you change anything:

- **Type.** Instrument Serif for titles and long-form body copy; Work Sans for
  nav, labels, and metadata. Loaded from Google Fonts with system serif/sans
  fallbacks, so the site still reads correctly if the fonts fail.
- **Color.** Committed dark — near-black with warm off-white text. It is six
  values at the top of `style.css`. Swapping them for light values reskins the
  whole site; nothing else assumes a dark background.

Everything else — spacing, type scale, container widths, grid gaps — is a token
in that same `:root` block.

## Adding a film

1. Copy `film-template.html` to something url-safe, e.g. `the-quiet-part.html`.
2. Replace every `EDIT:` marker — title, year, runtime, logline, embed,
   synopsis, credits, festivals.
3. Drop the stills in `assets/img/films/`. Hero is 21:9, grid tiles are 16:9.
4. Add a tile to the grid in `films.html` (and `index.html` if it is a headliner)
   pointing at the new page.
5. Add a `<url>` block to `sitemap.xml`.

## Images

Export at roughly 2× display size, then compress — [Squoosh](https://squoosh.app)
is the easy option. Target under 300 KB per still. Every `<img>` needs a `width`
and `height` so the page does not jump as they load, and `loading="lazy"` on
anything below the fold.

- Grid tiles — 1600×900 (16:9)
- Film hero — 2100×900 (21:9)
- Portrait — 800×1000 (4:5)
- `assets/img/og.jpg` — 1200×630, the social share preview

## Turning Pages on

Repo → **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
The first deploy takes a minute or two; after that every push to `main` publishes.

## Local preview

There is no `python` or `node` on this machine, so `python -m http.server` will
not work without installing one first. Use the **Live Server** extension in
VS Code instead — right-click `index.html` → *Open with Live Server*.

Double-clicking `index.html` mostly works too, but `404.html` uses absolute
paths that only resolve over a server.

## Note on paths

This is a *project* page, so the site lives under `/JohnPortfolio/`. Content
pages use relative paths (`./assets/...`); `404.html` uses absolute ones
(`/JohnPortfolio/assets/...`) because it can be served from any depth.

If you ever rename this repo to `RichardW176.github.io`, or point a custom
domain at it, update the absolute paths in `404.html` and the URLs in
`robots.txt`, `sitemap.xml`, and the `og:`/`canonical` tags in every page.
