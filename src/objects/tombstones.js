(function () {
    const comp = {
        name: 'tombstones',
        apply(seed, lighting) {
            if (seed !== undefined) randomSeed(seed + 1010);
            push();
            noStroke();

            const count = floor(3 + random() * 7);
            for (let i = 0; i < count; i++) {
                const w = 35 + random() * 110;
                const h = 50 + random() * 160;
                const x = constrain(random() * width, 25, width - 25);
                const y = height - (15 + random() * 130);
                const tilt = random(-0.15, 0.15);
                const age = random();

                let r = 45, g = 45, b = 56;
                if (lighting === 'redGlow') {
                    r = 95; g = 32; b = 32;
                } else if (lighting === 'candlelight' || lighting === 'lantern') {
                    r = 85; g = 72; b = 62;
                } else if (lighting === 'fullMoon') {
                    r = 92; g = 105; b = 125;
                }

                push();
                translate(x, y);
                rotate(tilt);

                fill(8, 8, 12, 150);
                ellipse(0, 5, w * 1.3, w * 0.3);

                fill(25 + random() * 15, 35 + random() * 15, 20 + random() * 10, 200);
                ellipse(-w * 0.3, 2, w * 0.4, 15);
                ellipse(w * 0.25, 2, w * 0.35, 12);

                fill(r - 5, g - 5, b - 5, 250);
                rect(-w * 0.55, -5, w * 1.1, 10, 2);

                fill(r, g, b, 245);
                rect(-w * 0.5, -h, w, h, 8);

                fill(max(0, r - 8), max(0, g - 8), max(0, b - 8), 235);
                const topStyle = floor(random() * 4);

                if (topStyle === 0) {
                    arc(0, -h, w, w * 0.7, PI, 0, CHORD);
                } else if (topStyle === 1) {
                    // Cross top
                    rect(-w * 0.08, -h - w * 0.35, w * 0.16, w * 0.4, 2);
                    rect(-w * 0.35, -h - w * 0.2, w * 0.7, w * 0.16, 2);
                } else if (topStyle === 2) {
                    beginShape();
                    vertex(-w * 0.5, -h);
                    vertex(0, -h - w * 0.4);
                    vertex(w * 0.5, -h);
                    endShape(CLOSE);
                } else {
                    rect(-w * 0.5, -h - w * 0.1, w, w * 0.12, 3);
                }

                fill(r - 15, g - 15, b - 15, 180 * age);

                const crackCount = floor(age * 4);
                for (let c = 0; c < crackCount; c++) {
                    stroke(r - 20, g - 20, b - 20, 160);
                    strokeWeight(1 + random() * 1.5);

                    const crackX = random(-w * 0.4, w * 0.4);
                    const crackStartY = -h * (0.2 + random() * 0.6);
                    const crackLength = h * (0.1 + random() * 0.4);

                    beginShape();
                    vertex(crackX, crackStartY);
                    for (let seg = 1; seg < 4; seg++) {
                        const segY = crackStartY + (seg / 4) * crackLength;
                        const segX = crackX + random(-5, 5);
                        vertex(segX, segY);
                    }
                    endShape();
                }
                noStroke();

                for (let m = 0; m < 3 + floor(age * 4); m++) {
                    const mx = random(-w * 0.4, w * 0.4);
                    const my = -random(h * 0.8);
                    const msize = random() * w * 0.3 + 5;

                    fill(20 + random() * 15, 35 + random() * 20, 15 + random() * 10, 120 + random() * 80);
                    ellipse(mx, my, msize, msize * 0.7);
                }

                if (age > 0.5) {
                    fill(r - 20, g - 20, b - 20, 200);
                    ellipse(random(-w * 0.4, w * 0.4), -h * (0.2 + random() * 0.6),
                        random() * 15 + 5, random() * 10 + 5);
                }

                for (let t = 0; t < 15; t++) {
                    fill(r + random(-10, 10), g + random(-10, 10), b + random(-10, 10), random() * 40 + 20);
                    ellipse(random(-w * 0.45, w * 0.45), -random(h),
                        random() * 3 + 1, random() * 3 + 1);
                }

                fill(180 + random() * 40, 180 + random() * 40, 200 + random() * 40, 220 - age * 80);
                textSize(12 + w * 0.08);
                textAlign(CENTER);

                const inscriptions = ['RIP', 'R.I.P.', '†', 'REST', '✝'];
                const inscription = random(inscriptions);
                text(inscription, 0, -h * 0.42);

                if (random() > 0.4) {
                    textSize(8 + w * 0.05);
                    fill(160 + random() * 40, 160 + random() * 40, 180 + random() * 40, 180 - age * 60);
                    const year = floor(1800 + random() * 200);
                    text(year, 0, -h * 0.25);
                }

                noFill();
                stroke(r - 12, g - 12, b - 12, 150);
                strokeWeight(2);
                rect(-w * 0.42, -h * 0.92, w * 0.84, h * 0.85, 5);
                noStroke();

                fill(r - 18, g - 18, b - 18, 180);

                if (random() > 0.5) {
                    for (let p = 0; p < 5; p++) {
                        const petalAngle = (p / 5) * TWO_PI;
                        ellipse(cos(petalAngle) * 8, -h * 0.75 + sin(petalAngle) * 8, 6, 10);
                    }
                    ellipse(0, -h * 0.75, 8, 8);
                } else {
                    ellipse(0, -h * 0.75, 15, 18);
                    fill(r - 25, g - 25, b - 25, 200);
                    ellipse(-4, -h * 0.77, 4, 5);
                    ellipse(4, -h * 0.77, 4, 5);
                    rect(-3, -h * 0.7, 6, 4);
                }

                if (age > 0.7) {
                    fill(r - 10, g - 10, b - 10, 100);
                    for (let e = 0; e < 5; e++) {
                        const ex = random(-w * 0.45, w * 0.45);
                        const ey = -random(h);
                        ellipse(ex, ey, random() * 8 + 3, random() * 6 + 2);
                    }
                }

                if (random() > 0.6) {
                    noFill();
                    stroke(20 + random() * 10, 35 + random() * 15, 15 + random() * 10, 180);
                    strokeWeight(2);

                    beginShape();
                    for (let v = 0; v < 8; v++) {
                        const vx = -w * 0.45 + random(-5, 5);
                        const vy = -v * (h / 8) + random(-5, 5);
                        curveVertex(vx, vy);
                    }
                    endShape();

                    noStroke();
                    fill(25, 40, 20, 180);
                    for (let l = 0; l < 4; l++) {
                        const lx = -w * 0.45 + random(-8, 8);
                        const ly = -l * (h / 4) + random(-10, 10);
                        ellipse(lx, ly, 8, 12);
                    }
                }

                noStroke();
                pop();
            }

            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
