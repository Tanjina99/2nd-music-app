const searchInput = document.getElementById("search-input");
const resultsDiv = document.getElementById("results");

document.querySelector("button").addEventListener("click", () => {
    const query = searchInput.value;

    if (query) {
        resultsDiv.innerHTML = "Loading..";
        fetch(`https://api.lyrics.ovh/suggest/${query}`)
            .then((res) => res.json())
            .then((data) => {
                resultsDiv.innerHTML = ""; 

                const ul = document.createElement("ul");
                const topResults = data.data.slice(0, 5);

                topResults.forEach((result) => {
                    const artistName = result.artist.name;
                    const albumTitle = result.album.title;

                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${artistName}</strong> - <strong>${albumTitle}</strong>`;
                    ul.appendChild(li);
                });

                resultsDiv.appendChild(ul);
            })
            .catch((error) => {
                console.error("Error fetching music data:", error);
                resultsDiv.innerHTML = "An error occurred while fetching results.";
            });
    } else {
        resultsDiv.innerHTML = "Please enter an artist or title of the song";
    }
});
