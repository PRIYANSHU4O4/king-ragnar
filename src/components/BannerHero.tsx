import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface BannerHeroProps {
  onExploreClick?: () => void;
}

const TOTAL_FRAMES = 177;
const LERP_FACTOR = 0.07;
const FRAME_SCALE = 0.72;

function getFramePath(index: number): string {
  const frameNum = String(index).padStart(3, '0');
  return `/first/ezgif-frame-${frameNum}.jpg`;
}

function checkIsMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

class FrameCache {
  private cache = new Map<number, HTMLImageElement>();
  private accessOrder: number[] = [];
  private inFlightLoads = new Set<number>();
  private maxCapacity: number;

  constructor(maxCapacity: number) {
    this.maxCapacity = maxCapacity;
  }

  public getMap(): Map<number, HTMLImageElement> {
    return this.cache;
  }

  public getLoaded(index: number): HTMLImageElement | undefined {
    const img = this.cache.get(index);
    if (img && img.complete && img.naturalWidth > 0) {
      this.touch(index);
      return img;
    }
    return undefined;
  }

  public load(index: number, onLoaded?: () => void): HTMLImageElement {
    let img = this.cache.get(index);
    if (img) {
      this.touch(index);
      if (img.complete && img.naturalWidth > 0 && onLoaded) {
        onLoaded();
      }
      return img;
    }

    if (this.inFlightLoads.has(index)) {
      return img || new Image();
    }
    this.inFlightLoads.add(index);

    // Evict oldest decoded image when capacity is reached
    while (this.cache.size >= this.maxCapacity && this.accessOrder.length > 0) {
      const oldest = this.accessOrder.shift();
      if (oldest !== undefined) {
        const evicted = this.cache.get(oldest);
        if (evicted) {
          evicted.onload = null;
          evicted.onerror = null;
          evicted.src = '';
        }
        this.cache.delete(oldest);
        this.inFlightLoads.delete(oldest);
      }
    }

    img = new Image();
    let handled = false;
    const handleLoad = () => {
      this.inFlightLoads.delete(index);
      if (handled) return;
      handled = true;
      if (onLoaded) onLoaded();
    };

    img.onload = () => {
      if ('decode' in img!) {
        img!.decode().then(handleLoad).catch(handleLoad);
      } else {
        handleLoad();
      }
    };
    img.onerror = () => {
      handleLoad();
    };

    img.src = getFramePath(index + 1);

    this.cache.set(index, img);
    this.accessOrder.push(index);

    if (img.complete) {
      handleLoad();
    }

    return img;
  }

  private touch(index: number) {
    const idx = this.accessOrder.indexOf(index);
    if (idx !== -1) {
      this.accessOrder.splice(idx, 1);
    }
    this.accessOrder.push(index);
  }

  public clear() {
    this.cache.forEach((img) => {
      img.onload = null;
      img.onerror = null;
      img.src = '';
    });
    this.cache.clear();
    this.inFlightLoads.clear();
    this.accessOrder = [];
  }
}

