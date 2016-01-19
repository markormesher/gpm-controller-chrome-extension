var currentlyPlaying, prevButton, playPauseButton, nextButton;

document.addEventListener('DOMContentLoaded', function() {
	// get views
	prevButton = document.getElementById('prev-btn');
	playPauseButton = document.getElementById('play-pause-btn');
	nextButton = document.getElementById('next-btn');

	// inject our script...
	withGpmTab(function(tab) {
		// check for null
		if (tab == null) {
			document.getElementById('container').innerHTML = "GPM not detected.";
			return;
		}

		chrome.tabs.executeScript(tab.id, {file: 'inject.js'}, function() {
			// ...then continue setup

			// get current playing status
			checkCurrentPlayPauseStatus(function (playing) {
				currentlyPlaying = playing;
				updatePlayPauseIcon();
			});

			// play button listener
			playPauseButton.addEventListener('click', function() {
				withGpmTab(function(tab) {
					// send the event
					chrome.tabs.executeScript(tab.id, {code: 'clickPlayPause();'});

					// refresh play/pause status
					currentlyPlaying = !currentlyPlaying;
					updatePlayPauseIcon();
				});
			}, false);

			// prev button listener
			prevButton.addEventListener('click', function() {
				withGpmTab(function(tab) {
					// send the event
					chrome.tabs.executeScript(tab.id, {code: 'clickPrev();'});

					// refresh play/pause status
					currentlyPlaying = true;
					updatePlayPauseIcon();
				});
			}, false);

			// next button listener
			nextButton.addEventListener('click', function() {
				withGpmTab(function(tab) {
					// send the event
					chrome.tabs.executeScript(tab.id, {code: 'clickNext();'});

					// refresh play/pause status
					currentlyPlaying = true;
					updatePlayPauseIcon();
				});
			}, false);
		});
	});
}, false);

// finds the GPM tab and runs a callback with it
function withGpmTab(callback) {
	// loop all tabs
	chrome.tabs.query({}, function(tabs) {
		for (var i = 0, n = tabs.length; i < n; ++i) {
			// check for the GPM tab
			if (~tabs[i].url.indexOf('play.google.com/music')) {
				callback(tabs[i]);
				return;
			}
		}

		// default
		callback(null);
	});
}

// sets the correct icon for the current play status
function updatePlayPauseIcon() {
	chrome.browserAction.setIcon({path: 'images/' + (currentlyPlaying ? 'icon-pause.png' : 'icon-play.png')});
	playPauseButton.src = 'images/' + (currentlyPlaying ? 'btn-pause.png' : 'btn-play.png');
}

// check the current playing status
function checkCurrentPlayPauseStatus(callback) {
	withGpmTab(function (tab) {
		chrome.tabs.executeScript(tab.id, {code: 'checkCurrentPlayPauseStatus();'}, function (result) {
			callback(result);
		});
	});
}