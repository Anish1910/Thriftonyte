import { useState, useEffect, useRef } from 'react';
import loadingVideo from '../assets/Oversized_T-Shirt.mp4';

export default function LoadingScreen({ onFinished }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const offCanvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Lock scroll
    const scrollLock = document.createElement('style');
    scrollLock.id = 'loading-scroll-lock';
    scrollLock.textContent = 'html,body{overflow:hidden!important}';
    document.head.appendChild(scrollLock);

    // Offscreen canvas — FULL resolution to preserve checkerboard detail
    const off = document.createElement('canvas');
    offCanvasRef.current = off;
    const offCtx = off.getContext('2d', { willReadFrequently: true });
    const ctx = canvas.getContext('2d');

    video.playbackRate = 1.6;
    video.play().catch(() => {});

    const processFrame = () => {
      if (video.paused || video.ended || !video.videoWidth) {
        animFrameRef.current = requestAnimationFrame(processFrame);
        return;
      }

      const vw = video.videoWidth;
      const vh = video.videoHeight;

      // Use full resolution to correctly detect checkerboard individual pixels
      const W = vw;
      const H = vh;

      if (off.width !== W || off.height !== H) {
        off.width = W;
        off.height = H;
      }

      offCtx.drawImage(video, 0, 0, W, H);

      try {
        const imgData = offCtx.getImageData(0, 0, W, H);
        const d = imgData.data;

        // ── Background removal strategy ──
        // The video "transparent" checkerboard has two pixel colors:
        //   Light grey: ~(191,191,191) to ~(204,204,204)
        //   White:      ~(240,240,240) to ~(255,255,255)
        // Black bars:   ~(0,0,0) to ~(30,30,30)
        // Blue edge glow (from video border): has high blue channel
        //
        // The shirt is tan/khaki/beige: has actual hue (R > G > B significantly)
        //
        // Key insight: checkerboard + black + blue glow are all very desaturated
        // (grey) OR very dark. The shirt has color saturation.
        //
        // We detect "background" as: low saturation AND (very bright OR very dark)

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          const maxC = Math.max(r, g, b);
          const minC = Math.min(r, g, b);
          const chroma = maxC - minC;

          // To stop the shirt from looking "flashy" (flickering), we preserve
          // its natural RGB shading and use smooth alpha gradients for the edges.
          // Background consists of:
          // 1. Black bars (maxC is very low)
          // 2. Checkerboard (grayscale and relatively bright: high minC, low chroma)
          
          let alpha = 255;

          if (maxC < 25) {
            alpha = 0; // Black bars
          } else if (maxC < 45) {
            alpha = Math.round(((maxC - 25) / 20) * 255); // Feather black bars
          } else if (minC > 110 && chroma < 18) {
            alpha = 0; // Checkerboard interior
          } else if (minC > 90 && chroma < 35) {
            alpha = Math.round(((chroma - 18) / 17) * 255); // Feather checkerboard edges
          }

          d[i + 3] = alpha;
          // We do NOT modify d[i], d[i+1], d[i+2] so the shirt keeps its natural color and lighting!
        }

        offCtx.putImageData(imgData, 0, 0);

        // Copy to display canvas (may be different size for display)
        if (canvas.width !== W || canvas.height !== H) {
          canvas.width = W;
          canvas.height = H;
        }
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(off, 0, 0);
      } catch (e) {}

      animFrameRef.current = requestAnimationFrame(processFrame);
    };

    const onCanPlay = () => { processFrame(); };
    video.addEventListener('canplay', onCanPlay);
    if (video.readyState >= 3) processFrame();

    const removeScrollLock = () => {
      document.getElementById('loading-scroll-lock')?.remove();
    };

    const fadeTimer = setTimeout(() => {
      removeScrollLock();
      setFadeOut(true);
    }, 4200);
    const hideTimer = setTimeout(() => {
      removeScrollLock();
      setHidden(true);
      if (onFinished) onFinished();
    }, 5400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      video.removeEventListener('canplay', onCanPlay);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.getElementById('loading-scroll-lock')?.remove();
    };
  }, [onFinished]);

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#141210',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      <video
        ref={videoRef}
        src={loadingVideo}
        autoPlay loop muted playsInline
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
      />

      {/* Canvas: transparent bg so loading screen color shows through */}
      <canvas
        ref={canvasRef}
        style={{
          width: 'min(280px, 65vw)',
          height: 'min(280px, 65vw)',
          objectFit: 'contain',
        }}
      />

      <div style={{
        marginTop: '1.8rem',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 'clamp(0.7rem, 2.2vw, 0.85rem)',
        fontWeight: 600,
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: '#C8B89A',
        opacity: 0,
        animation: 'loadingTextReveal 0.8s ease-out 0.6s forwards',
      }}>
        Thriftonyte
      </div>

      <div style={{
        marginTop: '1.2rem',
        width: 'min(140px, 36vw)',
        height: '1.5px',
        backgroundColor: '#2A2520',
        borderRadius: '1px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          backgroundColor: '#8B7355',
          borderRadius: '1px',
          animation: 'loadingProgress 4s ease-in-out forwards',
        }} />
      </div>
    </div>
  );
}
