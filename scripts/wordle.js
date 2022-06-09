let guesses = [];
let currentLine = 0;
let dict;
let wordToGuess;

let getDictionnary = () => {
  return fetch("6letterWords.txt")
    .then((response) => response.text())
    .then((text) => {
      dict = text.replace(/[\r]/gm, '').split("\n").map((word)=>word.toLowerCase());
      return dict
    });
};

let letterInput = (e) => {
  // The player entered a letter
  if (e.key.match(/^[a-zA-Z]$/i)) {
    // We change the letter in the case
    e.target.value = e.key.toLowerCase();
    // we update the current answer
    regexIdOfTheLetter = new RegExp(/wordleLetter-([0-5])-[0-5]/gm);
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
    regexIdOfTheLetter = new RegExp(/wordleLetter-([0-5])-[0-5]/gm);
    idOfTheNextLetter = parseInt(idOfTheLetter) + 1;
    if (idOfTheNextLetter < 6) {
      document
        .getElementsByClassName("wordleLetter-" + idOfTheNextLetter + "-" + idOfTheLine)[0]
        .focus();
    }
  }
  // The player pressed "Enter"
  if (e.key == "Enter") {
    // We first check that he entered a 6 letter word
    if (guesses[currentLine].match(/^[a-zA-Z]{6}$/i)) {
      // We check that it is in the dictionnary
      guess = guesses[currentLine];
      if (dict.includes(guess)) {
        // We hide the "invalid word" text
        document.getElementById("invalidWord").setAttribute("style", "display: none");
        // We check if he got the right answer
        if (wordToGuess == guess) {
          for (let i=0;i<6;i++) {
              let caseActuelle = document.getElementsByClassName(`wordleLetter-${i}-${currentLine}`)[0];
            caseActuelle.setAttribute("class", caseActuelle.className + " background-green");
          }
          console.log("Win !")
          document.getElementById("win").removeAttribute("style")
        } else {
          // Check if this is the last line => Lose
          if (currentLine == 5) {
            console.log("Lose ...")
            document.getElementById("lose").removeAttribute("style")
          } else {
            // We update the cases colors, disable
            lettersOfTheWordToGuess = wordToGuess.split("");
            lettersOfTheGuess = guess.split("");
            lettersOfTheWordRemaining = [...lettersOfTheWordToGuess];
            for (let i=0;i<6;i++) {
              let caseActuelle = document.getElementsByClassName(`wordleLetter-${i}-${currentLine}`)[0];
              caseActuelle.setAttribute("disabled", "true");
              if (lettersOfTheGuess[i] == lettersOfTheWordToGuess[i]) {
                // Green case
                caseActuelle.setAttribute("class", caseActuelle.className + " background-green");
                lettersOfTheWordRemaining.splice(lettersOfTheWordRemaining.indexOf(lettersOfTheGuess[i]), 1);
                
              }
            }
            for (let i=0;i<6;i++) {
              let caseActuelle = document.getElementsByClassName(`wordleLetter-${i}-${currentLine}`)[0];
              if (!(lettersOfTheGuess[i] == lettersOfTheWordToGuess[i]) && lettersOfTheWordRemaining.includes(lettersOfTheGuess[i])) {
                // Yellow case
                caseActuelle.setAttribute("class", caseActuelle.className + " background-yellow");
            lettersOfTheWordRemaining.splice(lettersOfTheWordRemaining.indexOf(lettersOfTheGuess[i]), 1);
              }
            }
            // We enable the next line
            currentLine += 1;
            for (let i=0;i<6;i++) {
              let caseActuelle = document.getElementsByClassName(`wordleLetter-${i}-${currentLine}`)[0];
              caseActuelle.removeAttribute('disabled');
            }
            // We set the focus on the first element of the next line
            let prochaineCase = document.getElementsByClassName(`wordleLetter-${0}-${currentLine}`)[0];
              prochaineCase.focus();
          }
        }
      } else {
        // The word is invalid
        document.getElementById("invalidWord").removeAttribute("style");
      }
    }
  }
};

let onWordleLoad = async () => {
  wordleLines = document.getElementsByClassName("wordleLines")[0];
  for (let i=0;i<6;i++) {
    let wordleLine = document.createElement("div");
    wordleLine.innerHTML = `\
            <input type="text" class="form-control wordleLetter-0-${i}" ${i>0 && "disabled"}/> \
            <input type="text" class="form-control wordleLetter-1-${i}" ${i>0 && "disabled"}/> \
            <input type="text" class="form-control wordleLetter-2-${i}" ${i>0 && "disabled"}/> \
            <input type="text" class="form-control wordleLetter-3-${i}" ${i>0 && "disabled"}/> \
            <input type="text" class="form-control wordleLetter-4-${i}" ${i>0 && "disabled"}/> \
            <input type="text" class="form-control wordleLetter-5-${i}" ${i>0 && "disabled"}/>`.trim()
    wordleLine.setAttribute("class", "wordleLine-"+i);
    wordleLines.appendChild(wordleLine);
  }
  for (let i = 0; i < 6; i++) {
    for (let j=0;j<6;j++) {
    let line = document.getElementsByClassName("wordleLetter-" + i + "-" + j)[0];
    line.addEventListener("keyup", (e) => letterInput(e));
  } }
  document.getElementById("lose").setAttribute("style", "display: none");
  document.getElementById("win").setAttribute("style", "display: none");
  document.getElementById("invalidWord").setAttribute("style","display: none");
  dict = await getDictionnary();
  // Choose the word to guess
  wordToGuess = dict[Math.floor(Math.random() * dict.length)];
  console.log("WordToGuess :", wordToGuess)
};

let startGame = () => {
  guesses = [];
  currentLine = 0;
  // remove all the lines
  const wordleLines = document.getElementsByClassName("wordleLines")[0];
  while (wordleLines.lastElementChild) {
    wordleLines.removeChild(wordleLines.lastElementChild);
  }
  // recall the onWordleLoad function
  onWordleLoad();
}
