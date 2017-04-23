function Territory(color) {
	PIXI.Graphics.call(this);

	this.color = color;

	this.zones = [];
}

Territory.prototype = Object.create(PIXI.Graphics.prototype);
Territory.prototype.constructor = Territory;

Territory.prototype.AddZone = function (zone) {
	this.zones.push(zone);
	this.Draw();
}

Territory.prototype.RemoveZone = function (zone) {
	this.zones.splice(this.zones.indexOf(zone), 1);
	this.Draw();
}

Territory.prototype.Draw = function () {
	this.beginFill(this.color.toInt(), 1);
	// this.lineStyle(1, 0xff0000, 1);
	this.zones.forEach(function (zone) {
		this.drawCircle(zone.shape.x, zone.shape.y, zone.shape.radius);
	}, this);
	this.endFill();

}