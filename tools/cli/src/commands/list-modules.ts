import { readdir } from 'fs/promises';
import { join } from 'path';

export async function listModulesCommand() {
  try {
    const packagesDir = join(process.cwd(), 'packages');
    const entries = await readdir(packagesDir, { withFileTypes: true });
    const modules = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);

    if (modules.length === 0) {
      console.log('No modules found in packages.');
      return;
    }

    console.log('Available modules:');
    modules.forEach(module => {
      console.log(`  - ${module}`);
    });
  } catch (error) {
    console.error(`Error listing modules: ${error}`);
  }
}

