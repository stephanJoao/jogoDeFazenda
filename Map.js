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
};

Map.prototype.comportar = function (dt) {
    for (var c = 0; c < this.COLUMNS; c++) {
        for (var l = 0; l < this.LINES; l++) {
            switch (this.cells[c][l].tipo) {
                case 4.1:
                    if (Math.floor(pc.x / 32) != c || Math.floor(pc.y / 32) != l)
                        this.cells[c][l].dtCells += dt;
                    if (this.cells[c][l].dtCells > 2) {
                        this.cells[c][l].tipo = 4.2;
                        this.cells[c][l].dtCells = 0;
                    }
                    break;
                case 4.2:
                    this.cells[c][l].dtCells += dt;
                    if (this.cells[c][l].dtCells > 2) {
                        this.cells[c][l].tipo = 4.3;
                        this.cells[c][l].dtCells = 0;
                    }
                    break;
                case 4.3:
                    this.cells[c][l].dtCells += dt;
                    if (this.cells[c][l].dtCells > 2) {
                        this.cells[c][l].tipo = 4.4;
                        this.cells[c][l].dtCells = 0;
                    }
                    break;
                default:
                    cor = "black";
                    break;
            }
        }
    }
};

Map.prototype.desenhar = function (ctx) {
    for (var c = 0; c < this.COLUMNS; c++) {
        for (var l = 0; l < this.LINES; l++) {
            ctx.drawImage(cena1.assets.img("mapa"),
                32 * 0,
                32 * 0,
                32,
                32,
                c * 32,
                l * 32,
                32,
                32
            );
            switch (this.cells[c][l].tipo) {
                //DESENHANDO CHAO
                case 0.0:
                    ctx.drawImage(
                        cena1.assets.img("mapa"),
                        32 * 0,
                        32 * 0,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 0.9:
                    ctx.drawImage(
                        cena1.assets.img("mapa"),
                        32 * 1,
                        32 * 0,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 0.1:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 0,
                        32 * 2,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 0.2:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 1,
                        32 * 2,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 0.3:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 2,
                        32 * 2,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 0.4:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 0,
                        32 * 3,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 0.5:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 2,
                        32 * 3,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 0.6:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 0,
                        32 * 4,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 0.7:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 1,
                        32 * 4,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 0.8:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 2,
                        32 * 4,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                //DESENHANDO ARVORES
                case 2.0:
                    ctx.drawImage(
                        cena1.assets.img("mapa"),
                        32 * 0,
                        32 * 10,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 2.1:
                    ctx.drawImage(
                        cena1.assets.img("mapa"),
                        32 * 0,
                        32 * 11,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 2.2:
                    ctx.drawImage(
                        cena1.assets.img("mapa"),
                        32 * 0,
                        32 * 0,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    ctx.drawImage(
                        cena1.assets.img("mapa"),
                        32 * 1,
                        32 * 9,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 2.3:
                    ctx.drawImage(
                        cena1.assets.img("mapa"),
                        32 * 1,
                        32 * 8,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 2.4:
                    ctx.drawImage(
                        cena1.assets.img("mapa"),
                        32 * 0,
                        32 * 8,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 2.5:
                    ctx.drawImage(
                        cena1.assets.img("mapa"),
                        32 * 0,
                        32 * 9,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                //DESENHANDO ESTRUTURAS
                case 3.0:
                    ctx.drawImage(
                        cena1.assets.img("house"),
                        32 * 1,
                        32 * 1,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 3.1:
                    ctx.drawImage(
                        cena1.assets.img("house"),
                        32 * 0,
                        32 * 0,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 3.2:
                    ctx.drawImage(
                        cena1.assets.img("house"),
                        32 * 1,
                        32 * 0,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 3.3:
                    ctx.drawImage(
                        cena1.assets.img("house"),
                        32 * 2,
                        32 * 0,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 3.4:
                    ctx.drawImage(
                        cena1.assets.img("house"),
                        32 * 0,
                        32 * 1,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 3.5:
                    ctx.drawImage(
                        cena1.assets.img("house"),
                        32 * 2,
                        32 * 1,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 3.6:
                    ctx.drawImage(
                        cena1.assets.img("house"),
                        32 * 0,
                        32 * 2,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 3.7:
                    ctx.drawImage(
                        cena1.assets.img("house"),
                        32 * 1,
                        32 * 2,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 3.8:
                    ctx.drawImage(
                        cena1.assets.img("house"),
                        32 * 2,
                        32 * 2,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                //DESENHANDO PLANTACAO
                case 4.0:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 1,
                        32 * 3,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 4.1:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 1,
                        32 * 3,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    ctx.drawImage(
                        cena1.assets.img("wheat"),
                        32 * 0,
                        32 * 5,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 4.2:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 1,
                        32 * 3,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    ctx.drawImage(
                        cena1.assets.img("wheat"),
                        32 * 1,
                        32 * 5,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 4.3:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 1,
                        32 * 3,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    ctx.drawImage(
                        cena1.assets.img("wheat"),
                        32 * 2,
                        32 * 5,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    break;
                case 4.4:
                    ctx.drawImage(
                        cena1.assets.img("chao"),
                        32 * 1,
                        32 * 3,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    ctx.drawImage(
                        cena1.assets.img("wheat"),
                        32 * 0,
                        32 * 1,
                        32,
                        32,
                        c * 32,
                        l * 32,
                        32,
                        32
                    );
                    ctx.drawImage(
                        cena1.assets.img("wheat"),
                        32 * 0,
                        32 * 0,
                        32,
                        32,
                        c * 32,
                        (l - 1) * 32,
                        32,
                        32
                    );
                    break;

                default:
                    break;
            }
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
        }
    }
    //DESENHANDO RESTO DA CASA
    ctx.drawImage(cena1.assets.img("mapa"), 32 * 0, 32 * 10, 32, 32, 2 * 32, 0 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("mapa"), 32 * 0, 32 * 11, 32, 32, 5 * 32, 0 * 32, 32, 32);
    
    ctx.drawImage(cena1.assets.img("house"), 32 * 0, 32 * 5, 32, 32, 2 * 32, 2 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("house"), 32 * 0, 32 * 4, 32, 32, 2 * 32, 1 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("house"), 32 * 0, 32 * 3, 32, 32, 2 * 32, 0 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("house"), 32 * 1, 32 * 5, 32, 32, 3 * 32, 2 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("house"), 32 * 1, 32 * 5, 32, 32, 4 * 32, 2 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("house"), 32 * 2, 32 * 5, 32, 32, 5 * 32, 2 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("house"), 32 * 0, 32 * 5, 32, 32, 3 * 32, 1 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("house"), 32 * 2, 32 * 5, 32, 32, 4 * 32, 1 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("house"), 32 * 2, 32 * 4, 32, 32, 5 * 32, 1 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("house"), 32 * 2, 32 * 3, 32, 32, 5 * 32, 0 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("house"), 32 * 0, 32 * 4, 32, 32, 3 * 32, 0 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("house"), 32 * 2, 32 * 4, 32, 32, 4 * 32, 0 * 32, 32, 32);
    ctx.drawImage(cena1.assets.img("house"), 32 * 5, 32 * 0, 32, 64, 3 * 32, 4 * 32, 32, 64);
    ctx.drawImage(cena1.assets.img("house"), 32 * 4, 32 * 0, 32, 64, 3 * 32, 5 * 32, 32, 64);
};


/////PODE ANDAR EM CIMA
 //Chao normal:              0.0 - 0.1 - 0.2 - 0.3 - 0.4 - 0.5 - 0.6 - 0.7 - 0.8 - 0.9
 //Chao arado:                4.0
 //Chao plantado 1:        4.1

/////NAO PODE ANDAR EM CIMA
 //Limites do mapa:         2.0 - 2.1 - 2.2 - 2.3 - 2.4 - 2.5
 //Estruturas:                   3
 ///
 //Chao plantado 2:        4.2
 //Chao plantado 3:        4.3
 //Chao plantado 4:        4.4