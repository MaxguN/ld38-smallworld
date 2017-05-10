function Menu(renderer) {
	this.loaded = false;
	this.listeners = {
		ready : []
	};
	this.next = {
		ready : []
	};

	this.renderer = renderer;
	this.container = new PIXI.Container();

	this.screens = {};

	this.Init();
}

Menu.prototype.Init = function (data) {
	var self = this;

	//main
	var main = {};
	main.screen = new PIXI.Container();
	var title = new PIXI.Text('SmallRTS', {fontFamily : 'Arial', fontSize: 96, fill : 0xEEEEEE});
	var subtitle = new PIXI.Text('A policy-driven RTS', {fontFamily : 'Arial', fontSize: 36, fill : 0xAAAAAA});
	title.anchor = new PIXI.Point(0.5, 0);
	title.position = new PIXI.Point(this.renderer.width / 2, 50);
	subtitle.anchor = new PIXI.Point(0.5, 0);
	subtitle.position = new PIXI.Point(this.renderer.width / 2, 150);
	var button_play = new Button('PLAY', (this.renderer.width + 200) / 2, 289, 300, 64);
	var button_controls = new Button('INSTRUCTIONS', (this.renderer.width + 200) / 2, 363, 300, 64);
	var button_credits = new Button('CREDITS', (this.renderer.width + 200) / 2, 437, 300, 64);
	var button_leaderboard = new Button('LEADERBOARD', (this.renderer.width + 200) / 2, 511, 300, 64);
	var quick_instructions = new PIXI.Text('You\'re the blue faction', {fontFamily : 'Arial', fontSize: 48, fontWeight : 'lighter', fill : 0xAAAAEE, align : 'center', wordWrap : true, wordWrapWidth: 450});
	var quick_instructions2 = new PIXI.Text('Use policies to control your faction', {fontFamily : 'Arial', fontSize: 48, fontWeight : 'lighter', fill : 0xAAAAEE, align : 'center', wordWrap : true, wordWrapWidth: 450});
	quick_instructions.anchor = new PIXI.Point(0.5, 0);
	quick_instructions.position = new PIXI.Point(350, 300);
	quick_instructions2.anchor = new PIXI.Point(0.5, 0);
	quick_instructions2.position = new PIXI.Point(350, 450);
	
	main.screen.addChild(title);
	main.screen.addChild(subtitle);
	main.screen.addChild(quick_instructions);
	main.screen.addChild(quick_instructions2);
	button_play.AddTo(main.screen);
	button_controls.AddTo(main.screen);
	button_credits.AddTo(main.screen);
	button_leaderboard.AddTo(main.screen);

	main.listener = function (event) {
		if (event.button === 0) {
			if (button_play.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo();
				self.Play();
			} else if (button_controls.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo('controls');
			} else if (button_credits.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo('credits');
			} else if (button_leaderboard.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo('leaderboard', function () {
					ajax.getJSON('leaderboard.php?action=list', this.PopulateLeaderboard, this);
				}, self);
			}
		}
	};
	

	// controls
	var controls = {};
	controls.screen = new PIXI.Container();
	var button_back_controls = new Button('BACK TO MENU', 10, 674, 200, 36)
	var button_play_controls = new Button('PLAY', 1120, 674, 150, 36)

	var instructions = new PIXI.Text('There are 4 factions. You, and 3 AIs.', {fontFamily : 'Arial', fontSize: 36, fontWeight : 'lighter', fill : 0xCCCCCC, align : 'center', wordWrap : true, wordWrapWidth: 1200});
	var instructions2 = new PIXI.Text('You play the blue faction', {fontFamily : 'Arial', fontSize: 36, fontWeight : 'lighter', fill : 0xCCCCCC, align : 'center', wordWrap : true, wordWrapWidth: 1200});
	var instructions3 = new PIXI.Text('Use policies to control your faction', {fontFamily : 'Arial', fontSize: 36, fontWeight : 'lighter', fill : 0xCCCCCC, align : 'center', wordWrap : true, wordWrapWidth: 1200});
	var instructions4 = new PIXI.Text('Policies are controled by the 5 gauges at the bottom of the screen', {fontFamily : 'Arial', fontSize: 36, fontWeight : 'lighter', fill : 0xCCCCCC, align : 'center', wordWrap : true, wordWrapWidth: 1200});
	var instructions5 = new PIXI.Text('Take control of all factions to win', {fontFamily : 'Arial', fontSize: 36, fontWeight : 'lighter', fill : 0xCCCCCC, align : 'center', wordWrap : true, wordWrapWidth: 1200});
	instructions.anchor = new PIXI.Point(0.5, 0);
	instructions.position = new PIXI.Point(this.renderer.width / 2, 100);
	instructions2.anchor = new PIXI.Point(0.5, 0);
	instructions2.position = new PIXI.Point(this.renderer.width / 2, 200);
	instructions3.anchor = new PIXI.Point(0.5, 0);
	instructions3.position = new PIXI.Point(this.renderer.width / 2, 300);
	instructions4.anchor = new PIXI.Point(0.5, 0);
	instructions4.position = new PIXI.Point(this.renderer.width / 2, 400);
	instructions5.anchor = new PIXI.Point(0.5, 0);
	instructions5.position = new PIXI.Point(this.renderer.width / 2, 500);

	controls.screen.addChild(instructions);
	controls.screen.addChild(instructions2);
	controls.screen.addChild(instructions3);
	controls.screen.addChild(instructions4);
	controls.screen.addChild(instructions5);
	button_play_controls.AddTo(controls.screen);
	button_back_controls.AddTo(controls.screen);

	controls.listener = function (event) {
		if (event.button === 0) {
			if (button_play_controls.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo();
				self.Play();
			} else if (button_back_controls.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo('main');
			}
		}
	};

	// leaderboard
	var leaderboard = {};
	leaderboard.screen = new PIXI.Container();
	var button_back_leaderboard = new Button('BACK TO MENU', 10, 674, 200, 36)
	var button_play_leaderboard = new Button('PLAY', 1120, 674, 150, 36)
	var title = new PIXI.Text('LEADERBOARD', {fontFamily : 'Arial', fontSize: 84, fontWeight : 'bolder', fill : 0xFFFFFF});
	leaderboard.scores = new PIXI.Container();

	title.anchor = new PIXI.Point(0.5, 0);
	title.position = new PIXI.Point(this.renderer.width / 2, 80);

	leaderboard.screen.addChild(title);
	leaderboard.screen.addChild(leaderboard.scores);
	button_play_leaderboard.AddTo(leaderboard.screen);
	button_back_leaderboard.AddTo(leaderboard.screen);

	leaderboard.listener = function (event) {
		if (event.button === 0) {
			if (button_play_leaderboard.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo();
				self.Play();
			} else if (button_back_leaderboard.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo('main');
			}
		}
	};
	
	// credits
	var credits = {};
	credits.screen = new PIXI.Container();
	var button_back_credits = new Button('BACK TO MENU', 10, 674, 200, 36)
	var button_play_credits = new Button('PLAY', 1120, 674, 150, 36)
	var thanks = new PIXI.Text('Thank you for playing!', {fontFamily : 'Arial', fontSize: 84, fontWeight : 'bolder', fill : 0xFFFFFF});
	var role_maxgun = new PIXI.Text('Programmation - Game Design - AI', {fontFamily : 'Arial', fontSize: 44, fontWeight : 'bolder', fill : 0xAAAAAA});
	var maxgun = new PIXI.Text('MaxguN', {fontFamily : 'Arial', fontSize: 48, fontWeight : 'lighter', fill : 0xEEEEEE});
	thanks.anchor = new PIXI.Point(0.5, 0);
	thanks.position = new PIXI.Point(this.renderer.width / 2,160);
	role_maxgun.anchor = new PIXI.Point(0.5, 0);
	role_maxgun.position = new PIXI.Point(this.renderer.width / 2,380);
	maxgun.anchor = new PIXI.Point(0.5, 0);
	maxgun.position = new PIXI.Point(this.renderer.width / 2, 460);
	
	credits.screen.addChild(thanks);
	credits.screen.addChild(role_maxgun);
	credits.screen.addChild(maxgun);
	button_play_credits.AddTo(credits.screen);
	button_back_credits.AddTo(credits.screen);

	credits.listener = function (event) {
		if (event.button === 0) {
			if (button_play_credits.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo();
				self.Play();
			} else if (button_back_credits.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo('main');
			}
		}
	};

	this.screens.main = main;
	this.screens.controls = controls;
	this.screens.leaderboard = leaderboard;
	this.screens.credits = credits;

	this.SwitchTo('main');

	this.loaded = true;
	this.listeners.ready.forEach(function (listener) {
		listener();
	});
	while (this.next.ready.length > 0) {
		(this.next.ready.shift())();
	}
}

