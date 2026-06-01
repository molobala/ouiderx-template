# OUIDesigner OUIDERX Mini App

This project is an OUIDERX native-view mini app.

The starter is intentionally feature-rich: it includes a dashboard, reusable components, native form controls, local assets, sample host-function metadata, and sample native-view schemas. Keep it useful as a template, not just as a compiler smoke test.

## Read First

- `docs/ai/project.md`
- `docs/ai/dependencies.md`
- `../../docs/ai/index.md` when working inside the `ouiderx` repository
- `node_modules/@ouidesigner/ouiderx/docs/ai/index.md` when the package is installed locally
- `https://ouidesigner.orangemali.com/docs#/docs/mini/ouiderx` when local package docs are unavailable

Also inspect:

- `app.json`
- `.native-views.json`
- `.host-functions.json` when present

Do not add or edit a project-local `.testing` Angular preview app. Web preview is owned by the IDE/toolchain and `npx @ouidesigner/ouiderx preview`, then cached outside this mini app project.

## Rules

- `.omc` files are OUIDERX components, not HTML.
- `<script>` blocks use Mevento, not JavaScript.
- Mevento comments use `#` and `#* ... *#`.
- Component imports live in the top-level `<script>` block.
- Non-relative imports resolve under `.modules`.
- Imported component names become kebab-case tags.
- Use `<<ComponentName>>` for OUIDERX component injection inside Mevento.
- `THIS` is local to the current `.omc`; do not expect it to be visible in imported or injected components.
- Pass data to child components through `<script name="input">...</script>` and read it with `INPUT[...]` in the child.
- Components are isolated by default. Use `isolated="false"` only when parent and child intentionally share `stateSet(...)` / `stateGet(...)`.
- Prefer `<text>Hello</text>` and `<text>{{_DATA['label']}}</text>`; do not put text content in the `data` attribute for new text nodes.
- Use `localAsset("assets/name.png")` for bundled assets.
- Do not treat `Icon` or `IonIcon` values as assets.
- Do not invent native tags or props; inspect schemas and installed modules first.

## Commands

- Preferred compile/check command: `npx @ouidesigner/ouiderx run`
- Preferred browser preview command: `npx @ouidesigner/ouiderx preview --port 4300`
- If the package is installed locally, `ouiderx run` may also work.
- If working in the `ouiderx` package repo: `npm run build`

Run the build after changes and fix compiler diagnostics before finishing.
