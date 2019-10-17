function Map(modelo) {
    exemplo = {
        cells: [],
        LINES: 32,
        COLUMNS: 32,
        SIZE: 32
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
                    cor = "darkgreen";
                    break;
                case 2:
                    cor = "darkgrey";
                    break;
                case 3:
                    cor = "brown";
                    break;
                case 4:
                    cor = "pink";
                    break;
                default:
                    cor = "black";
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
                    if(this.cells[c][l].dtCells > 5) {
                        this.cells[c][l].tipo = 4;
                    }
                default:
                    cor = "black";
            }
        }
    }
}


//Chao normal: 0
//Chao plantado: 1 
//Limites do mapa: 2
//Estruturas: 3