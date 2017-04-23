function Entity(faction) {
	PIXI.Graphics.call(this);
	
	this.faction = faction;
}

Entity.prototype = Object.create(PIXI.Graphics.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype.Init = function () {

}