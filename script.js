let currentPanel = 1;
const totalPanels = 31;  // Adjust the total number of panels
let eatenAnimals = [];
let susMusic = [7,8,15,16,23,24];
let nightMusic = [9,10,17,18,25,26];
let munchMusic = [11,19,27];
let previousMusic = document.getElementById('morningForest');

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    if (currentPanel == 10 ||  currentPanel == 18 || currentPanel == 26) {
        return;
    }
    if (event.keyCode === 39) {
        nextPanel();
    }
}

function nextPanel() {
    if (currentPanel < totalPanels) {
        currentPanel++;
        updatePanel();
    }
    else if (currentPanel == totalPanels) {
        location.href = location.href;   
    }
}

function eatAnimal(animal) {
    eatenAnimals.push(animal);
    const animalElements = document.querySelectorAll(`.animal.${animal}`);
    const nightAnimalElements = document.querySelectorAll(`.animal.animal-night.${animal}`);

    for (let i = 0; i < animalElements.length; i++) {
        const animalElement = animalElements[i];
        animalElement.style.display = 'none';
    };

    for (let i = 0; i < nightAnimalElements.length; i++) {
        const nightAnimalElement = nightAnimalElements[i];
        nightAnimalElement.style.display = 'none';
    }
    const stomachElement = document.querySelectorAll(`.animal.${animal}-stomach`)[eatenAnimals.length-1];

    // Display the stomach
    stomachElement.style.display = 'block';
    nextPanel();
}

function updatePanel() {
    const delay = 500;

    setTimeout(() => {
        document.querySelectorAll('.panel').forEach(panel => panel.style.display = 'none');
        document.getElementById(`panel${currentPanel}`).style.display = 'block';

        let music;
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
        allMusic.forEach(audio => {
            if (previousMusic.src === audio.src) {
                audio.pause();
                if (previousMusic.src != music.src){
                    audio.currentTime = 0;
                    previousMusic.currentTime = 0;
                }
            }
        });

        if (previousMusic.src != music.src) {
            music.load(); // Reload the source
            music.play(); // Play the new source
            previousMusic = music;
        } else {    
            if (music.paused) {
                music.play();
            }
        }
        

        // if (currentPanel === 13) {
        //     const dayPanel = document.getElementById('panel13');
        //     const panel13Scene = document.getElementById('panel13Scene');
        //     panel13.style.display = 'block';

        //     // Check if the animal has been eaten and update the scene
        //     if (!eatenAnimals.includes('rabbit')) {
        //         panel13Scene.innerHTML += '<div class="animal rabbit"></div>';
        //     }
        //     if (!eatenAnimals.includes('squirrel')) {
        //         panel13Scene.innerHTML += '<div class="animal squirrel"></div>';
        //     }
        //     if (!eatenAnimals.includes('hamster')) {
        //         panel13Scene.innerHTML += '<div class="animal hamster"></div>';
        //     }
        // } 
        // else if (currentPanel === 17) {
        //     const panel17 = document.getElementById('panel17');
        //     const panel17Scene = document.getElementById('panel17Scene');
        //     panel17.style.display = 'block';

        //     // Check if the animal has been eaten and update the scene
        //     if (!eatenAnimals.includes('rabbit')) {
        //         panel17Scene.innerHTML += `<div class="animal animal-night rabbit" onclick="eatAnimal('rabbit')"></div>`;
        //     }
        //     if (!eatenAnimals.includes('squirrel')) {
        //         panel17Scene.innerHTML += `<div class="animal animal-night squirrel" onclick="eatAnimal('squirrel')"></div>`;
        //     }
        //     if (!eatenAnimals.includes('hamster')) {
        //         panel17Scene.innerHTML += `<div class="animal animal-night hamster" onclick="eatAnimal('hamster')"></div>`;
        //     }
        // }
        // else {
        //     document.getElementById(`panel${currentPanel}`).style.display = 'block';
        // }
    }, delay);
}

