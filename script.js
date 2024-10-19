let cellColors = JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#FFFFFF');
let acceptedCount = cellColors.filter(color => color === '#00FF00').length;
let redCount = cellColors.filter(color => color === '#FF0000').length;
let acceptCount = 0;
let declineCount = 0;

function updateAcceptanceRate() {
    const totalCells = cellColors.length;
    const acceptanceRate = (acceptedCount / totalCells) * 100;
    document.getElementById('acceptance-rate').textContent = `Acceptance Rate: ${acceptanceRate.toFixed(2)}%`;
}

function updateDisplayCounts() {
    document.getElementById('accept-count').textContent = `Accept: ${acceptCount}`;
    document.getElementById('decline-count').textContent = `Decline: ${declineCount}`;
}

function updateDeclineCountDisplay() {
    document.getElementById('decline-count').textContent = `Decline: ${declineCount}`;
}

function paint(color) {
    const colorCode = color === 'red' ? '#FF0000' : '#00FF00';

    if (colorCode === '#00FF00') {
        acceptCount++;
    } else {
        declineCount++;
    }
    updateDisplayCounts();

    if (cellColors[99] === '#00FF00') {
        acceptedCount--;
    }
    if (cellColors[99] === '#FF0000') {
       declineCount--;
    }

    for (let i = cellColors.length - 1; i > 0; i--) {
        cellColors[i] = cellColors[i - 1];
        document.getElementById(`cell-${i}`).style.backgroundColor = cellColors[i];
    }

    cellColors[0] = colorCode;
    document.getElementById('cell-0').style.backgroundColor = colorCode;

    if (colorCode === '#00FF00') {
        acceptedCount++;
    } else {
        redCount++;
    }

    localStorage.setItem('cellColors', JSON.stringify(cellColors));
    updateAcceptanceRate();
    updateRedCountDisplay();
}

function toggleCellColor(cellIndex) {
    const currentColor = cellColors[cellIndex];
    const newColor = currentColor === '#00FF00' ? '#FF0000' : '#00FF00';

    if (currentColor !== newColor) {
        cellColors[cellIndex] = newColor;
        document.getElementById(`cell-${cellIndex}`).style.backgroundColor = newColor;

        if (newColor === '#00FF00') {
            acceptedCount++;
            detlineCount--;
        } else {
            acceptedCount--;
            detlineCount++;
        }

        localStorage.setItem('cellColors', JSON.stringify(cellColors));
        updateAcceptanceRate();
        updateRedCountDisplay();
    }
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
    updateDisplayCounts();
    updateRedCountDisplay(); // Добавлено для отображения количества красных ячеек

    // Add event listener to accept count display
    document.getElementById('accept-count').addEventListener('click', () => {
        acceptCount++;
        updateDisplayCounts();
    });

    // Add event listener to decline count display
    document.getElementById('decline-count').addEventListener('click', () => {
        declineCount++;
        updateDisplayCounts();
    });

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
