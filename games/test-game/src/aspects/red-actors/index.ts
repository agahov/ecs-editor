// RedActors aspect
import { defineComponent, Types, addComponent, addEntity, defineQuery, type IWorld, type Entity } from '@ecs-editor/ecs-core';
import { Position, Rotation, Scale, Render } from '@ecs-editor/aspects-core';
import { pathCache } from '@ecs-editor/canvas-runtime';
import type { Canvas2D } from '@ecs-editor/canvas-runtime';

// Red component - the actual component used by entities

// RedBodyComp - component for rendering with change tracking
// Stores radius and background color directly on the component
export const RedBodyComp = defineComponent({
  isChanged: Types.ui8, // boolean flag (0 = false, 1 = true)
  radius: Types.f32,
  bgColor: Types.ui32, // RGB color as 0xRRGGBB (number)
});

// Helper functions to convert between hex strings and numbers
function hexStringToNumber(hex: string): number {
  // Remove # if present and convert to number
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
  return parseInt(cleanHex, 16);
}

function numberToHexString(num: number): string {
  return '#' + num.toString(16).padStart(6, '0');
}

// Default config values (located in red aspect as requested)
export const RedConfig = {
  radius: 20,
  color: '#ffff00',
  colorNumber: 0xffff00, // RGB as number
};

// Query for entities with RedBodyComp and Render components
const redBodyRenderQuery = defineQuery([RedBodyComp, Render, Position]);

// RedRenderingSystem: updates pathCache when RedBodyComp.isChanged is true, and renders all red entities
export function redRenderingSystem(canvas2d: Canvas2D) {
  return (world: IWorld) => {
    const ctx = canvas2d.context;
    const entities = redBodyRenderQuery(world);
    
    for (let i = 0; i < entities.length; i++) {
      const eid = entities[i];
      
      // Check if component has changed and update path cache
      if (RedBodyComp.isChanged[eid] === 1) {
        console.log("draw red body")
        const radius = RedBodyComp.radius[eid];
        
        let path = pathCache.get(eid)

        if (!path) {
          path = new Path2D()
          // Generate new Path2D (circle at origin 0,0)
          path.arc(0, 0, radius, 0, Math.PI * 2);
          
          // Store in pathCache
          pathCache.set(eid, path);
          
          // Reset isChanged flag
          RedBodyComp.isChanged[eid] = 0;
        }
      }
      
      // Render the entity
      const path = pathCache.get(eid);
      if (!path) continue;

      const x = Position.x[eid];
      const y = Position.y[eid];

      if (x === undefined || y === undefined) continue;

      // Save context state
      ctx.save();

      // Apply transforms
      ctx.translate(x, y);
      ctx.rotate(Rotation.angle[eid] || 0);
      ctx.scale(Scale.x[eid] || 1, Scale.y[eid] || 1);

      // Set fill and stroke styles
      const bgColor = RedBodyComp.bgColor[eid];
      ctx.fillStyle = numberToHexString(bgColor);
      ctx.strokeStyle = '#000000'; // black stroke
      ctx.lineWidth = 2;
      
      // Draw the path
      ctx.fill(path);
      ctx.stroke(path);
      
      // Restore context state
      ctx.restore();
    }
  };
}

// Create function: combines RedConfig + params to create RedBodyComp component
export function createRed(world: IWorld, params: Partial<{ radius: number; color: string; x?: number; y?: number }> = {}): Entity {
  const entity = addEntity(world);
  
  // Merge default config with params
  const radius = params.radius ?? RedConfig.radius;
  const colorString = params.color ?? RedConfig.color;
  const colorNumber = hexStringToNumber(colorString);
  
  // Add RedBodyComp component
  addComponent(world, RedBodyComp, entity);
  RedBodyComp.radius[entity] = radius;
  RedBodyComp.bgColor[entity] = colorNumber;
  RedBodyComp.isChanged[entity] = 1; // Set to true so path is generated on first render
  
  // Add Render marker component
  addComponent(world, Render, entity);
  
  
  // Add Position component if provided
  if (params.x !== undefined || params.y !== undefined) {
    addComponent(world, Position, entity);
    Position.x[entity] = params.x ?? 0;
    Position.y[entity] = params.y ?? 0;
  }
  
  return entity;
}

