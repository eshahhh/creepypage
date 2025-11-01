(function () {
    const comp = {
        name: 'spiders',
        apply(seed, lighting, atmosphere, theme) {
            if (seed !== undefined) randomSeed(seed + 1616);
            push();
            noStroke();

            const spiderCount = floor(2 + random() * 6);

            for (let i = 0; i < spiderCount; i++) {
                const sx = random() * width;
                const sy = random() * height * 0.7 + height * 0.1;
                const ssize = 8 + random() * 20;
                const legSpread = random(0.6, 1);

                let bodyColor = color(15, 15, 18);
                if (lighting === 'redGlow') {
                    bodyColor = color(40, 15, 15);
                } else if (lighting === 'fullMoon') {
                    bodyColor = color(30, 35, 40);
                }

                push();
                translate(sx, sy);

                stroke(red(bodyColor) - 5, green(bodyColor) - 5, blue(bodyColor) - 5, 230);
                strokeWeight(1.5 + ssize * 0.08);

                for (let leg = 0; leg < 8; leg++) {
                    const side = leg < 4 ? -1 : 1;
                    const legIndex = leg % 4;
                    const legAngle = side * (PI / 6 + legIndex * PI / 8) * legSpread;
                    const legLength = ssize * (1.2 + legIndex * 0.15);

                    const joint1X = cos(legAngle) * legLength * 0.5;
                    const joint1Y = sin(legAngle) * legLength * 0.5;

                    const joint2Angle = legAngle + side * PI / 4;
                    const joint2X = joint1X + cos(joint2Angle) * legLength * 0.5;
                    const joint2Y = joint1Y + sin(joint2Angle) * legLength * 0.5;

                    line(0, 0, joint1X, joint1Y);
                    line(joint1X, joint1Y, joint2X, joint2Y);

                    noStroke();
                    fill(red(bodyColor), green(bodyColor), blue(bodyColor), 255);
                    ellipse(joint1X, joint1Y, ssize * 0.15, ssize * 0.15);
                    stroke(red(bodyColor) - 5, green(bodyColor) - 5, blue(bodyColor) - 5, 230);
                    strokeWeight(1.5 + ssize * 0.08);
                }

                noStroke();
                fill(bodyColor);
                ellipse(0, ssize * 0.15, ssize * 0.9, ssize * 1.2);

                fill(red(bodyColor) + 5, green(bodyColor) + 5, blue(bodyColor) + 5, 255);
                ellipse(0, -ssize * 0.25, ssize * 0.7, ssize * 0.8);

                fill(80, 20, 20, 180);
                ellipse(-ssize * 0.12, -ssize * 0.35, ssize * 0.15, ssize * 0.15);
                ellipse(ssize * 0.12, -ssize * 0.35, ssize * 0.15, ssize * 0.15);

                blendMode(ADD);
                fill(100, 30, 30, 80);
                ellipse(-ssize * 0.12, -ssize * 0.35, ssize * 0.2, ssize * 0.2);
                ellipse(ssize * 0.12, -ssize * 0.35, ssize * 0.2, ssize * 0.2);
                blendMode(BLEND);

                fill(red(bodyColor) + 10, green(bodyColor) + 10, blue(bodyColor) + 10, 200);
                for (let h = 0; h < 3; h++) {
                    const hx = random(-ssize * 0.3, ssize * 0.3);
                    const hy = random(-ssize * 0.1, ssize * 0.4);
                    ellipse(hx, hy, ssize * 0.08, ssize * 0.08);
                }

                stroke(red(bodyColor) + 15, green(bodyColor) + 15, blue(bodyColor) + 15, 150);
                strokeWeight(1);
                line(0, -ssize * 0.8, 0, sy - ssize * 2);

                for (let t = 0; t < 3; t++) {
                    const ty = -ssize * 0.8 - t * 10;
                    ellipse(sin(t) * 2, ty, 2, 2);
                }
                noStroke();

                pop();

                fill(8, 8, 10, 120);
                ellipse(sx, sy + ssize * 1.5, ssize * 1.2, ssize * 0.4);
            }

            stroke(200, 200, 210, 80);
            strokeWeight(0.8);
            noFill();
            for (let w = 0; w < 4; w++) {
                const webX = random() * width;
                const webY = random() * height * 0.5;
                const webSize = 30 + random() * 60;

                for (let a = 0; a < 8; a++) {
                    const angle = (a / 8) * TWO_PI;
                    line(webX, webY,
                        webX + cos(angle) * webSize,
                        webY + sin(angle) * webSize);
                }

                for (let r = 0.3; r <= 1; r += 0.25) {
                    ellipse(webX, webY, webSize * r * 2, webSize * r * 2);
                }

                noStroke();
                fill(200, 200, 210, 50);
                ellipse(webX, webY, 4, 4);
                stroke(200, 200, 210, 80);
                strokeWeight(0.8);
            }

            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
