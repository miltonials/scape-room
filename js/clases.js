// clase individio 

class Individual{
    constructor(id, ADN, color){
        this.id = id
        this.color = color
        this.fitness = 0
        this.distancia = 0
        this.estado = true
        this.live = true
        this.ADN = ADN
        this.axisX = 0
        this.axisY = 0
    }

    // funcion para obtenerADC
    getADN(){
        return this.ADN
    }

    // funcion para obtenerFinest
    // funcion para obtenerFitness
    getFinest(){
        return this.finest
        return this.fitness
    }

    // funcion para calcular Finest
    // funcion para calcular Fitness
    calcularFinest(){
        this.finest = this.distancia + this.pasos
        
    }
    nextStep() {
        let movi = ["W" ,"A","S","D"]
        let moviX = [0, -1, 0, 1]
        let moviY = [-1, 0, 1, 0]
        if (this.distancia < this.ADN.length){
            let mov = this.ADN[this.distancia]
            let index = movi.indexOf(mov)
            this.axisX += moviX[index]
            this.axisY += moviY[index]
            this.distancia += 1
        }
        else{
            this.live = false
        }   
    }
}