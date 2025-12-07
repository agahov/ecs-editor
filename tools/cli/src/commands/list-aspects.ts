import { readdir } from 'fs/promises';
import { join } from 'path';

export async function listAspectsCommand() {
  try {
    const aspectsDir = join(process.cwd(), 'packages', 'aspects-core', 'src', 'aspects');
    const entries = await readdir(aspectsDir, { withFileTypes: true });
    const aspects = entries
      .filter(entry => entry.isFile() && entry.name.endsWith('.ts'))
      .map(entry => entry.name.replace('.ts', ''));

    if (aspects.length === 0) {
      console.log('No aspects found in aspects-core.');
      return;
    }

    console.log('Available aspects:');
    aspects.forEach(aspect => {
      console.log(`  - ${aspect}`);
    });
  } catch (error) {
    console.error(`Error listing aspects: ${error}`);
  }
}

