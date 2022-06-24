// | prendo i parent nel DOM

const gridContainer = document.getElementById('grid-container');
const difficultyContainer = document.getElementById('difficultySelected');
const generatorButton = document.getElementById('generator');

let movesDone = 1;
let bombNumber = 16;

generateGrid(1);

// | creo un bottone che mi permette di aggiornare la griglia
generatorButton.addEventListener('click', function() {
    generateGrid(getSelectValue());
});

// Ciclo per il numero di difficoltà che voglio generare
for (let i = 0; i < 3; i++) {
    const newDifficulty = createNewDifficulty(i + 1);
    difficultyContainer.append(newDifficulty);
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------FUNCTIONS*/
function generateBombs(numberOfSquares, start) {

    const gridContainer = document.getElementById('grid-container');

    let bombList = [];
    let newRandomNumber;
    let i = 0;

    // finché il numero trovato non è valido
    while (bombList.length < bombNumber) {
        // genera un nuovo numero randomico nell'intervallo min-max
        newRandomNumber = Math.floor(Math.random() * (numberOfSquares + 1) - start) + start;

        // se non è già presente in blacklist || ovvero che il numero è nuovo e valido
        if (!bombList.includes(newRandomNumber)) {
            // usciamo dal ciclo
            bombList[i] = newRandomNumber;
            i++;
        }
    }

    return bombList;

}

function generateGrid(difficultyValue) { // | ciclo per il numero di quadrati che voglio generare

    document.getElementById('grid-container').innerHTML = "";
    movesDone = 1;
    const message = document.getElementById('message');
    message.innerHTML = ``;
    const gridContainer = document.getElementById('grid-container');
    let bombList = []; // | creo una lista vuota, che sarà la lista delle bombe ritornate
    switch (getSelectValue()) {
        default: numberOfSquares = 100;
        case '1':
                numberOfSquares = 100;
            break;
        case '2':
                numberOfSquares = 81;
            break;
        case '3':
                numberOfSquares = 49;
            break;
    }
    bombList = generateBombs(numberOfSquares, 0);

    for (let i = 0; i < numberOfSquares; i++) {
        const newSquare = createNewSquare(difficultyValue); // # creo un nuovo quadrato con le classi relative
        let squareValue = (bombList.includes(i)) ? 'bomb' : i;
        newSquare.innerHTML = squareValue;
        let className = (squareValue === 'bomb') ? 'bombed' : 'cyaned'; // ! in base al valore di parità del numero randomico unico appena generato assegnerò un toggle con classi diverse
        addEventListenerWithToggle(newSquare, className, i);
        gridContainer.append(newSquare); // § aggiungo il nuovo quadrato al parent
    }
}

function checkIfYouHaveClickedABomb(element) { // | ciclo per il numero di quadrati che voglio generare

    console.log(movesDone)
    const message = document.getElementById('message');
    if (element.classList.contains('bombed'))
        message.innerHTML = `Hai perso dopo ${movesDone} click`;
    else {
        if (isAlreadyClicked(element) == false) {
            if ((getSelectValue() == '1' && movesDone == (100 - bombNumber)) || (getSelectValue() == '2' && movesDone == (81 - bombNumber)) || (getSelectValue() == '3' && movesDone == (49 - bombNumber))) {
                message.innerHTML = `Hai vinto`;
                console.log("Hai vinto")
            } else {
                movesDone += 1;
            }
        }
    }
}

function isAlreadyClicked(element) {
    if (!element.classList.contains('already-clicked')) {
        element.classList.add('already-clicked');
        return false;
    } else {
        return true;
    }

}

function addEventListenerWithToggle(htmlElement, classToToggle, cellNumber) {
    htmlElement.addEventListener('click', function() {
        htmlElement.classList.toggle(classToToggle);
        checkIfYouHaveClickedABomb(htmlElement);

    });
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

function createNewSquare(difficultyValue) {
    const currentSquare = document.createElement('div');
    currentSquare.classList.add(`square${difficultyValue}`);
    return currentSquare;
}

// Operatore ternario:
// § condizione ? valoreSeLaCondizioneÈVera : valoreSeLaCondizioneÈFalsa;
// let variabile = (true) ? "valoreDiVero" : "valoreDiFalso";