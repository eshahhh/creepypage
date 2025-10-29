(function () {
    const comp = {
        name: 'eyes',
        apply(seed, lighting) {
            if (seed !== undefined) randomSeed(seed + 3030);
            push();
            noStroke();
            for (let i = 0; i < floor(2 + random() * 6); i++) {
                const ex = width * (0.15 + random() * 0.7);
                const ey = height * (0.15 + random() * 0.6);
                const s = 8 + random() * 28;
                let gr = 200, gg = 240, gb = 255;
                if (lighting === 'redGlow') { gr = 255; gg = 120; gb = 120; }
                else if (lighting === 'candlelight' || lighting === 'lantern') { gr = 255; gg = 200; gb = 140; }
                else if (lighting === 'fullMoon') { gr = 200; gg = 220; gb = 255; }
                blendMode(ADD);
                for (let g = 0; g < 6; g++) {
                    fill(gr, gg, gb, map(g, 0, 5, 40, 6));
                    ellipse(ex, ey, s * (1 + g * 0.6), s * (0.6 + g * 0.4));
                }
                blendMode(BLEND);
                fill(max(0, gr - 120), max(0, gg - 120), max(0, gb - 120), 220);
                ellipse(ex, ey, s * 0.5, s * 0.3);
                fill(10, 10, 12);
                ellipse(ex + random(-s * 0.06, s * 0.06), ey + random(-s * 0.06, s * 0.06), s * 0.15, s * 0.15);
            }
            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
