// clase individio 

class Individio{
    constructor(finest, distancia, pasos, estado, ADN){
        this.finest = finest
        this.distancia = distancia
        this.pasos = pasos
        this.estado = estado
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
    // matriz
    // posicionInicial
    // posicionFinal
    // individios  
    constructor(dimenciones, posicionInicial, posicionFinal, individio){
        this.matriz = 
        this.posicionInicial = posicionInicial
        this.posicionFinal = posicionFinal
        this.individios = individio
    }

}

// class FinalRoom
class FinalRoom{
    // posicionInicial
    // posicionFinal
    // individio
    constructor(){
    }
}


