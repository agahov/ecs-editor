import { defineComponent, Types, type IWorld } from '@ecs-editor/ecs-core';

// Movement component
export const Velocity = defineComponent({
  x: Types.f32,
  y: Types.f32,
});

// Movement system placeholder
export function movementSystem(_world: IWorld) {
  // Movement logic will be implemented here
}

