(function () {
    const comp = {
        name: 'fullMoon',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 101);
            push();
            noStroke();

            const mx = width * (0.2 + random() * 0.6);
            const my = height * (0.12 + random() * 0.25);
            const r = min(width, height) * 0.12 + random() * min(width, height) * 0.06;

            for (let i = 12; i >= 0; i--) {
                const s = 1 + i * 0.5;
                const a = map(i, 0, 12, 220, 3);
                const hue = 250 - i * 2;
                fill(hue, hue, 235, a);
                ellipse(mx, my, r * s, r * s);
            }

            blendMode(ADD);
            for (let i = 0; i < 6; i++) {
                fill(245, 248, 230, 15 - i * 2);
                ellipse(mx, my, r * (3.5 + i * 0.5), r * (3 + i * 0.4));
            }
            blendMode(BLEND);

            push();
            blendMode(ADD);
            const rayCount = 8;
            for (let i = 0; i < rayCount; i++) {
                const rayAngle = (i / rayCount) * PI - PI / 2 + random(-0.3, 0.3);
                const rayLength = height * (0.6 + random() * 0.4);
                const rayWidth = r * (0.8 + random() * 0.6);

                push();
                translate(mx, my);
                rotate(rayAngle);

                for (let j = 0; j < 4; j++) {
                    fill(250, 250, 235, 8 - j * 2);
                    ellipse(0, rayLength * 0.5, rayWidth - j * 5, rayLength + j * 20);
                }
                pop();
            }
            blendMode(BLEND);
            pop();

            noStroke();
            blendMode(ADD);
            fill(248, 250, 230, 12);
            beginShape();
            vertex(mx - r * 0.6, my + r * 0.5);
            vertex(mx + r * 0.6, my + r * 0.5);
            vertex(mx + r * 2, height);
            vertex(mx - r * 2, height);
            endShape(CLOSE);
            blendMode(BLEND);

            fill(250, 250, 230, 240);
            ellipse(mx, my, r * 2, r * 2);

            fill(235, 238, 218, 140);
            ellipse(mx - r * 0.4, my - r * 0.3, r * 0.5, r * 0.5);
            fill(240, 243, 223, 100);
            ellipse(mx - r * 0.4, my - r * 0.35, r * 0.4, r * 0.4);

            fill(235, 238, 218, 120);
            ellipse(mx + r * 0.5, my + r * 0.2, r * 0.35, r * 0.35);
            fill(240, 243, 223, 90);
            ellipse(mx + r * 0.5, my + r * 0.15, r * 0.28, r * 0.28);

            fill(232, 235, 215, 100);
            ellipse(mx - r * 0.1, my + r * 0.5, r * 0.4, r * 0.4);

            fill(220, 225, 210, 60);
            ellipse(mx + r * 0.2, my - r * 0.4, r * 0.6, r * 0.5);
            ellipse(mx - r * 0.3, my + r * 0.3, r * 0.5, r * 0.4);

            fill(255, 255, 245, 180);
            arc(mx - r * 0.8, my - r * 0.8, r * 0.6, r * 0.6, 0, PI);

            noFill();
            stroke(255, 255, 245, 80);
            strokeWeight(3);
            arc(mx, my, r * 2.05, r * 2.05, -PI * 0.7, -PI * 0.3);
            noStroke();

            for (let i = 0; i < 30; i++) {
                const px = mx + random(-r * 3, r * 3);
                const py = my + random(-r * 2, height - my);
                const psize = random() * 3 + 0.5;
                const brightness = 240 + random() * 15;

                fill(brightness, brightness, brightness - 10, random() * 80 + 40);
                ellipse(px, py, psize, psize);
            }

            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
