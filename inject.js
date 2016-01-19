function clickPlayPause() {
	var btn = document.querySelectorAll("[data-id='play-pause']")[0];
	btn.click();
}

function checkCurrentPlayPauseStatus() {
	var btn = document.querySelectorAll("[data-id='play-pause']")[0];
	return btn.title != "Play";
}