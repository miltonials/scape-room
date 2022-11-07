let matrix = []
let dimensions = 0;
let obstacles = 15*15*0.20

function creationMatrix() {
    for (var i = 0; i < dimensions; i++) {
        matrix[i] = [];
        for (var j = 0; j < dimensions; j++) {
            //generar num random 0 a 1 
            let random = Math.random();
            if (random < 0.2 && 0 < obstacles ) {
                if ((!(i == 0) && !(j == 1)) && (!(i == 1) && !(j == 0))) {
                    matrix[i][j] = 1;
                    obstacles--;
                }
            }
            else {
                matrix[i][j] = 0;
            }
        }
    }
}


/** 
 * Función que permite crear el tablero mxm. Donde m = dimensiones y pertence a {2, 3, 4, 5}
 * @param {int} dimensiones 
 */
 function creationMap() {
    dimensions = document.getElementById("dimensions").value;
    obstacles = document.getElementById("obstacles").value;
    console.log(dimensions)
    console.log(obstacles)
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
        if (matrix[i][j] == 0){
            let letra =  `<p class="frame-content"></p>`
            tableroHTML +=  `<div id="frame-`+i+`-`+j+`" class="roomElement">` + letra + `</div>`;
            continue
        }
        else{
            let letra =  `<p class="frame-content">🚧</p>`
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