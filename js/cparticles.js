var DAMPING = 0.99;

function Particle(x, y, z, w, h, d) {
  this.x = this.oldX = x;
  this.y = this.oldY = y;
  this.z = this.oldZ = z;
  var geometri = new THREE.BoxGeometry(w, h, d);
  var materyal = new THREE.MeshPhongMaterial({color: 0x1000000+(Math.random())*0xffffff});
  this.obj = new THREE.Mesh(geometri, materyal);
  this.obj.position.x = x;
  this.obj.position.y = y;
  this.obj.position.z = z;
}

Particle.prototype.integrate = function() {
  var velocityX = (this.x - this.oldX) * DAMPING;
  var velocityY = (this.y - this.oldY) * DAMPING;
  var velocityZ = (this.z - this.oldZ) * DAMPING;
  this.oldX = this.x;
  this.oldY = this.y;
  this.oldZ = this.z;
  this.x += velocityX;
  this.y += velocityY;
  this.z += velocityZ;
  this.obj.position.x = this.x;
  this.obj.position.y = this.y;
  this.obj.position.z = this.z;
};

Particle.prototype.attract = function(x, y) {
  var dx = x - this.x;
  var dy = y - this.y;
  var dz = z - this.z;
  var distance = Math.cbrt(dx * dx + dy * dy + dz * dz);
  this.x += dx / distance;
  this.y += dy / distance;
  this.z += dz / distance;
  this.obj.position.x = this.x;
  this.obj.position.y = this.y;
  this.obj.position.z = this.z;
};

Particle.prototype.rotate = function() {
  this.obj.rotation.x += 0.01;
  this.obj.rotation.y += 0.01;
  this.obj.rotation.z += 0.01;
};

Particle.prototype.move = function() {
  this.container.move(this.x,this.y);
};
