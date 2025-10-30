(function () {
    const comp = {
        name: 'candlelight',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 202);
            push();
            noStroke();

            const cx = width * (0.15 + random() * 0.7);
            const cy = height * (0.6 + random() * 0.3);
            const r = 60 + random() * 80;
            const flicker = 0.85 + random() * 0.15;

            for (let i = 0; i < 10; i++) {
                const s = 1 - i * 0.09;
                const a = map(i, 0, 9, 180 * flicker, 4);
                const warmth = 255 - i * 5;
                fill(warmth, 210 - i * 8, 140 - i * 10, a);
                ellipse(cx, cy - i * 5, r * s, r * s);
            }

            blendMode(ADD);
            for (let angle = 0; angle < TWO_PI; angle += PI / 12) {
                const rayLength = r * (0.8 + random() * 0.6);
                const rayThickness = r * 0.15;

                push();
                translate(cx, cy);
                rotate(angle + random(-0.2, 0.2));

                for (let i = 0; i < 5; i++) {
                    const alpha = (30 - i * 5) * flicker;
                    fill(255, 200 - i * 10, 130 - i * 10, alpha);
                    ellipse(0, -rayLength * 0.5, rayThickness - i * 2, rayLength + i * 10);
                }
                pop();
            }

            for (let i = 0; i < 40; i++) {
                const px = cx + random(-18, 18);
                const py = cy - random(10, 140);
                const psize = r * random(0.015, 0.25);
                const heat = random();

                if (heat > 0.7) {
                    fill(255, 240, 200, (10 + random() * 15) * flicker);
                } else if (heat > 0.4) {
                    fill(255, 200, 140, (8 + random() * 12) * flicker);
                } else {
                    fill(255, 160, 80, (6 + random() * 10) * flicker);
                }

                ellipse(px, py, psize * (1.5 + random()), psize * random(0.3, 1.2));
            }

            for (let i = 0; i < 15; i++) {
                const sx = cx + random(-25, 25);
                const sy = cy - random(20, 180);
                const sparkSize = random() * 3 + 0.5;

                fill(255, 180 + random() * 75, 100 + random() * 40, random() * 120 * flicker);
                ellipse(sx, sy, sparkSize, sparkSize);

                fill(255, 200, 120, random() * 40 * flicker);
                ellipse(sx, sy, sparkSize * 2.5, sparkSize * 2.5);
            }

            fill(255, 220, 160, 15 * flicker);
            beginShape();
            vertex(cx - r * 0.3, cy);
            vertex(cx + r * 0.3, cy);
            vertex(cx + r * 1.2, cy - r * 2);
            vertex(cx - r * 1.2, cy - r * 2);
            endShape(CLOSE);

            fill(255, 255, 240, 200 * flicker);
            ellipse(cx, cy - r * 0.4, r * 0.2, r * 0.3);
            fill(255, 240, 200, 160 * flicker);
            ellipse(cx, cy - r * 0.3, r * 0.15, r * 0.25);

            blendMode(BLEND);
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
