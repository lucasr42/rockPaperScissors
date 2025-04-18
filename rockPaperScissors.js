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

/**
 * Plays the game
 */
async function playGame () {
    console.log("playing game");
    let userScore = 0;
    let computerScore = 0;
    // Break the loop if either one is 5
    while (userScore < 5 && computerScore < 5) {
        const humanChoice = getHumanChoice();
        const computerChoice = getComputerChoice();
        console.log("choices in loop: ", humanChoice, computerChoice);

        outputChoices(humanChoice, computerChoice);

        const winner = determineWinner(humanChoice, computerChoice);

        outputWinner(winner);

        if (winner === HUMAN) {
            userScore++;
        } else if (winner === COMPUTER) {
            computerScore++;
        }

        outputScore(userScore, computerScore);

        await new Promise(resolve => setTimeout(resolve), 5000);
    }

    const gameWinner = getWinner(userScore, computerScore);
    document.getElementById("gameWinner").innerHTML = gameWinner + " Won the Game!";

    document.getElementById("gameOver").innerHTML = "Game Complete! Play again? Click Play Game above. Thanks for coming!";    

    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", (e) => {
        console.log("reseting scores");
        userScore = 0;
        computerScore = 0;
        console.log(`Scores reset: user: ${userScore}, computer: ${computerScore}`);
        clearElements();
    });
}
