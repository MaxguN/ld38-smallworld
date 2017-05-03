function Level(number, player, renderer) {
	var self = this;

	this.player = player;
	this.ais = [];
	this.number = number;

	this.window = new PIXI.Rectangle(0, 0, renderer.width, renderer.height);
	this.interface = {};

	this.music = new Audio();

	this.loaded = false;
	this.paused = false;
	this.listeners = {
		ready : [],
		update : [],
		lose : [],
		win : []
	};
	this.next = {
		ready : [],
		kill : []
	};

	this.timer = 0;
	this.end = -1;
	this.ending = false;
	this.over = false;

	this.endTimer = null;
	this.endScale = 0.1;
	this.endPosition = new PIXI.Point(-150, 3 * renderer.height / 4);

	this.renderer = renderer;
	this.container = new PIXI.Container();
	this.game = new PIXI.Container();
	this.gameMask = new PIXI.Graphics();
	this.gui = new PIXI.Container();

	this.world = null;
	this.entities = [];
	this.factions = [];
	// this.replay = new Replay();
	/*
		Record (timestamped)
			- add entities
				- id
				- faction
			- actions
				- entity id
			- finishAction
				- entity id
			- policyChange
				- faction
	*/

	this.gui.position = new PIXI.Point(0,0);
	this.gui.width = this.renderer.width;
	this.gui.height = this.renderer.height;

	// load.json('levels/level' + number + '.json', function (data) {self.Init(data);});
	this.Init();
};

Level.prototype.Init = function() {
	this.gameMask.beginFill(0xffffff, 1);
	this.gameMask.drawCircle(this.renderer.width / 2, this.renderer.height / 2, 350);
	this.gameMask.endFill();
	this.gameMask.isMask = true;
	this.game.mask = this.gameMask;

	this.container.addChild(this.game);
	this.container.addChild(this.gui);

	this.world = new SmallWorld(350, 20);
	this.game.addChild(this.world);

	var ai;
	var faction;

	ai = new AIController();
	faction = new Faction(new Color(255,0,0), this, this.game, 0, -300);
	ai.SetFaction(faction);
	faction.on('newEntity', function (entity) {
		this.entities.push(entity);
	}, this);

	this.factions.push(faction);
	this.ais.push(ai);

	ai = new AIController();
	faction = new Faction(new Color(0,2555,0), this, this.game, -200, 200);
	ai.SetFaction(faction);
	faction.on('newEntity', function (entity) {
		this.entities.push(entity);
	}, this);

	this.factions.push(faction);
	this.ais.push(ai);

	ai = new AIController();
	faction = new Faction(new Color(255,255,0), this, this.game, 200, 200);
	ai.SetFaction(faction);
	faction.on('newEntity', function (entity) {
		this.entities.push(entity);
	}, this);

	this.factions.push(faction);
	this.ais.push(ai);

	faction = new Faction(new Color(0,0,255), this, this.game, 0, 0);
	this.player.SetFaction(faction);
	faction.on('newEntity', function (entity) {
		this.entities.push(entity);
	}, this);

	this.factions.push(faction);

	this.CenterCamera();

	this.BeginPlay();
};

Level.prototype.BeginPlay = function () {
	this.interface = new GUI(this);

	this.ais.forEach(function (ai) {
		ai.BeginPlay();
	}, this);
	this.player.BeginPlay();

	// TODO beginplay for AIs

	// TODO initial collision check for zone claiming
	this.entities.forEach(function (entity) {
		var collision = this.Collides(entity);

		if (collision.collides) {
			collision.zones.forEach(function (zone) {
				entity.faction.ClaimZone(zone);
			}, this);
		}
	}, this);

	// console.log(this.entities);
}

Level.prototype.GetRandomFaction = function (blacklist) {
	var faction = null;

	if (this.factions.length > 1) {
		do {
			faction = this.factions[Math.floor(Math.random() * this.factions.length)];
		} while (blacklist && faction === blacklist);
	}

	return faction;
}

Level.prototype.RemoveEntity = function (entity) {
	var index = this.entities.indexOf(entity);

	if (index !== -1) {
		this.entities.splice(index, 1);
		this.game.removeChild(entity);
	}
}

Level.prototype.RemoveFaction = function (faction) {
	// TODO check when it's triggered, might be too early
	var index = this.factions.indexOf(faction);

	if (index !== -1) {
		this.factions.splice(index, 1);
		this.game.removeChild(faction.territory);
	}

	if (this.player.faction === faction) {
		this.Defeat();
	} else if (this.factions.length === 1) {
		this.Victory();
	}
}

