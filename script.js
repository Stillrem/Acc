const appData = {
    acceptCount: parseInt(localStorage.getItem('acceptCount')) || 0,
    declineCount: parseInt(localStorage.getItem('declineCount')) || 0,
    cellColors: JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#00FF00'),
    acceptedCount: 0,
    declinedCount: 0,
    isLocked: localStorage.getItem('isLocked') === 'true',

    updateAcceptanceRate: function() {
        const acceptanceRate = (this.acceptedCount / 100) * 100;
        document.getElementById('acceptance-rate').textContent = `Acceptance Rate: ${acceptanceRate.toFixed(2)}%`;
    },

    updateDisplayCounts: function() {
        document.getElementById('accept-count').textContent = this.acceptCount;
        document.getElementById('decline-count').textContent = this.declinedCount;
        localStorage.setItem('acceptCount', this.acceptCount);
        localStorage.setItem('declineCount', this.declineCount);
    },

    paint: function(color) {
        const colorCode = color === 'red' ? '#FF0000' : '#00FF00';

        // Update counts based on previous color
        if (this.cellColors[99] === '#00FF00') {
            this.acceptedCount--;
        } else if (this.cellColors[99] === '#FF0000') {
            this.declinedCount--;
        }

        // Update cell colors
        for (let i = this.cellColors.length - 1; i > 0; i--) {
            this.cellColors[i] = this.cellColors[i - 1];
            document.getElementById(`cell-${i}`).style.backgroundColor = this.cellColors[i];
        }

        this.cellColors[0] = colorCode;
        document.getElementById('cell-0').style.backgroundColor = colorCode;

        // Update counts based on new color
        if (colorCode === '#00FF00') {
            this.acceptCount++;
            this.acceptedCount++;
        } else {
            this.declineCount++;
            this.declinedCount++;
        }

        this.updateDisplayCounts();
        localStorage.setItem('cellColors', JSON.stringify(this.cellColors));
        this.updateAcceptanceRate();
    },

    toggleCellColor: function(cellIndex) {
        if (!this.isLocked) {
            const currentColor = this.cellColors[cellIndex];
            const newColor = currentColor === '#00FF00' ? '#FF0000' : '#00FF00';

            if (currentColor !== newColor) {
                this.cellColors[cellIndex] = newColor;
                document.getElementById(`cell-${cellIndex}`).style.backgroundColor = newColor;

                if (newColor === '#00FF00') {
                    this.acceptedCount++;
                    this.declinedCount--;
                } else {
                    this.acceptedCount--;
                    this.declinedCount++;
                }

                this.updateDisplayCounts();
                localStorage.setItem('cellColors', JSON.stringify(this.cellColors));
                this.updateAcceptanceRate();
            }
        }
    },

    resetCount: function(type) {
        if (type === 'accept') {
            this.acceptCount = 0;
        } else if (type === 'decline') {
            this.declineCount = 0;
        }
        this.updateDisplayCounts();
    },

    initialize: function() {
        // Initialization code goes here
        // Add event listeners, set up initial state, etc.
    }
};

// Call the initialize method on window load
window.onload = function() {
    appData.initialize();
};
