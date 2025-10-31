(function () {
    const comp = {
        name: 'redGlow',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 404);
            push();
            noStroke();

            const cx = width * (0.15 + random() * 0.7);
            const cy = height * (0.25 + random() * 0.5);
            const r = min(width, height) * 0.15 + random() * min(width, height) * 0.07;
            const pulse = 0.88 + sin(seed * 0.1) * 0.12;

            blendMode(ADD);

            for (let layer = 0; layer < 25; layer++) {
                const t = layer / 25;
                const layerRadius = r * (2 + t * 6);
                const alpha = lerp(120, 2, pow(t, 0.75)) * pulse;
                const redIntensity = lerp(245, 180, t);
                const greenTint = lerp(40, 80, t);
                fill(redIntensity, greenTint, 25, alpha);
                ellipse(cx, cy, layerRadius, layerRadius * 0.9);
            }

            for (let ring = 0; ring < 4; ring++) {
                const ringRadius = r * (1.5 + ring * 0.8);
                const segments = 16 + ring * 8;

                for (let s = 0; s < segments; s++) {
                    const angle = (s / segments) * TWO_PI + seed * 0.02;
                    const offsetX = cos(angle) * ringRadius;
                    const offsetY = sin(angle) * ringRadius * 0.85;
                    const pSize = r * (0.1 - ring * 0.015);
                    const pAlpha = (30 - ring * 6) * pulse;

                    fill(240, 50 + ring * 15, 30, pAlpha);
                    ellipse(cx + offsetX, cy + offsetY, pSize, pSize);
                }
            }

            for (let i = 0; i < 70; i++) {
                const angle = random(TWO_PI);
                const dist = sqrt(random()) * r * 3;
                const px = cx + cos(angle) * dist;
                const py = cy + sin(angle) * dist * 0.9;
                const psize = random() * 3.5 + 0.8;
                const intensity = 1 - (dist / (r * 3));
                const heat = random();

                if (heat > 0.75) {
                    fill(255, 200 + random() * 55, 100 + random() * 50, random() * 80 * pulse * intensity);
                } else if (heat > 0.45) {
                    fill(240, 80 + random() * 60, 40 + random() * 40, random() * 65 * pulse * intensity);
                } else {
                    fill(210, 40 + random() * 50, 25, random() * 50 * pulse * intensity);
                }

                ellipse(px, py, psize, psize);

                if (random() > 0.7) {
                    fill(255, 120, 60, random() * 25 * pulse * intensity);
                    ellipse(px, py, psize * 2.5, psize * 2.5);
                }
            }

            for (let i = 5; i >= 0; i--) {
                const coreT = i / 5;
                const coreAlpha = lerp(220, 70, coreT) * pulse;
                fill(255, 160 + i * 15, 90 + i * 12, coreAlpha);
                ellipse(cx, cy, r * (0.5 - coreT * 0.15), r * (0.5 - coreT * 0.15));
            }

            noFill();
            for (let t = 0; t < 10; t++) {
                stroke(230 + random() * 25, 60 + random() * 40, 35, 35 * pulse);
                strokeWeight(2.5 + random() * 3.5);

                beginShape();
                const startAngle = random(TWO_PI);
                for (let p = 0; p < 12; p++) {
                    const dist = r * (0.3 + p * 0.12);
                    const angle = startAngle + p * 0.35 + sin(p + seed * 0.01) * 0.6;
                    const x = cx + cos(angle) * dist;
                    const y = cy + sin(angle) * dist;
                    curveVertex(x, y);
                }
                endShape();
            }
            noStroke();

            const groundY = height;
            const groundGradient = (groundY - cy) / height;
            fill(220, 60, 40, 15 * pulse * groundGradient);
            ellipse(cx, cy + (groundY - cy) * 0.6, r * 4, r * 1.5);

            fill(200, 50, 30, 10 * pulse * groundGradient);
            ellipse(cx, groundY - 15, r * 3, r * 0.8);

            blendMode(BLEND);

            for (let s = 0; s < 6; s++) {
                const smokeX = cx + random(-15, 15);
                const smokeY = cy - r * 0.7 - s * 20;
                const smokeSize = r * (0.35 + s * 0.08);
                fill(45, 12, 12, 70 - s * 10);
                ellipse(smokeX, smokeY, smokeSize, smokeSize * 1.3);
            }

            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
