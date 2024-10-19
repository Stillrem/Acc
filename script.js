let redCount = cellColors.filter(color => color === '#FF0000').length;

function updateRedCountDisplay() {
    document.getElementById('red-count').textContent = redCount;
}

function paint(color) {
    const colorCode = color === 'red' ? '#FF0000' : '#00FF00';

    if (colorCode === '#00FF00') {
        acceptCount++;
    } else {
        declineCount++;
        redCount++;
    }
    updateDisplayCounts();
    updateRedCountDisplay();

    if (cellColors[99] === '#00FF00') {
        acceptedCount--;
    } else if (cellColors[99] === '#FF0000') {
        redCount--;
    }

    for (let i = cellColors.length - 1; i > 0; i--) {
        cellColors[i] = cellColors[i - 1];
        document.getElementById(`cell-${i}`).style.backgroundColor = cellColors[i];
    }

    cellColors[0] = colorCode;
    document.getElementById('cell-0').style.backgroundColor = colorCode;

    if (colorCode === '#00FF00') {
        acceptedCount++;
    }

    localStorage.setItem('cellColors', JSON.stringify(cellColors));
    updateAcceptanceRate();
}

function toggleCellColor(cellIndex) {
    const currentColor = cellColors[cellIndex];
    const newColor = currentColor === '#00FF00' ? '#FF0000' : '#00FF00';

    if (currentColor !== newColor) {
        cellColors[cellIndex] = newColor;
        document.getElementById(`cell-${cellIndex}`).style.backgroundColor = newColor;

        if (newColor === '#00FF00') {
            acceptedCount++;
            redCount--;
        } else {
            acceptedCount--;
            redCount++;
        }

        localStorage.setItem('cellColors', JSON.stringify(cellColors));
        updateAcceptanceRate();
        updateRedCountDisplay();
    }
}

function resetRedCount() {
    redCount = 0;
    updateRedCountDisplay();
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
    updateRedCountDisplay();

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

    // Add event listener for resetting red count
    document.getElementById('red-reset').addEventListener('click', resetRedCount);

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
