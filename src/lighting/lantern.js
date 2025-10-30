(function () {
    const comp = {
        name: 'lantern',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 606);
            push();

            const cx = width * (0.25 + random() * 0.5);
            const cy = height * (0.45 + random() * 0.4);
            const r = 40 + random() * 100;
            const sway = sin(seed * 0.05) * 3;
            const flicker = 0.9 + random() * 0.1;

            stroke(80, 60, 40, 200);
            strokeWeight(3);
            noFill();

            const chainLength = r * 1.8;
            const linkCount = 5;
            for (let i = 0; i < linkCount; i++) {
                const linkY = cy - chainLength + (i / linkCount) * chainLength;
                const linkSway = sin(seed * 0.05 + i * 0.3) * (2 + i);
                ellipse(cx + linkSway, linkY, 6, 10);
            }

            strokeWeight(4);
            line(cx + sway, cy - r * 1.8, cx + sway, cy - r * 0.8);

            noStroke();

            blendMode(ADD);
            for (let i = 0; i < 8; i++) {
                const s = 1 + i * 0.35;
                const a = map(i, 0, 7, 180 * flicker, 6);
                fill(255, 235 - i * 5, 180 - i * 10, a);
                ellipse(cx + sway, cy, r * s, r * s);
            }

            for (let angle = PI / 4; angle < PI * 0.75; angle += 0.15) {
                const rayLength = r * (1.2 + random() * 0.5);
                push();
                translate(cx + sway, cy);
                rotate(angle);

                for (let i = 0; i < 4; i++) {
                    fill(255, 220 - i * 15, 160 - i * 20, (25 - i * 5) * flicker);
                    ellipse(0, rayLength * 0.5, r * 0.3 - i * 3, rayLength + i * 15);
                }
                pop();
            }

            fill(255, 230, 170, 40 * flicker);
            const groundDist = height - cy;
            ellipse(cx + sway, height - 10, r * (2 + groundDist * 0.01), r * 0.4);

            blendMode(BLEND);

            fill(80, 60, 40, 240);

            rect(cx + sway - r * 0.5, cy - r * 0.9, r, r * 0.2, 2);
            triangle(cx + sway - r * 0.4, cy - r * 0.9,
                cx + sway + r * 0.4, cy - r * 0.9,
                cx + sway, cy - r * 1.1);

            rect(cx + sway - r * 0.5, cy + r * 0.7, r, r * 0.15, 2);

            stroke(70, 50, 30, 200);
            strokeWeight(4);
            for (let i = 0; i < 4; i++) {
                const postAngle = (i / 4) * TWO_PI;
                const postX = cx + sway + cos(postAngle) * r * 0.45;
                line(postX, cy - r * 0.7, postX, cy + r * 0.7);
            }
            noStroke();

            fill(255, 245, 200, 60);
            for (let i = 0; i < 4; i++) {
                const panelAngle = (i / 4) * TWO_PI;
                push();
                translate(cx + sway, cy);
                rotate(panelAngle);
                rect(-r * 0.35, -r * 0.6, r * 0.7, r * 1.3, 3);

                fill(255, 255, 255, 40 * flicker);
                rect(-r * 0.3, -r * 0.5, r * 0.15, r * 0.6);
                pop();
            }

            push();
            translate(cx + sway, cy);
            blendMode(ADD);

            for (let i = 0; i < 6; i++) {
                const flameAlpha = map(i, 0, 5, 200, 30) * flicker;
                fill(255, 220 - i * 15, 120 - i * 15, flameAlpha);
                ellipse(0, -r * 0.2, r * (0.4 - i * 0.05), r * (0.6 - i * 0.08));
            }

            fill(255, 255, 240, 240 * flicker);
            ellipse(0, -r * 0.15, r * 0.15, r * 0.25);

            fill(255, 200, 100, 180 * flicker);
            ellipse(0, -r * 0.45, r * 0.1, r * 0.2);

            blendMode(BLEND);
            pop();

            noFill();
            stroke(100, 90, 80, 60);
            for (let s = 0; s < 3; s++) {
                strokeWeight(2 + random());

                beginShape();
                for (let p = 0; p < 6; p++) {
                    const smokeY = cy - r - p * 15;
                    const smokeX = cx + sway + sin(p + s) * (10 + p * 3);
                    curveVertex(smokeX, smokeY);
                }
                endShape();
            }
            noStroke();

            blendMode(ADD);
            for (let i = 0; i < 20; i++) {
                const px = cx + sway + random(-r * 1.2, r * 1.2);
                const py = cy + random(-r, r);
                const psize = random() * 3 + 0.5;

                fill(255, 230 + random() * 25, 180 + random() * 20, random() * 80 * flicker);
                ellipse(px, py, psize, psize);
            }
            blendMode(BLEND);

            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
