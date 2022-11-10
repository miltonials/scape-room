let matrix = [];
let dimensions = 0;
let obstacles = 0;
let population = [];

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
        let person = new Individual(adn, randomColor);        
        population.push(person);
        amount--;
    }

    console.log(population);
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
    dimensions = document.getElementById("dimensions").value;
    obstacles = document.getElementById("obstacles").value;
    creationMatrix()
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
            let letra =  `<p class="frame-content">🚪</p>`
            tableroHTML +=  `<div id="frame-`+i+`-`+j+`" class="roomElement">` + letra + `</div>`;
            break
        }
        if (i == 0 && j == 0 ){
            let letra =  ``
            for (k in population) {
                let miIndividual = population[k]
                letra +=  `<p class="frame-content" style="color:#`+miIndividual.color+`">•</p>`
            }
            tableroHTML +=  `<div id="frame-`+i+`-`+j+`" class="roomElement">` + letra + `</div>`;
            // let letra =  `<p class="frame-content">😀</p>`
            // tableroHTML +=  `<div id="frame-`+i+`-`+j+`" class="roomElement">` + letra + `</div>`;            tableroHTML +=  `<div id="frame-`+i+`-`+j+`" class="roomElement">` + letra + `</div>`;
            continue
        }
        if (matrix[i][j] == 1){
            let letra =  `<p class="frame-content">🚧</p>`
            tableroHTML +=  `<div id="frame-`+i+`-`+j+`" class="roomElement">` + letra + `</div>`;
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
    return live
}

function printIndividuals() {
    let miIndividual
    let axisX
    let axisY
    let div
    let finalX
    let finalY
    for (i in population) {
        miIndividual = population[i]
        axisX = miIndividual.axisX
        axisY = miIndividual.axisY
        div = document.getElementById("frame-" + axisY + "-" + axisX)
        let childs = div.childNodes
        if (childs.length > 0) {
            div.removeChild(childs[0])
        }

        miIndividual.nextStep()
        axisX = miIndividual.axisX
        axisY = miIndividual.axisY   
        div = document.getElementById("frame-" + axisY + "-" + axisX)
        // document.body.appendChild(modalContentEl);
        if (matrix[axisX][axisY] == 1) {
            miIndividual.live = false
        }

        if (miIndividual.live){
            const modalContentEl = createCustomElement(
                "p",
                {
                  style: "color:#"+miIndividual.color,
                  class: "frame-content",
                },
                ["•"]
              )
            div.appendChild(modalContentEl);
            // div.appendChild(`<p class="frame-content" style="color:#`+miIndividual.color+`">•</p>`)
            finalX = axisX
            finalY = axisY
        }
        else{
            const modalContentEl = createCustomElement(
                "p",
                {
                  style: "color:#"+miIndividual.color,
                  class: "frame-content",
                },
                ["X"]
              )
            div.appendChild(modalContentEl);
            // div.appendChild(`<p class="frame-content" style="color:#`+miIndividual.color+`">X</p>`)
            finalX = axisX
            finalY = axisY
        }
    }
    div = document.getElementById("frame-" + finalY + "-" + finalX)
    let childs = div.childNodes
    if (childs.length > 0) {
        div.removeChild(childs[0])
    }

}


function validateADN(){
    let isValid = false
    let movi = ["W" ,"A","S","D"]
    for (Indi in population){
        for (chromosome in population[Indi].ADN){
            console.log(population[Indi].ADN[chromosome])
            let char = population[Indi].ADN[chromosome]
            if (!movi.includes(char)){//.toUpperCase()
                isValid = true
            }
        }
    }
    console.log(isValid)
    return isValid
}