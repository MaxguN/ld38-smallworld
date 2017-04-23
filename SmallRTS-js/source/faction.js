function Faction(color) {
	this.territory = null;
	this.entities = [];

	this.color = color;

	this.Init();
}

Faction.prototype.Init = function () {
	this.territory = new Territory(this.color);

	this.entities.push(new Entity(this));
	this.entities.push(new Entity(this));
}
