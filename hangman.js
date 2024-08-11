let wordeasy = ["apple", "banana", "orange", "mango", "strawberry", "cherry", "apricot", "pineapple", "guava", "pomegranate"];
let wordmedium = ["computer", "keyboard", "mouse", "laptop", "printer", "desktop", "floppydisk", "operatingsystem"];
let wordhard = ["exquisite", "beekeeper", "abruptly", "absurd", "awkward", "azure", "blizzard", "blitz", "bookworm", "cobweb", "embezzle", "gossip"];
let maxguesses = 6;

let head = document.querySelector(".circle");
let body = document.querySelector(".bod");
let larm = document.querySelector("#leftarm");
let Rarm = document.querySelector("#rightarm");
let lleg = document.querySelector("#leftleg");
let Rleg = document.querySelector("#rightleg");

function hidebodypart(bodypart) {
    bodypart.style.display = 'none';
}

function showbodypart(bodypart) {
    bodypart.style.display = 'block';
}

hidebodypart(head);
hidebodypart(body);
hidebodypart(larm);
hidebodypart(Rarm);
hidebodypart(lleg);
hidebodypart(Rleg);

class Skeleton {
    hangmanprint(incorrectguesses) {
        switch (incorrectguesses) {
            case 1:
                showbodypart(head);
                break;
            case 2:
                showbodypart(body);
                break;
            case 3:
                showbodypart(larm);
                break;
            case 4:
                showbodypart(Rarm);
                break;
            case 5:
                showbodypart(lleg);
                break;
            case 6:
                showbodypart(Rleg);
                break;
        }
    }
}

class RandomAndHiddenWords {
    getRandomWord(wordList) {
        const index = Math.floor(Math.random() * wordList.length);
        return wordList[index];
    }

    getHiddenWord(word, guessedLetters) {
        let container = document.getElementById('word-container');
        container.innerHTML = '';

        let revealedWord = '';
        for (let i = 0; i < word.length; i++) {
            let c = word.charAt(i);
            if (guessedLetters.includes(c)) {
                revealedWord += c;
                let charSpan = document.createElement('span');
                charSpan.textContent = c;
                container.appendChild(charSpan);
            } else {
                revealedWord += '_';
                let inputBox = document.createElement('span');
                inputBox.textContent = '_';
                inputBox.className = 'char-input';
                container.appendChild(inputBox);
            }
        }
        return revealedWord;
    }
}

// Get buttons for tracking guesses
let trackButtons = document.querySelectorAll(".track-btn");

function tracker(letter) {
    const button = Array.from(trackButtons).find(btn => btn.textContent === letter.toUpperCase());
    if (button) {
        button.style.backgroundColor = "#885df1";
        button.style.color = "white";
    }
}
//Replay function after the game over
// function replay() {
//     if (hiddenWord === word || incorrectGuesses === maxguesses) {
//         // Hide body parts
//         hidebodypart(head);
//         hidebodypart(body);
//         hidebodypart(larm);
//         hidebodypart(Rarm);
//         hidebodypart(lleg);
//         hidebodypart(Rleg);

//         // Reset counters
//         correctCount = 0;
//         incorrectCount = 0;
//         incorrectGuesses = 0;
//         guessedLetters = [];

//         // Reset button styles
//         trackButtons.forEach(button => {
//             button.style.backgroundColor = "";
//             button.style.color = "";
//         });

//         // Clear messages
//         document.getElementById('message').textContent = "";
//         document.getElementById("correct-input").value = "";
//         document.getElementById("uncorrect-input").value = "";

//         // Get a new word
//         word = rh.getRandomWord(wordlisting);
//         rh.getHiddenWord(word, guessedLetters);
//     }
// }
function replay()
{
    // if(hiddenWord === word||incorrectGuesses === maxguesses)
    // {
    // window.location.reload();
    // return false

    window.location.reload();

}
//just function call
//replay();
let sk = new Skeleton();
let rh = new RandomAndHiddenWords();

let difficulty = localStorage.getItem('difficulty') || 'Easy';
let wordlisting;
let word;

if (difficulty === "Easy") {
    wordlisting = wordeasy;
} else if (difficulty === "Medium") {
    wordlisting = wordmedium;
} else if (difficulty === "Hard") {
    wordlisting = wordhard;
}

word = rh.getRandomWord(wordlisting);
let guessedLetters = [];
let incorrectGuesses = 0;

function guessLetter(guess = null) {
    if (!guess) {
        guess = document.getElementById('guess-input').value.toLowerCase();
        document.getElementById('guess-input').value = '';
    }

    if (guess.length !== 1 || guessedLetters.includes(guess)) {
        alert("Please enter a valid letter that you haven't guessed before.");
        return;
    }

    guessedLetters.push(guess);
    tracker(guess);

    if (word.includes(guess)) {
        console.log("Correct guess!");
        correctCount++;
    } else {
        console.log("Incorrect guess!");
        incorrectGuesses++;
        sk.hangmanprint(incorrectGuesses);
        incorrectCount++;
    }

    document.getElementById("correct-input").value = correctCount;
    document.getElementById("uncorrect-input").value = incorrectCount;

    let hiddenWord = rh.getHiddenWord(word, guessedLetters);
    if (hiddenWord === word) {
        document.getElementById('message').textContent = "Congratulations! You won!";
    }

    if (incorrectGuesses === maxguesses) {
        document.getElementById('message').textContent = "Game over! The word was: " + word;
    }

}
