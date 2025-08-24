let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGsmeBTn = document.querySelector("#new-btn"); 
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
const winPattrens = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Hide "New Game" button at start
newGsmeBTn.style.display = "none";

// Function to enable all boxes (used in reset)
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerHTML = "";
    });
};

// Reset function
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide"); // hide container
    newGsmeBTn.style.display = "none";  // hide new game button again
    msg.innerHTML = "";                  // clear message
};

// Click events for boxes
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerHTML = "O";
            turnO = false;
        } else {
            box.innerHTML = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Show winner
const showWinner = (winner) => {
    msg.innerHTML = `Congrats, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    newGsmeBTn.style.display = "block"; // show new game button only after win
};

// Check winner
const checkWinner = () => {
    for (let pattern of winPattrens) {
        let pos1val = boxes[pattern[0]].innerHTML;
        let pos2val = boxes[pattern[1]].innerHTML;
        let pos3val = boxes[pattern[2]].innerHTML;

        if (pos1val && pos2val && pos3val) {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                disableBoxes();
                return;
            }
        }
    }
};

// Event listeners for reset/new game buttons
newGsmeBTn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
