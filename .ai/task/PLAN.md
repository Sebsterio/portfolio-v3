# Task Plan

1. Preflight fetch and commit-head verification.
2. Capture pre-rewrite tree hashes for `dev` and `main`.
3. Rewrite `dev` as one commit from anchor `2943fdc`.
4. Align `main` to the rewritten `dev` tip.
5. Verify trees, commit graph, and merge-base expectations.
6. Force-push `dev` and `main` with `--force-with-lease`.
7. Summarize outcomes, including any blocked network/protection steps.
