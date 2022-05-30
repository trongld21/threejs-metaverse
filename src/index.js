import keyInput from "./keyinput.js";
import * as THREE from "../node_modules/three/build/three.module.js"
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";

// Setup
const ratio = window.innerWidth / window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enable = true;
renderer.gammaOuput = true;
document.body.appendChild(renderer.domElement);

// Create Light
const light = new THREE.AmbientLight(0x404040);
const dlight = new THREE.DirectionalLight(0xffffff, 0.5);

light.add(dlight);
scene.add(light);

// Create Enemy
var root;
const loader = new GLTFLoader();
loader.load('../assets/wraith.glb', function(glb) {
    console.log(glb);
    root = glb.scene;
    root.position.set(0, 1, 0)
    root.scale.set(0.1, 0.1, 0.1)
    scene.add(root)
}, function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "% loaded")
}, function(error) {
    console.log("An error")
})

// Create ground

const geometry = new THREE.BoxGeometry(50, 1, 50);
const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const ground = new THREE.Mesh(geometry, material);

scene.add(ground);
camera.position.set(5, 15, 15);

// Event javascript

// Create function animation

function animate() {
    requestAnimationFrame(animate);
    if (keyInput.isPressed(87)) {
        root.position.z -= 0.1;
        camera.position.z -= 0.05;
    }
    if (keyInput.isPressed(83)) {
        root.position.z += 0.1;
        camera.position.z += 0.05;
    }
    if (keyInput.isPressed(65)) {
        root.position.x -= 0.1;
        camera.position.x += 0.05;
    }
    if (keyInput.isPressed(68)) {
        root.position.x += 0.1;
        camera.position.x -= 0.05;
    }
    if (keyInput.isPressed(81)) {
        root.position.y -= 0.1;
        camera.position.y += 0.05;
    }
    if (keyInput.isPressed(69)) {
        root.position.y += 0.1;
        camera.position.y -= 0.05;
    }
    camera.lookAt(ground.position);
    root.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Loop for attribute of object
// scene.traverse(function(child) {
//     if (child.class === "item") {
//         child.rotation.x += num;
//         child.rotation.y += num;
//     }
// });