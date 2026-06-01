# Project AI Context

This is an OUIDERX native mini app starter.

Important files:

- `app.json`: app metadata, entry file, translations, assets, and dependencies.
- `index.omc`: entry component.
- `src/*.omc`: reusable components.
- `.native-views.json`: project-specific native view schemas.
- `.host-functions.json`: optional custom host function metadata for Mevento completion.
- `translation.json`: bundled wording.

Compiler output is native JSON, not a WebView JavaScript bundle.

Use `localAsset("assets/name.png")` for files copied from `src/assets` into the bundle.

