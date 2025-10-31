(function () {
    const comp = {
        name: 'rain',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 1111);
            push();

            const dropCount = floor(40 + random() * 80);
            const windAngle = random(-0.3, 0.1);

            for (let i = 0; i < dropCount; i++) {
                const x = random() * width;
                const y = random() * height;
                const len = 15 + random() * 35;
                const speed = 0.6 + random() * 0.4;
                const thickness = 0.8 + random() * 1.5;

                stroke(200, 210, 220, 150 + random() * 80);
                strokeWeight(thickness);

                const endX = x + sin(windAngle) * len;
                const endY = y + cos(windAngle) * len;
                line(x, y, endX, endY);

                if (random() > 0.7) {
                    noStroke();
                    fill(210, 220, 230, 100 + random() * 80);
                    const blurSize = 2 + random() * 3;
                    ellipse(endX, endY, blurSize, blurSize * 1.5);
                }
            }

            noStroke();
            for (let p = 0; p < 15; p++) {
                const px = random() * width;
                const py = height - random() * 80;
                const psize = 10 + random() * 30;

                fill(180, 190, 210, 80);
                ellipse(px, py, psize, psize * 0.4);

                fill(200, 210, 230, 40);
                ellipse(px, py - psize * 0.1, psize * 0.8, psize * 0.3);

                for (let s = 0; s < 4; s++) {
                    const splashAngle = random(TWO_PI);
                    const splashDist = random(8, 20);
                    const splashX = px + cos(splashAngle) * splashDist;
                    const splashY = py + sin(splashAngle) * splashDist * 0.5;

                    fill(190, 200, 220, 60);
                    ellipse(splashX, splashY, random() * 3 + 1, random() * 2 + 0.5);
                }
            }

            fill(15, 18, 25, 40);
            for (let i = 0; i < 3; i++) {
                rect(0, i * height / 3, width, height / 3);
            }

            for (let mist = 0; mist < 8; mist++) {
                const mistY = height * (0.7 + mist * 0.04);
                fill(200, 210, 220, 25 - mist * 2);

                beginShape();
                for (let x = 0; x <= width; x += 30) {
                    const noiseVal = noise(x * 0.01, mistY * 0.01 + seed * 0.0001);
                    const y = mistY + noiseVal * 20;
                    vertex(x, y);
                }
                vertex(width, height);
                vertex(0, height);
                endShape(CLOSE);
            }

            stroke(180, 190, 210, 30);
            for (let streak = 0; streak < 12; streak++) {
                strokeWeight(2 + random() * 3);

                const x1 = random() * width;
                const y1 = random() * height * 0.8;
                const streakLen = 40 + random() * 80;

                line(x1, y1,
                    x1 + sin(windAngle) * streakLen,
                    y1 + cos(windAngle) * streakLen);
            }

            pop();
        }
    };

    if (window.Atmosphere) window.Atmosphere.register(comp);
    else window.addEventListener('load', () => window.Atmosphere && window.Atmosphere.register(comp));
})();
