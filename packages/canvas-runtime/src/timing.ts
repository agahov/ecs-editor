/**
 * Timing utilities
 */
export class Timer {
  private startTime: number;
  private pausedTime = 0;
  private isPaused = false;

  constructor() {
    this.startTime = performance.now();
  }

  pause(): void {
    if (!this.isPaused) {
      this.pausedTime = performance.now();
      this.isPaused = true;
    }
  }

  resume(): void {
    if (this.isPaused) {
      this.startTime += performance.now() - this.pausedTime;
      this.isPaused = false;
    }
  }

  reset(): void {
    this.startTime = performance.now();
    this.pausedTime = 0;
    this.isPaused = false;
  }

  getElapsed(): number {
    if (this.isPaused) {
      return this.pausedTime - this.startTime;
    }
    return performance.now() - this.startTime;
  }
}

export function getDeltaTime(lastTime: number): number {
  return performance.now() - lastTime;
}

