function Entity(faction) {
	PIXI.Graphics.call(this);
	Trigger.call(this, Tags.Entity, [Tags.Zone], new PIXI.Circle(this.x, this.y, 25));

	this.faction = faction;

	this.action = null;
	this.target = null;

	this.runSpeed = 60;
	this.walkSpeed = 20;

	this.speed = this.walkSpeed; // pixels/s

	this.Init();
}

Entity.prototype = Object.create(PIXI.Graphics.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype.Init = function () {
	this.ResetColor();
}

Entity.prototype.ResetColor = function () {
	this.clear();
	this.beginFill(this.faction.color.Darker().toInt(), 1);
	this.drawCircle(0, 0, 3);
	this.endFill();
}

Entity.prototype.DoAction = function (action) {
	this.Free();
	this.action = action;

	function getDistance(a, b) {
		return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
	}

	switch (this.action) {
		case 'attack':
			var entities = this.faction.GetOtherEntities();

			if (entities.length) {
				this.target = entities.shift();
				var distance = getDistance(this, this.target);

				entities.forEach(function (other) {
					var newDistance = getDistance(this, other);

					if (newDistance < distance) {
						this.target = other;
						distance = newDistance;
					}
				}, this);

				this.speed = this.runSpeed;
			} else {
				this.FinishAction();
			}
			break;
		case 'emmigrate':
			var faction = this.faction.level.GetRandomFaction(this.faction);

			if (faction) {
				faction.TransferEntity(this);
			}

			this.FinishAction();
			break;
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
				this.faction.StopExploration();
				this.FinishAction();
			}

			break;
		case 'kidnap':
			var entities = this.faction.GetOtherEntitiesOnTerritory();

			if (entities.length) {
				this.target = entities.shift();
				var distance = getDistance(this, this.target);

				entities.forEach(function (other) {
					var newDistance = getDistance(this, other);

					if (newDistance < distance) {
						this.target = other;
						distance = newDistance;
					}
				}, this);

				this.speed = this.runSpeed;
			} else {
				this.FinishAction();
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
		case 'tourism':
			var faction = this.faction.level.GetRandomFaction(this.faction);

			if (faction) {
				this.target = faction.territory.GetRandomZone();
			} else {
				this.FinishAction();
			}
			break;
		case 'walk':
			this.target = this.faction.territory.GetRandomZone();
			break;
	}
}

Entity.prototype.FinishAction = function () {
	switch (this.action) {
		case 'attack':
			this.speed = this.walkSpeed;

			if (this.target) {
				var otherFaction = null;

				if (this.target.faction.entities.length === 1) {
					otherFaction = this.target.faction;
				}

				this.target.Kill();
				
				if (otherFaction) {
					this.faction.TakeOver(otherFaction);
				}
			}
			break;
		case 'kidnap':
			this.speed = this.walkSpeed;

			if (this.target) {
				this.faction.TransferEntity(this.target);
			}
			break;
		case 'procreating':
			if (this.target) {
				this.target.FinishAction();
				this.faction.AddEntity(null, this.x, this.y);
			}
			break;
		case 'tourism':
			break;
	}

	this.faction.FreeEntity(this);
}

Entity.prototype.Free = function () {
	this.action = null;
	this.target = null;
}

Entity.prototype.Kill = function () {
	this.faction.RemoveEntity(this);
	this.faction.level.RemoveEntity(this);
	this.Free();
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
		if (this.action === 'explore' && this.target.faction) {
			this.FinishAction();
		} else {
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
}