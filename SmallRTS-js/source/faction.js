function Faction(color, container, x, y) {
	this.x = x;
	this.y = y;

	this.territory = null;
	this.entities = [];
	this.freeEntities = [];

	this.actions = [];
	this.policies = {
		borders : 0,
		trading : 5,
		exploration : 5,
		birthrate : 5,
		relations : 0,
		workload : 5
	};
	this.policiesOrder = [];
	this.relations = null;
	this.morale = 0;

	this.color = color;
	this.container = container;

	this.canExplore = true;

	this.listeners = {
		newEntity : []
	};

	this.Init();
}

Faction.prototype.Init = function () {
	this.territory = new Territory(this.color.Lighter());
	this.container.addChild(this.territory);

	this.ReorderPolicies();
}

Faction.prototype.BeginPlay = function () {
	this.AddEntity(null, this.x, this.y);
	this.AddEntity(null, this.x, this.y);
}

Faction.prototype.on = function (eventType, callback, self) {
	if (this.listeners[eventType]) {
		this.listeners[eventType].push({func : callback, object : self});
	} else {
		console.log('Eventype:', eventType, 'not recognized');
	}
};

Faction.prototype.off = function(eventType, callback) {
	var indexes = [];

	if (!this.listeners[eventType]) {
		console.log('Eventype:', eventType, 'not recognized');
		return;
	}

	this.listeners[eventType].forEach(function (listener, index) {
		if (listener.func === callback) {
			indexes.unshift(index);
		}
	}, this);

	indexes.forEach(function (index) {
		this.listeners[eventType].splice(index, 1);
	}, this);
};

Faction.prototype.newEntity = function (entity) {
	this.listeners.newEntity.forEach(function (listener) {
		listener.func.call(listener.object, entity);
	});
}

Faction.prototype.AddEntity = function (entity, x, y) {
	if (!entity) {
		entity = new Entity(this);

		if (x !== undefined && y !== undefined) {
			entity.MoveTo(x, y);
		}

		this.container.addChild(entity);
		this.newEntity(entity);
	}

	this.entities.push(entity);
	this.freeEntities.push(entity);
}

Faction.prototype.TransferEntity = function (entity) {
	entity.faction.RemoveEntity(entity);

	// TODO cancel current action of entity

	this.AddEntity(entity);
	entity.faction = this;
}

Faction.prototype.RemoveEntity = function (entity) {
	this.entities.splice(this.entities.indexOf(entity), 1);
	this.freeEntities.splice(this.freeEntities.indexOf(entity), 1);
}

Faction.prototype.ClaimZone = function (zone) {
	if (zone.faction) {
		zone.faction.AbandonZone(zone);
	}

	zone.faction = this;
	this.territory.AddZone(zone);
}

Faction.prototype.AbandonZone = function (zone) {
	this.territory.RemoveZone(zone);
	zone.faction = null;
}

Faction.prototype.ReorderPolicies = function () {
	this.policiesOrder = [];

	for (var policy in this.policies) {
		var inserted = this.policiesOrder.some(function (value, index) {
			if (this.policies[policy] > this.policies[value]) {
				this.policiesOrder.splice(index, 0, policy);
				return true;
			}
		}, this);

		if (!inserted) {
			this.policiesOrder.push(policy);
		}
	}
}

Faction.prototype.RunAlgorithm = function () {
	if (this.actions.length === 0) {
		var actionCount = Math.max(2, Math.min(10, this.entities.length));
		var birthrate = this.policies.birthrate;

		do {
			if (this.entities.length < 10 + this.policies.birthrate * 4) {
				this.actions.push('procreate');
				this.actions.push('procreate');
			}

			birthrate -= 2;
		} while (this.actions.length < actionCount - 1 && birthrate > 5);

		this.policiesOrder.forEach(function (policy) {
			switch (policy) {
				case 'borders':
					// TODO implement
					break;
				case 'trading':
					// TODO implement
					break;
				case 'exploration':
					while (this.canExplore && this.actions.length < actionCount) {
						this.actions.push('explore');
					}
					break;
				case 'relations':
					// TODO implement
					break;
				case 'workload':
					// TODO implement
					break;
			}
		}, this);
	}
}

Faction.prototype.DoActions = function () {
	while (this.freeEntities.length && this.actions.length) {
		this.freeEntities.shift().DoAction(this.actions.shift());
	}
}

Faction.prototype.FreeEntity = function (entity) {
	entity.Free();
	this.freeEntities.push(entity);
}

Faction.prototype.StopExploration = function () {
	this.canExplore = false;
}

Faction.prototype.Tick = function (length) {
	this.RunAlgorithm();
	this.DoActions();

	this.entities.forEach(function (entity) {
		entity.Tick(length);
	}, this);

	this.territory.Tick(length)
}