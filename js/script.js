// | prendo il parent nel DOM

const gridContainer = document.getElementById('grid-container');

const difficultyContainer = document.getElementById('difficultySelected');

const generatorButton = document.getElementById('generator');

generateGrid(3);

// | creo un bottone che mi permette di aggiornare la griglia
generatorButton.addEventListener('click', function() {
    generateGrid(getSelectValue());
});

// Ciclo per il numero di difficoltà che voglio generare
for (let i = 0; i < 3; i++) {
    const newDifficulty = createNewDifficulty(3 - i);
    addEventListenerForDifficulty(newDifficulty);
    difficultyContainer.append(newDifficulty);
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------FUNCTIONS*/

function generateGrid(difficultyValue) { // | ciclo per il numero di quadrati che voglio generare

    document.getElementById('grid-container').innerHTML = "";
    const gridContainer = document.getElementById('grid-container');
    const currentBlackList = []; // | creo una lista vuota, che sarà la lista degli elementi già estratti
    if (difficultyValue == 3) {
        numberOfSquares = 100;
    } else if (difficultyValue == 2) {
        numberOfSquares = 81;
    } else if (difficultyValue == 1) {
        numberOfSquares = 49;
    }


    for (let i = 0; i < numberOfSquares; i++) {
        const newSquare = createNewSquare(difficultyValue); // # creo un nuovo quadrato con le classi relative
        const newUniqueNum = generateUniqueRandomNumber(currentBlackList, 0, numberOfSquares - 1); // | mi genero un nuovo numero randomico che non sia già stato estratto
        newSquare.innerHTML = newUniqueNum; // il contenuto del quadrato sarà il numero randomico unico appena generato
        let className = (newUniqueNum % 2 === 0) ? 'cyaned' : 'redned'; // ! in base al valore di parità del numero randomico unico appena generato assegnerò un toggle con classi diverse
        addEventListenerWithToggle(newSquare, className, newUniqueNum);
        gridContainer.append(newSquare); // § aggiungo il nuovo quadrato al parent
        currentBlackList.push(newUniqueNum); // | e lo aggiungo alla blacklist
    }
}

function getSelectValue() {
    var selectedValue = document.getElementById("difficultySelected").value;
    return selectedValue;
}

function createNewDifficulty(difficultyNumber) {
    const currentDifficulty = document.createElement('option');
    currentDifficulty.innerText = `Difficoltà ${difficultyNumber}`;
    currentDifficulty.value = difficultyNumber;
    return currentDifficulty;
}


function addEventListenerForDifficulty(htmlElement) {

    htmlElement.addEventListener('click', function() {
        htmlElement.classList.toggle("selection");
        console.log(htmlElement)
    });
}
// console.log(`è stata cliccata la cella numero ${cellNumber}`);

function addEventListenerWithToggle(htmlElement, classToToggle, cellNumber) {
    htmlElement.addEventListener('click', function() {
        htmlElement.classList.toggle(classToToggle);
    });
}

function createNewSquare(difficultyValue) {
    const currentSquare = document.createElement('div');
    currentSquare.classList.add(`square${difficultyValue}`);
    return currentSquare;
}

// funzione: prende blacklist, prende il valore minimo, il valore massimo inclusi
function generateUniqueRandomNumber(blackList, min, max) {
    let newRandomNumber;
    let isNumberValid = false;

    // finché il numero trovato non è valido
    while (isNumberValid === false) {
        // genera un nuovo numero randomico nell'intervallo min-max
        newRandomNumber = Math.floor(Math.random() * (max + 1) - min) + min;

        // se non è già presente in blacklist || ovvero che il numero è nuovo e valido
        if (!blackList.includes(newRandomNumber)) {
            // usciamo dal ciclo
            isNumberValid = true;
        }
    }
    return newRandomNumber;
}

// Operatore ternario:
// § condizione ? valoreSeLaCondizioneÈVera : valoreSeLaCondizioneÈFalsa;
// let variabile = (true) ? "valoreDiVero" : "valoreDiFalso";