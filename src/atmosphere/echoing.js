(function () {
    const comp = {
        name: 'echoing',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 512);
            push();
            noStroke();
            blendMode(ADD);
            for (let i = 0; i < 6; i++) {
                fill(180, 190, 210, 6 + random() * 8);
                const cx = width * (0.05 + random() * 0.9);
                const cy = height * (0.02 + random() * 0.96);
                const rw = 20 + random() * 200;
                const rh = 10 + random() * 120;
                ellipse(cx, cy, rw, rh);
            }
            blendMode(BLEND);
            pop();
        }
    };

    if (window.Atmosphere) window.Atmosphere.register(comp);
    else window.addEventListener('load', () => window.Atmosphere && window.Atmosphere.register(comp));
})();
