function Player() {
	this.Reset();
}

Player.prototype.Reset = function () {
	this.faction = null;
}

Player.prototype.SetFaction = function (faction) {
	this.faction = faction;
}