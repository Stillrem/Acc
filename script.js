const cellColors = JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#FFFFFF');
let acceptedCount = cellColors.filter(color => color === '#00FF00').length;

function updateAcceptanceRate() {
    const acceptanceRate = (acceptedCount / 100) * 100;
    document.getElementById('acceptance-rate').textContent = `Acceptance Rate: ${acceptanceRate.toFixed(2)}%`;
}

function paint(color) {
    const colorCode = color === 'red' ? '#FF0000' : '#00FF00';

    // Уменьшаем счетчик, если самая старая ячейка была зелёной
    if (cellColors[99] === '#00FF00') {
        acceptedCount--;
    }

    // Сдвигаем все ячейки на одну вправо
    for (let i = cellColors.length - 1; i > 0; i--) {
        cellColors[i] = cellColors[i - 1];
        document.getElementById(`cell-${i}`).style.backgroundColor = cellColors[i];
    }

    // Устанавливаем новый цвет в первую ячейку
    cellColors[0] = colorCode;
    document.getElementById('cell-0').style.backgroundColor = colorCode;

    // Увеличиваем счетчик, если новая ячейка зелёная
    if (colorCode === '#00FF00') {
        acceptedCount++;
    }

    // Сохраняем массив в localStorage
    localStorage.setItem('cellColors', JSON.stringify(cellColors));

    // Обновляем процент принятия
    updateAcceptanceRate();
}

// Функция для переключения цвета ячейки при тапе
function toggleCellColor(cellIndex) {
    const currentColor = cellColors[cellIndex];
    const newColor = currentColor === '#00FF00' ? '#FF0000' : '#00FF00';

    // Обновляем цвет ячейки
    cellColors[cellIndex] = newColor;
    document.getElementById(`cell-${cellIndex}`).style.backgroundColor = newColor;

    // Обновляем счетчик
    if (newColor === '#00FF00') {
        acceptedCount++;
    } else {
        acceptedCount--;
    }

    // Сохраняем массив в localStorage
    localStorage.setItem('cellColors', JSON.stringify(cellColors));

    // Обновляем процент принятия
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

        // Добавляем обработчик события для тапов
        cell.addEventListener('click', () => toggleCellColor(i));

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
