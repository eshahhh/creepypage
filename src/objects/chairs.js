(function () {
    const comp = {
        name: 'chairs',
        apply(seed, lighting) {
            if (seed !== undefined) randomSeed(seed + 2020);
            push();
            noStroke();
            const count = floor(1 + random() * 4);
            for (let i = 0; i < count; i++) {
                const x = random() * width;
                const y = height - (10 + random() * 140);
                const sx = 18 + random() * 60;
                const sy = 18 + random() * 60;
                let tintR = 20, tintG = 20, tintB = 24;
                if (lighting === 'candlelight' || lighting === 'lantern') { tintR = 60; tintG = 50; tintB = 38; }
                else if (lighting === 'redGlow') { tintR = 90; tintG = 20; tintB = 20; }
                else if (lighting === 'fullMoon') { tintR = 80; tintG = 95; tintB = 110; }
                fill(tintR, tintG, tintB, 255);
                rect(x - sx * 0.5, y - sy * 0.5, sx, sy, 4);
                rect(x - sx * 0.45, y - sy * 1.2, sx * 0.9, sy * 0.4, 3);
                stroke(10, 10, 12, 200);
                strokeWeight(3);
                line(x - sx * 0.4, y + sy * 0.5, x - sx * 0.4, y + sy);
                line(x + sx * 0.4, y + sy * 0.5, x + sx * 0.4, y + sy);
                noStroke();
            }
            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
