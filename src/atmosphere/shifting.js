(function () {
    const comp = {
        name: 'shifting',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 305);
            push();
            noStroke();
            blendMode(ADD);
            for (let i = 0; i < 3; i++) {
                const alpha = 6 + i * 6;
                fill(60, 70, 90, alpha);
                const ox = random(-6, 6);
                const oy = random(-6, 6);
                push();
                translate(ox, oy);
                rect(-10, -10, width + 20, height + 20);
                pop();
            }
            blendMode(BLEND);
            pop();
        }
    };

    if (window.Atmosphere) window.Atmosphere.register(comp);
    else window.addEventListener('load', () => window.Atmosphere && window.Atmosphere.register(comp));
})();
