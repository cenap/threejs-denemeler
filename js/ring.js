
var sahne = new THREE.Scene();
var pg = document.getElementById('pg');
var mb = document.getElementById('mb');
var genişlik = window.innerWidth, yükseklik = window.innerHeight;
var en_yakın = 400;
var en_uzak = 1000;
var bakış_açısı = 90;
var aspect_ratio = genişlik / yükseklik;
var hedefx = 0, hedefy = 0;
var teta = 0;
var cube;
var txtgroup, letters = [];
var kamera = new THREE.PerspectiveCamera(bakış_açısı, aspect_ratio, en_yakın, en_uzak);
var renderer = new THREE.WebGLRenderer();
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();
var controls ;

onWindowResize();
initRenderer();
initListeners();
initCamera();
initControls();
initLights();
initPlanes();
initFont();
initObj();


function initControls() {
  controls = new THREE.OrbitControls(kamera, pg);
  controls.target.set(0, 5, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  controls.autoRotate = false;
  controls.update();
}

function initCamera() {
  setCamera();
}

function setCamera(x = 0, y = 200, z = 600, lx = 0, ly = 0, lz = 0) {
  kamera.position.set(x,y,z);
  kamera.lookAt(new THREE.Vector3(lx, ly, lz));
  kamera.updateProjectionMatrix();
}

function initFog() {
  sahne.fog = new THREE.Fog(0xffffff, 20, 100);
  sahne.fog.color.setHSL(0.51, 0.6, 0.6);
}

function initFont(txt="TURNA") {
  txtgroup = new THREE.Object3D();
  fontLoader.load( 'fonts/Titillium_Bold.json', function ( font ) {
    for (var i = 0, len = txt.length; i < len; i++) {
      var m = new THREE.MeshPhongMaterial({color: 0x1000000+(Math.random())*0xffffff,specular: 0xffffff,shininess: 30});
      var textGeom = new THREE.TextGeometry( txt[i], {
        font: font,
        size: 50,
        height: 10,
        curveSegments: 12,
        bevelThickness: 0.5,
        bevelSize: 0.5,
        bevelEnabled: true,
      });
      var letterMesh = new THREE.Mesh( textGeom, m );
      letterMesh.castShadow = true;
      letterMesh.receiveShadow = true;
      letterMesh.position.x = -len * 20 + 50 * i;
      letters.push(letterMesh);
      txtgroup.add(letterMesh);
    }
    txtgroup.position.x = 0;
    txtgroup.position.y = -60;
    txtgroup.position.z = 0;
    sahne.add( txtgroup );
  });
}

function initListeners() {
  window.addEventListener( 'resize', onWindowResize, false );
}

function initRenderer() {
  renderer.setSize(genişlik, yükseklik);
  renderer.setClearColor(0x202025);
  renderer.sortObjects = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  pg.appendChild(renderer.domElement);
}



function initLights() {
  var ambientLight = new THREE.AmbientLight(0x404040); // soft white light
  ambientLight.intensity = 3.0;
  sahne.add(ambientLight);


  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 250, 250);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 4096;
  spotLight.shadow.mapSize.height = 4096;
  spotLight.shadow.camera.near = 0.1;
  spotLight.shadow.camera.far = 500;
  spotLight.shadow.camera.fov = 30;
  spotLight.shadow.camera.near = true;
  spotLight.intensity = 0.2;
  sahne.add(spotLight);
}


function initPlanes() {
  var g = new THREE.PlaneGeometry(genişlik, yükseklik);

  textureLoader.load('img/floor_texture02.jpg', function(texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 8, 4 );
    var m = new THREE.MeshPhongMaterial({map: texture, overdraw: 0.5 });
    //var m = new THREE.MeshPhongMaterial({color: 0xffff00,side: THREE.DoubleSide});
    let zemin = new THREE.Mesh(g, m);
    zemin.castShadow = false;
    zemin.receiveShadow = true;
    zemin.position.y = -100;
    zemin.rotation.x = -1.48;
    sahne.add(zemin);
  });
}

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var render = function() {
  controls.update();
  renderer.render(sahne, kamera);
};

(function animloop() {
  requestAnimFrame(animloop);
  render();
})();

function zoom(zoomin = true) {
  if (zoomin) {
    kamera.zoom += 0.05;
  } else {
    kamera.zoom -= 0.05;
  }
  kamera.updateProjectionMatrix();
}

function onWindowResize() {
    genişlik = pg.clientWidth; //window.innerWidth;
    yükseklik = pg.clientHeight; //window.innerHeight;
		kamera.aspect = genişlik / yükseklik;
		kamera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
}

function display(m) {
  mb.style.zIndex = 10;
  mb.innerHTML = m;
}


function initObj(){
  const gltfLoader = new THREE.GLTFLoader();
  gltfLoader.load('models/ring/scene.gltf', (gltf) => {
    gltf.scene.scale.set(100, 100, 100);
    const ring = gltf.scene;
    ring.position.x = 0;
    ring.position.y = 10;
    ring.position.z = 0;
    sahne.add(ring);
/*
    const box = new THREE.Box3().setFromObject(ring);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    kamera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
*/
  });
}
