import World from './World.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class Room {
  constructor() {
    this.world = new World();

    this.setRoom();
  }

  setRoom() {
    const modelLoader = new GLTFLoader();
    modelLoader.load('/model/Flamingo.glb', (data) => {
      this.world.scene.add(data.scene.children[0]);
      console.log(this.world);
    });
  }
}
