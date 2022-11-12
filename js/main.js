let matrix = [];
let dimensions = 0;
let obstacles = 0;
let population = [];
let generation = 0;



/** 
 * Function that returns the best individual acccording to the selection percentaje selected by the user
 * @returns {Array} with individuals
 */

function bestIndividuals(){

    let bestGens = [];

    let selectionPercentage =  document.getElementById("selection").value;
    let populationAmount = population.length / 100;
    let totalAmount =Math.ceil(populationAmount *selectionPercentage);
    
    population.sort(function (a, b) {
        if (a.fitness < b.fitness) {
          return 1;
        }
        if (a.fitness > b.fitness) {
          return -1;
        }
          return 0;
      });

    bestGens = population.slice( 0, totalAmount);

    

    return bestGens 
}

function initialPopulation() {

    let amount = document.getElementById("iPopulation").value;
    population = [];
    while (amount != 0) {
// crear un random de 0 a 8
        // let random = Math.floor(Math.random() * circles.length);
        // let color = circles[random];
        // generar un color random usando hexadecimal
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        let adn = document.getElementById("adn").value.toUpperCase()
        let person = new Individual("individual-" + amount, adn, randomColor);        
        population.push(person);
        amount--;
    }

    console.log(population);
    bestIndividuals();
}


function creationMatrix() {
    let porcentaje = (obstacles/100)*dimensions*dimensions
    for (let i = 0; i < dimensions; i++) {
        matrix[i] = [];
        for (let j = 0; j < dimensions; j++) {
            matrix[i][j] = 0;
        }
    }
    let randomfila = 0;
    let randomcolumna = 0;
    if (obstacles > 0){
        if (obstacles > dimensions*dimensions){
            alert("No se pueden colocar tantos obstáculos")
            return
        }
        // obstacles no debe ser mayor a 30%
        if (obstacles > (dimensions*dimensions)*0.30){
            alert("No se pueden colocar tantos obstáculos")
            return
        }
        for (let i = 0; i < porcentaje; i++) {
            randomfila = Math.floor(Math.random() * dimensions);
            randomcolumna = Math.floor(Math.random() * dimensions);
            if (matrix[randomfila][randomcolumna] == 1){
                i--;
            }
            else{
                matrix[randomfila][randomcolumna] = 1;
            }
        }
    }
    initialPopulation()
}


/** 
 * Función que permite crear el tablero mxm. Donde m = dimensiones 
 * @param {int} dimensiones 
 */
 function creationMap() {
    generation = 1
    dimensions = document.getElementById("dimensions").value;
    obstacles = document.getElementById("obstacles").value;
    creationMatrix()
    updateGeneration()
    let tablero_container = document.getElementById("room-container");
    let tableroHTML = "";
    let numeros = [];
  
    if (document.getElementById("room") != null) {
      document.getElementById("room").remove()
    }
    for (let i = 0; i < dimensions; i++) {
      vector = []
      tableroHTML += `<div class="row">`;
      for (let j = 0; j < dimensions; j++) {
        if (i == dimensions-1 && j == dimensions-1 ){
            let letra =  `<p class="frame-content"></p>`
            tableroHTML +=  `<div id="frame-`+i+`-`+j+`" class="roomElement goal">` + letra + `</div>`;
            break
        }
        if (i == 0 && j == 0 ){
            let letra =  ``
            let miIndividual
            for (k in population) {
                miIndividual = population[k]
                letra +=  `<p class="frame-content circle" style="background-color:#`+miIndividual.color+`">😀</p>`
                generateStatistics(miIndividual)
            }
            tableroHTML +=  `<div id="frame-`+i+`-`+j+`" class="roomElement">` + letra + `</div>`;
            continue
        }
        if (matrix[i][j] == 1){
            let letra =  `<p class="frame-content"></p>`
            tableroHTML +=  `<div id="frame-`+i+`-`+j+`" class="roomElement obstacle">` + letra + `</div>`;
            continue
        }
        else{
            let letra =  `<p class="frame-content"></p>`
            tableroHTML +=  `<div id="frame-`+i+`-`+j+`" class="roomElement">` + letra + `</div>`;
        }
            
      }
      tableroHTML += "</div>";
    }
    const modalContentEl = createCustomElement(
        "div",
        {
          id: "room",
          class: "room",
        },
        [tableroHTML]
      )
    
    document.body.appendChild(modalContentEl);
    tablero_container.appendChild(modalContentEl);
    
 }

/**
 * receives 2 chromosomes and returns a new chromosome
 * @param {string} dna1 
 * @param {string} dna2 
 * @returns {string} new chromosome
 */
function crossing(dna1, dna2){
    let childDNA = "";
    
    let half = parseInt(dna1.length/2); //get first half of the dna
    let half2 = parseInt(dna2.length/2); //get second half of the dna
    
    childDNA = dna1.substring(0, half) + dna2.substring(half2, dna2.length);
    return childDNA;
}

