import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import World from './World.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class Room {
  constructor() {
    this.world = new World();

    this.setRoom();
  }

  setRoom() {
    const modelLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/'); // 注意draco的版本要和当前使用的threejs的版本一致，把node_modules/three/example/jsm/lib下的draco复制
    dracoLoader.setDecoderConfig({ type: 'js' });
    modelLoader.setDRACOLoader(dracoLoader);

    modelLoader.load('/model/roomModel.glb', (data) => {
      this.world.scene.add(data.scene.children[0]);
    });
  }
}
