(function () {
    const comp = {
        name: 'candles',
        apply(seed, lighting) {
            if (seed !== undefined) randomSeed(seed + 4040);
            push();
            noStroke();

            const baseX = width * (0.1 + random() * 0.8);
            const baseY = height * (0.6 + random() * 0.3);
            const count = floor(3 + random() * 8);

            for (let i = 0; i < count; i++) {
                const x = baseX + random(-140, 140);
                const y = baseY - random(0, 100);
                const h = 12 + random() * 40;
                const radius = 3 + random() * 3;
                const flicker = 0.85 + random() * 0.15;
                const melt = random() * 0.3;

                fill(230, 228, 208);

                rect(x - radius, y - h, radius * 2, h, radius * 0.5);

                fill(235, 233, 213);
                ellipse(x, y - h, radius * 2.2, radius);

                const dripCount = floor(random() * 3);
                for (let d = 0; d < dripCount; d++) {
                    const dripX = x + random(-radius, radius);
                    const dripStart = y - h + random(h * 0.2, h * 0.7);
                    const dripLength = random(5, 15);

                    fill(225, 223, 203, 200);
                    beginShape();
                    vertex(dripX - 1, dripStart);
                    vertex(dripX + 1, dripStart);
                    vertex(dripX + 0.5, dripStart + dripLength);
                    vertex(dripX - 0.5, dripStart + dripLength);
                    endShape(CLOSE);

                    ellipse(dripX, dripStart + dripLength, 2, 3);
                }

                fill(220, 218, 200, 180);
                ellipse(x, y, radius * 3, radius * 1.5);

                stroke(40, 35, 30);
                strokeWeight(1);
                line(x, y - h, x, y - h - 3);
                noStroke();

                let fr = 255, fg = 200, fb = 120;
                if (lighting === 'redGlow') {
                    fr = 255; fg = 140; fb = 130;
                } else if (lighting === 'fullMoon') {
                    fr = 230; fg = 245; fb = 255;
                } else if (lighting === 'staticGlow') {
                    fr = 245; fg = 250; fb = 255;
                }

                blendMode(ADD);

                for (let g = 0; g < 6; g++) {
                    const glowAlpha = map(g, 0, 5, 100 * flicker, 6);
                    fill(fr, fg - g * 8, fb - g * 12, glowAlpha);
                    const flameX = x + random(-2, 2);
                    const flameY = y - h - g * 7 + random(-2, 2);
                    const flameW = (8 + g * 7) * flicker;
                    const flameH = (10 + g * 8) * flicker;
                    ellipse(flameX, flameY, flameW, flameH);
                }

                fill(255, 255, 240, 180 * flicker);
                ellipse(x, y - h - 5, 4 * flicker, 6 * flicker);

                fill(fr, constrain(fg - 40, 100, 255), constrain(fb - 50, 60, 255), 140 * flicker);
                ellipse(x + random(-1, 1), y - h - 15, 3 * flicker, 5 * flicker);

                for (let p = 0; p < 5; p++) {
                    const px = x + random(-10, 10);
                    const py = y - h - random(15, 35);
                    const psize = random() * 2 + 0.5;
                    fill(fr, fg, fb, random() * 40 * flicker);
                    ellipse(px, py, psize, psize * 1.5);
                }

                blendMode(BLEND);
                noFill();
                stroke(80, 75, 70, 60);
                strokeWeight(1.5);

                beginShape();
                for (let s = 0; s < 5; s++) {
                    const smokeX = x + sin(s * 0.8) * (5 + s * 2);
                    const smokeY = y - h - 20 - s * 8;
                    curveVertex(smokeX, smokeY);
                }
                endShape();
                noStroke();

                blendMode(ADD);
                fill(fr, fg, fb, 20 * flicker);
                ellipse(x, y + 5, radius * 8, radius * 2);

                blendMode(BLEND);
            }

            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
