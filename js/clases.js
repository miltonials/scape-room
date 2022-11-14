// clase individio 

class Individual{
    constructor(id, ADN, color){
        this.id = id
        this.color = color
        this.fitness = 0
        this.distancia = 0
        this.live = true
        this.ADN = ADN
        this.axisX = 0
        this.axisY = 0
        this.keys = []
        this.win = false
    }

    // funcion para obtenerADC
    getADN(){
        return this.ADN
    }

    // funcion para obtenerFitness
    getFitness(){
        return this.fitness
    }

    /**
     * method that returns how close is the individual to the goal
     * @param {int} dimentions | dimentions of the matrix
     * @returns {int} closing to the goal
     */
    calculateClosing(dimentions){
        let x = this.axisX
        let y = this.axisY

        //the goal must be in coordinates (dimentions-1, dimentions-1)

        let closeX = Math.abs(dimentions-1 - x)
        let closeY = Math.abs(dimentions-1 - y)
        let steps = 0

        //how much steps in x the individual needs to take for reaching the goal
        while(closeX <= dimentions-1){
            steps += 1
            closeX++
        }

        //how much steps in y the individual needs to take for reaching the goal
        while(closeY <= dimentions-1){
            steps += 1
            closeY++
        }

        return steps
    }
    pickKeys(coordinate){
        for (let i = 0; i < this.keys.length; i++) {
            if(JSON.stringify(coordinate) === JSON.stringify(this.keys[i])){
                return
            }
        }
        this.keys.push(coordinate)
    }
    /**
     * method that returns the distance formula 
     * @param {int} coordinate coordinate awards
     */
     distanceFormula(coordinate){
        let x = this.axisX
        let y = this.axisY
        let x2 = coordinate[0]
        let y2 = coordinate[1]
        let distance = Math.sqrt(Math.pow(x2-x, 2) + Math.pow(y2-y, 2))
        return distance
    }
    /**
     * method that returns existe awards
     * @param {int} matrix matrix map
     * @returns 
     */
    existeAwards(matrix){
        let awards = []
        for (let i = 0; i < matrix.length; i++){
            for (let j = 0; j < matrix.length; j++){
                if (matrix[i][j] == 2){
                    awards.push([i, j])
                }
            }
        }
        return awards
    }

    /**
     * method that calculates the fitness of an individual
     * Sober, E. (2001)
     * fitness (W) = survival * fecundity
     * survival = distance (how long it takes to reach the goal)
     * fecundity = steps (how much the indivual has walked)
     * set percentage of fitness to individual 
     * @param {int} matrix | dimentions of the matrix
     */
    calculateFitness(matrix,firstStrategy){
        //this.nextStep()//in case of not being called it before
        let w = 0
        let distance = this.distancia
        let steps = this.calculateClosing(matrix.length)

        let coordinateAwards = this.existeAwards(matrix)
        let distanceAwards = 0
        if (firstStrategy == false){
            for (let i = 0; i < coordinateAwards.length; i++){
                distanceAwards += this.distanceFormula(coordinateAwards[i])
            }
        }
        let awardsSteps = 0
        for (let i = 0; i < coordinateAwards.length; i++){
            for (let j = 0; j < this.keys.length; j++){
                if (coordinateAwards[i][0] == this.keys[j][0] && coordinateAwards[i][1] == this.keys[j][1]){
                    awardsSteps += 1
                }
            }
        }
        w = (distance + distanceAwards) * (steps + awardsSteps)
        this.fitness = w
        if (this.win){
            this.fitness ++
        }
        // w = distance*steps
        // //setting fitness
        
        // this.fitness = w/100 + this.keys.length//-awards
    }
        

    /**
     * method performing the following movement of the individual
     */
    nextStep() {
        let movi = ["W" ,"A","S","D"]
        let moviX = [0, -1, 0, 1]
        let moviY = [-1, 0, 1, 0]
        if (this.win){
            return
        }
        if (this.live){
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

    /**
     * method performing the above movement of the individual
     */
    previousStep() {
        let movi = ["W" ,"A","S","D"]
        let moviX = [0, -1, 0, 1]
        let moviY = [-1, 0, 1, 0]
        if (this.distancia > 0){
            let mov = this.ADN[this.distancia-1]
            let index = movi.indexOf(mov)
            this.axisX -= moviX[index]
            this.axisY -= moviY[index]
            this.distancia -= 1
        }
        else{
            this.live = false
        }   
    }
}