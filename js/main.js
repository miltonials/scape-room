// let matrix = [[0, 0, 0, 0, 0, 1, 0, 1, 0, 0],[0, 0, 0, 0, 0, 0, 1, 1, 0, 0],[0, 0, 0, 0, 0, 0, 1, 1, 0, 0],[0, 0, 1, 0, 0, 0, 0, 0, 0, 1],[0, 0, 0, 0, 0, 1, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 1, 0, 1, 1],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 1, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 1, 0, 0, 1, 0, 0, 0, 0, 0]];
let matrix = [];
let dimensions = 0;
let obstacles = 0;
let population = [];
let generation = 0;
let inRun = false
let firstStrategy = true
let premios = 0;

/**
  * Function that change the type of strategy selected by the user
  */
function changeStrategy() {
  if (firstStrategy) {
    document.getElementById("btn-first-strategy").classList.remove("active");
    document.getElementById("btn-second-strategy").classList.add("active");
    firstStrategy = false
  }
  else {
    document.getElementById("btn-first-strategy").classList.add("active");
    document.getElementById("btn-second-strategy").classList.remove("active");
    firstStrategy = true
  }
}

/**
  * Function that returns the best individual acccording to the selection percentaje selected by the user
  * @returns {Array} with individuals
  */
function bestIndividuals() {
  let bestGens = [];
  let selectionPercentage = document.getElementById("selection").value;
  let populationAmount = population.length / 100;
  let totalAmount = Math.ceil(populationAmount * selectionPercentage);

  if (totalAmount <= 1) {
    totalAmount = 2
  }

  population.sort(function(a, b) {
    if (a.fitness < b.fitness) {
      return 1;
    }
    if (a.fitness > b.fitness) {
      return -1;
    }
    return 0;
  });

  bestGens = population.slice(0, totalAmount);
  return bestGens
}


/**
  * Function that generate the initial population 
  */
function initialPopulation() {
  let amount = document.getElementById("iPopulation").value;
  population = [];
  while (amount != 0) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let adn = document.getElementById("adn").value.toUpperCase()
    if (1 <= adn.length) {
      let person = new Individual("individual-" + amount, adn, randomColor);
      population.push(person);
      amount--;
    }
    else {
      let adn = generateDNA()
      let person = new Individual("individual-" + amount, adn, randomColor);
      population.push(person);
      amount--;
    }
  }

  console.log(population);
  bestIndividuals();
}

/**
  * Functions that create randoms dna for the individuals.
  * Each dna has a length of the matrix order.
  */
function generateDNA() {
  let movi = ['W', 'A', 'S', 'D']
  let adn = ""
  for (let i = 0; i < 5; i++) {
    let random = Math.floor(Math.random() * movi.length);
    adn += movi[random]
  }
  return adn
}

/**
  * Function that create the Matrix with the obtacles defined by the user 
  */
function creationMatrix() {
  let porcentaje = (obstacles / 100) * dimensions * dimensions
  for (let i = 0; i < dimensions; i++) {
    matrix[i] = [];
    for (let j = 0; j < dimensions; j++) {
      matrix[i][j] = 0;
    }
  }
  let randomfila = 0;
  let randomcolumna = 0;
  if (obstacles > 0) {
    if (obstacles > dimensions * dimensions) {
      alert("No se pueden colocar tantos obstáculos")
      return
    }
    // obstacles no debe ser mayor a 30%
    if (obstacles > (dimensions * dimensions) * 0.30) {
      alert("No se pueden colocar tantos obstáculos")
      return
    }
    for (let i = 0; i < porcentaje; i++) {
      randomfila = Math.floor(Math.random() * dimensions);
      randomcolumna = Math.floor(Math.random() * dimensions);
      if (matrix[randomfila][randomcolumna] == 1) {
        i--;
      }
      else {
        matrix[randomfila][randomcolumna] = 1;
      }
    }
  }
  initialPopulation()
}


/**
  * Function that create the Matrix with the obtacles and the keys defined     by the user 
  */
