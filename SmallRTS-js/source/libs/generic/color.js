function Color(r, g, b) {
	this.r = Math.min(255, Math.max(0, r));
	this.g = Math.min(255, Math.max(0, g));
	this.b = Math.min(255, Math.max(0, b));
}

Color.prototype.Darker = function () {
	return new Color(this.r - 64, this.g - 64, this.b - 64);
}

Color.prototype.Lighter = function () {
	return new Color(this.r + 64, this.g + 64, this.b + 64);
}

Color.prototype.toHtml = function () {
	var r = this.r.toString(16);
	var g = this.g.toString(16);
	var b = this.b.toString(16);

	return '#' + (r.length < 2 ? '0' : '') + r + (g.length < 2 ? '0' : '') + g + (b.length < 2 ? '0' : '') + b;
}

Color.prototype.toInt = function () {
	return (this.r << 16) | (this.g << 8) | this.b;
}