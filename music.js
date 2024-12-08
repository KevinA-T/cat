// Create an audio element
const audioPlayer = new Audio();

// List of calming music tracks
const tracks = [{ name: "Relaxing Waves", src: "audio/LOFI.mp3" },{ name: "Calm Piano", src: "audio/piano relax.mp3" },{ name: "Forest Ambience", src: "audio/relax piano.mp3" }];
// Get saved track and play state from localStorage
const savedTrackIndex = localStorage.getItem("currentTrackIndex");
const savedPlayState = localStorage.getItem("isPlaying");

// Set initial track index to the saved track or default to the first track
let currentTrackIndex = savedTrackIndex ? parseInt(savedTrackIndex) : 0;
audioPlayer.src = tracks[currentTrackIndex].src;

// If there was a saved play state, play the audio
if (savedPlayState === "true") {
  audioPlayer.play();
} else {
  audioPlayer.pause();
}

// Loop the audio for continuous play
audioPlayer.loop = true;

// Function to change track based on user selection
function changeTrack(trackIndex) {
  currentTrackIndex = trackIndex;
  localStorage.setItem("currentTrackIndex", currentTrackIndex); // Save the track index
  audioPlayer.src = tracks[currentTrackIndex].src; // Change the track
  audioPlayer.play(); // Start playing the new track
}

// Event listener for the audio playing
audioPlayer.addEventListener("play", () => {
  localStorage.setItem("isPlaying", "true"); // Mark the audio as playing in localStorage
});

// Event listener for the audio paused
audioPlayer.addEventListener("pause", () => {
  localStorage.setItem("isPlaying", "false"); // Mark the audio as paused in localStorage
});

// Function to pause the audio
function togglePause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
}

// Event listener for the page load to make sure the audio continues when the page is loaded
window.addEventListener("load", function () {
  if (audioPlayer.src && localStorage.getItem("isPlaying") === "true") {
    audioPlayer.play();
  }
});

// Optional: Pause the music when user navigates away (if needed)
window.addEventListener("beforeunload", function () {
  audioPlayer.pause();
});
