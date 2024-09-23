import World from './classes/World.js';
import './assets/common.css';
import { DirectionalLight } from 'three';

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const world = new World({
  cameraConfig: {
    fov: 85,
    aspect: size.width / size.height,
    near: 1,
    far: 1000,
    position: [-7, 7.04, 8.36],
  },
  rendererConfig: {
    alpha: false,
  },
});

const renderer = world.renderer;

const scene = world.scene;

const camera = world.camera;
camera.rotation.reorder('YXZ');
const light = new DirectionalLight('#fff', 3);
scene.add(light);
renderer.setSizeAndPixel(size);
document.body.appendChild(world.renderer.domElement);

renderer.render(scene, camera);
