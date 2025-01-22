const TicTac = {
    cPlayer: "X",
    state: Array(9).fill(null),
    gameOver: false,
    scores: { X: 0, O: 0, tie: 0 },
    difficulty: "medium",
    mode: "friend", // friend mode by default

    init() {
        this.cBoard();
        document.getElementById("reset").addEventListener("click", () => this.reset());
        document.getElementById("friendMode").addEventListener("click", () => this.setMode("friend"));
        document.getElementById("aiMode").addEventListener("click", () => this.setMode("ai"));
        this.updateScoreboard();
    },

    setMode(mode) {
        this.mode = mode;
        this.gameOver = false;
        this.state = Array(9).fill(null);
        this.cPlayer = "X";
        this.cBoard();
        document.getElementById("turnButton").textContent = "Player X's turn";
        this.updateTurnIndicator();
        document.getElementById("friendMode").style.backgroundColor = mode === "friend" ? "black" : "";
        document.getElementById("aiMode").style.backgroundColor = mode === "ai" ? "black" : "";
    },

    cBoard() {
        const board = document.getElementById("board");
        board.innerHTML = "";
        this.state.forEach((_, i) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            board.appendChild(cell);
        });
        board.addEventListener("click", e => this.handleClick(e));
        this.uMessage(`Player ${this.cPlayer}'s turn`);
    },

    handleClick(e) {
        const cell = e.target;
        const i = cell.dataset.index;
        if (this.gameOver || this.state[i]) return;

        this.state[i] = this.cPlayer;
        cell.textContent = this.cPlayer;
        cell.classList.add("taken");

        const winCombo = this.checkWin();
        if (winCombo) {
            this.highlight(winCombo);
            this.uMessage(`Player ${this.cPlayer} wins!`);
            this.scores[this.cPlayer]++;
            this.gameOver = true;
            this.updateTurnIndicator();
        } else if (this.state.every(cell => cell)) {
            this.uMessage("It's a tie!");
            this.scores.tie++;
            this.gameOver = true;
            this.updateTurnIndicator();
        } else {
            this.cPlayer = this.cPlayer === "X" ? "O" : "X";
            this.uMessage(`Player ${this.cPlayer}'s turn`);
            this.updateTurnIndicator();
            if (this.cPlayer === "O" && !this.gameOver && this.mode === "ai") {
                this.computerMove();
            }
        }
        this.updateScoreboard();
    },

    checkWin() {
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return wins.find(combo => combo.every(i => this.state[i] === this.cPlayer));
    },

    highlight(combo) {
        combo.forEach(i => document.getElementById("board").children[i].style.color = "red");
    },

    reset() {
        this.state = Array(9).fill(null);
        this.cPlayer = "X";
        this.gameOver = false;
        this.cBoard();
        document.getElementById("turnButton").textContent = "Player X's turn";
        this.updateTurnIndicator();
        document.getElementById("friendMode").style.backgroundColor = "";
        document.getElementById("aiMode").style.backgroundColor = "";
    },

    uMessage(msg) {
        document.getElementById("message").textContent = msg;
    },

    updateTurnIndicator() {
        const turnButton = document.getElementById("turnButton");

        if (this.gameOver) {
            turnButton.textContent = "Game Over";
            turnButton.style.backgroundColor = "lightcoral";
        } else {
            turnButton.textContent = `Player ${this.cPlayer}'s turn`;
            if (this.cPlayer === "X") {
                turnButton.style.backgroundColor = "#008080"; // Green for Player X
            } else {
                turnButton.style.backgroundColor = "#deb887"; // Blue for Player O
            }
        }
    },

    updateScoreboard() {
        document.getElementById("scoreX").textContent = `Player X: ${this.scores.X}`;
        document.getElementById("scoreO").textContent = `Player O: ${this.scores.O}`;
        document.getElementById("scoreTie").textContent = `Ties: ${this.scores.tie}`;
    },

    computerMove() {
        setTimeout(() => {
            const move = this[this.difficulty === "easy" ? "getRandomMove" : "getBestMove"]();
            this.state[move] = "O";
            document.querySelector(`[data-index="${move}"]`).textContent = "O";
            document.querySelector(`[data-index="${move}"]`).classList.add("taken");

            const winCombo = this.checkWin();
            if (winCombo) {
                this.highlight(winCombo);
                this.uMessage("Player O wins!");
                this.scores.O++;
                this.gameOver = true;
            } else if (this.state.every(cell => cell)) {
                this.uMessage("It's a tie!");
                this.scores.tie++;
                this.gameOver = true;
            } else {
                this.cPlayer = "X";
                this.uMessage(`Player ${this.cPlayer}'s turn`);
            }
            this.updateScoreboard();
            this.updateTurnIndicator();
        }, 500);
    },

    getRandomMove() {
        return this.state.filter((cell, i) => cell === null)[Math.floor(Math.random() * this.state.filter(cell => cell === null).length)];
    },

    getBestMove() {
        let bestMove, bestScore = -Infinity;
        this.state.forEach((cell, i) => {
            if (cell === null) {
                this.state[i] = "O";
                const score = this.minimax(this.state, false);
                this.state[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        });
        return bestMove;
    },

    minimax(board, isMaximizing) {
        const winner = this.checkWinner(board);
        if (winner) return winner === "O" ? 1 : -1;
        if (board.every(cell => cell)) return 0;

        let bestScore = isMaximizing ? -Infinity : Infinity;
        board.forEach((cell, i) => {
            if (cell === null) {
                board[i] = isMaximizing ? "O" : "X";
                const score = this.minimax(board, !isMaximizing);
                board[i] = null;
                bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
            }
        });
        return bestScore;
    },

    checkWinner(board) {
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const combo of wins) {
            if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
                return board[combo[0]];
            }
        }
        return null;
    }
};

TicTac.init();
