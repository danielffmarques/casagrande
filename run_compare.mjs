import fs from 'fs';
import { chromium } from 'playwright';

const html = `<!DOCTYPE html>
<html>
<body style='background:#111;color:#eee;font-family:sans-serif;padding:20px;'>
<h2>hero_inverno_neve_branca.jpg:</h2>
<img src='assets/img/hero_inverno_neve_branca.jpg' style='max-width:700px;display:block;margin-bottom:20px;' />
<h2>casagrande_neve_17.jpg:</h2>
<img src='assets/img/casagrande_neve_17.jpg' style='max-width:700px;display:block;margin-bottom:20px;' />
<h2>casagrande_neve_0.jpg:</h2>
<img src='assets/img/casagrande_neve_0.jpg' style='max-width:700px;display:block;margin-bottom:20px;' />
<h2>torre_neve.jpg:</h2>
<img src='assets/img/torre_neve.jpg' style='max-width:700px;display:block;margin-bottom:20px;' />
</body>
</html>`;

fs.writeFileSync('projects/casagrande/04_prototype/compare_hero.html', html);

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 900, height: 1800 } });
  await page.goto('http://localhost:3000/compare_hero.html');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'projects/casagrande/04_prototype/screenshots/compare_hero.png', fullPage: true });
  console.log('Saved compare_hero.png');
  await browser.close();
})();
