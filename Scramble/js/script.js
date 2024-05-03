// DOM Locators
const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word");
const messageElement = document.getElementById("message");
const scoreText = document.querySelector(".score b"); // Add this line
let score = 0; // Add this line
let correctWord, timer;

// Correct Answer Feedback
const scoreWords = [
  "Amazing",
  "Wonderful",
  "Wordlicious",
  "Incredible",
  "Fantastic",
  "Superb",
  "Outstanding",
  "Excellent",
  "Impressive",
  "Spectacular",
];

// Initialize the time and start count down
const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }

    // When the timer runs out
    // Clear the timer and display what the answer was
    clearInterval(timer);
    messageElement.innerHTML = `Time off! <span style="color: #39A7FF; background-color: #EEF5FF;">${correctWord.toUpperCase()}</span> was the correct word`;
    inputField.style.display = "none"; // Hide the input box
    setTimeout(() => {
      initGame();
      inputField.style.display = "block"; // Show the input box again
    }, 1500);
  }, 1000);
};

// Select random word, shuffle letters, and load to page
let initWord = () => {
  // select a word at random from the list
  let randomIndex = Math.floor(Math.random() * words.length);
  let randomObj = words[randomIndex];
  
  // Split the word into individual characters
  let wordArray = randomObj.word.split("");
  
  // Shuffle the array
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }

  // Load the scrambled word and the paired hint
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;

  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
  inputField.className = "";
}

// Determine word class based on length and number of repeating characters
let initDifficulty = () => {
  let wordClass;
  let wordLength = correctWord.length;
  if (wordLength <= 4) {
    wordClass = "easy";
  } else if (wordLength <= 6) {
    wordClass = "medium";
  } else if (wordLength <= 8) {
    wordClass = "difficult";
  } else {
    wordClass = "legendary";
  }

  // Display word class
  let wordClassElement = document.querySelector(".word-class");
  wordClassElement.innerText = wordClass;

  // Change colors based on word class
  switch (wordClass) {
    case "easy":
      wordClassElement.style.color = "black";
      wordClassElement.style.backgroundColor = "lightblue";
      break;
    case "medium":
      wordClassElement.style.color = "white";
      wordClassElement.style.backgroundColor = "red";
      break;
    case "difficult":
      wordClassElement.style.color = "black";
      wordClassElement.style.backgroundColor = "gold";
      break;
    case "legendary":
      wordClassElement.style.color = "white";
      wordClassElement.style.backgroundColor = "purple";
      break;
  }
}

const initGame = () => {
  initTimer(30);  // Set the timer for 30 seconds
  initWord(); // Select word and hint
  initDifficulty(); // Display word difficulty
  
  messageElement.textContent = "";
};
initGame();

// Change score label to show a win word
const showWinWord = () => {
  const labelElement = document.getElementById("scoreLabel");
  const scoreValueElement = document.getElementById("scoreValue");
  let displayWord;

  if (scoreWords.length > 0) {
    displayWord = scoreWords[Math.floor(Math.random() * scoreWords.length)];
  } else {
    displayWord = "No words available";
  }

  // Add a class to trigger the transition
  scoreValueElement.classList.add("show-word");

  // Display the word temporarily for 1.1 seconds
  scoreValueElement.innerHTML = `<span style="font-size: 1.1em">${displayWord}</span>`;
  labelElement.style.display = "none"; // Hide the label element

  setTimeout(() => {
    // Revert back to the score after 1.1 seconds
    scoreValueElement.innerHTML = score;
    labelElement.style.display = "inline"; // Show the label element again

    // Remove the class to end the transition
    scoreValueElement.classList.remove("show-word");
  }, 1100);
};

// Verify the user's guess is correct
window.checkWord = () => {
  let userWord = inputField.value.toLowerCase();

  // Check for false positive input
  if (!userWord) {
    messageElement.textContent = "Please enter the word to check!";
    inputField.classList.add("flash"); // Add the flash effect
    setTimeout(() => {
      inputField.classList.remove("flash"); // Remove the flash effect after 2 seconds
      messageElement.textContent = "";
    }, 2000);
    return;
  }

  // Check if the user's guess is wrong
  if (userWord !== correctWord) {
    inputField.classList.remove("correct");
    inputField.classList.add("incorrect");
    messageElement.textContent = "Oops! Try again.";
    return;
  }

  // Display the correct word
  inputField.classList.remove("incorrect");
  inputField.classList.add("correct");
  messageElement.textContent = `Yay, ${correctWord.toUpperCase()} is the correct word!`;

  // Reset the timer
  let timeLeft = parseInt(timeText.innerText);
  clearInterval(timer); // Clear the timer

  // Update the user's score based on the time left
  if (timeLeft > 25) {
    score += 20;
  } else if (timeLeft > 20) {
    score += 17;
  } else if (timeLeft > 15) {
    score += 14;
  } else if (timeLeft > 10) {
    score += 13;
  } else {
    score += 10;
  }
  scoreText.innerText = score; // Update the score display

  showWinWord();
  setTimeout(initGame, 2000);
  inputField.style.display = "block";
};

checkBtn.addEventListener("click", checkWord);
refreshBtn.addEventListener("click", initGame);
