function GUI(level) {
	this.level = level;
	this.container = new PIXI.Container();

	this.isDisplayed = false;
	this.isReady = false;

	this.sliders = {
		borders : {},
		relations : {},
		exploration : {},
		birthrate : {},
		workload : {},
		trading : {}
	};
	this.population = {};

	this.timer = {};
	this.score = {};
	this.quit = {};

	this.Init();
}

GUI.prototype.Init = function () {
	this.sliders.borders.container = new PIXI.Container();
	this.sliders.borders.container.position = new PIXI.Point(40, 510);
	this.sliders.borders.slider = new PIXI.Graphics();
	this.sliders.borders.slider.lineStyle(2, 0xaaaaaa, 1);
	// up arrow
	this.sliders.borders.slider.beginFill(0x666666, 1);
	this.sliders.borders.slider.moveTo(0,25);
	this.sliders.borders.slider.lineTo(15,0);
	this.sliders.borders.slider.lineTo(30,25);
	this.sliders.borders.slider.lineTo(0,25);
	this.sliders.borders.slider.endFill();
	// slider arrow
	this.sliders.borders.slider.beginFill(0x666666, 1);
	this.sliders.borders.slider.drawRect(0, 30, 30, 120);
	this.sliders.borders.slider.endFill();
	// down arrow
	this.sliders.borders.slider
	this.sliders.borders.slider.beginFill(0x666666, 1);
	this.sliders.borders.slider.moveTo(0,155);
	this.sliders.borders.slider.lineTo(15,180);
	this.sliders.borders.slider.lineTo(30,155);
	this.sliders.borders.slider.lineTo(0,155);
	this.sliders.borders.slider.endFill();
	this.sliders.borders.value = new PIXI.Graphics();
	this.sliders.borders.title = new PIXI.Text('Borders', {fontFamily : 'Arial', fontSize: 18, fontWeight : 'bold', fill : 0xaaaaaa})
	this.sliders.borders.title.anchor = new PIXI.Point(0.5, 0);
	this.sliders.borders.title.position = new PIXI.Point(15, 185);
	this.sliders.borders.up = new PIXI.Rectangle(this.sliders.borders.container.x,this.sliders.borders.container.y,50,40);
	this.sliders.borders.down = new PIXI.Rectangle(this.sliders.borders.container.x,this.sliders.borders.container.y + 155,50,40);
	this.sliders.borders.container.addChild(this.sliders.borders.slider);
	this.sliders.borders.container.addChild(this.sliders.borders.value);
	this.sliders.borders.container.addChild(this.sliders.borders.title);


	this.sliders.relations.container = new PIXI.Container();
	this.sliders.relations.container.position = new PIXI.Point(140, 510);
	this.sliders.relations.slider = new PIXI.Graphics();
	this.sliders.relations.slider.lineStyle(2, 0xaaaaaa, 1);
	// up arrow
	this.sliders.relations.slider.beginFill(0x666666, 1);
	this.sliders.relations.slider.moveTo(0,25);
	this.sliders.relations.slider.lineTo(15,0);
	this.sliders.relations.slider.lineTo(30,25);
	this.sliders.relations.slider.lineTo(0,25);
	this.sliders.relations.slider.endFill();
	// slider arrow
	this.sliders.relations.slider.beginFill(0x666666, 1);
	this.sliders.relations.slider.drawRect(0, 30, 30, 120);
	this.sliders.relations.slider.endFill();
	// down arrow
	this.sliders.relations.slider
	this.sliders.relations.slider.beginFill(0x666666, 1);
	this.sliders.relations.slider.moveTo(0,155);
	this.sliders.relations.slider.lineTo(15,180);
	this.sliders.relations.slider.lineTo(30,155);
	this.sliders.relations.slider.lineTo(0,155);
	this.sliders.relations.slider.endFill();
	this.sliders.relations.value = new PIXI.Graphics();
	this.sliders.relations.title = new PIXI.Text('Relations', {fontFamily : 'Arial', fontSize: 18, fontWeight : 'bold', fill : 0xaaaaaa})
	this.sliders.relations.title.anchor = new PIXI.Point(0.5, 0);
	this.sliders.relations.title.position = new PIXI.Point(15, 185);
	this.sliders.relations.up = new PIXI.Rectangle(this.sliders.relations.container.x,this.sliders.relations.container.y,30,25);
	this.sliders.relations.down = new PIXI.Rectangle(this.sliders.relations.container.x,this.sliders.relations.container.y + 155,30,25);
	this.sliders.relations.container.addChild(this.sliders.relations.slider);
	this.sliders.relations.container.addChild(this.sliders.relations.value);
	this.sliders.relations.container.addChild(this.sliders.relations.title);


	this.sliders.exploration.container = new PIXI.Container();
	this.sliders.exploration.container.position = new PIXI.Point(1000, 510);
	this.sliders.exploration.slider = new PIXI.Graphics();
	this.sliders.exploration.slider.lineStyle(2, 0xaaaaaa, 1);
	// up arrow
	this.sliders.exploration.slider.beginFill(0x666666, 1);
	this.sliders.exploration.slider.moveTo(0,25);
	this.sliders.exploration.slider.lineTo(15,0);
	this.sliders.exploration.slider.lineTo(30,25);
	this.sliders.exploration.slider.lineTo(0,25);
	this.sliders.exploration.slider.endFill();
	// slider arrow
	this.sliders.exploration.slider.beginFill(0x666666, 1);
	this.sliders.exploration.slider.drawRect(0, 30, 30, 120);
	this.sliders.exploration.slider.endFill();
	// down arrow
	this.sliders.exploration.slider
	this.sliders.exploration.slider.beginFill(0x666666, 1);
	this.sliders.exploration.slider.moveTo(0,155);
	this.sliders.exploration.slider.lineTo(15,180);
	this.sliders.exploration.slider.lineTo(30,155);
	this.sliders.exploration.slider.lineTo(0,155);
	this.sliders.exploration.slider.endFill();
	this.sliders.exploration.value = new PIXI.Graphics();
	this.sliders.exploration.title = new PIXI.Text('Exploration', {fontFamily : 'Arial', fontSize: 18, fontWeight : 'bold', fill : 0xaaaaaa})
	this.sliders.exploration.title.anchor = new PIXI.Point(0.5, 0);
	this.sliders.exploration.title.position = new PIXI.Point(15, 185);
	this.sliders.exploration.up = new PIXI.Rectangle(this.sliders.exploration.container.x,this.sliders.exploration.container.y,30,25);
	this.sliders.exploration.down = new PIXI.Rectangle(this.sliders.exploration.container.x,this.sliders.exploration.container.y + 155,30,25);
	this.sliders.exploration.container.addChild(this.sliders.exploration.slider);
	this.sliders.exploration.container.addChild(this.sliders.exploration.value);
	this.sliders.exploration.container.addChild(this.sliders.exploration.title);


	this.sliders.birthrate.container = new PIXI.Container();
	this.sliders.birthrate.container.position = new PIXI.Point(1100, 510);
	this.sliders.birthrate.slider = new PIXI.Graphics();
	this.sliders.birthrate.slider.lineStyle(2, 0xaaaaaa, 1);
	// up arrow
	this.sliders.birthrate.slider.beginFill(0x666666, 1);
	this.sliders.birthrate.slider.moveTo(0,25);
	this.sliders.birthrate.slider.lineTo(15,0);
	this.sliders.birthrate.slider.lineTo(30,25);
	this.sliders.birthrate.slider.lineTo(0,25);
	this.sliders.birthrate.slider.endFill();
	// slider arrow
	this.sliders.birthrate.slider.beginFill(0x666666, 1);
	this.sliders.birthrate.slider.drawRect(0, 30, 30, 120);
	this.sliders.birthrate.slider.endFill();
	// down arrow
	this.sliders.birthrate.slider
	this.sliders.birthrate.slider.beginFill(0x666666, 1);
	this.sliders.birthrate.slider.moveTo(0,155);
	this.sliders.birthrate.slider.lineTo(15,180);
	this.sliders.birthrate.slider.lineTo(30,155);
	this.sliders.birthrate.slider.lineTo(0,155);
	this.sliders.birthrate.slider.endFill();
	this.sliders.birthrate.value = new PIXI.Graphics();
	this.sliders.birthrate.title = new PIXI.Text('Birth Rate', {fontFamily : 'Arial', fontSize: 18, fontWeight : 'bold', fill : 0xaaaaaa})
	this.sliders.birthrate.title.anchor = new PIXI.Point(0.5, 0);
	this.sliders.birthrate.title.position = new PIXI.Point(15, 185);
	this.sliders.birthrate.up = new PIXI.Rectangle(this.sliders.birthrate.container.x,this.sliders.birthrate.container.y,30,25);
	this.sliders.birthrate.down = new PIXI.Rectangle(this.sliders.birthrate.container.x,this.sliders.birthrate.container.y + 155,30,25);
	this.sliders.birthrate.container.addChild(this.sliders.birthrate.slider);
	this.sliders.birthrate.container.addChild(this.sliders.birthrate.value);
	this.sliders.birthrate.container.addChild(this.sliders.birthrate.title);


	this.sliders.workload.container = new PIXI.Container();
	this.sliders.workload.container.position = new PIXI.Point(1200, 510);
	this.sliders.workload.slider = new PIXI.Graphics();
	this.sliders.workload.slider.lineStyle(2, 0xaaaaaa, 1);
	// up arrow
	this.sliders.workload.slider.beginFill(0x666666, 1);
	this.sliders.workload.slider.moveTo(0,25);
	this.sliders.workload.slider.lineTo(15,0);
	this.sliders.workload.slider.lineTo(30,25);
	this.sliders.workload.slider.lineTo(0,25);
	this.sliders.workload.slider.endFill();
	// slider arrow
	this.sliders.workload.slider.beginFill(0x666666, 1);
	this.sliders.workload.slider.drawRect(0, 30, 30, 120);
	this.sliders.workload.slider.endFill();
	// down arrow
	this.sliders.workload.slider
	this.sliders.workload.slider.beginFill(0x666666, 1);
	this.sliders.workload.slider.moveTo(0,155);
	this.sliders.workload.slider.lineTo(15,180);
	this.sliders.workload.slider.lineTo(30,155);
	this.sliders.workload.slider.lineTo(0,155);
	this.sliders.workload.slider.endFill();
	this.sliders.workload.value = new PIXI.Graphics();
	this.sliders.workload.title = new PIXI.Text('Workload', {fontFamily : 'Arial', fontSize: 18, fontWeight : 'bold', fill : 0xaaaaaa})
	this.sliders.workload.title.anchor = new PIXI.Point(0.5, 0);
	this.sliders.workload.title.position = new PIXI.Point(15, 185);
	this.sliders.workload.up = new PIXI.Rectangle(this.sliders.workload.container.x,this.sliders.workload.container.y,30,25);
	this.sliders.workload.down = new PIXI.Rectangle(this.sliders.workload.container.x,this.sliders.workload.container.y + 155,30,25);
	this.sliders.workload.container.addChild(this.sliders.workload.slider);
	this.sliders.workload.container.addChild(this.sliders.workload.value);
	this.sliders.workload.container.addChild(this.sliders.workload.title);


	this.container.addChild(this.sliders.borders.container);
	this.container.addChild(this.sliders.relations.container);
	this.container.addChild(this.sliders.exploration.container);
	this.container.addChild(this.sliders.birthrate.container);
	this.container.addChild(this.sliders.workload.container);


	this.timer.container = new PIXI.Container();
	this.timer.container.position = new PIXI.Point(10, 10);
	this.timer.play = new PIXI.Graphics();
	this.timer.play.lineStyle(3, 0xaaaaaa, 1);
	this.timer.play.beginFill(0x666666, 1);
	this.timer.play.drawRect(0, 0, 50, 50);
	this.timer.play.endFill();
	this.timer.play.beginFill(0xaaaaaa, 1);
	this.timer.play.moveTo(15, 10);
	this.timer.play.lineTo(36, 25);
	this.timer.play.lineTo(15, 40);
	this.timer.play.lineTo(15, 10);
	this.timer.play.endFill();
	this.timer.pause = new PIXI.Graphics();
	this.timer.pause.lineStyle(3, 0xaaaaaa, 1);
	this.timer.pause.beginFill(0x666666, 1);
	this.timer.pause.drawRect(0, 0, 50, 50);
	this.timer.pause.endFill();
	this.timer.pause.beginFill(0xaaaaaa, 1);
	this.timer.pause.drawRect(10, 10, 11, 30);
	this.timer.pause.drawRect(29, 10, 11, 30);
	this.timer.pause.endFill();
	this.timer.counter = new PIXI.Text('00:00', {fontFamily : 'Arial', fontSize: 52, fontWeight : 'bold', fill : 0xEEEEEE});
	this.timer.counter.anchor = new PIXI.Point(0, 0.5);
	this.timer.counter.position = new PIXI.Point(65, 25);
	this.timer.paused = new PIXI.Text('PAUSED', {fontFamily : 'Arial', fontSize: 32, fontWeight : 'bold', fill : 0xEEEEEE});
	this.timer.paused.position = new PIXI.Point((renderer.width - this.timer.pause.width) / 2, 32);
	this.timer.collider = new PIXI.Rectangle(this.timer.container.position.x, this.timer.container.position.y, 50, 50);
	this.timer.total = new PIXI.Text(this.SecondsToDisplay(this.level.player.time), {fontFamily : 'Arial', fontSize: 20, fontWeight : 'normal', fill : 0xAAAAAA})
	this.timer.total.anchor = new PIXI.Point(0, 1);
	this.timer.total.position = new PIXI.Point(
		this.timer.counter.position.x + this.timer.counter.width + 15, 
		this.timer.counter.position.y - 1);
	this.timer.count = new PIXI.Text('' + this.level.player.count, {fontFamily : 'Arial', fontSize: 20, fontWeight : 'normal', fill : 0xAAAAAA})
	this.timer.count.position = new PIXI.Point(
		this.timer.counter.position.x + this.timer.counter.width + 15,
		this.timer.counter.position.y - 1);

	this.timer.container.addChild(this.timer.pause);
	this.timer.container.addChild(this.timer.counter);
	this.timer.container.addChild(this.timer.total);
	this.timer.container.addChild(this.timer.count);

	this.quit.container = new PIXI.Container();
	this.quit.container.position = new PIXI.Point(renderer.width - 60, 10);
	this.quit.button = new PIXI.Graphics();
	this.quit.button.lineStyle(3, 0xaaaaaa, 1);
	this.quit.button.beginFill(0x666666, 1);
	this.quit.button.drawRect(0, 0, 50, 50);
	this.quit.button.beginFill(0xaaaaaa, 1);
	this.quit.button.moveTo(10, 12);
	this.quit.button.lineTo(12, 10);
	this.quit.button.lineTo(40, 38);
	this.quit.button.lineTo(38, 40);
	this.quit.button.lineTo(10, 12);
	this.quit.button.moveTo(38, 10);
	this.quit.button.lineTo(40, 12);
	this.quit.button.lineTo(12, 40);
	this.quit.button.lineTo(10, 38);
	this.quit.button.lineTo(38, 10);
	this.quit.button.endFill();
	this.quit.container.addChild(this.quit.button);
	this.quit.collider = new PIXI.Rectangle(this.quit.container.position.x, this.quit.container.position.y, 50, 50);

	this.population.container = new PIXI.Container();
	this.population.container.position = new PIXI.Point(-70, 0);

	this.container.addChild(this.timer.container);
	this.container.addChild(this.quit.container);
	this.container.addChild(this.population.container);

	// this.score.counter = new PIXI.Text('0', {fontFamily : 'Arial', fontSize: 24, fontWeight : 'bold', fill : 0xEEEEEE});
	// this.score.counter.position = new PIXI.Point(1128 - this.score.counter.width, 16);
	// this.score.multiplier = new PIXI.Text('', {fontFamily : 'Arial', fontSize: 14, fontWeight : 'bold', fill : 0xEEEEEE});
	// this.score.multiplier.position = new PIXI.Point(1128 - this.score.multiplier.width, 16 + this.score.counter.height + 4);

	// this.buttons.end = new Button('GO', 400, 20, 64, 64);

	// this.container.addChild(this.timer.counter);
	// this.container.addChild(this.score.counter);
	// this.container.addChild(this.score.multiplier);


	this.Update();
	this.level.on('update', this.UpdatePopulations, this);

	this.Display();
}

