#!/usr/bin/env node

import { Command } from 'commander';
import { addAspectCommand } from './commands/add-aspect';
import { addModuleCommand } from './commands/add-module';
import { listAspectsCommand } from './commands/list-aspects';
import { listModulesCommand } from './commands/list-modules';

const program = new Command();

program
  .name('ecs-cli')
  .description('CLI tool for managing ECS aspects and modules')
  .version('0.0.1');

program
  .command('add-aspect')
  .description('Add an aspect to a game')
  .argument('<name>', 'Name of the aspect to add')
  .option('-g, --game <game>', 'Target game name')
  .option('-i, --interactive', 'Use interactive prompts')
  .action(addAspectCommand);

program
  .command('add-module')
  .description('Add a module to a game')
  .argument('<name>', 'Name of the module to add')
  .option('-g, --game <game>', 'Target game name')
  .option('-i, --interactive', 'Use interactive prompts')
  .action(addModuleCommand);

program
  .command('list-aspects')
  .description('List available aspects')
  .action(listAspectsCommand);

program
  .command('list-modules')
  .description('List available modules')
  .action(listModulesCommand);

program.parse();

