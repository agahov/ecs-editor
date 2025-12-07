/**
 * Input handling
 */
export class InputManager {
  private keys: Set<string> = new Set();
  private mouseButtons: Set<number> = new Set();
  private mouseX = 0;
  private mouseY = 0;

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.key);
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key);
    });

    window.addEventListener('mousedown', (e) => {
      this.mouseButtons.add(e.button);
    });

    window.addEventListener('mouseup', (e) => {
      this.mouseButtons.delete(e.button);
    });

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }

  isKeyPressed(key: string): boolean {
    return this.keys.has(key);
  }

  isMouseButtonPressed(button: number): boolean {
    return this.mouseButtons.has(button);
  }

  getMousePosition(): { x: number; y: number } {
    return { x: this.mouseX, y: this.mouseY };
  }
}

