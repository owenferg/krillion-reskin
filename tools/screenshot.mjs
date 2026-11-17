// Screenshot krillion.io at desktop and mobile sizes, optionally with the
// userstyle injected, for before/after comparisons.
//
//   node tools/screenshot.mjs [--style] [--path /unlimited/classic] [--out screenshots]
import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    style: { type: 'boolean', default: false },
    path: { type: 'string', default: '/' },
    out: { type: 'string', default: 'screenshots' },
  },
});

// Pull the CSS out of the @-moz-document block so it can be injected directly.
function userCss() {
  const src = readFileSync(new URL('../krillion.user.css', import.meta.url), 'utf8');
  const start = src.indexOf('{', src.indexOf('@-moz-document'));
  return src.slice(start + 1, src.lastIndexOf('}'));
}

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

mkdirSync(values.out, { recursive: true });
const browser = await chromium.launch();
const suffix = values.style ? 'after' : 'before';

for (const [name, viewport] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
  await page.goto(new URL(values.path, 'https://krillion.io').href, { waitUntil: 'load' });
  if (values.style) await page.addStyleTag({ content: userCss() });
  await page.waitForTimeout(6000); // let the intro animation settle
  const file = `${values.out}/${name}-${suffix}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log(file);
}

await browser.close();
