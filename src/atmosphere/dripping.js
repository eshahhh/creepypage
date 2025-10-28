(function () {
    const comp = {
        name: 'dripping',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 409);
            push();
            noFill();
            stroke(18, 18, 22, 90);
            for (let i = 0; i < floor(8 + random() * 30); i++) {
                const x = random() * width;
                const y = random() * height * 0.6;
                const len = 8 + random() * 120;
                strokeWeight(1 + random() * 2);
                line(x, y, x, y + len);
                noStroke();
                fill(18, 18, 22, 40);
                ellipse(x + random(-1, 1), y + len + random() * 6, 2 + random() * 2, 2 + random() * 2);
            }
            pop();
        }
    };

    if (window.Atmosphere) window.Atmosphere.register(comp);
    else window.addEventListener('load', () => window.Atmosphere && window.Atmosphere.register(comp));
})();
