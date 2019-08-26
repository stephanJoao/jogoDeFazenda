function Sprite(params = {}) {
    var exemplo = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        h: 10,
        w: 10,
        color: "blue",
        imune: 0,
        atirando: 0
    }
    Object.assign(this, exemplo, params);
}
Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);
};