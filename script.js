// Init the blagues API
const blagues = new BlaguesAPI(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjYyOTI0NjIyMDc1Mzk2MDk2IiwibGltaXQiOjEwMCwia2V5IjoicTExVHphc1BTT3pzeGU1MkZYNktrWHRjQk13enFTT0JRQ1piajg1VEhzWVI0bmNDMFciLCJjcmVhdGVkX2F0IjoiMjAyMi0wNi0wOFQxMjowODoyOSswMDowMCIsImlhdCI6MTY1NDY5MDEwOX0.Ha2UqzFjl2IeBzbCaP-EBosotzgkzAzW1qjYrT_Utw0"
);

// Init the pagination
let currentPage = 1;

let fetchRandomJoke = async () => {
  let blague = await blagues.random();
  jokeElement = document.getElementById("randomJoke");
  answerElement = document.getElementById("randomAnswer");
  jokeElement.innerText = blague.joke;
  answerElement.innerText = blague.answer;
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
  (await Promise.all(jokesIds.map(async (id) => await blagues.fromId(id)))).map(
    (blague) => {
      divWhereWeAddTheJokes.insertAdjacentHTML(
        "beforeend",
        `<div class="accordion-item bg-warning">
        <h2 class="accordion-header" id="headingOne">
        <button
            class="accordion-button collapsed custom-bg"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
        >` +
          blague.joke +
          `</button>
        </h2>
        <div
        id="collapseOne"
        class="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#allBlagues"
        >
        <div class="accordion-body">` +
          blague.answer +
          `</div>
        </div>
    </div>`
      );
    }
  );
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
