let currentPanel = 1;
const totalPanels = 5;

function nextPanel() {
    if (currentPanel < totalPanels) {
        currentPanel++;
        updatePanel();
    }
}

function updatePanel() {
    document.querySelectorAll('.panel').forEach(panel => panel.style.display = 'none');
    document.getElementById(`panel${currentPanel}`).style.display = 'block';

    // Change background and text color for nighttime panel
    if (currentPanel === 3) {
        document.querySelector('.comic-container').classList.add('nighttime');
    } else {
        document.querySelector('.comic-container').classList.remove('nighttime');
    }
}
