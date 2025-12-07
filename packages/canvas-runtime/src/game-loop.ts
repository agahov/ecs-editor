import type { System } from '@ecs-editor/ecs-core';

export interface GameLoopOptions {
  fixedDeltaTime?: number;
  maxDeltaTime?: number;
}

export class GameLoop {
  private systems: System[] = [];
  private running = false;
  private lastTime = 0;
  private accumulator = 0;
  private fixedDeltaTime: number;
  private maxDeltaTime: number;
  private world: any;

  constructor(world: any, options: GameLoopOptions = {}) {
    this.world = world;
    this.fixedDeltaTime = options.fixedDeltaTime ?? 1000 / 60; // 60 FPS
    this.maxDeltaTime = options.maxDeltaTime ?? 1000; // Max 1 second
  }

  addSystem(system: System): void {
    this.systems.push(system);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.tick();
  }

  stop(): void {
    this.running = false;
  }

  private tick = (): void => {
    if (!this.running) return;

    const currentTime = performance.now();
    let deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Clamp delta time to prevent large jumps
    deltaTime = Math.min(deltaTime, this.maxDeltaTime);

    this.accumulator += deltaTime;

    // Fixed timestep update
    while (this.accumulator >= this.fixedDeltaTime) {
      this.update(this.fixedDeltaTime);
      this.accumulator -= this.fixedDeltaTime;
    }

    requestAnimationFrame(this.tick);
  };

  private update(_deltaTime: number): void {
    for (const system of this.systems) {
      system(this.world);
    }
  }
}

