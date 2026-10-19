import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop Hero
  const pageDesk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesk.goto('http://localhost:3000/index.html');
  await pageDesk.waitForTimeout(600);
  await pageDesk.screenshot({ path: 'projects/casagrande/04_prototype/screenshots/v10_hero_desktop.png' });

  // 2. Desktop Drawer Open
  await pageDesk.click('.js-drawer-open');
  await pageDesk.waitForTimeout(500);
  await pageDesk.screenshot({ path: 'projects/casagrande/04_prototype/screenshots/v10_drawer_desktop.png' });

  // Close drawer
  await pageDesk.click('.drawer-close-btn');
  await pageDesk.waitForTimeout(400);

  // 3. Desktop Footer
  const footerEl = await pageDesk.$('.site-footer');
  if (footerEl) {
    await footerEl.scrollIntoViewIfNeeded();
    await pageDesk.waitForTimeout(400);
    await pageDesk.screenshot({ path: 'projects/casagrande/04_prototype/screenshots/v10_footer_desktop.png' });
  }

  // 4. Mobile Hero & Drawer
  const pageMob = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await pageMob.goto('http://localhost:3000/index.html');
  await pageMob.waitForTimeout(600);
  await pageMob.screenshot({ path: 'projects/casagrande/04_prototype/screenshots/v10_hero_mobile.png' });

  await pageMob.click('.js-drawer-open');
  await pageMob.waitForTimeout(500);
  await pageMob.screenshot({ path: 'projects/casagrande/04_prototype/screenshots/v10_drawer_mobile.png' });

  console.log('All validation screenshots captured successfully!');
  await browser.close();
})();
