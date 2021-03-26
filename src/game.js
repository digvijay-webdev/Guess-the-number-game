const StepOneSection = document.querySelector("#stepOne");
const StepOneStartBTN = document.querySelector("#stepOne button");
const StepTwoSection = document.querySelector("#stepTwo");
const StepTwoReadyBTN = document.querySelector("#stepTwo button");
const StepThreeSection = document.querySelector("#stepThree");
const Form = document.querySelector("#stepThree form");
const FormInput = document.querySelector("#stepThree form input");
const FormSubmitBTN = document.querySelector("#stepThree form button");
const highOrLow = document.querySelector("#stepThree h2");
const displayRange = document.querySelector("#displayRange");
const chancesLeft = document.querySelector(".chances");

// STEP ONE
StepOneStartBTN.addEventListener("click", () => {
    StepOneSection.classList.add("hide");
    StepTwoSection.classList.remove("hide");
});

/* Generate Random Number Fn */
function getRandomNumber(maxValue) {
    let RandomNumber = Math.ceil(Math.random() * maxValue);
    return RandomNumber;
}

// Global Variables
let selectedNumber;
let guessChances;

// STEP TWO
StepTwoReadyBTN.addEventListener("click", () => {
    StepTwoSection.classList.add("hide");
    StepThreeSection.classList.remove("hide");
    // add max value dynamically max value
    const ranges = [10, 50, 100];
    let selectedRange = ranges[Math.floor(Math.random() * ranges.length)];

    // display range to the user
    displayRange.textContent = `Guess the number between 1 to ${selectedRange}`;

    // Randomly selected number
    selectedNumber = getRandomNumber(selectedRange);
    FormInput.max = selectedRange;
    guessChances = 3;
});

// STEP THREE
Form.addEventListener("submit", GameFn);

// Game Features
function GameFn(e) {
    // Preventing Default Behaviour or form submission
    e.preventDefault();

    // refresh the page to indicate game restart
    if (FormSubmitBTN.textContent === "Try Again") {
        location.reload();
    }

    // refresh the page to indicate new game
    if (FormSubmitBTN.textContent === "Play Again") {
        location.reload();
    }

    console.log(guessChances);
    // deduct one guess chance on each submission
    if (guessChances > 0) {
        // Detect Win
        if (selectedNumber === Number(FormInput.value)) {
            highOrLow.textContent = "You won the game!!";
            FormInput.disabled = true;
            FormInput.classList.add("disabled");
            FormSubmitBTN.textContent = "Play Again";
            return true;
        }

        // Indicate wether the guess was high or low
        if (Number(FormInput.value) > selectedNumber) {
            highOrLow.textContent = "too high";
        } else {
            highOrLow.textContent = "too low";
        }
        guessChances--;
        console.log(selectedNumber, guessChances);
        chancesLeft.textContent = `${guessChances} guess(es) left`;
        
        // clear input field
        FormInput.value = '';
    } else {
        highOrLow.textContent = "Game Over";
        chancesLeft.textContent = `The right number was '${selectedNumber}'`;

        // clear input field && disable it
        FormInput.value = '';
        FormInput.disabled = true;
        FormInput.classList.add("disabled");
        FormSubmitBTN.textContent = "Try Again";
    }
}
