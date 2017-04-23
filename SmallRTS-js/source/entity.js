function Entity(faction) {
	PIXI.Graphics.call(this);
	Trigger.call(this, Tags.Entity, [Tags.Zone], new PIXI.Circle(this.x, this.y, 25));

	this.faction = faction;

	this.action = null;
	this.target = null;

	this.speed = 20; // pixels/s

	this.Init();
}

Entity.prototype = Object.create(PIXI.Graphics.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype.Init = function () {
	this.beginFill(this.faction.color.Darker().toInt(), 1);
	this.drawCircle(0, 0, 3);
	this.endFill();
}

Entity.prototype.DoAction = function (action) {
	this.action = action;

	switch (this.action) {
		case 'explore':
			var freeZones = [];
			this.faction.territory.zones.forEach(function (zone) {
				zone.neighbors.forEach(function (neighbor) {
					if (!neighbor.faction && freeZones.indexOf(neighbor) === -1) {
						freeZones.push(neighbor);
					}
				}, this);
			}, this);

			if (freeZones.length) {
				this.target = freeZones[Math.floor(Math.random() * freeZones.length)];
			} else {
				this.faction.FreeEntity(this);
			}

			break;
		case 'procreate':
			this.faction.entities.forEach(function (entity) {
				if (entity !== this && entity.action === 'procreate') {
					entity.action = 'procreating';
					this.action = 'procreating';

					this.target = entity;
				}
			}, this);
			break;
	}
}

Entity.prototype.FinishAction = function () {
	switch (this.action) {
		case 'procreating':
			if (this.target) {
				this.target.FinishAction();
				this.faction.AddEntity(null, this.x, this.y);
			}
			break;
	}

	this.faction.FreeEntity(this);
}

Entity.prototype.Free = function () {
	this.action = null;
	this.target = null;
}

Entity.prototype.MoveTo = function (x, y) {
	this.x = x;
	this.y = y;

	this.shape.x = this.x;
	this.shape.y = this.y;
}

Entity.prototype.MoveBy = function (x, y) {
	this.x += x;
	this.y += y;

	this.shape.x = this.x;
	this.shape.y = this.y;
}

Entity.prototype.Tick = function (length) {
	if (this.target) {
		var x = this.target.shape.x - this.x;
		var y = this.target.shape.y - this.y;
		var distance = Math.sqrt(x * x + y * y);

		if (distance) {
			var delta = this.speed * length / distance;

			if (delta > 1) {
				delta = 1;
				this.FinishAction();
			}

			this.MoveBy(delta * x, delta * y);
		} else {
			this.FinishAction();
		}
	}
}