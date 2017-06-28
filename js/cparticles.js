var DAMPING = 0.99;

function Particle(geometry,material, x, y, z) {

  this.obj = new THREE.Mesh(geometry, material);
  this.obj.castShadow = true;
  this.obj.receiveShadow = true;
  this.obj.position.x = this.oldX = x;
  this.obj.position.y = this.oldY = y;
  this.obj.position.z = this.oldZ = z;
  this.rot = Math.random() / 50;
  //this.rot = 0.01;
  this.speed = 0.1 + Math.random();
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

Particle.prototype.animate = function(w,h) {
  this.obj.position.x += this.speed;
  if (this.obj.position.x> w) {
    this.obj.position.x = -w;
  }
  //this.obj.position.y += Math.sin(this.speed * this.obj.position.x/20)/10;
  //this.obj.position.z = 200 - 50*Math.cos(this.speed * this.obj.position.x/10);
  this.obj.position.y += sin[Math.floor(this.speed * this.obj.position.x/10)]/3;
  //this.obj.position.z = 200 - 50*cos[this.speed * this.obj.position.x/10];
};
