import { defineComponent, Types, type IWorld } from '@ecs-editor/ecs-core';

// Lifetime component
export const Lifetime = defineComponent({
  remaining: Types.f32,
});

// Lifetime system placeholder
export function lifetimeSystem(_world: IWorld) {
  // Lifetime logic will be implemented here
}

