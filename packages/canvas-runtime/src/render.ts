/**
 * Shared path cache accessible by all aspects
 */
import type { Entity } from '@ecs-editor/ecs-core';

export const pathCache = new Map<Entity, Path2D>();
