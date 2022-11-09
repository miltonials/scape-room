// clase individio 

class Individual{
    constructor(ADN){
        this.finest = 0
        this.distancia = 0
        this.estado = true
        this.ADN = ADN
    }

    // funcion para obtenerADC
    getADN(){
        return this.ADN
    }

    // funcion para obtenerFinest
    getFinest(){
        return this.finest
    }

    // funcion para calcular Finest
    calcularFinest(){
        this.finest = this.distancia + this.pasos
    }
}

// clase Table
class Table{
    constructor(posicionInicial, posicionFinal, individio){
        this.matriz = 
        this.posicionInicial = posicionInicial
        this.posicionFinal = posicionFinal
        this.individios = individio
    }

}

// class FinalRoom
class FinalRoom{
    constructor(){
    }
}


