(function () {
    const comp = {
        name: 'lantern',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 606);
            push();
            noStroke();
            const cx = width * (0.25 + random() * 0.5);
            const cy = height * (0.45 + random() * 0.4);
            const r = 40 + random() * 100;
            for (let i = 0; i < 5; i++) {
                const s = 1 + i * 0.3;
                const a = map(i, 0, 4, 160, 8);
                fill(255, 235, 180, a);
                ellipse(cx, cy, r * s, r * s);
            }
            stroke(80, 60, 40, 50);
            strokeWeight(2);
            line(cx, cy - r * 0.6, cx, cy - r * 1.8);
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
