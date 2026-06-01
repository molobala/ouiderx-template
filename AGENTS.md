# OUIDesigner OUIDERX Mini App

This project is an OUIDERX native-view mini app.

## Read First

- `docs/ai/project.md`
- `docs/ai/dependencies.md`
- `../../docs/ai/index.md` when working inside the `ouiderx` repository
- `node_modules/@ouidesigner/ouiderx/docs/ai/index.md` when this template is used as a standalone npm project

Also inspect:

- `app.json`
- `.native-views.json`
- `.host-functions.json` when present

## Rules

- `.omc` files are OUIDERX components, not HTML.
- `<script>` blocks use Mevento, not JavaScript.
- Mevento comments use `#` and `#* ... *#`.
- Component imports live in the top-level `<script>` block.
- Non-relative imports resolve under `.modules`.
- Imported component names become kebab-case tags.
- Use `<<ComponentName>>` for OUIDERX component injection inside Mevento.
- Prefer `<text>Hello</text>` and `<text>{{_DATA['label']}}</text>`; do not put text content in the `data` attribute for new text nodes.
- Use `localAsset("assets/name.png")` for bundled assets.
- Do not treat `Icon` or `IonIcon` values as assets.
- Do not invent native tags or props; inspect schemas and installed modules first.

## Commands

- Compile this project with an installed CLI: `ouiderx run`
- Compile without a local/global install: `npx @ouidesigner/ouiderx run`
- If working in the `ouiderx` package repo: `npm run build`

Run the build after changes and fix compiler diagnostics before finishing.
