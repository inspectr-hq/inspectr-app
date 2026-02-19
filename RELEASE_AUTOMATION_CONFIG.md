# Release Bump Configuration

## Trigger source
- This repository (`inspectr-app`) listens for `repository_dispatch` event type `repo-x-released`.
- Source repository expected in payload: `thim81/inspectr-ui`.

## Dependency bump target
- Dependency name: `@inspectr/ui`
- Update behavior:
  - update in `dependencies` when present
  - otherwise update in `devDependencies`
  - fail with an explicit error if not found in either section

## PR behavior
- Branch format: `chore/bump-repo-x-<version>`
- Commit/title format: `chore: bump repo-x to <version>`
- Also updates `package-lock.json` via `npm install`
