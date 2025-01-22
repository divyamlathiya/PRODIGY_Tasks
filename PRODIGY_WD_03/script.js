const TicTac = {
    cPlayer: "X", // Tracks current player (X or O)
    state: Array(9).fill(null), // Board state (null for empty cells)
    gameOver: false, // Indicates if the game is over
    scores: { X: 0, O: 0, tie: 0 }, // Track score for both players and ties
    difficulty: "medium", // Difficulty level of the computer (easy, medium, hard)

    // Initialize the game
    init() {
        this.cBoard();
        document
            .getElementById("reset")
            .addEventListener("click", () => this.reset());
        document
            .getElementById("difficulty")
            .addEventListener("change", (e) => {
                this.difficulty = e.target.value;
            });
        this.updateScoreboard();
    },

    // Create the game board dynamically
    cBoard() {
        const board = document.getElementById("board");
        board.innerHTML = ""; // Clear previous board
        this.state.forEach((_, i) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            board.appendChild(cell);
        });
        board.addEventListener("click", (e) => this.handleClick(e)); // Handle clicks on the board
        this.uMessage(`Player ${this.cPlayer}'s turn`);
    },

    // Handle a cell click
    handleClick(e) {
        const cell = e.target;
        const i = cell.dataset.index;

        // Ignore clicks if game is over or cell is taken
        if (this.gameOver || !cell.classList.contains("cell") || this.state[i])
            return;

        // Update board state and UI
        this.state[i] = this.cPlayer;
        cell.textContent = this.cPlayer;
        cell.classList.add("taken");

        // Check for winner or tie
        const winCombo = this.checkWin();
        if (winCombo) {
            this.highlight(winCombo);
            this.uMessage(`Player ${this.cPlayer} wins!`);
            this.scores[this.cPlayer]++;
            this.gameOver = true;
        } else if (this.state.every((cell) => cell)) {
            this.uMessage("It's a tie!");
            this.scores.tie++;
            this.gameOver = true;
        } else {
            // Switch players
            this.cPlayer = this.cPlayer === "X" ? "O" : "X";
            this.uMessage(`Player ${this.cPlayer}'s turn`);

            if (this.cPlayer === "O" && !this.gameOver) {
                this.computerMove();
            }
        }

        this.updateScoreboard();
    },

    // Check if there's a winning combination
    checkWin() {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], // Rows
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], // Columns
            [0, 4, 8],
            [2, 4, 6], // Diagonals
        ];
        return wins.find((combo) =>
            combo.every((i) => this.state[i] === this.cPlayer)
        );
    },

    // Highlight winning cells
    highlight(combo) {
        combo.forEach((i) => {
            document.getElementById("board").children[i].style.color = "red";
        });
    },

    // Reset the game
    reset() {
        this.state = Array(9).fill(null);
        this.cPlayer = "X";
        this.gameOver = false;
        this.cBoard();
    },

    // Update the game status message
    uMessage(msg) {
        document.getElementById("message").textContent = msg;
    },

    // Update the scoreboard UI
    updateScoreboard() {
        document.getElementById("scoreX").textContent = `Player X: ${this.scores.X}`;
        document.getElementById("scoreO").textContent = `Player O: ${this.scores.O}`;
        document.getElementById("scoreTie").textContent = `Ties: ${this.scores.tie}`;
    },

    // Computer move logic based on difficulty
    computerMove() {
        setTimeout(() => {
            let move;
            if (this.difficulty === "easy") {
                move = this.getRandomMove();
            } else if (this.difficulty === "medium") {
                move = this.getMediumMove();
            } else {
                move = this.getBestMove();
            }

            if (move !== undefined) {
                this.state[move] = "O";
                document.querySelector(`[data-index="${move}"]`).textContent = "O";
                document.querySelector(`[data-index="${move}"]`).classList.add("taken");

                const winCombo = this.checkWin();
                if (winCombo) {
                    this.highlight(winCombo);
                    this.uMessage("Player O wins!");
                    this.scores.O++;
                    this.gameOver = true;
                    this.updateScoreboard();
                } else if (this.state.every((cell) => cell)) {
                    this.uMessage("It's a tie!");
                    this.scores.tie++;
                    this.gameOver = true;
                    this.updateScoreboard();
                } else {
                    this.cPlayer = "X";
                    this.uMessage(`Player ${this.cPlayer}'s turn`);
                }
            }
        }, 500);
    },

    // Get a random available move (easy difficulty)
    getRandomMove() {
        const availableMoves = this.state
            .map((cell, index) => (cell === null ? index : null))
            .filter((cell) => cell !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    },

    // Get a medium difficulty move (blocking or random)
    getMediumMove() {
        // Check for a move that will block the player from winning
        const winningMove = this.findWinningMove("X");
        if (winningMove !== undefined) {
            return winningMove;
        }

        // Otherwise, return a random move
        return this.getRandomMove();
    },

    // Find a move that will make the player win
    findWinningMove(player) {
        const availableMoves = this.state
            .map((cell, index) => (cell === null ? index : null))
            .filter((cell) => cell !== null);

        for (const move of availableMoves) {
            this.state[move] = player;
            if (this.checkWin()) {
                this.state[move] = null; // Revert the move
                return move;
            }
            this.state[move] = null; // Revert the move
        }
        return undefined;
    },

    // Get the best move using the minimax algorithm (hard difficulty)
    getBestMove() {
        let bestScore = -Infinity;
        let bestMove;
        for (let i = 0; i < this.state.length; i++) {
            if (this.state[i] === null) {
                this.state[i] = "O";
                let score = this.minimax(this.state, 0, false);
                this.state[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    },

    // Minimax algorithm for optimal move (hard difficulty)
    minimax(board, depth, isMaximizing) {
        const winner = this.checkWinner(board);
        if (winner === "O") return 1;
        if (winner === "X") return -1;
        if (board.every((cell) => cell !== null)) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = "O";
                    let score = this.minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = "X";
                    let score = this.minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    },

    // Check if a player has won
    checkWinner(board) {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], // Rows
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], // Columns
            [0, 4, 8],
            [2, 4, 6], // Diagonals
        ];
        for (const combo of wins) {
            if (board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]] && board[combo[0]] !== null) {
                return board[combo[0]];
            }
        }
        return null;
    },
};

// Start the game
TicTac.init();
