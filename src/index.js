import World from './classes/World.js';
import './assets/common.css';
import { BoxGeometry, DirectionalLight, Mesh, MeshBasicMaterial } from 'three';

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const world = new World({
  cameraConfig: {
    fov: 75,
    aspect: size.width / size.height,
    near: 1,
    far: 1000,
  },
  rendererConfig: {
    alpha: false,
  },
});

const renderer = world.renderer;

const scene = world.scene;

const camera = world.camera;
camera.position.set(3, 3, 1);
const light = new DirectionalLight();
scene.add(new Mesh(new BoxGeometry(), new MeshBasicMaterial()), light);
renderer.setSizeAndPixel(size);
document.body.appendChild(world.renderer.domElement);

renderer.render(scene, camera);
