let allVDM = [];

let fetchAllVDM = () => {
  fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      "https://www.viedemerde.fr/aleatoire"
    )}`
  )
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("Network response was not ok.");
    })
    .then((data) => new DOMParser().parseFromString(data.contents, "text/html"))
    .then((dom) => {
      console.log(dom);
      aTags = dom.getElementsByTagName("a");
      let keepSearching = true;

      let i = 0;
      while (keepSearching) {
        console.log(aTags[i].firstChild);
        if (aTags[i].innerText.match(/.*Aujourd'hui.*/gm)) {
          console.log("push");
          allVDM.push(aTags[i].innerText.replace(/(\r\n|\n|\r)/gm, ""));
        }
        i++;
        if (i == aTags.length) {
          keepSearching = false;
        }
      }
      console.log(allVDM);
    })
    .then(() => {
      displayARandomVDM();
    });
};

let displayARandomVDM = () => {
  paragraph = document.getElementById("vdm-text");
  paragraph.innerText = allVDM[Math.floor(Math.random() * (allVDM.length + 1))];
};
