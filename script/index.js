// variáveis
const list = document.querySelector(".wrapper ul");
const inputClean = document.querySelector(".material-icons");
const wrapper = document.querySelector(".wrapper");
const searchInput = document.querySelector("input");
const infoText = document.querySelector(".info-text");
const word = document.querySelector(".word p");
const wordPhonetics = document.querySelector(".word span");
const meaning = document.querySelector(".meaning span");
const example = document.querySelector(".example span");
const constSynonyms = document.querySelector(".synonyms .list");
const synonymsDetails = document.querySelector(".synonyms");


//functions
function data(result, wordOne) {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try another search.`;
  } else {
    console.log(result);
    wrapper.classList.add("active");
    infoText.innerHTML = "";
    let definitions = result[0].meanings[0].definitions[0];
    let phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

    
    word.innerText = result[0].word;
    wordPhonetics.innerText = phonetics;
    meaning.innerText = definitions.definition;
    example.innerText = definitions.example;
    if (definitions.example === undefined) {
      example.innerText = "Cant find a example";
    }

    if (result[0].meanings[0].synonyms.length === 0) {
      synonymsDetails.style.display = "none";
      console.log("clique");
    } else {
      synonymsDetails.style.display = "block";
      let synonymsContent = `${result[0].meanings[0].synonyms}`;
      console.log(result[0].meanings[0].synonyms.join(" "));
      constSynonyms.innerText = result[0].meanings[0].synonyms.join(", ");
    }
  }
}

function fetchApi(word) {
  infoText.style.color = "#fff";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>.`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}

function cleanInput() {
  inputClean.addEventListener("click", () => {
    searchInput.value = "";
    list.style.display = "none";
    infoText.innerText =
      "Type a word and press enter to get the meaning, example, pronunciation and synonyms of the word.";
  });
}
cleanInput();

//events
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    fetchApi(e.target.value);
  }
});

