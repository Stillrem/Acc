const cellColors = JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#FFFFFF');
let acceptedCount = cellColors.filter(color => color === '#00FF00').length;
let declinedCount = cellColors.filter(color => color === '#FF0000').length;

function updateRates() {
    const acceptanceRate = (acceptedCount / 100) * 100;
    const declinedRate = (declinedCount / 100) * 100;
    document.getElementById('acceptance-rate').textContent = `Acceptance Rate: ${acceptanceRate.toFixed(2)}% Declined Rate: ${declinedRate.toFixed(2)}%`;
}

function paint(color) {
    const colorCode = color === 'red' ? '#FF0000' : '#00FF00';

    // Уменьшаем соответствующий счетчик, если самая старая ячейка была зелёной или красной
    if (cellColors[99] === '#00FF00') {
        acceptedCount--;
    } else if (cellColors[99] === '#FF0000') {
        declinedCount--;
    }

    // Сдвигаем все ячейки на одну вправо
    for (let i = cellColors.length - 1; i > 0; i--) {
        cellColors[i] = cellColors[i - 1];
        document.getElementById(`cell-${i}`).style.backgroundColor = cellColors[i];
    }

    // Устанавливаем новый цвет в первую ячейку
    cellColors[0] = colorCode;
    document.getElementById('cell-0').style.backgroundColor = colorCode;

    // Увеличиваем соответствующий счетчик, если новая ячейка зелёная или красная
    if (colorCode === '#00FF00') {
        acceptedCount++;
    } else if (colorCode === '#FF0000') {
        declinedCount++;
    }

    // Сохраняем массив в localStorage
    localStorage.setItem('cellColors', JSON.stringify(cellColors));

    // Обновляем проценты
    updateRates();
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
    updateRates();
};
