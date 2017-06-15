var DAMPING = 0.99;
var draw = SVG('drawing');

function Particle(x, y, w, h) {
  this.x = this.oldX = x;
  this.y = this.oldY = y;
  this.r = this.rx = 6;
  this.width=w;
  this.height=h;
  this.container = draw.nested();
  this.container.move(x,y);
  this.shape = this.container.rect(w, h);
  this.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  this.shape.attr({ fill: this.color });
}

Particle.prototype.integrate = function() {
  var velocityX = (this.x - this.oldX) * DAMPING;
  var velocityY = (this.y - this.oldY) * DAMPING;
  this.oldX = this.x;
  this.oldY = this.y;
  this.x += velocityX;
  this.y += velocityY;
};

Particle.prototype.attract = function(x, y) {
  var dx = x - this.x;
  var dy = y - this.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  this.x += dx / distance;
  this.y += dy / distance;
};

Particle.prototype.rotate = function() {
  this.r += this.rx;
  this.shape.rotate(this.r);
};

Particle.prototype.move = function() {
  this.container.move(this.x,this.y);
};
