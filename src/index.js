import keyInput from "./keyinput.js";
const ratio = window.innerWidth / window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0x404040);
const dlight = new THREE.DirectionalLight(0xffffff, 0.5);

light.add(dlight);
scene.add(light);

const geometry = new THREE.BoxGeometry(50, 1, 50);
const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const ground = new THREE.Mesh(geometry, material);

scene.add(ground);
camera.position.set(5, 15, 15);

const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(-2, 2, 8)
scene.add(box);

function animate() {
    requestAnimationFrame(animate);
    if (keyInput.isPressed(87)) {
        // box.position.z -= 0.1;
        camera.position.z -= 0.05;
    }
    if (keyInput.isPressed(83)) {
        // box.position.z += 0.1;
        camera.position.z += 0.05;
    }
    if (keyInput.isPressed(65)) {
        // box.position.x -= 0.1;
        camera.position.x += 0.05;
    }
    if (keyInput.isPressed(68)) {
        // box.position.x += 0.1;
        camera.position.x -= 0.05;
    }
    if (keyInput.isPressed(81)) {
        // box.position.y -= 0.1;
        camera.position.y += 0.05;
    }
    if (keyInput.isPressed(69)) {
        // box.position.y += 0.1;
        camera.position.y -= 0.05;
    }
    camera.lookAt(ground.position);
    renderer.render(scene, camera);
}
animate();

// Duyệt phần tử theo thuộc tính
// scene.traverse(function(child) {
//     if (child.class === "item") {
//         child.rotation.x += num;
//         child.rotation.y += num;
//     }
// });