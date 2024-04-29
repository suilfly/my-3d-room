import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import World from './World.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Color, ShaderMaterial, TextureLoader } from 'three';
import bakedDay from '../assets/texture/bakedDay.jpg';
import bakedNeutral from '../assets/texture/bakedNeutral.jpg';
import bakedNight from '../assets/texture/bakedNight.jpg';

import vertexShader from '../shaders/baked/vertex.glsl';
import fragmentShader from '../shaders/baked/fragment.glsl';

export default class Room {
  constructor() {
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

      textureLoader.load(bakedNeutral, (b) => {
        neutralTexture = b;

        textureLoader.load(bakedNight, (c) => {
          nightTexture = c;
          a();
        });
      });
    });

    modelLoader.load('/model/roomModel.glb', (data) => {
      const model = data.scene.children[0];
      model.material = material;
      this.world.scene.add(data.scene.children[0]);
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
