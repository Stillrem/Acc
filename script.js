// Function to count red cells
function countRedCells() {
    return cellColors.filter(color => color === '#FF0000').length;
}

function updateRedCellDisplay() {
    const redCellCount = countRedCells();
    document.getElementById('decline-count').textContent = redCellCount;
    localStorage.setItem('declineCount', redCellCount);
}

// Update existing functions to use the new red cell counting logic
function paint(color) {
    const colorCode = color === 'red' ? '#FF0000' : '#00FF00';

    if (colorCode === '#00FF00') {
        acceptCount++;
    }
    updateDisplayCounts();

    if (cellColors[99] === '#00FF00') {
        acceptedCount--;
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
    updateRedCellDisplay(); // Update red cell count display
}

function toggleCellColor(cellIndex) {
    const currentColor = cellColors[cellIndex];
    const newColor = currentColor === '#00FF00' ? '#FF0000' : '#00FF00';

    if (currentColor !== newColor) {
        cellColors[cellIndex] = newColor;
        document.getElementById(`cell-${cellIndex}`).style.backgroundColor = newColor;

        if (newColor === '#00FF00') {
            acceptedCount++;
        } else {
            acceptedCount--;
        }

        localStorage.setItem('cellColors', JSON.stringify(cellColors));
        updateAcceptanceRate();
        updateRedCellDisplay(); // Update red cell count display
    }
}

function resetCount(type) {
    if (type === 'accept') {
        acceptCount = 0;
    } else if (type === 'decline') {
        declineCount = 0;
        cellColors.fill('#FFFFFF'); // Reset all cells to white
        for (let i = 0; i < cellColors.length; i++) {
            document.getElementById(`cell-${i}`).style.backgroundColor = '#FFFFFF';
        }
    }
    updateDisplayCounts();
    updateRedCellDisplay(); // Reset red cell count display
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
    updateRedCellDisplay(); // Initialize red cell count display

    // Add event listener to accept count display
    document.getElementById('accept-count').addEventListener('click', () => {
        acceptCount++;
        updateDisplayCounts();
    });

    // Add event listener to decline count display
    document.getElementById('decline-count').addEventListener('click', () => {
        resetCount('decline'); // Reset red cell count and display
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
