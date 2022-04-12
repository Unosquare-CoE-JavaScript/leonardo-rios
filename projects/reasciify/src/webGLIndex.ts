import {
  Application,
  Sprite,
  Container,
  Loader,
  Texture,
  AnimatedSprite,
  Text
} from 'pixi.js';
import { AsciiFilter } from 'Ascii/AsciiFilter';
import GlitchEmisorFilter from 'Glitch/GlitchEmisorFilter';
import { GlitchFilter } from '@pixi/filter-glitch';

import assets from 'assets';

const app = new Application({
  view: document.getElementById('canvas') as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0x000000,
  width: 1800,
  height: 1200
});

const glitch = new GlitchEmisorFilter({ minSize: 2 });

function main(loader: Loader, resources: any) {
  const conty: Container = new Container();
  conty.x = 0;
  conty.y = 0;
  app.stage.addChild(conty);

  const video = resources.video2!.data as HTMLVideoElement;
  video.muted = true;
  video.autoplay = true;
  video.loop = true;
  const texture = Texture.from(video);
  const clampy: AnimatedSprite = new AnimatedSprite([texture]);
  clampy.x = 0;
  clampy.y = 0;

  const ascii = new AsciiFilter(60);

  clampy.filters = [ascii, glitch];
  conty.addChild(clampy);
}

app.loader.add(assets).load(main);

app.ticker.add(() => {
  glitch.applyRandomOptions();
});

let prevX = 0;
let prevY = 0;
function onMouseMove(event) {
  glitch.setOptionsLevels(
    (Math.abs(event.pageX - prevX) + Math.abs(event.pageY - prevY)) / 1500
  );
  prevX = event.pageX;
  prevY = event.pageY;
}
function onMouseLeave() {
  glitch.setOptionsLevels(0.0);
}

document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mouseleave', onMouseLeave, false);
