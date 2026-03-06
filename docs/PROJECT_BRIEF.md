# PROJECT_BRIEF

## Purpose

This repository powers a personal portfolio and case-study site.

The site is intended to present project work, engineering quality, and visual craft in a single navigable experience.

## Audience

- Hiring managers and recruiters
- Engineering and product peers
- Potential freelance or contract clients

## Implemented surfaces and intended experience

- `/`
  - Hero-first landing page with direct calls to view project work or contact.
- `/about`
  - Profile and strengths page with technical highlights and stack summary.
- `/contact`
  - Implemented route, currently a placeholder under-construction experience.
- `/projects`
  - Redirects to `/projects/timeline`.
- `/projects/timeline`
  - Timeline-oriented project browsing.
- `/projects/cards`
  - Card-grid project browsing.
- `/projects/magazine`
  - Editorial-style project browsing.
- `/projects/timeline/[slug]` and `/projects/cards/[slug]`
  - Project detail surfaces for implemented views.

## UX direction in current implementation

- Single-page-feel navigation supported by transition-aware routing.
- High-contrast, glass/metal visual language.
- Content-led project storytelling across three view modes.

## Boundaries for this document

- This brief reflects current implemented intent only.
- It does not define roadmap, backlog, or speculative UX.
