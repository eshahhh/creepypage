(function () {
    const comp = {
        name: 'foggy',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 201);
            push();
            noStroke();
            for (let i = 0; i < 6; i++) {
                const a = map(i, 0, 5, 40, 8);
                fill(220, 220, 230, a);
                const cx = width * (0.1 + random() * 0.8);
                const cy = height * (0.05 + random() * 0.7);
                const rx = width * (0.4 + random() * 0.8);
                const ry = height * (0.08 + random() * 0.3);
                ellipse(cx, cy + i * 12, rx, ry);
            }

            blendMode(BLEND);
            for (let y = 0; y < height; y += 32) {
                fill(20, 20, 30, 3 + random() * 6);
                rect(0, y, width, 8);
            }
            pop();
        }
    };

    if (window.Atmosphere) window.Atmosphere.register(comp);
    else window.addEventListener('load', () => window.Atmosphere && window.Atmosphere.register(comp));
})();