export const BannerHero: React.FC<BannerHeroProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const frameCacheRef = useRef<FrameCache | null>(null);
  const targetScrollFractionRef = useRef<number>(0);
  const currentScrollFractionRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = checkIsMobile();
    const maxCapacity = isMobile ? 16 : 40;
    const frameCache = new FrameCache(maxCapacity);
    frameCacheRef.current = frameCache;

    // Controlled background HTTP disk pre-fetcher for raw JPEG files
    const abortController = new AbortController();
    async function prefetchFramesInBackground() {
      const CONCURRENCY = isMobile ? 4 : 8;
      let currentIndex = 1;
      async function worker() {
        while (currentIndex <= TOTAL_FRAMES && !abortController.signal.aborted) {
          const i = currentIndex++;
          try {
            await fetch(getFramePath(i), {
              signal: abortController.signal,
              cache: 'force-cache',
            });
          } catch {
            // Gracefully ignore abort or fetch errors
          }
        }
      }
      const workers = Array.from({ length: CONCURRENCY }, () => worker());
      await Promise.all(workers);
    }
    prefetchFramesInBackground();

    // Draw frame on canvas with DPR scaling and cover-fit algorithm
    function drawFrame(frameIndex: number, forceRedraw = false) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (!forceRedraw && frameIndex === lastRenderedFrameRef.current) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let img = frameCacheRef.current?.getLoaded(frameIndex);

      // Fallback to nearest loaded frame in cache if requested frame isn't decoded yet
      if (!img) {
        let minDiff = Infinity;
        const cacheMap = frameCacheRef.current?.getMap();
        if (cacheMap) {
          cacheMap.forEach((cachedImg, idx) => {
            if (cachedImg.complete && cachedImg.naturalWidth > 0) {
              const diff = Math.abs(idx - frameIndex);
              if (diff < minDiff) {
                minDiff = diff;
                img = cachedImg;
              }
            }
          });
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let baseWidth: number, baseHeight: number;

      if (canvasAspect > imgAspect) {
        baseWidth = canvasWidth;
        baseHeight = canvasWidth / imgAspect;
      } else {
        baseHeight = canvasHeight;
        baseWidth = canvasHeight * imgAspect;
      }

      const renderWidth = baseWidth * FRAME_SCALE;
      const renderHeight = baseHeight * FRAME_SCALE;

      const offsetX = (canvasWidth - renderWidth) / 2;
      const offsetY = (canvasHeight - renderHeight) / 2;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

      lastRenderedFrameRef.current = frameIndex;
    }

    // Preload sliding window of frames focused on current scroll direction
    function preloadWindow(currentIndex: number, isScrollingDown: boolean) {
      if (!frameCacheRef.current) return;
      const isMob = checkIsMobile();

      let lookahead: number;
      let lookback: number;

      if (isMob) {
        lookahead = isScrollingDown ? 6 : 1;
        lookback = isScrollingDown ? 1 : 6;
      } else {
        lookahead = isScrollingDown ? 12 : 2;
        lookback = isScrollingDown ? 2 : 12;
      }

      const start = Math.max(0, currentIndex - lookback);
      const end = Math.min(TOTAL_FRAMES - 1, currentIndex + lookahead);

      for (let i = start; i <= end; i++) {
        frameCacheRef.current.load(i, () => {
          const targetIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(currentScrollFractionRef.current * (TOTAL_FRAMES - 1)))
          );
          if (i === targetIndex) {
            drawFrame(i, true);
          }
        });
      }
    }

    // Immediately load & draw initial frame (frame 0)
    frameCache.load(0, () => {
      drawFrame(0, true);
    });

    // Resize canvas according to viewport and Device Pixel Ratio (DPR)
    function resizeCanvas() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const isMob = checkIsMobile();
      const rawDpr = window.devicePixelRatio || 1;
      const dpr = isMob ? Math.min(rawDpr, 1.75) : rawDpr;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = isMob ? 'medium' : 'high';
      }

      lastRenderedFrameRef.current = -1;
      const currentFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentScrollFractionRef.current * (TOTAL_FRAMES - 1)))
      );
      preloadWindow(currentFrame, true);
      drawFrame(currentFrame, true);
    }

    // Update section-bound scroll fraction (strictly within BannerHero container)
    function updateSectionScrollProgress() {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const maxScrollDistance = rect.height - window.innerHeight;

      if (maxScrollDistance <= 0) {
        targetScrollFractionRef.current = 0;
        return;
      }

      const scrolled = -rect.top;
      const fraction = Math.min(1, Math.max(0, scrolled / maxScrollDistance));
      targetScrollFractionRef.current = fraction;
    }

    // Initialize Lenis Smooth Scroll engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', () => {
      updateSectionScrollProgress();
    });

    // Continuous Render loop with RAF & LERP (Always schedules next RAF tick for Lenis)
    let animationFrameId: number;

    function renderLoop(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }

      updateSectionScrollProgress();

      const delta = targetScrollFractionRef.current - currentScrollFractionRef.current;
      currentScrollFractionRef.current += delta * LERP_FACTOR;

      if (Math.abs(delta) < 0.00001) {
        currentScrollFractionRef.current = targetScrollFractionRef.current;
      }

      const isScrollingDown = delta >= 0;

      const rawIndex = currentScrollFractionRef.current * (TOTAL_FRAMES - 1);
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(rawIndex))
      );

      preloadWindow(frameIndex, isScrollingDown);
      drawFrame(frameIndex);

      animationFrameId = requestAnimationFrame(renderLoop);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('scroll', updateSectionScrollProgress, { passive: true });

    updateSectionScrollProgress();
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      abortController.abort();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', updateSectionScrollProgress);
      cancelAnimationFrame(animationFrameId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      frameCache.clear();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] bg-black">
      {/* Sticky Inner Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        
        {/* Layer 1: Radial Charcoal Illumination Glow */}
        <div className="hero-bg-glow" />

        {/* Layer 2: Frame-by-Frame Canvas */}
        <canvas id="scroll-canvas" ref={canvasRef} />

        {/* Layer 3: Side Typography Overlay */}
        <div className="banner-overlay">
          <div className="banner-container">
            
            {/* LEFT ZONE: HI, I'M Section */}
            <div className="hero-left">
              <div className="grunge-title left-title">
                <span className="line">HI,</span>
                <span className="line">I'M</span>
              </div>

              <div className="subtext-block">
                <svg className="cross-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <div className="v-divider" />
                <div className="subtext-content">
                  <span>RAW ENERGY.</span>
                  <span>REAL MOVEMENT.</span>
                  <span>NO LIMITS.</span>
                </div>
              </div>
            </div>

            {/* RIGHT ZONE: KING RAGNAR Section */}
            <div className="hero-right">
              <div className="ragnar-title-wrapper">
                <div className="grunge-title right-title">
                  <span className="line">KING</span>
                  <span className="line">RAGNAR</span>
                </div>
                
                {/* Paint Drips & Gold Brush Stroke SVG Underline */}
                <div className="paint-drips-container">
                  <svg className="drips-svg" viewBox="0 0 360 45" fill="#FACC15" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 18 0 L 18 16 Q 18 22 20 22 Q 22 22 22 16 L 22 0 Z" />
                    <path d="M 64 0 L 64 30 Q 64 36 67 36 Q 70 36 70 30 L 70 0 Z" />
                    <path d="M 112 0 L 112 20 Q 112 26 114 26 Q 116 26 116 20 L 116 0 Z" />
                    <path d="M 175 0 L 175 40 Q 175 46 178 46 Q 181 46 181 40 L 181 0 Z" />
                    <path d="M 245 0 L 245 26 Q 245 32 248 32 Q 251 32 251 26 L 251 0 Z" />
                    <path d="M 315 0 L 315 44 Q 315 50 318 50 Q 321 50 321 44 L 321 0 Z" />
                    <path d="M 350 0 L 350 28 Q 350 34 353 34 Q 356 34 356 28 L 356 0 Z" />
                    <path d="M 25 10 Q 170 16 355 8 Q 360 8 355 12 Q 170 22 20 14 Q 15 14 25 10 Z" opacity="0.95" />
                    <path d="M 65 20 Q 200 26 340 18 Q 345 18 340 21 Q 200 30 60 22 Q 55 22 65 20 Z" opacity="0.8" />
                  </svg>
                </div>
              </div>

              <div className="subtext-block right-subtext">
                <svg className="crown-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                </svg>
                <div className="v-divider" />
                <div className="subtext-content">
                  <span>KRUMP IS MY CROWN.</span>
                  <span>THE STREETS ARE MY STAGE.</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

