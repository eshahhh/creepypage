(function () {
    const comp = {
        name: 'stormLight',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 909);
            push();

            const flashIntensity = random() > 0.7 ? 1 : 0.3 + random() * 0.4;
            const flashX = width * (0.2 + random() * 0.6);
            const flashY = height * (0.1 + random() * 0.3);

            blendMode(ADD);

            if (flashIntensity > 0.8) {
                for (let i = 0; i < 15; i++) {
                    const t = i / 15;
                    const alpha = lerp(200, 5, pow(t, 0.5)) * flashIntensity;
                    fill(250, 252, 255, alpha);
                    rect(0, 0, width, height);
                }

                noStroke();
                const boltSegments = floor(6 + random() * 8);
                let boltX = flashX;
                let boltY = flashY;

                stroke(255, 255, 255, 230 * flashIntensity);
                strokeWeight(4 + random() * 3);

                for (let s = 0; s < boltSegments; s++) {
                    const nextX = boltX + random(-50, 50);
                    const nextY = boltY + random(40, 80);
                    line(boltX, boltY, nextX, nextY);

                    if (random() > 0.6) {
                        const branchX = nextX + random(-40, 40);
                        const branchY = nextY + random(20, 50);
                        strokeWeight(2 + random() * 2);
                        line(nextX, nextY, branchX, branchY);
                        strokeWeight(4 + random() * 3);
                    }

                    boltX = nextX;
                    boltY = nextY;

                    if (boltY > height) break;
                }

                noStroke();

                for (let g = 0; g < 8; g++) {
                    fill(255, 255, 255, (80 - g * 10) * flashIntensity);
                    ellipse(flashX, flashY, (30 + g * 40), (30 + g * 40));
                }
            } else {
                for (let i = 0; i < 10; i++) {
                    const t = i / 10;
                    const alpha = lerp(120, 3, pow(t, 0.6)) * flashIntensity;
                    fill(245, 248, 252, alpha);
                    rect(0, 0, width, height);
                }
            }

            for (let i = 0; i < 40; i++) {
                const px = random() * width;
                const py = random() * height;
                const psize = random() * 3 + 1;
                const brightness = 245 + random() * 10;

                fill(brightness, brightness + 2, 255, random() * 80 * flashIntensity + 20);
                ellipse(px, py, psize, psize);
            }

            fill(245, 248, 252, 15 * flashIntensity);
            for (let band = 0; band < 5; band++) {
                const bandY = (band / 5) * height;
                rect(0, bandY, width, height * 0.15);
            }

            blendMode(BLEND);
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
