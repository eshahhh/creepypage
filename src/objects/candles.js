(function () {
    const comp = {
        name: 'candles',
        apply(seed, lighting) {
            if (seed !== undefined) randomSeed(seed + 4040);
            push();
            noStroke();
            const baseX = width * (0.1 + random() * 0.8);
            const baseY = height * (0.6 + random() * 0.3);
            const count = floor(2 + random() * 6);
            for (let i = 0; i < count; i++) {
                const x = baseX + random(-120, 120);
                const y = baseY - random(0, 80);
                const h = 8 + random() * 30;
                fill(230, 230, 210);
                rect(x - 3, y - h, 6, h, 2);
                let fr = 255, fg = 200, fb = 120;
                if (lighting === 'redGlow') { fr = 255; fg = 120; fb = 120; }
                else if (lighting === 'fullMoon') { fr = 220; fg = 240; fb = 255; }
                blendMode(ADD);
                for (let g = 0; g < 4; g++) {
                    fill(fr, fg, fb, map(g, 0, 3, 90, 6));
                    ellipse(x + random(-2, 2), y - h - g * 6 + random(-2, 2), 8 + g * 6, 6 + g * 6);
                }
                blendMode(BLEND);
            }
            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
