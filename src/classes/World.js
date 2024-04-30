import { PerspectiveCamera, Scene } from 'three';
import Renderer from './Renderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Room from './Room.js';
import Loader from './Loader.js';
import resource from './ResourceStore.js';

export default class World {
  static instance;

  constructor(options = {}) {
    if (World.instance) {
      return World.instance;
    }

    World.instance = this;

    this.camera = this.setCamera(options.cameraConfig);
    this.scene = this.setScene();
    this.renderer = this.setRenderer(options.rendererConfig);
    this.control = new OrbitControls(this.camera, this.renderer.domElement);
    this.loader = new Loader();
    this.resources = resource;

    this.loadResource();
    this.setRoom();
    this.update();
  }

  setCamera(opts) {
    const { fov = 40, aspect = 1.5, near = 1, far = 1000 } = opts;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    return camera;
  }

  setScene() {
    const scene = new Scene();
    return scene;
  }

  setRenderer(opts) {
    const renderer = new Renderer(opts);
    return renderer;
  }

  setRoom() {
    this.room = new Room();
  }

  loadResource() {
    this.resources.forEach((resource) => {
      this.loader.load(resource);
    });
  }

  update() {
    this.control && this.control.update();
    this.renderer && this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(() => {
      this.update();
    });
  }
}
