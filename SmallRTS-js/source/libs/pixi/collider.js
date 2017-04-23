function Collider(tag, whitelist, shape) {
	this.colliderTag = tag;
	this.colliderWhitelist = whitelist;
	this.colliderShape = shape;
}

function Trigger(tag, whitelist, shape) {
	this.tag = tag;
	this.whitelist = whitelist;
	this.shape = shape;
}

var Tags = {
	Entity : 'entity',
	Zone : 'zone'
}