GUI.prototype.Update = function () {
	var policies = this.level.player.faction.policies;
	var height;

	height = Math.abs(policies.borders) * 6;
	this.sliders.borders.value.clear();
	this.sliders.borders.value.lineStyle(1, 0x00ff00, 1);
	this.sliders.borders.value.beginFill(0x00ff00, 1);
	this.sliders.borders.value.drawRect(0, (policies.borders > 0 ? 90 - height: 90), 30, (height ? height : 1)); // limits : 0, 30-90-150, 30, 0-120
	this.sliders.borders.value.endFill();

	height = Math.abs(policies.relations) * 6;
	this.sliders.relations.value.clear();
	this.sliders.relations.value.lineStyle(1, 0x00ff00, 1);
	this.sliders.relations.value.beginFill(0x00ff00, 1);
	this.sliders.relations.value.drawRect(0, (policies.relations > 0 ? 90 - height: 90), 30, (height ? height : 1)); // limits : 0, 30-90-150, 30, 0-120
	this.sliders.relations.value.endFill();

	height = Math.abs(policies.exploration) * 12;
	this.sliders.exploration.value.clear();
	this.sliders.exploration.value.lineStyle(1, 0x00ff00, 1);
	this.sliders.exploration.value.beginFill(0x00ff00, 1);
	this.sliders.exploration.value.drawRect(0, 150 - height, 30, (height ? height : 1)); // limits : 0, 30-90-150, 30, 0-120
	this.sliders.exploration.value.endFill();

	height = Math.abs(policies.birthrate) * 12;
	this.sliders.birthrate.value.clear();
	this.sliders.birthrate.value.lineStyle(1, 0x00ff00, 1);
	this.sliders.birthrate.value.beginFill(0x00ff00, 1);
	this.sliders.birthrate.value.drawRect(0, 150 - height, 30, (height ? height : 1)); // limits : 0, 30-90-150, 30, 0-120
	this.sliders.birthrate.value.endFill();

	height = Math.abs(policies.workload) * 12;
	this.sliders.workload.value.clear();
	this.sliders.workload.value.lineStyle(1, 0x00ff00, 1);
	this.sliders.workload.value.beginFill(0x00ff00, 1);
	this.sliders.workload.value.drawRect(0, 150 - height, 30, (height ? height : 1)); // limits : 0, 30-90-150, 30, 0-120
	this.sliders.workload.value.endFill();


	// this.score.counter.text = '' + this.level.score;
	// this.score.counter.position = new PIXI.Point(1128 - this.score.counter.width, 16);
	// this.score.multiplier.text = this.level.multiplier > 1 ? 'x' + this.level.multiplier : '';
	// this.score.multiplier.position = new PIXI.Point(1128 - this.score.multiplier.width, 16 + this.score.counter.height);
}

