// DOM
const categorySelect = document.getElementById('category');
const generateBtn = document.getElementById('generate');
const resultCard = document.getElementById('result-card');
const resultText = document.getElementById('result-text');
const resultImg = document.getElementById('result-img');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');
const darkModeToggle = document.getElementById('dark-mode');

// Fetch with timeout
function fetchWithTimeout(url, timeout = 4000) {
  return Promise.race([
    fetch(url).then(res => res.json()),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
  ]);
}

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
        resultText.textContent = data.title || "Meme 😎";
        if (data.url) {
          resultImg.src = data.url;
          resultImg.classList.remove('hidden');
        }
      })
      .catch(() => {
        resultText.textContent = "Couldn't load a meme. Try again!";
      });

  } else if (category === 'quote') {
    // Better quote API
    fetchWithTimeout('https://www.quotify.top/api/random')
      .then(data => {
        // Response from Quotify → "quote" field
        resultText.textContent = data.quote || "Keep smiling! 😊";
      })
      .catch(() => {
        resultText.textContent = "Couldn't fetch a quote. Try again!";
      });

  } else if (category === 'text') {
    // ZenQuotes image — gives image URL directly
    fetchWithTimeout('https://zenquotes.io/api/random')
      .then(data => {
        let q = data[0]?.q || "Stay positive!";
        let a = data[0]?.a ? ` — ${data[0].a}` : "";
        resultText.textContent = `"${q}"${a}`;
      })
      .catch(() => {
        resultText.textContent = "Stay positive! 🌟";
      });
  }
});

// Copy
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(resultText.textContent)
    .then(() => alert('Copied to clipboard!'));
});

// Download PNG
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

// Dark Mode
darkModeToggle.addEventListener('change', () => document.body.classList.toggle('dark'));
