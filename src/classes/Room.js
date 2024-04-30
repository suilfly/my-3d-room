import World from './World.js';
import { Color, Mesh, ShaderMaterial } from 'three';
import * as THREE from 'three';
import vertexShader from '../shaders/baked/vertex.glsl';
import fragmentShader from '../shaders/baked/fragment.glsl';
import EventEmitter from './EventEmit.js';

export default class Room extends EventEmitter {
  constructor() {
    super();

    this.world = new World();

    this.model = null;

    this.textures = {
      bakedDay: null,
      bakedNeutral: null,
      bakedNight: null,
    };

    this.bindTrigger();
  }

  configRoom() {
    const { bakedDay, bakedNeutral, bakedNight } = this.textures;
    let material = new ShaderMaterial({
      uniforms: {
        uBakedDayTexture: { value: bakedDay },
        uBakedNightTexture: { value: bakedNight },
        uBakedNeutralTexture: { value: bakedNeutral },

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

    this.model.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = material;
      }
    });
  }

  bindTrigger() {
    this.on(
      'onFileLoadEnd',
      (result, resource) => {
        if (resource.type === 'texture') {
          result.needsUpdate = true;
          result.colorScope = THREE.SRGBColorSpace;
          result.flipY = false;

          this.textures[resource.name] = result;
          this.emit('end');
        }
        if (resource.type === 'model') {
          this.model = result;
          this.world.scene.add(result);
          this.emit('end');
        }
      },
      true
    );

    this.on('end', () => {
      const isAllTextureLoaded = this.isTextureAllLoadEnd(this.textures);
      if (isAllTextureLoaded && this.model) {
        this.configRoom();
      }
    });
  }

  isTextureAllLoadEnd(textures) {
    let flag = true;
    for (let key in textures) {
      if (!textures[key]) {
        flag = false;
        break;
      }
    }

    return flag;
  }
}
