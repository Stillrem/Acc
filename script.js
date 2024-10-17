let currentIndex = 0;
const cellColors = Array(100).fill('#FFFFFF');

function paint(color) {
    const colorCode = color === 'red' ? '#FF0000' : '#00FF00';

    if (currentIndex < 100) {
        cellColors[currentIndex] = colorCode;
        document.getElementById(`cell-${currentIndex}`).style.backgroundColor = colorCode;
        currentIndex++;
    } else {
        currentIndex = 0;
    }
}
