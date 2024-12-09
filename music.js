// Music player functionality
const trackSelect = document.getElementById("trackSelect");
const trackName = document.getElementById("track-name");

// Audio tracks (Replace with your actual file paths)
const tracks = [
  { name: "Lo-fi", src: "audio/LOFI.mp3" },
  { name: "Piano 1", src: "audio/piano relax.mp3" },
  { name: "Piano 2", src: "audio/relax piano.mp3" }
];

// Create an audio element
let audio = new Audio();
audio.loop = true; // Loop the music by default

// Play/Pause button
let isPlaying = false;
const playPauseButton = document.createElement("button");
playPauseButton.textContent = "Play"; // Default state: Play
playPauseButton.style.position = "fixed";
playPauseButton.style.bottom = "120px";
playPauseButton.style.right = "20px";
playPauseButton.style.padding = "10px 15px";
playPauseButton.style.border = "none";
playPauseButton.style.borderRadius = "5px";
playPauseButton.style.backgroundColor = "#4a90e2";
playPauseButton.style.color = "#fff";
playPauseButton.style.cursor = "pointer";
playPauseButton.style.fontSize = "16px";

// Function to toggle play/pause
function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playPauseButton.textContent = "Play";
  } else {
    audio.play().catch((error) => console.error("Error playing audio:", error));
    playPauseButton.textContent = "Pause";
  }
  isPlaying = !isPlaying;
}

// Attach event listener to the play/pause button
playPauseButton.addEventListener("click", togglePlayPause);
document.body.appendChild(playPauseButton);

// Function to change the music track
function changeTrack(index) {
  const selectedTrack = tracks[index];
  if (selectedTrack) {
    audio.src = selectedTrack.src;
    trackName.textContent = `Current Track: ${selectedTrack.name}`;
    isPlaying = false; // Reset to paused state
    playPauseButton.textContent = "Play"; // Reset button to Play state
  }
}

// Initialize with the first track but do not auto-play
document.addEventListener("DOMContentLoaded", () => {
  changeTrack(0); // Load the first track
});
