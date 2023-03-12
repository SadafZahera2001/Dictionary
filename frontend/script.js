const url = "http://127.0.0.1:3000/dictionary/";
const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const addBtn = document.getElementById("add-btn");
const updateBtn = document.getElementById("update-btn");
const deleteBtn = document.getElementById("delete-btn");
const inpWord = document.getElementById("inp-word");
const add_Meaning = document.getElementById("add-meaning");
const add_Word = document.getElementById("add-word");
const update_Meaning = document.getElementById("update-meaning");
const update_Word = document.getElementById("update-word");
const delete_Word = document.getElementById("delete-word");
const searchToggle = document.getElementById("search-toggle");
const addToggle = document.getElementById("add-toggle");
const updateToggle = document.getElementById("update-toggle");
const deleteToggle = document.getElementById("delete-toggle");
const addSection = document.getElementById("add-section")
const searchSection = document.getElementById("search-section")
const deleteSection = document.getElementById("delete-section")
const updateSection = document.getElementById("update-section")

searchToggle.addEventListener("click", searchScreen);

addToggle.addEventListener("click", addScreen);

updateToggle.addEventListener("click", updateScreen);

deleteToggle.addEventListener("click", deleteScreen);

searchBtn.addEventListener("click", searchWord);

addBtn.addEventListener("click", addWord);

updateBtn.addEventListener("click", updateWord);

deleteBtn.addEventListener("click", deleteWord);

function searchScreen() {
  searchSection.style.display = "block";
  updateSection.style.display = "none";
  addSection.style.display = "none";
  deleteSection.style.display = "none";
  add_Word.value="";
  add_Meaning.value="";
  update_Word.value="";
  update_Meaning.value="";
  delete_Word.value="";
  
  result.innerHTML = ``;
}

function addScreen() {
  searchSection.style.display = "none";
  updateSection.style.display = "none";
  addSection.style.display = "block";
  deleteSection.style.display = "none";
  result.innerHTML = ``;
  inpWord.value="";
  update_Word.value="";
  update_Meaning.value="";
  delete_Word.value="";
}

function updateScreen() {
  searchSection.style.display = "none";
  updateSection.style.display = "block";
  addSection.style.display = "none";
  deleteSection.style.display = "none";
  result.innerHTML = ``;
  inpWord.value="";
  delete_Word.value="";
  add_Word.value="";
  add_Meaning.value="";
}

function deleteScreen() {
  searchSection.style.display = "none";
  updateSection.style.display = "none";
  addSection.style.display = "none";
  deleteSection.style.display = "block";
  result.innerHTML = ``;
  inpWord.value="";
  update_Word.value="";
  update_Meaning.value="";
  add_Word.value="";
  add_Meaning.value="";
}

function searchWord() {
  const query = inpWord.value;
  axios
    .get(url + "search?word=" + query)
    .then((response) => {
      const data = response.data;
      console.log(data.wordData.word);
      console.log(data.wordData.meaning);

      result.innerHTML = `
        <div class="word">
          <h3>${data.wordData.word}</h3>
        </div>
        <p class="word-meaning">
          ${data.wordData.meaning}
        </p>`;
    })
    .catch((error) => {
        console.log(error.response.data.message)
        result.innerHTML = `<h3 class="error">${error.response.data.message}</h3>`;
      });
}

function addWord() {
  const word = add_Word.value;
  const meaning = add_Meaning.value;
  const data = JSON.stringify({ word: word, meaning: meaning });
  axios
    .post(url + "insert", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      result.innerHTML = `<h3>${response.data.message}</h3>`;
    })
    .catch((error) => {
        console.log(error.response.data.message)
        result.innerHTML = `<h3 class="error">${error.response.data.message}</h3>`;
      });
}

function updateWord() {
    const word = update_Word.value;
    const meaning = update_Meaning.value;
    axios
      .post(url + "update", { word: word, meaning: meaning }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        result.innerHTML = `<h3>${response.data.message}</h3>`;
      })
      .catch((error) => {
        console.log(error.response.data.message)
        result.innerHTML = `<h3 class="error">${error.response.data.message}</h3>`;
      });
  }
  
  function deleteWord() {
    const word = delete_Word.value;
    axios
      .delete(url + "delete", {
        headers: {
          "Content-Type": "application/json",
        },
        data: { word: word },
      })
      .then((response) => {
        result.innerHTML = `<h3>${response.data.message}</h3>`;
      })
      .catch((error) => {
        console.log(error.response.data.message)
        result.innerHTML = `<h3 class="error">${error.response.data.message}</h3>`;
      });
  }
  


window.addEventListener('resize', () => {
    var width = screen.width;
    var height = screen.height
    console.log(width);
    console.log(height);
    document.getElementById('div-bg').style.backgroundImage = 'url("https://source.unsplash.com/' + height + 'x' + width + '/?cherry-blossom")';
});
