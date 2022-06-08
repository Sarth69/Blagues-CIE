const blagues = new BlaguesAPI(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjYyOTI0NjIyMDc1Mzk2MDk2IiwibGltaXQiOjEwMCwia2V5IjoicTExVHphc1BTT3pzeGU1MkZYNktrWHRjQk13enFTT0JRQ1piajg1VEhzWVI0bmNDMFciLCJjcmVhdGVkX2F0IjoiMjAyMi0wNi0wOFQxMjowODoyOSswMDowMCIsImlhdCI6MTY1NDY5MDEwOX0.Ha2UqzFjl2IeBzbCaP-EBosotzgkzAzW1qjYrT_Utw0"
);

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

// fetchRandomJoke();
