import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

var loaded = false;

// ------------
// = RENDERER =
// ------------

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const backgroundColor = new THREE.Color('rgb(200, 200, 200)');

const scene = new THREE.Scene();
scene.background = backgroundColor;

// -------------
// = RAYCASTER =
// -------------

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// ------------
// = LIGHTING =
// ------------

const light1 = new THREE.DirectionalLight(0xffffff, 3) //3
light1.position.set(5, 50, 20)
light1.castShadow = true;
// light1.shadow.camera.top = .4;
// light1.shadow.camera.bottom = -.4;
// light1.shadow.camera.left = -.4;
// light1.shadow.camera.right = .4;
// light1.shadow.camera.near = 0.1;
// light1.shadow.camera.far = 5;
scene.add(light1)

const light2 = new THREE.HemisphereLight(0x333333, 55)
light2.position.set(5, 50, 20)
scene.add(light2)

// ------------
// = CONTROLS =
// ------------

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader();

// -------------
// = FUNCTIONS =
// -------------

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

	loaded = true;

	let loadingText = document.getElementById('loadingText')
	loadingText.textContent = 'LOADING COMPLETE'

	let loadingMenu = document.getElementById('continue')
	loadingMenu.parentNode.appendChild(loadingMenu);
	loadingMenu.style.display = 'flex'
}

function loadGLTF(fileName, name, result) {
	let parentElem = document.getElementById('loading')
	let loadingElem = document.createElement('h2')
	loadingElem.classList.add('loadingText')
	loadingElem.setAttribute('id', name)
	parentElem.appendChild(loadingElem);

	let stopper = document.getElementById('stopper')
	if (stopper !== null) {
		stopper.remove()
	}

	loader.load('assets/models/'+fileName, (gltf) => {
		scene.add(gltf.scene);

		gltf.scene.traverse( function ( object ) {

			if ( object.isMesh ) {
				object.castShadow = true
				object.recieveShadow = true;
			};

		} );
		
		console.log(typeof(gltf))
		result(gltf);
	},
	// called while loading is progressing
	function ( xhr ) {
		let message = name.charAt(0).toUpperCase() + name.slice(1) + ' ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded'

		document.getElementById(name).textContent = message;

		if ((xhr.loaded / xhr.total) == 1) {
			checkLoaded()
		}
	},
	// called when loading has errors
	function ( error ) {
		console.error( 'An error happened when loading ' + name, error );

	})

}

// ------------
// = PROJECTS =
// ------------

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
];

var amtProjects = projects.length;

// ---------------
// = LOAD ASSETS =
// ---------------

// ASSET VARIABLES
var chair = null;
var desk = null;
var plant = null;
var clock = null;
var paperTray = null;
var paper = null;
var board = null;
var computer = null;
var drawerMain = null;
var drawer = null;
var files = []

loadGLTF('Chair.glb', 'chair', (gltf) => {chair = gltf});
loadGLTF('MainDesk.glb', 'desk', (gltf) => {desk = gltf});
loadGLTF('Plant.glb', 'plant', (gltf) => {plant = gltf});
loadGLTF('Clock.glb', 'clock', (gltf) => {clock = gltf});
loadGLTF('PaperTray.glb', 'paperTray', (gltf) => {paperTray = gltf});
loadGLTF('Paper.glb', 'paper', (gltf) => {paper = gltf});
loadGLTF('NoteBoard.glb', 'board', (gltf) => {board = gltf});
loadGLTF('Computer.glb', 'computer', (gltf) => {computer = gltf});
loadGLTF('/Drawer/CabinetContainer.glb', 'drawerMain', (gltf) => {drawerMain = gltf});
loadGLTF('/Drawer/Drawer.glb', 'drawer', (gltf) => {drawer = gltf});

// WALLS

//floor
var floor = new THREE.Mesh( new THREE.PlaneGeometry( 200, 200 ), new THREE.MeshStandardMaterial( { color: 0xa3a3a3, depthWrite: true } ) );
floor.rotation.x = - Math.PI / 2;
floor.position.set(0, 0.02, 0)
floor.receiveShadow = true;
scene.add( floor );

