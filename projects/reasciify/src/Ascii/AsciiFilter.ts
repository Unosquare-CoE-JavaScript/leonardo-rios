// import { vertex } from '@tools/fragments';
import { Filter } from '@pixi/core';
import { Texture, MIPMAP_MODES } from 'pixi.js';
import fontMap from 'Ascii/fontMap.png';
import lumMap from 'Ascii/lumMap.png';

// TODO (cengler) - The Y is flipped in this shader for some reason.

// @author Vico @vicocotea
// original shader : https://www.shadertoy.com/view/lssGDj by @movAX13h

/**
 * An ASCII filter.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/ascii.png)
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 * @see {@link https://www.npmjs.com/package/@pixi/filter-ascii|@pixi/filter-ascii}
 * @see {@link https://www.npmjs.com/package/pixi-filters|pixi-filters}
 */

const vertex = `  attribute vec2 aVertexPosition;
   attribute vec2 aTextureCoord;
   uniform mat3 projectionMatrix;
   varying vec2 vTextureCoord;
   void main(void) {
        gl_Position =  vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
        vTextureCoord = aTextureCoord;
    }`;

const fragment = `
precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D fontTexture;
uniform sampler2D lumTexture;
uniform vec4 inputPixel;

float width = inputPixel.x;
float height = inputPixel.y;
const int zoom = 1;

vec4 grey(vec4 color) {
  float val = (color.x + color.y + color.z) / 3.0;
  return vec4(vec3(val), 1.0);
}

vec2 camCoord(vec2 coord) {
  return coord / vec2(width, height);
}

vec2 getFontCoord(int i, vec4 coord) {
  float chY = floor(float(i) / 16.);
  float chX = mod(float(i), 16.);
  vec2 fontCoord = vec2((chX * 8. + mod(coord.x / float(zoom), 8.)) / 128., (chY * 8. + (8. - mod((-coord.y) / float(zoom), 8.))) / 128.);
  return fontCoord;
}

vec2 getLumCoord(in int i, in vec2 p) {
  float chY = floor(float(i) / 16.);
  float chX = mod(float(i), 16.);
  vec2 lumCoord = vec2((chX * 2. + p.x) / 32., (chY * 2. + 2. - p.y) / 32.);

  return lumCoord;
}

vec4 averageBlockColor(vec4 coord) {
  vec2 a = floor(coord.xy / (float(zoom) * 8.)) * float(zoom) * 8.;
  vec2 b = a + vec2(4, 0) * float(zoom);
  vec2 c = b + vec2(0, 4) * float(zoom);
  vec2 d = c + vec2(4, 4) * float(zoom);
  
  vec4 p0 = texture2D(uSampler, camCoord(a));
  vec4 p1 = texture2D(uSampler, camCoord(b));
  vec4 p2 = texture2D(uSampler, camCoord(c));
  vec4 p3 = texture2D(uSampler, camCoord(d));
  
  vec4 c0 =  grey(p0);
  vec4 c1 =  grey(p1);
  vec4 c2 =  grey(p2);
  vec4 c3 =  grey(p3);

  float minDist = 9999.;
  int minIdx = 32;
  for (int i = 32; i < 127; i++) {
    vec4 l0 = texture2D(lumTexture, getLumCoord(i, vec2(0. ,0.)));
    vec4 l1 = texture2D(lumTexture, getLumCoord(i, vec2(1. ,0.)));
    vec4 l2 = texture2D(lumTexture, getLumCoord(i, vec2(0. ,1.)));
    vec4 l3 = texture2D(lumTexture, getLumCoord(i, vec2(1. ,1.)));
    float dist = length(vec4(
      c0.x - l0.x,
      c1.x - l1.x,
      c2.x - l2.x,
      c3.x - l3.x
    ));
    if (dist < minDist) {
      minIdx = i;
      minDist = dist;
    }
  }
  vec2 fontCoord = getFontCoord(minIdx, coord);
  vec4 fontColors = texture2D(fontTexture, fontCoord);
  
  vec2 normCoords = camCoord(coord.xy);
    if(
      grey(fontColors).y < 0.5 
      //normCoords.x == vTextureCoord.x && normCoords.y == vTextureCoord.y
      ) {

    //  return texture2D(uSampler,vTextureCoord);
      return vec4(0.0);
    }  
  return (p0+p1+p2+p3)/4.0;
}

void main() {
  vec4 coord = gl_FragCoord;

  gl_FragColor =  averageBlockColor(coord);
}`;

class AsciiFilter extends Filter {
  /**
   * @param {number} [size=8] - Size of the font
   */
  constructor(size) {
    super(vertex, fragment);
    this.size = size || 8;
    this.fontTexture = Texture.from(fontMap, { mipmap: MIPMAP_MODES.OFF });
    this.lumTexture = Texture.from(lumMap, { mipmap: MIPMAP_MODES.OFF });
  }

  /**
   * The pixel size used by the filter.
   */
  get size(): number {
    return this.uniforms.pixelSize;
  }

  set size(value: number) {
    this.uniforms.pixelSize = value;
  }

  get fontTexture() {
    return this.uniforms.fontTexture;
  }

  set fontTexture(value: Texture) {
    this.uniforms.fontTexture = value;
  }

  get lumTexture() {
    return this.uniforms.lumTexture;
  }

  set lumTexture(value: Texture) {
    this.uniforms.lumTexture = value;
  }
}

export { AsciiFilter };
