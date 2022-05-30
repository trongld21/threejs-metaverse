import keyInput from "./keyinput.js";
import * as THREE from "../node_modules/three/build/three.module.js"
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

// Setup
// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa8def0);

// Camera
const ratio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
camera.position.set(5, 5, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enable = true;
renderer.gammaOuput = true;
renderer.gammaFactor = 2.2;
document.body.appendChild(renderer.domElement);

// Controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.minDistance = 5;
orbitControls.maxDistance = 15;
orbitControls.enablePan = false;
orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
orbitControls.update();

// Model with animation
new GLTFLoader().load('../assets/Soldier.glb', function(gltf) {
    var model = gltf.scene;
    model.traverse(function(object) {
        if (object.isMesh) {
            object.castShadow = true;
        }
    });
    model.position.set(0, 0, 0)
    scene.add(model);
})

// Control Keys
const keysPressed = {}
document.addEventListener('keydown', (event) => {
    if (event.shiftKey) {

    } else {
        keysPressed[event.key.toLowerCase()] = true;
    }
}, false);
document.addEventListener('keyup', function(event) {
    keysPressed[event.key.toLowerCase()] = false;
}, false);

// Create Light
scene.add(new THREE.AmbientLight(0xffffff, 1))

const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.set(-60, 100, -10);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 50;
dirLight.shadow.camera.bottom = -50;
dirLight.shadow.camera.left = -50;
dirLight.shadow.camera.right = 50;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 200;
dirLight.shadow.mapSize.width = 4096;
dirLight.shadow.mapSize.height = 4096;
scene.add(dirLight);

// Create ground
// TEXTURES
const textureLoader = new THREE.TextureLoader();
const placeholder = textureLoader.load("../assets/placeholder.png");
const sandBaseColor = textureLoader.load("../assets/Sand 002_COLOR.jpg");
const sandNormalMap = textureLoader.load("../assets/Sand 002_NRM.jpg");
const sandHeightMap = textureLoader.load("../assets/Sand 002_DISP.jpg");
const sandAmbientOcclusion = textureLoader.load("../assets/Sand 002_OCC.jpg");

const WIDTH = 80
const LENGTH = 80

const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 512, 512);
const material = new THREE.MeshStandardMaterial({
    map: sandBaseColor,
    normalMap: sandNormalMap,
    displacementMap: sandHeightMap,
    displacementScale: 0.1,
    aoMap: sandAmbientOcclusion
})
wrapAndRepeatTexture(material.map)
wrapAndRepeatTexture(material.normalMap)
wrapAndRepeatTexture(material.displacementMap)
wrapAndRepeatTexture(material.aoMap)

const floor = new THREE.Mesh(geometry, material)
floor.receiveShadow = true
floor.rotation.x = -Math.PI / 2
scene.add(floor)
    // Create function animation
var clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    if (keyInput.isPressed(87)) {
        // camera.position.z -= 0.05;
    }
    if (keyInput.isPressed(83)) {
        // camera.position.z += 0.05;
    }
    if (keyInput.isPressed(65)) {
        // camera.position.x += 0.05;
    }
    if (keyInput.isPressed(68)) {
        // camera.position.x -= 0.05;
    }
    if (keyInput.isPressed(81)) {
        // camera.position.y += 0.05;
    }
    if (keyInput.isPressed(69)) {
        // camera.position.y -= 0.05;
    }
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
animate();

function wrapAndRepeatTexture(map) {
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.x = map.repeat.y = 10;
}

// Loop for attribute of object
// scene.traverse(function(child) {
//     if (child.class === "item") {
//         child.rotation.x += num;
//         child.rotation.y += num;
//     }
// });