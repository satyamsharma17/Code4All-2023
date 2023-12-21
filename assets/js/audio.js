function startMusic() {
    var audio = document.getElementById('valorant-music');
    var currentVolume = 1;
    var isFadingOut = false;

    // Check if the user is on the homepage or searching the specific domain
    var isHomePage = window.location.pathname === '/' || window.location.pathname === '' || window.location.pathname === '/index.html' || window.location.hostname.includes('code4all.club');

    // Check if the user is in the music section
    var isInMusicSection = document.getElementById('hero-scene') !== null;

    // Start the music if on the homepage and in the music section
    if (isHomePage && isInMusicSection) {
        audio.play();
    }

    // Event listener for mouseover to start playing music
    document.addEventListener('mousemove', function () {
        if (isHomePage && isInMusicSection && audio.paused) {
            // Start playing music if on the homepage, in the music section, and music is paused
            audio.play();
        }
    });

    window.addEventListener('scroll', function () {
        if (isHomePage && isInMusicSection) {
            var scrollDirection = this.oldScroll > window.scrollY ? 'up' : 'down';
            this.oldScroll = window.scrollY;

            var fadeOutFactor = 1 - window.scrollY / window.innerHeight;
            currentVolume = Math.max(0, Math.min(1, fadeOutFactor));

            if (scrollDirection === 'down') {
                // Fade out when scrolling down
                isFadingOut = true;
            } else {
                // Fade in when scrolling up and not already faded out
                if (isFadingOut && currentVolume > 0.1) {
                    audio.play();
                    isFadingOut = false;
                }
            }

            audio.volume = currentVolume;
            if (!audio.paused && window.scrollY > 0) {
                if (currentVolume < 0.1) {
                    audio.pause();
                }
            }
        }
    });

    // Reload the page and open as code4all.club/index.html when clicking on the logo
    var logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('click', function () {
            // Reload the page and update the URL
            var newUrl = window.location.protocol + '//' + window.location.host + '/index.html';
            history.replaceState(null, null, newUrl);
            location.reload();
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    startMusic(); // Call startMusic directly on DOMContentLoaded
});

window.onload = startMusic;
window.onpageshow = startMusic;