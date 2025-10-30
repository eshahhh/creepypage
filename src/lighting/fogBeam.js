(function () {
    const comp = {
        name: 'fogBeam',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 505);
            push();
            noStroke();

            const bx = width * (0.1 + random() * 0.8);
            const by = height * (0.0 + random() * 0.45);
            const bw = min(width, height) * 0.24;

            blendMode(ADD);

            for (let beam = 0; beam < 3; beam++) {
                const beamOffset = (beam - 1) * bw * 0.3;
                const beamIntensity = 1 - beam * 0.25;

                for (let i = 0; i < 18; i++) {
                    const t = i / 18;
                    const alpha = map(i, 0, 17, 100 * beamIntensity, 4);
                    const turbulence = noise(i * 0.2 + seed * 0.001) * 20;

                    fill(240, 245, 255, alpha * (0.6 + random() * 0.5));

                    beginShape();
                    vertex(bx + beamOffset - bw * t + turbulence, by + i * 28);
                    vertex(bx + beamOffset + bw * t - turbulence, by + i * 28);
                    vertex(width * (0.5 + beam * 0.1), height);
                    vertex(width * (0.5 - beam * 0.1), height);
                    endShape(CLOSE);
                }
            }

            for (let i = 8; i >= 0; i--) {
                fill(250, 252, 255, 60 - i * 6);
                ellipse(bx, by, bw * (1.5 - i * 0.15), bw * (0.8 - i * 0.08));
            }

            for (let i = 0; i < 60; i++) {
                const t = random();
                const px = bx + random(-bw * t * 1.5, bw * t * 1.5);
                const py = by + random(0, height - by);
                const psize = random() * 4 + 1;
                const brightness = 240 + random() * 15;

                const beamWidth = bw * (py - by) / (height - by) * 1.5;
                if (abs(px - bx) < beamWidth) {
                    fill(brightness, brightness + 5, 255, random() * 100 + 50);
                    ellipse(px, py, psize, psize);

                    fill(brightness, brightness + 5, 255, random() * 30);
                    ellipse(px, py, psize * 3, psize * 3);
                }
            }

            for (let i = 0; i < 25; i++) {
                const t = random();
                const edgeSide = random() > 0.5 ? 1 : -1;
                const edgeX = bx + edgeSide * bw * t * (1 + random() * 0.3);
                const edgeY = by + random() * (height - by);

                fill(245, 248, 255, random() * 40 + 10);
                ellipse(edgeX, edgeY, random() * 8 + 3, random() * 20 + 10);
            }

            noFill();
            stroke(230, 235, 245, 20);
            for (let w = 0; w < 8; w++) {
                strokeWeight(4 + random() * 6);

                beginShape();
                const wispStart = random() * width;
                const wispY = by + random() * (height - by) * 0.7;

                for (let p = 0; p < 6; p++) {
                    const x = wispStart + p * 30 + random(-20, 20);
                    const y = wispY + sin(p * 0.5) * 25 + random(-15, 15);
                    curveVertex(x, y);
                }
                endShape();
            }
            noStroke();

            for (let c = 0; c < 12; c++) {
                const cx = bx + random(-bw, bw);
                const cy = by + random(0, height - by);
                const csize = 20 + random() * 40;

                fill(240, 245, 255, random() * 15 + 5);
                ellipse(cx, cy, csize, csize * 0.6);
                ellipse(cx + csize * 0.3, cy + csize * 0.2, csize * 0.7, csize * 0.4);
            }

            blendMode(BLEND);
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
