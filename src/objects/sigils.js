(function () {
    const comp = {
        name: 'sigils',
        apply(seed, lighting) {
            if (seed !== undefined) randomSeed(seed + 6060);
            push();
            noFill();

            const count = floor(1 + random() * 4);
            for (let i = 0; i < count; i++) {
                const cx = width * (0.15 + random() * 0.7);
                const cy = height - (30 + random() * 160);
                const r = 40 + random() * 140;
                const complexity = floor(3 + random() * 5);
                const rotation = random(TWO_PI);

                let sr = 180, sg = 220, sb = 230;
                if (lighting === 'redGlow') {
                    sr = 240; sg = 95; sb = 95;
                } else if (lighting === 'candlelight' || lighting === 'lantern') {
                    sr = 255; sg = 210; sb = 150;
                } else if (lighting === 'fullMoon') {
                    sr = 190; sg = 220; sb = 255;
                }

                push();
                translate(cx, cy);
                rotate(rotation);

                blendMode(ADD);
                for (let g = 0; g < 6; g++) {
                    stroke(sr, sg, sb, map(g, 0, 5, 50, 4));
                    strokeWeight(12 - g * 1.5);
                    ellipse(0, 0, r * (2.5 + g * 0.15), r * (2.5 + g * 0.15));
                }
                blendMode(BLEND);

                stroke(sr, sg, sb, 160);
                strokeWeight(3);
                ellipse(0, 0, r * 2.2, r * 2.2);

                strokeWeight(2);
                ellipse(0, 0, r * 2, r * 2);
                ellipse(0, 0, r * 1.8, r * 1.8);

                strokeWeight(2.5);
                stroke(sr, sg, sb, 180);

                const sides = floor(3 + random() * 6);
                for (let s = 0; s < sides; s++) {
                    const angle1 = (s / sides) * TWO_PI;
                    const angle2 = ((s + 1) / sides) * TWO_PI;

                    const x1 = cos(angle1) * r * 0.85;
                    const y1 = sin(angle1) * r * 0.85;
                    const x2 = cos(angle2) * r * 0.85;
                    const y2 = sin(angle2) * r * 0.85;

                    line(x1, y1, x2, y2);

                    const innerAngle = angle1 + (angle2 - angle1) / 2;
                    const innerX = cos(innerAngle) * r * 0.3;
                    const innerY = sin(innerAngle) * r * 0.3;
                    line(x1, y1, innerX, innerY);
                    line(x2, y2, innerX, innerY);
                }

                ellipse(0, 0, r * 0.5, r * 0.5);

                for (let a = 0; a < 360; a += floor(15 + random() * 30)) {
                    const aa = radians(a + random(-10, 10));
                    const innerR = r * (0.3 + random() * 0.2);
                    const outerR = r * (0.9 + random() * 0.25);

                    stroke(sr, sg, sb, 140 + random() * 40);
                    strokeWeight(1.5 + random() * 2);
                    line(cos(aa) * innerR, sin(aa) * innerR,
                        cos(aa) * outerR, sin(aa) * outerR);

                    if (random() > 0.5) {
                        const runeR = (innerR + outerR) / 2;
                        const runeX = cos(aa) * runeR;
                        const runeY = sin(aa) * runeR;

                        strokeWeight(2);
                        line(runeX - 3, runeY - 3, runeX + 3, runeY + 3);
                        line(runeX - 3, runeY + 3, runeX + 3, runeY - 3);
                    }
                }

                stroke(sr, sg, sb, 160);
                strokeWeight(2);
                noFill();

                for (let q = 0; q < 4; q++) {
                    const qAngle = (q / 4) * TWO_PI + PI / 4;
                    const qDist = r * 1.3;
                    const qx = cos(qAngle) * qDist;
                    const qy = sin(qAngle) * qDist;

                    const runeType = floor(random() * 4);
                    push();
                    translate(qx, qy);

                    if (runeType === 0) {
                        beginShape();
                        for (let t = 0; t < 3; t++) {
                            const ta = (t / 3) * TWO_PI;
                            vertex(cos(ta) * 8, sin(ta) * 8);
                        }
                        endShape(CLOSE);
                    } else if (runeType === 1) {
                        line(-8, 0, 8, 0);
                        line(0, -8, 0, 8);
                    } else if (runeType === 2) {
                        arc(-4, 0, 8, 10, -PI / 2, PI / 2);
                        arc(4, 0, 8, 10, PI / 2, -PI / 2);
                    } else {
                        beginShape();
                        for (let sp = 0; sp < 20; sp++) {
                            const spiralA = (sp / 20) * TWO_PI * 2;
                            const spiralR = (sp / 20) * 8;
                            vertex(cos(spiralA) * spiralR, sin(spiralA) * spiralR);
                        }
                        endShape();
                    }
                    pop();
                }

                blendMode(ADD);
                fill(sr, sg, sb, 120);
                noStroke();
                for (let n = 0; n < 8; n++) {
                    const nAngle = (n / 8) * TWO_PI;
                    const nx = cos(nAngle) * r * 0.9;
                    const ny = sin(nAngle) * r * 0.9;

                    for (let e = 0; e < 4; e++) {
                        fill(sr, sg, sb, 80 - e * 18);
                        ellipse(nx, ny, 8 + e * 4, 8 + e * 4);
                    }
                }

                for (let c = 0; c < 5; c++) {
                    fill(sr, sg, sb, 150 - c * 25);
                    ellipse(0, 0, (5 - c) * 8, (5 - c) * 8);
                }

                for (let p = 0; p < 15; p++) {
                    const pAngle = (p / 15) * TWO_PI + seed * 0.01;
                    const pDist = r * (0.6 + (p % 3) * 0.3);
                    const px = cos(pAngle) * pDist;
                    const py = sin(pAngle) * pDist;

                    fill(sr, sg, sb, random() * 100 + 50);
                    ellipse(px, py, 3 + random() * 3, 3 + random() * 3);
                }

                stroke(sr, sg, sb, 100);
                strokeWeight(1);
                noFill();
                for (let t = 0; t < 360; t += 15) {
                    const tAngle = radians(t);
                    const textR = r * 1.15;
                    const tx = cos(tAngle) * textR;
                    const ty = sin(tAngle) * textR;

                    if (floor(random() * 2) === 0) {
                        line(tx - 2, ty - 3, tx + 2, ty + 3);
                    } else {
                        line(tx - 2, ty + 3, tx + 2, ty - 3);
                    }
                }

                blendMode(BLEND);
                pop();

                noStroke();
                fill(sr, sg, sb, 30);
                ellipse(cx, cy + r * 0.5, r * 2.5, r * 0.5);
            }

            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
