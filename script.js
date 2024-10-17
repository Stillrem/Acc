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

// Инициализация начальных цветов ячеек
window.onload = function() {
    const cellsContainer = document.querySelector('.cells');
    for (let i = 0; i < cellColors.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.style.backgroundColor = cellColors[i];
        cellsContainer.appendChild(cell);
    }
    updateAcceptanceRate();
};
