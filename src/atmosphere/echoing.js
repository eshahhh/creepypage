(function () {
    const comp = {
        name: 'echoing',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 512);
            push();

            noStroke();
            blendMode(ADD);

            const echoCount = 3 + floor(random() * 3);
            for (let e = 0; e < echoCount; e++) {
                const cx = width * (0.1 + random() * 0.8);
                const cy = height * (0.1 + random() * 0.8);
                const maxRadius = 100 + random() * 250;
                const rippleCount = 6 + floor(random() * 4);

                for (let i = 0; i < rippleCount; i++) {
                    const t = i / rippleCount;
                    const radius = maxRadius * t;
                    const alpha = 25 * (1 - t) * (1 - t);

                    fill(180, 190, 210, alpha * (0.5 + random() * 0.5));
                    ellipse(cx, cy, radius * 2, radius * 1.5);

                    fill(190, 200, 220, alpha * 0.4);
                    ellipse(cx, cy, radius * 2 * 1.05, radius * 1.5 * 1.05);
                }
            }

            for (let i = 0; i < 5; i++) {
                const waveY = height * (0.2 + i * 0.15);
                const wavePhase = seed * 0.001 + i * 0.5;

                fill(160, 170, 200, 8 + random() * 8);

                beginShape();
                for (let x = 0; x <= width; x += 10) {
                    const offset = sin(x * 0.02 + wavePhase) * 20;
                    vertex(x, waveY + offset);
                }
                for (let x = width; x >= 0; x -= 10) {
                    const offset = sin(x * 0.02 + wavePhase) * 20;
                    vertex(x, waveY + offset + 15);
                }
                endShape(CLOSE);
            }

            for (let i = 0; i < 8; i++) {
                const tx = width * (0.1 + random() * 0.8);
                const ty = height * (0.05 + random() * 0.9);
                const trailLength = 30 + random() * 100;
                const trailAngle = random(TWO_PI);

                for (let t = 0; t < 1; t += 0.15) {
                    const alpha = 20 * (1 - t);
                    fill(170, 180, 200, alpha);
                    const px = tx + cos(trailAngle) * trailLength * t;
                    const py = ty + sin(trailAngle) * trailLength * t;
                    const size = (8 + random() * 15) * (1 - t * 0.5);
                    ellipse(px, py, size, size * 0.7);
                }
            }

            for (let i = 0; i < 3; i++) {
                fill(180, 190, 210, 4 + random() * 6);
                const bandHeight = height * (0.2 + random() * 0.3);
                const bandY = height * random();
                rect(0, bandY, width, bandHeight);
            }

            blendMode(BLEND);
            pop();
        }
    };

    if (window.Atmosphere) window.Atmosphere.register(comp);
    else window.addEventListener('load', () => window.Atmosphere && window.Atmosphere.register(comp));
})();
