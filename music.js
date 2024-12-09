const clientId = '26da6796a9aa4653bbbddf65afbbc617'; // Replace with your Client ID
const secretclientId = 'c052af15f7504bbdb45c676f0c755dfd'; // Replace with your Client ID
const redirectUri = 'http://127.0.0.1:5500'; // Ensure this matches the URI added in Spotify dashboard
let accessToken = '';
let isPlaying = false;

// Login to Spotify
function loginToSpotify() {
  const scopes = 'user-read-playback-state user-modify-playback-state streaming';
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

  window.location = authUrl;
}

// Extract token from URL after login
function getAccessTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  accessToken = params.get('access_token');
  if (accessToken) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('player-controls').style.display = 'block';
    fetchCurrentTrack();
  }
}

// Fetch currently playing track
async function fetchCurrentTrack() {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (response.ok) {
    const data = await response.json();
    const trackName = data.item.name;
    document.getElementById('track-name').textContent = trackName;
  } else {
    document.getElementById('track-name').textContent = 'None';
  }
}

// Play/Pause playback
async function playPause() {
  const playPauseEndpoint = isPlaying
    ? 'https://api.spotify.com/v1/me/player/pause'
    : 'https://api.spotify.com/v1/me/player/play';
  await fetch(playPauseEndpoint, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  isPlaying = !isPlaying;
}

// Next track
async function nextTrack() {
  await fetch('https://api.spotify.com/v1/me/player/next', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  fetchCurrentTrack();
}

// Previous track
async function previousTrack() {
  await fetch('https://api.spotify.com/v1/me/player/previous', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  fetchCurrentTrack();
}

// Initialize the app
window.onload = () => {
  getAccessTokenFromUrl();
};
