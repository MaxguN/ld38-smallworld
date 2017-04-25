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
	var button_play = new Button('PLAY', (this.renderer.width + 200) / 2, 300, 300, 64);
	var button_controls = new Button('INSTRUCTIONS', (this.renderer.width + 200) / 2, 400, 300, 64);
	var button_credits = new Button('CREDITS', (this.renderer.width + 200) / 2, 500, 300, 64);
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

	main.listener = function (event) {
		if (event.button === 0) {
			if (button_play.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo();
				self.Play();
			} else if (button_controls.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo('controls');
			} else if (button_credits.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo('credits');
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

Menu.prototype.SwitchTo = function (screen) {
	for (var index in this.screens) {
		this.container.removeChild(this.screens[index].screen);
		mouse.off('click', this.screens[index].listener);
	}

	if (screen) {
		this.container.addChild(this.screens[screen].screen);
		mouse.on('click', this.screens[screen].listener);
	}
}

Menu.prototype.Play = function () {
	level = new Level(0, new Player(), renderer);

	currentScene = level;
}

Menu.prototype.EndGame = function (win, time) {
	var self = this;
	var result;
	var timeText;

	if (win) {
		result = new PIXI.Text('YOU WIN', {fontFamily : 'Arial', fontSize: 84, fontWeight : 'bolder', fill : 0xFFFFFF});
		timeText = new PIXI.Text(time, {fontFamily : 'Arial', fontSize: 64, fontWeight : 'bolder', fill : 0xAAAAAA});
	} else {
		result = new PIXI.Text('YOU LOSE', {fontFamily : 'Arial', fontSize: 84, fontWeight : 'bolder', fill : 0xFFFFFF});
	}

	var endgame = {};
	endgame.screen = new PIXI.Container();
	var button_next_endgame = new Button('NEXT', 1120, 674, 150, 36)

	endgame.listener = function (event) {
		if (event.button === 0) {
			if (button_next_endgame.collider.contains(mouse.x, mouse.y)) {
				self.SwitchTo('credits');
			}
		}
	};

	result.anchor = new PIXI.Point(0.5, 0);
	result.position = new PIXI.Point(this.renderer.width / 2,160);
	endgame.screen.addChild(result);

	if (timeText) {
		timeText.anchor = new PIXI.Point(0.5, 0);
		timeText.position = new PIXI.Point(this.renderer.width / 2,400);
		endgame.screen.addChild(timeText);
	}
	button_next_endgame.AddTo(endgame.screen);

	this.screens.endgame = endgame;

	this.SwitchTo('endgame');
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