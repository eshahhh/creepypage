(function () {
    const comp = {
        name: 'fullMoon',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 101);
            push();
            noStroke();
            const mx = width * (0.2 + random() * 0.6);
            const my = height * (0.12 + random() * 0.25);
            const r = min(width, height) * 0.12 + random() * min(width, height) * 0.06;
            for (let i = 0; i < 8; i++) {
                const s = 1 + i * 0.45;
                const a = map(i, 0, 7, 200, 8);
                fill(250, 250, 230, a);
                ellipse(mx, my, r * s, r * s);
            }
            fill(250, 250, 230, 20);
            ellipse(mx, my, r * 2.2, r * 1.6);
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
