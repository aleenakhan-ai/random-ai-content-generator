const categorySelect = document.getElementById('category');
const generateBtn = document.getElementById('generate');
const resultCard = document.getElementById('result-card');
const resultText = document.getElementById('result-text');
const resultImg = document.getElementById('result-img');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');
const darkModeToggle = document.getElementById('dark-mode');

// Fallback arrays
const quotesFallback = [
  "Believe in yourself! 🌟",
  "Code is fun! 😎",
  "Never give up! 💪"
];
const textsFallback = [
  "Stay Positive! 😄",
  "Dream Big! 🚀",
  "Keep Smiling! 😊"
];

// Helper function for random array item
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Fetch with timeout
function fetchWithTimeout(url, timeout = 4000) {
  return Promise.race([
    fetch(url).then(res => res.json()),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
  ]);
}

// Generate content
generateBtn.addEventListener('click', () => {
  const category = categorySelect.value;

  // Show loading
  resultCard.classList.remove('hidden');
  resultText.textContent = 'Loading...';
  resultImg.src = '';
  resultImg.classList.add('hidden');

  if(category === 'meme') {
    fetchWithTimeout('https://meme-api.com/gimme')
      .then(data => {
        resultText.textContent = data.title || "Random Meme 😎";
        if(data.url){
          resultImg.src = data.url;
          resultImg.classList.remove('hidden');
        }
      })
      .catch(() => {
        resultText.textContent = "Failed to fetch meme. Try again!";
      });

  } else if(category === 'quote') {
    fetchWithTimeout('https://api.quotable.io/random')
      .then(data => {
        resultText.textContent = `"${data.content}" — ${data.author}`;
      })
      .catch(() => {
        resultText.textContent = getRandomItem(quotesFallback);
      });

  } else if(category === 'text') {
    fetchWithTimeout('https://api.adviceslip.com/advice')
      .then(data => {
        resultText.textContent = `"${data.slip.advice}"`;
      })
      .catch(() => {
        resultText.textContent = getRandomItem(textsFallback);
      });
  }
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
  canvas.height = 250;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = getComputedStyle(document.body).backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getComputedStyle(document.body).color;
  ctx.font = "20px Arial";
  ctx.fillText(resultText.textContent, 20, 120);
  const link = document.createElement('a');
  link.download = 'random-content.png';
  link.href = canvas.toDataURL();
  link.click();
});

// Dark mode toggle
darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});
