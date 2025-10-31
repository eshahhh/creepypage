(function () {
    const comp = {
        name: 'alleyway',
        fragments: [
            "narrow passages",
            "echoes in the dark",
            "hidden alleys",
            "shadowy corners",
            "forgotten streets",
            "whispers of the city"
        ],
        titles: [
            "The Narrow Alley",
            "Shadows of the Street",
            "Forgotten Passage",
            "Echoes in the Dark",
            "The Hidden Alleyway",
            "City Shadows"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 400);

            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const c = lerpColor(color(12, 12, 15), color(22, 20, 28), t);
                stroke(c); line(0, y, width, y);
            }

            push();
            noStroke();
            for (let i = 0; i < 5; i++) {
                fill(255, 200, 150, 3 + i * 2);
                rect(0, height * 0.5 - i * 10, width, 20 + i * 5);
            }
            pop();

            push();
            noStroke();
            fill(18, 18, 22, 200);
            for (let i = 0; i < 10; i++) {
                const bw = width * 0.08 + random() * width * 0.12;
                const bh = height * (0.2 + random() * 0.25);
                const bx = i * width / 10 + random(-width * 0.02, width * 0.02);
                rect(bx, height * 0.55 - bh, bw, bh);

                if (random() > 0.7) {
                    fill(255, 240, 180, 150);
                    const wx = bx + random(5, bw - 10);
                    const wy = height * 0.55 - bh + random(10, bh - 20);
                    rect(wx, wy, 5, 8);
                }
                fill(18, 18, 22, 200);
            }
            pop();

            push();
            noStroke();
            const lx = width * (0.5 + random() * 0.3);
            const ly = height * (0.3 + random() * 0.2);
            const lampSize = 80 + random() * 40;
            const flicker = random() > 0.1 ? 1 : 0.6;

            blendMode(ADD);
            for (let i = 0; i < 8; i++) {
                const spread = 1 + i * 0.6;
                const alpha = map(i, 0, 7, 100 * flicker, 5);
                fill(255, 245, 200, alpha);
                ellipse(lx, ly, lampSize * spread, lampSize * spread * 0.8);
            }

            fill(255, 250, 220, 40 * flicker);
            beginShape();
            vertex(lx - lampSize * 0.2, ly);
            vertex(lx + lampSize * 0.2, ly);
            vertex(lx + lampSize * 1.2, height);
            vertex(lx - lampSize * 1.2, height);
            endShape(CLOSE);
            blendMode(BLEND);

            fill(40, 40, 45);
            rect(lx - 4, ly + 10, 8, height - ly - 10);
            rect(lx - lampSize * 0.25, ly - 15, lampSize * 0.5, 25, 2);
            fill(60, 60, 65);
            ellipse(lx, ly, 20, 20);
            pop();

            push();
            noStroke();
            fill(15, 15, 20, 240);
            beginShape();
            vertex(0, height);
            for (let i = 0; i <= 8; i++) {
                const dx = i * width / 8;
                const h = height * 0.5 + noise(i * 0.5 + seed * 0.0001) * height * 0.2;
                vertex(dx, h);
            }
            vertex(width, height);
            endShape(CLOSE);

            stroke(12, 12, 16, 120);
            strokeWeight(1);
            for (let by = height * 0.5; by < height; by += 8) {
                for (let bx = 0; bx < width; bx += 25) {
                    const offset = (floor(by / 8) % 2) * 12;
                    line(bx + offset, by, bx + offset + 20, by);
                }
            }
            noStroke();
            pop();

            push();
            for (let i = 0; i < 3; i++) {
                const gx = random() * width;
                const gy = height * 0.6 + random() * height * 0.25;
                const gsize = 20 + random() * 40;

                noStroke();
                const colors = [[255, 100, 120], [100, 150, 255], [150, 255, 100]];
                const col = random(colors);

                for (let s = 0; s < 5; s++) {
                    fill(col[0], col[1], col[2], 30 - s * 5);
                    ellipse(gx + random(-5, 5), gy, gsize + s * 8, gsize * 0.5 + s * 4);
                }

                stroke(col[0], col[1], col[2], 150);
                strokeWeight(3);
                for (let l = 0; l < 3; l++) {
                    line(gx - gsize * 0.3 + l * gsize * 0.3, gy,
                        gx - gsize * 0.2 + l * gsize * 0.3, gy - random(15, 25));
                }
                noStroke();
            }
            pop();

            push();
            fill(25, 25, 28, 200);
            for (let i = 0; i < 15; i++) {
                const tx = random() * width;
                const ty = height - random() * 40;
                const tsize = 5 + random() * 15;

                push();
                translate(tx, ty);
                rotate(random(-PI / 4, PI / 4));

                if (random() > 0.5) {
                    fill(35, 35, 40);
                    ellipse(0, 0, tsize * 1.5, tsize * 0.8);
                } else {
                    fill(30, 28, 25);
                    rect(0, 0, tsize, tsize * 0.7, 1);
                }
                pop();
            }
            pop();

            push();
            fill(10, 10, 12, 255);
            const objectCount = 12;
            for (let i = 0; i < objectCount; i++) {
                const w = 20 + random() * 50;
                const h = 60 + random() * 120;
                const x = random() * width;
                const y = height - (5 + random() * 60);

                rect(x, y - h, w, h, 2);

                stroke(20, 20, 24, 200);
                strokeWeight(2);
                if (random() > 0.5) {
                    line(x + w * 0.2, y - h * 0.3, x + w * 0.8, y - h * 0.3);
                }
                noStroke();

                fill(5, 5, 8, 100);
                ellipse(x + w * 0.5, y, w * 1.2, 8);
            }
            pop();

            push();
            noStroke();
            for (let i = 0; i < 4; i++) {
                const sx = random() * width;
                const sy = height - random() * 80;

                for (let p = 0; p < 5; p++) {
                    const puff = p * 15;
                    fill(200, 200, 210, 30 - p * 5);
                    ellipse(sx + random(-10, 10), sy - puff, 20 + p * 8, 15 + p * 6);
                }
            }
            pop();
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();