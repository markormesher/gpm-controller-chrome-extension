function clickPlayPause() {
	var btn = document.querySelectorAll("[data-id='play-pause']")[0];
	btn.click();
}

function clickPrev() {
	var btn = document.querySelectorAll("[data-id='rewind']")[0];
	btn.click();
}

function clickNext() {
	var btn = document.querySelectorAll("[data-id='forward']")[0];
	btn.click();
}

function checkCurrentPlayPauseStatus() {
	var btn = document.querySelectorAll("[data-id='play-pause']")[0];
	return btn.title != "Play";
}