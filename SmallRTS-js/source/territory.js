function Territory(color) {
	PIXI.Graphics.call(this);

	this.color = color;
}

Territory.prototype = Object.create(PIXI.Graphics.prototype);
Territory.prototype.constructor = Territory;