let level = 0;
let maxErrors = 6;
let guessesRemaining = 6; // creates a variable to count the number of guesses
let streakCounter = 0;

let easyWords = ['apple', 'ball', 'gate', 'queen', 'tree', 'blue', 'lion', 'puppy', 
'shoes', 'rose', 'duck', 'gift', 'king', 'nest', 'star', 'wind', 'ink', 'joy', 
'mask', 'leaf'];

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


let streak = document.getElementById('streak');
streak.textContent = streakCounter;

// select a random word from an arraylist
let secretWord = difficultyIndex[level][Math.floor(Math.random() * difficultyIndex[level].length)].toUpperCase();
let remainingLetters = secretWord.length;
document.getElementById('wordLength').textContent = remainingLetters;

// create an arraylist for the number of letters of the word
var answerArray = [];
for (let i = 0; i < secretWord.length; i++){
    answerArray[i] = "_";
}

// Create blanks for each letter in the secret word
let lContainer = document.getElementById('letter-container');
for (let i = 0; i < secretWord.length; i++){
    let newLetter = document.createElement("div");
    newLetter.classList.add("letterBox");
    newLetter.classList.add(secretWord[i]);
    newLetter.textContent = " ";

    lContainer.appendChild(newLetter);
}


// Create 26 buttons for each letter in the alphabet
let bContainer = document.getElementById('button-container');

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
        let letterBoxes = lContainer.querySelectorAll('.letterBox');
        let found = false;

        letterBoxes.forEach(function(letterBox) {
            if (letterBox.classList.contains(selectedLetter)) {
                letterBox.textContent = selectedLetter;
                found = true;
            }
        })

        if (found) {
            newButton.classList.add("right");
            countRemainingLetters(selectedLetter);
        } else {
            newButton.classList.add("wrong");
            guessesRemaining--;
            updateImage();
            if (guessesRemaining <= 0) {
                gameOver();
            }
        }
    });
}

let imageNames = ["start.png", "1wrong.png", "2wrong.png", "3wrong.png", "4wrong.png", "5wrong.png", "gameOver.png"];
function updateImage() {
    let image = document.getElementById('hanging-man');
    let source = "images/" + imageNames[maxErrors-guessesRemaining];
    image.src = source;
}


function countRemainingLetters(selectedLetter) {
    for (let i = 0; i < secretWord.length; i++){
        if (selectedLetter == secretWord[i]) {
            remainingLetters--;
        }
    }
     
    alert(remainingLetters);
    if (remainingLetters <= 0) {
        let streak = document.getElementById('streak');
        streakCounter++;
        streak.textContent = streakCounter;
    }
}

function gameOver() {
    let hintBtn = document.getElementById('hintBtn');
    hintBtn.disabled = true;
}


let hintBtn = document.getElementById('hintBtn');
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