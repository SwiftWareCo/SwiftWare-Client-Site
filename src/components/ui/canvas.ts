type Pointer = {
  x: number;
  y: number;
};

interface CanvasSettings {
  trails: number;
  size: number;
  dampening: number;
  tension: number;
  friction: number;
  baseSpring: number;
  lineWidth: number;
}

interface OscillatorConfig {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
}

const CANVAS_SETTINGS: CanvasSettings = {
  trails: 80,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
  friction: 0.5,
  baseSpring: 0.45,
  lineWidth: 10,
};

class Oscillator {
  private phase: number;

  private offset: number;

  private frequency: number;

  private amplitude: number;

  constructor({ phase, offset, frequency, amplitude }: OscillatorConfig) {
    this.phase = phase;
    this.offset = offset;
    this.frequency = frequency;
    this.amplitude = amplitude;
  }

  update(): number {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

class Node {
  x: number;

  y: number;

  vx: number;

  vy: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
  }
}

class Line {
  private spring: number;

  private friction: number;

  private nodes: Node[];

  constructor(pointer: Pointer, index: number) {
    this.spring =
      CANVAS_SETTINGS.baseSpring +
      (index / CANVAS_SETTINGS.trails) * 0.025 +
      (Math.random() * 0.1 - 0.05);
    this.friction = CANVAS_SETTINGS.friction + (Math.random() * 0.01 - 0.005);
    this.nodes = Array.from(
      { length: CANVAS_SETTINGS.size },
      () => new Node(pointer.x, pointer.y)
    );
  }

  update(pointer: Pointer) {
    let localSpring = this.spring;
    const firstNode = this.nodes[0];

    firstNode.vx += (pointer.x - firstNode.x) * localSpring;
    firstNode.vy += (pointer.y - firstNode.y) * localSpring;

    for (let index = 0; index < this.nodes.length; index += 1) {
      const node = this.nodes[index];

      if (index > 0) {
        const previous = this.nodes[index - 1];
        node.vx += (previous.x - node.x) * localSpring;
        node.vy += (previous.y - node.y) * localSpring;
        node.vx += previous.vx * CANVAS_SETTINGS.dampening;
        node.vy += previous.vy * CANVAS_SETTINGS.dampening;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      localSpring *= CANVAS_SETTINGS.tension;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.nodes.length < 2) {
      return;
    }

    context.beginPath();
    context.moveTo(this.nodes[0].x, this.nodes[0].y);

    for (let index = 1; index < this.nodes.length - 2; index += 1) {
      const current = this.nodes[index];
      const next = this.nodes[index + 1];
      const midpointX = 0.5 * (current.x + next.x);
      const midpointY = 0.5 * (current.y + next.y);
      context.quadraticCurveTo(current.x, current.y, midpointX, midpointY);
    }

    const penultimate = this.nodes[this.nodes.length - 2];
    const last = this.nodes[this.nodes.length - 1];
    context.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
    context.stroke();
    context.closePath();
  }
}

function createLines(pointer: Pointer): Line[] {
  return Array.from(
    { length: CANVAS_SETTINGS.trails },
    (_, index) => new Line(pointer, index)
  );
}

function getOscillator(): Oscillator {
  return new Oscillator({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
}

export type RenderCanvasCleanup = () => void;

export function renderCanvas(
  canvasId = 'brand-design-canvas'
): RenderCanvasCleanup {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;

  if (!canvas) {
    return () => {};
  }

  const context = canvas.getContext('2d');

  if (!context) {
    return () => {};
  }

  const pointer: Pointer = { x: 0, y: 0 };

  const setPointerFromClient = (clientX: number, clientY: number) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = clientX - bounds.left;
    pointer.y = clientY - bounds.top;
  };

  const lines = createLines(pointer);
  const oscillator = getOscillator();
  let frameId = 0;
  let running = true;
  let hasInteracted = false;

  const resetLines = () => {
    const refreshed = createLines(pointer);
    lines.length = 0;
    lines.push(...refreshed);
  };

  const resizeCanvas = () => {
    const { width, height } = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(ratio, ratio);
    if (pointer.x === 0 && pointer.y === 0) {
      pointer.x = width / 2;
      pointer.y = height / 2;
    }
    resetLines();
  };

  const handleMouseMove = (event: MouseEvent) => {
    setPointerFromClient(event.clientX, event.clientY);
    if (!hasInteracted) {
      hasInteracted = true;
      resetLines();
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length === 0) {
      return;
    }
    const touch = event.touches[0];
    setPointerFromClient(touch.clientX, touch.clientY);
    if (!hasInteracted) {
      hasInteracted = true;
      resetLines();
    }
  };

  const handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 0) {
      return;
    }
    const touch = event.touches[0];
    setPointerFromClient(touch.clientX, touch.clientY);
    hasInteracted = true;
    resetLines();
  };

  const render = () => {
    if (!running) {
      return;
    }

    context.globalCompositeOperation = 'source-over';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = 'lighter';
    context.lineWidth = CANVAS_SETTINGS.lineWidth;
    context.strokeStyle = `hsla(${Math.round(oscillator.update())}, 100%, 50%, 0.025)`; // gently cycle through hues

    lines.forEach((line) => {
      line.update(pointer);
      line.draw(context);
    });

    frameId = window.requestAnimationFrame(render);
  };

  resizeCanvas();
  render();

  const handleResize = () => {
    resizeCanvas();
  };

  const handleFocus = () => {
    if (!running) {
      running = true;
      frameId = window.requestAnimationFrame(render);
    }
  };

  const handleBlur = () => {
    running = false;
    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('touchmove', handleTouchMove, { passive: true });
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('resize', handleResize);
  window.addEventListener('focus', handleFocus);
  window.addEventListener('blur', handleBlur);
  document.body.addEventListener('orientationchange', handleResize);

  return () => {
    running = false;
    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('blur', handleBlur);
    document.body.removeEventListener('orientationchange', handleResize);
  };
}
