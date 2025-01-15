// Klasa za upravljanje igrom
class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', '']; // Prazna ploča
        this.currentPlayer = 'X'; // Početni igrač
        this.isGameOver = false; // Stanje igre
        this.cells = document.querySelectorAll('.cell'); // Sve ćelije
        this.currentPlayerText = document.getElementById('current-player'); // Tekst za trenutnog igrača
        this.winnerText = document.getElementById('winner'); // Tekst za pobjednika
        this.resetButton = document.querySelector('.reset-button'); // Gumb za resetiranje igre

        this.initializeGame();
    }

    // Inicijalizacija igre
    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (event) => this.handleClick(event)); // Dodavanje event listenera za klik na ćelije
        });

        this.resetButton.addEventListener('click', () => this.resetGame()); // Dodavanje event listenera za resetiranje igre
    }

    // Funkcija za promjenu igrača
    changePlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.currentPlayerText.textContent = this.currentPlayer; // Prikazivanje trenutnog igrača
    }

    // Funkcija za provjeru pobjednika
    checkWinner() {
        const winPatterns = [
            [0, 1, 2], // Horizontalna prva
            [3, 4, 5], // Horizontalna druga
            [6, 7, 8], // Horizontalna treća
            [0, 3, 6], // Vertikalna prva
            [1, 4, 7], // Vertikalna druga
            [2, 5, 8], // Vertikalna treća
            [0, 4, 8], // Dijagonalna prva
            [2, 4, 6]  // Dijagonalna druga
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.isGameOver = true;
                this.winnerText.textContent = `Pobjednik je: ${this.currentPlayer}`;
                return;
            }
        }

        // Provjera je li ploča puna
        if (!this.board.includes('')) {
            this.isGameOver = true;
            this.winnerText.textContent = 'Nema pobjednika, izjednačeno!';
        }
    }

    // Funkcija za rukovanje klikom na ćeliju
    handleClick(event) {
        const cellIndex = event.target.getAttribute('data-cell'); // Dohvat indeksa ćelije

        if (this.board[cellIndex] !== '' || this.isGameOver) {
            return; // Ako je ćelija već zauzeta ili je igra gotova, ništa se ne događa
        }

        this.board[cellIndex] = this.currentPlayer; // Postavi marku (X ili O)
        event.target.textContent = this.currentPlayer; // Prikazivanje marke u ćeliji
        this.checkWinner(); // Provjera pobjednika
        if (!this.isGameOver) {
            this.changePlayer(); // Ako nema pobjednika, promijeni igrača
        }
    }

    // Funkcija za resetiranje igre
    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', '']; // Poništavamo ploču
        this.isGameOver = false;
        this.winnerText.textContent = ''; // Brišemo poruku o pobjedniku

        this.cells.forEach(cell => {
            cell.textContent = ''; // Brišemo sve marke u ćelijama
        });

        this.currentPlayer = 'X'; // Početni igrač je X
        this.currentPlayerText.textContent = this.currentPlayer; // Prikazujemo trenutnog igrača
    }
}

// Inicijaliziramo igru
const game = new TicTacToe();
