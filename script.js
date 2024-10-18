const cellColors = JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#FFFFFF');
let acceptedCount = cellColors.filter(color => color === '#00FF00').length;

function updateAcceptanceRate() {
    const acceptanceRate = (acceptedCount / 100) * 100;
    document.getElementById('acceptance-rate').textContent = `Acceptance Rate: ${acceptanceRate.toFixed(2)}%`;
}

function paintCell(cellIndex) {
    const cell = document.getElementById(`cell-${cellIndex}`);
    if (cellColors[cellIndex] === '#00FF00') {
        acceptedCount--;
        cellColors[cellIndex] = '#FF0000';  // Перекрашиваем в красный
    } else {
        acceptedCount++;
        cellColors[cellIndex] = '#00FF00';  // Перекрашиваем в зеленый
    }
    cell.style.backgroundColor = cellColors[cellIndex];
    localStorage.setItem('cellColors', JSON.stringify(cellColors));
    updateAcceptanceRate();
}

// Инициализация начальных цветов ячеек
window.onload = function() {
    const cellsContainer = document.querySelector('.cells');
    for (let i = 0; i < cellColors.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.style.backgroundColor = cellColors[i];
        cell.addEventListener('click', () => paintCell(i));  // Добавляем обработчик клика
        cellsContainer.appendChild(cell);
    }
    updateAcceptanceRate();

    // Регистрация сервис-воркера
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
