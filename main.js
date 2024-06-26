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
light1.position.set(10, 1000, 15)
scene.add(light1)

const light2 = new THREE.AmbientLight(0x999999, 1)
light2.position.set(10, 1000, 15)
scene.add(light2)

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader();

function degToRad(degrees) {
	return degrees * (Math.PI / 180)
}

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
	gltf.scene.rotateZ(degToRad(-90))

	gltf.scene.position.set(-16,9.5,-30)
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

	gltf.scene.position.set(0,9.5,-20)
	scene.add(gltf.scene);

	globalThis.laptop = gltf;
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
	gltf.scene.rotateZ(degToRad(180))

	gltf.scene.position.set(10, 9.5, -65)
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
camera.position.set(10, 40, 10); //{ x: 13.54063716107861, y: 32.331714351441335, z: 8.103838827399384 }

const cameraVectorDirection = new THREE.Vector3(10,9.5,-20)

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