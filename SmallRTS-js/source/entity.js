function Entity(faction) {
	PIXI.Graphics.call(this);
	Trigger.call(this, Tags.Entity, [Tags.Zone], new PIXI.Circle(this.x, this.y, 25));

	this.faction = faction;
	this.alive = true;

	this.action = null;
	this.target = null;
	this.targets = [];

	this.runSpeed = 60;
	this.walkSpeed = 20;

	this.baseRadius = 25;
	this.defendTime = 5;
	this.defendRadius = 100;
	this.interactTime = 5;
	this.expatriateLength = 5;

	this.speed = this.walkSpeed; // pixels/s
	this.pause = false;
	this.timer = null;

	this.Init();

	// TODO 
	// add personality to entities (start neutral then evolve depending on policies and trends and parents)
	// add aging to entities so they can die (that way the population will renew itself)
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

				this.faction.entities.forEach(function (entity) {
					if (entity !== this) {
						if (this.target === entity.target) {
							this.target = null;
							this.FinishAction();
						}
					}
				}, this);
			} else {
				this.FinishAction();
			}
			break;
		case 'defend':
			// TODO (alt) prevent other faction from coming in
			var border = this.faction.GetBorderZones();

			if (border.length) {
				this.target = border[Math.floor(Math.random() * border.length)];
			}
			break;
		case 'emmigrate':
			var faction = this.faction.level.GetRandomFaction(this.faction);

			if (faction) {
				faction.TransferEntity(this);
			}

			this.FinishAction();
			break;
		case 'expatriate':
			// TODO (alt) during Y time
			var faction = this.faction.level.GetRandomHighFaction('workload', this.faction);

			if (faction) {
				var zones = faction.territory.zones.slice();

				for (var i = 0; i < this.expatriateLength && zones.length; i += 1) {
					this.targets.push(zones.splice(Math.floor(Math.random() * zones.length)[0], 1));
				}

				if (this.targets.length) {
					this.target = this.targets.shift();
				}
			} else {
				this.FinishAction();
			}
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
		case 'interact':
			var entities = this.faction.entities;

			if (entities.length > 1) {
				do {
					this.target = entities[Math.floor(Math.random() * entities.length)];					
				} while (this.target === this)

				this.speed = this.runSpeed;
			} else {
				this.FinishAction();
			}
			break;
		case 'interactAbroad':
			var entities = this.faction.GetOtherEntities();

			if (entities.length) {
				this.target = entities[Math.floor(Math.random() * entities.length)];
				this.speed = this.runSpeed;
			} else {
				this.FinishAction();
			}
			break;
			break;
		case 'internalAttack':
			var entities = this.faction.entities.slice();

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

				this.faction.GetOtherEntities().forEach(function (entity) {
					if (entity !== this) {
						if (this.target === entity.target) {
							this.target = null;
							this.FinishAction();
						}
					}
				}, this);
			} else {
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

				this.faction.entities.forEach(function (entity) {
					if (entity !== this) {
						if (this.target === entity.target) {
							this.target = null;
							this.FinishAction();
						}
					}
				}, this);
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
	if (!this.timer) {
		switch (this.action) {
			case 'attack':
			case 'internalAttack':
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
			case 'defend':
				if (this.target) {
					this.shape.radius = this.defendRadius;

					this.timer = new Timer(this.defendTime);
					this.timer.Start();
					this.timer.on('end', function () {
						this.shape.radius = this.baseRadius;
						this.faction.FreeEntity(this);
					}, this);
					
					return;
				}
				break;
			case 'expatriate':
				if (this.targets.length) {
					this.target = this.targets.shift();
					return;
				}
				break;
			case 'interact':
			case 'interactAbroad':
				this.speed = this.walkSpeed;

				if (this.target) {
					this.target.Pause();

					this.timer = new Timer(this.interactTime);
					this.timer.Start();
					this.timer.on('end', function () {
						if (this.target) {
							this.target.Unpause();
						}

						this.faction.trends.morale = Math.min(10, this.faction.trends.morale + 0.75);

						this.faction.FreeEntity(this);
					}, this);
					
					return;
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
				this.faction.trends.morale = Math.min(10, this.faction.trends.morale + 0.25);
				break;
		}

		this.faction.FreeEntity(this);
	}
}

Entity.prototype.Free = function () {
	this.action = null;
	this.target = null;
	this.timer = null;
}

Entity.prototype.Pause = function () {
	this.pause = true;
}

Entity.prototype.Unpause = function () {
	this.pause = false;
}

Entity.prototype.Collides = function (others) {
	others.some(function (other) {
		if (this.shape.contains(other.shape.x, other.shape.y)) {
			switch (this.action) {
				case 'defend':
					var otherFaction = null;

					if (other.faction.entities.length === 1) {
						otherFaction = other.faction;
					}

					other.Kill();
					
					if (otherFaction) {
						this.faction.TakeOver(otherFaction);
					}
					break;
			}

			return true;
		}
	}, this);
}

Entity.prototype.Kill = function () {
	// console.log('Killing entity from ' + this.faction.color.toHtml());
	this.alive = false;
	this.faction.RemoveEntity(this);
	this.faction.level.RemoveEntity(this);
	this.Free();
	// console.log('now dead');
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
	if (!this.pause && this.target) {
		switch (this.action) {
			case 'attack':
				if (!this.target.alive || this.target.faction === this.faction) {
					this.target = null;
					this.FinishAction();
					return;
				}
				break;
			case 'defend':
				if (this.target.faction !== this.faction) {
					this.target = null;

					if (this.timer) {
						this.timer.Stop();
					} else {
						this.FinishAction();
					}
					return;
				} else {
					this.Collides(this.faction.GetOtherEntitiesOnTerritory());
				}
				break;
			case 'expatriate':
				if (this.target.faction === this.faction) {
					this.FinishAction();
					return;
				}
				break;
			case 'explore':
				if (this.target.faction) {
					this.FinishAction();
					return;
				}
				break;
			case 'interact':
			case 'interactAbroad':
				if (!this.target.alive) {
					this.target = null;

					if (this.timer) {
						this.timer.Stop();
					} else {
						this.FinishAction();
					}
					return;
				}
				break;
			case 'internalAttack':
				if (!this.target.alive) {
					this.target = null;
					this.FinishAction();
					return;
				}
				break;
			case 'kidnap':
				if (!this.target.alive || this.target.faction === this.faction) {
					this.FinishAction();
					return;
				}
				break;
			case 'procreate':
				if (this.target && (!this.target.alive || this.target.faction !== this.faction)) {
					this.FinishAction();
				}
				break;
		}

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

			if (this.timer) {
				this.timer.Tick(length);
			}
		} else {
			this.FinishAction();
		}
	}
}