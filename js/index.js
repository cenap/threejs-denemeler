
var sahne = new THREE.Scene();
var pg = document.getElementById('pg');
var genişlik = pg.clientWidth; //window.innerWidth;
var yükseklik = pg.clientHeight; //window.innerHeight;
var en_yakın = 0.1;
var en_uzak = 1000;
var bakış_açısı = 75;
var aspect_ratio = genişlik / yükseklik;
var kamera = new THREE.PerspectiveCamera(bakış_açısı, aspect_ratio, en_yakın, en_uzak);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(genişlik, yükseklik);
//document.body.appendChild(renderer.domElement);

pg.appendChild(renderer.domElement);

var genel_ışık = new THREE.AmbientLight(0x202020); // soft white light
sahne.add(genel_ışık);

var ışık = new THREE.PointLight(0xffffff);
ışık.position.set(-250, 250, 250);
sahne.add(ışık);

var kutu_geometrisi = new THREE.BoxGeometry(2, 2, 2);
var küp_materyali = new THREE.MeshPhongMaterial({
  color: 0x00ff00
});
var küp = new THREE.Mesh(kutu_geometrisi, küp_materyali);
sahne.add(küp);

/*
var küre_geometrisi = new THREE.SphereGeometry(1.3, 32, 16);
var küre_materyali = new THREE.MeshPhongMaterial({
  color: 0xffff00
});
var küre = new THREE.Mesh(küre_geometrisi, küre_materyali);
sahne.add(küre);
*/

kamera.position.z = 5;

var render = function() {
  requestAnimationFrame(render);

  küp.rotation.x += 0.01;
  küp.rotation.y += 0.01;

  renderer.render(sahne, kamera);
};

render();
