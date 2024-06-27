import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { all } from 'three/examples/jsm/nodes/Nodes.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const backgroundColor = new THREE.Color('rgb(200, 200, 200)');

const scene = new THREE.Scene();
scene.background = backgroundColor;

const light1 = new THREE.DirectionalLight(0x888888, 12)
light1.position.set(0, 20, 5)
scene.add(light1)

const light2 = new THREE.AmbientLight(0xffffff, 2)
light2.position.set(0, 20, 5)
scene.add(light2)

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader();

function degToRad(degrees) {
	return degrees * (Math.PI / 180)
}

function checkLoaded() {
	let allAssets = document.getElementsByClassName('loadingText')

	for (let i = 0; i < allAssets.length; ++i) {
		let asset = allAssets[i]

		if (!(asset.textContent.includes("100%"))) {
			return
		}
	}

	let loadingMenu = document.getElementById('loading')
	loadingMenu.style.display = 'none'
}

// all projects
var projects = [ // name, github, link, tech, date, desc
	{
		'name' : 'LionelLogin',
		'github' : 'https://github.com/realhuman101/LionelLogin',
		'link' : 'https://github.com/realhuman101/LionelLogin?tab=readme-ov-file#lionellogin',
		'tech' : ['Javascript', 'HTML', 'CSS'],
		'date' : '6/3/2022',
		'desc' : 'A customizable Chrome/Firefox extension allowing users to automatically sign-in to the KGV School website, Lionel2'
	},
	{
		'name' : 'Wordle Clone',
		'github' : 'https://github.com/realhuman101/wordle',
		'link' : 'https://realhuman101.github.io/wordle/',
		'tech' : ['Javascript', 'HTML', 'CSS'],
		'date' : '11/3/2022',
		'desc' : 'A clone of the famous New york Times game Wordle, re-created in pure HTML, CSS and Javascript'
	},
	{
		'name' : 'Flashcard Revision Software',
		'github' : 'https://github.com/realhuman101/FRS',
		'link' : 'https://github.com/realhuman101/FRS?tab=readme-ov-file#frs---flashcard-revision-software-',
		'tech' : ['Javascript', 'HTML', 'CSS', 'Electron.JS'],
		'date' : '28/7/2022',
		'desc' : 'FRS (Flashcard Revision Software) is an application dedicated to assisting students in learning, through the use of electronic flashcards users can create.'
	},
	{
		'name' : "Automated Wildfile Prediction",
		'github' : 'https://github.com/realhuman101/AWP',
		'link': 'https://github.com/realhuman101/AWP?tab=readme-ov-file#awp---automated-wildfire-prediction',
		'tech' : ['Python', 'Tensorflow'],
		'date': '27/11/2022',
		'desc' : "AWP (Automated Wildfire Prediction) is a Python-based project that uses machine learning and Tensorflow to predict and prevent wildfires."
	},
	{
		'name' : "Quantum Minigolf",
		'github' : 'https://github.com/QC2023-Group-3/QuantumMinigolf',
		'link': 'https://github.com/QC2023-Group-3/QuantumMinigolf?tab=readme-ov-file#quantum-minigolf',
		'tech' : ['Python', 'PyGame'],
		'date': '25/11/2023',
		'desc' : "Quantum Minigolf reinvents the traditional game of minigolf by incorporating quantum mechanics principles, featuring a golf ball with quantum behavior distinct from classical physics."
	},
]

// assets
var chair = null;
var desk = null;
var plant = null
var clock = null;
var computer = null;
var walls = null;
var drawerMain = null;
var drawer = null;
var files = [];

// Load in desk
loader.load('assets/models/MainDesk.glb', (gltf) => {
	scene.add(gltf.scene);

	desk = gltf;
},
// called while loading is progressing
function ( xhr ) {
	let message = 'Desk ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded'

	document.getElementById('desk').textContent = message;

	if ((xhr.loaded / xhr.total) == 1) {
		checkLoaded()
	}
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
		let message = 'Chair ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded'

		document.getElementById('chair').textContent = message;

		if ((xhr.loaded / xhr.total) == 1) {
			checkLoaded()
		}
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
	let message = 'Plant ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded'

	document.getElementById('plant').textContent = message;

	if ((xhr.loaded / xhr.total) == 1) {
		checkLoaded()
	}
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
	let message = 'Clock ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded'

	document.getElementById('clock').textContent = message;

	if ((xhr.loaded / xhr.total) == 1) {
		checkLoaded()
	}
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
	let message = 'Computer ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded'

	document.getElementById('computer').textContent = message;

	if ((xhr.loaded / xhr.total) == 1) {
		checkLoaded()
	}
},
// called when loading has errors
function ( error ) {

	console.log( 'An error happened', error );

}
)

// Load in walls
loader.load('assets/models/Walls.glb', (gltf) => {
	scene.add(gltf.scene);
	
	walls = gltf;
},
// called while loading is progressing
function ( xhr ) {
	let message = 'Walls ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded'

	document.getElementById('walls').textContent = message;

	if ((xhr.loaded / xhr.total) == 1) {
		checkLoaded()
	}
},
// called when loading has errors
function ( error ) {

	console.log( 'An error happened', error );

}
)

// Load in drawer container
loader.load('assets/models/Drawer/CabinetContainer.glb', (gltf) => {
	scene.add(gltf.scene);
	
	drawerMain = gltf;
},
// called while loading is progressing
function ( xhr ) {
	let message = 'Drawer Container ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded'

	document.getElementById('drawerMain').textContent = message;

	if ((xhr.loaded / xhr.total) == 1) {
		checkLoaded()
	}
},
// called when loading has errors
function ( error ) {

	console.log( 'An error happened', error );

}
)

// Load in drawer
loader.load('assets/models/Drawer/Drawer.glb', (gltf) => {
	scene.add(gltf.scene);
	
	drawer = gltf;
},
// called while loading is progressing
function ( xhr ) {
	let message = 'Drawer ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded'

	document.getElementById('drawer').textContent = message;

	if ((xhr.loaded / xhr.total) == 1) {
		checkLoaded()
	}
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