//wall1
var wall1 = new THREE.Mesh(new THREE.PlaneGeometry( 200, 200 ), new THREE.MeshStandardMaterial( { color: 0xfff8e3, depthWrite: true } ))
wall1.rotation.y = degToRad(90)
wall1.recieveShadow = true;
scene.add(wall1)

//wall2
var wall2 = new THREE.Mesh(new THREE.PlaneGeometry( 200, 200 ), new THREE.MeshStandardMaterial( { color: 0xfff8e3, depthWrite: true } ))
wall2.rotation.z = degToRad(90)
wall2.recieveShadow = true;
scene.add(wall2)

// FILES
let parentElem = document.getElementById('loading')
let loadingElem = document.createElement('h2')
loadingElem.classList.add('loadingText')
loadingElem.setAttribute('id', 'file')
parentElem.appendChild(loadingElem);

loader.load('assets/models/Drawer/Folder.glb', (gltf) => {
		gltf.scene.traverse( function ( object ) {
			if ( object.isMesh ) {
				object.castShadow = true
				object.recieveShadow = true;
			};

		} );

		for (let i = 0; i < amtProjects; i++) {
			let newFolder = gltf.scene.clone(); // clone obj
			newFolder.position.set(0,0, i*-10) //make each folder -10 px away from each other
			files.push(newFolder) // add file to files list
		}
	},
	// called while loading is progressing
	function ( xhr ) {
		let message = 'File ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded'

		document.getElementById('file').textContent = message;

		if ((xhr.loaded / xhr.total) == 1) {
			checkLoaded()
		}
	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened when loading files', error );

	}
)

// ----------
// = CAMERA =
// ----------

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(3.55, 2.507, 3.7488);

const cameraVectorDirection = new THREE.Vector3(0,0,0)

controls.target = cameraVectorDirection;
camera.lookAt(cameraVectorDirection);

globalThis.helper = false;
let helperExist = false;

if (globalThis.helper) {
	const helper = new THREE.CameraHelper( light1.shadow.camera ); // add a helper
	scene.add( helper );

	helperExist = true;
}

controls.update();

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

// ---------------
// = USER EVENTS =
// ---------------

function onPointerMove(event) {
	if (loaded) {
		pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	

		raycaster.setFromCamera(pointer, camera);

		var intersects = raycaster.intersectObject(scene, true);

		if (intersects.length > 0) {
			var objects = new THREE.Group()
			for (let i = 0; i < intersects.length; i++) {
				objects.add(intersects[i].object)
			}
			console.log('intersects ',intersects)
			objects.rotateX(degToRad(90))

			console.log(objects)
			console.log(chair)
			console.log('stff')

			// if (object == chair.scene) {
			// 	console.log('hovering over')
			// 	object.position.set(0,0,10)
			// }
		}
	}
}

// -----------
// = ANIMATE =
// -----------

function animate() {
	raycaster.setFromCamera( pointer, camera );

	requestAnimationFrame(animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render(scene, camera);

	if (!(helperExist) && globalThis.helper) {
		const helper = new THREE.CameraHelper( light1.shadow.camera ); // add a helper
		scene.add( helper );

		helperExist = true;
	} 
}

window.addEventListener( 'pointermove', onPointerMove );

renderer.setAnimationLoop(animate)
animate()


// -------------
// = DEBUGGING =
// -------------

globalThis.THREE = THREE

globalThis.controls = controls
globalThis.renderer = renderer
globalThis.camera = camera

globalThis.light1 = light1
globalThis.light2 = light2

globalThis.desk = desk
globalThis.chair = chair
globalThis.plant = plant
globalThis.clock = clock
globalThis.board = board
globalThis.paperTray = paperTray
globalThis.paper = paper
globalThis.computer = computer
globalThis.drawerMain = drawerMain
globalThis.drawer = drawer
globalThis.files = files

globalThis.floor = floor
globalThis.wall1 = wall1
globalThis.wall2 = wall2
