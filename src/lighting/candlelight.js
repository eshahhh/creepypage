(function () {
    const comp = {
        name: 'candlelight',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 202);
            push();
            noStroke();
            const cx = width * (0.15 + random() * 0.7);
            const cy = height * (0.6 + random() * 0.3);
            const r = 60 + random() * 80;
            for (let i = 0; i < 6; i++) {
                const s = 1 - i * 0.12;
                const a = map(i, 0, 5, 160, 6);
                fill(255, 210, 140, a);
                ellipse(cx, cy - i * 6, r * s, r * s);
            }
            blendMode(ADD);
            for (let i = 0; i < 30; i++) {
                fill(255, 200, 140, 8 + random() * 12);
                ellipse(cx + random(-14, 14), cy - random(0, 120), r * random(0.02, 0.28), r * random(0.02, 0.6));
            }
            blendMode(BLEND);
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
