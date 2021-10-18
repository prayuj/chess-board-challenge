(function() {
    class ChessBoard {
    constructor (chessBoardElement) {
        this.chessBoardElement = chessBoardElement;
        this.handleCellClick = this.handleCellClick.bind(this);
    }

    init() {
        this.chessBoardElement.innerHTML = "";
        this.buildBoard();
        this.addEventListenersToChessBoard();
    }

    buildBoard () {
        for (let i = 0; i < 8; i++) { 
            for (let j = 0; j < 8; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                this.chessBoardElement.appendChild(cell);
            }
        }
    }

    addEventListenersToChessBoard () {
        this.chessBoardElement.addEventListener('click', this.handleCellClick);
    }

    highlightCells(row, col, rowAdder, colAdder) {
        row = row + rowAdder;
        col = col + colAdder;
        while (row >= 0 && col >= 0 && row < 8 && col < 8) {
            const cell = this.chessBoardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`)
            cell.classList.add('highlighted');
            row = row + rowAdder;
            col = col + colAdder;
        }
    }

    resetBoard () {
        const cells = this.chessBoardElement.querySelectorAll('div.cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].classList.remove('selected')
            cells[i].classList.remove('highlighted')
        }
    }

    handleCellClick(event) {
        const cell = event.target;
        if (cell.classList.contains('cell')) {
            const row = parseInt(cell.dataset.row),
                col = parseInt(cell.dataset.col);

            this.resetBoard();
            cell.classList.add('selected');

            this.highlightCells(row, col, 1, 1);
            this.highlightCells(row, col, 1, -1);
            this.highlightCells(row, col, -1, 1);
            this.highlightCells(row, col, -1, -1)
        }
    }
}

const cb = new ChessBoard(document.getElementById('chess-board'))
cb.init();

document.addEventListener('click', (e)=>{
    e.preventDefault();
    const target = e.target;
    if (!target.classList.contains('cell')) cb.resetBoard()
})
})()
