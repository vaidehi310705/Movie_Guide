const input = document.querySelector("#input");
const serachBtn = document.querySelector("#search-btn");
const result = document.querySelector(".result");
const body = document.querySelector("body");
const header = document.querySelector(".header");
serachBtn.addEventListener("click", () => {
  if (input.value === "") {
    result.innerHTML = `<h3 id="msg">Enter a movie name</h3>`;
  }
  fetch(`https://omdbapi.com/?t=${input.value}&apikey=41c5891e`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      result.innerHTML = `
        <div class="movie-info">
  <img src="${data.Poster}" alt="Movie Poster">

  <div class="title">
    <h4 id="movie-title">${data.Title}</h4>

    <div class="rating">
      <i id="star" class="fa-solid fa-star"></i>
      <p id="rate">${data.imdbRating}</p>
    </div>

    <div class="extra-info">
      <p>${data.Rated}</p>
      <p>${data.Year}</p>
      <p>${data.Runtime}</p>
    </div>

    <div class="genre-section">
      <p class="genre">${data.Genre.split(",")[0]}</p>
      <p class="genre">${data.Genre.split(",")[1]}</p>
      <p class="genre">${data.Genre.split(",")[2]}</p>
    </div>
  </div>
</div>
<div class="info-section">
<div class="plot-section">
  <h4>Plot</h4>
  <p id="plot">${data.Plot}</p>
</div>

<div class="cast-section">
  <h4>Cast</h4>
  <p id="cast">${data.Actors}</p>
</div>
<div class="director-section">
  <h4>Director</h4>
  <p id="director">${data.Director}</p> 
</div>
</div>
        `;
      body.style.backgroundImage = `url(${data.Poster})`;
      body.classList.add("blur-bg");
      header.innerHTML = "";
    });
});
