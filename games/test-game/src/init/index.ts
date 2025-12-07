// Game initialization code
import type { IWorld } from '@ecs-editor/ecs-core';
import { createRed } from '../aspects/red-actors';
import gameData from '../assets/data.json';

interface RedActorData {
  x: number;
  y: number;
  radius?: number;
  color?: string;
}

interface GameData {
  redActors: RedActorData[];
}

export async function initGame(world: IWorld): Promise<void> {
  // Load data.json with list of Red entities
  try {
    const data = gameData as GameData;
    console.log("create reds")
    // Create instances for each Red entity
    for (const actor of data.redActors) {
      createRed(world, {
        x: actor.x,
        y: actor.y,
        radius: actor.radius,
        color: actor.color,
      });
    }
  } catch (error) {
    console.error('Failed to load game data:', error);
  }
}

