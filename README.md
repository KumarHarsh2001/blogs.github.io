# Tech Stack Blog Hub

A lightweight, data-driven website that curates end-to-end learning paths for support-critical stacks including MySQL, MongoDB, React, JavaScript, Docker, and Java. Each blog card mixes fundamentals, advanced production tactics, annotated code samples, and interview-style practice questions.

## Why this project

- **Single surface for many stacks** – reviewers can share one URL that covers core databases, frontend frameworks, languages, and DevOps tooling.
- **Data powered** – new stacks only require inserting another object inside `assets/js/data.js`. No HTML rewiring.
- **Zero build tooling** – pure HTML, CSS, and vanilla JavaScript keeps maintenance and hosting simple (serve via any static host or GitHub Pages).

## Project layout

```
index.html              # Semantic structure + controls
assets/
  css/style.css         # Theme, layout, responsive rules
  js/data.js            # All blog content + metadata (easily extendable)
  js/app.js             # Rendering, filtering, and search logic
docs/README.md          # Contributor playbook
```

## Local preview

Open `index.html` directly in a browser or run a static server:

```bash
npx serve .
```

## Adding the next stack

1. Duplicate an entry inside `assets/js/data.js`.
2. Update identifiers, fundamentals, advanced tactics, code example, and practice prompts.
3. Refresh the `lastUpdated` fields so the stats banner reflects the newest content.
4. Save—`app.js` automatically re-renders the new stack without further wiring.

Need implementation details? See `docs/README.md` for deeper contributor guidance.
