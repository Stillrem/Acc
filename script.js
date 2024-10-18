const cellColors = JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#FFFFFF');
let acceptedCount = cellColors.filter(color => color === '#00FF00').length;

function updateAcceptanceRate() {
    const acceptanceRate = (acceptedCount / 100) * 100;
    document.getElementById('acceptance-rate').textContent = `Acceptance Rate: ${acceptanceRate.toFixed(2)}%`;
}

function toggleCellColor(cell, index) {
    const currentColor = cellColors[index];
    const newColor = currentColor === '#00FF00' ? '#FF0000' : '#00FF00';

    cellColors[index] = newColor;
    cell.style.backgroundColor = newColor;

    if (newColor === '#00FF00') {
        acceptedCount++;
    } else {
        acceptedCount--;
    }

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
        cell.addEventListener('click', () => toggleCellColor(cell, i)); // Добавлен обработчик клика
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

    // Отключение двойного тапа для увеличения
    document.addEventListener('dblclick', function(event) {
        event.preventDefault();
    }, { passive: false });
};
