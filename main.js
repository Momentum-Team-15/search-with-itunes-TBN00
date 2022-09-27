const url = 'https://itunes.apple.com/search?term=migos&limit=20'
let searchResults = document.querySelector("#search-results")

fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (musics) {
        buildResults(musics.results);
    })

function buildResults(itunesArray) {
    for (let itunes of itunesArray) {
        let resultsDiv = document.createElement('div')
        let picture = document.createElement('img')
        let title = document.createElement('h3')
        let artist = document.createElement('h4')
        resultsDiv.classList.add("results");


        picture.src = `${itunes.artworkUrl100}`
        title.innerText = `${itunes.trackName}`
        artist.innerText = `${itunes.artistName}`



        resultsDiv.appendChild(picture);
        resultsDiv.appendChild(title);
        resultsDiv.appendChild(artist);
        searchResults.appendChild(resultsDiv);


    }
}

