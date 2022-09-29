
let input = document.getElementById("music-search")
let form = document.getElementById("form")
let searchResults = document.getElementById("search-results")
let audio = document.getElementById("audio-player")

form.addEventListener("submit", (event) => {
    let search = input.value;
    let url = `https://itunes.apple.com/search?term=${search}&limit=20`
    event.preventDefault();

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (music) {
            searchResults.innerText = '';
            buildResults(music.results);
        })
})

function buildResults(itunesArray) {
    for (let itunes of itunesArray) {
        let resultsDiv = document.createElement('div')
        let picture = document.createElement('img')
        let title = document.createElement('h3')
        let artist = document.createElement('h4')
        resultsDiv.classList.add("resultsBorder", "results");
        title.classList.add('songTitle')

        picture.src = `${itunes.artworkUrl100}`
        title.innerText = `${itunes.trackName}`
        artist.innerText = `${itunes.artistName}`

        resultsDiv.addEventListener("click", (event) => {
            audio.src = ''
            audio.src = `${itunes.previewUrl}`
            audio.volume = 0.1;
        })

        resultsDiv.appendChild(picture);
        resultsDiv.appendChild(title);
        resultsDiv.appendChild(artist);
        searchResults.appendChild(resultsDiv)

        resultsDiv.addEventListener("mouseover", (event) =>{
            resultsDiv.classList.add('hover')
        })
        resultsDiv.addEventListener("mouseout", (event) =>{
            resultsDiv.classList.remove('hover')
        })
        resultsDiv.addEventListener("mousedown", (event) =>{
            resultsDiv.classList.remove('resultsBorder')
        })
        resultsDiv.addEventListener("mouseup", (event) =>{
            resultsDiv.classList.add('resultsBorder')
        })
    
    
    }
}