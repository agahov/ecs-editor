# ECS Editor Monorepo

TypeScript monorepo for Entity-Component-System game development using bitECS, Canvas 2D, and Vite.

## Structure

```
packages/
  ecs-core/          # Thin layer around bitECS + basic TS types
  aspects-core/      # Reusable game-agnostic aspects
  canvas-runtime/    # Game loop, canvas wrapper, input, timing
  debug-tools/       # Future: logging, overlays, meta-game recorder
  ui-library/        # Base UI components

games/
  test-game/         # Simple movement demo
  railway-net/       # Future game

tools/
  cli/               # CLI tool for adding aspects/modules
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
# Build all packages
npm run build

# Run all dev servers
npm run dev

# Run specific game
nx dev test-game
```

## CLI Tool

The CLI tool helps manage aspects and modules in games.

### Direct Commands

```bash
# Add aspect to a game
ecs-cli add-aspect <name> -g <game>

# Add module to a game
ecs-cli add-module <name> -g <game>
```

### Interactive Mode

```bash
# Interactive prompts
ecs-cli add-aspect <name> --interactive
ecs-cli add-module <name> --interactive
```

## Packages

### @ecs-editor/ecs-core

Thin layer around bitECS providing core ECS functionality.

### @ecs-editor/aspects-core

Reusable game-agnostic aspects:
- Movement
- Transform
- Lifetime
- Remove
- Damage
- Collide

### @ecs-editor/canvas-runtime

Game loop, canvas wrapper, input handling, and timing utilities.

## Games

### test-game

Simple game demonstrating entity movement on screen.

### railway-net

Future game project (placeholder).

## License

MIT
