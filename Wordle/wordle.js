let colNum = 5;
let rowCounter = 0;
let cellNum = colNum * rowCounter;
let numOfCells = 29;
let counter = 0;
const cells = document.querySelectorAll('.cell');
const keys = document.querySelectorAll('.key');
let matchedNum = 0;
let matchedLetters = new Set();

let wordsToUse = ['chair', 'water', 'smile', 'beach', 'music', 'games', 'house', 'story',
    'train', 'cloud', 'earth', 'ocean', 'birds', 'magic', 'fairy', 'dream', 'night',
    'light', 'space', 'plant', 'piano', 'radio', 'phone', 'watch', 'timer', 'forks', 'knife',
    'plate', 'juice', 'snack', 'fruit', 'chips', 'bread', 'beans', 'steak', 'heart', 'lover',
    'laugh', 'jumps', 'dance', 'paint', 'stole', 'steal', 'overt', 'laser', 'lucid'];

let wordNum = Math.floor(Math.random() * wordsToUse.length);

let wordleWord = "";

function toggleKey(button) {
    if (cellNum < (colNum * rowCounter + colNum) && button.textContent != 'Delete' && button.textContent != 'Enter') {
        cells[cellNum].textContent = button.textContent; // Update the content of the corresponding cell with the clicked key
        cellNum++;
    }
    else if (button.textContent === 'Delete' && cellNum > colNum * rowCounter) {
        cellNum--;
        cells[cellNum].textContent = '';
    }

    if (button.textContent === 'Enter' && cellNum === colNum * rowCounter + colNum) {
        if (rowCounter === 0) {
            getWord(wordNum);
            console.log(wordleWord);
            wordNum++;
        }
        checkWord(rowCounter);

        if (matchedNum === colNum) {
            setTimeout(function () {
                // Show alert dialog
                alert("Congrats, you won!\n\nExit this message to play again or restart the board.");
                resetBoard();
            }, 100);
        }
        else if(rowCounter === 5)
        {
            setTimeout(function () {
                // Show alert dialog
                alert("Oops! Word not found... This round's word was: " + wordleWord+"\n\nExit this message to play again or restart the board.");
                resetBoard();
            }, 100);
        }
        rowCounter++;
    }
}

function getWord(wordNum) {
    wordleWord = wordsToUse[wordNum].toUpperCase();
}

function checkWord(row) {
    let i = 0;
    i = row * colNum;

    while (i < colNum * (row + 1)) {
        for (let j = row * colNum; j < colNum * (row + 1); j++) {
            if (wordleWord[i % colNum] === cells[i].textContent && !matchedLetters.has(wordleWord[i % colNum])) {
                cells[i].classList.add('correctCell');
                for (let k = 0; k < 28; k++) {
                    if (keys[k].textContent === cells[i].textContent) {
                        keys[k].classList.add('correctCell');
                    }
                }
                matchedLetters.add(wordleWord[i % colNum]);
            }
            else if (wordleWord[i % colNum] === cells[j].textContent && !matchedLetters.has(wordleWord[i % colNum])) {
                cells[j].classList.add('correctLetter');
                for (let k = 0; k < 28; k++) {
                    if (keys[k].textContent === cells[j].textContent) {
                        keys[k].classList.add('correctLetter2');
                    }
                }
                //matchedLetters.add(wordleWord[i%colNum]);
            }
        }
        i++;
    }

    for (let j = row * colNum; j < colNum * (row + 1); j++) {
        for (let k = 0; k < 28; k++) {
            if (keys[k].textContent === cells[j].textContent && !keys[k].classList.contains('correctCell') && !keys[k].classList.contains('correctLetter2')) {
                keys[k].classList.add('incorrectLetter');
                cells[j].classList.add('incorrectLetter');
            }
        }
    }

    matchedNum = matchedLetters.size;
    matchedLetters.clear();
}

function resetBoard() {
    matchedLetters.clear();
    counter = 0;
    wordNum = Math.floor(Math.random() * wordsToUse.length);
    wordleWord = "";
    rowCounter = 0;
    cellNum = colNum * rowCounter;
    for (let i = 0; i < numOfCells+1; i++) {
        if(cells[i].classList.contains('correctCell'))
        {
            cells[i].classList.remove('correctCell');
        }
        if(cells[i].classList.contains('correctLetter'))
        {
            cells[i].classList.remove('correctLetter');
        }
        if(cells[i].classList.contains('incorrectLetter'))
        {
            cells[i].classList.remove('incorrectLetter'); 
        }
        cells[i].textContent = '';
    }
    for (let k = 0; k < 29; k++) {
        if(keys[k].classList.contains('correctLetter2'))
        {
            keys[k].classList.remove('correctLetter2');
        }
        if(keys[k].classList.contains('correctCell'))
        {
            keys[k].classList.remove('correctCell');
        }
        if(keys[k].classList.contains('incorrectLetter'))
        {
            keys[k].classList.remove('incorrectLetter');
        }
    }
}


var howToButton = document.getElementById("howToButton");
howToButton.addEventListener("click", function () {
    alert("In this implementation of Wordle, you have six tries to guess a 5 letter word."
        + "The word will not contain duplicate letters."
        + "\n\n- When a box containing a letter turns green, that means it is the correct letter in the correct spot."
        + "\n- If the box instead turns yellow, that indicates that the letter in the box is in the word, but you have not put it in the correct spot."
        + "\n- When the box turns grey, that means that the letter in the box is not in the word at all.");
});
