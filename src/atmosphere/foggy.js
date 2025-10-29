(function () {
    const comp = {
        name: 'foggy',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 201);
            push();
            noStroke();

            const fogLayers = 8;
            for (let i = 0; i < fogLayers; i++) {
                const depth = i / fogLayers;
                const alpha = map(i, 0, fogLayers - 1, 50, 6);
                const yOffset = i * 18;

                fill(220, 220, 235, alpha);
                const cx = width * (0.15 + random() * 0.7);
                const cy = height * (0.1 + random() * 0.6) + yOffset;
                const rx = width * (0.5 + random() * 0.7);
                const ry = height * (0.1 + random() * 0.25);

                ellipse(cx, cy, rx, ry);

                fill(210, 215, 230, alpha * 0.6);
                ellipse(cx + rx * 0.3, cy + random(-20, 20), rx * 0.7, ry * 0.8);
                ellipse(cx - rx * 0.25, cy + random(-15, 15), rx * 0.6, ry * 0.7);
            }

            for (let i = 0; i < 5; i++) {
                const groundY = height * (0.75 + i * 0.05);
                fill(215, 220, 230, 25 - i * 4);

                beginShape();
                for (let x = 0; x <= width; x += 30) {
                    const noiseVal = noise(x * 0.01, groundY * 0.01 + seed * 0.0001);
                    const y = groundY + noiseVal * 30;
                    vertex(x, y);
                }
                vertex(width, height);
                vertex(0, height);
                endShape(CLOSE);
            }

            blendMode(BLEND);
            for (let y = 0; y < height; y += 40) {
                const fogDensity = noise(y * 0.01 + seed * 0.0001);
                fill(20, 22, 32, 3 + fogDensity * 8);
                rect(0, y, width, 10 + fogDensity * 15);
            }

            for (let i = 0; i < 40; i++) {
                const px = random() * width;
                const py = random() * height;
                const psize = random() * 4 + 1;
                const brightness = 200 + random() * 55;

                fill(brightness, brightness, brightness + 20, random() * 40 + 20);
                ellipse(px, py, psize, psize);
            }

            noFill();
            stroke(220, 225, 235, 30);
            for (let w = 0; w < 12; w++) {
                strokeWeight(2 + random() * 4);

                beginShape();
                const startX = random() * width;
                const startY = random() * height;

                for (let p = 0; p < 8; p++) {
                    const t = p / 8;
                    const x = startX + (random() - 0.5) * 100;
                    const y = startY + t * 80 + sin(p) * 20;
                    curveVertex(x, y);
                }
                endShape();
            }

            pop();
        }
    };

    if (window.Atmosphere) window.Atmosphere.register(comp);
    else window.addEventListener('load', () => window.Atmosphere && window.Atmosphere.register(comp));
})();
