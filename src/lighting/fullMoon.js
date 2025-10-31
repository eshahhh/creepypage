(function () {
    const comp = {
        name: 'fullMoon',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 101);
            push();
            noStroke();

            const mx = width * (0.25 + random() * 0.5);
            const my = height * (0.1 + random() * 0.2);
            const r = min(width, height) * 0.1 + random() * min(width, height) * 0.05;

            blendMode(ADD);

            for (let layer = 0; layer < 30; layer++) {
                const t = layer / 30;
                const layerRadius = r * (2 + t * 8);
                const alpha = lerp(180, 1, pow(t, 0.8));
                const colorTemp = 250 - t * 15;
                fill(colorTemp, colorTemp, 245 - t * 10, alpha);
                ellipse(mx, my, layerRadius, layerRadius);
            }

            for (let ring = 0; ring < 5; ring++) {
                const ringRadius = r * (3 + ring * 1.2);
                const alpha = 25 - ring * 4;
                fill(248, 250, 235, alpha);
                ellipse(mx, my, ringRadius * 2, ringRadius * 2);
            }

            for (let i = 0; i < 80; i++) {
                const angle = random(TWO_PI);
                const dist = sqrt(random()) * r * 6;
                const px = mx + cos(angle) * dist;
                const py = my + sin(angle) * dist * 0.8;
                const psize = random() * 2.5 + 0.5;
                const brightness = 245 + random() * 10;
                const intensity = 1 - (dist / (r * 6));

                fill(brightness, brightness, brightness - 5, random() * 100 * intensity + 20);
                ellipse(px, py, psize, psize);
            }

            const groundY = height;
            const groundGradient = (groundY - my) / height;
            for (let i = 0; i < 8; i++) {
                const t = i / 8;
                const alpha = 20 * (1 - t) * groundGradient;
                fill(248, 250, 235, alpha);
                ellipse(mx, my + (groundY - my) * t, r * (4 + t * 4), r * (2 + t));
            }

            fill(248, 250, 230, 6);
            beginShape();
            vertex(mx - r * 0.8, my + r);
            vertex(mx + r * 0.8, my + r);
            vertex(mx + r * 2.5, groundY);
            vertex(mx - r * 2.5, groundY);
            endShape(CLOSE);

            blendMode(BLEND);

            fill(252, 252, 235, 250);
            ellipse(mx, my, r * 2, r * 2);

            fill(240, 242, 222, 130);
            ellipse(mx - r * 0.45, my - r * 0.35, r * 0.55, r * 0.55);
            fill(245, 247, 227, 90);
            ellipse(mx - r * 0.45, my - r * 0.38, r * 0.45, r * 0.45);

            fill(240, 242, 222, 110);
            ellipse(mx + r * 0.5, my + r * 0.25, r * 0.4, r * 0.4);
            fill(245, 247, 227, 80);
            ellipse(mx + r * 0.5, my + r * 0.22, r * 0.32, r * 0.32);

            fill(238, 240, 220, 95);
            ellipse(mx - r * 0.15, my + r * 0.55, r * 0.45, r * 0.45);
            ellipse(mx + r * 0.25, my - r * 0.5, r * 0.7, r * 0.6);

            fill(225, 230, 215, 55);
            ellipse(mx - r * 0.35, my + r * 0.35, r * 0.55, r * 0.5);
            ellipse(mx + r * 0.6, my - r * 0.2, r * 0.5, r * 0.45);

            fill(255, 255, 248, 170);
            arc(mx - r * 0.85, my - r * 0.85, r * 0.7, r * 0.7, 0, PI);

            noFill();
            stroke(255, 255, 248, 90);
            strokeWeight(2.5);
            arc(mx, my, r * 2.1, r * 2.1, -PI * 0.75, -PI * 0.25);
            strokeWeight(1.5);
            arc(mx, my, r * 2.15, r * 2.15, PI * 0.15, PI * 0.55);
            noStroke();

            fill(235, 238, 223, 70);
            for (let i = 0; i < 8; i++) {
                const craterAngle = random(TWO_PI);
                const craterDist = random() * r * 0.6;
                const cx = mx + cos(craterAngle) * craterDist;
                const cy = my + sin(craterAngle) * craterDist;
                const craterSize = random() * r * 0.25 + r * 0.1;
                ellipse(cx, cy, craterSize, craterSize * 0.9);
            }

            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
