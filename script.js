const playlist = [
	{
		title: "Abhi to party",
		artist: "Badshah",
		src: "./songs/song1.mp3",
		duration: "3:33",
	},
	{
		title: "Aoage tum kabhi",
		artist: "Raman Negi",
		src: "./songs/song3.mp3",
		duration: "3:50",
	},
];

let currentSongIndex = 0;
const audio = document.getElementById("audio");
const playlistEl = document.getElementById("playlist");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");

// Load playlist
playlist.forEach((song, index) => {
	const li = document.createElement("li");
	li.textContent = `${song.title} - ${song.artist} (${song.duration})`;
	li.addEventListener("click", () => loadSong(index));
	playlistEl.appendChild(li);
});

// Load a song
function loadSong(index) {
	currentSongIndex = index;
	const song = playlist[index];
	audio.src = song.src;
	songTitle.textContent = song.title;
	songArtist.textContent = song.artist;
	audio.play();
	playBtn.textContent = "⏸️";
}

// Play/Pause toggle
playBtn.addEventListener("click", () => {
	if (audio.paused) {
		audio.play();
		playBtn.textContent = "⏸️";
	} else {
		audio.pause();
		playBtn.textContent = "▶️";
	}
});

// Next song
nextBtn.addEventListener("click", () => {
	currentSongIndex = (currentSongIndex + 1) % playlist.length;
	loadSong(currentSongIndex);
});

// Previous song
prevBtn.addEventListener("click", () => {
	currentSongIndex =
		(currentSongIndex - 1 + playlist.length) % playlist.length;
	loadSong(currentSongIndex);
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
	const { currentTime, duration } = audio;
	progress.value = (currentTime / duration) * 100 || 0;
	currentTimeEl.textContent = formatTime(currentTime);
	durationEl.textContent = formatTime(duration);
});

// Seek in song
progress.addEventListener("input", () => {
	audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volumeSlider.addEventListener("input", () => {
	audio.volume = volumeSlider.value;
});

// Format time in mm:ss
function formatTime(time) {
	if (isNaN(time)) return "0:00";
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Auto next song when ended
audio.addEventListener("ended", () => {
	nextBtn.click();
});
