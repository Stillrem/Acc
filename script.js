let acceptCount = 0;
let declineCount = 0;
const cellColors = JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#FFFFFF');
let acceptedCount = cellColors.filter(color => color === '#00FF00').length;

function updateAcceptanceRate() {
    const acceptanceRate = (acceptedCount / 100) * 100;
    document.getElementById('acceptance-rate').textContent = `Acceptance Rate: ${acceptanceRate.toFixed(2)}%`;
}

function updateDisplayCounts() {
    document.getElementById('accept-count').textContent = acceptCount;
    document.getElementById('decline-count').textContent = declineCount;
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
        acceptedCount = Math.max(0, acceptedCount - 1);
    }

    for (let i = cellColors.length - 1; i > 0; i--) {
        cellColors[i] = cellColors[i - 1];
        document.getElementById(`cell-${i}`).style.backgroundColor = cellColors[i];
    }

    cellColors[0] = colorCode;
    document.getElementById('cell-0').style.backgroundColor = colorCode;

    if (colorCode === '#00FF00') {
        acceptedCount = Math.min(100, acceptedCount + 1);
    }

    localStorage.setItem('cellColors', JSON.stringify(cellColors));
    updateAcceptanceRate();
}

function toggleCellColor(cellIndex) {
    const currentColor = cellColors[cellIndex];
    const newColor = currentColor === '#00FF00' ? '#FF0000' : '#00FF00';

    if (currentColor !== newColor) {
        cellColors[cellIndex] = newColor;
        document.getElementById(`cell-${cellIndex}`).style.backgroundColor = newColor;

        if (newColor === '#00FF00') {
            acceptedCount = Math.min(100, acceptedCount + 1);
        } else {
            acceptedCount = Math.max(0, acceptedCount - 1);
        }

        localStorage.setItem('cellColors', JSON.stringify(cellColors));
        updateAcceptanceRate();
    }
}

function resetCount(type) {
    if (type === 'accept') {
        acceptCount = 0;
    } else if (type === 'decline') {
        declineCount = 0;
    }
    updateDisplayCounts();
}

window.onload = function() {
    const cellsContainer = document.querySelector('.cells');
    
    for (let i = 0; i < cellColors.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.style.backgroundColor = cellColors[i];
        cell.onclick = () => toggleCellColor(i);
        cellsContainer.appendChild(cell);
    }

    updateAcceptanceRate();
    updateDisplayCounts();
};
