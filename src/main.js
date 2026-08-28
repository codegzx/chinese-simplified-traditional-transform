import OpenCC from 'opencc-js';
import './style.css';

const fileInput = document.querySelector('#fileInput');
const convertBtn = document.querySelector('#convertBtn');
const downloadBtn = document.querySelector('#downloadBtn');
const sourceText = document.querySelector('#sourceText');
const resultText = document.querySelector('#resultText');
const converter = OpenCC.Converter({ from: 't', to: 'cn' });

let fileName = 'converted.txt';

fileInput.addEventListener('change', async () => {
  const file = fileInput.files?.[0];
  sourceText.value = '';
  resultText.value = '';
  convertBtn.disabled = true;
  downloadBtn.disabled = true;

  if (!file) return;
  if (!file.name.toLowerCase().endsWith('.txt')) return;

  fileName = file.name.replace(/\.txt$/i, '_simplified.txt');
  sourceText.value = await file.text();
  convertBtn.disabled = sourceText.value.length === 0;
});

convertBtn.addEventListener('click', () => {
  resultText.value = converter(sourceText.value);
  downloadBtn.disabled = resultText.value.length === 0;
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([resultText.value], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
});
