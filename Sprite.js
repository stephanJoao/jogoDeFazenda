function Sprite(params = {}) {
    var exemplo = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        h: 10,
        w: 10,
        color: "blue",
        pose: 8,
        frame: 0,
        frameSpeed: 0,
        frameLimit: 0,
        props: {},
        inventario: {},
        cooldowns: {},
        status: {},
        acao: 0,
        direcao: 0,
        imune: 0,
        atirando: 0,
        comportar: undefined,
        scene: undefined
    }
    Object.assign(this, exemplo, params);
}
Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a);
    ctx.drawImage(
        this.scene.assets.img("player"),
        64 * Math.floor(this.frame),    //coluna
        64 * this.pose,                        //linha
        64,                                          //tamanho na imagem x
        64,                                          //tamanho na imagem y
        -64 / 2,                                   //posicao em x
        -60,                                        //posicao em y
        64,                                         //tamanho no canvas x
        64                                          //tamanho no canvas y
    );
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    //ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
};

Sprite.prototype.atualiza = function (dt) {
    if(this.status.vida <= 0)
        this.status.vivo = false;
    
    if (this.status.vivo)
        this.moverOrtogonal(dt);
    else
        this.pose = 20;
    this.inventario.opacidade -= dt * 0.5;
    ////////ANIMACAO////////
    if(this.pose == 20) {
        this.frameSpeed = 9;
        if(this.frame < 5)
            this.frame += this.frameSpeed * dt;
        else 
            this.frame = 5;
    }
    else {
        if (this.status.correndo)
            this.frameSpeed = 25;
        else
            this.frameSpeed = 16;
        if (this.frameLimit == 9) {
            if (this.vx != 0 || this.vy != 0)
                this.frame += this.frameSpeed * dt;
            else
                this.frame = 0;
            if (this.frame > this.frameLimit) {
                this.frame = 1;
            }
        }
        else {
            this.frame -= this.frameSpeed * dt;
            if (this.frame <= 0) {
                this.frame = 0;
                this.frameLimit = 9;
                this.frameSpeed = 16;
            }
        }
    }
    ////////COOLDOWNS////////
    this.cooldowns.plantar -= dt;

    this.cooldowns.arar -= dt;
    ////Ações
    if (this.cooldowns.acoes > 0) {
        this.cooldowns.acoes -= dt;
        this.vx = 0;
        this.vy = 0;
    }
    ////Stamina
    if (this.status.comida < 10)
        this.cooldowns.velStamina = 0.2;
    else
        this.cooldowns.velStamina = 2;

    if (this.status.correndo) {
        this.cooldowns.stamina += 3 * dt;
    }
    if (this.cooldowns.stamina > 0 && !this.status.correndo) {
        this.cooldowns.stamina -= this.cooldowns.velStamina * dt;
        if (this.cooldowns.stamina <= 0)
            this.cooldowns.stamina = 0;
    }
    if (this.cooldowns.stamina < this.cooldowns.cansado / 2) {
        this.cooldowns.cansou = false;
    }
    ////Fome
    if (this.status.comida > 0) {
        this.status.comida -= this.status.velComida * dt;
    }
    else {
        this.status.comida = 0;
    }
    ////Vida
    if (this.status.comida == 0 && this.status.vida > 0) {
        this.status.vida -= 1 * dt;
    }
    else if (this.comida == 0) {
        this.status.vida = 0;
    }
};

Sprite.prototype.moverOrtogonal = function (dt) {
    if (this.vx != 0 && this.vy != 0) {
        this.vx = 0;
        this.vy = 0;
    }

    this.mc = Math.floor(this.x / this.scene.map.SIZE);
    this.ml = Math.floor(this.y / this.scene.map.SIZE);

    this.aplicaRestricoes(dt);
};

Sprite.prototype.aplicaRestricoes = function (dt) {
    var dnx;
    var dx;
    dx = this.vx * dt;
    dnx = dx;
    dy = this.vy * dt;
    dny = dy;
    if (dx > 0 && (this.scene.map.cells[this.mc + 1][this.ml].tipo != 4.0 && this.scene.map.cells[this.mc + 1][this.ml].tipo != 4.1 && !(this.scene.map.cells[this.mc + 1][this.ml].tipo >= 0.0 && this.scene.map.cells[this.mc + 1][this.ml].tipo < 1))) {
        dnx = this.scene.map.SIZE * (this.mc + 1) - (this.x + this.w / 2);
        dx = Math.min(dnx, dx);
    }
    if (dx < 0 && (this.scene.map.cells[this.mc - 1][this.ml].tipo != 4.0 && this.scene.map.cells[this.mc - 1][this.ml].tipo != 4.1 && !(this.scene.map.cells[this.mc - 1][this.ml].tipo >= 0.0 && this.scene.map.cells[this.mc - 1][this.ml].tipo < 1))) {
        dnx = this.scene.map.SIZE * (this.mc - 1 + 1) - (this.x - this.w / 2);
        dx = Math.max(dnx, dx);
    }
    if (dy > 0 && (this.scene.map.cells[this.mc][this.ml + 1].tipo != 4.0 && this.scene.map.cells[this.mc][this.ml + 1].tipo != 4.1 && !(this.scene.map.cells[this.mc][this.ml + 1].tipo >= 0.0 && this.scene.map.cells[this.mc][this.ml + 1].tipo < 1))) {
        dny = this.scene.map.SIZE * (this.ml + 1) - (this.y + this.h / 2);
        dy = Math.min(dny, dy);
    }
    if (dy < 0 && (this.scene.map.cells[this.mc][this.ml - 1].tipo != 4.0 && this.scene.map.cells[this.mc][this.ml - 1].tipo != 4.1 && !(this.scene.map.cells[this.mc][this.ml - 1].tipo >= 0.0 && this.scene.map.cells[this.mc][this.ml - 1].tipo < 1))) {
        dny = this.scene.map.SIZE * (this.ml - 1 + 1) - (this.y - this.h / 2);
        dy = Math.max(dny, dy);
    }
    this.vy = dy / dt;
    this.vx = dx / dt;
    this.x = this.x + dx;
    this.y = this.y + dy;

    var MAXX = this.scene.map.SIZE * this.scene.map.COLUMNS - this.w / 2;
    var MAXY = this.scene.map.SIZE * this.scene.map.LINES - this.h / 2;

    if (this.x > MAXX) {
        this.x = MAXX;
        this.vx = 0;
    }
    if (this.y > MAXY) {
        this.y = MAXY;
        this.vy = 0;
    }
    if (this.x - this.w / 2 < 0) this.x = 0 + this.w / 2;
    if (this.y - this.h / 2 < 0) this.y = 0 + this.h / 2;

};

Sprite.prototype.colidiuCom = function (alvo) {
    if (alvo.x + alvo.w / 2 < this.x - this.w / 2)
        return false;
    if (alvo.x - alvo.w / 2 > this.x + this.w / 2)
        return false;

    if (alvo.y + alvo.h / 2 < this.y - this.h / 2)
        return false;
    if (alvo.y - alvo.h / 2 > this.y + this.h / 2)
        return false;

    return true;
};
