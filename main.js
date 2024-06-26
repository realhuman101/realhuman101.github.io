import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { rotate } from 'three/examples/jsm/nodes/Nodes.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const backgroundColor = new THREE.Color('rgb(67, 177, 232)');

const scene = new THREE.Scene();
scene.background = backgroundColor;

const light = new THREE.AmbientLight(0x888888, 12)
light.position.set(10, 1000, 15)
scene.add(light)

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader();

function degToRad(degrees) {
	return degrees * (Math.PI / 180)
}

var desk = null;
var desk = null;
var cup = null;
var laptop = null
var nameplate = null;

// Load in desk
loader.load('assets/models/Desk.glb', (gltf) => {
		gltf.scene.rotateX(degToRad(270))
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

// Load in cup
loader.load('assets/models/Cup.glb', (gltf) => {
	gltf.scene.rotateX(degToRad(270))
	scene.add(gltf.scene);

	cup = gltf;
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

// Load in laptop
loader.load('assets/models/Laptop.glb', (gltf) => {
	gltf.scene.rotateX(degToRad(270))
	scene.add(gltf.scene);

	laptop = gltf;
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

// Load in nameplate
loader.load('assets/models/Nameplate.glb', (gltf) => {
	gltf.scene.rotateX(degToRad(270))
	scene.add(gltf.scene);

	nameplate = gltf;
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
camera.position.set(-0.03, 0.859, 1.59);
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
}

renderer.setAnimationLoop(animate)
animate()