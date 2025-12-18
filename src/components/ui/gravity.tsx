'use client';

import {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import debounce from 'lodash/debounce';
import Matter, {
  Bodies,
  Body,
  Common,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Render,
  World,
} from 'matter-js';
import decomp from 'poly-decomp';
import SVGPathCommander from 'svg-path-commander';

import { cn } from '@/lib/utils';

Common.setDecomp(decomp as unknown as (vertices: Matter.Vector[]) => void);

interface GravityOptions {
  x: number;
  y: number;
}

type GravityProps = {
  children: ReactNode;
  debug?: boolean;
  gravity?: GravityOptions;
  resetOnResize?: boolean;
  grabCursor?: boolean;
  addTopWall?: boolean;
  autoStart?: boolean;
  className?: string;
};

type MatterBodyProps = {
  children: ReactNode;
  matterBodyOptions?: Matter.IChamferableBodyDefinition;
  isDraggable?: boolean;
  bodyType?: 'rectangle' | 'circle' | 'svg';
  sampleLength?: number;
  x?: number | string;
  y?: number | string;
  angle?: number;
  className?: string;
};

type PhysicsBody = {
  element: HTMLElement;
  body: Matter.Body | null;
  props: MatterBodyProps;
};

export type GravityRef = {
  start: () => void;
  stop: () => void;
  reset: () => void;
};

type GravityContextValue = {
  registerElement: (
    id: string,
    element: HTMLElement,
    props: MatterBodyProps
  ) => void;
  unregisterElement: (id: string) => void;
};

const GravityContext = createContext<GravityContextValue | null>(null);

const defaultBodyOptions: Matter.IChamferableBodyDefinition = {
  friction: 0.12,
  restitution: 0.12,
  density: 0.0012,
  isStatic: false,
};

function parsePathToVertices(path: string, sampleLength = 15): Matter.Vector[] {
  const commander = new SVGPathCommander(path);
  const points: Matter.Vector[] = [];
  let lastPoint: Matter.Vector | null = null;
  const totalLength = commander.getTotalLength();
  let length = 0;

  while (length < totalLength) {
    const point = commander.getPointAtLength(length);
    const currentPoint: Matter.Vector = { x: point.x, y: point.y };

    if (
      !lastPoint ||
      currentPoint.x !== lastPoint.x ||
      currentPoint.y !== lastPoint.y
    ) {
      points.push(currentPoint);
      lastPoint = currentPoint;
    }

    length += sampleLength;
  }

  const finalPoint = commander.getPointAtLength(totalLength);
  const finalVector: Matter.Vector = { x: finalPoint.x, y: finalPoint.y };

  if (
    !lastPoint ||
    finalVector.x !== lastPoint.x ||
    finalVector.y !== lastPoint.y
  ) {
    points.push(finalVector);
  }

  return points;
}

function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
): number {
  if (typeof value === 'string' && value.endsWith('%')) {
    const percentage = Number.parseFloat(value) / 100;
    return containerSize * percentage;
  }

  if (typeof value === 'number') {
    return value;
  }

  return elementSize - containerSize + elementSize / 2;
}

function createBodyFromElement(
  element: HTMLElement,
  props: MatterBodyProps,
  canvasRect: DOMRect,
  debug: boolean
): Matter.Body {
  const width = element.offsetWidth || 1;
  const height = element.offsetHeight || 1;
  const angleInRadians = (props.angle || 0) * (Math.PI / 180);
  const mergedOptions: Matter.IChamferableBodyDefinition = {
    ...defaultBodyOptions,
    ...props.matterBodyOptions,
  };

  if (mergedOptions.chamfer === null) {
    delete mergedOptions.chamfer;
  }

  const initialX = calculatePosition(props.x, canvasRect.width, width);
  const initialY = calculatePosition(props.y, canvasRect.height, height);

  if (props.bodyType === 'circle') {
    const radius = Math.max(width, height) / 2;
    return Bodies.circle(initialX, initialY, radius, {
      ...mergedOptions,
      angle: angleInRadians,
      render: {
        fillStyle: debug ? '#888888' : '#00000000',
        strokeStyle: debug ? '#333333' : '#00000000',
        lineWidth: debug ? 3 : 0,
      },
    });
  }

  if (props.bodyType === 'svg') {
    const paths = Array.from(element.querySelectorAll('path'));
    const vertexSets = paths
      .map((path) => path.getAttribute('d'))
      .filter((d): d is string => Boolean(d))
      .map((d) => parsePathToVertices(d, props.sampleLength ?? 15));

    return Bodies.fromVertices(initialX, initialY, vertexSets, {
      ...mergedOptions,
      angle: angleInRadians,
      render: {
        fillStyle: debug ? '#888888' : '#00000000',
        strokeStyle: debug ? '#333333' : '#00000000',
        lineWidth: debug ? 3 : 0,
      },
    });
  }

  return Bodies.rectangle(initialX, initialY, width, height, {
    ...mergedOptions,
    angle: angleInRadians,
    render: {
      fillStyle: debug ? '#888888' : '#00000000',
      strokeStyle: debug ? '#333333' : '#00000000',
      lineWidth: debug ? 3 : 0,
    },
  });
}

