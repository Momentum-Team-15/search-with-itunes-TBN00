//Declaring variables for user input in the form
let input = document.getElementById("music-search")
let form = document.getElementById("form")
//Declaring variables to hold search results and link to audio
let searchResults = document.getElementById("search-results")
let audio = document.getElementById("audio-player")
//Declaring variable for radio buttons
let radioButtons = document.querySelectorAll('input[name="radioB"]');

//Adding event listener to form to gather user input
form.addEventListener("submit", (event) => {
    let search = input.value;
    //Declaring base url that the search will add to
    let url = `https://itunes.apple.com/search?term=${search}`
    //Execute a for of loop to check each radio button and get its value
    for (let radioButton of radioButtons){
        if (radioButton.checked){
            url+= `&entity=song&attribute=${radioButton.value}&limit=20`
        }
    }
    event.preventDefault();

    //Using fetch function and user input to gather info from iTunes API
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (music) {
            //clearing search results before calling function
            searchResults.innerText = '';
            //calling buildResults function to send search results to page
            buildResults(music.results);
            console.log(music.results);
        })
})

//creation of function buildResults
function buildResults(itunesArray) {
    if (itunesArray.length === 0){
        alert('No results, please try again');
    } else {
    for (let itunes of itunesArray) {
        let resultsDiv = document.createElement('div')
        let picture = document.createElement('img')
        let title = document.createElement('h3')
        let artist = document.createElement('h4')
        let album = document.createElement('h4')
        title.classList.add('textBorder')
        artist.classList.add('textBorder')
        album.classList.add('textBorder')
        resultsDiv.classList.add("resultsBorder", "results");


        picture.src = `${itunes.artworkUrl100}`
        title.innerText = `Song: ${itunes.trackName}`
        artist.innerText = `Artist: ${itunes.artistName}`
        album.innerText = `Album: ${itunes.collectionName}`

        //Creating event listener on results to play song preview on click
        resultsDiv.addEventListener("click", (event) => {
            audio.src = ''
            audio.src = `${itunes.previewUrl}`
            audio.volume = 0.1;
        })

        //Appending results to show picture, song title, and artist
        resultsDiv.appendChild(picture);
        resultsDiv.appendChild(title);
        resultsDiv.appendChild(artist);
        resultsDiv.appendChild(album);
        searchResults.appendChild(resultsDiv);

        //Adding event listeners on results to highlight songs
        resultsDiv.addEventListener("mouseover", (event) => {
            resultsDiv.classList.add('hover')
        })
        resultsDiv.addEventListener("mouseout", (event) => {
            resultsDiv.classList.remove('hover')
        })
        resultsDiv.addEventListener("mousedown", (event) => {
            resultsDiv.classList.remove('resultsBorder')
        })
        resultsDiv.addEventListener("mouseup", (event) => {
            resultsDiv.classList.add('resultsBorder')
        })


    }
}
}