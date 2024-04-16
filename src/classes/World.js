import { PerspectiveCamera, Scene } from 'three';
import Renderer from './Renderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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

  update() {
    this.control && this.control.update();
    this.renderer && this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(() => {
      this.update();
    });
  }
}
