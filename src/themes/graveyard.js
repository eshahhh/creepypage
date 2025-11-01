(function () {
    const comp = {
        name: 'graveyard',
        fragments: [
            "rest in peace",
            "the dead walk",
            "whispers from the grave",
            "forgotten souls",
            "eternal night",
            "shadows linger"
        ],
        titles: [
            "The Forgotten Graveyard",
            "Whispers of the Tomb",
            "Eternal Rest",
            "Shadows of the Past",
            "The Silent Cemetery",
            "Graves of the Forgotten"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 100);

            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const t2 = pow(t, 1.5);
                const baseColor = lerpColor(color(5, 5, 12), color(18, 12, 32), t2);
                const variance = noise(y * 0.01, seed * 0.001) * 8 - 4;
                const c = color(
                    red(baseColor) + variance,
                    green(baseColor) + variance,
                    blue(baseColor) + variance
                );
                stroke(c);
                line(0, y, width, y);
            }

            push();
            noStroke();
            for (let i = 0; i < 8; i++) {
                const cloudX = random(width);
                const cloudY = random(height * 0.3);
                const cloudSize = random(100, 300);
                fill(15, 15, 25, random(10, 30));
                for (let j = 0; j < 5; j++) {
                    const offsetX = random(-cloudSize * 0.3, cloudSize * 0.3);
                    const offsetY = random(-cloudSize * 0.15, cloudSize * 0.15);
                    ellipse(cloudX + offsetX, cloudY + offsetY, cloudSize * random(0.5, 1), cloudSize * 0.4);
                }
            }
            pop();

            push();
            noStroke();
            for (let i = 0; i < 40; i++) {
                const sx = random() * width;
                const sy = random() * height * 0.5;
                const brightness = random() * 150 + 105;
                fill(brightness, brightness, brightness - 10, random() * 100 + 100);
                ellipse(sx, sy, random() * 2 + 0.5, random() * 2 + 0.5);
            }
            pop();

            push();
            noStroke();
            const mx = width * (0.2 + random() * 0.6);
            const my = height * (0.1 + random() * 0.2);
            const moonSize = 60 + random() * 40;

            for (let i = 4; i >= 0; i--) {
                fill(240, 240, 220, 20 - i * 3);
                ellipse(mx, my, moonSize * (1.8 - i * 0.15), moonSize * (1.8 - i * 0.15));
            }

            fill(240, 240, 220, 200);
            ellipse(mx, my, moonSize, moonSize);
            fill(220, 220, 200, 80);
            ellipse(mx - moonSize * 0.2, my - moonSize * 0.15, moonSize * 0.3, moonSize * 0.3);
            ellipse(mx + moonSize * 0.15, my + moonSize * 0.2, moonSize * 0.2, moonSize * 0.2);
            pop();

            push();
            noStroke();
            fill(25, 25, 40, 150);
            beginShape();
            vertex(0, height);
            for (let i = 0; i <= 12; i++) {
                const dx = i * width / 12;
                const h = height * 0.7 + noise(i * 0.3 + seed * 0.0001) * height * 0.12;
                vertex(dx, h);
            }
            vertex(width, height);
            endShape(CLOSE);
            pop();

            push();
            noStroke();
            fill(15, 15, 30, 220);
            beginShape();
            vertex(0, height);
            for (let i = 0; i <= 10; i++) {
                const dx = i * width / 10;
                const h = height * 0.6 + noise(i * 0.4 + seed * 0.0001) * height * 0.15;
                vertex(dx, h);
            }
            vertex(width, height);
            endShape(CLOSE);
            pop();

            push();
            noStroke();
            for (let i = 0; i < 5; i++) {
                fill(200, 200, 220, 10 + i * 3);
                const fogY = height * 0.75 + i * 15;
                ellipse(width * (0.2 + i * 0.15), fogY, width * 0.4, 40);
            }
            pop();

            push();
            fill(6, 6, 8, 255);
            const treeCount = 5 + floor(random() * 4);
            for (let i = 0; i < treeCount; i++) {
                const tx = random() * width;
                const ty = height - (10 + random() * 60);
                const treeHeight = 80 + random() * 140;
                const trunkWidth = 8 + random() * 16;

                rect(tx - trunkWidth / 2, ty - treeHeight, trunkWidth, treeHeight, 2);

                stroke(6, 6, 8);
                strokeWeight(3 + random() * 4);
                for (let b = 0; b < 3 + floor(random() * 4); b++) {
                    const branchY = ty - treeHeight * (0.3 + random() * 0.6);
                    const branchLen = 20 + random() * 60;
                    const branchAngle = random(-PI / 3, PI / 3);
                    const endX = tx + cos(branchAngle) * branchLen;
                    const endY = branchY + sin(branchAngle) * branchLen;
                    line(tx, branchY, endX, endY);

                    // Sub-branches
                    if (random() > 0.5) {
                        const subLen = branchLen * 0.4;
                        const subAngle = branchAngle + random(-PI / 4, PI / 4);
                        line(endX, endY, endX + cos(subAngle) * subLen, endY + sin(subAngle) * subLen);
                    }
                }
                noStroke();
            }
            pop();

            push();
            const stoneCount = 8 + floor(random() * 6);
            for (let i = 0; i < stoneCount; i++) {
                const w = 30 + random() * 80;
                const h = 60 + random() * 150;
                const x = random() * width;
                const y = height - (10 + random() * 80);
                const tilt = random(-0.1, 0.1);
                const depth = random();

                push();
                translate(x, y);
                rotate(tilt);

                fill(6, 6, 8, 255);
                rect(-w / 2, -h, w, h, 4);

                fill(3, 3, 5, 200);
                rect(-w / 2 + 2, -h + 4, w - 4, h - 4, 3);

                fill(6, 6, 8, 255);
                if (random() > 0.5) {
                    arc(0, -h, w, w * 0.6, PI, 0, CHORD);
                } else {
                    rect(-w * 0.1, -h - w * 0.3, w * 0.2, w * 0.4);
                    rect(-w * 0.3, -h - w * 0.15, w * 0.6, w * 0.2);
                }

                stroke(10, 10, 12, 120);
                strokeWeight(1);
                for (let c = 0; c < 2; c++) {
                    line(-w / 4 + random() * w / 2, -h * 0.8, -w / 4 + random() * w / 2, -h * 0.3);
                }

                if (random() > 0.7) {
                    stroke(15, 15, 20, 60);
                    strokeWeight(0.5);
                    for (let v = 0; v < 3; v++) {
                        line(-w / 2 + random() * w, -h + random() * h * 0.7,
                            -w / 2 + random() * w, -h + random() * h * 0.7 + 20);
                    }
                }
                noStroke();

                if (random() > 0.6) {
                    fill(180, 200, 180, random(40, 80));
                    for (let m = 0; m < 3; m++) {
                        const mx = -w / 2 + random() * w;
                        const my = -h * random(0.4, 0.8);
                        ellipse(mx, my, random(5, 15), random(3, 8));
                    }
                }

                pop();
            }
            pop();
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();