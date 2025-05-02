console.log("in the js file");
const HUMAN = "Human";
const COMPUTER = "Computer";


/**
 * Generates a number, 0-2, that is used to determine the computers choice of 
 * rock, paper, or scissors
 */
function getRandomNumber () {
    return Math.floor(Math.random() * 3);
}

/**
 * Uses getRandomNumber() to return a string containing the computers choice
 * @returns Computers random turn choice
 */
function getComputerChoice () {
    console.log("getting computer choice");
    const computerNum = getRandomNumber();
    switch (computerNum) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
        default:
            console.log("Random number generator gave < 0 || > 2");
    }
}

/**
 * Runs the prompt box
 * 
 * @returns str Rock, Paper, or Scissors
 */
function getHumanChoice () {
    console.log("getting human choice");
    const humanChoice = prompt("Enter Rock, Paper, or Scissors");

    return humanChoice;
}

/**
 * Prints to the screen the user and computer choices
 * @param {*} humanChoice 
 * @param {*} computerChoice 
 */
function outputChoices (humanChoice, computerChoice) {
    console.log("outputing choices: ", humanChoice, "computerChoice: ", computerChoice);
    document.getElementById("userInput").innerHTML = `You chose: ${humanChoice}`;
    document.getElementById("computerInput").innerHTML = `Computer chose: ${computerChoice}`;
}

/**
 * Compares the User choice to the Computer choice
 * Directly uses all the winning cases for the User so any other option is a the computer winning
 * @param {*} humanChoice 
 * @param {*} computerChoice 
 * @returns 
 */
function determineWinner (humanChoice, computerChoice) {
    const human = humanChoice.toLowerCase();
    const computer = computerChoice.toLowerCase();
    console.log("determining winner - human choice: ", humanChoice, " computer choice: ", computerChoice);
    if (human === computer) {
        return "Tie";
    } else if (human === "rock" && computer === "scissors") {
        return HUMAN;
    } else if (human === "paper" && computer === "rock") {
        return HUMAN;
    } else if (human === "scissors" && computer === "paper") {
        return HUMAN;
    } else {
        return COMPUTER;
    }
}

/**
 * Outputs to the screen the winner of a round
 * @param {string} winner "User" or COMPUTER
 */
function outputWinner (winner) {
    console.log("outputing winner: ", winner);
    if (winner == "Tie") {
        document.getElementById("winner").innerHTML = "This round was a Tie";
    } else {
        document.getElementById("winner").innerHTML = winner + " won this round!";
    }
}

/**
 * Outputs to the screen the overall score at the end of each round
 * @param {*} user 
 * @param {*} computer 
 */
function outputScore (user, computer) {
    console.log("outputting score: ", user, computer);
    document.getElementById("userScore").innerHTML = `Your score: ${user}`;
    document.getElementById("computerScore").innerHTML= `Computer score: ${computer}`;
}

/**
 * Gets the winner by comparing the userScore and computerScore
 * @param {*} userScore 
 * @param {*} computerScore 
 * @returns 
 */
function getWinner(userScore, computerScore) {
    return userScore > computerScore ? HUMAN : COMPUTER;
}

/**
 * Clear the screen of all output
 */
function clearElements() {
    document.getElementById("userInput").innerHTML = "";
    document.getElementById("computerInput").innerHTML = "";
    document.getElementById("winner").innerHTML = "";
    document.getElementById("userScore").innerHTML = "";
    document.getElementById("computerScore").innerHTML = "";
    document.getElementById("gameWinner").innerHTML = "";
    document.getElementById("gameOver").innerHTML = "";
}

function setControlButtons() {
    // Disabled the Start button once the game has started.
    // Players don't need to hit it again and hitting it twice causes the gameChoiceContainer div to 
    //  get added twice and I don't want that
    const playBtn = document.querySelector("#playButton");
    playBtn.disabled = !playBtn.disabled;

    // Enables the Reset Button once the game has actually started and a user might want to start over
    const resetBtn = document.querySelector("#resetButton");
    resetBtn.disabled = !resetBtn;
}


/**
 * Plays the game
 */
function playGame () {
    setControlButtons();
    
    let userScore;
    let computerScore;
    let playerChoice = undefined;
    let computerChoice;

    const choiceHandler = (event, choice) => {
        console.log("choice: ", choice);
        playerChoice = choice;
    }

    const gameControlContainer = document.querySelector("#gameControls");

    // Add the container for that will hold the Player Choice buttons
    const gameChoiceContainer = document.createElement("div");
    gameChoiceContainer.id = "gameChoiceContainer";
    gameControlContainer.appendChild(gameChoiceContainer);

    // Add Rock button
    const rockBtn = document.createElement("button");
    rockBtn.id = "rockBtn";
    rockBtn.textContent = "Rock";
    rockBtn.classList.toggle("choiceBtnStyle");
    rockBtn.addEventListener("click", (event) => {
        choiceHandler(event, "Rock");
    });
    gameChoiceContainer.appendChild(rockBtn);

    // Add Paper Button
    const paperBtn = document.createElement("button");
    paperBtn.id = "paperBtn";
    paperBtn.textContent = "Paper";
    paperBtn.classList.toggle("choiceBtnStyle");
    paperBtn.addEventListener("click", (event) => {
        choiceHandler(event, "Paper");
    });
    gameChoiceContainer.appendChild(paperBtn);
    
    // Add Scissors button
    const scissorBtn = document.createElement("button");
    scissorBtn.id = "scissorBtn";
    scissorBtn.textContent = "Scissors";
    scissorBtn.classList.toggle("choiceBtnStyle");
    scissorBtn.addEventListener("click", (event) => {
        choiceHandler(event, "Scissors");
    });
    gameChoiceContainer.appendChild(scissorBtn);
    console.log("playerchoice to be returned: ", playerChoice);

    if (playerChoice !== undefined) {
        console.log(`got a player choice ${playerChoice}`);
        // Get the computer choice
        computerChoice = getComputerChoice();

        outputChoices(playerChoice, computerChoice);

        const winner = determineWinner(playerChoice, computerChoice);

        outputWinner(winner);

        if (winner === HUMAN) {
            userScore++;
        } else if (winner === COMPUTER) {
            computerScore++;
        }

        outputScore(userScore, computerScore);
    }

}
// async function playGame () {
//     console.log("playing game");
//     let userScore = 0;
//     let computerScore = 0;
//     // Break the loop if either one is 5
//     while (userScore < 5 && computerScore < 5) {
//         const humanChoice = getHumanChoice();
//         const computerChoice = getComputerChoice();
//         console.log("choices in loop: ", humanChoice, computerChoice);

//         outputChoices(humanChoice, computerChoice);

//         const winner = determineWinner(humanChoice, computerChoice);

//         outputWinner(winner);

//         if (winner === HUMAN) {
//             userScore++;
//         } else if (winner === COMPUTER) {
//             computerScore++;
//         }

//         outputScore(userScore, computerScore);

//         await new Promise(resolve => setTimeout(resolve), 5000);
//     }

//     const gameWinner = getWinner(userScore, computerScore);
//     document.getElementById("gameWinner").innerHTML = gameWinner + " Won the Game!";

//     document.getElementById("gameOver").innerHTML = "Game Complete! Play again? Click Play Game above. Thanks for coming!";    

//     const resetButton = document.getElementById("resetButton");
//     resetButton.addEventListener("click", (e) => {
//         console.log("reseting scores");
//         userScore = 0;
//         computerScore = 0;
//         console.log(`Scores reset: user: ${userScore}, computer: ${computerScore}`);
//         clearElements();
//     });
// }
