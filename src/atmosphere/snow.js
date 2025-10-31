(function () {
    const comp = {
        name: 'snow',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 1212);
            push();
            noStroke();

            const flakeCount = floor(50 + random() * 100);

            for (let i = 0; i < flakeCount; i++) {
                const x = random() * width;
                const y = random() * height;
                const size = random() * 6 + 2;
                const drift = sin((y + seed * 0.01) * 0.05) * 30;
                const flakeX = x + drift;

                const brightness = 220 + random() * 35;
                fill(brightness, brightness, brightness + 10, 200 + random() * 55);
                ellipse(flakeX, y, size, size);

                fill(brightness + 15, brightness + 15, brightness + 20, 120);
                ellipse(flakeX, y, size * 0.5, size * 0.5);

                if (size > 5 && random() > 0.6) {
                    stroke(brightness, brightness, brightness + 10, 150);
                    strokeWeight(0.8);
                    for (let a = 0; a < 6; a++) {
                        const angle = (a / 6) * TWO_PI;
                        const armLen = size * 1.2;
                        line(flakeX, y,
                            flakeX + cos(angle) * armLen,
                            y + sin(angle) * armLen);
                    }
                    noStroke();
                }
            }

            blendMode(ADD);
            for (let i = 0; i < 30; i++) {
                const px = random() * width;
                const py = random() * height;
                const psize = random() * 15 + 5;

                fill(240, 245, 255, random() * 30 + 10);
                ellipse(px, py, psize, psize);
            }
            blendMode(BLEND);

            for (let layer = 0; layer < 5; layer++) {
                const layerY = height - layer * 15;
                const driftAmount = layer * 2;

                fill(240, 245, 250, 80 - layer * 12);

                beginShape();
                for (let x = 0; x <= width; x += 20) {
                    const noiseVal = noise(x * 0.01 + layer * 0.5, seed * 0.001);
                    const y = layerY + noiseVal * 10 + driftAmount;
                    vertex(x, y);
                }
                vertex(width, height);
                vertex(0, height);
                endShape(CLOSE);
            }

            for (let mound = 0; mound < 12; mound++) {
                const mx = random() * width;
                const my = height - random() * 40;
                const msize = 20 + random() * 50;

                fill(235, 240, 250, 180);
                ellipse(mx, my, msize, msize * 0.5);

                fill(245, 250, 255, 120);
                ellipse(mx - msize * 0.2, my - msize * 0.1, msize * 0.4, msize * 0.2);
            }

            fill(245, 250, 255, 20);
            rect(0, 0, width, height);

            pop();
        }
    };

    if (window.Atmosphere) window.Atmosphere.register(comp);
    else window.addEventListener('load', () => window.Atmosphere && window.Atmosphere.register(comp));
})();