Level.prototype.on = function (eventType, callback, self) {
	if (this.listeners[eventType]) {
		this.listeners[eventType].push({func : callback, object : self});
	} else {
		console.log('Eventype:', eventType, 'not recognized');
	}
};

Level.prototype.off = function(eventType, callback) {
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

Level.prototype.ready = function(callback) {
	if (!this.loaded) {
		this.next.ready.push(callback);
	} else {
		callback();
	}
};

Level.prototype.update = function () {
	this.listeners.update.forEach(function (listener) {
		listener.func.call(listener.object);
	});
}

Level.prototype.lose = function() {
	this.listeners.lose.forEach(function (listener) {
		listener.func.call(listener.object);
	});
};

Level.prototype.win = function() {
	this.listeners.win.forEach(function (listener) {
		listener.func.call(listener.object);
	});
};

Level.prototype.CenterCamera = function (point) {
	this.game.x = this.renderer.width / 2;
	this.game.y = this.renderer.height / 2;
};

Level.prototype.EndLevel = function () {
	if (!this.ending) {
		this.ending = true;

		console.log('Ending level', this.number)


		this.EndGame();
		// this.Victory();
		// this.Defeat();
	}
};

Level.prototype.Victory = function () {
	// menu.EndGame(true, this.interface.SecondsToDisplay(this.timer));
	// currentScene = menu;

	this.ending = true;
	this.endTimer = new Timer(1);

	var container = new PIXI.Container();
	var world = new SmallWorld(350, 20);
	container.addChild(world);
	container.scale = new PIXI.Point(this.endScale, this.endScale);
	container.position = new PIXI.Point(this.renderer.width - this.endPosition.x, this.endPosition.y);
	this.container.addChildAt(container, 0);

	this.endTimer.on('tick', function (length) {
		var deltaScale = (this.endScale - 1 / this.endTimer.duration) * length;
		this.game.scale = new PIXI.Point(this.game.scale.x + deltaScale, this.game.scale.y + deltaScale);

		var deltaPosition = new PIXI.Point(
			((this.endPosition.x - this.renderer.width / 2) / this.endTimer.duration) * length,
			((this.endPosition.y - this.renderer.height / 2) / this.endTimer.duration) * length);
		this.game.position.x += deltaPosition.x; 
		this.game.position.y += deltaPosition.y;

		this.gameMask.clear();
		this.gameMask.beginFill(0xffffff, 1);
		this.gameMask.drawCircle(this.game.position.x, this.game.position.y, 350 * this.game.scale.x);
		this.gameMask.endFill();

		container.scale.x += -deltaScale;
		container.scale.y += -deltaScale;
		container.position.x += deltaPosition.x;
		container.position.y += -deltaPosition.y;
	}, this),

	this.endTimer.on('end', function () {
		this.pause = true;
		this.ending = false;
		this.end = true;

		this.interface.Hide();

		this.player.Save(this);
		this.player.Reset();

		currentScene = new Level(this.number + 1, this.player, this.renderer);
	}, this);

	this.endTimer.Start();
};

Level.prototype.Defeat = function () {
	menu.EndGame(false);
	currentScene = menu;
};

Level.prototype.EndGame = function () {
	currentScene = new Menu(this.renderer);
};

Level.prototype.Collides = function(trigger) {
	var zones = [];
	var collision = {};

	this.world.zones.forEach(function (zone) {
		if (!zone.faction && trigger.shape.contains(zone.shape.x, zone.shape.y)) {
			zones.push(zone);
		}
	}, this);

	if (zones.length) {
		collision.collides = true;
		collision.zones = zones;
	}

	return collision;
};

Level.prototype.Keypress = function () {};

Level.prototype.TogglePause = function () {
	if (this.paused) {
		this.Play();
	} else {
		this.Pause();
	}
};

Level.prototype.Pause = function () {
	if (!this.paused) {
		this.paused = true;
	}
};

Level.prototype.Play = function () {
	if (this.paused) {
		this.paused = false;
	}
};

Level.prototype.Tick = function(length) {
	if (!this.paused) {
		if (!this.ending) {
			this.timer += length;
		}

		// this.world.Tick(length);
		this.ais.forEach(function (ai) {
			ai.Tick(length);
		}, this);
		this.player.Tick(length);

		this.entities.forEach(function (entity) {
			if (entity.action === 'explore') {
				var collision = this.Collides(entity);

				if (collision.collides) {
					collision.zones.forEach(function (zone) {
						entity.faction.ClaimZone(zone);
					}, this);
				}
			}
		}, this);

		this.interface.Tick(length);
	}

	if (this.ending) {
		this.endTimer.Tick(length);
	}

	this.Draw();
};

Level.prototype.Draw = function() {
	this.renderer.render(this.container);
};