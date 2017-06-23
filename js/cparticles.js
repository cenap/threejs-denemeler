var DAMPING = 0.99;

function Particle(x, y, z, w, h, d) {
  var geometri = new THREE.BoxGeometry(w, h, d);
  var materyal = new THREE.MeshPhongMaterial({color: 0x1000000+(Math.random())*0xffffff});
  this.obj = new THREE.Mesh(geometri, materyal);
  this.obj.position.x = this.oldX = x;
  this.obj.position.y = this.oldY = y;
  this.obj.position.z = this.oldZ = z;
  this.rot = Math.random() / 50;
  //this.rot = 0.01;
  this.speed = 0.2 + Math.random();
}

Particle.prototype.integrate = function() {
  var velocityX = (this.obj.position.x - this.oldX) * DAMPING * this.speed;
  var velocityY = (this.obj.position.y - this.oldY) * DAMPING * this.speed;
  var velocityZ = (this.obj.position.z - this.oldZ) * DAMPING * this.speed;
    this.oldX = this.obj.position.x;
    this.oldY = this.obj.position.y;
    this.oldZ = this.obj.position.z;
    this.obj.position.x += velocityX;
    this.obj.position.y += velocityY;
    this.obj.position.z += velocityZ;
};

Particle.prototype.attract = function(x, y, z) {
  var dx = x - this.obj.position.x;
  var dy = y - this.obj.position.y;
  var dz = z - this.obj.position.z;
  //var distance = Math.sqrt(dx * dx + dy * dy);
  var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    this.obj.position.x += dx / distance;
    this.obj.position.y += dy / distance;
    this.obj.position.z += dz / distance;
  }
  //console.log(x , this.obj.position.x, Math.abs(dx));
};

Particle.prototype.rotate = function() {
  this.obj.rotation.x += this.rot;
  this.obj.rotation.y += this.rot;
  this.obj.rotation.z += this.rot;
};

Particle.prototype.move = function(x,y,z) {
  this.obj.position.x = x;
  this.obj.position.y = y;
  this.obj.position.z = z;
};

Particle.prototype.animate = function() {
  this.obj.position.x += this.speed;
  if (this.obj.position.x>300) {
    this.obj.position.x = -300;
  }
  //this.obj.position.y += this.speed;
  //this.obj.position.z += this.speed;
};
