(function () {
    const comp = {
        name: 'shifting',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 305);
            push();

            blendMode(ADD);

            const channels = [
                { r: 80, g: 50, b: 90, offset: { x: -4, y: -2 } },
                { r: 50, g: 80, b: 90, offset: { x: 0, y: 0 } },
                { r: 60, g: 70, b: 100, offset: { x: 4, y: 2 } }
            ];

            for (let c = 0; c < channels.length; c++) {
                const ch = channels[c];
                const alpha = 8 + c * 4;
                fill(ch.r, ch.g, ch.b, alpha);

                push();
                translate(ch.offset.x + random(-2, 2), ch.offset.y + random(-2, 2));
                rect(-10, -10, width + 20, height + 20);
                pop();
            }

            for (let i = 0; i < 6; i++) {
                const sectionX = random() * width;
                const sectionY = random() * height;
                const sectionW = 50 + random() * 150;
                const sectionH = 20 + random() * 80;
                const shiftX = random(-15, 15);
                const shiftY = random(-10, 10);

                fill(60, 75, 95, 15 + random() * 10);
                push();
                translate(shiftX, shiftY);
                rect(sectionX, sectionY, sectionW, sectionH);
                pop();

                fill(80, 90, 110, 8);
                rect(sectionX - 2, sectionY, sectionW + 4, sectionH);
            }

            for (let x = 0; x < width; x += 20 + floor(random() * 40)) {
                const lineWidth = 1 + random() * 3;
                const shiftAmount = random(-8, 8);
                fill(70, 80, 100, 12 + random() * 8);
                rect(x + shiftAmount, -10, lineWidth, height + 20);
            }

            for (let i = 0; i < 5; i++) {
                const bandY = random() * height;
                const bandHeight = 2 + random() * 12;
                const bandShift = random(-20, 20);

                fill(65, 75, 95, 20 + random() * 15);
                rect(bandShift, bandY, width, bandHeight);

                fill(90, 100, 120, 10);
                rect(bandShift + random(-10, 10), bandY, random(50, 200), bandHeight);
            }

            for (let i = 0; i < 8; i++) {
                const noiseX = random() * width;
                const noiseY = random() * height;
                const noiseSize = 30 + random() * 80;
                const pixelSize = 4 + floor(random() * 8);

                for (let py = 0; py < noiseSize; py += pixelSize) {
                    for (let px = 0; px < noiseSize; px += pixelSize) {
                        if (random() > 0.7) {
                            const brightness = 60 + random() * 40;
                            fill(brightness, brightness + 10, brightness + 30, random() * 20);
                            rect(noiseX + px, noiseY + py, pixelSize, pixelSize);
                        }
                    }
                }
            }

            noFill();
            stroke(70, 85, 105, 15);
            for (let w = 0; w < 4; w++) {
                strokeWeight(2 + random() * 3);

                beginShape();
                for (let x = 0; x <= width; x += 15) {
                    const y = height * (0.3 + w * 0.15) +
                        sin(x * 0.02 + seed * 0.01) * 30 +
                        cos(x * 0.03 + seed * 0.02) * 20;
                    vertex(x, y);
                }
                endShape();
            }

            noStroke();
            for (let g = 0; g < 10; g++) {
                const gx = random() * width;
                const gy = random() * height;
                const gsize = 20 + random() * 60;
                const ghostAlpha = 8 + random() * 8;

                fill(65, 75, 95, ghostAlpha);
                ellipse(gx, gy, gsize, gsize * 0.7);

                fill(75, 85, 105, ghostAlpha * 0.6);
                ellipse(gx + random(-10, 10), gy + random(-10, 10), gsize * 0.8, gsize * 0.6);
            }

            blendMode(BLEND);
            pop();
        }
    };

    if (window.Atmosphere) window.Atmosphere.register(comp);
    else window.addEventListener('load', () => window.Atmosphere && window.Atmosphere.register(comp));
})();
