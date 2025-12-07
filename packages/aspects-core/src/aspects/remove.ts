import { defineComponent, type IWorld } from '@ecs-editor/ecs-core';

// Remove component (marker for entities to be removed)
export const Remove = defineComponent({});

// Remove system placeholder
export function removeSystem(_world: IWorld) {
  // Remove logic will be implemented here
}