GUI.prototype.UpdatePopulations = function () {
	this.population.container.removeChildren();

	var rightMargin = -5;

	this.level.factions.forEach(function (faction) {
		var factionPop = new PIXI.Container();
		var factionDot = new PIXI.Graphics();
		factionDot.beginFill(faction.color.Darker().toInt(), 1);
		factionDot.drawCircle(0, 0, 10);
		factionDot.endFill();
		var factionCount = new PIXI.Text(faction.entities.length, {fontFamily : 'Arial', fontSize: 32, fontWeight : 'bold', fill : faction.color.Darker().toInt()});
		
		factionDot.position = new PIXI.Point(factionDot.width / 2, factionCount.height / 2);
		factionCount.position = new PIXI.Point(factionDot.width + 5, 0);

		factionPop.addChild(factionDot);
		factionPop.addChild(factionCount);

		rightMargin += 15 + factionPop.width;
		factionPop.position = new PIXI.Point(renderer.width - rightMargin, 8);

		this.population.container.addChild(factionPop);
	}, this);
}

GUI.prototype.Click = function () {
	if (this.timer.collider.contains(mouse.x, mouse.y)) {
		this.TogglePause();
	}

	if (this.quit.collider.contains(mouse.x, mouse.y)) {
		this.level.Defeat();
	}

	// TODO allow policy change on pause ?
	if (!this.level.paused) {
		if (this.sliders.borders.up.contains(mouse.x, mouse.y)) {
			this.level.player.faction.policies.borders += 1;
			this.level.player.faction.policies.borders = Math.max(-10, Math.min(10, this.level.player.faction.policies.borders));
			this.Update();
		}
		if (this.sliders.borders.down.contains(mouse.x, mouse.y)) {
			this.level.player.faction.policies.borders -= 1;
			this.level.player.faction.policies.borders = Math.max(-10, Math.min(10, this.level.player.faction.policies.borders));
			this.Update();
		}

		if (this.sliders.relations.up.contains(mouse.x, mouse.y)) {
			this.level.player.faction.policies.relations += 1;
			this.level.player.faction.policies.relations = Math.max(-10, Math.min(10, this.level.player.faction.policies.relations));
			this.Update();
		}
		if (this.sliders.relations.down.contains(mouse.x, mouse.y)) {
			this.level.player.faction.policies.relations -= 1;
			this.level.player.faction.policies.relations = Math.max(-10, Math.min(10, this.level.player.faction.policies.relations));
			this.Update();
		}

		if (this.sliders.exploration.up.contains(mouse.x, mouse.y)) {
			this.level.player.faction.policies.exploration += 1;
			this.level.player.faction.policies.exploration = Math.max(0, Math.min(10, this.level.player.faction.policies.exploration));
			this.Update();
		}
		if (this.sliders.exploration.down.contains(mouse.x, mouse.y)) {
			this.level.player.faction.policies.exploration -= 1;
			this.level.player.faction.policies.exploration = Math.max(0, Math.min(10, this.level.player.faction.policies.exploration));
			this.Update();
		}

		if (this.sliders.birthrate.up.contains(mouse.x, mouse.y)) {
			this.level.player.faction.policies.birthrate += 1;
			this.level.player.faction.policies.birthrate = Math.max(0, Math.min(10, this.level.player.faction.policies.birthrate));
			this.Update();
		}
		if (this.sliders.birthrate.down.contains(mouse.x, mouse.y)) {
			this.level.player.faction.policies.birthrate -= 1;
			this.level.player.faction.policies.birthrate = Math.max(0, Math.min(10, this.level.player.faction.policies.birthrate));
			this.Update();
		}

		if (this.sliders.workload.up.contains(mouse.x, mouse.y)) {
			this.level.player.faction.policies.workload += 1;
			this.level.player.faction.policies.workload = Math.max(0, Math.min(10, this.level.player.faction.policies.workload));
			this.Update();
		}
		if (this.sliders.workload.down.contains(mouse.x, mouse.y)) {
			this.level.player.faction.policies.workload -= 1;
			this.level.player.faction.policies.workload = Math.max(0, Math.min(10, this.level.player.faction.policies.workload));
			this.Update();
		}
	}
}