const MatterBody = ({
  children,
  className,
  matterBodyOptions = defaultBodyOptions,
  bodyType = 'rectangle',
  isDraggable = true,
  sampleLength = 15,
  x = 0,
  y = 0,
  angle = 0,
}: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(`matter-body-${Math.random().toString(36).slice(2, 9)}`);
  const context = useContext(GravityContext);

  useEffect(() => {
    const element = elementRef.current;
    const gravityContext = context;
    const id = idRef.current;

    if (!element || !gravityContext) {
      return () => {};
    }

    gravityContext.registerElement(id, element, {
      children,
      matterBodyOptions,
      bodyType,
      isDraggable,
      sampleLength,
      x,
      y,
      angle,
      className,
    });

    return () => {
      gravityContext.unregisterElement(id);
    };
  }, [
    context,
    children,
    matterBodyOptions,
    bodyType,
    isDraggable,
    sampleLength,
    x,
    y,
    angle,
    className,
  ]);

  return (
    <div
      ref={elementRef}
      className={cn(
        'absolute select-none',
        className,
        isDraggable && 'pointer-events-none'
      )}
    >
      {children}
    </div>
  );
};

const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      gravity = { x: 0, y: 1 },
      resetOnResize = true,
      grabCursor = true,
      addTopWall = true,
      autoStart = true,
      className,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef(Engine.create());
    const renderRef = useRef<Render | null>(null);
    const mouseConstraintRef = useRef<MouseConstraint | null>(null);
    const frameIdRef = useRef<number | null>(null);
    const mouseDownRef = useRef(false);
    const bodiesMapRef = useRef<Map<string, PhysicsBody>>(new Map());
    const isRunningRef = useRef(false);
    const loggedBodiesRef = useRef<Set<string>>(new Set());
    const lastUpdateRef = useRef<number | null>(null);
    const logDebug = useCallback(
      (...messages: unknown[]) => {
        if (debug) {
          console.log('[Gravity]', ...messages);
        }
      },
      [debug]
    );

    const updateElements = useCallback(() => {
      const now = performance.now();

      if (isRunningRef.current) {
        const last = lastUpdateRef.current ?? now;
        // Cap delta at 16.667ms (1000/60 for 60 FPS) to prevent Matter.js warnings
        // Matter.js recommends delta ≤ 16.667ms for stable physics simulation
        const delta = Math.min(now - last, 1000 / 60);
        Engine.update(engineRef.current, delta);
        lastUpdateRef.current = now;
      } else {
        lastUpdateRef.current = now;
      }

      bodiesMapRef.current.forEach((entry, id) => {
        const { element, body } = entry;
        if (!body) {
          return;
        }

        const { x, y } = body.position;
        const rotation = body.angle * (180 / Math.PI);
        const offsetX = x - element.offsetWidth / 2;
        const offsetY = y - element.offsetHeight / 2;
        element.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`;

        if (debug && !loggedBodiesRef.current.has(id)) {
          logDebug('Applied DOM transform', {
            id,
            matterPosition: { x, y, angle: body.angle },
            elementSize: {
              width: element.offsetWidth,
              height: element.offsetHeight,
            },
            offsets: { offsetX, offsetY },
            transform: element.style.transform,
          });
          loggedBodiesRef.current.add(id);
        }
      });

      frameIdRef.current = requestAnimationFrame(updateElements);
    }, [debug, logDebug]);

    const registerElement = useCallback(
      (id: string, element: HTMLElement, props: MatterBodyProps) => {
        logDebug('registerElement', {
          id,
          hasCanvas: Boolean(canvasRef.current),
          elementSize: {
            width: element.offsetWidth,
            height: element.offsetHeight,
          },
        });

        const existing = bodiesMapRef.current.get(id);

        if (existing && existing.element === element) {
          bodiesMapRef.current.set(id, { ...existing, props });

          if (existing.body) {
            loggedBodiesRef.current.delete(id);
            logDebug('Reused existing body', { id });
            return;
          }

          logDebug('Updated deferred body props; awaiting canvas', { id });
          return;
        }

        if (existing?.body) {
          World.remove(engineRef.current.world, existing.body);
          logDebug('Removed existing body', { id });
        }

        loggedBodiesRef.current.delete(id);

        const entry: PhysicsBody = { element, body: null, props };
        bodiesMapRef.current.set(id, entry);

        if (!canvasRef.current) {
          logDebug('Canvas not ready; deferred body creation', { id });
          return;
        }

        const canvasRect = canvasRef.current.getBoundingClientRect();
        const body = createBodyFromElement(element, props, canvasRect, debug);

        World.add(engineRef.current.world, body);
        bodiesMapRef.current.set(id, { ...entry, body });
        logDebug('Created body immediately', {
          id,
          position: body.position,
        });
      },
      [debug, logDebug]
    );

    const unregisterElement = useCallback((id: string) => {
      const stored = bodiesMapRef.current.get(id);
      if (stored?.body) {
        World.remove(engineRef.current.world, stored.body);
      }
      bodiesMapRef.current.delete(id);
      loggedBodiesRef.current.delete(id);
    }, []);

    const createWalls = useCallback(
      (width: number, height: number) => {
        const walls: Matter.Body[] = [
          Bodies.rectangle(width / 2, height + 12, width, 24, {
            isStatic: true,
            friction: 1,
            render: { visible: debug },
          }),
          Bodies.rectangle(width + 12, height / 2, 24, height, {
            isStatic: true,
            friction: 1,
            render: { visible: debug },
          }),
          Bodies.rectangle(-12, height / 2, 24, height, {
            isStatic: true,
            friction: 1,
            render: { visible: debug },
          }),
        ];

        if (addTopWall) {
          walls.push(
            Bodies.rectangle(width / 2, -12, width, 24, {
              isStatic: true,
              friction: 1,
              render: { visible: debug },
            })
          );
        }

        World.add(engineRef.current.world, walls);
      },
      [addTopWall, debug]
    );

    const initialiseCursor = useCallback(() => {
      if (!grabCursor || !canvasRef.current || !mouseConstraintRef.current) {
        return;
      }

      const touchingMouse = () =>
        Query.point(
          engineRef.current.world.bodies,
          mouseConstraintRef.current?.mouse.position || { x: 0, y: 0 }
        ).length > 0;

      const handleMouseDown = () => {
        mouseDownRef.current = true;
        if (!canvasRef.current) {
          return;
        }
        canvasRef.current.style.cursor = touchingMouse()
          ? 'grabbing'
          : 'default';
      };

      const handleMouseUp = () => {
        mouseDownRef.current = false;
        if (!canvasRef.current) {
          return;
        }
        canvasRef.current.style.cursor = touchingMouse() ? 'grab' : 'default';
      };

      canvasRef.current.addEventListener('mousedown', handleMouseDown);
      canvasRef.current.addEventListener('mouseup', handleMouseUp);

      Events.on(engineRef.current, 'beforeUpdate', () => {
        if (!canvasRef.current) {
          return;
        }

        if (!mouseDownRef.current && !touchingMouse()) {
          canvasRef.current.style.cursor = 'default';
        } else if (touchingMouse()) {
          canvasRef.current.style.cursor = mouseDownRef.current
            ? 'grabbing'
            : 'grab';
        }
      });
    }, [grabCursor]);

    const initialiseRenderer = useCallback(() => {
      if (!canvasRef.current) {
        logDebug('initialiseRenderer skipped: no canvas element');
        return;
      }

      const width = canvasRef.current.offsetWidth || 1;
      const height = canvasRef.current.offsetHeight || 1;
      logDebug('initialiseRenderer begin', {
        width,
        height,
        pendingBodies: bodiesMapRef.current.size,
      });

      engineRef.current.gravity.x = gravity.x;
      engineRef.current.gravity.y = gravity.y;

      renderRef.current = Render.create({
        element: canvasRef.current,
        engine: engineRef.current,
        options: {
          width,
          height,
          wireframes: false,
          background: '#00000000',
        },
      });

      createWalls(width, height);

      const mouse = Mouse.create(renderRef.current.canvas);
      mouseConstraintRef.current = MouseConstraint.create(engineRef.current, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: debug },
        },
      });

      World.add(engineRef.current.world, mouseConstraintRef.current);
      renderRef.current.mouse = mouse;

      Render.run(renderRef.current);

      initialiseCursor();

      const canvasRect = canvasRef.current.getBoundingClientRect();
      bodiesMapRef.current.forEach((entry, id) => {
        if (entry.body) {
          logDebug('Skipping hydration; body already exists', { id });
          return;
        }

        const body = createBodyFromElement(
          entry.element,
          entry.props,
          canvasRect,
          debug
        );
        World.add(engineRef.current.world, body);
        bodiesMapRef.current.set(id, { ...entry, body });
        logDebug('Hydrated body after renderer init', {
          id,
          position: body.position,
        });
      });

      updateElements();

      if (autoStart) {
        isRunningRef.current = true;
        lastUpdateRef.current = performance.now();
        frameIdRef.current = requestAnimationFrame(updateElements);
        logDebug('Auto-started physics loop', {
          bodyCount: bodiesMapRef.current.size,
        });
      }
    }, [
      autoStart,
      createWalls,
      debug,
      gravity.x,
      gravity.y,
      initialiseCursor,
      logDebug,
      updateElements,
    ]);

    const clearRenderer = useCallback(() => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }

      if (mouseConstraintRef.current) {
        World.remove(engineRef.current.world, mouseConstraintRef.current);
        mouseConstraintRef.current = null;
      }

      if (renderRef.current) {
        Mouse.clearSourceEvents(renderRef.current.mouse);
        Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
        renderRef.current = null;
      }

      bodiesMapRef.current.forEach((entry, id) => {
        if (entry.body) {
          World.remove(engineRef.current.world, entry.body);
        }
        bodiesMapRef.current.set(id, { ...entry, body: null });
        loggedBodiesRef.current.delete(id);
      });

      World.clear(engineRef.current.world, false);
      Engine.clear(engineRef.current);
      engineRef.current = Engine.create();
      lastUpdateRef.current = null;
    }, []);

    const start = useCallback(() => {
      if (isRunningRef.current) {
        return;
      }

      if (renderRef.current) {
        Render.run(renderRef.current);
      }

      isRunningRef.current = true;
      lastUpdateRef.current = performance.now();
      frameIdRef.current = requestAnimationFrame(updateElements);
      logDebug('start invoked', {
        bodyCount: bodiesMapRef.current.size,
      });
    }, [logDebug, updateElements]);

    const stop = useCallback(() => {
      if (!isRunningRef.current) {
        return;
      }

      if (renderRef.current) {
        Render.stop(renderRef.current);
      }

      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }

      isRunningRef.current = false;
      lastUpdateRef.current = null;
      logDebug('stop invoked');
    }, [logDebug]);

    const reset = useCallback(() => {
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (!canvasRect) {
        return;
      }

      bodiesMapRef.current.forEach((entry) => {
        if (!entry.body) {
          return;
        }

        const width = entry.element.offsetWidth || 1;
        const height = entry.element.offsetHeight || 1;
        const targetX = calculatePosition(
          entry.props.x,
          canvasRect.width,
          width
        );
        const targetY = calculatePosition(
          entry.props.y,
          canvasRect.height,
          height
        );

        Body.setPosition(entry.body, { x: targetX, y: targetY });
        Body.setAngle(entry.body, (entry.props.angle || 0) * (Math.PI / 180));
        Body.setVelocity(entry.body, { x: 0, y: 0 });
        Body.setAngularVelocity(entry.body, 0);
      });
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        start,
        stop,
        reset,
      }),
      [reset, start, stop]
    );

    useEffect(() => {
      logDebug('Gravity mount effect');
      initialiseRenderer();

      const bodiesMap = bodiesMapRef.current;
      const loggedBodies = loggedBodiesRef.current;

      return () => {
        logDebug('Gravity cleanup effect');
        stop();
        clearRenderer();
        bodiesMap.clear();
        loggedBodies.clear();
      };
    }, [clearRenderer, initialiseRenderer, logDebug, stop]);

    useEffect(() => {
      if (!resetOnResize) {
        return;
      }

      const handleResize = debounce(() => {
        clearRenderer();
        initialiseRenderer();
      }, 300);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        handleResize.cancel();
      };
    }, [clearRenderer, initialiseRenderer, resetOnResize]);

    const contextValue = useMemo(
      () => ({ registerElement, unregisterElement }),
      [registerElement, unregisterElement]
    );

    return (
      <GravityContext.Provider value={contextValue}>
        <div
          ref={canvasRef}
          className={cn('absolute left-0 top-0 h-full w-full', className)}
          {...props}
        >
          {children}
        </div>
      </GravityContext.Provider>
    );
  }
);

Gravity.displayName = 'Gravity';

export { Gravity, MatterBody };
