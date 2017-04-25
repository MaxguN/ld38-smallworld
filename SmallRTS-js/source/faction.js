function Faction(color, level, container, x, y) {
	this.x = x;
	this.y = y;

	this.territory = null;
	this.entities = [];
	this.freeEntities = [];

	this.actions = [];
	this.policies = {
		exploration : 5,
		workload : 5,
		trading : 5,
		birthrate : 5,
		borders : 0,
		relations : 0
	};
	this.policiesOrder = [];
	this.relations = null;
	this.morale = 0;

	this.color = color;
	this.container = container;
	this.level = level;

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

	entity.FinishAction();

	this.AddEntity(entity);
	entity.faction = this;
	entity.ResetColor();
}

Faction.prototype.RemoveEntity = function (entity) {
	var index = this.entities.indexOf(entity);
	if (index !== -1) {
		this.entities.splice(index, 1);
	}

	index = this.freeEntities.indexOf(entity);
	if (index !== -1) {
		this.freeEntities.splice(index, 1);
	}
}

Faction.prototype.GetOtherEntities = function () {
	var entities = [];

	this.level.entities.forEach(function (entity) {
		if (entity.faction !== this) {
			entities.push(entity);
		}
	}, this);

	return entities;
}

Faction.prototype.GetOtherEntitiesOnTerritory = function () {
	var entities = [];

	this.level.entities.forEach(function (entity) {
		if (entity.faction !== this) {
			if (this.territory.Collides(entity).collides) {
				entities.push(entity);
			}
		}
	}, this);

	return entities;
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

Faction.prototype.TakeOver = function (faction) {
	var zones = faction.territory.zones.slice();

	zones.forEach(function (zone) {
		this.ClaimZone(zone);
	}, this);

	this.level.RemoveFaction(faction);
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

Faction.prototype.addActionAttack = function (actionCount) {
	var hostility = -this.policies.relations;
	var exploration = this.policies.exploration;
	var probability = exploration / 10;

	while (this.actions.length < actionCount && hostility > 0) {
		if (Math.random() < probability) {
			this.actions.push('attack');
		}
		hostility -= 4;
	}
}

Faction.prototype.addActionEmmigrate = function (actionCount) {
	var closeness = -this.policies.borders;
	var probability = 0.1;

	while (this.actions.length < actionCount && closeness > 0) {
		if (Math.random() < probability) {
			this.actions.push('emmigrate');
		}
		closeness -= 3;
	}
}

Faction.prototype.addActionExplore = function (actionCount) {
	var exploration = this.policies.exploration;

	while (this.canExplore && this.actions.length < actionCount && exploration > 0) {
		this.actions.push('explore'); // TODO check if necessary to add RNG
		exploration -= 2;
	}
}

Faction.prototype.addActionKidnap = function (actionCount) {
	var hostility = -this.policies.relations;
	var closeness = Math.max(0, Math.min(10, -this.policies.borders));
	var probability = closeness / 10;

	while (this.actions.length < actionCount && hostility > 0) {
		if (Math.random() < probability) {
			this.actions.push('kidnap');
		}
		hostility -= 3;
	}
}

Faction.prototype.addActionProcreate = function (actionCount) {
	var birthrate = this.policies.birthrate;

	do {
		if (this.entities.length < 10 + this.policies.birthrate * 4) {
			this.actions.push('procreate');
			this.actions.push('procreate');
		}

		birthrate -= 2;
	} while (this.actions.length < actionCount - 1 && birthrate > 5);
}

Faction.prototype.addActionTrade = function (actionCount) {

}

Faction.prototype.addActionTourism = function (actionCount) {
	var freetime = 10 - this.policies.workload;
	var openness = Math.max(0, Math.min(10, this.policies.borders));
	var probability = openness / 10;

	while (this.actions.length < actionCount && freetime >= 0) {
		if (Math.random() < probability) {
			this.actions.push('tourism');
		}
		freetime -= 3;
	}
}

Faction.prototype.RunAlgorithm = function () {
	if (this.actions.length === 0) {
		var actionCount = Math.max(2, Math.min(10, this.entities.length));
		
		this.addActionProcreate(actionCount);

		this.policiesOrder.forEach(function (policy) {
			switch (policy) {
				case 'borders':
					this.addActionTourism(actionCount);
					this.addActionKidnap(actionCount);
					this.addActionEmmigrate(actionCount);
					break;
				case 'trading':
					this.addActionTrade(actionCount);
					break;
				case 'exploration':
					this.addActionExplore(actionCount);
					this.addActionAttack(actionCount);
					break;
				case 'relations':
					this.addActionAttack(actionCount);
					this.addActionKidnap(actionCount);
					break;
				case 'workload':
					this.addActionTourism(actionCount);
					break;
			}
		}, this);

		while (this.actions.length < actionCount) {
			this.actions.push('walk');
		}
		
		this.actions.push('walk');

		var actions = [];

		while (this.actions.length) {
			actions.splice(Math.floor(Math.random() * actions.length), 0, this.actions.splice(Math.floor(Math.random() * this.actions.length), 1)[0]);
		}

		this.actions = actions;
	}
}

Faction.prototype.DoActions = function () {
	while (this.freeEntities.length && this.actions.length) {
		this.freeEntities.shift().DoAction(this.actions.shift());
	}
}

Faction.prototype.FreeEntity = function (entity) {
	entity.Free();

	if (this.freeEntities.indexOf(entity) === -1) {
		this.freeEntities.push(entity);
	}
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