GUI.prototype.MouseMove = function () {
	if (!this.level.paused) {
		renderer.view.style.cursor = 'auto';

		if (this.altButtons) {
			if (this.buttons.skull.collider.contains(mouse.x, mouse.y) ||
					this.buttons.rib.collider.contains(mouse.x, mouse.y) ||
					this.buttons.bone.collider.contains(mouse.x, mouse.y) ||
					this.blueprint.build.collider.contains(mouse.x - this.blueprint.background.x, mouse.y - this.blueprint.background.y)) {
				renderer.view.style.cursor = 'pointer';
			}
		} else {
			if (this.buttons.fetcher.collider.contains(mouse.x, mouse.y) ||
					this.buttons.cleaner.collider.contains(mouse.x, mouse.y) ||
					this.buttons.healer.collider.contains(mouse.x, mouse.y) ||
					this.buttons.pot.collider.contains(mouse.x, mouse.y) ||
					this.buttons.skeleton.collider.contains(mouse.x, mouse.y) ||
					this.buttons.monster.collider.contains(mouse.x, mouse.y) ||
					this.buttons.coin.collider.contains(mouse.x, mouse.y) ||
					this.buttons.heart.collider.contains(mouse.x, mouse.y)) {
				renderer.view.style.cursor = 'pointer';
			}
		}

		if ((this.isReady && this.buttons.end.collider.contains(mouse.x, mouse.y)) ||
				this.tools.builder.collider.contains(mouse.x, mouse.y) ||
				this.tools.hoven.collider.contains(mouse.x, mouse.y)) {
			renderer.view.style.cursor = 'pointer';
		}
	}
}

