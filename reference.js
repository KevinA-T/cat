// references-hf-script.js

const form = document.getElementById('referenceForm');
const topicInput = document.getElementById('topic');
const loadingIndicator = document.getElementById('loading');
const referencesList = document.getElementById('referencesList');

// OpenAI API endpoint and token
const apiUrl = "https://api.openai.com/v1/chat/completions"; // URL endpoint OpenAI
const OPENAI_API_TOKEN = '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'; // Replace with your OpenAI API key

// Fetch references from OpenAI API
async function fetchReferences(topic) {
  try {
    loadingIndicator.style.display = 'block';

    const response = await fetch(apiUrl), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Use ChatGPT model
        messages: [
          { role: 'system', content: 'You are a helpful assistant providing study material references and insights.' },
          { role: 'user', content: `Provide study material references and insights about: ${topic}` },
        ],
        max_tokens: 500, // Limit response length
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Parse and display suggestions
    const suggestions = data.choices[0]?.message.content.split('\n').filter((line) => line.trim() !== '') || [];
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
