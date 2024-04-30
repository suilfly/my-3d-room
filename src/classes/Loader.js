import { TextureLoader } from 'three';
import EventEmitter from './EventEmit';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class Loader extends EventEmitter {
  constructor() {
    super();
    this.loader = [];

    this.textureLoader = null;

    this.dracoLoader = null;
    this.initLoader();
  }

  initLoader() {
    this.textureLoader = new TextureLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('draco/');
    this.dracoLoader.setDecoderConfig({ type: 'js' });

    this.modelLoader = new GLTFLoader();
    this.modelLoader.setDRACOLoader(this.dracoLoader);

    this.loader.push({
      extension: ['.jpg', '.png'],
      loadResource: (resource) => {
        this.textureLoader.load(resource.url, (fileResult) => {
          this.emit('onFileLoadEnd', fileResult, resource);
        });
      },
    });

    this.loader.push({
      extension: ['.glb', '.gltf'],
      loadResource: (resource) => {
        this.modelLoader.load(resource.url, (fileResult) => {
          this.emit('onFileLoadEnd', fileResult.scene.children[0], resource);
        });
      },
    });
  }

  load(resource) {
    const match = resource.url.match(/.[a-zA-Z]+$/)[0];
    const loader = this.loader.find(({ extension }) =>
      extension.includes(match)
    );

    loader.loadResource(resource);
  }
}
