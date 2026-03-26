# OVERVIEW — View Transition Mobile Performance Audit

## Goal
Audit and optimize page transition performance on mobile devices without
changing the public API surface of TransitionProvider, useTransitionRouter,
or TransitionLink, and without removing existing visual behaviours.

## Scope
- src/lib/transitions/ — JS transition orchestration
- src/styles/vt-*.css — CSS animation budget and keyframes
- src/components/background/ — background layers during transitions
- Mobile-specific compositing hazards on VT-named glass-surface elements

## Status
Audit complete. Plan revised after user feedback. Awaiting implementation approval.
