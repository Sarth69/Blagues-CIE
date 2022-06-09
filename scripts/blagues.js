// Init the blagues API
const blagues = new BlaguesAPI(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjYyOTI0NjIyMDc1Mzk2MDk2IiwibGltaXQiOjEwMCwia2V5IjoicTExVHphc1BTT3pzeGU1MkZYNktrWHRjQk13enFTT0JRQ1piajg1VEhzWVI0bmNDMFciLCJjcmVhdGVkX2F0IjoiMjAyMi0wNi0wOFQxMjowODoyOSswMDowMCIsImlhdCI6MTY1NDY5MDEwOX0.Ha2UqzFjl2IeBzbCaP-EBosotzgkzAzW1qjYrT_Utw0"
);

// Init the pagination
let currentPage = 1;
var id_blague;

let fetchRandomJoke = async () => {
  let blague = await blagues.random();
  jokeElement = document.getElementById("randomJoke");
  answerElement = document.getElementById("randomAnswer");
  jokeElement.innerText = blague.joke;
  answerElement.innerText = blague.answer;
  id_blague = blague.id;
};

let onRandomLoad = () => {
  // Button to fetch a new random joke
  let button = document.getElementById("newRandom");
  button.addEventListener("click", () => {
    fetchRandomJoke();
    document
      .getElementById("randomJoke")
      .setAttribute("class", "accordion-button collapsed custom-bg");
    document
      .getElementById("collapseOne")
      .setAttribute("class", "accordion-collapse collapse");
  });
};

let fetchAllJokes = async (minId, maxId) => {
  divWhereWeAddTheJokes = document.getElementById("allBlagues");
  jokesIds = [...Array(maxId + 1 - minId).keys()].map((e) => e + minId);
  console.log(jokesIds);
  (
    await Promise.all(
      jokesIds.map(async (id) => {
        return { blague: await blagues.fromId(id), id };
      })
    )
  ).map((res) => {
    let blague = res.blague;
    let id = res.id;
    divWhereWeAddTheJokes.insertAdjacentHTML(
      "beforeend",
      `<div class="accordion-item bg-warning">
        <h2 class="accordion-header" id="heading` +
        id +
        `">
        <button
            class="accordion-button collapsed custom-bg"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse` +
        id +
        `"
            aria-expanded="false"
            aria-controls="collapse` +
        id +
        `"
        >` +
        blague.joke +
        `</button>
        </h2>
        <div
        id="collapse` +
        id +
        `"
        class="accordion-collapse collapse"
        aria-labelledby="heading` +
        id +
        `"
        data-bs-parent="#allBlagues"
        >
        <div class="accordion-body">` +
        blague.answer +
        `</div>
        </div>
    </div>`
    );
  });
};

let deleteJokes = () => {
  divWhereWeHaveTheJokes = document.getElementById("allBlagues");
  while (divWhereWeHaveTheJokes.lastElementChild) {
    divWhereWeHaveTheJokes.removeChild(divWhereWeHaveTheJokes.lastElementChild);
  }
};

let onAllJokesLoad = () => {
  previous = document.getElementById("Previous");
  next = document.getElementById("Next");
  previous.addEventListener("click", () => {
    currentPage -= 1;
    // delete previous jokes, the add the new ones
    deleteJokes();
    fetchAllJokes(1 + 10 * (currentPage - 1), 10 * currentPage);
    // disable the button if you can't press it again because there wouldn't be jokes for that
    if (currentPage == 1) {
      previous.setAttribute("class", "page-item disabled");
    } else {
      previous.setAttribute("class", "page-item");
    }
  });
  next.addEventListener("click", () => {
    currentPage += 1;
    // delete previous jokes, the add the new ones
    deleteJokes();
    fetchAllJokes(1 + 10 * (currentPage - 1), 10 * currentPage);
    // disable the button if you can't press it again because there wouldn't be jokes for that
    if (currentPage == 170) {
      // Il n'y a plus de blagues si on est au-delà
      previous.setAttribute("class", "page-item disabled");
    } else {
      previous.setAttribute("class", "page-item");
    }
  });
};

var add_like = () => {
  console.log(id_blague);
  fetch("http://localhost:8080/like?id="+id_blague).then(()=>{});
}