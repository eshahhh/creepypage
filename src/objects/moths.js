(function () {
    const comp = {
        name: 'moths',
        apply(seed, lighting, atmosphere, theme) {
            if (seed !== undefined) randomSeed(seed + 1515);
            push();
            noStroke();

            const mothCount = floor(4 + random() * 12);

            for (let i = 0; i < mothCount; i++) {
                const mx = random() * width;
                const my = random() * height * 0.8 + height * 0.1;
                const msize = 12 + random() * 30;
                const wingAngle = sin(i * 1.2 + seed * 0.05) * 0.4;
                const flightAngle = random(TWO_PI);

                let bodyColor = color(60, 55, 50);
                if (lighting === 'candlelight' || lighting === 'lantern') {
                    bodyColor = color(80, 70, 60);
                } else if (lighting === 'fullMoon') {
                    bodyColor = color(95, 100, 110);
                }

                push();
                translate(mx, my);
                rotate(flightAngle);

                fill(bodyColor);
                ellipse(0, 0, msize * 0.25, msize * 0.8);

                fill(45, 40, 38);
                ellipse(0, -msize * 0.35, msize * 0.28, msize * 0.35);

                stroke(40, 35, 33);
                strokeWeight(1);
                line(-msize * 0.08, -msize * 0.5, -msize * 0.25, -msize * 0.8);
                line(msize * 0.08, -msize * 0.5, msize * 0.25, -msize * 0.8);
                noStroke();

                push();
                rotate(wingAngle);

                fill(85, 80, 75, 220);
                beginShape();
                vertex(0, 0);
                bezierVertex(-msize * 0.6, -msize * 0.3,
                    -msize * 0.8, msize * 0.2,
                    -msize * 0.3, msize * 0.5);
                vertex(0, msize * 0.3);
                endShape(CLOSE);

                fill(100, 95, 90, 180);
                beginShape();
                vertex(-msize * 0.15, -msize * 0.1);
                bezierVertex(-msize * 0.45, -msize * 0.25,
                    -msize * 0.6, msize * 0.1,
                    -msize * 0.2, msize * 0.35);
                endShape(CLOSE);

                fill(70, 65, 60, 200);
                ellipse(-msize * 0.4, msize * 0.15, msize * 0.2, msize * 0.25);
                ellipse(-msize * 0.25, -msize * 0.05, msize * 0.15, msize * 0.18);

                pop();

                push();
                rotate(-wingAngle);

                fill(85, 80, 75, 220);
                beginShape();
                vertex(0, 0);
                bezierVertex(msize * 0.6, -msize * 0.3,
                    msize * 0.8, msize * 0.2,
                    msize * 0.3, msize * 0.5);
                vertex(0, msize * 0.3);
                endShape(CLOSE);

                fill(100, 95, 90, 180);
                beginShape();
                vertex(msize * 0.15, -msize * 0.1);
                bezierVertex(msize * 0.45, -msize * 0.25,
                    msize * 0.6, msize * 0.1,
                    msize * 0.2, msize * 0.35);
                endShape(CLOSE);

                fill(70, 65, 60, 200);
                ellipse(msize * 0.4, msize * 0.15, msize * 0.2, msize * 0.25);
                ellipse(msize * 0.25, -msize * 0.05, msize * 0.15, msize * 0.18);

                pop();

                if (atmosphere === 'foggy' || lighting === 'fogBeam') {
                    blendMode(ADD);
                    for (let g = 0; g < 4; g++) {
                        fill(200, 200, 210, 20 - g * 4);
                        ellipse(0, 0, msize * (1 + g * 0.4), msize * (0.8 + g * 0.3));
                    }
                    blendMode(BLEND);
                }

                pop();

                fill(10, 10, 12, 100);
                ellipse(mx, my + msize * 0.6, msize * 0.8, msize * 0.3);
            }

            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
