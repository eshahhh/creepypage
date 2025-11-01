(function () {
    const comp = {
        name: 'chains',
        apply(seed, lighting, atmosphere, theme) {
            if (seed !== undefined) randomSeed(seed + 1919);
            push();

            const chainCount = floor(2 + random() * 5);

            for (let c = 0; c < chainCount; c++) {
                const startX = width * (0.2 + random() * 0.6);
                const startY = random() * height * 0.3;
                const endY = height * (0.5 + random() * 0.4);
                const links = floor((endY - startY) / 15);
                const sway = sin(c * 1.5 + seed * 0.05) * 20;

                let chainColor = color(60, 60, 65);
                if (lighting === 'candlelight' || lighting === 'lantern') {
                    chainColor = color(90, 80, 70);
                } else if (lighting === 'redGlow') {
                    chainColor = color(80, 50, 50);
                } else if (lighting === 'fullMoon') {
                    chainColor = color(95, 100, 110);
                }

                for (let l = 0; l < links; l++) {
                    const t = l / links;
                    const linkX = startX + sin(t * PI * 2 + seed * 0.01) * sway * t;
                    const linkY = startY + t * (endY - startY);
                    const linkSize = 8 + random() * 6;
                    const linkAngle = (l % 2) * PI / 2;

                    push();
                    translate(linkX, linkY);
                    rotate(linkAngle);

                    stroke(chainColor);
                    strokeWeight(2.5 + linkSize * 0.15);
                    noFill();
                    ellipse(0, 0, linkSize, linkSize * 1.5);

                    stroke(red(chainColor) - 20, green(chainColor) - 20, blue(chainColor) - 20, 180);
                    strokeWeight(2 + linkSize * 0.12);
                    arc(0, 0, linkSize, linkSize * 1.5, 0, PI);

                    noStroke();
                    fill(red(chainColor) + 15, green(chainColor) + 15, blue(chainColor) + 15, 200);
                    ellipse(-linkSize * 0.3, -linkSize * 0.5, linkSize * 0.15, linkSize * 0.15);
                    ellipse(linkSize * 0.3, linkSize * 0.5, linkSize * 0.15, linkSize * 0.15);

                    pop();
                }

                if (random() > 0.5) {
                    const shackleX = startX + sin(PI * 2 + seed * 0.01) * sway;
                    const shackleY = endY;
                    const shackleSize = 20 + random() * 25;

                    push();
                    translate(shackleX, shackleY);

                    stroke(chainColor);
                    strokeWeight(4);
                    noFill();
                    arc(0, 0, shackleSize, shackleSize * 1.2, 0, PI);

                    noStroke();
                    fill(chainColor);
                    rect(-shackleSize * 0.6, -shackleSize * 0.1, shackleSize * 1.2, shackleSize * 0.2, 3);

                    fill(red(chainColor) - 20, green(chainColor) - 20, blue(chainColor) - 20, 200);
                    rect(-shackleSize * 0.6, -shackleSize * 0.08, shackleSize * 1.2, shackleSize * 0.16, 2);

                    fill(red(chainColor) + 20, green(chainColor) + 20, blue(chainColor) + 20, 180);
                    ellipse(-shackleSize * 0.5, 0, shackleSize * 0.12, shackleSize * 0.12);
                    ellipse(shackleSize * 0.5, 0, shackleSize * 0.12, shackleSize * 0.12);

                    pop();

                    fill(10, 10, 12, 100);
                    ellipse(shackleX, shackleY + shackleSize * 0.2, shackleSize * 1.2, shackleSize * 0.3);
                }
            }

            for (let r = 0; r < floor(random() * 3); r++) {
                const rx = width * (0.15 + random() * 0.7);
                const ry = height * (0.3 + random() * 0.4);
                const ringSize = 15 + random() * 30;

                let ringColor = color(70, 70, 75);
                if (lighting === 'candlelight' || lighting === 'lantern') {
                    ringColor = color(100, 90, 80);
                } else if (lighting === 'redGlow') {
                    ringColor = color(90, 60, 60);
                }

                push();
                translate(rx, ry);

                stroke(ringColor);
                strokeWeight(4 + ringSize * 0.15);
                noFill();
                ellipse(0, 0, ringSize, ringSize);

                stroke(red(ringColor) + 20, green(ringColor) + 20, blue(ringColor) + 20, 200);
                strokeWeight(3 + ringSize * 0.12);
                arc(0, 0, ringSize, ringSize, -PI * 0.75, -PI * 0.25);

                noStroke();
                fill(red(ringColor) + 30, green(ringColor) + 30, blue(ringColor) + 30, 220);
                ellipse(-ringSize * 0.35, -ringSize * 0.35, ringSize * 0.15, ringSize * 0.15);

                pop();
            }

            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
