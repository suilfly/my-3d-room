import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import World from './World.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Color, Mesh, ShaderMaterial, TextureLoader } from 'three';
import * as THREE from 'three';
import bakedDay from '../assets/texture/bakedDay.jpg';
import bakedNeutral from '../assets/texture/bakedNeutral.jpg';
import bakedNight from '../assets/texture/bakedNight.jpg';

import vertexShader from '../shaders/baked/vertex.glsl';
import fragmentShader from '../shaders/baked/fragment.glsl';
import EventEmitter from './EventEmit.js';

export default class Room extends EventEmitter {
  constructor() {
    super();

    this.world = new World();

    this.setRoom();
  }

  setRoom() {
    const textureLoader = new TextureLoader();
    let material = null;
    const modelLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/'); // 注意draco的版本要和当前使用的threejs的版本一致，把node_modules/three/example/jsm/lib下的draco复制
    dracoLoader.setDecoderConfig({ type: 'js' });
    modelLoader.setDRACOLoader(dracoLoader);

    let dayTexture = null;
    let neutralTexture = null;
    let nightTexture = null;

    textureLoader.load(bakedDay, (texture) => {
      dayTexture = texture;
      dayTexture.needsUpdate = true;
      dayTexture.colorSpace = THREE.SRGBColorSpace;
      dayTexture.flipY = false; // 作用是否让texture沿y轴翻转(镜像翻转)。默认是true

      textureLoader.load(bakedNeutral, (b) => {
        neutralTexture = b;
        neutralTexture.needsUpdate = true;
        neutralTexture.flipY = false;
        textureLoader.load(bakedNight, (c) => {
          nightTexture = c;
          nightTexture.needsUpdate = true;
          nightTexture.flipY = false;
          a();
          console.log(dayTexture, neutralTexture, nightTexture);
        });
      });
    });

    modelLoader.load('/model/roomModel.glb', (data) => {
      const model = data.scene.children[0];
      model.traverse((child) => {
        if (child instanceof Mesh) {
          child.material = material;
        }
      });
      this.world.scene.add(model);
    });

    function a() {
      material = new ShaderMaterial({
        uniforms: {
          uBakedDayTexture: { value: dayTexture },
          uBakedNightTexture: { value: nightTexture },
          uBakedNeutralTexture: { value: neutralTexture },

          uNightMix: { value: 1 },
          uNeutralMix: { value: 0 },

          uLightTvColor: { value: new Color('#ff115e') },
          uLightTvStrength: { value: 1.47 },

          uLightDeskColor: { value: new Color('#ff6700') },
          uLightDeskStrength: { value: 1.9 },

          uLightPcColor: { value: new Color('#0082ff') },
          uLightPcStrength: { value: 1.4 },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });
    }
  }
}