function creationMatrix2() {
  premios = Math.ceil(obstacles * 0.25)
  let porcentaje = (obstacles / 100) * dimensions * dimensions
  for (let i = 0; i < dimensions; i++) {
    matrix[i] = [];
    for (let j = 0; j < dimensions; j++) {
      matrix[i][j] = 0;
    }
  }
  let randomfila = 0;
  let randomcolumna = 0;
  if (obstacles > 0) {
    if (obstacles > dimensions * dimensions) {
      alert("No se pueden colocar tantos obstáculos")
      return
    }
    // obstacles no debe ser mayor a 30%
    if (obstacles > (dimensions * dimensions) * 0.30) {
      alert("No se pueden colocar tantos obstáculos")
      return
    }
    if (premios > 0) {
      let porcentaje2 = (premios / 100) * dimensions * dimensions
      for (let i = 0; i < porcentaje2; i++) {
        randomfila = Math.floor(Math.random() * dimensions);
        randomcolumna = Math.floor(Math.random() * dimensions);
        if (matrix[randomfila][randomcolumna] == 2) {
          i--;
        }
        else {
          matrix[randomfila][randomcolumna] = 2;
        }
      }
    }
    for (let i = 0; i < porcentaje; i++) {
      randomfila = Math.floor(Math.random() * dimensions);
      randomcolumna = Math.floor(Math.random() * dimensions);
      if (randomfila == dimensions - 1 && randomcolumna == dimensions - 1) {
        i--;
        continue
      }
      if (randomfila == 0 && randomcolumna == 0) {
        i--;
        continue;
      }
      if (matrix[randomfila][randomcolumna] == 1) {
        i--;
      }
      else {
        if (!(matrix[randomfila][randomcolumna] == 2)) {
          matrix[randomfila][randomcolumna] = 1;
        }
      }
    }

  }
  initialPopulation()
}

/**
  * Function that creates the matrix by the first strategy 
  * (without awards)
  */
