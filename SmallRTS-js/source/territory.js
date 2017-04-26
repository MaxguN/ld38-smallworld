function Territory(color) {
	PIXI.Graphics.call(this);

	this.color = color;

	this.zones = [];
	this.freeZones = []; // TODO remove

	this.drawCall = false;
}

Territory.prototype = Object.create(PIXI.Graphics.prototype);
Territory.prototype.constructor = Territory;

Territory.prototype.AddZone = function (zone) {
	if (this.zones.indexOf(zone) === -1) {
		this.zones.push(zone);

		this.Draw();
	}
}

Territory.prototype.RemoveZone = function (zone) {
	this.zones.splice(this.zones.indexOf(zone), 1);
	this.Draw();
}

Territory.prototype.GetRandomZone = function () {
	return this.zones[Math.floor(Math.random() * this.zones.length)];
}

Territory.prototype.Collides = function(trigger) {
	var zones = [];
	var collision = {};

	this.zones.forEach(function (zone) {
		if (zone.shape.contains(trigger.shape.x, trigger.shape.y)) {
			zones.push(zone);
		}
	}, this);

	if (zones.length) {
		collision.collides = true;
		collision.zones = zones;
	}

	return collision;
};

Territory.prototype.Draw = function () {
	this.drawCall = true;
}

Territory.prototype.Tick = function (length) {
	if (this.drawCall) {
		this.clear();
		this.beginFill(this.color.toInt(), 1);
		// this.lineStyle(1, 0xff0000, 1);
		this.zones.forEach(function (zone) {
			var x = zone.shape.x;
			var y = zone.shape.y;
			var outerRadius = zone.shape.radius * 2 / Math.sqrt(3);
			this.moveTo(x + Math.cos(0) * outerRadius, y + Math.sin(0) * outerRadius);
			this.lineTo(x + Math.cos(Math.PI / 3) * outerRadius, y + Math.sin(Math.PI / 3) * outerRadius);
			this.lineTo(x + Math.cos(2 * Math.PI / 3) * outerRadius, y + Math.sin(2 * Math.PI / 3) * outerRadius);
			this.lineTo(x + Math.cos(Math.PI) * outerRadius, y + Math.sin(Math.PI) * outerRadius);
			this.lineTo(x + Math.cos(4 * Math.PI / 3) * outerRadius, y + Math.sin(4 * Math.PI / 3) * outerRadius);
			this.lineTo(x + Math.cos(5 * Math.PI / 3) * outerRadius, y + Math.sin(5 * Math.PI / 3) * outerRadius);
			this.lineTo(x + Math.cos(0) * outerRadius, y + Math.sin(0) * outerRadius);
			// this.drawCircle(zone.shape.x, zone.shape.y, zone.shape.radius);
		}, this);
		this.endFill();

		this.drawCall = false;
	}
}