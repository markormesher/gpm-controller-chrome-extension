var currentlyPlaying = true;

document.addEventListener('DOMContentLoaded', function() {
	// get views
	var prevButton = document.getElementById('prev-btn');
	var playPauseButton = document.getElementById('play-pause-btn');
	var nextButton = document.getElementById('next-btn');

	// TODO: get current playing status
	currentlyPlaying = true;
	updateIcon();

	// play button listener
	playPauseButton.addEventListener('click', function() {
		// TODO: do something with the tab
		withGpmTab(function(tab) {
			// click the play/pause button
			chrome.tabs.executeScript(tab.id, {file: "inject.js"});

			// TODO: refresh play/pause status
			currentlyPlaying = !currentlyPlaying;

			// toggle play/pause icon
			updateIcon();
		});
	}, false);

}, false);

// finds the GPM tab and runs a callback with it
function withGpmTab(callback) {
	// loop all tabs
	chrome.tabs.query({}, function(tabs) {
		for (var i = 0, n = tabs.length; i < n; ++i) {
			// check for the GPM tab
			if (~tabs[i].url.indexOf('play.google.com/music')) {
				// run callback
				callback(tabs[i]);

				// don't check any more tabs
				break;
			}
		}
	});
}

// sets the correct icon for the current play status
function updateIcon() {
	chrome.browserAction.setIcon({path: 'images/' + (currentlyPlaying ? 'icon-pause.png' : 'icon-play.png')});
}