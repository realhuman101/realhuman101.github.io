import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const backgroundColor = new THREE.Color('rgb(67, 177, 232)');

const scene = new THREE.Scene();
scene.background = backgroundColor;

const light = new THREE.PointLight(0xffffff, 1000)
light.position.set(10, 130, 15)
scene.add(light)

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );

const mtlloader = new MTLLoader();

// Load desk
mtlloader.load('assets/models/Desk.mtl', 
	(materials) => {
		materials.preload()
		const OBJloader = new OBJLoader();
		OBJloader.setMaterials(materials)

		OBJloader.load('assets/models/Desk.obj', (object) => {
			scene.add(object)
		},
		(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
		},
		(error) => {
			console.log('An error happened', error)
		})
	}
)

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {

	requestAnimationFrame(animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render(scene, camera);

}

renderer.setAnimationLoop(animate)
animate()