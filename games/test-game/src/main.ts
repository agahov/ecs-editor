import { Canvas2D, GameLoop } from '@ecs-editor/canvas-runtime';
import { createWorld } from '@ecs-editor/ecs-core';

import { initGame } from './init';
import { redRenderingSystem } from './aspects/red-actors';

// Game initialization
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
if (!canvas) {
  throw new Error('Canvas element not found');
}

canvas.width = 800;
canvas.height = 600;

const canvas2d = new Canvas2D(canvas);
const world = createWorld();
const gameLoop = new GameLoop(world);


// Initialize game: load data.json and create Red entities
initGame(world).then(() => {
  // Add rendering system
  const renderSystem = redRenderingSystem(canvas2d);
  gameLoop.addSystem((w) => {
    canvas2d.clear();
    renderSystem(w);
  });
  
  gameLoop.start();
});

