const { createWorker } = require('tesseract.js');
const path = require('path');

async function main() {
  const worker = await createWorker('eng');
  
  const strip = await worker.recognize(path.resolve(__dirname, '../reference/strip-crop.png'));
  console.log('=== STRIP TEXT ===');
  console.log(strip.data.text.trim());
  
  const hero = await worker.recognize(path.resolve(__dirname, '../reference/hero-text-crop.png'));
  console.log('=== HERO TEXT ===');
  console.log(hero.data.text.trim());

  await worker.terminate();
}

main().catch(console.error);
