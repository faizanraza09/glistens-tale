// Initialize variables
let currentPanel = 1;
const totalPanels = 31;  // Adjust the total number of panels
let eatenAnimals = [];
let susMusic = [7,8,15,16,23,24];
let nightMusic = [9,10,17,18,25,26];
let munchMusic = [11,19,27];
let previousMusic = document.getElementById('morningForest');

// Event listener for keydown event
document.addEventListener('keydown', handleKeyDown);

// Function to handle keydown event
function handleKeyDown(event) {
    if (currentPanel == 10 ||  currentPanel == 18 || currentPanel == 26) {
        return;
    }
    if (event.keyCode === 39) {
        nextPanel();
    }
}

// Function to navigate to the next panel
function nextPanel() {
    if (currentPanel < totalPanels) {
        currentPanel++;
        updatePanel();
    }
    else if (currentPanel == totalPanels) {
        location.href = location.href;   
    }
}

// Function to handle eating an animal
function eatAnimal(animal) {
    eatenAnimals.push(animal);
    const animalElements = document.querySelectorAll(`.animal.${animal}`);
    const nightAnimalElements = document.querySelectorAll(`.animal.animal-night.${animal}`);

    // Hide the animal elements
    for (let i = 0; i < animalElements.length; i++) {
        const animalElement = animalElements[i];
        animalElement.style.display = 'none';
    };

    // Hide the night animal elements
    for (let i = 0; i < nightAnimalElements.length; i++) {
        const nightAnimalElement = nightAnimalElements[i];
        nightAnimalElement.style.display = 'none';
    }

    const stomachElement = document.querySelectorAll(`.animal.${animal}-stomach`)[eatenAnimals.length-1];

    // Display the stomach
    stomachElement.style.display = 'block';
    nextPanel();
}

// Function to update the current panel
function updatePanel() {
    const delay = 500;

    setTimeout(() => {
        // Hide all panels
        document.querySelectorAll('.panel').forEach(panel => panel.style.display = 'none');
        // Show the current panel
        document.getElementById(`panel${currentPanel}`).style.display = 'block';

        let music;
        // Determine the music based on the current panel
        if (susMusic.includes(currentPanel)) {
            music = document.getElementById('suspenseSound');
        } else if (nightMusic.includes(currentPanel)) {
            music = document.getElementById('nightForest');
        } else if (munchMusic.includes(currentPanel)) {
            music = document.getElementById('munchSound');
        } else {
            music = document.getElementById('morningForest');
        }

        const allMusic = document.querySelectorAll('audio');
        // Pause the previous music and reset the current time if it's the same as the new music
        allMusic.forEach(audio => {
            if (previousMusic.src === audio.src) {
                audio.pause();
                if (previousMusic.src != music.src){
                    audio.currentTime = 0;
                    previousMusic.currentTime = 0;
                }
            }
        });

        // Load and play the new music if it's different from the previous music
        if (previousMusic.src != music.src) {
            music.load();
            music.play();
            previousMusic = music;
        } else {    
            // Play the music if it's paused
            if (music.paused) {
                music.play();
            }
        }
    }, delay);
}
