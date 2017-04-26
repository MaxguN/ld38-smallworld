function SmallWorld(radius, resolution) {
	PIXI.Graphics.call(this);

	// PIXI.Graphics --> Disc

	this.radius = radius;
	this.resolution = resolution;
	this.spacingX = resolution * 5 / 3;
	this.spacingY = resolution * 2;
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
	var column = 0;
	var newZone;

	// for (y = -this.radius; y <= this.radius; y += this.resolution) {
	// 	x = -this.radius;

	// 	if (line % 2) {
	// 		x += this.resolution;
	// 	}

	// 	for (; x <= this.radius; x += this.spacing) {
	// 		if (this.radius + this.resolution > Math.sqrt(Math.pow(this.circle.x - x, 2) + Math.pow(this.circle.y - y, 2))) {
	// 			newZone = new Trigger(Tags.Zone, [], new PIXI.Circle(x, y, this.resolution));
	// 			newZone.neighbors = [];

	// 			this.zones.forEach(function (zone) {
	// 				if (zone.shape.radius + newZone.shape.radius > Math.sqrt(Math.pow(newZone.shape.x - zone.shape.x, 2) + Math.pow(newZone.shape.y - zone.shape.y, 2))) {
	// 					zone.neighbors.push(newZone);
	// 					newZone.neighbors.push(zone);
	// 				}
	// 			}, this);

	// 			this.zones.push(newZone);
	// 		}
	// 	}

	// 	line += 1;
	// }

	for (x = -this.radius + this.resolution; x <= this.radius; x += this.spacingX) {
		y = -this.radius; // TODO adjust initial x/y value

		if (column % 2) {
			y += this.resolution;
		}

		for (; y <= this.radius; y += this.spacingY) {
			if (this.radius + this.resolution > Math.sqrt(Math.pow(this.circle.x - x, 2) + Math.pow(this.circle.y - y, 2))) {
				newZone = new Trigger(Tags.Zone, [], new PIXI.Circle(x, y, this.resolution));
				newZone.neighbors = [];

				this.zones.forEach(function (zone) {
					if (zone.shape.radius + newZone.shape.radius > Math.sqrt(Math.pow(newZone.shape.x - zone.shape.x, 2) + Math.pow(newZone.shape.y - zone.shape.y, 2))) {
						zone.neighbors.push(newZone);
						newZone.neighbors.push(zone);
					}
				}, this);

				this.zones.push(newZone);
			}
		}

		column += 1;
	}

	this.beginFill(0xcccccc, 1);
	this.drawCircle(0, 0, this.radius);
	this.endFill();

	// this.lineStyle(1, 0xff0000, 1);
	// this.zones.forEach(function (zone) {
	// 	this.drawCircle(zone.shape.x, zone.shape.y, zone.shape.radius);
	// }, this);
}

SmallWorld.prototype.Tick = function (length) {
	
}