function Level(number, player, renderer) {
	var self = this;

	this.player = player;
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
	this.gui = new PIXI.Container();

	this.world = null;

	this.gui.position = new PIXI.Point(0,0);
	this.gui.width = this.renderer.width;
	this.gui.height = this.renderer.height;

	// load.json('levels/level' + number + '.json', function (data) {self.Init(data);});
	this.Init();
};

Level.prototype.Init = function() {
	this.container.addChild(this.game);

	this.world = new SmallWorld(350, 25);
	this.game.addChild(this.world);

	this.player.SetFaction(new Faction());

	this.CenterCamera();
};

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
	this.game.x = (renderer.width - this.game.width) / 2;
	this.game.y = (renderer.height - this.game.height) / 2;

	console.log(renderer.width, renderer.height, this.game.width, this.game.height)
	console.log(this.game.x, this.game.y)
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

Level.prototype.Collides = function(shape1, shape2) {
	function intersectRectangles(rectangle1, rectangle2) {
		var r1 = {
			left : rectangle1.x,
			right : rectangle1.x + rectangle1.width,
			top : rectangle1.y,
			bottom : rectangle1.y + rectangle1.height
		};
		var r2 = {
			left : rectangle2.x,
			right : rectangle2.x + rectangle2.width,
			top : rectangle2.y,
			bottom : rectangle2.y + rectangle2.height
		};

		return !(r2.left > r1.right || 
				r2.right < r1.left || 
				r2.top > r1.bottom ||
				r2.bottom < r1.top);
	}

	function intersectSegmentCircle(a, b, c) {
		var ac = Math.sqrt(Math.pow(a.x - c.x, 2) + Math.pow(a.y - c.y, 2));
		var ab = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

		return c.radius >= Math.sqrt(Math.pow(ac, 2) - Math.pow(ab / 2, 2));
	}

	function intersectRectangleCircle(rectangle, circle) {
		var r = {
			left : rectangle.x,
			right : rectangle.x + rectangle.width,
			top : rectangle.y,
			bottom : rectangle.y + rectangle.height
		};
		

		return (rectangle.contains(circle.x, circle.y) ||
				intersectSegmentCircle(new PIXI.Point(r.left, r.top), new PIXI.Point(r.left, r.bottom), circle) ||
				intersectSegmentCircle(new PIXI.Point(r.left, r.bottom), new PIXI.Point(r.right, r.bottom), circle) ||
				intersectSegmentCircle(new PIXI.Point(r.right, r.bottom), new PIXI.Point(r.right, r.top), circle) ||
				intersectSegmentCircle(new PIXI.Point(r.right, r.top), new PIXI.Point(r.left, r.top), circle));
	}

	if (shape1.type === PIXI.SHAPES.RECT) {
		if (shape2.type === PIXI.SHAPES.RECT) {
			return intersectRectangles(shape1, shape2);
		}
	}
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
	this.world.Tick();
	this.Draw();
};

Level.prototype.Draw = function() {
	this.renderer.render(this.container);
};