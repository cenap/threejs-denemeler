
var sahne = new THREE.Scene();
var particles = [];
var numberOfParticles = 100;
var pg = document.getElementById('pg');
var mb = document.getElementById('mb');
var genişlik = window.innerWidth, yükseklik = window.innerHeight;
var en_yakın = 400;
var en_uzak = 1000;
var bakış_açısı = 90;
var aspect_ratio = genişlik / yükseklik;
var hedefx = 0, hedefy = 0;
var teta = 0;
var p1,p2;
var cube;
var txtgroup, letters = [];
var kamera = new THREE.PerspectiveCamera(bakış_açısı, aspect_ratio, en_yakın, en_uzak);
//var kamera = new THREE.OrthographicCamera(genişlik / -2, genişlik / 2, yükseklik / 2, yükseklik / -2, en_yakın, en_uzak);
var renderer = new THREE.WebGLRenderer();
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();

onWindowResize();
initRenderer();
initListeners();
initCamera();
initLights();
initContainer();
initPlanes();
initFont();
initCube();
initStarfield();


function initCamera() {
  kamera.position.x = 0;
  kamera.position.y = 0;
  kamera.position.z = 800;
  kamera.zoom = 3.0;
  kamera.updateProjectionMatrix();
}

function initFog() {
  sahne.fog = new THREE.Fog(0xffffff, 20, 100);
  sahne.fog.color.setHSL(0.51, 0.6, 0.6);
}

function initFont(txt="TURNA TEKNOLOJİ") {
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
    sahne.add( txtgroup );
  });
}

function initListeners() {
  window.addEventListener( 'resize', onWindowResize, false );
  /*
  pg.addEventListener('mousemove', onMousemove);
  pg.addEventListener('click', onClick);
  pg.addEventListener("mousewheel", onMouseWheel, false);  // IE9, Chrome, Safari, Opera
  pg.addEventListener("DOMMouseScroll", onMouseWheel, false); // Firefox

  document.onkeydown = function(e) {

    e = e || window.event;

    if (e.keyCode == '38') { // up arrow
      p2.position.y += 10;
    } else if (e.keyCode == '40') { // down arrow
      p2.position.y -= 10;
    } else if (e.keyCode == '37') { // left arrow
      p2.rotation.x -= 0.01;
    } else if (e.keyCode == '39') { // right arrow
      p2.rotation.x += 0.01;
    }
    kamera.updateProjectionMatrix();

    if (p2) {
      var s = "p2.rotation.x: " + p2.rotation.x + "<br>";
      s += "p2.position.y: " + p2.position.y + "<br>";
      display(s);
    }
  }


  function onClick(e) {
    explode(10);
  }

  function onMousemove(e) {
    hedefx = (e.offsetX - genişlik / 2) / 2;
    hedefy = (yükseklik / 2 - e.offsetY) / 2;
  }

  function onMouseWheel(e) {
    if (e.deltaY > 0) {
      zoom(false);
      //kamera.position.y += 10;
    } else {
      zoom(true);
      //kamera.position.y -= 10;
    }
  }
  */
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



function initAsCube() {
  var size = 4,
    row = 0,
    col = 0,
    floor = 0;
  for (var i = 0; i < numberOfParticles; i++) {
    if (i % size == 0) {
      if (i % 16 == 0) {
        floor++;
        row = 0;
      } else {
        row++;
      }
      col = 0;
    } else {
      col++;
    }

    particles[i] = new Particle(col * size * 3, row * size * 3, floor * size * 3, size, size, size);
    sahne.add(particles[i].obj);
  }
}

function initCube() {
  var texture, material;
  textureLoader.load('img/turnatexture.jpg', function(texture) {
    var material = new THREE.MeshPhongMaterial({color: 0x996633, map: texture,overdraw: 0.5,specular: 0xffccaa,shininess: 15});
    var f1 = [new THREE.Vector2(0, .666), new THREE.Vector2(.5, .666), new THREE.Vector2(.5, 1), new THREE.Vector2(0, 1)];
    var f2 = [new THREE.Vector2(.5, .666), new THREE.Vector2(1, .666), new THREE.Vector2(1, 1), new THREE.Vector2(.5, 1)];
    var f3 = [new THREE.Vector2(0, .333), new THREE.Vector2(.5, .333), new THREE.Vector2(.5, .666), new THREE.Vector2(0, .666)];
    var f4 = [new THREE.Vector2(.5, .333), new THREE.Vector2(1, .333), new THREE.Vector2(1, .666), new THREE.Vector2(.5, .666)];
    var f5 = [new THREE.Vector2(0, 0), new THREE.Vector2(.5, 0), new THREE.Vector2(.5, .333), new THREE.Vector2(0, .333)];
    var f6 = [new THREE.Vector2(.5, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, .333), new THREE.Vector2(.5, .333)];

    var size = 50;
    var geometry = new THREE.BoxGeometry(size, size, size);
    geometry.faceVertexUvs[0] = [];
    geometry.faceVertexUvs[0][0] = [f1[0], f1[1], f1[3]];
    geometry.faceVertexUvs[0][1] = [f1[1], f1[2], f1[3]];

    geometry.faceVertexUvs[0][2] = [f2[0], f2[1], f2[3]];
    geometry.faceVertexUvs[0][3] = [f2[1], f2[2], f2[3]];

    geometry.faceVertexUvs[0][4] = [f3[0], f3[1], f3[3]];
    geometry.faceVertexUvs[0][5] = [f3[1], f3[2], f3[3]];

    geometry.faceVertexUvs[0][6] = [f4[0], f4[1], f4[3]];
    geometry.faceVertexUvs[0][7] = [f4[1], f4[2], f4[3]];

    geometry.faceVertexUvs[0][8] = [f5[0], f5[1], f5[3]];
    geometry.faceVertexUvs[0][9] = [f5[1], f5[2], f5[3]];

    geometry.faceVertexUvs[0][10] = [f6[0], f6[1], f6[3]];
    geometry.faceVertexUvs[0][11] = [f6[1], f6[2], f6[3]];

    cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.y = 150;
    sahne.add(cube);
  });
}

function initStarfield() {
  for (var i = 0; i < numberOfParticles; i++) {
    var material = new THREE.MeshPhongMaterial({color: 0x1000000+(Math.random())*0xffffff, specular: 0xffccaa, shininess: 15});
    var size = 1 + Math.random()*20;
    var geometry = new THREE.SphereGeometry(size, 14, 14);
    particles[i] = new Particle(geometry, material,
                                genişlik / 2 - Math.random() * genişlik,
                                200 - Math.random() * 100,
                                Math.random() * 400 - 100);
    sahne.add(particles[i].obj);
  }
}


function initContainer() {
  const box_geometry = new THREE.BoxGeometry(genişlik, yükseklik, 100);
  var geometri = new THREE.EdgesGeometry(box_geometry);
  var materyal = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 2,
    linecap: 'round',
    linejoin: 'round'
  });
  var container = new THREE.LineSegments(geometri, materyal);
  sahne.add(container);
}

