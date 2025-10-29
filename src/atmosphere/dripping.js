(function () {
    const comp = {
        name: 'dripping',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 409);
            push();

            const dropCount = floor(10 + random() * 35);
            for (let i = 0; i < dropCount; i++) {
                const x = random() * width;
                const y = random() * height * 0.7;
                const len = 10 + random() * 140;
                const speed = random();

                noFill();
                stroke(18, 20, 26, 100 + random() * 80);
                strokeWeight(0.5 + random() * 2);

                beginShape();
                for (let t = 0; t <= 1; t += 0.2) {
                    const dropY = y + len * t;
                    const dropX = x + sin(t * PI) * 2;
                    const thickness = (1 - t * 0.7) * (1 + random() * 0.5);
                    strokeWeight(thickness);
                    vertex(dropX, dropY);
                }
                endShape();

                noStroke();
                fill(20, 22, 28, 120 + random() * 100);
                const dropSize = 2 + random() * 3;
                ellipse(x + random(-1, 1), y + len, dropSize, dropSize * 1.4);

                fill(180, 190, 200, random() * 80);
                ellipse(x + random(-0.5, 0.5), y + len - dropSize * 0.3, dropSize * 0.3, dropSize * 0.4);

                fill(15, 17, 22, 200);
                ellipse(x, y, 2 + random() * 2, 1 + random());

                if (y + len > height * 0.85) {
                    noStroke();
                    fill(25, 27, 32, 60 + random() * 40);
                    const splashSize = 3 + random() * 6;
                    ellipse(x, height - 5, splashSize * 2, splashSize * 0.5);

                    // Splash droplets
                    for (let s = 0; s < 3; s++) {
                        const splashAngle = random(TWO_PI);
                        const splashDist = random(5, 15);
                        fill(20, 22, 28, random() * 60);
                        ellipse(x + cos(splashAngle) * splashDist,
                            height - 5 + sin(splashAngle) * splashDist * 0.5,
                            random() * 2 + 0.5, random() * 2 + 0.5);
                    }
                }
            }

            noStroke();
            for (let p = 0; p < 8; p++) {
                const px = random() * width;
                const py = height - random() * 40;
                const psize = 20 + random() * 60;

                fill(12, 14, 20, 80);
                ellipse(px, py, psize, psize * 0.6);

                fill(180, 190, 210, 30);
                ellipse(px - psize * 0.2, py - psize * 0.1, psize * 0.3, psize * 0.2);
            }

            pop();
        }
    };

    if (window.Atmosphere) window.Atmosphere.register(comp);
    else window.addEventListener('load', () => window.Atmosphere && window.Atmosphere.register(comp));
})();
