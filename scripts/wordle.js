let guesses = [];
let currentLine = 0;

let getDictionnary = () => {
  fetch("6letterWords.txt")
    .then((response) => response.text())
    .then((text) => console.log(text));
};

getDictionnary();

let letterInput = (e) => {
  console.log(e);
  // The player entered a letter
  if (e.key.match(/^[a-zA-Z]$/i)) {
    // We change the letter in the case
    e.target.value = e.key.toLowerCase();
    // we update the current answer
    regexIdOfTheLetter = new RegExp(/wordleLetter-([0-5])/gm);
    idOfTheLetter = regexIdOfTheLetter.exec(e.target.className)[1];
    regexIdOfTheLine = new RegExp(/wordleLine-([0-5])/gm);
    idOfTheLine = regexIdOfTheLine.exec(e.target.parentNode.className)[1];
    if (!guesses[idOfTheLine]) {
      guesses[idOfTheLine] = "      ";
    }
    guesses[idOfTheLine] =
      guesses[idOfTheLine].substring(0, idOfTheLetter) +
      e.target.value +
      guesses[idOfTheLine].substring(idOfTheLetter + 1);
    // We set the focus to the next case
    regexIdOfTheLetter = new RegExp(/wordleLetter-([0-5])/gm);
    idOfTheNextLetter = parseInt(idOfTheLetter) + 1;
    if (idOfTheNextLetter < 6) {
      document
        .getElementsByClassName("wordleLetter-" + idOfTheNextLetter)[0]
        .focus();
    }
  }
  // The player pressed "Enter"
  if (e.key == "Enter") {
    // We first check that he entered a 6 letter word
    if (guesses[currentLine].match(/^[a-zA-Z]{6}$/i)) {
      // We check that it is in the dictionnary
    }
  }
};

let onWordleLoad = () => {
  for (let i = 0; i < 6; i++) {
    let line = document.getElementsByClassName("wordleLetter-" + i)[0];
    line.addEventListener("keyup", (e) => letterInput(e));
  }
};