function initPlanes() {
  var g = new THREE.PlaneGeometry(genişlik, yükseklik);

  textureLoader.load('img/turnateknoloji.png', function(texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 8, 8 );
    var m = new THREE.MeshPhongMaterial({map: texture, overdraw: 0.5 });
    //var m = new THREE.MeshPhongMaterial({color: 0xffff00,side: THREE.DoubleSide});
    p1 = new THREE.Mesh(g, m);
    p1.castShadow = false;
    p1.receiveShadow = true;
    p1.position.z = -80;
    sahne.add(p1);
  });

  textureLoader.load('img/floor_texture02.jpg', function(texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 8, 4 );
    var m = new THREE.MeshPhongMaterial({map: texture, overdraw: 0.5 });
    //var m = new THREE.MeshPhongMaterial({color: 0xffff00,side: THREE.DoubleSide});
    p2 = new THREE.Mesh(g, m);
    p2.castShadow = false;
    p2.receiveShadow = true;
    p2.position.y = -100;
    p2.rotation.x = -1.48;
    sahne.add(p2);
  });


}



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
    if (particles[i]) {
      particles[i].rotate();
      particles[i].animate(genişlik/2, yükseklik);
    }
  }
  if (cube) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
  }

  animateLetters()

  setCamera();
  renderer.render(sahne, kamera);
};

(function animloop() {
  requestAnimFrame(animloop);
  render();
})();

function animateLetters() {
  if (teta++>360) {teta = 0;}
  for (var i = 0; i < letters.length; i++) {
    letters[i].position.y = 40 * Math.sin((teta + i * 30) * (Math.PI / 180));
    letters[i].position.z = Math.sin((teta + i * 10) * (Math.PI / 180));
    letters[i].rotation.x = letters[i].position.z / 5 ;
  }
}

function zoom(zoomin = true) {
  if (zoomin) {
    kamera.zoom += 0.05;
  } else {
    kamera.zoom -= 0.05;
  }
  kamera.updateProjectionMatrix();
}

function explode(damping) {
  for (var i = 0; i < numberOfParticles; i++) {
    particles[i].obj.position.x += (Math.random() * genişlik - genişlik / 2) / damping;
    particles[i].obj.position.y += (Math.random() * yükseklik - yükseklik / 2) / damping;
    particles[i].obj.position.z += (Math.random() * 100 - 50) / damping;
  }
}

function setCamera(x = 0, y = 0, z = 800, lx = 0, ly = 1, lz = 0) {
  kamera.position.set(x,y,z);
  kamera.up = new THREE.Vector3(0, 0, 1);
  kamera.lookAt(new THREE.Vector3(lx, ly, lz));
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
