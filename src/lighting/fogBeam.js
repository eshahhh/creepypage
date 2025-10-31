(function () {
    const comp = {
        name: 'fogBeam',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 505);
            push();
            noStroke();

            const bx = width * (0.15 + random() * 0.7);
            const by = height * (0.05 + random() * 0.35);
            const bw = min(width, height) * 0.18;

            blendMode(ADD);

            for (let layer = 0; layer < 25; layer++) {
                const t = layer / 25;
                const yPos = by + t * (height - by);
                const spread = lerp(bw * 0.6, bw * 2.5, t);
                const turbulence = noise(t * 5 + seed * 0.001) * spread * 0.2;
                const alpha = lerp(60, 2, pow(t, 0.7));

                fill(245, 248, 255, alpha * (0.7 + random() * 0.3));

                beginShape();
                vertex(bx - spread * 0.5 + turbulence, yPos);
                vertex(bx + spread * 0.5 - turbulence, yPos);
                vertex(bx + spread * 0.6, yPos + 30);
                vertex(bx - spread * 0.6, yPos + 30);
                endShape(CLOSE);
            }

            for (let i = 12; i >= 0; i--) {
                const t = i / 12;
                const alpha = lerp(100, 3, t);
                fill(250, 252, 255, alpha);
                ellipse(bx, by, bw * (1.8 - t * 0.3), bw * (1.2 - t * 0.2));
            }

            for (let ring = 0; ring < 4; ring++) {
                const ringDist = bw * (0.8 + ring * 0.5);
                const segments = 12 + ring * 6;

                for (let s = 0; s < segments; s++) {
                    const angle = (s / segments) * TWO_PI;
                    const offsetX = cos(angle) * ringDist;
                    const offsetY = sin(angle) * ringDist * 0.7;
                    const pAlpha = 35 - ring * 8;

                    fill(245, 250, 255, pAlpha);
                    ellipse(bx + offsetX, by + offsetY, bw * 0.08, bw * 0.08);
                }
            }

            for (let i = 0; i < 80; i++) {
                const t = pow(random(), 0.8);
                const yPos = by + t * (height - by);
                const beamWidth = lerp(bw * 0.6, bw * 2.5, t);
                const px = bx + (random() - 0.5) * beamWidth;
                const psize = random() * 3 + 1;
                const brightness = 245 + random() * 10;
                const intensity = 1 - t;

                fill(brightness, brightness + 3, 255, random() * 120 * intensity + 30);
                ellipse(px, yPos, psize, psize);

                if (random() > 0.7) {
                    fill(brightness, brightness + 3, 255, random() * 40 * intensity);
                    ellipse(px, yPos, psize * 3, psize * 3);
                }
            }

            for (let w = 0; w < 12; w++) {
                const wStart = pow(random(), 0.6);
                const wispY = by + wStart * (height - by);
                const wispX = bx + (random() - 0.5) * bw * 2;

                noFill();
                stroke(235, 240, 250, 25 - w * 1.5);
                strokeWeight(3 + random() * 4);

                beginShape();
                for (let p = 0; p < 8; p++) {
                    const x = wispX + p * 20 + random(-15, 15);
                    const y = wispY + p * 15 + sin(p * 0.6) * 20;
                    curveVertex(x, y);
                }
                endShape();
            }
            noStroke();

            for (let c = 0; c < 18; c++) {
                const cy = by + pow(random(), 0.7) * (height - by);
                const cloudSpread = lerp(bw * 0.6, bw * 2.5, (cy - by) / (height - by));
                const cx = bx + (random() - 0.5) * cloudSpread * 0.9;
                const csize = 25 + random() * 50;

                fill(240, 245, 255, random() * 18 + 6);
                ellipse(cx, cy, csize, csize * 0.6);
                ellipse(cx + csize * 0.3, cy + csize * 0.15, csize * 0.7, csize * 0.5);
                ellipse(cx - csize * 0.2, cy - csize * 0.1, csize * 0.6, csize * 0.45);
            }

            fill(248, 250, 255, 8);
            ellipse(bx, by + (height - by) * 0.7, bw * 4, bw * 2);

            blendMode(BLEND);
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
