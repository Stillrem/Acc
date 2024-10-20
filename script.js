let isLocked = JSON.parse(localStorage.getItem('isLocked')) || false;

function toggleLock() {
    isLocked = !isLocked;
    localStorage.setItem('isLocked', isLocked);
}

function toggleCellColor(cellIndex) {
    if (!isLocked) {
        const currentColor = cellColors[cellIndex];
        const newColor = currentColor === '#00FF00' ? '#FF0000' : '#00FF00';

        if (currentColor !== newColor) {
            cellColors[cellIndex] = newColor;
            document.getElementById(`cell-${cellIndex}`).style.backgroundColor = newColor;

            if (newColor === '#00FF00') {
                acceptedCount++;
                declinedCount--;
            } else {
                acceptedCount--;
                declinedCount++;
            }

            updateDisplayCounts();
            localStorage.setItem('cellColors', JSON.stringify(cellColors));
            updateAcceptanceRate();
        }
    }
}

window.onload = function() {
    const toggleSwitch = document.createElement('div');
    toggleSwitch.className = 'toggle-switch';
    toggleSwitch.textContent = 'Lock/Unlock';
    toggleSwitch.addEventListener('click', toggleLock);

    document.body.appendChild(toggleSwitch);

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

    document.getElementById('accept-count').addEventListener('click', () => {
        acceptCount++;
        updateDisplayCounts();
    });

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
