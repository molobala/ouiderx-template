# AI Dependency Index

This template uses OUIDERX.

Primary AI docs:

- In this repository, relative to the sample root: `../../docs/ai/index.md`
- If the package is installed locally: `node_modules/@ouidesigner/ouiderx/docs/ai/index.md`
- Public docs: `https://ouidesigner.orangemali.com/docs#/docs/mini/ouiderx`

Project-local context:

- `.native-views.json`: available native host views and props.
- `.host-functions.json`: custom host functions available to Mevento.
- `.modules/`: installed OUIDERX modules.

If docs are missing from `node_modules`, use the project-local AI docs first, then the public docs.

The Angular/`oui-ion` web preview shell is not a project dependency. The IDE and `npx @ouidesigner/ouiderx preview` manage and cache that shell outside the mini app project.

Build/check command:

- Preferred: `npx @ouidesigner/ouiderx run`
- Local CLI, when installed: `ouiderx run`
- Browser preview: `npx @ouidesigner/ouiderx preview --port 4300`
- If network access is unavailable and no local CLI exists, use the IDE build or validation flow and report the limitation.
