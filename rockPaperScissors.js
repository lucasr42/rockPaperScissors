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
 * Prints to the screen the user and computer choices
 * @param {*} humanChoice 
 * @param {*} computerChoice 
 */
function outputChoices (humanChoice, computerChoice) {
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
    if (userScore === 5) {
        return HUMAN;
    } else if (computerScore === 5) {
        return COMPUTER;
    } else {
        return undefined;
    }
}

// Prints the winner to the screen
function outputGameWinner(gameWinner) {
    const container = document.querySelector("#gameChoiceContainer");
    const gameWinnerOutput = document.createElement("h1");
    gameWinnerOutput.id = "gameWinnerOutput";
    gameWinnerOutput.textContent = gameWinner + " Won!";
    container.appendChild(gameWinnerOutput);
}

// Disabled the Rock, Paper, Scissors buttons at the end of the game so 
//  the user can't keep clicking them
function disableChoiceButtons() {
    const rockButton = document.querySelector("#rockBtn");
    rockButton.disabled = true;

    const paperButton = document.querySelector("#paperBtn");
    paperButton.disabled = true;

    const scissorsButton = document.querySelector("#scissorBtn");
    scissorsButton.disabled = true;
}

/**
 * Clear the screen of all output
 */
function clearElements() {
    const bold = document.querySelectorAll("b");
    const boldArray = [...bold];
    boldArray.forEach((item) => {
        item.textContent = "";
    })

    const rockBtn = document.querySelector("#rockBtn");
    rockBtn.parentElement.removeChild(rockBtn);
    const paperBtn = document.querySelector("#paperBtn");
    paperBtn.parentElement.removeChild(paperBtn);
    const scissorBtn = document.querySelector("#scissorBtn");
    scissorBtn.parentElement.removeChild(scissorBtn);
    const gameChoiceContainer = document.querySelector("#gameChoiceContainer");
    gameChoiceContainer.parentElement.removeChild(gameChoiceContainer);   
}

// Flips the disabled attr for Play Game and Reset Game buttons
function setControlButtons() {
    // Disabled the Start button once the game has started.
    // Players don't need to hit it again and hitting it twice causes the gameChoiceContainer div to 
    //  get added twice and I don't want that
    const playBtn = document.querySelector("#playButton");
    playBtn.disabled = !playBtn.disabled;

    // Enables the Reset Button once the game has actually started and a user might want to start over
    const resetBtn = document.querySelector("#resetButton");
    resetBtn.disabled = !resetBtn.disabled;
}

// Resets the game and clears the screen
function resetGame() {
    clearElements();
    setControlButtons();
}

/**
 * Plays the game
 */
function playGame () {
    setControlButtons();
    
    let userScore = 0;
    let computerScore = 0;
    let playerChoice = undefined;
    let computerChoice = undefined;

    // Takes a players choice and gets the computer choice
    // All of the game calling functions happen here
    const playRound = (event, choice) => {
        playerChoice = choice;
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

        const gameWinner = getWinner(userScore, computerScore);

        if (gameWinner) {
            disableChoiceButtons();
            outputGameWinner(gameWinner);
            
            // resetGame();
        }
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
        playRound(event, "Rock");
    });
    gameChoiceContainer.appendChild(rockBtn);

    // Add Paper Button
    const paperBtn = document.createElement("button");
    paperBtn.id = "paperBtn";
    paperBtn.textContent = "Paper";
    paperBtn.classList.toggle("choiceBtnStyle");
    paperBtn.addEventListener("click", (event) => {
        playRound(event, "Paper");
    });
    gameChoiceContainer.appendChild(paperBtn);
    
    // Add Scissors button
    const scissorBtn = document.createElement("button");
    scissorBtn.id = "scissorBtn";
    scissorBtn.textContent = "Scissors";
    scissorBtn.classList.toggle("choiceBtnStyle");
    scissorBtn.addEventListener("click", (event) => {
        playRound(event, "Scissors");
    });
    gameChoiceContainer.appendChild(scissorBtn);
}
