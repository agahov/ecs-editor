import { defineComponent, Types, type IWorld } from '@ecs-editor/ecs-core';

// Damage component
export const Health = defineComponent({
  current: Types.f32,
  max: Types.f32,
});

export const Damage = defineComponent({
  amount: Types.f32,
});

// Damage system placeholder
export function damageSystem(_world: IWorld) {
  // Damage logic will be implemented here
}

