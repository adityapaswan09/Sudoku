
// console.log(puzzle);
const p = document.querySelector(".subtitle");
const cells = document.querySelectorAll(".cell");
let count = 0;
const arrange = (puzzle) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            cells[count].value = "";
            cells[count].disabled = false;
            if (puzzle[i][j] != 0) {
                cells[count].value = puzzle[i][j];
                cells[count].disabled = true;
            }
            count++;
        }
    }
    count = 0;
}
async function loadPuzzle(level) {
    const response = await fetch(`https://sugoku.onrender.com/board?difficulty=${level}`);
    const data = await response.json();
    puzzle = data.board;
    console.log(puzzle);
    arrange(puzzle);
}
const check = (num, pos) => {
    let row = Math.floor(pos / 9);
    let column = pos % 9;
    for (let i = 0; i < 9; i++) {
        if (puzzle[row][i] == num) return 0;
        if (puzzle[i][column] == num) return 0;
    }
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(column / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (puzzle[i][j] == num) return 0;
        }
    }

    return 1;

}
const wincheck = () => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (puzzle[i][j] == 0) return false;
        }
    }
    return true;
}
const block = () => {
    for (let i = 0; i < 81; i++) {
        cells[i].disabled = true;
    }
}
const unblock = () => {
    for (let i = 0; i < 81; i++) {
        cells[i].disabled = false;
    }
}

const solve = document.querySelector(".solve");
for (let i = 0; i < 81; i++) {
    cells[i].addEventListener("input", (input) => {
        let num = Number(input.target.value);
        let row = Math.floor(i / 9);
        let column = i % 9;
        if (input.target.value === "") {
            puzzle[row][column] = 0;
            cells[i].classList.remove("red");
            solve.disabled = false;
            return;
        }
        if (check(num, i)) {
            // console.log(row,column);
            puzzle[row][column] = num;
            // console.log(puzzle);
            cells[i].classList.remove("red");
            solve.disabled = false;
        }

        else {
            cells[i].classList.add("red");
            solve.disabled = true;
        }

    })
}
solve.addEventListener("click", () => {
    if (wincheck()) {
        p.innerText = "🎉 Congratulations! Sudoku solved!"
        block();
    }
    else {
        p.innerText = "Fill All Boxes"
    }
})
const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    for (let i = 0; i < 81; i++) {
        if (!cells[i].disabled) {
            cells[i].value = "";
            puzzle[Math.floor(i / 9)][i % 9] = 0;
        }
        cells[i].classList.remove("red");

    }

})
document.querySelector(".easy").addEventListener("click", () => {
    loadPuzzle("easy");
    unblock();
    p.innerText = "Enter the puzzle and let the algorithm solve it."
})
document.querySelector(".medium").addEventListener("click", () => {
    loadPuzzle("medium");
    unblock();
    p.innerText = "Enter the puzzle and let the algorithm solve it."
})
document.querySelector(".Difficult").addEventListener("click", () => {
    loadPuzzle("hard");
    unblock();
    p.innerText = "Enter the puzzle and let the algorithm solve it."
})
