function AssetsManager() {
    this.aCarregar = 0;
    this.carregadas = 0;
    this.assets = {};
}

AssetsManager.prototype.loadImage = function (key, url) {
    console.log(`Carregando imagem ${url}...`);

    this.aCarregar++;
    var imagem = new Image();
    imagem.src = url;
    this.assets[key] = imagem;
    var that  = this;
    imagem.addEventListener("load", function () {
        that.carregadas++;
        console.log(`Imagem ${that.carregadas}/${that.aCarregar} ${key}: ${url} carregada.`);
    });
}

AssetsManager.prototype.img = function(key){
    return this.assets[key];
}