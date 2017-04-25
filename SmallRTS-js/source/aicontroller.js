function AIController() {
	this.Reset();

	this.profiles = [
		{
			exploration : 7,
			workload : 2,
			birthrate : 8,
			borders : 3,
			relations : 3
		},
		{
			exploration : 2,
			workload : 10,
			birthrate : 5,
			borders : -3,
			relations : -8
		},
		{
			exploration : 8,
			workload : 0,
			birthrate : 8,
			borders : 5,
			relations : -8
		},
		{
			exploration : 10,
			workload : 0,
			birthrate : 8,
			borders : 0,
			relations : 5
		},
		{
			exploration : 5,
			workload : 8,
			birthrate : 10,
			borders : 7,
			relations : 0
		},
		{
			exploration : Math.floor(Math.random() * 11),
			workload : Math.floor(Math.random() * 11),
			birthrate : Math.floor(Math.random() * 11),
			borders : Math.floor(Math.random() * 21) - 10,
			relations : Math.floor(Math.random() * 21) - 10
		}
	]
}

AIController.prototype.Reset = function () {
	this.faction = null;
}

AIController.prototype.BeginPlay = function () {
	if (this.faction) {
		this.faction.policies = this.profiles[Math.floor(Math.random() * this.profiles.length)];
		this.faction.BeginPlay();
	}
}

AIController.prototype.SetFaction = function (faction) {
	this.faction = faction;
}

AIController.prototype.Tick = function (length) {
	if (this.faction) {
		this.faction.Tick(length);
	}
}