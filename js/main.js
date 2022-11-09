let matrix = [];
let dimensions = 0;
let obstacles = 0;
let population = [];

function initialPopulation() {

    let amount = document.getElementById("iPopulation").value;

    while (amount != 0) {
        let person = new Individual(document.getElementById("adn").value);
        population.push(person);
        amount--;
    }

    console.log(population);
}


function creationMatrix() {
    // let porcentaje = (obstacles/100)*dimensions*dimensions
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
        for (let i = 0; i < obstacles; i++) {
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
            let letra =  `<p class="frame-content">😀</p>`
            tableroHTML +=  `<div id="frame-`+i+`-`+j+`" class="roomElement">` + letra + `</div>`;
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


