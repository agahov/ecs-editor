# @ecs-editor/aspects-core

Reusable game-agnostic aspects (components and systems that work together).

## Available Aspects

- **Movement**: Velocity component and movement system
- **Transform**: Position, Rotation, Scale components and transform system
- **Lifetime**: Lifetime component for entities with time-based expiration
- **Remove**: Marker component and system for entity removal
- **Damage**: Health and Damage components with damage system
- **Collide**: Collider and Collision components with collision detection system

## Usage

```typescript
import { Position, Velocity, movementSystem } from '@ecs-editor/aspects-core';
```

