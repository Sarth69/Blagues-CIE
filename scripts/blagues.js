// Init the blagues API
const blagues = new BlaguesAPI(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjYyOTI0NjIyMDc1Mzk2MDk2IiwibGltaXQiOjEwMCwia2V5IjoicTExVHphc1BTT3pzeGU1MkZYNktrWHRjQk13enFTT0JRQ1piajg1VEhzWVI0bmNDMFciLCJjcmVhdGVkX2F0IjoiMjAyMi0wNi0wOFQxMjowODoyOSswMDowMCIsImlhdCI6MTY1NDY5MDEwOX0.Ha2UqzFjl2IeBzbCaP-EBosotzgkzAzW1qjYrT_Utw0"
);

// Init the pagination
let currentPage = 1;
var id_blague;

var affiche_nb_likes = () => {
  like_button = document.getElementById('like_button');
  fetch("https://blague-new.louisbout.repl.co/nb_likes?id="+id_blague).then((response) => response.json()).then((data) => {
    console.log(data);
    like_button.innerHTML = data + '<svg xmlns="http://www.w3.org/2000/svg"   width="16"     height="16"        fill="currentColor"    class="bi bi-hand-thumbs-up-fill"         viewBox="0 0 16 16"    >         <path     d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"    ></path>       </svg>           Like it !' 
  })
};

let fetchRandomJoke = async () => {
  let blague = await blagues.random();
  jokeElement = document.getElementById("randomJoke");
  answerElement = document.getElementById("randomAnswer");
  jokeElement.innerText = blague.joke;
  answerElement.innerText = blague.answer;
  id_blague = blague.id;
  affiche_nb_likes();
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
  fetch("https://blague-new.louisbout.repl.co/like?id="+id_blague).then(()=>affiche_nb_likes());
  
};
