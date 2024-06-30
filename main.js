import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --------------------
// = DEFINE VARIABLES =
// --------------------

var loaded = false;
var focus = true;

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

// Fog
scene.fog = new THREE.Fog( 'rgb(200, 200, 200)', 10, 100 );

// -------------
// = RAYCASTER =
// -------------

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// ------------
// = LIGHTING =
// ------------

const shadowSize = 80

const light1 = new THREE.DirectionalLight(0xffffff, 3) //3
light1.position.set(5, 50, 20)
light1.castShadow = true;
light1.shadow.mapSize.width = 25000
light1.shadow.mapSize.height = 25000
light1.shadow.camera.top = shadowSize;
light1.shadow.camera.bottom = -shadowSize;
light1.shadow.camera.left = -shadowSize;
light1.shadow.camera.right = shadowSize;
light1.shadow.camera.near = 0.1;
light1.shadow.camera.far = 100;
scene.add(light1)

const light2 = new THREE.HemisphereLight(0x333333, 55)
light2.position.set(5, 50, 20)
scene.add(light2)

// ------------
// = CONTROLS =
// ------------

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );

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

	let loadingText = document.getElementById('loadingText')
	loadingText.textContent = 'LOADING COMPLETE'

	let loadingMenu = document.getElementById('continue')
	loadingMenu.parentNode.appendChild(loadingMenu);
	loadingMenu.style.display = 'flex'
}

function loadGLTF(fileName, name) {
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
		
		assets[name] = gltf;
		assetUUID[gltf.scene.uuid] = name
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
var assets = {}
var assetUUID = {}

loadGLTF('Chair.glb', 'chair');
loadGLTF('MainDesk.glb', 'desk');
loadGLTF('Plant.glb', 'plant');
loadGLTF('Clock.glb', 'clock');
loadGLTF('PaperTray.glb', 'paperTray');
loadGLTF('Paper.glb', 'paper');
loadGLTF('NoteBoard.glb', 'board');
loadGLTF('Computer.glb', 'computer');
loadGLTF('/Drawer/CabinetContainer.glb', 'drawerMain');
loadGLTF('/Drawer/Drawer.glb', 'drawer');

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
		assets['files'] = []

		gltf.scene.traverse( function ( object ) {
			if ( object.isMesh ) {
				object.castShadow = true
				object.recieveShadow = true;
			};

		} );

		for (let i = 0; i < amtProjects; i++) {
			let newFolder = gltf.scene.clone(); // clone obj
			newFolder.position.set(0,0, i*-10) //make each folder -10 px away from each other
			assets['files'].push(newFolder) // add file to files list
			assetUUID[newFolder['uuid']] = 'files'+i
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

var ogObj = undefined;

function onPointerMove(event) {
	if (loaded && focus) {
		pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	

		raycaster.setFromCamera(pointer, camera);

		var intersects = raycaster.intersectObject(scene, true);

		if (intersects.length > 0) {
			var obj = undefined;
			try {
				var object = intersects[0].object
				var objectUUID = object.parent.parent.uuid
				var mainObj = assetUUID[objectUUID]

				if (mainObj === undefined) {
					objectUUID = object.parent.uuid
					mainObj = assetUUID[objectUUID]
				}
				
				obj = assets[mainObj]
			} catch (error) {
				if (error == TypeError) {
					obj = undefined;
				}
			}

			if (ogObj !== undefined) {
				if (obj != ogObj) {
					document.body.style.cursor = 'auto';
					new TWEEN.Tween(ogObj.scene.position).to({x: 0, y: 0, z: 0}, 500).start()
				}
			}

			ogObj = obj;

			console.log(assetUUID[objectUUID])

			if (obj !== undefined) {
				switch (mainObj) {
					case 'drawer':
						document.body.style.cursor = 'pointer';
						new TWEEN.Tween(obj.scene.position).to({z: .5}, 500).start()
						break;
					case 'board':
						document.body.style.cursor = 'pointer';
						new TWEEN.Tween(obj.scene.position).to({y: .1}, 100).start();
				}
			}
		}
	}
}

// FOCUS WINDOW EVENTS

// Out of focus
document.addEventListener('blur', (event) => {
	let focusItem = document.getElementById('noFocus');
	focusItem.style.display = 'flex';
	focus = false;
}, false)

// In focus
document.addEventListener('focus', (event) => {
	let focusItem = document.getElementById('noFocus');
	focusItem.style.display = 'none';
	focus = true;
}, false)

// DONE LOADING
document.addEventListener('loadingDone', (e) => {
	loaded = true;
})


// CLICK ON OBJECT

document.addEventListener('mousedown', (event) => {
	if (loaded && focus) {
		pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	

		raycaster.setFromCamera(pointer, camera);

		var intersects = raycaster.intersectObject(scene, true);

		if (intersects.length > 0) {
			var obj = undefined;
			try {
				var object = intersects[0].object
				var objectUUID = object.parent.parent.uuid
				var mainObj = assetUUID[objectUUID]

				if (mainObj === undefined) {
					objectUUID = object.parent.uuid
					mainObj = assetUUID[objectUUID]
				}
				
				obj = assets[mainObj]
			} catch (error) {
				if (error == TypeError) {
					obj = undefined;
				}
			}

			let moveToObj = (x,y,z) => {
				// Rotate camera towards object
				// console.log(mainObj, obj, assets.drawer)
				const startRot = new THREE.Euler().copy(camera.rotation);
				// camera.lookAt(obj.scene.position);
				const endRot = new THREE.Euler().copy(obj.scene.rotation);

				// camera.rotation.copy(startRot)

				// new TWEEN.Tween(camera.rotation).to(endRot, 500).start();
				// camera.lookAt(obj.scene.position)

				// Move to object
				new TWEEN.Tween(camera.position).to({x: x, y: y, z: z}, 500).start()
			}

			if (obj !== undefined) {
				// Move camera
				switch (mainObj) {
					case 'drawer':
						moveToObj(3.07, 1.93, 1.89);
						break;
					case 'board':
						moveToObj(2.55,2.87,1.66);
						break;
				}
			}
		}
	}
})

// -----------
// = ANIMATE =
// -----------

function animate() {
	if (focus) {
		raycaster.setFromCamera( pointer, camera );

		requestAnimationFrame(animate );

		// required if controls.enableDamping or controls.autoRotate are set to true
		controls.update();

		TWEEN.update();

		renderer.render(scene, camera);

		if (!(helperExist) && globalThis.helper) {
			const helper = new THREE.CameraHelper( light1.shadow.camera ); // add a helper
			scene.add( helper );

			helperExist = true;
		} 
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
