function Sprite(params = {}) {
    var exemplo = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        h: 10,
        w: 10,
        a: 0,
        va: 0,
        vm: 0,
        props : {},
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

Sprite.prototype.desenhar = function(ctx) {
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.strokeRect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.rotate(this.a + Math.PI/2);
    
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.strokeRect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.restore();
};

Sprite.prototype.mover = function (dt) {
    this.moverOrtogonal(dt);
}

Sprite.prototype.moverCircular = function (dt) {
    this.a = this.a + this.va*dt;

    this.vx = this.vm*Math.cos(this.a);
    this.vy = this.vm*Math.sin(this.a);

    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;

    this.cooldown = this.cooldown -dt;
}

Sprite.prototype.moverOrtogonal = function (dt) {
    //this.a = this.a + this.va*dt;

    //this.vx = this.vm*Math.cos(this.a);
    //this.vy = this.vm*Math.sin(this.a);

    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;

    this.cooldown = this.cooldown -dt;
}


Sprite.prototype.colidiuCom = function(alvo){
    if(alvo.x+alvo.w/2 < this.x-this.w/2) return false;
    if(alvo.x-alvo.w/2 > this.x+this.w/2) return false;

    if(alvo.y+alvo.h/2 < this.y-this.h/2) return false;
    if(alvo.y-alvo.h/2 > this.y+this.h/2) return false;

    return true;
}