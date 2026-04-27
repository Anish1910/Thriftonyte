import { useState, useEffect, useRef } from 'react';
import loadingVideo from '../assets/Oversized_Tee.mp4';

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

    // Offscreen half-res canvas for processing
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

      // Strip 10% bottom (watermark), 3% top
      const sy = Math.floor(vh * 0.03);
      const sh = Math.floor(vh * 0.87);

      // Half resolution
      const W = Math.floor(vw / 2);
      const H = Math.floor(sh / 2);

      if (off.width !== W || off.height !== H) {
        off.width = W;
        off.height = H;
      }

      // Draw video at half res
      offCtx.drawImage(video, 0, sy, vw, sh, 0, 0, W, H);

      try {
        const imgData = offCtx.getImageData(0, 0, W, H);
        const d = imgData.data;

        // ── Sample background from 4 corner blocks (30×30 each) ──
        const cs = 30;
        let bgR = 0, bgG = 0, bgB = 0, cnt = 0;
        const corners = [[0, 0], [W - cs, 0], [0, H - cs], [W - cs, H - cs]];
        for (const [ox, oy] of corners) {
          for (let y = oy; y < Math.min(oy + cs, H); y++) {
            for (let x = ox; x < Math.min(ox + cs, W); x++) {
              const i = (y * W + x) * 4;
              bgR += d[i]; bgG += d[i + 1]; bgB += d[i + 2];
              cnt++;
            }
          }
        }
        bgR /= cnt; bgG /= cnt; bgB /= cnt;

        // ── LUMINANCE THRESHOLD SEPARATION ──
        // Video: dark grey gradient background (lum ~50-130)
        //        bright white shirt (lum ~155-255)
        // Threshold at 148 cleanly separates the two.
        for (let i = 0; i < d.length; i += 4) {
          const lum = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;

          if (lum < 140) {
            // Background (dark grey) → transparent
            d[i + 3] = 0;
          } else if (lum < 165) {
            // Soft edge feather 140-165
            const alpha = Math.round(((lum - 140) / 25) * 255);
            d[i + 3] = alpha;
            d[i]     = 139;
            d[i + 1] = 115;
            d[i + 2] = 85;
          } else {
            // Shirt (bright white) → solid brand brown #8B7355
            d[i]     = 139;
            d[i + 1] = 115;
            d[i + 2] = 85;
            d[i + 3] = 255;
          }
        }

        offCtx.putImageData(imgData, 0, 0);

        // Copy to display canvas
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
      removeScrollLock(); // Restore scroll as soon as fade begins
      setFadeOut(true);
    }, 4200);
    const hideTimer = setTimeout(() => {
      removeScrollLock(); // Safety net
      setHidden(true);
      if (onFinished) onFinished();
    }, 5400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      video.removeEventListener('canplay', onCanPlay);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      // Always remove scroll lock on cleanup (handles HMR / StrictMode)
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

      {/* Canvas: transparent bg so loading screen color shows through cleanly */}
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
