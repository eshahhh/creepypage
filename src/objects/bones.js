(function () {
    const comp = {
        name: 'bones',
        apply(seed, lighting, atmosphere, theme) {
            if (seed !== undefined) randomSeed(seed + 1818);
            push();
            noStroke();

            const boneCount = floor(5 + random() * 12);

            for (let i = 0; i < boneCount; i++) {
                const bx = random() * width;
                const by = height - (10 + random() * 120);
                const bsize = 15 + random() * 45;
                const angle = random(TWO_PI);
                const boneType = floor(random() * 3);

                let boneColor = color(210, 205, 195);
                if (lighting === 'candlelight' || lighting === 'lantern') {
                    boneColor = color(230, 220, 200);
                } else if (lighting === 'redGlow') {
                    boneColor = color(220, 180, 175);
                } else if (lighting === 'fullMoon') {
                    boneColor = color(215, 220, 230);
                }

                push();
                translate(bx, by);
                rotate(angle);

                if (boneType === 0) {
                    fill(boneColor);
                    ellipse(-bsize * 0.35, 0, bsize * 0.4, bsize * 0.5);
                    ellipse(bsize * 0.35, 0, bsize * 0.4, bsize * 0.5);
                    rect(-bsize * 0.35, -bsize * 0.15, bsize * 0.7, bsize * 0.3, bsize * 0.1);

                    fill(red(boneColor) - 15, green(boneColor) - 15, blue(boneColor) - 15, 180);
                    ellipse(-bsize * 0.35, bsize * 0.05, bsize * 0.3, bsize * 0.35);
                    ellipse(bsize * 0.35, bsize * 0.05, bsize * 0.3, bsize * 0.35);

                    stroke(red(boneColor) - 30, green(boneColor) - 30, blue(boneColor) - 30, 150);
                    strokeWeight(1);
                    line(-bsize * 0.35, -bsize * 0.15, -bsize * 0.35, bsize * 0.15);
                    line(bsize * 0.35, -bsize * 0.15, bsize * 0.35, bsize * 0.15);
                    noStroke();

                } else if (boneType === 1) {
                    fill(boneColor);
                    ellipse(0, -bsize * 0.4, bsize * 0.6, bsize * 0.6);

                    rect(-bsize * 0.15, -bsize * 0.4, bsize * 0.3, bsize * 0.9, bsize * 0.08);

                    fill(red(boneColor) - 15, green(boneColor) - 15, blue(boneColor) - 15, 180);
                    ellipse(0, -bsize * 0.4, bsize * 0.45, bsize * 0.45);

                    stroke(red(boneColor) - 30, green(boneColor) - 30, blue(boneColor) - 30, 150);
                    strokeWeight(1);
                    line(-bsize * 0.15, -bsize * 0.2, bsize * 0.15, -bsize * 0.2);
                    line(0, -bsize * 0.2, 0, bsize * 0.3);
                    noStroke();

                } else {
                    fill(boneColor);
                    beginShape();
                    vertex(-bsize * 0.15, -bsize * 0.5);
                    bezierVertex(-bsize * 0.1, -bsize * 0.3,
                        -bsize * 0.08, -bsize * 0.1,
                        -bsize * 0.12, bsize * 0.2);
                    vertex(-bsize * 0.3, bsize * 0.45);
                    vertex(-bsize * 0.12, bsize * 0.5);
                    vertex(0, bsize * 0.3);
                    vertex(bsize * 0.12, bsize * 0.5);
                    vertex(bsize * 0.3, bsize * 0.45);
                    vertex(bsize * 0.12, bsize * 0.2);
                    bezierVertex(bsize * 0.08, -bsize * 0.1,
                        bsize * 0.1, -bsize * 0.3,
                        bsize * 0.15, -bsize * 0.5);
                    endShape(CLOSE);

                    fill(red(boneColor) - 15, green(boneColor) - 15, blue(boneColor) - 15, 180);
                    ellipse(0, -bsize * 0.5, bsize * 0.2, bsize * 0.25);
                    ellipse(-bsize * 0.22, bsize * 0.48, bsize * 0.15, bsize * 0.18);
                    ellipse(bsize * 0.22, bsize * 0.48, bsize * 0.15, bsize * 0.18);
                }

                for (let crack = 0; crack < floor(random() * 3); crack++) {
                    stroke(red(boneColor) - 40, green(boneColor) - 40, blue(boneColor) - 40, 180);
                    strokeWeight(0.8);

                    const cx1 = random(-bsize * 0.3, bsize * 0.3);
                    const cy1 = random(-bsize * 0.4, bsize * 0.4);
                    const cx2 = cx1 + random(-10, 10);
                    const cy2 = cy1 + random(-15, 15);

                    line(cx1, cy1, cx2, cy2);
                }
                noStroke();

                pop();

                fill(10, 10, 12, 120);
                ellipse(bx, by + 8, bsize * 0.8, bsize * 0.3);
            }

            if (theme === 'graveyard' && random() > 0.4) {
                const skullX = width * (0.3 + random() * 0.4);
                const skullY = height - (40 + random() * 80);
                const skullSize = 40 + random() * 60;

                let skullColor = color(200, 195, 185);
                if (lighting === 'redGlow') {
                    skullColor = color(210, 170, 165);
                }

                push();
                translate(skullX, skullY);

                fill(skullColor);
                ellipse(0, 0, skullSize, skullSize * 1.1);

                fill(red(skullColor) - 15, green(skullColor) - 15, blue(skullColor) - 15, 180);
                ellipse(0, skullSize * 0.1, skullSize * 0.85, skullSize * 0.95);

                fill(8, 8, 10, 240);
                ellipse(-skullSize * 0.2, -skullSize * 0.15, skullSize * 0.22, skullSize * 0.28);
                ellipse(skullSize * 0.2, -skullSize * 0.15, skullSize * 0.22, skullSize * 0.28);

                beginShape();
                vertex(0, skullSize * 0.05);
                vertex(-skullSize * 0.08, skullSize * 0.15);
                vertex(0, skullSize * 0.2);
                vertex(skullSize * 0.08, skullSize * 0.15);
                endShape(CLOSE);

                for (let t = 0; t < 6; t++) {
                    const tx = -skullSize * 0.25 + t * (skullSize * 0.1);
                    rect(tx, skullSize * 0.35, skullSize * 0.08, skullSize * 0.15, 2);
                }

                pop();

                fill(10, 10, 12, 130);
                ellipse(skullX, skullY + skullSize * 0.6, skullSize * 1.2, skullSize * 0.4);
            }

            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
