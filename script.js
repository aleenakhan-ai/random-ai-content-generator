// DOM
const categorySelect = document.getElementById('category');
const generateBtn = document.getElementById('generate');
const resultCard = document.getElementById('result-card');
const resultText = document.getElementById('result-text');
const resultImg = document.getElementById('result-img');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');
const darkModeToggle = document.getElementById('dark-mode');

// Fetch with timeout (helper)
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

  if (category === 'meme') {
    fetchWithTimeout('https://meme-api.com/gimme')
      .then(data => {
        resultText.textContent = data.title || "Random Meme 😎";
        if (data.url) {
          resultImg.src = data.url;
          resultImg.classList.remove('hidden');
        }
      })
      .catch(() => {
        resultText.textContent = "Couldn't load a meme. Try again!";
      });

  } else if (category === 'quote') {
    // Better quote API: QuoteSlate
    fetchWithTimeout('https://quoteslate.vercel.app/api/quotes/random')
      .then(data => {
        if (data && data.quote && data.author) {
          resultText.textContent = `"${data.quote}" — ${data.author}`;
        } else {
          throw new Error("No data");
        }
      })
      .catch(() => {
        resultText.textContent = "Keep going, you're doing great! 💪";
      });

  } else if (category === 'text') {
    // For text image, reuse quote API if needed
    fetchWithTimeout('https://quoteslate.vercel.app/api/quotes/random')
      .then(data => {
        if (data && data.quote) {
          resultText.textContent = data.quote;
        } else {
          throw new Error("No data");
        }
      })
      .catch(() => {
        resultText.textContent = "Stay positive and keep learning! 😊";
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
darkModeToggle.addEventListener('change', () => document.body.classList.toggle('dark'));
