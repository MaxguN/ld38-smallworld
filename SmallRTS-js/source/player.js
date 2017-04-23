function Player() {
	this.Reset();
}

Player.prototype.Reset = function () {
	this.faction = null;
}

Player.prototype.BeginPlay = function () {
	if (this.faction) {
		this.faction.BeginPlay();
	}
}

Player.prototype.SetFaction = function (faction) {
	this.faction = faction;
}

Player.prototype.Tick = function (length) {
	this.faction.Tick(length);
}