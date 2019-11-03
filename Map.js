function Map(modelo) {
    exemplo = {
        cells: [],
        LINES: 32,
        COLUMNS: 32,
        SIZE: 32,
        nunArados: 0,
        maxArados: 0
    }
    Object.assign(this, exemplo, modelo);
    for (var c = 0; c < this.COLUMNS; c++) {
        this.cells[c] = [];
        for (var l = 0; l < this.LINES; l++) {
            exemplo.cells[c][l] = { tipo: 0, dtCells: 0 };
        }
    }
    if (modelo.m) {
        for (var c = 0; c < this.COLUMNS; c++) {
            for (var l = 0; l < this.LINES; l++) {
                this.cells[c][l] = { tipo: modelo.m[l][c], dtCells: 0 };
            }
        }
    }
}

Map.prototype.desenhar = function (ctx) {
    var cor = "black";
    for (var c = 0; c < this.COLUMNS; c++) {
        for (var l = 0; l < this.LINES; l++) {
            switch (this.cells[c][l].tipo) {
                case 0:
                    cor = "lightgreen";
                    break;
                case 1:
                    cor = "rgb(0,190,0)";
                    break;
                case 2:
                    cor = "darkgrey";
                    break;
                case 3:
                    cor = "darkred";
                    break;
                case 4:
                    cor = "rgb(0,150,0)";
                    break;
                case 5:
                    cor = "rgb(0,70,0)";
                    break;
                case 6:
                    cor = "rgb(0,50,0)";
                    break;
                case 7:
                    cor = "brown";
                    break;
                default:
                    cor = "black";
                    break;
            }
            ctx.fillStyle = cor;
            ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
            ctx.strokeStyle = "black";
            //ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
        }
    }
}

Map.prototype.comportar = function (dt) {
    for (var c = 0; c < this.COLUMNS; c++) {
        for (var l = 0; l < this.LINES; l++) {
            switch (this.cells[c][l].tipo) {
                case 1:
                    this.cells[c][l].dtCells += dt;
                    if (this.cells[c][l].dtCells > 2) {
                        this.cells[c][l].tipo = 4;
                        this.cells[c][l].dtCells = 0;
                    }
                    break;
                case 4:
                    this.cells[c][l].dtCells += dt;
                    if (this.cells[c][l].dtCells > 2) {
                        this.cells[c][l].tipo = 5;
                        this.cells[c][l].dtCells = 0;
                    }
                    break;
                case 5:
                    this.cells[c][l].dtCells += dt;
                    if (this.cells[c][l].dtCells > 2) {
                        this.cells[c][l].tipo = 6;
                        this.cells[c][l].dtCells = 0;
                    }
                    break;
                default:
                    cor = "black";
                    break;
            }
        }
    }
}

/////PODE ANDAR EM CIMA
 //Chao normal: 0
 //Chao plantado 1: 1
 //Chao arado: 7 

/////NAO PODE ANDAR EM CIMA
 //Limites do mapa: 2
 //Estruturas: 3
 ///
 //Chao plantado 2: 4
 //Chao plantado 3: 5
 //Chao plantado 4: 6