function creationMapStrategy1() {
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
      if (i == dimensions - 1 && j == dimensions - 1) {
        let letra = `<p class="frame-content"></p>`
        tableroHTML += `<div id="frame-` + i + `-` + j + `" class="roomElement goal">` + letra + `</div>`;
        break
      }
      if (i == 0 && j == 0) {
        let letra = ``
        let miIndividual
        for (k in population) {
          miIndividual = population[k]
          letra += `<p id="` + miIndividual.id + `" class="frame-content circle" style="background-color:#` + miIndividual.color + `">😀</p>`
          generateStatistics(miIndividual)
        }
        tableroHTML += `<div id="frame-` + i + `-` + j + `" class="roomElement">` + letra + `</div>`;
        continue
      }
      if (matrix[i][j] == 1) {
        let letra = `<p class="frame-content"></p>`
        tableroHTML += `<div id="frame-` + i + `-` + j + `" class="roomElement obstacle">` + letra + `</div>`;
        continue
      }
      else {
        let letra = `<p class="frame-content"></p>`
        tableroHTML += `<div id="frame-` + i + `-` + j + `" class="roomElement">` + letra + `</div>`;
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
  * Function that creates the matrix by the second strategy (apply awards or keys around the matrix)
  */
function creationMapStrategy2() {
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
      if (i == dimensions - 1 && j == dimensions - 1) {
        let letra = `<p class="frame-content"></p>`
        tableroHTML += `<div id="frame-` + i + `-` + j + `" class="roomElement goal">` + letra + `</div>`;
        break
      }
      if (i == 0 && j == 0) {
        let letra = ``
        let miIndividual
        for (k in population) {
          miIndividual = population[k]
          letra += `<p id="` + miIndividual.id + `" class="frame-content circle" style="background-color:#` + miIndividual.color + `">😀</p>`
          generateStatistics(miIndividual)
        }
        tableroHTML += `<div id="frame-` + i + `-` + j + `" class="roomElement">` + letra + `</div>`;
        continue
      }
      if (matrix[i][j] == 1) {
        let letra = `<p class="frame-content"></p>`
        tableroHTML += `<div id="frame-` + i + `-` + j + `" class="roomElement obstacle">` + letra + `</div>`;
        continue
      }
      if (matrix[i][j] == 2) {
        let letra = `<p class="frame-content">🗝️</p>`
        tableroHTML += `<div id="frame-` + i + `-` + j + `" class="roomElement">` + letra + `</div>`;
        continue
      }
      else {
        let letra = `<p class="frame-content"></p>`
        tableroHTML += `<div id="frame-` + i + `-` + j + `" class="roomElement">` + letra + `</div>`;
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
  * Function that creates the matrix with dimentions mxm. Where m = dimentions
  */
function creationMap() {
  generation = 1
  dimensions = document.getElementById("dimensions").value;
  obstacles = document.getElementById("obstacles").value;
  if (firstStrategy) {
    creationMatrix()
    // initialPopulation()
    creationMapStrategy1()
  }
  else {
    creationMatrix2()
    creationMapStrategy2()
  }
}


/**
  * receives 2 chromosomes and returns a new chromosome
  * @param {string} dna1
  * @param {string} dna2
  * @returns {string} new chromosome
  */
function crossing(dna1, dna2, mutation) {
  let childDNA = "";
  let random = Math.floor(Math.random() * dna1.length);
  for (let i = 0; i < dna1.length; i++) {
    if (i < random) {
      childDNA += dna1[i]
    }
    else {
      childDNA += dna2[i]
    }
  }
  // childDNA = dna1.slice(0, Math.round(dna1.length / 2)) + dna2.slice(Math.round(dna2.length / 2), dna2.length)
  if (mutation) {
    childDNA = mutate(childDNA)
  }
  let movi = ['W', 'A', 'S', 'D']
  childDNA += movi[Math.floor(Math.random() * movi.length)]


  return childDNA

  // let half = parseInt(dna1.length/2); //get first half of the dna
  // let half2 = parseInt(dna2.length/2); //get second half of the dna

  // childDNA = dna1.substring(0, half) + dna2.substring(half2, dna2.length);
  // return childDNA;
}

/**
  * function in charge of mutating the DNA
  *
  * @param {String} dna | The DNA of the individuals
  * @return {String} newDNA
  */
function mutate(dna) {
  let random = Math.floor(Math.random() * dna.length);
  let movi = ['W', 'A', 'S', 'D']
  let random2 = Math.floor(Math.random() * movi.length);
  let newDNA = ""
  for (let i = 0; i < dna.length; i++) {
    if (i == random) {
      newDNA += movi[random2]
    }
    else {
      newDNA += dna[i]
    }
  }
  return newDNA
}

/**
 * Variety of function crossing
 * 
 * @param {String} dna1 | DNA received from the father
 * @param {String} dna2 | DNA received from the mother
 */
function crossingComplex(dna1, dna2) {
  //get random number between 0 and dna1.length-1
  let random = 0;
  let childDNA = "";
  let chromosome = "";

  //get 3 chromosomes from father
  for (let i = 0; i < dna1.length / 2; i++) {
    //random between 0 and dna1.length-1
    random = Math.floor(Math.random() * dna1.length);
    childDNA += dna1[random];
    chromosome += dna1.charAt(random);
  }

  //get the rest of the chromosomes from mother, in inverse order (right to left)
  let repited = 0;
  for (let i = dna2.length - 1; i > 0; i--) {
    if (i == 2) {
      childDNA += chromosome;
      i -= 2;
    }
    if (dna2[i] == undefined) { //for prevent undefined
      break;
    }
    if (!chromosome.includes(dna2[i]) && repited < 3) { //only add chromosomes that are not in the father's chromosome (quite first 3 chromosomes repited)
      repited++;
      childDNA += dna2[i];
    } else {
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
 unction sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Function for executing the main program
 */
async function run() {
  if (inRun) {
    document.getElementById("btn-run").innerHTML = "Play"
    inRun = false
  }
  else {
    document.getElementById("btn-run").innerHTML = "Pause"
    inRun = true
    console.log("run")
    if (population.length == 0) {
      alert("No hay población")
      return
    }
    if (matrix.length == 0) {
      alert("No hay matriz")
      return
    }
    if (validateADN()) {
      alert("El ADN unicamente debe permitir W,A,S,D")
      return
    }
    while (inRun) {
      //speed
      await sleep(document.getElementById("speed").value)
      if (liveIndividuals()) {
        printIndividuals()
      }
      else {
        sleep(3000)
        generation++
        updateGeneration()
        let theElite = bestIndividuals()
        clean()
        generatePopulation(theElite)
        if (firstStrategy) {
          creationMapStrategy1()
        }
        else {
          creationMapStrategy2()
        }
      }
    }
  }
}

/**
  * Function that cleans the dead bodies of the individuals
  * 
  */

function clean() {
  let div

  // STATS REMOVE⬇️
  population.forEach(individual => {
    div = document.getElementById(individual.id + "-stats")
    div.remove()
  });
  // GRID REMOVE⬇️
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      div = document.getElementById("frame-".concat(y).concat("-").concat(x))
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
    }
  }
}

/**
 * Function in charge of seeing if there is an individual alive
 * @return {boolean} live
 */

function liveIndividuals() {
  let live = false
  for (let i = 0; i < population.length; i++) {
    if (population[i].live) {
      live = true
      break
    }
  }
  return live
}

/**
 * Function that generate the current population based on the elite population
 * @param {individual} theElite individual of the past generation
 */
function generatePopulation(theElite) {
  let childXgeneration = document.getElementById("childrenXgeneraion").value
  let newPopulation = population.length + parseInt(childXgeneration)
  let dna1 = ""
  let dna2 = ""
  population = []
  let randIndividual = 0
  let randomColor = ""
  let randomMutation = 0

  for (let i = 0; i < newPopulation; i++) {
    randIndividual = Math.floor(Math.random() * theElite.length)
    dna1 = theElite[randIndividual]

    randIndividual = Math.floor(Math.random() * theElite.length)
    dna2 = theElite[randIndividual]

    randomColor = Math.floor(Math.random() * 16777215).toString(16)
    randomMutation = Math.floor(Math.random() * 100)
    if (dna1.win || dna2.win) {
      population.push(new Individual("individual-" + (i + 1), crossing(dna1.ADN, dna2.ADN, false), randomColor))
    }
    else {
      population.push(new Individual("individual-" + (i + 1), crossing(dna1.ADN, dna2.ADN, true), randomColor))
    }
  }
  console.log("nueva poblacion", population)
  return
}

/**
  * function in charge of create the new generation
  *
  */
function updateGeneration() {
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

/**
 * function in charge of validating if the individual can be painted on the board
 */
function printIndividuals() {
  let miIndividual
  let axisX
  let axisY
  let div
  let individualView
  for (i in population) {
    miIndividual = population[i]
    if (miIndividual.live) {
      div = document.getElementById(miIndividual.id)
      if (div != null) {
        div.remove()
      }
      miIndividual.nextStep()
      axisX = miIndividual.axisX
      axisY = miIndividual.axisY
      if (axisX == dimensions - 1 && axisY == dimensions - 1) {
        miIndividual.win = true
        miIndividual.live = false
        // miIndividual.ADN =  miIndividual.ADN.slice(0, miIndividual.distancia)
      }
      if (validatePosition(axisX, axisY)) {
        miIndividual.live = false
        miIndividual.previousStep()
        axisX = miIndividual.axisX
        axisY = miIndividual.axisY
      }
      if (matrix[axisY][axisX] == 1) {
        miIndividual.live = false
      }
      if (matrix[axisY][axisX] == 2 && firstStrategy == false) {
        miIndividual.pickKeys([[axisY], [axisX]])
      }
      div = document.getElementById("frame-" + axisY + "-" + axisX)

      individualView = printIndividual_aux(miIndividual)
      div.appendChild(individualView);

      miIndividual.calculateFitness(matrix, firstStrategy)
      generateStatistics(miIndividual)

    }
  }
}

/**
 * Funtion aux prints the individuals or displays them on the map
 * parameter miIndividual is the current individual 
 */

function printIndividual_aux(miIndividual) {
  let individualView
  if (miIndividual.win) {
    individualView = createCustomElement(
      "div",
      {
        id: miIndividual.id,
        style: "background-color:#" + miIndividual.color,
        class: "frame-content circle",
      },
      ["🏆"]
    )
    return individualView
  }
  if (miIndividual.live) {
    individualView = createCustomElement(
      "p",
      {
        id: miIndividual.id,
        style: "background-color:#" + miIndividual.color,
        class: "frame-content circle",
      },
      ["😀"]
    )
  }
  else {
    individualView = createCustomElement(
      "p",
      {
        id: miIndividual.id,
        style: "background-color:#" + miIndividual.color,
        class: "frame-content circle",
      },
      ["☠️"]
    )
  }

  return individualView
}

/**
  * validate that individuals do not go off the map
  * parameter axisX, axisY is the current position of the individual. 
  */
function validatePosition(axisX, axisY) {
  if (axisX < 0 || axisX >= matrix.length) {
    return true
  }
  if (axisY < 0 || axisY >= matrix[0].length) {
    return true
  }
  return false
}

/**
 * generates the current statistics of the individuals 
 */
function generateStatistics(miIndividual) {
  let div = document.getElementById(miIndividual.id + "-stats")
  let table = document.getElementById("rows-container")
  let stats = ''

  if (div != null) {
    div.remove()
  }
  stats = '<p class="table-element" style=background-color:#' + miIndividual.color + '>'
  if (miIndividual.live) {
    stats += '😀' + miIndividual.id
  }
  else {
    if (miIndividual.win) {
      stats += '🏆' + miIndividual.id
    }
    else {
      stats += '☠️' + miIndividual.id
    }
  }

  stats += '<p class="table-element center dna">' + miIndividual.ADN + '</p>'
  stats += '<p class="table-element center">' + miIndividual.distancia + '</p>'
  stats += '<p class="table-element center">' + miIndividual.keys.length + '</p>'
  stats += '<p class="table-element center">' + miIndividual.fitness + '</p>'

  let individualView = createCustomElement(
    "p",
    {
      id: miIndividual.id + "-stats",
      class: "table-row center",
    },
    [stats]
  )

  table.appendChild(individualView);
}

/**
 * Function that validates the input of the user for the dna
 * return string 
 */
function validateADN() {
  let isValid = false
  let movi = ["W", "A", "S", "D"]
  for (Indi in population) {
    for (chromosome in population[Indi].ADN) {
      let char = population[Indi].ADN[chromosome]
      if (!movi.includes(char)) {
        isValid = true
      }
    }
  }
  return isValid
}