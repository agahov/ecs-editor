// Game initialization code
import type { IWorld } from '@ecs-editor/ecs-core';
import { createFromGameData, type GameData } from '../aspects/creation-aspect';
import gameData from '../assets/data.json';

export async function initGame(world: IWorld): Promise<void> {
  // Load data.json with list of Red entities
  try {
    createFromGameData(world, gameData as GameData);
  } catch (error) {
    console.error('Failed to load game data:', error);
  }
}

