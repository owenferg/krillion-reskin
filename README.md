# krillion-reskin

A UI overhaul for [Krillion](https://krillion.io), packaged as a [Stylus](https://add0n.com/stylus.html) userstyle.

## Install

1. Install the Stylus extension ([Chrome](https://chromewebstore.google.com/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne), [Firefox](https://addons.mozilla.org/firefox/addon/styl-us/)).
2. Open [krillion.user.css](https://raw.githubusercontent.com/owenferg/krillion-reskin/main/krillion.user.css) and click **Install style**.

Stylus checks this repo for updates, so new versions arrive automatically. Bump `@version` in the header when releasing changes.

## Development

The game's UI is plain HTML layered over two canvases (the sea and the fish), so CSS can restyle all of it. Prefer the stable `.ds-*` classes (`.ds-hud`, `.ds-begin-btn`, ...). CSS-module classes like `SiteMenu-module__22gvxa__trigger` have a hash that changes on rebuilds, so match them with `[class*="SiteMenu-module__"][class*="__trigger"]`.

To compare before and after:

```sh
npm install
npx playwright install chromium
npm run before                 # screenshots/desktop-before.png, mobile-before.png
npm run after                  # same, with krillion.user.css injected
npm run after -- --path /unlimited/classic
```
