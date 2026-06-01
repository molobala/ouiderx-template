---
paths:
  - "**/*.omc"
  - "app.json"
  - ".native-views.json"
  - ".host-functions.json"
---

# OUIDERX Rules

- `.omc` files are native-view components, not HTML.
- `<script>` content is Mevento, not JavaScript.
- Use `#` comments and `#* ... *#` block comments.
- Check `.native-views.json` and `.modules` before using custom tags.
- Prefer `<text>Hello</text>` and `<text>{{_DATA['label']}}</text>`; do not put text content in the `data` attribute for new text nodes.
- Use flat snake_case translation keys, not dotted keys. Use `%translation_key` for static labels and `{{translate('translation_key')}}` for interpolated text.
- Store translation keys in shared state for user-facing labels, then translate them at render time.
- Use `localAsset(...)` for bundled assets.
- Keep custom host function metadata in `.host-functions.json`.
- Preserve this sample as a useful starter template with dashboard, forms, assets, host metadata, and reusable components.
