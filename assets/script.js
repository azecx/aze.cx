const body = document.body;
const button = document.getElementById("modeButton");

if (localStorage.getItem("light-mode") === "true") {
    body.classList.add("light-mode");
    button.innerText = "dark";
} else {
    body.classList.remove("light-mode");
    button.innerText = "light";
}

function toggleMode() {
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        button.innerText = "dark"; 
        localStorage.setItem("light-mode", "true"); 
    } else {
        button.innerText = "light"; 
        localStorage.setItem("light-mode", "false"); 
    }
}

async function loadArtists() {
    try {
        const response = await fetch('https://spotify.aze.cx/api/artists');
        const data = await response.json();
        const container = document.getElementById('artists-container');

        data.top_artists.forEach(artist => {
            // make whole artist card clickable
            const artistDiv = document.createElement('a');
            artistDiv.classList.add('artist');
            artistDiv.href = artist.spotify_url;
            artistDiv.target = "_blank";

            const img = document.createElement('img');
            img.src = artist.pfp;
            img.alt = artist.name;

            const name = document.createElement('p');
            name.textContent = artist.name;

            // append image and name inside the clickable card
            artistDiv.appendChild(img);
            artistDiv.appendChild(name);

            container.appendChild(artistDiv);
        });
    } catch (error) {
        console.error('Failed to load artists:', error);
    }
}

loadArtists();

async function loadTracks() {
    try {
        const response = await fetch('https://spotify.aze.cx/api/tracks');
        const data = await response.json();
        const container = document.getElementById('tracks-container');
        container.innerHTML = ''; // clear any previous content

        // take only top 3 tracks
        const topThree = (data.top_tracks || []).slice(0, 3);

        topThree.forEach(track => {
            const trackLink = document.createElement('a');
            trackLink.className = 'track';
            trackLink.href = track.spotify_url || '#';
            trackLink.target = "_blank";
            trackLink.rel = "noopener noreferrer";

            // cover
            const img = document.createElement('img');
            img.src = track.pfp || '';
            img.alt = track.name || 'track cover';

            // info (title + artist)
            const info = document.createElement('div');
            info.className = 'track-info';

            const title = document.createElement('p');
            title.className = 'track-title';
            title.textContent = track.name || 'Unknown title';

            const artistName = Array.isArray(track.artists)
                ? (track.artists[0] || '')
                : (track.artists || '');

            const artist = document.createElement('p');
            artist.className = 'track-artist';
            artist.textContent = artistName || 'Unknown artist';

            info.appendChild(title);
            info.appendChild(artist);

            trackLink.appendChild(img);
            trackLink.appendChild(info);

            container.appendChild(trackLink);
        });
    } catch (error) {
        console.error('Failed to load tracks:', error);
    }
}

loadTracks();
