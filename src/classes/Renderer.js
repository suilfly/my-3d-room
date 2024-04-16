import { WebGLRenderer } from 'three';

export default class Renderer extends WebGLRenderer {
  constructor(options) {
    super(options);
  }

  setSizeAndPixel(options) {
    this.setSize(options.width, options.height);
    this.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}
