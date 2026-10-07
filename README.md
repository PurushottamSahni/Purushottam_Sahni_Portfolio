# Purushottam Kumar Sahni · portfolio

Plain HTML, CSS and JavaScript. No framework, nothing to install.
Light theme by default, with a dark switch in the top bar.

## Edit your content (one file)

Open **`js/content.js`**. Everything on the page is read from it.

| Section | Field in content.js |
|---|---|
| Home | `profile`: name, headline, subline, location, email, links, avatar |
| About | `about` (paragraphs) |
| Education | `education`: degree, school, period, optional note (thesis) |
| Experience | `experience`: role, company, period, bullets, optional link |
| Projects | `projects`: `category` is "Data" (Projects section) or "AI" (AI section), `image` is an optional dashboard screenshot, `results` are 1–2 short real results |
| Skills | `skills`: five groups |
| Certifications | `certificates`: `featured: true` shows it first; the rest appear under "Show all" |
| Badges | `badges` |

The "Ask my profile" console (under the hero) reads the same data, so it updates automatically.

## Avatar
`assets/avatar.webm` and `assets/avatar.mp4` are the looping video; `assets/avatar-poster.webp` is the still picture shown first
and to visitors who prefer reduced motion. To use only the still picture, set `avatarVideo: null` in content.js.

## Preview locally
```bash
python -m http.server 5173
```
Then open http://localhost:5173 (run it inside this folder).

## Publish free on GitHub Pages
This repo is `PurushottamSahni.github.io`, so GitHub Pages serves it at https://purushottamsahni.github.io/ (Settings → Pages → Deploy from branch → main / root).

After editing files, bump the `?v=` number on the CSS and JS links in `index.html` so browsers load the new version.

## Files
```
index.html       page structure
css/style.css    design (colours and sizes are variables at the top)
js/content.js    ALL your content  <- edit this
js/main.js       rendering and interactions
js/query.js      the SQL console engine
assets/          avatar video, project screenshots, certificates, badges, résumé
```
