
var sahne = new THREE.Scene();
var particles = [];
var numberOfParticles = 300;
var pg = document.getElementById('pg');
var genişlik = pg.clientWidth; //window.innerWidth;
var yükseklik = pg.clientHeight; //window.innerHeight;
var en_yakın = 0.1;
var en_uzak = 1000;
var bakış_açısı = 75;
var aspect_ratio = genişlik / yükseklik;
var kamera = new THREE.PerspectiveCamera(bakış_açısı, aspect_ratio, en_yakın, en_uzak);
var hedefx = 0, hedefy = 0, hedefz = 0, dz=1;
kamera.position.z = 200;

pg.addEventListener('mousemove', onMousemove);
pg.addEventListener('click', onClick);
// IE9, Chrome, Safari, Opera
pg.addEventListener("mousewheel", onMouseWheel, false);
// Firefox
//pg.addEventListener("DOMMouseScroll", onMouseWheel, false);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(genişlik, yükseklik);
//document.body.appendChild(renderer.domElement);

pg.appendChild(renderer.domElement);

var genel_ışık = new THREE.AmbientLight(0x202020); // soft white light
sahne.add(genel_ışık);

var ışık = new THREE.PointLight(0xffffff);
ışık.position.set(-250, 250, 250);
sahne.add(ışık);


function init() {
  for (var i = 0; i < numberOfParticles; i++) {
    var size = Math.random() * 10 + 5;
    particles[i] = new Particle(genişlik/2 - Math.random() * genişlik, yükseklik/2 - Math.random() * yükseklik, 0 , size, size, size);
    sahne.add(particles[i].obj);
  }
}

init();

/*
var küre_geometrisi = new THREE.SphereGeometry(1.3, 32, 16);
var küre_materyali = new THREE.MeshPhongMaterial({color: 0xffff00});
var küre = new THREE.Mesh(küre_geometrisi, küre_materyali);
sahne.add(küre);
*/


var render = function() {

  for (var i = 0; i < numberOfParticles; i++) {
    particles[i].attract(hedefx, hedefy, hedefz);
    particles[i].integrate();
    particles[i].rotate();
  }

  renderer.render(sahne, kamera);
};

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

(function animloop() {
  requestAnimFrame(animloop);
  render();
})();


function onClick(e) {
  explode(10);
}

function onMousemove(e) {
  hedefx = (e.offsetX - genişlik/2) / 2;
  hedefy = (yükseklik/2 - e.offsetY) / 2;
  hedefz += dz;
  if (hedefz > 150 || hedefz < -350) {
    dz = -dz;
  }
}

function onMouseWheel(e) {
  if (e.deltaY>0) {
    kamera.position.z+=20;
  } else {
    kamera.position.z-=20;
  }
}

function explode(damping) {
  var sign1 = 1, sign2 = 1, sign3 = 1;
  for (var i = 0; i < numberOfParticles; i++) {
    sign1 = Math.random() >= 0.5 ? 1:-1;
    sign2 = Math.random() >= 0.5 ? 1:-1;
    sign3 = Math.random() >= 0.5 ? 1:-1;
    particles[i].obj.position.x += Math.random() * sign1 * genişlik / damping;
    particles[i].obj.position.y += Math.random() * sign2 * yükseklik / damping;
    particles[i].obj.position.z += Math.random() * sign3 * 100 / damping;
  }
}
