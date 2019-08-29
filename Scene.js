function Scene(params) {
    var exemplo ={
        sprites: [],
        ctx: null,
        w: 300,
        h: 300
    }
    Object.assign(this, exemplo, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

Scene.prototype.adicionar = function(sprite){
    this.sprites.push(sprite);
    sprite.scene = this;
};

Scene.prototype.desenhar = function(){
    for(var i = 0; i<this.sprites.length; i++){
        this.sprites[i].desenhar(this.ctx);
    }  
};

Scene.prototype.mover = function(dt){
    for(var i = 0; i<this.sprites.length; i++){
        this.sprites[i].mover(dt);
    }  
};

Scene.prototype.comportar = function(){
    for(var i = 0; i<this.sprites.length; i++){
        if(this.sprites[i].comportar){
            this.sprites[i].comportar();
        }
    }  
};


Scene.prototype.limpar = function(){
    this.ctx.clearRect(0,0, this.w, this.h);
}

Scene.prototype.passo = function(dt){
    this.limpar();
    this.comportar();
    this.mover(dt);
    this.desenhar();
}