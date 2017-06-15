
var sahne = new THREE.Scene();
var particles = [];
var numberOfParticles = 15;
var pg = document.getElementById('pg');
var genişlik = pg.clientWidth; //window.innerWidth;
var yükseklik = pg.clientHeight; //window.innerHeight;
var en_yakın = 0.1;
var en_uzak = 1000;
var bakış_açısı = 75;
var aspect_ratio = genişlik / yükseklik;
var kamera = new THREE.PerspectiveCamera(bakış_açısı, aspect_ratio, en_yakın, en_uzak);
kamera.position.z = 200;

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
    particles[i] = new Particle(genişlik/20 - Math.random() * genişlik/10, yükseklik/20 - Math.random() * yükseklik/10, 0 , size, size, size);
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
