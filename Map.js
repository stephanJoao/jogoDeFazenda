function Map(modelo) {
    exemplo = {
        cells: [],
        LINES: 32,
        COLUMNS: 32,
        SIZE: 32
    }
    for (var c = 0; c < exemplo.COLUMNS; c++) {
        exemplo.cells[c] = [];
        for (var l = 0; l < exemplo.LINES; l++) {
            exemplo.cells[c][l] = { tipo: 0 };
        }
    }

    Object.assign(this, exemplo, modelo);
}

Map.prototype.desenhar = function (ctx) {
    var cor = "black";
    for (var c = 0; c < this.COLUMNS; c++) {
        for (var l = 0; l < this.LINES; l++) {
            switch (this.cells[c][l].tipo) {
                case 0:
                    cor = "tan";
                    break;
                case 1:
                    cor = "darkgrey";
                    break;
                default:
                        cor = "black";
                }
            ctx.fillStyle = cor;
            ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
        }
    }
}