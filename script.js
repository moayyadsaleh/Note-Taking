const flashcardsContainer = document.getElementById("flashcards");
const wordInput = document.getElementById("wordInput");
const meaningInput = document.getElementById("meaningInput");
let selectedFlashcard = null;

// Load flashcards from localStorage when the page loads
window.addEventListener("load", loadFlashcards);

function addFlashcard() {
  const word = wordInput.value.trim();
  const meaning = meaningInput.value.trim();

  if (word && meaning) {
    const flashcard = document.createElement("div");
    flashcard.classList.add("flashcard");
    flashcard.innerHTML = `<strong>${word}</strong>: ${meaning}`;
    flashcard.addEventListener("click", () => selectFlashcard(flashcard));

    flashcardsContainer.appendChild(flashcard);

    // Save flashcards to localStorage
    saveFlashcards();

    clearInputs();
  }
}

function editFlashcard() {
  if (selectedFlashcard) {
    const word = wordInput.value.trim();
    const meaning = meaningInput.value.trim();

    if (word && meaning) {
      selectedFlashcard.innerHTML = `<strong>${word}</strong>: ${meaning}`;

      // Save flashcards to localStorage
      saveFlashcards();

      clearInputs();
    }
  }
}

function deleteFlashcard() {
  if (selectedFlashcard) {
    flashcardsContainer.removeChild(selectedFlashcard);

    // Save flashcards to localStorage
    saveFlashcards();

    clearInputs();
  }
}

function selectFlashcard(flashcard) {
  if (selectedFlashcard) {
    selectedFlashcard.classList.remove("selected");
  }

  selectedFlashcard = flashcard;
  selectedFlashcard.classList.add("selected");

  const content = selectedFlashcard.innerHTML.split(":");
  wordInput.value = content[0]
    .replace("<strong>", "")
    .replace("</strong>", "")
    .trim();
  meaningInput.value = content[1].trim();
}

function clearInputs() {
  wordInput.value = "";
  meaningInput.value = "";

  if (selectedFlashcard) {
    selectedFlashcard.classList.remove("selected");
    selectedFlashcard = null;
  }
}

function saveFlashcards() {
  const flashcards = Array.from(document.querySelectorAll(".flashcard")).map(
    (flashcard) => flashcard.innerHTML
  );
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function loadFlashcards() {
  const storedFlashcards = localStorage.getItem("flashcards");

  if (storedFlashcards) {
    const flashcards = JSON.parse(storedFlashcards);
    flashcards.forEach((flashcard) => {
      const flashcardElement = document.createElement("div");
      flashcardElement.classList.add("flashcard");
      flashcardElement.innerHTML = flashcard;
      flashcardElement.addEventListener("click", () =>
        selectFlashcard(flashcardElement)
      );
      flashcardsContainer.appendChild(flashcardElement);
    });
  }
}
