(function () {
    const comp = {
        name: 'candlelight',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 202);
            push();
            noStroke();

            const cx = width * (0.15 + random() * 0.7);
            const cy = height * (0.6 + random() * 0.3);
            const r = 50 + random() * 70;
            const flicker = 0.88 + random() * 0.12;

            blendMode(ADD);

            for (let layer = 0; layer < 20; layer++) {
                const t = layer / 20;
                const layerRadius = r * (2.5 + t * 4);
                const alpha = map(t, 0, 1, 45, 1) * flicker;
                const colorShift = t * 60;
                fill(255 - colorShift, 180 - colorShift, 90 - colorShift, alpha);
                ellipse(cx, cy, layerRadius, layerRadius * 0.85);
            }

            for (let ring = 0; ring < 3; ring++) {
                const ringRadius = r * (1.2 + ring * 0.8);
                const segments = 16 + ring * 8;

                for (let s = 0; s < segments; s++) {
                    const angle = (s / segments) * TWO_PI;
                    const offsetX = cos(angle) * ringRadius * (0.7 + noise(s * 0.5) * 0.3);
                    const offsetY = sin(angle) * ringRadius * (0.6 + noise(s * 0.3) * 0.4);
                    const pSize = r * (0.08 - ring * 0.02);
                    const pAlpha = (25 - ring * 8) * flicker;

                    fill(255, 190 - ring * 30, 100 - ring * 20, pAlpha);
                    ellipse(cx + offsetX, cy + offsetY, pSize, pSize);
                }
            }

            const groundY = height;
            const groundGradient = (groundY - cy) / height;
            fill(255, 200, 120, 12 * flicker * groundGradient);
            ellipse(cx, cy + (groundY - cy) * 0.6, r * 4, r * 1.5);

            fill(255, 210, 130, 8 * flicker * groundGradient);
            ellipse(cx, groundY - 15, r * 3, r * 0.8);

            for (let i = 0; i < 60; i++) {
                const angle = random(TWO_PI);
                const dist = sqrt(random()) * r * 2.5;
                const px = cx + cos(angle) * dist;
                const py = cy + sin(angle) * dist * 0.7;
                const psize = random() * 2.5 + 0.5;
                const heat = random();
                const intensity = 1 - (dist / (r * 2.5));

                if (heat > 0.7) {
                    fill(255, 245, 210, random() * 25 * flicker * intensity);
                } else if (heat > 0.4) {
                    fill(255, 210, 140, random() * 20 * flicker * intensity);
                } else {
                    fill(255, 170, 90, random() * 15 * flicker * intensity);
                }

                ellipse(px, py, psize, psize * (0.8 + random() * 0.4));
            }

            for (let i = 0; i < 25; i++) {
                const px = cx + random(-r * 0.3, r * 0.3);
                const py = cy - random(r * 0.5, r * 2);
                const psize = random() * 3 + 1;
                const sparkIntensity = random();

                if (sparkIntensity > 0.8) {
                    fill(255, 255, 240, random() * 150 * flicker);
                    ellipse(px, py, psize * 0.5, psize * 0.5);
                }

                fill(255, 200 + random() * 55, 110 + random() * 50, random() * 40 * flicker);
                ellipse(px, py, psize * 2, psize * 2);
            }

            fill(255, 220, 140, 10 * flicker);
            beginShape();
            vertex(cx - r * 0.25, cy);
            vertex(cx + r * 0.25, cy);
            vertex(cx + r * 0.8, height);
            vertex(cx - r * 0.8, height);
            endShape(CLOSE);

            fill(255, 235, 180, 180 * flicker);
            ellipse(cx, cy - r * 0.35, r * 0.18, r * 0.28);

            fill(255, 250, 220, 140 * flicker);
            ellipse(cx + r * 0.03, cy - r * 0.4, r * 0.12, r * 0.22);

            blendMode(BLEND);

            noFill();
            stroke(90, 80, 70, 80 * flicker);
            for (let s = 0; s < 3; s++) {
                strokeWeight(1.5 - s * 0.3);
                beginShape();
                for (let p = 0; p < 8; p++) {
                    const smokeX = cx + sin(p * 0.8 + s) * (8 + p * 3);
                    const smokeY = cy - r * 0.5 - p * 12 - s * 5;
                    curveVertex(smokeX, smokeY);
                }
                endShape();
            }
            noStroke();

            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
