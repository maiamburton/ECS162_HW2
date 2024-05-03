# Word Game Arcade

Our arcade contains the word games Hangman, Wordle, and Word Unscramble. Our main html page is index.html and it uses an iframe to host the html pages for the three games. 

## Hangman

## Wordle

Our Wordle implementation was made by Katie and is based off of the NYT Wordle game. Just like the NYT implementation, you have 6 tries to guess a random 5 letter word. Unique to our Wordle, the 5 letters that you input don't technically have to be a word, so a valid input would be "AAAAA", but it makes the game more fun to try to guess actual words. In addition, the correct word will never contain duplicates of a letter. At the end of your 6 tries if the user has not guessed the correct word, a pop-up message will display the correct word and after clicking out of the message, the board will be reset. The same goes for when the correct word is guess, but the message congratulates the user on their success at finding the word. Our Wordle is also designed to be able to play it as many times a day as you want, so you no longer have to wait a whole day to play the game again like the NYT version. 

## Word Unscramble

The Word Unscramble game is an open source game that was found on github at this link: https://github.com/GZ30eee/Word-Scramble-Game.
