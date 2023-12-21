const accessKey = "urERK1psVbkfw_XPq_-7wJXKNlW_uZUWYST2ISUMFac";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = " ";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        // Fetch data from the API
        const response = await fetch(url);
        const data = await response.json();

        // Clear searchResults only on the first page
        if (page === 1) {
            searchResults.innerHTML = "";
        }

        // Iterate over the results and create HTML elements
        data.results.forEach(result => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            // Append elements to the searchResults container
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;

        // Display the "Show More" button
        showMore.style.display = "block";
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

formEl.addEventListener("submit", event => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