GUI.prototype.KeyPress = function (code) {
	if (!this.level.paused) {
		
	}
}

GUI.prototype.TogglePause = function () {
	this.level.TogglePause();

	if (this.level.paused) {
		this.Pause();
	} else {
		this.Play();
	}
}

GUI.prototype.Pause = function () {
	// this.timer.container.removeChild(this.timer.counter);
	this.timer.container.removeChild(this.timer.pause);
	this.timer.container.addChild(this.timer.play);
}

GUI.prototype.Play = function () {
	this.timer.container.removeChild(this.timer.play);
	this.timer.container.addChild(this.timer.pause);
}

GUI.prototype.Lock = function () {
	key.off('press', this.KeyPress);
	mouse.off('click', this.Click);
	// mouse.off('mousemove', this.MouseMove);
}

GUI.prototype.Unlock = function () {
	key.on('press', this.KeyPress, this);
	mouse.on('click', this.Click, this);
	// mouse.on('mousemove', this.MouseMove, this);
}

GUI.prototype.Hide = function () {
	this.Lock();
	this.level.gui.removeChild(this.container);
	this.isDisplayed = false;
}

GUI.prototype.Display = function () {
	this.level.gui.addChild(this.container);
	this.Unlock();
	this.isDisplayed = true;
}

GUI.prototype.SecondsToDisplay = function (seconds) {
	var minutes = Math.floor(seconds / 60);
	seconds = Math.ceil(seconds % 60);

	return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

GUI.prototype.Tick = function (length) {
	this.timer.counter.text = this.SecondsToDisplay(this.level.timer);
}
