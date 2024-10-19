let cellColors = JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#00FF00');
let acceptedCount = cellColors.filter(color => color === '#00FF00').length;
let acceptCount = 0;
let declineCount = 0;

function updateAcceptanceRate() {
    const acceptanceRate = (acceptedCount / cellColors.length) * 100;
    document.getElementById('acceptance-rate').textContent = acceptanceRate.toFixed(2) + '%';
}

function updateDisplayCounts() {
    document.getElementById('accept-count').textContent = acceptCount;
    document.getElementById('decline-count').textContent = declineCount;
}

function updateRedCount() {
    const redCount = cellColors.filter(color => color === '#FF0000').length;
    document.getElementById('decline-count').textContent = redCount;
}

function toggleCellColor(cellIndex) {
    const currentColor = cellColors[cellIndex];
    const newColor = currentColor === '#00FF00' ? '#FF0000' : '#00FF00';

    if (currentColor !== newColor) {
        cellColors[cellIndex] = newColor;
        document.getElementById(`cell-${cellIndex}`).style.backgroundColor = newColor;

        if (newColor === '#00FF00') {
            acceptedCount++;
        } else {
            acceptedCount--;
        }

        localStorage.setItem('cellColors', JSON.stringify(cellColors));
        updateAcceptanceRate();
        updateRedCount();
    }
}

function paint(color) {
    const colorCode = color === 'red' ? '#FF0000' : '#00FF00';

    if (colorCode === '#00FF00') {
        acceptCount++;
    } else {
        declineCount++;
    }
    updateDisplayCounts();

    if (cellColors[99] === '#00FF00') {
        acceptedCount--;
    }

    for (let i = cellColors.length - 1; i > 0; i--) {
        cellColors[i] = cellColors[i - 1];
        document.getElementById(`cell-${i}`).style.backgroundColor = cellColors[i];
    }

    cellColors[0] = colorCode;
    document.getElementById('cell-0').style.backgroundColor = colorCode;

    if (colorCode === '#00FF00') {
        acceptedCount++;
    }

    localStorage.setItem('cellColors', JSON.stringify(cellColors));
    updateAcceptanceRate();
    updateRedCount();
}

window.onload = function() {
    const cellsContainer = document.querySelector('.cells');
    for (let i = 0; i < cellColors.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.style.backgroundColor = cellColors[i];

        cell.addEventListener('click', () => toggleCellColor(i));

        cellsContainer.appendChild(cell);
    }
    updateAcceptanceRate();
    updateDisplayCounts();
    updateRedCount();
};
