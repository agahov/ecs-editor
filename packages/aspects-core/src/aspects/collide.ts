import { defineComponent, Types, type IWorld } from '@ecs-editor/ecs-core';

// Collision component
export const Collider = defineComponent({
  width: Types.f32,
  height: Types.f32,
  radius: Types.f32,
});

// Note: Collision tracking with arrays requires a different approach in bitECS
// This is a simplified version
export const Collision = defineComponent({
  colliding: Types.ui8, // 0 or 1 for boolean
});

// Collision system placeholder
export function collisionSystem(_world: IWorld) {
  // Collision logic will be implemented here
}

