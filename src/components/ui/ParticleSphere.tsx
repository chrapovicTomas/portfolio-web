import React, { useEffect, useRef } from 'react';

export const ParticleSphere: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const particles: any[] = [];
        const numParticles = 1200; // Dense sphere

        // Generate points on the surface of a sphere, plus some ambient dust
        for (let i = 0; i < numParticles; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            // We make a dense "shell" and some random inner particles
            const radius = Math.random() > 0.8 ?
                (150 + Math.random() * 150) : // inner dust
                (280 + Math.random() * 20);   // main surface shell

            particles.push({
                x: radius * Math.sin(phi) * Math.cos(theta),
                y: radius * Math.cos(phi),
                z: radius * Math.sin(phi) * Math.sin(theta),
                baseX: radius * Math.sin(phi) * Math.cos(theta),
                baseY: radius * Math.cos(phi),
                baseZ: radius * Math.sin(phi) * Math.sin(theta),
                size: Math.random() * 1.5 + 0.5,
                glow: Math.random() > 0.95
            });
        }

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            // Mouse coordinate relative to center of canvas
            mouseX = (e.clientX - rect.left) - width / 2;
            mouseY = (e.clientY - rect.top) - height / 2;
        };

        window.addEventListener('mousemove', handleMouseMove);

        let angleX = 0;
        let angleY = 0;

        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Mouse interaction drives the rotation momentum smoothly
            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            // Auto spin gently + mouse influence
            angleY += 0.002 + (targetX * 0.05);
            angleX += 0.001 + (targetY * 0.05);

            const sinY = Math.sin(angleY);
            const cosY = Math.cos(angleY);
            const sinX = Math.sin(angleX);
            const cosX = Math.cos(angleX);

            particles.forEach(p => {
                // Rotate around Y
                const x1 = p.baseX * cosY - p.baseZ * sinY;
                const z1 = p.baseZ * cosY + p.baseX * sinY;

                // Rotate around X
                const y2 = p.baseY * cosX - z1 * sinX;
                const z2 = z1 * cosX + p.baseY * sinX;

                p.x = x1;
                p.y = y2;
                p.z = z2;

                // Simple 3D projection
                const fov = 400;
                const viewZ = z2 + 600; // Camera distance

                if (viewZ > 0) {
                    const scale = fov / viewZ;
                    const projX = (x1 * scale) + width / 2;
                    const projY = (y2 * scale) + height / 2;

                    // Opacity based on Z depth depth-fade
                    const opacity = Math.max(0.05, Math.min(1, (z2 + 300) / 600));

                    ctx.beginPath();
                    ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2);

                    if (p.glow) {
                        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = 'rgba(59, 130, 246, 0.8)'; // Subtle blue glow for premium feel
                    } else {
                        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
                        ctx.shadowBlur = 0;
                    }
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="particle-sphere-wrapper" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '150%', height: '150%', pointerEvents: 'none', zIndex: 0 }}>
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', display: 'block' }}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, transparent 40%, var(--bg-main) 70%)', zIndex: 1 }} />
        </div>
    );
};
