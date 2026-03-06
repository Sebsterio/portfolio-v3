Before implementing any refactor, analyze the repository to understand the current styling architecture and conventions.

Tasks:

1. Inspect the entire repository, focusing on:
   - src/styles/**
   - components using className / cn()
   - Tailwind usage patterns
   - existing CSS utilities and tokens

2. Produce a document:
   docs/repo-style-analysis.md

The document should include:

A) Styles Architecture
- Describe the current structure of src/styles.
- Explain how global.css imports are organized.
- Identify theme tokens, system primitives, component styles, and utilities.

B) Tailwind Usage Patterns
- Identify the most common utility clusters used in JSX.
- Detect repeated combinations of typography utilities.
- Detect repeated layout patterns (flex + gap, space-y, etc.).

C) Existing Design System Elements
- Identify components that already act as design system primitives
  (for example: GlassSurface, Button, TextBlock, SectionHeader).

D) Anti-patterns or inconsistencies
- duplicated classes
- inline styles that could be utilities
- arbitrary values repeated many times
- conflicting naming conventions

E) Opportunities for safe refactors
- clusters that appear 3+ times
- styles already partially centralized
- areas where abstractions are already emerging

F) Risks
- dynamic class strings
- classes split across props/components
- patterns that might break Tailwind detection

Requirements:
- Do not modify code yet.
- Do not propose a full redesign.
- Focus on accurate analysis of the current state.

After producing the document, summarize the top 10 insights and wait for further instructions.
