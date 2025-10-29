(function () {
    const comp = {
        name: 'sigils',
        apply(seed, lighting) {
            if (seed !== undefined) randomSeed(seed + 6060);
            push();
            noFill();
            const count = floor(1 + random() * 3);
            for (let i = 0; i < count; i++) {
                const cx = width * (0.15 + random() * 0.7);
                const cy = height - (20 + random() * 140);
                const r = 30 + random() * 120;
                let sr = 180, sg = 220, sb = 230;
                if (lighting === 'redGlow') { sr = 230; sg = 90; sb = 90; }
                else if (lighting === 'candlelight' || lighting === 'lantern') { sr = 255; sg = 200; sb = 140; }
                else if (lighting === 'fullMoon') { sr = 180; sg = 210; sb = 255; }
                stroke(sr, sg, sb, 120);
                strokeWeight(2);
                for (let a = 0; a < 360; a += floor(20 + random() * 40)) {
                    const aa = radians(a + random(-8, 8));
                    const rr = r * (0.6 + random() * 0.8);
                    line(cx + cos(aa) * (rr * 0.3), cy + sin(aa) * (rr * 0.3), cx + cos(aa) * rr, cy + sin(aa) * rr);
                }
                noFill();
                ellipse(cx, cy, r * 2, r * 2);
                blendMode(ADD);
                for (let g = 0; g < 3; g++) {
                    stroke(sr, sg, sb, map(g, 0, 2, 40, 6));
                    strokeWeight(8 - g * 2);
                    ellipse(cx, cy, r * 2.2 + g * 10, r * 2.2 + g * 10);
                }
                blendMode(BLEND);
            }
            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