//retorna un cromosoma hibrido con la combinacion de 3 cromosomas del padre y el resto de la madre
function crossingComplex(dna1, dna2){
    //get random number between 0 and dna1.length-1
    let random = 0;
    let childDNA = "";
    let chromosome = "";

    //get 3 chromosomes from father
    for(let i = 0; i<3; i++){
        //random between 0 and dna1.length-1
        random = Math.floor(Math.random() * dna1.length);
        childDNA += dna1[random];
        chromosome += dna1.charAt(random);
    }

    //get the rest of the chromosomes from mother, in inverse order (right to left)
    let repited = 0;
    for(let i = dna2.length-1; i>0; i--){
        if(i==2){
            childDNA += chromosome;
            i-=2;
        }
        if(dna2[i] == undefined){ //for prevent undefined
            break;
        }
        if(!chromosome.includes(dna2[i]) && repited<3){ //only add chromosomes that are not in the father's chromosome (quite first 3 chromosomes repited)
            repited++;
            childDNA += dna2[i];
        }else{
            childDNA += dna2[i];
        }
    }
    return childDNA;
    
}

//Funcion sleep tomada de https://www.delftstack.com/howto/javascript/javascript-wait-for-x-seconds/
/**
 * Función que permite pausar la ejecución del programa por un tiempo determinado
 *
 * @param {int} ms | tiempo en milisegundos que se espera
 * @return {object} 
 */
 function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


async function run(){
    console.log("run")
    if (population.length == 0){
        alert("No hay población")
        return
    } 
    if (matrix.length == 0){
        alert("No hay matriz")
        return
    }
    if (validateADN()){
        alert("El ADN unicamente debe permitir W,A,S,D")
        return
    }
    while (liveIndividuals()){
        await sleep(500)
        printIndividuals()
    }
}

function liveIndividuals(){
    let live = false
    for (let i = 0; i < population.length; i++) {
        if (population[i].live){
            live = true
            break
        }
    }
    if (!live){
        generation++
        updateGeneration()
        // AQUÍ ES CUANDO SE DEBE CREAR LA NUEVA POBLACIÓN
        // SE REALIZA EL CRUCE DE LOS INDIVIDUOS
    }
    return live
}

function updateGeneration(){
    let tittle = document.getElementById("generation-counter")
    const newTitle = createCustomElement(
        "h1",
        {
            id: "generation-counter"
        },
        ["Execution data (" + generation + "° generation)"]
        )
    tittle.removeChild(tittle.childNodes[0])
    tittle.appendChild(newTitle)
}


function printIndividuals() {
    let miIndividual
    let axisX
    let axisY
    let div
    let finalX = 0
    let finalY = 0
    let individualView
    for (i in population) {
        miIndividual = population[i]
        if (miIndividual.live) {
            axisX = miIndividual.axisX
            axisY = miIndividual.axisY
            div = document.getElementById("frame-" + axisY + "-" + axisX)
            let childs = div.childNodes
            if (childs.length > 0) {
                div.removeChild(childs[0])
            }
            miIndividual.nextStep()
            miIndividual.calculateFitness(dimensions)
            axisX = miIndividual.axisX
            axisY = miIndividual.axisY   
            // document.body.appendChild(modalContentEl);
            if (validatePosition(axisX, axisY)) {
                alert("El individuo " + miIndividual.id + " ha salido del tablero")
                miIndividual.live = false
                miIndividual.previousStep()
                axisX = miIndividual.axisX
                axisY = miIndividual.axisY
            }
            if (matrix[axisY][axisX] == 1) {
                miIndividual.live = false
            }
            div = document.getElementById("frame-" + axisY + "-" + axisX)
            if (miIndividual.live){
                individualView = createCustomElement(
                    "p",
                    {
                    style: "background-color:#"+miIndividual.color,
                    class: "frame-content circle",
                    },
                    ["😀"]
                )
            }
            else{
                individualView = createCustomElement(
                    "p",
                    {
                    style: "background-color:#"+miIndividual.color,
                    class: "frame-content circle",
                    },
                    ["☠️"]
                )
                }
            div.appendChild(individualView);
            finalX = axisX
            finalY = axisY
            generateStatistics(miIndividual)
        }
    }
    div = document.getElementById("frame-" + finalY + "-" + finalX)
    let childs = div.childNodes
    if (childs.length > 0) {
        div.removeChild(childs[0])
    }

}

function validatePosition(axisX, axisY){
    if (axisX < 0 || axisX >= matrix.length){
        return true
    }
    if (axisY < 0 || axisY >= matrix[0].length){
        return true
    }
    return false
}

function generateStatistics(miIndividual){
    let div = document.getElementById(miIndividual.id)
    let table = document.getElementById("rows-container")
    let stats = ''

    if (div != null){
        div.remove()
    }

    stats = '<p class="table-element" style=background-color:#'+miIndividual.color+'>'
    if (miIndividual.live){
        stats += '😀' + miIndividual.id 
    }
    else{
        stats += '☠️' + miIndividual.id 
    }

    stats += '<p class="table-element center dna">'+miIndividual.ADN+'</p>'
    stats += '<p class="table-element center">'+miIndividual.distancia+'</p>'
    stats += '<p class="table-element center">'+miIndividual.fitness+'</p>'

    let individualView = createCustomElement(
        "p",
        {
            id: miIndividual.id,
            class: "table-row center",
        },
        [stats]
    )

    table.appendChild(individualView);
}

function validateADN(){
    let isValid = false
    let movi = ["W" ,"A","S","D"]
    for (Indi in population){
        for (chromosome in population[Indi].ADN){
            // console.log(population[Indi].ADN[chromosome])
            let char = population[Indi].ADN[chromosome]
            if (!movi.includes(char)){//.toUpperCase()
                isValid = true
            }
        }
    }
    // console.log(isValid)
    return isValid
}