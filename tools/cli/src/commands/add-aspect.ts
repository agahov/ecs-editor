import inquirer from 'inquirer';
import { readdir, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

interface AddAspectOptions {
  game?: string;
  interactive?: boolean;
}

export async function addAspectCommand(name: string, options: AddAspectOptions) {
  let gameName = options.game;

  // Interactive mode: prompt for game if not provided
  if (options.interactive || !gameName) {
    const games = await getAvailableGames();
    if (games.length === 0) {
      console.error('No games found. Please create a game first.');
      return;
    }

    if (!gameName) {
      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'game',
          message: 'Select a game:',
          choices: games,
        },
      ]);
      gameName = answer.game;
    }
  }

  if (!gameName) {
    console.error('Game name is required. Use -g/--game or --interactive');
    return;
  }

  const gamePath = join(process.cwd(), 'games', gameName);
  const aspectPath = join(gamePath, 'src', 'aspects', name);

  try {
    // Create aspect directory
    await mkdir(aspectPath, { recursive: true });

    // Create aspect file
    const aspectContent = `// ${name} aspect
import type { IWorld } from '@ecs-editor/ecs-core';

// Components
// TODO: Define components here

// Systems
export function ${name}System(world: IWorld) {
  // TODO: Implement ${name} system logic
}
`;

    await writeFile(join(aspectPath, 'index.ts'), aspectContent);

    console.log(`✓ Aspect "${name}" added to game "${gameName}"`);
    console.log(`  Location: ${aspectPath}`);
  } catch (error) {
    console.error(`Error adding aspect: ${error}`);
  }
}

async function getAvailableGames(): Promise<string[]> {
  try {
    const gamesDir = join(process.cwd(), 'games');
    const entries = await readdir(gamesDir, { withFileTypes: true });
    return entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
  } catch {
    return [];
  }
}

