(function () {
    const comp = {
        name: 'tombstones',
        apply(seed, lighting) {
            if (seed !== undefined) randomSeed(seed + 1010);
            push();
            noStroke();
            const count = floor(2 + random() * 5);
            for (let i = 0; i < count; i++) {
                const w = 30 + random() * 100;
                const h = 40 + random() * 140;
                const x = constrain(random() * width, 20, width - 20);
                const y = height - (10 + random() * 120);
                let r = 45, g = 45, b = 56;
                if (lighting === 'redGlow') { r = 90; g = 30; b = 30; }
                else if (lighting === 'candlelight' || lighting === 'lantern') { r = 80; g = 70; b = 60; }
                else if (lighting === 'fullMoon') { r = 90; g = 100; b = 120; }
                fill(r, g, b, 240);
                rect(x - w * 0.5, y - h, w, h, 8);
                fill(max(0, r - 10), max(0, g - 10), max(0, b - 10), 200);
                arc(x, y - h, w, w * 0.7, PI, 0, CHORD);
                fill(200, 200, 220, 200);
                textSize(10);
                textAlign(CENTER);
                text('RIP', x, y - h * 0.45);
            }
            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
