# Project AI Context

This is an OUIDERX native mini app starter.

Important files:

- `app.json`: app metadata, entry file, translations, assets, and dependencies.
- `index.omc`: entry component.
- `src/components/*.omc`: reusable dashboard, form, activity, and host-integration components.
- `.native-views.json`: project-specific native view schemas.
- `.host-functions.json`: optional custom host function metadata for Mevento completion.
- `translation.json`: bundled wording.

Compiler output is native JSON, not a WebView JavaScript bundle.

The default starter is a small financial dashboard. It demonstrates local assets, component imports, inner-text text nodes, form controls, list tiles, IonIcon names, Mevento actions, host-function metadata, and native-view schema metadata. Preserve those examples when possible because they are useful for new mini app developers and AI agents.

The IDE and `npx @ouidesigner/ouiderx preview` own the web preview shell. Do not add `.testing` to this project or modify generated preview infrastructure as if it were mini app source.

Component scope matters:

- `THIS` belongs only to the current `.omc` file.
- Imported child components do not inherit the parent's `THIS`.
- Pass display data to child components with `<script name="input">...</script>` and read it through `INPUT[...]`.
- Use `isolated="false"` only when parent and child intentionally share state through `stateSet(...)` and `stateGet(...)`.
- Wrap UI that must refresh from shared state in a `controller update.on="stateChange"` with the relevant `update.keys`.

Example:

```xml
<hero-card>
  <script name="input">
    { customerName: THIS["customerName"] }
  </script>
</hero-card>
```

Inside `hero-card.omc`:

```xml
<text>{{INPUT['customerName']}}</text>
<text>{{translate(INPUT['accountStatusKey'])}}</text>
```

For shared state display:

```xml
<controller update.on="stateChange" update.keys="lastActionKey">
  <text>{{translate(stateGet('lastActionKey'))}}</text>
</controller>
```

Translations use flat snake_case keys in `translation.json`. Do not use dotted keys.

For static text, use `%translation_key`:

```xml
<text>%account_overview</text>
<button text="%submit_transfer"></button>
```

For interpolated or Mevento-computed text, call `translate(...)`:

```xml
<text>{{translate('hero_welcome')}}</text>
<text>{{translate(INPUT['accountStatusKey'])}}</text>
```

When shared state represents user-facing text, store the translation key, not the rendered label:

```xml
<script name="click_event">
  stateSet("lastActionKey", "action_send")
</script>
```

For text nodes, write inner text directly:

```xml
<text>Hello</text>
<text>{{_DATA['label']}}</text>
```

Do not put text content in the `data` attribute for new text nodes unless maintaining legacy code that already uses that form.

Use `localAsset("assets/name.png")` for files copied from `src/assets` into the bundle.

Validate changes from the project root with:

```sh
npx @ouidesigner/ouiderx run
```

Preview changes from the project root with:

```sh
npx @ouidesigner/ouiderx preview --port 4300
```

This is the default command for pure IDE-created OUIDERX projects that do not commit `node_modules`.
