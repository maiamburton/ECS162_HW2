let level = 0;
let maxErrors = 7;
let guessesRemaining = 6;
let remainingLetters = 0;
let streakCounter = 0;

let secretWord = "";
let usedWords = [];


let easyWords = ['apple', 'ball', 'cat', 'queen', 'tree', 'ink', 'lion', 'puppy', 
'rose', 'chair', 'duck', 'boat', 'nest', 'star', 'wind', 'blue', 'joy', 'mask', 'leaf'];

let mediumWords = ['pancake', 'banana', 'wallet', 'orange', 'jungle', 'ladder', 
'noodle', 'sponge', 'yellow', 'candle', 'magnet', 'grass', 'clock', 'rocket', 'whisper',
'zebra', 'whine'];

let difficultWords = ['strength', 'abruptly', 'ivory', 'swivel', 'transcript', 'kitsch', 
'espionage', 'witchcraft', 'wristwatch', 'onyx', 'nowadays', 'oxygen', 'fluffiness', 
'megahertz', 'galaxy', 'puzzling', 'quartz', 'zipper', 'zodiac', 'gazebo', 'flapjack', 
'whiskey', 'voodoo', 'luxury', 'unknown', 'twelfth', 'croquet', 'jazz'];

let difficultyIndex = [easyWords, mediumWords, difficultWords];

let easyBtn = document.getElementById('easy');
let mediumBtn = document.getElementById('medium');
let difficultBtn = document.getElementById('difficult');
easyBtn.addEventListener('click', () => selectDifficulty(easyBtn, 0));
mediumBtn.addEventListener('click', () => selectDifficulty(mediumBtn, 1));
difficultBtn.addEventListener('click', () => selectDifficulty(difficultBtn, 2));

let streak = document.getElementById('streak');
let startBtn = document.getElementById('startGame');
let hintBtn = document.getElementById('hintBtn');
hintBtn.disabled = true;
let image = document.getElementById('hanging-man');
let bContainer = document.getElementById('button-container');
let lContainer = document.getElementById('letter-container');


// Create 26 buttons for each letter in the alphabet
for (let i = 0; i < 26; i++){
    let newButton = document.createElement("button");
    newButton.textContent = String.fromCharCode(65 + i);  // ASCII value of 'A' is 65
    newButton.id = String.fromCharCode(65 + i);
    newButton.classList.add("letterBtn");
    newButton.classList.add("notSelected");

    // Append the button to the container
    bContainer.appendChild(newButton);

    // Add event listener to each button
    newButton.addEventListener("click", function() {
        this.classList.remove("notSelected");
        let selectedLetter = this.textContent;
        let letterBox = lContainer.querySelectorAll('.letterBox');
        let found = false;

        letterBox.forEach(function(letter) {
            if (letter.classList.contains(selectedLetter)) {
                letter.textContent = selectedLetter;
                found = true;
            }
        })

        if (found) {
            newButton.classList.add("right");
            countRemainingLetters(selectedLetter);
        } else {
            newButton.classList.add("wrong");
            guessesRemaining--;
            if (guessesRemaining <= 0) {
                gameOver();
            } else {
                updateImage();
            }
        }
    });
}

function selectDifficulty (selectedButon, levelNum) {
    let allButtons = [easyBtn, mediumBtn, difficultBtn];

    allButtons.forEach(button => {
        if (button === selectedButon) {
            button.classList.add('selectedLevel');
        } else {
            button.classList.remove('selectedLevel');
        }
    })

    level = levelNum;
}


// Start game
document.getElementById('startGame').addEventListener('click', initializedGame);
function initializedGame() {
    guessesRemaining = maxErrors;
    image.src = "images/start.png";
    startBtn.innerHTML = "New Word";
    hintBtn.disabled = true;

    if (difficultyIndex[level].length === 0) {
        difficultyIndex[level] = usedWords.slice();   // reset if all words are used
        usedWords = [];
        alert("All words in this difficulty level have been seen. Resetting words.");
    }

    // select random index for the word
    let randomIndex = Math.floor(Math.random() * difficultyIndex[level].length);

    // remove the word from the array and store it
    secretWord = difficultyIndex[level].splice(randomIndex, 1)[0].toUpperCase();

    document.getElementById('wordLength').textContent = secretWord.length;
    remainingLetters = secretWord.length;
    usedWords.push(secretWord)
    
    answerArray = [];
    for (let i = 0; i < secretWord.length; i++){
        answerArray[i] = "_";
    }

    // Clear and recreate letter containers
    let lContainer = document.getElementById('letter-container');
    lContainer.innerHTML = '';
    for (let i = 0; i < secretWord.length; i++) {
        let newLetter = document.createElement("div");
        newLetter.classList.add("letterBox");
        newLetter.classList.add(secretWord[i]);
        newLetter.textContent = " ";

        lContainer.appendChild(newLetter);
    }

    resetButtonSettings();
    hintBtn.disabled = false;
}

function resetButtonSettings() {
    let buttons = bContainer.querySelectorAll('.letterBtn');

    buttons.forEach(function(button) {
        button.className = '';
        button.classList.add('letterBtn', 'notSelected');
    })
}


let imageNames = ["start.png", "1wrong.png", "2wrong.png", "3wrong.png", "4wrong.png", "5wrong.png", "6wrong.png", "Win.png"];
function updateImage() {
    image.src = "images/" + imageNames[maxErrors-guessesRemaining];
}


hintBtn.addEventListener('click', hintBtnClick);
function hintBtnClick () {
    for (let i = 0; i < secretWord.length; i++){
        if (answerArray[i] == "_") {
            answerArray[i] = secretWord[i];
            let hintLetter = secretWord[i];
            let tempBtn = document.getElementById(hintLetter);
            tempBtn.click();
            break;
        }
    }
}


function countRemainingLetters(selectedLetter) {
    for (let i = 0; i < secretWord.length; i++){
        if (selectedLetter == secretWord[i]) {
            remainingLetters--;
        }
    }
    
    if (remainingLetters <= 0) {
        let streak = document.getElementById('streak');
        streakCounter++;
        streak.textContent = streakCounter;

        image.src = "images/Win.png";
        hintBtn.disabled = true;
        endGameLetterBoxes();
    }
}

function gameOver() {
    image.src = "images/Gameover.png";
    usedWords.push(secretWord);
    streak.textContent = 0;
    hintBtn.disabled = true;
    endGameLetterBoxes();
    startBtn.innerHTML = "Next Round";
}

function endGameLetterBoxes() {
    // Iterate through letter boxes
    let letterBox = lContainer.querySelectorAll('.letterBox');
    letterBox.forEach(function(letter) {
    
        // Iterate through the letter's class names and find the single character name
        Array.from(letter.classList).forEach(function(className) {
            if (className.length === 1) {
                letter.innerHTML = className;
            }
        })
        letter.style.border = 'none';
        letter.style.fontSize = '20px';
    })
}

