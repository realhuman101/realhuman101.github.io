import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );

const backgroundColor = new THREE.Color('rgb(67, 177, 232)');

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

function animate() {
	scene.background = backgroundColor;

	requestAnimationFrame(animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render(scene, camera );

}

renderer.setAnimationLoop(animate)