Menu.prototype.on = function(event, callback) {
	if (this.listeners[event]) {
		this.listeners[event].push(callback);
	}

	if (this.loaded) {
		callback();		
	}
};

Menu.prototype.ready = function(callback) {
	if (!this.loaded) {
		this.next.ready.push(callback);
	} else {
		callback();
	}
};

Menu.prototype.SwitchTo = function (screen, callback, object) {
	for (var index in this.screens) {
		this.container.removeChild(this.screens[index].screen);
		mouse.off('click', this.screens[index].listener);
	}

	if (screen) {
		this.container.addChild(this.screens[screen].screen);
		mouse.on('click', this.screens[screen].listener);

		if (callback) {
			callback.call(object);
		}
	}
}

Menu.prototype.Play = function () {
	level = new Level(1, new Player(), renderer);

	currentScene = level;
}

Menu.prototype.EndGame = function (time, worlds) {
	var self = this;

	var score = 0;// f(t, w) = (C / (t / w)) * w^1.1; C = 1 000 000

	if (worlds) {
		score = Math.round((1000000 / (time / worlds)) * Math.pow(worlds, 1.1));
	}

	var result = new PIXI.Text('GAME OVER', {fontFamily : 'Arial', fontSize: 84, fontWeight : 'bolder', fill : 0xFFFFFF});
	var scoreText = new PIXI.Text(this.DisplayScore(score), {fontFamily : 'Arial', fontSize: 64, fontWeight : 'bolder', fill : 0xAAAAAA});
	var nameInput = new PixiTextInput('', {fontFamily : 'Arial', fontSize: 64, fontWeight : 'bolder', fill : 0x000000});

	var endgame = {};
	endgame.screen = new PIXI.Container();

	result.anchor = new PIXI.Point(0.5, 0);
	result.position = new PIXI.Point(this.renderer.width / 2, 80);
	endgame.screen.addChild(result);

	scoreText.anchor = new PIXI.Point(0.5, 0);
	scoreText.position = new PIXI.Point(this.renderer.width / 2, 240);
	endgame.screen.addChild(scoreText);

	nameInput.width = 400;
	nameInput.position = new PIXI.Point(this.renderer.width / 2 - 200, scoreText.y + scoreText.height + 50);
	endgame.screen.addChild(nameInput);

	var button_submit_endgame = new Button('SUBMIT', nameInput.x, nameInput.y + nameInput.height + 50, 190, 50)
	var button_skip_endgame = new Button('SKIP', nameInput.x + nameInput.width - 190 , nameInput.y + nameInput.height + 50, 190, 50)

	endgame.listener = function (event) {
		if (event.button === 0) {
			var callback = function () {
				ajax.getJSON('leaderboard.php?action=list', this.PopulateLeaderboard, this);
			};

			if (button_submit_endgame.collider.contains(mouse.x, mouse.y)) {
				var name = nameInput.text;

				if (name) {
					ajax.get('leaderboard.php?action=save&score=' + score + '&name=' + name, function (response) {
						if (response === 'ok') {
							self.SwitchTo('leaderboard', callback, self);
						}
					});
				}
			
			}
			if (button_skip_endgame.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo('leaderboard', callback, self);
			}
		}
	};

	button_submit_endgame.AddTo(endgame.screen);
	button_skip_endgame.AddTo(endgame.screen);

	this.screens.endgame = endgame;

	this.SwitchTo('endgame');
}

