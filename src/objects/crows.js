(function () {
    const comp = {
        name: 'crows',
        apply(seed, lighting) {
            if (seed !== undefined) randomSeed(seed + 5050);
            push();
            noStroke();

            const count = floor(2 + random() * 8);
            for (let i = 0; i < count; i++) {
                const x = random() * width;
                const y = height * (0.15 + random() * 0.65);
                const s = 14 + random() * 50;
                const angle = random(-0.6, 0.6);
                const perched = random() > 0.4;

                push();
                translate(x, y);
                rotate(angle);

                fill(8, 8, 12, 240);
                ellipse(0, 0, s * 1.3, s * 0.75);

                fill(25, 25, 35, 180);
                ellipse(-s * 0.15, -s * 0.1, s * 0.5, s * 0.3);

                fill(10, 10, 12, 250);
                ellipse(s * 0.45, -s * 0.15, s * 0.7, s * 0.65);

                fill(40, 35, 30, 255);
                beginShape();
                vertex(s * 0.7, -s * 0.15);
                vertex(s * 1.0, -s * 0.05);
                vertex(s * 0.75, -s * 0.1);
                endShape(CLOSE);

                fill(180, 20, 20, 220);
                ellipse(s * 0.55, -s * 0.2, s * 0.12, s * 0.12);

                blendMode(ADD);
                fill(200, 40, 40, 100);
                ellipse(s * 0.55, -s * 0.2, s * 0.2, s * 0.2);
                blendMode(BLEND);

                fill(255, 180, 180, 180);
                ellipse(s * 0.56, -s * 0.22, s * 0.05, s * 0.05);

                if (perched) {
                    fill(12, 12, 15, 235);
                    beginShape();
                    vertex(-s * 0.3, 0);
                    vertex(-s * 0.9, -s * 0.4);
                    vertex(-s * 0.7, -s * 0.15);
                    vertex(-s * 0.3, 0);
                    endShape(CLOSE);

                    stroke(8, 8, 10, 180);
                    strokeWeight(1);
                    for (let f = 0; f < 4; f++) {
                        const fx = -s * (0.4 + f * 0.15);
                        const fy = -s * (0.05 + f * 0.08);
                        line(fx, fy, fx - s * 0.15, fy - s * 0.1);
                    }
                    noStroke();

                    fill(10, 10, 12, 240);
                    for (let t = 0; t < 5; t++) {
                        const tailAngle = -0.3 + t * 0.15;
                        push();
                        rotate(tailAngle);
                        ellipse(-s * 0.5, s * 0.2, s * 0.15, s * 0.8);
                        pop();
                    }

                    stroke(45, 40, 35, 255);
                    strokeWeight(2);
                    line(s * 0.1, s * 0.35, s * 0.1, s * 0.6);
                    line(-s * 0.1, s * 0.35, -s * 0.1, s * 0.6);

                    strokeWeight(1.5);
                    line(s * 0.1, s * 0.6, s * 0.05, s * 0.7);
                    line(s * 0.1, s * 0.6, s * 0.15, s * 0.7);
                    line(-s * 0.1, s * 0.6, -s * 0.15, s * 0.7);
                    line(-s * 0.1, s * 0.6, -s * 0.05, s * 0.7);
                    noStroke();

                } else {
                    fill(12, 12, 15, 230);

                    beginShape();
                    vertex(-s * 0.2, 0);
                    vertex(-s * 1.5, -s * 0.8);
                    vertex(-s * 1.3, -s * 0.4);
                    vertex(-s * 0.8, -s * 0.25);
                    vertex(-s * 0.2, 0);
                    endShape(CLOSE);

                    fill(8, 8, 10, 200);
                    for (let f = 0; f < 5; f++) {
                        const fx = -s * (0.6 + f * 0.18);
                        const fy = -s * (0.3 + f * 0.1);
                        ellipse(fx, fy, s * 0.12, s * 0.35);
                    }

                    fill(12, 12, 15, 230);
                    push();
                    scale(-1, 1);
                    beginShape();
                    vertex(-s * 0.2, 0);
                    vertex(-s * 1.5, -s * 0.8);
                    vertex(-s * 1.3, -s * 0.4);
                    vertex(-s * 0.8, -s * 0.25);
                    vertex(-s * 0.2, 0);
                    endShape(CLOSE);

                    fill(8, 8, 10, 200);
                    for (let f = 0; f < 5; f++) {
                        const fx = -s * (0.6 + f * 0.18);
                        const fy = -s * (0.3 + f * 0.1);
                        ellipse(fx, fy, s * 0.12, s * 0.35);
                    }
                    pop();

                    fill(10, 10, 12, 235);
                    for (let t = 0; t < 7; t++) {
                        const tailAngle = -0.4 + t * 0.13;
                        push();
                        rotate(tailAngle);
                        ellipse(-s * 0.45, s * 0.25, s * 0.18, s * 0.65);
                        pop();
                    }
                }

                stroke(5, 5, 8, 120);
                strokeWeight(1);
                for (let r = 0; r < 3; r++) {
                    const rx = random(-s * 0.3, s * 0.3);
                    const ry = random(-s * 0.2, s * 0.2);
                    line(rx, ry, rx + random(-5, 5), ry + random(-5, 5));
                }
                noStroke();

                pop();

                if (perched && y > height * 0.7) {
                    fill(5, 5, 8, 80);
                    ellipse(x, y + s * 0.8, s * 1.5, s * 0.4);
                }
            }

            if (random() > 0.7) {
                const crowX = random() * width;
                const crowY = height * (0.2 + random() * 0.4);

                noFill();
                stroke(255, 255, 255, 40);
                for (let w = 0; w < 3; w++) {
                    strokeWeight(2 - w * 0.5);
                    const waveSize = 20 + w * 15;
                    ellipse(crowX, crowY, waveSize, waveSize * 0.6);
                }
                noStroke();
            }

            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
