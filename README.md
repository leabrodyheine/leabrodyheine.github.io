# Lea Brody-Heine Portfolio

Source for my personal portfolio site, published with GitHub Pages at [leabrodyheine.github.io](https://leabrodyheine.github.io/).

The site presents my professional background, technical skills, selected software and data projects, and downloadable résumé. It is a static site built with HTML, CSS, Bootstrap, and JavaScript.

## Run locally

No build step is required:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Structure

- `index.html` contains the page content and portfolio entries.
- `css/` contains the Bootstrap and site-specific styles.
- `js/` contains the page interactions.
- `img/` and `fonts/` contain static assets.
- `Resume/` contains the downloadable résumé and related PDF material.

## Deployment

GitHub Pages serves the `main` branch directly. Pushing a site update to `main` updates the published portfolio after GitHub Pages finishes deploying it.
