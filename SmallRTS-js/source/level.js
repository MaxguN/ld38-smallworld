function Level(number, player, renderer) {
	var self = this;

	this.player = player;
	this.ais = [];
	this.number = number;

	this.window = new PIXI.Rectangle(0, 0, renderer.width, renderer.height);

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

	this.end = -1;
	this.ending = false;
	this.over = false;

	this.renderer = renderer;
	this.container = new PIXI.Container();
	this.game = new PIXI.Container();
	this.gameMask = new PIXI.Graphics();
	this.gui = new PIXI.Container();

	this.world = null;
	this.entities = [];

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

	this.world = new SmallWorld(350, 25);
	this.game.addChild(this.world);

	var ai;
	var faction;

	ai = new AIController();
	faction = new Faction(new Color(255,0,0), this.game, 0, -300);
	ai.SetFaction(faction);
	faction.on('newEntity', function (entity) {
		this.entities.push(entity);
	}, this);

	this.ais.push(ai);

	ai = new AIController();
	faction = new Faction(new Color(0,2555,0), this.game, -200, 200);
	ai.SetFaction(faction);
	faction.on('newEntity', function (entity) {
		this.entities.push(entity);
	}, this);

	this.ais.push(ai);

	ai = new AIController();
	faction = new Faction(new Color(255,255,0), this.game, 200, 200);
	ai.SetFaction(faction);
	faction.on('newEntity', function (entity) {
		this.entities.push(entity);
	}, this);

	this.ais.push(ai);

	faction = new Faction(new Color(0,0,255), this.game);
	this.player.SetFaction(faction);

	faction.on('newEntity', function (entity) {
		this.entities.push(entity);
	}, this);

	this.CenterCamera();

	this.BeginPlay();
};

Level.prototype.BeginPlay = function () {
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

	console.log(this.entities);
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
};

Level.prototype.Defeat = function () {
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

	this.Draw();
};

Level.prototype.Draw = function() {
	this.renderer.render(this.container);
};