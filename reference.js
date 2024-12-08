// references-hf-script.js

const form = document.getElementById('referenceForm');
const topicInput = document.getElementById('topic');
const loadingIndicator = document.getElementById('loading');
const referencesList = document.getElementById('referencesList');

// Hugging Face API endpoint and token
const HF_API_URL = 'https://api-inference.huggingface.co/models/gpt2'; // Use GPT-2 model
const HF_API_TOKEN = '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'; // Replace with your Hugging Face API token

// Fetch references from Hugging Face API
async function fetchReferences(topic) {
  try {
    loadingIndicator.style.display = 'block';

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Provide study material references and insights about: ${topic}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Parse and display suggestions
    const suggestions = data[0]?.generated_text.split('\n').filter((line) => line.trim() !== '') || [];
    referencesList.innerHTML = '';
    if (suggestions.length === 0) {
      referencesList.innerHTML = '<li>No references found. Try a different topic.</li>';
    } else {
      suggestions.forEach((suggestion) => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        referencesList.appendChild(li);
      });
    }
  } catch (error) {
    referencesList.innerHTML = '<li>Error fetching references. Please try again later.</li>';
    console.error('Error:', error);
  } finally {
    loadingIndicator.style.display = 'none';
  }
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const topic = topicInput.value.trim();
  if (topic) {
    fetchReferences(topic);
  }
});