Menu.prototype.PopulateLeaderboard = function (data) {
	var scores = this.screens.leaderboard.scores;

	scores.removeChildren();

	data.forEach(function (entry, index) {
		var name = new PIXI.Text(entry.name, {fontFamily : 'Arial', fontSize: 48, fontWeight : 'bolder', fill : 0xCCCCCC});
		name.anchor = new PIXI.Point(0, 0);
		name.position = new PIXI.Point(this.renderer.width / 4, 240 + index * (name.height + 20));

		var score = new PIXI.Text(this.DisplayScore(entry.score), {fontFamily : 'Arial', fontSize: 48, fontWeight : 'bolder', fill : 0xCCCCCC});
		score.anchor = new PIXI.Point(1, 0);
		score.position = new PIXI.Point(3 * this.renderer.width / 4, 240 + index * (name.height + 20));

		scores.addChild(name);
		scores.addChild(score);
	}, this);
}

Menu.prototype.DisplayScore = function (score) {
	var scoreText = '';
	var temp;

	do {
		temp = '' + (score % 1000);
		score = Math.floor(score / 1000);
		
		while (score && temp.length < 3) {
			temp = '0' + temp;
		}

		scoreText = temp + ' ' + scoreText; 
	} while (score);

	return scoreText;
}

Menu.prototype.Tick = function (length) {
	if (this.loaded) {
 		this.Draw();
	}
}

Menu.prototype.Draw = function () {
	if (this.loaded) {
		this.renderer.render(this.container);
	}
}