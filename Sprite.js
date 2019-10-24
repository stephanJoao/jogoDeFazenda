function Sprite(params = {}) {
    var exemplo = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        h: 10,
        w: 10,
        vm: 0,
        pose: 8,
        frame: 0,
        props: {},
        inventario: {},
        acao: 0,
        direcao: 0,
        cooldown: 0,
        color: "blue",
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
    ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.rotate(this.a);
    ctx.drawImage(
        this.scene.assets.img("player"),
        64 * Math.floor(this.frame), //linha
        64 * this.pose,              //coluna
        64,                        //tamanho na imagem x
        64,                        //tamanho na imagem y
        -64 / 2,                   //posicao em x
        -60,                       //posicao em y
        64,                        //tamanho no canvas x
        64                         //tamanho no canvas y
    );
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
};

Sprite.prototype.mover = function (dt) {
    this.moverOrtogonal(dt);

    //ANIMACAO
    if (this.vx != 0 || this.vy != 0)
        this.frame += 10 * dt;
    else
        this.frame = 0;
    if (this.frame > 9) {
        this.frame = 1;
    }
}

Sprite.prototype.moverOrtogonal = function (dt) {
    if (this.vx != 0 && this.vy != 0) {
        this.vx = 0;
        this.vy = 0;
    }

    this.mc = Math.floor(this.x / this.scene.map.SIZE);
    this.ml = Math.floor(this.y / this.scene.map.SIZE);

    this.aplicaRestricoes(dt);
    this.cooldown = this.cooldown - dt;
}

Sprite.prototype.aplicaRestricoes = function (dt) {
    var dnx;
    var dx;
    dx = this.vx * dt;
    dnx = dx;
    dy = this.vy * dt;
    dny = dy;
    if (dx > 0 && (this.scene.map.cells[this.mc + 1][this.ml].tipo != 0 && this.scene.map.cells[this.mc + 1][this.ml].tipo != 1)) {
        dnx = this.scene.map.SIZE * (this.mc + 1) - (this.x + this.w / 2);
        dx = Math.min(dnx, dx);
    }
    if (dx < 0 && (this.scene.map.cells[this.mc - 1][this.ml].tipo != 0 && this.scene.map.cells[this.mc - 1][this.ml].tipo != 1)) {
        dnx = this.scene.map.SIZE * (this.mc - 1 + 1) - (this.x - this.w / 2);
        dx = Math.max(dnx, dx);
    }
    if (dy > 0 && (this.scene.map.cells[this.mc][this.ml + 1].tipo != 0 && this.scene.map.cells[this.mc][this.ml + 1].tipo != 1)) {
        dny = this.scene.map.SIZE * (this.ml + 1) - (this.y + this.h / 2);
        dy = Math.min(dny, dy);
    }
    if (dy < 0 && (this.scene.map.cells[this.mc][this.ml - 1].tipo != 0 && this.scene.map.cells[this.mc][this.ml - 1].tipo != 1)) {
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

}


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
}
