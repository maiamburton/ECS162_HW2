# Word Game Arcade

Our arcade contains the word games Hangman, Wordle, and Word Unscramble. They are hosted on a main html file and interact with the user with an iframe rather than on a new page. We felt that this added to the usibility of our arcade, especially on mobile devices--new tabs interrupt game flow and are annoying.

## Hangman

Our Hangman implementation was made by Maia. It gives the user three difficulty settings of easy, medium, and difficult. As the difficulty settings increase, so do the lengths of the words. Correctly guessing multiple words in a row will start a streak count, with every consecutive correct guess, incrementing the user's score. A hint button is also available to give you one correct letter at a time if you are stuck. The game will tolerate 6 wrong guesses but will end on the 7th. 

While Hangman is a fun game, the concept is rather morbid. The images for our implementation is taken from https://hangmanwordgame.com/. The link to the game is also included in hangman.css.

## Wordle

Our Wordle implementation was made by Katie and is based off of the NYT Wordle game. Just like the NYT implementation, you have 6 tries to guess a random 5 letter word. Unique to our Wordle, the 5 letters that you input don't technically have to be a word, so a valid input would be "AAAAA", but it makes the game more fun to try to guess actual words. In addition, the correct word will never contain duplicates of a letter. At the end of your 6 tries if the user has not guessed the correct word, a pop-up message will display the correct word and after clicking out of the message, the board will be reset. The same goes for when the correct word is guess, but the message congratulates the user on their success at finding the word. Our Wordle is also designed to be able to play it as many times a day as you want, so you no longer have to wait a whole day to play the game again like the NYT version. 

## Word Unscramble

The Word Unscramble game is an open source game that was found on github at this link: https://github.com/GZ30eee/Word-Scramble-Game. It is licensed under the MIT license and we made sure to include the proper citation on our website. It includes a list of words that are scrambled and given to the user along with a hint and a difficulty score, based on the length of the word. The user then has 30 seconds to guess the word and if guessed correctly the score is incremented and another word becomes available to guess. If the word is not guess within the timeframe, the game is refreshed and a new word appears. Integrating this code into our website included a few design changes. The css was changed so that the background matched the backgrounds of the Hangman and Wordle games, and a link to the creators social media was removed. In addition to those visible changes, function names inside the code were changed.

## Reactive Design

Burton-Sharp games is designed to work on standard desktop and mobile screen sizes. Comparing desktop and mobile you will notice that the structure of Hangman differs but its functionality remains the same. Wordle and Word Unscramble structure and functionality are the same on mobile vs desktop. 
