(function () {
    const comp = {
        name: 'eyes',
        apply(seed, lighting) {
            if (seed !== undefined) randomSeed(seed + 3030);
            push();
            noStroke();

            const eyeCount = floor(3 + random() * 8);
            for (let i = 0; i < eyeCount; i++) {
                const ex = width * (0.1 + random() * 0.8);
                const ey = height * (0.1 + random() * 0.7);
                const s = 10 + random() * 32;
                const blink = random() > 0.95 ? 0.2 : 1;
                const gaze = { x: random(-0.15, 0.15), y: random(-0.1, 0.1) };

                let gr = 200, gg = 240, gb = 255;
                if (lighting === 'redGlow') {
                    gr = 255; gg = 130; gb = 130;
                } else if (lighting === 'candlelight' || lighting === 'lantern') {
                    gr = 255; gg = 210; gb = 150;
                } else if (lighting === 'fullMoon') {
                    gr = 210; gg = 230; gb = 255;
                }

                blendMode(ADD);
                for (let g = 0; g < 8; g++) {
                    const glowAlpha = map(g, 0, 7, 60, 4);
                    fill(gr, gg, gb, glowAlpha);
                    ellipse(ex, ey, s * (1.2 + g * 0.7), s * (0.7 + g * 0.5) * blink);
                }

                for (let r = 0; r < 8; r++) {
                    const rayAngle = (r / 8) * TWO_PI;
                    const rayLength = s * (0.8 + random() * 0.6);

                    push();
                    translate(ex, ey);
                    rotate(rayAngle);
                    fill(gr, gg, gb, 15);
                    ellipse(0, -rayLength * 0.5, s * 0.15, rayLength);
                    pop();
                }

                blendMode(BLEND);

                fill(8, 8, 12, 200);
                ellipse(ex, ey, s * 1.2, s * 0.9 * blink);

                fill(max(0, gr - 120), max(0, gg - 120), max(0, gb - 120), 240);
                ellipse(ex, ey, s * 0.85, s * 0.65 * blink);

                stroke(gr * 0.8, gg * 0.3, gb * 0.3, 120);
                strokeWeight(0.5);
                for (let v = 0; v < 4; v++) {
                    const vAngle = random(TWO_PI);
                    const vLength = s * 0.3;
                    beginShape();
                    vertex(ex, ey);
                    vertex(ex + cos(vAngle) * vLength, ey + sin(vAngle) * vLength * 0.6);
                    endShape();
                }
                noStroke();

                const irisSize = s * 0.45;
                fill(constrain(gr - 80, 100, 255),
                    constrain(gg - 100, 80, 255),
                    constrain(gb - 100, 80, 255), 240);
                ellipse(ex + gaze.x * s, ey + gaze.y * s * blink, irisSize, irisSize * blink);

                stroke(constrain(gr - 120, 50, 255),
                    constrain(gg - 140, 40, 255),
                    constrain(gb - 140, 40, 255), 180);
                strokeWeight(1);
                for (let l = 0; l < 12; l++) {
                    const lineAngle = (l / 12) * TWO_PI;
                    const innerR = irisSize * 0.15;
                    const outerR = irisSize * 0.45;
                    line(ex + gaze.x * s + cos(lineAngle) * innerR,
                        ey + gaze.y * s * blink + sin(lineAngle) * innerR * blink,
                        ex + gaze.x * s + cos(lineAngle) * outerR,
                        ey + gaze.y * s * blink + sin(lineAngle) * outerR * blink);
                }
                noStroke();

                fill(5, 5, 8, 255);
                const pupilSize = s * 0.18;
                ellipse(ex + gaze.x * s, ey + gaze.y * s * blink, pupilSize, pupilSize * blink);

                fill(2, 2, 5, 255);
                ellipse(ex + gaze.x * s, ey + gaze.y * s * blink, pupilSize * 0.7, pupilSize * 0.7 * blink);

                blendMode(ADD);
                fill(255, 255, 255, 200);
                ellipse(ex + gaze.x * s + s * 0.12,
                    ey + gaze.y * s * blink - s * 0.08,
                    s * 0.08, s * 0.08 * blink);

                fill(255, 255, 255, 120);
                ellipse(ex + gaze.x * s - s * 0.08,
                    ey + gaze.y * s * blink + s * 0.06,
                    s * 0.05, s * 0.05 * blink);

                fill(gr, gg, gb, 100);
                ellipse(ex + gaze.x * s, ey + gaze.y * s * blink, pupilSize * 0.4, pupilSize * 0.4 * blink);

                blendMode(BLEND);

                if (blink < 1) {
                    fill(12, 12, 15, 250);
                    arc(ex, ey, s * 0.9, s * 0.7, 0, PI);
                }

                fill(5, 5, 8, 100);
                arc(ex, ey + s * 0.05, s * 0.85, s * 0.3, 0, PI);

                blendMode(ADD);
                for (let p = 0; p < 8; p++) {
                    const pAngle = random(TWO_PI);
                    const pDist = s * (0.5 + random() * 0.8);
                    const px = ex + cos(pAngle) * pDist;
                    const py = ey + sin(pAngle) * pDist;
                    const psize = random() * 3 + 0.5;

                    fill(gr, gg, gb, random() * 80 + 40);
                    ellipse(px, py, psize, psize);
                }
                blendMode(BLEND);
            }

            if (eyeCount > 1 && random() > 0.6) {
                const targetX = width * (0.3 + random() * 0.4);
                const targetY = height * (0.4 + random() * 0.3);

                stroke(180, 200, 220, 20);
                strokeWeight(1);
                for (let i = 0; i < min(3, eyeCount); i++) {
                    const eyeX = width * (0.1 + random() * 0.8);
                    const eyeY = height * (0.1 + random() * 0.7);
                    line(eyeX, eyeY, targetX, targetY);
                }
                noStroke();
            }

            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
