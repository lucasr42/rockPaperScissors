console.log("in the js file");

/**
 * Generates a number, 0-2, that is used to determine the computers choice of 
 * rock, paper, or scissors
 */
function getRandomNumber () {
    return Math.floor(Math.random() * 3);
}

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

// Test function to output the result of various functions
for (let i = 0; i < 5; i++) {
    console.log(getComputerChoice());
}
