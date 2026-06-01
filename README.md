# OUIDesigner OUIDERX Project Template

This template contains only mini app source: `app.json`, `.omc` files, assets, translations, and local OUIDERX metadata.

It is intentionally more than a blank screen. The starter includes:

- a dashboard entry page in `index.omc`;
- reusable OUIDERX components under `src/components`;
- form inputs, selection controls, list tiles, icons, cards, actions, and local asset usage;
- `.host-functions.json` examples for target-super-app functions;
- `.native-views.json` examples for host-provided native views;
- AI assistant context for Codex, Claude Code, and other coding agents.

The IDE and `npx @ouidesigner/ouiderx preview` own the Angular/`oui-ion` web preview shell and cache it outside the project. Do not add a `.testing` preview app to this template.

Useful commands:

```sh
npx @ouidesigner/ouiderx run
npx @ouidesigner/ouiderx preview --port 4300
```
