(function () {
    const comp = {
        name: 'auroraGlow',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 1010);
            push();
            noStroke();

            blendMode(ADD);

            const waveCount = 4 + floor(random() * 3);

            for (let w = 0; w < waveCount; w++) {
                const baseY = height * (0.2 + w * 0.15);
                const wavePhase = seed * 0.001 + w * 0.8;
                const colorShift = w * 60;

                for (let layer = 0; layer < 20; layer++) {
                    const t = layer / 20;
                    const alpha = lerp(45, 2, t);

                    const r = lerp(100 + colorShift, 180 + colorShift * 0.5, t);
                    const g = lerp(180 - colorShift * 0.3, 220, t);
                    const b = lerp(220 + colorShift * 0.2, 255, t);

                    fill(r, g, b, alpha);

                    beginShape();
                    for (let x = 0; x <= width; x += 15) {
                        const noise1 = noise(x * 0.003, wavePhase) * 100;
                        const noise2 = noise(x * 0.006, wavePhase + 0.5) * 50;
                        const y = baseY + noise1 + noise2 + t * 30;
                        vertex(x, y);
                    }
                    for (let x = width; x >= 0; x -= 15) {
                        const noise1 = noise(x * 0.003, wavePhase) * 100;
                        const noise2 = noise(x * 0.006, wavePhase + 0.5) * 50;
                        const y = baseY + noise1 + noise2 + t * 30 + 50;
                        vertex(x, y);
                    }
                    endShape(CLOSE);
                }
            }

            for (let i = 0; i < 60; i++) {
                const px = random() * width;
                const py = random() * height * 0.7;
                const psize = random() * 2.5 + 0.8;
                const colorMix = random();

                if (colorMix > 0.6) {
                    fill(150, 220, 255, random() * 60 + 30);
                } else if (colorMix > 0.3) {
                    fill(180, 255, 220, random() * 50 + 25);
                } else {
                    fill(200, 180, 255, random() * 55 + 28);
                }

                ellipse(px, py, psize, psize);
            }

            for (let i = 0; i < 25; i++) {
                const shimmerX = random() * width;
                const shimmerY = random() * height * 0.6;
                const shimmerSize = 20 + random() * 40;
                const shimmerAngle = random(TWO_PI);

                push();
                translate(shimmerX, shimmerY);
                rotate(shimmerAngle);

                fill(180, 220, 255, 15);
                ellipse(0, 0, shimmerSize * 2, shimmerSize * 0.4);

                fill(200, 255, 220, 10);
                ellipse(0, 0, shimmerSize * 1.5, shimmerSize * 0.3);

                pop();
            }

            blendMode(BLEND);
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
