// Sample data
const memes = [
  "When you code all night and it finally works 😎",
  "I don't always test my code, but when I do, I do it in production.",
  "Programmer: A machine that turns coffee into code."
];

const quotes = [
  "Believe you can and you're halfway there.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "Simplicity is the soul of efficiency."
];

const texts = [
  "Stay Positive!",
  "Dream Big, Code Bigger!",
  "Random Fun Text 😜"
];

// Elements
const categorySelect = document.getElementById('category');
const generateBtn = document.getElementById('generate');
const resultCard = document.getElementById('result-card');
const resultText = document.getElementById('result-text');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');
const darkModeToggle = document.getElementById('dark-mode');

// Generate content
generateBtn.addEventListener('click', () => {
  let category = categorySelect.value;
  let item;
  if (category === 'meme') item = memes[Math.floor(Math.random() * memes.length)];
  else if (category === 'quote') item = quotes[Math.floor(Math.random() * quotes.length)];
  else item = texts[Math.floor(Math.random() * texts.length)];

  resultText.textContent = item;
  resultCard.classList.remove('hidden');
});

// Copy to clipboard
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(resultText.textContent)
    .then(() => alert('Copied to clipboard!'));
});

// Download as PNG
downloadBtn.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = getComputedStyle(document.body).backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getComputedStyle(document.body).color;
  ctx.font = "20px Arial";
  ctx.fillText(resultText.textContent, 20, 100);
  const link = document.createElement('a');
  link.download = 'random-content.png';
  link.href = canvas.toDataURL();
  link.click();
});

// Dark mode toggle
darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});
