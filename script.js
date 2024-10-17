const cellColors = JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#FFFFFF');
let acceptedCount = cellColors.filter(color => color === '#00FF00').length;

function updateAcceptanceRate() {
    const acceptanceRate = (acceptedCount / 100) * 100;
    document.getElementById('acceptance-rate').textContent = `Acceptance Rate: ${acceptanceRate.toFixed(2)}%`;
}

function paint(color) {
    const colorCode = color === 'red' ? '#FF0000' : '#00FF00';

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
}

document.addEventListener('DOMContentLoaded', () => {
    const cellsContainer = document.querySelector('.cells');
    cellsContainer.innerHTML = Array.from({ length: 100 }, (_, i) => `<div id="cell-${i}" class="cell"></div>`).join('');
    
    cellColors.forEach((color, index) => {
        document.getElementById(`cell-${index}`).style.backgroundColor = color;
    });
    updateAcceptanceRate();
});
