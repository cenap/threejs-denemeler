
var sahne = new THREE.Scene();
var particles = [];
var numberOfParticles = 64;
var pg = document.getElementById('pg');
var genişlik = pg.clientWidth; //window.innerWidth;
var yükseklik = pg.clientHeight; //window.innerHeight;
var en_yakın = 0.1;
var en_uzak = 1000;
var bakış_açısı = 90;
var aspect_ratio = genişlik / yükseklik;
var kamera = new THREE.PerspectiveCamera(bakış_açısı, aspect_ratio, en_yakın, en_uzak);
var hedefx = 0, hedefy = 0;
kamera.position.x = 0;
kamera.position.y = 100;
kamera.position.z = 30;

//sahne.fog = new THREE.Fog(0xffffff, 20, 100);
//sahne.fog.color.setHSL( 0.51, 0.6, 0.6 );

pg.addEventListener('mousemove', onMousemove);
pg.addEventListener('click', onClick);
// IE9, Chrome, Safari, Opera
pg.addEventListener("mousewheel", onMouseWheel, false);
// Firefox
//pg.addEventListener("DOMMouseScroll", onMouseWheel, false);
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {// up arrow
      kamera.position.z++;
    }
    else if (e.keyCode == '40') {// down arrow
      kamera.position.z--;
    }
    else if (e.keyCode == '37') {// left arrow
      kamera.position.x--;
    }
    else if (e.keyCode == '39') {// right arrow
      kamera.position.x++;
    }

}


var renderer = new THREE.WebGLRenderer();
renderer.setSize(genişlik, yükseklik);
renderer.setClearColor(0x202025);
renderer.sortObjects = true;

pg.appendChild(renderer.domElement);

var genel_ışık = new THREE.AmbientLight(0x404040); // soft white light
sahne.add(genel_ışık);

var ışık = new THREE.PointLight(0xffffff);
ışık.position.set(-250, 250, 250);
sahne.add(ışık);


function init() {
  var size = 4, row = 0, col = 0, floor=0;
  for (var i = 0; i < numberOfParticles; i++) {
    if (i%size==0) {
      if (i%16==0){
        floor++;
        row = 0;
      } else {
        row++;
      }
      col = 0;
    }
    else {col++;}

    particles[i] = new Particle(col * size * 3, row * size * 3, floor * size * 3, size, size, size);
    sahne.add(particles[i].obj);
  }
}
/*
function init() {
  for (var i = 0; i < numberOfParticles; i++) {
    var size = Math.random() * 10 + 5;
    particles[i] = new Particle(genişlik/2 - Math.random() * genişlik, yükseklik/2 - Math.random() * yükseklik, 0 , size, size, size);
    sahne.add(particles[i].obj);
  }
}
*/
init();

/*
var küre_geometrisi = new THREE.SphereGeometry(1.3, 32, 16);
var küre_materyali = new THREE.MeshPhongMaterial({color: 0xffff00});
var küre = new THREE.Mesh(küre_geometrisi, küre_materyali);
sahne.add(küre);
*/



window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var render = function() {
  for (var i = 0; i < numberOfParticles; i++) {
    particles[i].rotate();
  }
  setCamera();
  renderer.render(sahne, kamera);
};

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
}

function onMouseWheel(e) {
  if (e.deltaY>0) {
    kamera.position.y+=10;
  } else {
    kamera.position.y-=10;
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

function setCamera(x=0,y=0,z=200,lx=0,ly=0,lz=0) {
  //kamera.position.set(x,y,z);
  kamera.up = new THREE.Vector3(0,0,1);
  //kamera.lookAt(new THREE.Vector3(lx,ly,lz));
  kamera.lookAt(new THREE.Vector3(0,1,0));
}
