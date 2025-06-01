const input = document.querySelector("#input");
const searchBtn = document.querySelector("#search-btn");
const result = document.querySelector(".result");
const body = document.querySelector("body");
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

searchBtn.addEventListener("click", () => {
  const query = input.value.trim();
  if (query === "") {
    result.innerHTML = `<h3 id="msg">Enter a movie name</h3>`;
    return;
  }

  result.innerHTML = "";
  body.style.backgroundImage = "";
  body.classList.remove("blur-bg");
  

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${input.value}&api_key=c12b82f343bdde64c6673d9e043c63ba`
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data.results.length) {
        result.innerHTML = `<h3 id="msg">Movie not found</h3>`;
        return;
      }

      const movie =
        data.results.find(
          (m) => m.title.toLowerCase() === query.toLowerCase()
        ) || data.results[0];
      console.log(movie.title);
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=c12b82f343bdde64c6673d9e043c63ba`
      )
        .then((res) => res.json())
        .then((details) => {
          let genreHtml = "";
          details.genres.slice(0, 3).forEach((genre) => {
            genreHtml += `<p class="genre">${genre.name}</p>`;
          });
          console.log(details.runtime);
          result.innerHTML = `
  <div class="movie-info">
    <img src="${
      movie.poster_path ? IMG_BASE + movie.poster_path : ""
    }" alt="Movie Poster">
    <div class="title">
      <h4 id="movie-title">${movie.title}</h4>
      <div class="rating">
        <i id="star" class="fa-solid fa-star"></i>
        <p id="rate">${movie.vote_average}</p>
      </div>
      <div class="extra-info">
        <p>${movie.original_language}</p>
        <p>${movie.release_date}</p>
        <p>${details.runtime} mins</p>
      </div>
      <div class="genre-section">
        ${genreHtml}
      </div>
    </div>
  </div>
  <div class="info-section">
    <div class="plot-section">
      <h4>Plot</h4>
      <p id="plot">${movie.overview}</p>
    </div>
  </div>
`;

          fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US&api_key=c12b82f343bdde64c6673d9e043c63ba`
          )
            .then((res) => res.json())
            .then((videoData) => {
              const trailer = videoData.results.find(
                (v) => v.type == "Trailer" && v.site === "YouTube"
              );
              if (trailer) {
                result.innerHTML += `
  <div class="trailer-section">
    <h4>Trailer</h4>
    <iframe width="100%" height="400" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
  </div>`;
              } else {
                result.innerHTML += `<p>No trailer available.</p>`;
              }

              body.style.backgroundImage = `url(${
                movie.poster_path ? IMG_BASE + movie.poster_path : ""
              })`;
              body.classList.add("blur-bg");
              const headerElement = document.querySelector(".header");
              if (headerElement) {
                headerElement.remove();
              }
            });
        });
    })
    .catch(() => {
      result.innerHTML = `<h3 id="msg">Error fetching data</h3>`;
    });
});
