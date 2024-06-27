import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const backgroundColor = new THREE.Color('rgb(200, 200, 200)');

const scene = new THREE.Scene();
scene.background = backgroundColor;

const light1 = new THREE.DirectionalLight(0x888888, 12)
light1.position.set(0, 20, 5)
scene.add(light1)

const light2 = new THREE.AmbientLight(0x999999, 3)
light2.position.set(10, 1000, 15)
scene.add(light2)

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader();

function degToRad(degrees) {
	return degrees * (Math.PI / 180)
}

var chair = null;
var desk = null;
var plant = null
var clock = null;
var computer = null;

// Load in desk
loader.load('assets/models/MainDesk.glb', (gltf) => {
	scene.add(gltf.scene);

	desk = gltf;
},
// called while loading is progressing
function ( xhr ) {

	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

	console.log( 'An error happened', error );

}
)

// Load in chair
loader.load('assets/models/Chair.glb', (gltf) => {
		scene.add(gltf.scene);

		chair = gltf;
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened', error );
	}
)

// Load in plant
loader.load('assets/models/Plant.glb', (gltf) => {
	scene.add(gltf.scene);

	plant = gltf;
},
// called while loading is progressing
function ( xhr ) {

	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

	console.log( 'An error happened', error );

}
)

// Load in clock
loader.load('assets/models/Clock.glb', (gltf) => {
	scene.add(gltf.scene);

	clock = gltf;
},
// called while loading is progressing
function ( xhr ) {

	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

	console.log( 'An error happened', error );

}
)

// Load in computer
loader.load('assets/models/Computer.glb', (gltf) => {
	scene.add(gltf.scene);

	computer = gltf;
},
// called while loading is progressing
function ( xhr ) {

	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

	console.log( 'An error happened', error );

}
)

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(3.87, 2.75, 2.80);

const cameraVectorDirection = new THREE.Vector3(0,0,0)

controls.target = cameraVectorDirection;
camera.lookAt(cameraVectorDirection);

controls.update();

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    // render()
}

function animate() {
	requestAnimationFrame(animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render(scene, camera);

	// console.log(laptop.scene.position)
}

renderer.setAnimationLoop(animate)
animate()

globalThis.camera = camera