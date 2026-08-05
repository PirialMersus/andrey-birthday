const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 800 });

  const path = 'http://localhost:8080/index.html';
  console.log('Loading path via HTTP:', path);

  try {
    await page.goto(path, { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.screenshot({ path: 'result.png' });
    console.log('Screenshot saved to: ' + __dirname + '/result.png');
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
})();
