(function () {
    const comp = {
        name: 'staticGlow',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 303);
            push();
            noStroke();
            fill(255, 255, 255, 10 + random() * 10);
            rect(0, 0, width, height);
            stroke(255, 255, 255, 6 + random() * 6);
            for (let i = 0; i < 28; i++) {
                const y = random() * height;
                line(0, y, width, y);
            }
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
