import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const backgroundColor = new THREE.Color('rgb(67, 177, 232)');

const scene = new THREE.Scene();
scene.background = backgroundColor;

const light = new THREE.AmbientLight(0x222222, 200)
light.position.set(10, 130, 15)
scene.add(light)

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader();

// Load in desk
loader.load('assets/models/Desk.glb', (gltf) => {
		scene.add(gltf.scene);
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

	console.log(camera.position)

}

renderer.setAnimationLoop(animate)
animate()