(function () {
    const comp = {
        name: 'whispers',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 1313);
            push();

            blendMode(ADD);

            const whisperCount = floor(8 + random() * 12);

            for (let w = 0; w < whisperCount; w++) {
                const startX = random() * width;
                const startY = random() * height;
                const pathLength = 80 + random() * 150;
                const segments = floor(10 + random() * 15);

                noFill();
                stroke(180, 190, 220, 40 + random() * 30);
                strokeWeight(1 + random() * 2);

                beginShape();
                for (let s = 0; s < segments; s++) {
                    const t = s / segments;
                    const x = startX + (random() - 0.5) * pathLength * 0.5;
                    const y = startY + t * pathLength + sin(s * 0.5) * 20;
                    const fade = 1 - t;

                    stroke(180, 190, 220, (40 + random() * 30) * fade);
                    curveVertex(x, y);

                    if (random() > 0.8) {
                        noStroke();
                        fill(200, 210, 240, random() * 40 * fade);
                        ellipse(x, y, 8 + random() * 12, 6 + random() * 8);
                        stroke(180, 190, 220, (40 + random() * 30) * fade);
                    }
                }
                endShape();
            }

            noStroke();
            for (let i = 0; i < 40; i++) {
                const px = random() * width;
                const py = random() * height;
                const psize = random() * 4 + 2;
                const pulse = sin((i * 0.8 + seed * 0.01)) * 0.5 + 0.5;

                fill(190, 200, 230, (30 + random() * 40) * pulse);
                ellipse(px, py, psize * (1 + pulse * 0.5), psize * (1 + pulse * 0.5));
            }

            for (let wave = 0; wave < 6; wave++) {
                const waveY = height * (0.2 + wave * 0.12);
                const wavePhase = seed * 0.001 + wave * 0.4;

                fill(170, 180, 210, 12 + random() * 8);

                beginShape();
                for (let x = 0; x <= width; x += 15) {
                    const offset = sin(x * 0.015 + wavePhase) * 25 + cos(x * 0.025 + wavePhase) * 15;
                    vertex(x, waveY + offset);
                }
                for (let x = width; x >= 0; x -= 15) {
                    const offset = sin(x * 0.015 + wavePhase) * 25 + cos(x * 0.025 + wavePhase) * 15;
                    vertex(x, waveY + offset + 20);
                }
                endShape(CLOSE);
            }

            for (let echo = 0; echo < 15; echo++) {
                const cx = random() * width;
                const cy = random() * height;
                const maxRadius = 50 + random() * 100;
                const rings = floor(4 + random() * 4);

                for (let r = 0; r < rings; r++) {
                    const t = r / rings;
                    const radius = maxRadius * t;
                    const alpha = 25 * (1 - t) * (1 - t);

                    fill(180, 190, 220, alpha);
                    ellipse(cx, cy, radius * 2, radius * 1.5);
                }
            }

            blendMode(BLEND);
            pop();
        }
    };

    if (window.Atmosphere) window.Atmosphere.register(comp);
    else window.addEventListener('load', () => window.Atmosphere && window.Atmosphere.register(comp));
})();
