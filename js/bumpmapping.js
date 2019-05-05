var container = document.getElementById( "container" );
var renderer = new THREE.WebGLRenderer( {antialias: true} );
var camera = new THREE.PerspectiveCamera( 50, 841/594, 0.1, 10000 );
var scene = new THREE.Scene();

scene.add( camera );
renderer.setSize( 841, 594 );
container.appendChild( renderer.domElement );

//////////////////////////////////////////////////////////

/* Textures */
THREE.crossOrigin = "";
var bmap =  THREE.ImageUtils.loadTexture("/img/egyptian_friz_2.png", {}, function(){});
var smap =  THREE.ImageUtils.loadTexture("/img/specular_map.jpg", {}, function(){});


/* Camera Settings */
camera.position.z = 600;
camera.position.x = 15;
camera.position.y = 15;
camera.lookAt(new THREE.Vector3(0,0,0));

/* Lightening */
var light = new THREE.PointLight( new THREE.Color("rgb(255,70,3)"), 2.5);
var light2 = new THREE.PointLight( new THREE.Color("rgb(255,15,255)"), 4);
light.position.set( 0, -100, 1000 );
light2.position.set( 50, 50, 1000 );



/* Old Wall */
var oldMaterial = new THREE.MeshPhongMaterial({
  color      :  new THREE.Color("rgb(155,196,30)"),
  emissive   :  new THREE.Color("rgb(7,3,5)"),
  specular   :  new THREE.Color("rgb(255,113,0)"),
  shininess  :  20,
  bumpMap    :  bmap,
  map        :  smap,
  bumpScale  :  0.45,
});
var oldWall = new THREE.Mesh( new THREE.PlaneGeometry(4000,400,32,8), oldMaterial );


/* Scene */
scene.add( oldWall );
scene.add ( light );
scene.add ( light2 );

/* Updating Scene */
var tmp = 0;
function update() {
  camera.lookAt(new THREE.Vector3(1000*Math.sin(tmp),0,0));
  camera.position.x = 2000*Math.sin(tmp)/1.5;
  light.position.set(1000*Math.sin(tmp), 100*Math.sin(tmp), 500 );
  light2.position.set(1000*Math.sin(tmp), 100*Math.cos(tmp), 500 );
  tmp += 1/400;
}

/* Render */
function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
  update();
}

render()
