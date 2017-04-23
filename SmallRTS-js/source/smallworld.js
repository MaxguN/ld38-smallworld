function SmallWorld(radius, resolution) {
	PIXI.Graphics.call(this);

	// PIXI.Graphics --> Disc

	this.radius = radius;
	this.resolution = resolution;
	this.spacing = resolution * 2;
	this.circle = new PIXI.Circle(0, 0, radius);

	this.zones = [];

	this.Init();
}

SmallWorld.prototype = Object.create(PIXI.Graphics.prototype);
SmallWorld.prototype.constructor = SmallWorld;

SmallWorld.prototype.Init = function () {
	var x;
	var y;
	var line = 0;

	for (y = -this.radius; y <= this.radius; y += this.resolution) {
		x = -this.radius;

		if (line % 2) {
			x += this.resolution;
		}

		for (; x <= this.radius; x += this.spacing) {
			if (this.radius + this.resolution > Math.sqrt(Math.pow(this.circle.x - x, 2) + Math.pow(this.circle.y - y, 2))) {
				this.zones.push(new PIXI.Circle(x, y, this.resolution));
			}
		}

		line += 1;
	}

	this.beginFill(0xcccccc, 1);
	this.drawCircle(0, 0, this.radius);
	this.endFill();

	// this.lineStyle(1, 0xff0000, 1);
	// this.zones.forEach(function (zone) {
	// 	this.drawCircle(zone.x, zone.y, zone.radius);
	// }, this);
}

SmallWorld.prototype.Tick = function (length) {
	
}