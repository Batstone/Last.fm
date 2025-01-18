interface LastFm {
  artist: string;
  album: string;
  name: string;
  date: string;
  image: string;
}

const lastFMData = async (): Promise<LastFm[]> => {
  const response = await fetch("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=rj&api_key=YOUR_API_KEY&format=json ");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  const tracks: LastFm[] = data.recenttracks.track.slice(0, 15).map((track: any) => ({
    artist: track.artist["#text"],
    album: track.album["#text"],
    name: track.name,
    date: track.date["#text"],
    image: track.image[1]["#text"],
  }));

  return tracks;
};

const renderLastFm = async () => {
  const tracks = await lastFMData();

  tracks.forEach((el) => {
    const track = document.createElement("li");
    track.classList.add("news__listening-item");
    track.innerHTML = `
      <img src="${el.image}" alt="${el.album} cover" class="news__listening-image" />
      <div class="news__listening-content">
        <p class="news__listening-title">${el.name}</p>
        <p class="news__listening-artist">${el.artist}</p>
        <p class="news__listening-album">${el.album}</p>
        <p class="news__listening-date">${el.date}</p>
      </div>
    `;
    listeningList.appendChild(track);
  });
};

// renderLastFm();
