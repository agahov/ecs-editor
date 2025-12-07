import { defineComponent, Types, type IWorld } from '@ecs-editor/ecs-core';

// Transform component
export const Position = defineComponent({
  x: Types.f32,
  y: Types.f32,
});

export const Rotation = defineComponent({
  angle: Types.f32,
});

export const Scale = defineComponent({
  x: Types.f32,
  y: Types.f32,
});

// Render component marker - entities with this will be rendered
export const Render = defineComponent({});

// Transform system placeholder
export function transformSystem(_world: IWorld) {
  // Transform logic will be implemented here
}

