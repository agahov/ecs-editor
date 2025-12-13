import type { IWorld } from '@ecs-editor/ecs-core';

import { createRed } from '../red-actors';

export interface RedActorData {
  x: number;
  y: number;
  radius?: number;
  color?: string;
}

export interface GameData {
  redActors: RedActorData[];
}

/**
 * Creation aspect: turns serialized game data into ECS entities.
 */
export function createFromGameData(world: IWorld, data: GameData): void {
  for (const actor of data.redActors ?? []) {
    createRed(world, {
      x: actor.x,
      y: actor.y,
      radius: actor.radius,
      color: actor.color,
    });
  }
}

