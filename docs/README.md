# Tech Stack Blog Hub – Contributor Guide

Welcome to the curated blog hub that covers database, frontend, language, and DevOps stacks in one place. This document explains how the site is organized and how to add the next stack.

## Project structure

```
workspace/
├── index.html               # Semantic HTML shell + layout
├── assets/
│   ├── css/style.css        # Global theme, layout, and responsive rules
│   └── js/
│       ├── data.js          # Source of truth for each tech stack blog
│       └── app.js           # Rendering + filtering logic (vanilla JS)
└── docs/README.md           # You are here
```

## How rendering works

1. `data.js` exports a frozen `techBlogs` array. Each entry describes:
   - `id`, `name`, `category`, `level`, and `effort` metadata
   - `basics`, `advanced`, `example`, and `practiceQuestions` content
   - `resources` (label + URL) and discoverability `tags`
2. `app.js` consumes that array and renders cards inside `#blog-grid`.
3. The search box performs case-insensitive text matching across title, summary, fundamentals, advanced tactics, and tags.
4. Discipline filters (`Databases`, `Frontend`, `Languages`, `DevOps`) toggle by category.
5. The stats line keeps reviewers informed about how many stacks are visible.

Because the UI is entirely data-driven, adding a new stack never requires editing HTML. Once the data entry exists, the UI re-renders automatically.

## Adding a new tech stack

1. Open `assets/js/data.js` and duplicate any existing object in the `techBlogs` array.
2. Update the `id` (must be unique and lowercase), display `name`, `category`, `effort`, and `level` strings.
3. Provide at least three items for both `basics` and `advanced` arrays.
4. Supply an `example` with `title`, one-paragraph `description`, and a `code` snippet. Multiline strings are supported via template literals.
5. Add three or more `practiceQuestions` that escalate from foundational to scenario-based prompts.
6. Include at least two `resources` with public URLs and concise labels.
7. Append focused `tags` for better free-text search results.
8. Update the `lastUpdated` date (ISO format preferred) and the `lastUpdatedAt` string if you want the stats banner to reflect the most recent batch.

## Content guidelines

- Keep tone concise, instructional, and oriented toward solving support tickets or interview-type prompts.
- Pair conceptual explanations with real commands, queries, or code so readers can apply knowledge immediately.
- Spotlight operability (profiling, scalability, deployment) alongside syntax fundamentals.
- Practice questions should require reasoning, not rote recall. Favor scenario prompts (“Design…”, “Explain how…”) over yes/no questions.

## Local preview

This project is fully static. To preview locally:

1. Open `index.html` directly in a browser, or
2. Serve the directory with any static server, for example:

```bash
npx serve .
```

The site has no build tooling requirements, reducing maintenance overhead for future contributors.

## Branch and workflow

All changes for this iteration live on the `feature/tech-blog-site` branch. Once the review completes, merge into `main` using your preferred workflow (GitHub PR, protected branch rules, etc.).
