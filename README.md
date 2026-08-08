# Cardiff Community Meals — prototype

Plain HTML/CSS/JS, no build step. Bilingual (English/Cymraeg), built on Bootstrap 5.

## Run it

Opening `site/index.html` directly works in Chrome, but for reliable behaviour across pages (shared `localStorage` "database"), serve the folder instead:

```
cd site
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Structure

- `index.html` — home, live stats, recipient stories teaser, community voices teaser, business showcase
- `request.html` — submit/refer a meal request
- `donate.html` — browse open requests, donate & book a meal
- `track.html` — status tracker for requests/bookings
- `businesses.html` / `partner.html` — business partner showcase & sign-up, plus a "Proud to be Welsh" shout-out to independent local shops
- `stories.html` — full recipient story features
- `voices.html` — Community Voices: a public message wall, gated by human review before anything is shown
- `moderate.html` — the review queue for Community Voices (stands in for an admin-only screen — see Known limitations)
- `impact.html` — public impact dashboard
- `about.html` — how it works, safeguarding, FAQs
- `rota.html` / `rota-view.html` — **Cook & Book**: private cooking rotas for a closed group (e.g. meal train for a new baby), access-code gated, with sign-up slots and a group chat thread
- `app.js` — shared data layer (localStorage-backed) + nav/footer chrome + shared hero skyline SVG
- `i18n.js` — English/Cymraeg translation dictionary + toggle engine
- `stories-data.js` — recipient story content (EN/CY)
- `shops-data.js` — real, independent Cardiff Welsh-gift/craft shops featured on `businesses.html`
- `custom.css` — design system on top of Bootstrap 5 (Welsh green/red palette, accessibility, motion)

## Known limitations (by design, for a prototype)

- No backend — `localStorage` stands in for a database, and payments are simulated.
- Cymraeg (Welsh) text is AI-assisted and should get a professional translator's review before any real launch — see the note at the top of `i18n.js`.
- "Private" rota access-code gating is a UX simulation, not real security — a production build needs real invite-based auth.
- `moderate.html` (the Community Voices review queue) is a public link in this prototype so the review step is visible rather than taken on trust. In a real deployment it must sit behind real admin sign-in.

## Deploy

This repo publishes to GitHub Pages automatically via `.github/workflows/deploy.yml` — every push to `main` builds and deploys the contents of `site/`.

One-time setup after your first push: in the repo on GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**. After the workflow run finishes, the site will be live at `https://<username>.github.io/<repo-name>/`.
