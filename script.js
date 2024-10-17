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
