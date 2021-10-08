const player = document.querySelector(".player");
const controls = document.querySelector("#video-controls");
const video = document.querySelector("#video-element");
const progress = document.querySelector("#progress-bar");
const buttonPlay = document.querySelector("#btnPlayPause");
const skipBack = document.querySelector("#timeBack");
const skipForward = document.querySelector("#timeForward");
const videoVolume = document.querySelector("#videoVolume");
const playBackRate = document.querySelector("#playBackRate");
const mytimer = document.getElementById("current-time");


video.controls = false;
function playPauseVideo() {
	const videoAction = video.paused || video.ended ? "play" : "pause";
	video[videoAction]();
	buttonPlay.classList.toggle("paused");
	videoAction == "play" ? buttonPlay.innerHTML = "pause" : buttonPlay.innerHTML = "play"
}

function updateProgressBar(e) {
	let percentage = Math.floor((100 / video.duration) * video.currentTime);
	progress.value = percentage;
	progress.setAttribute("aria-valuenow", percentage);
	mytimer.innerHTML = hms(Math.floor(video.currentTime));
}

function scan(e) {
	var percent = e.offsetX / this.offsetWidth;
	video.currentTime = percent * video.duration;
	e.target.value = Math.floor(percent / 100);
}

function videoBack(e) {
	if (!video.paused || !video.ended) {
		let timeBack = this.getAttribute("data-skip");
		console.log(timeBack, video.currentTime);
		video.currentTime -= timeBack;
	}
}


function updateVolume(e) {
	console.log(e, this, video.volume);
	var percent = Math.floor((e.offsetX / this.offsetWidth) * 100);
	console.log(percent);
	this.value = percent;
	video.volume = percent / 100;
}

function updatePlayback(e) {
	console.log(e, this, video.playBackRate);
	var percent = Math.floor((e.offsetX / this.offsetWidth) * 100);
	console.log(percent / 100);
	this.value = percent;
	video.playBackRate = 2;
}

//format time
function hms(seconds) {
	return [60]
		.reduceRight(
			(p, b) => (r) => [Math.floor(r / b)].concat(p(r % b)),
			(r) => [r]
		)(seconds)
		.map((a) => a.toString().padStart(2, "0"))
		.join(":");
}

buttonPlay.addEventListener("click", playPauseVideo);
video.addEventListener("timeupdate", updateProgressBar, false);
progress.addEventListener("click", scan);
skipBack.addEventListener("click", videoBack);

// videoVolume.addEventListener("click", updateVolume);
// playBackRate.addEventListener("click", updatePlayback);
