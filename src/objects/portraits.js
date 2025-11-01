(function () {
    const comp = {
        name: 'portraits',
        apply(seed, lighting, atmosphere, theme) {
            if (seed !== undefined) randomSeed(seed + 2020);
            push();
            noStroke();

            const portraitCount = floor(1 + random() * 3);

            for (let i = 0; i < portraitCount; i++) {
                const px = width * (0.2 + random() * 0.6);
                const py = height * (0.25 + random() * 0.4);
                const pw = 50 + random() * 100;
                const ph = pw * (1.2 + random() * 0.3);
                const tilt = random(-0.1, 0.1);

                let frameColor = color(30, 25, 20);
                if (lighting === 'candlelight' || lighting === 'lantern') {
                    frameColor = color(70, 55, 40);
                } else if (lighting === 'fullMoon') {
                    frameColor = color(80, 85, 95);
                }

                push();
                translate(px, py);
                rotate(tilt);

                fill(frameColor);
                rect(-pw * 0.6, -ph * 0.6, pw * 1.2, ph * 1.2, 4);

                stroke(red(frameColor) + 20, green(frameColor) + 20, blue(frameColor) + 20, 200);
                strokeWeight(2);
                rect(-pw * 0.58, -ph * 0.58, pw * 1.16, ph * 1.16, 3);
                noStroke();

                fill(red(frameColor) + 40, green(frameColor) + 40, blue(frameColor) + 40, 220);
                for (let corner = 0; corner < 4; corner++) {
                    const cx = (corner % 2 === 0 ? -1 : 1) * pw * 0.58;
                    const cy = (corner < 2 ? -1 : 1) * ph * 0.58;
                    ellipse(cx, cy, 8, 8);
                }

                fill(18, 18, 22, 255);
                rect(-pw * 0.5, -ph * 0.5, pw, ph);

                const faceY = -ph * 0.15;
                const faceSize = pw * 0.4;

                fill(40, 38, 35, 230);
                ellipse(0, faceY, faceSize, faceSize * 1.3);

                fill(45, 43, 40, 240);
                ellipse(0, faceY - faceSize * 0.25, faceSize * 0.9, faceSize * 0.5);

                fill(8, 8, 10, 255);
                ellipse(-faceSize * 0.18, faceY - faceSize * 0.1, faceSize * 0.15, faceSize * 0.2);
                ellipse(faceSize * 0.18, faceY - faceSize * 0.1, faceSize * 0.15, faceSize * 0.2);

                if (lighting === 'redGlow') {
                    blendMode(ADD);
                    fill(200, 80, 80, 150);
                    ellipse(-faceSize * 0.18, faceY - faceSize * 0.1, faceSize * 0.2, faceSize * 0.25);
                    ellipse(faceSize * 0.18, faceY - faceSize * 0.1, faceSize * 0.2, faceSize * 0.25);
                    blendMode(BLEND);
                }

                fill(35, 33, 30, 200);
                ellipse(0, faceY + faceSize * 0.05, faceSize * 0.12, faceSize * 0.15);

                stroke(30, 28, 25, 180);
                strokeWeight(1.5);
                noFill();
                arc(0, faceY + faceSize * 0.15, faceSize * 0.25, faceSize * 0.2, 0, PI);
                noStroke();

                fill(35, 32, 28, 220);
                rect(-pw * 0.45, faceY + faceSize * 0.5, pw * 0.9, ph * 0.3);

                fill(38, 35, 30, 240);
                rect(-pw * 0.4, faceY + faceSize * 0.55, pw * 0.35, ph * 0.2, 2);
                rect(pw * 0.05, faceY + faceSize * 0.55, pw * 0.35, ph * 0.2, 2);

                stroke(25, 23, 20, 150);
                strokeWeight(1);
                for (let b = 0; b < 3; b++) {
                    const by = faceY + faceSize * 0.6 + b * (ph * 0.05);
                    line(-pw * 0.38, by, -pw * 0.07, by);
                    line(pw * 0.07, by, pw * 0.38, by);
                }
                noStroke();

                if (random() > 0.6) {
                    fill(180, 180, 200, 100);
                    beginShape();
                    vertex(-pw * 0.5, -ph * 0.5);
                    vertex(-pw * 0.2, -ph * 0.3);
                    vertex(-pw * 0.4, ph * 0.1);
                    vertex(-pw * 0.5, ph * 0.2);
                    endShape(CLOSE);
                }

                pop();

                fill(8, 8, 10, 120);
                ellipse(px, py + ph * 0.7, pw * 1.3, pw * 0.3);
            }

            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
