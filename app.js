// variables for all main fields of functionality
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const submitBtn = document.querySelector("#submit-btn");
const removeBtn = document.querySelector("#remove-btn");
const gifContainer = document.querySelector("#gif-container");

// calls requestGIF on value user inputs

async function searchHandler(e) {
    e.preventDefault();
    const gif = await requestGIF(input.value);
    appendGIF(gif);
}

// calls on findGIF to get an image address for requested GIF
async function requestGIF(term) {
    const response = await findGIF(term);
    return response;
}

// makes a request for the GIF data from Giphy and selects random GIF image address
async function findGIF(term) {
    
    const response = await axios.get('http://api.giphy.com/v1/gifs/search', {params: { q: term, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"}}
    );
    const gifsArr = response.data.data;
    const idx = Math.floor(Math.random() * gifsArr.length);
    const selectedGIF = gifsArr[idx];
    return selectedGIF.images.original.url;
}

// creates GIF with img address retrieved and appends it to GIF container
const appendGIF = (imageAddress) => {
    const img = document.createElement("img");
    img.src = imageAddress;
    img.classList += "gif";
    gifContainer.append(img);
}

const removeHandler = () => {
    $(".gif").remove();
}

submitBtn.addEventListener("click", searchHandler);
removeBtn.addEventListener("click", removeHandler);