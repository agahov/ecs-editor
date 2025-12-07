// Re-export bitECS core functionality
export * from 'bitecs';
export { Types } from 'bitecs';

// Core ECS types
export type Entity = number;
export type System = (world: any) => void;

// World type (bitECS world is typically an object)
export type IWorld = Record<string, any>;

