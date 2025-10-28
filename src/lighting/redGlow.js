(function () {
    const comp = {
        name: 'redGlow',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 404);
            push();
            noStroke();
            const cx = width * (0.1 + random() * 0.8);
            const cy = height * (0.2 + random() * 0.6);
            const r = min(width, height) * 0.18 + random() * min(width, height) * 0.08;
            for (let i = 0; i < 6; i++) {
                const s = 1 + i * 0.35;
                const a = map(i, 0, 5, 120, 8);
                fill(200 + random() * 55, 20 + random() * 30, 20, a);
                ellipse(cx, cy, r * s, r * s);
            }
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
