function Player() {
	this.Reset();

	this.time = 0;
	this.count = 0;
	this.policies = {
		exploration : 5,
		workload : 5,
		trading : 5,
		birthrate : 5,
		borders : 0,
		relations : 0
	};
}

Player.prototype.Reset = function () {
	this.faction = null;
}

Player.prototype.Save = function (level) {
	this.time += level.timer;
	this.count = level.number;
	this.policies = this.faction.policies;
}

Player.prototype.BeginPlay = function () {
	if (this.faction) {
		this.faction.BeginPlay();
	}
}

Player.prototype.SetFaction = function (faction) {
	this.faction = faction;
	this.faction.policies = this.policies;
}

Player.prototype.Tick = function (length) {
	this.faction.Tick(length);
}