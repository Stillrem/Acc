const cellColors = Array(100).fill('#FFFFFF');
let currentIndex = 0;

function paint(color) {
    const colorCode = color === 'red' ? '#FF0000' : '#00FF00';

    // Сдвигаем все ячейки на одну вправо
    for (let i = cellColors.length - 1; i > 0; i--) {
        cellColors[i] = cellColors[i - 1];
        document.getElementById(`cell-${i}`).style.backgroundColor = cellColors[i];
    }

    // Устанавливаем новый цвет в первую ячейку
    cellColors[0] = colorCode;
    document.getElementById('cell-0').style.backgroundColor = colorCode;
}

javascript
const cellColors = Array(100).fill('#FFFFFF');
let currentIndex = 0;
let acceptedCount = 0;

// Функция для обновления и отображения Acceptance Rate
function updateAcceptanceRate() {
    const acceptanceRate = Math.round((acceptedCount / 100) * 100);
    document.getElementById('acceptance-rate').innerText = `Acceptance Rate: ${acceptanceRate}%`;
}

function paint(color) {
    const colorCode = color === 'red' ? '#FF0000' : '#00FF00';

    // Проверяем, если текущая ячейка была 'green', уменьшаем acceptedCount
    if (cellColors[cellColors.length - 1] === '#00FF00') {
        acceptedCount--;
    }

    // Сдвигаем все ячейки на одну позицию вправо
    for (let i = cellColors.length - 1; i > 0; i--) {
        cellColors[i] = cellColors[i - 1];
        document.getElementById(`cell-${i}`).style.backgroundColor = cellColors[i];
    }

    // Устанавливаем новый цвет в первую ячейку
    cellColors[0] = colorCode;
    document.getElementById('cell-0').style.backgroundColor = colorCode;

    // Обновляем счетчик принятых предложений
    if (color === 'green') {
        acceptedCount++;
    }

    // Обновляем и отображаем Acceptance Rate
    updateAcceptanceRate();
}
