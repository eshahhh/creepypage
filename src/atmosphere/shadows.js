(function () {
    const comp = {
        name: 'shadows',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 1414);
            push();
            noStroke();

            const shadowCount = floor(6 + random() * 10);

            for (let s = 0; s < shadowCount; s++) {
                const sx = random() * width;
                const sy = random() * height * 0.8;
                const swidth = 40 + random() * 120;
                const sheight = 60 + random() * 180;
                const angle = random(-0.3, 0.3);
                const opacity = 0.5 + random() * 0.5;

                push();
                translate(sx, sy);
                rotate(angle);

                fill(5, 5, 10, 80 * opacity);
                ellipse(0, 0, swidth, sheight);

                fill(8, 8, 12, 60 * opacity);
                ellipse(0, -sheight * 0.2, swidth * 0.7, sheight * 0.6);

                if (random() > 0.5) {
                    fill(3, 3, 8, 70 * opacity);
                    rect(-swidth * 0.15, -sheight * 0.8, swidth * 0.3, sheight * 0.6);
                    ellipse(0, -sheight * 0.8, swidth * 0.35, swidth * 0.35);
                }

                for (let i = 0; i < 5; i++) {
                    const t = i / 5;
                    fill(6, 6, 10, (50 - t * 40) * opacity);
                    ellipse(0, t * sheight * 0.3, swidth * (1 + t * 0.3), sheight * (0.7 - t * 0.2));
                }

                pop();
            }

            for (let tendril = 0; tendril < 12; tendril++) {
                const startX = random() * width;
                const startY = random() * height * 0.6;
                const segments = floor(8 + random() * 10);

                noFill();
                stroke(8, 8, 12, 60 + random() * 40);
                strokeWeight(3 + random() * 8);

                beginShape();
                for (let seg = 0; seg < segments; seg++) {
                    const t = seg / segments;
                    const x = startX + (random() - 0.5) * 80;
                    const y = startY + t * 120 + sin(seg * 0.6) * 25;
                    const fade = 1 - t;

                    stroke(8, 8, 12, (60 + random() * 40) * fade);
                    curveVertex(x, y);
                }
                endShape();
            }

            noStroke();

            for (let wisp = 0; wisp < 15; wisp++) {
                const wx = random() * width;
                const wy = random() * height * 0.7;
                const wsize = 30 + random() * 80;

                for (let layer = 0; layer < 5; layer++) {
                    const t = layer / 5;
                    fill(10, 10, 15, (40 - t * 30));
                    const offsetX = sin(layer + seed * 0.01) * 15;
                    const offsetY = cos(layer + seed * 0.01) * 10;
                    ellipse(wx + offsetX, wy + offsetY, wsize * (1 + t * 0.4), wsize * 0.6 * (1 + t * 0.3));
                }
            }

            fill(5, 5, 8, 30);
            for (let band = 0; band < 8; band++) {
                const bandY = (band / 8) * height;
                const bandHeight = height * 0.15;
                const bandAlpha = 30 + sin(band * 0.8 + seed * 0.01) * 20;

                fill(5, 5, 8, bandAlpha);
                rect(0, bandY, width, bandHeight);
            }

            for (let vignette = 0; vignette < 8; vignette++) {
                const t = vignette / 8;
                const inset = t * min(width, height) * 0.3;
                const alpha = 15 * (1 - t);

                fill(2, 2, 5, alpha);
                rect(inset, inset, width - inset * 2, height - inset * 2);
            }

            pop();
        }
    };

    if (window.Atmosphere) window.Atmosphere.register(comp);
    else window.addEventListener('load', () => window.Atmosphere && window.Atmosphere.register(comp));
})();
