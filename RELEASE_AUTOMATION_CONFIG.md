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
- Branch format: `chore/bump-repo-<version>`
- Commit/title format: `chore: bump repo to <version>`
- Also updates `package-lock.json` via `npm install`

## Manual npm publish
- Workflow file: `.github/workflows/publish-npm.yml`
- Trigger: manual (`workflow_dispatch`) from the `main` branch
- Flow used: `npm run release -- --yes` (reuses the existing release script)
- Required secret: `NPM_TOKEN` (npm automation token)
