import inquirer from 'inquirer';
import { readdir, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

interface AddModuleOptions {
  game?: string;
  interactive?: boolean;
}

export async function addModuleCommand(name: string, options: AddModuleOptions) {
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
  const modulePath = join(gamePath, 'src', 'modules', name);

  try {
    // Create module directory
    await mkdir(modulePath, { recursive: true });

    // Create module file
    const moduleContent = `// ${name} module
// Modules are collections of functionality that can be added to games

export function init${capitalize(name)}Module() {
  // TODO: Initialize ${name} module
}

export function ${name}Module() {
  return {
    init: init${capitalize(name)}Module,
  };
}
`;

    await writeFile(join(modulePath, 'index.ts'), moduleContent);

    console.log(`✓ Module "${name}" added to game "${gameName}"`);
    console.log(`  Location: ${modulePath}`);
  } catch (error) {
    console.error(`Error adding module: ${error}`);
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
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

