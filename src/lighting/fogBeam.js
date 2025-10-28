(function () {
    const comp = {
        name: 'fogBeam',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 505);
            push();
            noStroke();
            const bx = width * (0.1 + random() * 0.8);
            const by = height * (0.0 + random() * 0.45);
            const bw = min(width, height) * 0.24;
            for (let i = 0; i < 14; i++) {
                const alpha = map(i, 0, 13, 90, 6);
                fill(240, 240, 250, alpha * (0.6 + random() * 0.6));
                beginShape();
                vertex(bx - bw * (i / 14), by + i * 26);
                vertex(bx + bw * (i / 14), by + i * 26);
                vertex(width, height);
                vertex(0, height);
                endShape(CLOSE);
            }
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
