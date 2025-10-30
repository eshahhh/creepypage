(function () {
    const comp = {
        name: 'redGlow',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 404);
            push();
            noStroke();

            const cx = width * (0.1 + random() * 0.8);
            const cy = height * (0.2 + random() * 0.6);
            const r = min(width, height) * 0.18 + random() * min(width, height) * 0.08;
            const pulse = 0.85 + sin(seed * 0.1) * 0.15;

            blendMode(ADD);

            for (let i = 0; i < 10; i++) {
                const s = 1 + i * 0.4;
                const a = map(i, 0, 9, 140 * pulse, 5);
                const redShift = 200 + random() * 55;
                const greenTint = 20 + i * 3 + random() * 25;
                fill(redShift, greenTint, 18 + i * 2, a);
                ellipse(cx, cy, r * s, r * s);
            }

            for (let angle = 0; angle < TWO_PI; angle += PI / 8) {
                const beamLength = r * (1.2 + random() * 0.8);
                const beamThick = r * 0.2;

                push();
                translate(cx, cy);
                rotate(angle + random(-0.2, 0.2));

                for (let i = 0; i < 5; i++) {
                    const alpha = (40 - i * 7) * pulse;
                    fill(220 + random() * 35, 25 + i * 5, 20, alpha);
                    ellipse(0, -beamLength * 0.5, beamThick - i * 2, beamLength + i * 12);
                }
                pop();
            }

            for (let wave = 0; wave < 6; wave++) {
                noFill();
                stroke(255, 80 + random() * 40, 40, 15 * pulse);
                strokeWeight(2 + random() * 3);

                const waveRadius = r * (0.5 + wave * 0.3);
                const segments = 20;
                beginShape();
                for (let i = 0; i <= segments; i++) {
                    const angle = (i / segments) * TWO_PI;
                    const distortion = sin(angle * 3 + seed * 0.02) * 8;
                    const x = cx + cos(angle) * (waveRadius + distortion);
                    const y = cy + sin(angle) * (waveRadius + distortion);
                    vertex(x, y);
                }
                endShape(CLOSE);
            }
            noStroke();

            for (let i = 0; i < 50; i++) {
                const angle = random(TWO_PI);
                const dist = random() * r * 2;
                const px = cx + cos(angle) * dist;
                const py = cy + sin(angle) * dist;
                const psize = random() * 4 + 1;
                const heat = random();

                if (heat > 0.7) {
                    fill(255, 180 + random() * 75, 80 + random() * 40, random() * 100 * pulse);
                } else if (heat > 0.4) {
                    fill(230, 60 + random() * 50, 30 + random() * 30, random() * 80 * pulse);
                } else {
                    fill(200, 30 + random() * 40, 20, random() * 60 * pulse);
                }

                ellipse(px, py, psize, psize);

                fill(255, 100, 50, random() * 30 * pulse);
                ellipse(px, py, psize * 2.5, psize * 2.5);
            }

            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * TWO_PI + seed * 0.02;
                const spiralRadius = r * 0.3 * (1 - i * 0.1);
                const sx = cx + cos(angle) * spiralRadius;
                const sy = cy + sin(angle) * spiralRadius;

                fill(255, 150 + random() * 105, 60 + random() * 60, (100 - i * 12) * pulse);
                ellipse(sx, sy, r * 0.15, r * 0.15);
            }

            for (let i = 4; i >= 0; i--) {
                const coreAlpha = map(i, 0, 4, 240, 80) * pulse;
                fill(255, 140 + i * 20, 80 + i * 15, coreAlpha);
                ellipse(cx, cy, r * (0.4 - i * 0.06), r * (0.4 - i * 0.06));
            }

            noFill();
            for (let t = 0; t < 8; t++) {
                stroke(220 + random() * 35, 50 + random() * 50, 30, 40 * pulse);
                strokeWeight(3 + random() * 4);

                beginShape();
                const startAngle = random(TWO_PI);
                for (let p = 0; p < 10; p++) {
                    const dist = r * (0.2 + p * 0.15);
                    const angle = startAngle + p * 0.3 + sin(p + seed * 0.01) * 0.5;
                    const x = cx + cos(angle) * dist;
                    const y = cy + sin(angle) * dist;
                    curveVertex(x, y);
                }
                endShape();
            }
            noStroke();

            blendMode(BLEND);
            fill(40, 10, 10, 60);
            for (let s = 0; s < 5; s++) {
                const smokeX = cx + random(-20, 20);
                const smokeY = cy - r * 0.8 - s * 25;
                const smokeSize = r * (0.3 + s * 0.1);
                ellipse(smokeX, smokeY, smokeSize, smokeSize * 1.4);
            }

            blendMode(BLEND);
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
