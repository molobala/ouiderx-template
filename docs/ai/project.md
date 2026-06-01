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

For text nodes, write inner text directly:

```xml
<text>Hello</text>
<text>{{_DATA['label']}}</text>
```

Do not put text content in the `data` attribute for new text nodes unless maintaining legacy code that already uses that form.

Use `localAsset("assets/name.png")` for files copied from `src/assets` into the bundle.
