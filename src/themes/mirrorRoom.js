(function () {
    const comp = {
        name: 'mirrorRoom',
        fragments: [
            "reflections lie",
            "shattered glass",
            "infinite echoes",
            "distorted reality",
            "mirrored souls",
            "broken reflections"
        ],
        titles: [
            "The Mirror Room",
            "Shattered Reflections",
            "Infinite Hall",
            "Distorted Reality",
            "The Glass Chamber",
            "Echoes of Mirrors"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 500);

            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const c = lerpColor(color(18, 18, 25), color(28, 28, 38), t);
                stroke(c); line(0, y, width, y);
            }

            push();
            noStroke();
            blendMode(ADD);
            const lightCount = 3 + floor(random() * 3);
            for (let l = 0; l < lightCount; l++) {
                const gx = width * (0.15 + random() * 0.7);
                const gy = height * (0.1 + random() * 0.4);
                const lightSize = 80 + random() * 60;

                for (let i = 0; i < 8; i++) {
                    fill(200, 220, 255, 25 - i * 3);
                    ellipse(gx, gy, lightSize * (1 + i * 0.3), lightSize * (1 + i * 0.3));
                }

                for (let r = 0; r < 2; r++) {
                    const offsetX = (random() > 0.5 ? 1 : -1) * random(100, 200);
                    const offsetY = random(-50, 100);
                    for (let i = 0; i < 6; i++) {
                        fill(180, 200, 255, 15 - i * 2);
                        ellipse(gx + offsetX, gy + offsetY,
                            lightSize * 0.7 * (1 + i * 0.3),
                            lightSize * 0.7 * (1 + i * 0.3));
                    }
                }
            }
            blendMode(BLEND);
            pop();

            push();
            stroke(180, 200, 255, 100);
            strokeWeight(2);
            noFill();
            for (let i = 0; i < 5; i++) {
                const startX = random() * width;
                const startY = random() * height * 0.6;

                beginShape();
                vertex(startX, startY);
                let x = startX;
                let y = startY;
                for (let s = 0; s < 6; s++) {
                    x += random(-50, 50);
                    y += random(20, 60);
                    vertex(x, y);

                    noStroke();
                    fill(200, 220, 255, 40);
                    ellipse(x, y, 8, 8);
                    stroke(180, 200, 255, 100);
                }
                endShape();
            }
            noStroke();
            pop();

            push();
            noStroke();
            fill(25, 25, 30, 200);
            beginShape();
            vertex(0, height);
            for (let i = 0; i <= 10; i++) {
                const dx = i * width / 10;
                const h = height * 0.6 + noise(i * 0.3 + seed * 0.0001) * height * 0.1;
                vertex(dx, h);
            }
            vertex(width, height);
            endShape(CLOSE);
            pop();

            push();
            const mirrorCount = 5 + floor(random() * 3);
            for (let i = 0; i < mirrorCount; i++) {
                const mw = 50 + random() * 100;
                const mh = 80 + random() * 150;
                const mx = random() * width;
                const my = height - (15 + random() * 70);
                const tilt = random(-0.15, 0.15);

                push();
                translate(mx, my);
                rotate(tilt);

                fill(15, 15, 18, 255);
                rect(-mw * 0.5 - 8, -mh - 8, mw + 16, mh + 16, 8);

                stroke(30, 30, 35);
                strokeWeight(3);
                rect(-mw * 0.5 - 5, -mh - 5, mw + 10, mh + 10, 6);
                noStroke();

                fill(35, 35, 40);
                const cornerSize = 12;
                ellipse(-mw * 0.5 - 5, -mh - 5, cornerSize, cornerSize);
                ellipse(mw * 0.5 + 5, -mh - 5, cornerSize, cornerSize);
                ellipse(-mw * 0.5 - 5, -5, cornerSize, cornerSize);
                ellipse(mw * 0.5 + 5, -5, cornerSize, cornerSize);

                fill(200, 220, 255, 50);
                rect(-mw * 0.5, -mh, mw, mh, 4);

                blendMode(ADD);
                for (let s = 0; s < 3; s++) {
                    fill(180, 200, 240, 15);
                    const shimmerY = -mh * random(0.2, 0.8);
                    rect(-mw * 0.5, shimmerY, mw, mh * 0.15);
                }
                blendMode(BLEND);

                fill(160, 180, 220, 30);
                ellipse(0, -mh * 0.5, mw * 0.3, mh * 0.4);

                if (random() > 0.6) {
                    stroke(180, 200, 255, 120);
                    strokeWeight(1);
                    line(-mw * 0.3, -mh * 0.7, mw * 0.2, -mh * 0.3);
                    line(mw * 0.1, -mh * 0.8, -mw * 0.2, -mh * 0.2);
                    noStroke();
                }

                pop();
            }
            pop();

            push();
            noStroke();
            for (let i = 0; i < 12; i++) {
                const sx = random() * width;
                const sy = random() * height * 0.7;
                const ssize = 5 + random() * 20;
                const angle = random(TWO_PI);

                push();
                translate(sx, sy);
                rotate(angle);

                fill(200, 220, 255, 150);
                beginShape();
                vertex(0, -ssize);
                vertex(ssize * 0.5, ssize * 0.3);
                vertex(-ssize * 0.3, ssize * 0.5);
                endShape(CLOSE);

                // Shard glow
                blendMode(ADD);
                fill(180, 200, 255, 30);
                ellipse(0, 0, ssize, ssize);
                blendMode(BLEND);

                pop();
            }
            pop();

            push();
            noStroke();
            blendMode(ADD);
            for (let d = 0; d < 3; d++) {
                const depth = d + 1;
                const alpha = 25 / depth;
                fill(180, 200, 230, alpha);

                for (let e = 0; e < 5; e++) {
                    const ex = width * random();
                    const ey = height * 0.6 + random() * height * 0.3;
                    const esize = 30 / depth;
                    ellipse(ex, ey, esize, esize * 1.5);
                }
            }
            blendMode(BLEND);
            pop();
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();