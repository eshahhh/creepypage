(function () {
    const comp = {
        name: 'fireflies',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 808);
            push();
            noStroke();

            const flyCount = floor(15 + random() * 25);
            const flies = [];

            for (let i = 0; i < flyCount; i++) {
                flies.push({
                    x: random() * width,
                    y: random() * height * 0.8 + height * 0.1,
                    phase: random(TWO_PI),
                    speed: 0.5 + random() * 1.5,
                    size: 8 + random() * 15
                });
            }

            blendMode(ADD);

            for (let fly of flies) {
                const intensity = 0.7 + sin(fly.phase + seed * 0.05) * 0.3;
                const flySize = fly.size * intensity;

                for (let layer = 0; layer < 10; layer++) {
                    const t = layer / 10;
                    const layerSize = flySize * (1 + t * 3);
                    const alpha = lerp(80, 3, t) * intensity;
                    const colorTemp = 255 - t * 30;
                    fill(colorTemp, colorTemp - 20, 100 - t * 20, alpha);
                    ellipse(fly.x, fly.y, layerSize, layerSize);
                }

                fill(255, 255, 220, 180 * intensity);
                ellipse(fly.x, fly.y, flySize * 0.3, flySize * 0.3);

                fill(255, 245, 200, 140 * intensity);
                ellipse(fly.x + flySize * 0.1, fly.y - flySize * 0.05, flySize * 0.15, flySize * 0.15);

                for (let p = 0; p < 8; p++) {
                    const angle = (p / 8) * TWO_PI;
                    const dist = flySize * (0.8 + random() * 0.4);
                    const px = fly.x + cos(angle) * dist;
                    const py = fly.y + sin(angle) * dist;
                    const psize = random() * 2 + 0.5;

                    fill(255, 240, 180, random() * 50 * intensity + 20);
                    ellipse(px, py, psize, psize);
                }

                if (intensity > 0.85) {
                    const trailLength = flySize * 1.5;
                    const trailAngle = random(TWO_PI);

                    for (let t = 0; t < 1; t += 0.2) {
                        const tx = fly.x - cos(trailAngle) * trailLength * t;
                        const ty = fly.y - sin(trailAngle) * trailLength * t;
                        const tAlpha = (1 - t) * 40 * intensity;

                        fill(255, 240, 180, tAlpha);
                        ellipse(tx, ty, flySize * (0.4 - t * 0.2), flySize * (0.4 - t * 0.2));
                    }
                }
            }

            for (let i = 0; i < 30; i++) {
                const px = random() * width;
                const py = random() * height * 0.8 + height * 0.1;
                const psize = random() * 1.5 + 0.5;
                const brightness = 240 + random() * 15;

                fill(brightness, brightness - 10, 100, random() * 60 + 20);
                ellipse(px, py, psize, psize);
            }

            blendMode(BLEND);
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
