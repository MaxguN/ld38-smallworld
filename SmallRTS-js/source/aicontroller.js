function AIController() {
	this.Reset();
}

AIController.prototype.Reset = function () {
	this.faction = null;
}

AIController.prototype.BeginPlay = function () {
	if (this.faction) {
		this.faction.BeginPlay();
	}
}

AIController.prototype.SetFaction = function (faction) {
	this.faction = faction;
}

AIController.prototype.Tick = function (length) {
	this.faction.Tick(length);
}