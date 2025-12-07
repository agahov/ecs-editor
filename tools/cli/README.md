# ECS CLI Tool

CLI tool for managing aspects and modules in games.

## Commands

### Direct Commands

```bash
# Add aspect to a game
ecs-cli add-aspect <name> -g <game>

# Add module to a game
ecs-cli add-module <name> -g <game>

# List available aspects
ecs-cli list-aspects

# List available modules
ecs-cli list-modules
```

### Interactive Mode

```bash
# Interactive prompts for adding aspect
ecs-cli add-aspect <name> --interactive

# Interactive prompts for adding module
ecs-cli add-module <name> --interactive
```

## Rules

### Adding Aspects

- Aspects are added to `games/<game>/src/aspects/<name>/`
- Each aspect should include components and systems
- Aspects should be self-contained and reusable

### Adding Modules

- Modules are added to `games/<game>/src/modules/<name>/`
- Modules are collections of functionality
- Modules can include multiple aspects, systems, and utilities

## Examples

```bash
# Add movement aspect to test-game
ecs-cli add-aspect movement -g test-game

# Add data-collection module interactively
ecs-cli add-module data-collection --interactive
```

