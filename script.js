const texts = [
  "Stay Positive! 🌟",
  "Dream Big, Code Bigger! 🚀",
  "Random Fun Text 😜",
  "Keep Smiling! 😄",
  "You Got This! 💪"
];

const categorySelect = document.getElementById('category');
const generateBtn = document.getElementById('generate');
const resultCard = document.getElementById('result-card');
const resultText = document.getElementById('result-text');
const resultImg = document.getElementById('result-img');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');
const darkModeToggle = document.getElementById('dark-mode');

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

generateBtn.addEventListener('click', () => {
  const category = categorySelect.value;

  resultText.textContent = '';
  resultImg.src = '';
  resultImg.classList.add('hidden');
  resultCard.classList.remove('hidden');

  if (category === 'meme') {
    fetch('https://meme-api.com/gimme')
      .then(res => res.json())
      .then(data => {
        resultText.textContent = data.title;
        if (data.url) {
          resultImg.src = data.url;
          resultImg.classList.remove('hidden');
        }
      })
      .catch(() => {
        resultText.textContent = "Failed to fetch meme. Try again!";
      });
  } else if (category === 'quote') {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => {
        resultText.textContent = data.content;
      })
      .catch(() => {
        resultText.textContent = getRandomItem(texts);
      });
  } else {
    resultText.textContent = getRandomItem(texts);
  }
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(resultText.textContent)
    .then(() => alert('Copied to clipboard!'));
});

downloadBtn.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 250;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = getComputedStyle(document.body).backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getComputedStyle(document.body).color;
  ctx.font = "22px Arial";
  ctx.fillText(resultText.textContent, 20, 120);
  const link = document.createElement('a');
  link.download = 'random-content.png';
  link.href = canvas.toDataURL();
  link.click();
});

darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});
