const { createWorker } = require('tesseract.js');
const path = require('path');

async function main() {
  const worker = await createWorker('eng');
  
  // OCR the full reference image directly
  console.log('Recognizing full reference image...');
  const res = await worker.recognize(path.resolve(__dirname, '../reference/askari-academy-desktop.png'));
  console.log('=== FULL OCR RESULT ===');
  console.log(res.data.text);

  await worker.terminate();
}

main().catch(console.error);
