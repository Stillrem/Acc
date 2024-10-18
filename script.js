const cellColors = JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#FFFFFF');
let acceptedCount = cellColors.filter(color => color === '#00FF00').length;
let currentColor = '#00FF00'; // По умолчанию зелёный

function updateAcceptanceRate() {
    const acceptanceRate = (acceptedCount / 100) * 100;
    document.getElementById('acceptance-rate').textContent = `Acceptance Rate: ${acceptanceRate.toFixed(2)}%`;
}

function setCurrentColor(color) {
    currentColor = color === 'red' ? '#FF0000' : '#00FF00';
}

function toggleCellColor(index) {
    const cell = document.getElementById(`cell-${index}`);
    const previousColor = cell.style.backgroundColor;
    cell.style.backgroundColor = currentColor;
    if (previousColor === '#00FF00') {
        acceptedCount--;
    }
    if (currentColor === '#00FF00') {
        acceptedCount++;
    }
    cellColors[index] = currentColor;
    localStorage.setItem('cellColors', JSON.stringify(cellColors));
    updateAcceptanceRate();
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

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    }

    document.addEventListener('dblclick', function(event) {
        event.preventDefault();
    }, { passive: false });
};
