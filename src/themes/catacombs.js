(function () {
    const comp = {
        name: 'catacombs',
        fragments: [
            "bones surround you",
            "echoes of the dead",
            "endless corridors",
            "skulls in the walls",
            "buried secrets",
            "the weight of ages"
        ],
        titles: [
            "The Ancient Catacombs",
            "Halls of the Dead",
            "Ossuary of Shadows",
            "The Bone Labyrinth",
            "Crypt of Echoes",
            "Depths of the Departed"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 600);

            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const t2 = pow(t, 1.3);
                const baseColor = lerpColor(color(8, 6, 4), color(18, 14, 10), t2);
                const noise_val = noise(y * 0.02, seed * 0.001) * 6 - 3;
                const c = color(
                    red(baseColor) + noise_val,
                    green(baseColor) + noise_val,
                    blue(baseColor) + noise_val
                );
                stroke(c);
                line(0, y, width, y);
            }

            push();
            noStroke();
            const torchX = width * (0.15 + random() * 0.1);
            const torchY = height * (0.3 + random() * 0.1);

            blendMode(ADD);
            for (let i = 0; i < 25; i++) {
                const t = i / 25;
                const radius = 180 - i * 6;
                const alpha = pow(1 - t, 2) * 15;
                fill(255, 120 - i * 2, 30 - i, alpha);
                ellipse(torchX, torchY, radius, radius);
            }
            blendMode(BLEND);

            fill(200, 80, 20, 200);
            ellipse(torchX, torchY, 15, 25);
            fill(255, 200, 100, 180);
            ellipse(torchX, torchY - 8, 10, 15);

            for (let p = 0; p < 8; p++) {
                const px = torchX + random(-60, 60);
                const py = torchY - random(0, 40);
                fill(255, 180, 80, random(80, 150));
                ellipse(px, py, random(2, 5), random(2, 5));
            }
            pop();

            push();
            stroke(25, 20, 15, 100);
            strokeWeight(2);
            fill(15, 12, 10, 255);

            const archWidth = width * 0.6;
            const archHeight = height * 0.5;
            const archX = width * 0.5;
            const archY = height * 0.2;

            push();
            translate(archX, archY);
            beginShape();
            vertex(-archWidth * 0.5, archHeight);
            vertex(-archWidth * 0.5, 0);
            for (let i = 0; i <= 20; i++) {
                const t = i / 20;
                const angle = PI + t * PI;
                const x = cos(angle) * archWidth * 0.5;
                const y = sin(angle) * archHeight * 0.3;
                vertex(x, y);
            }
            vertex(archWidth * 0.5, 0);
            vertex(archWidth * 0.5, archHeight);
            endShape();

            for (let b = 0; b < 12; b++) {
                const bx = -archWidth * 0.5 + (b / 12) * archWidth;
                stroke(20, 16, 12, 150);
                strokeWeight(1);
                line(bx, 0, bx, archHeight * 0.3);
            }
            noStroke();
            pop();
            pop();

            push();
            fill(12, 10, 8, 240);
            noStroke();

            const rowCount = 4;
            const colCount = 8;
            const nicheWidth = width * 0.08;
            const nicheHeight = height * 0.12;

            for (let row = 0; row < rowCount; row++) {
                for (let col = 0; col < colCount; col++) {
                    if (random() > 0.3) {
                        const nx = width * 0.1 + col * (width * 0.8 / colCount);
                        const ny = height * 0.5 + row * nicheHeight * 1.2;

                        fill(8, 6, 4, 255);
                        rect(nx, ny, nicheWidth, nicheHeight, 3);

                        fill(5, 4, 3, 200);
                        rect(nx + 2, ny + 2, nicheWidth - 4, nicheHeight - 4, 2);

                        if (random() > 0.4) {
                            const skullSize = nicheWidth * 0.6;
                            const sx = nx + nicheWidth * 0.5;
                            const sy = ny + nicheHeight * 0.4;

                            fill(160, 150, 130, 200);
                            ellipse(sx, sy, skullSize, skullSize * 0.9);

                            fill(10, 8, 6);
                            const eyeSize = skullSize * 0.2;
                            ellipse(sx - skullSize * 0.2, sy - skullSize * 0.1, eyeSize, eyeSize * 1.2);
                            ellipse(sx + skullSize * 0.2, sy - skullSize * 0.1, eyeSize, eyeSize * 1.2);

                            fill(140, 130, 110);
                            ellipse(sx, sy + skullSize * 0.25, skullSize * 0.15, skullSize * 0.15);
                        }

                        if (random() > 0.6) {
                            const boneCount = floor(random(2, 5));
                            for (let b = 0; b < boneCount; b++) {
                                fill(140, 130, 110, 180);
                                const bx = nx + random(nicheWidth * 0.2, nicheWidth * 0.8);
                                const by = ny + nicheHeight * 0.7;
                                const blen = random(nicheWidth * 0.2, nicheWidth * 0.4);
                                push();
                                translate(bx, by);
                                rotate(random(-PI / 6, PI / 6));
                                rect(-blen * 0.5, -2, blen, 4, 2);
                                ellipse(-blen * 0.5, 0, 5, 5);
                                ellipse(blen * 0.5, 0, 5, 5);
                                pop();
                            }
                        }
                    }
                }
            }
            pop();

            push();
            stroke(20, 16, 12, 200);
            strokeWeight(4);
            fill(10, 8, 6, 255);

            const pillarCount = 6;
            for (let i = 0; i < pillarCount; i++) {
                const px = (i + 0.5) * (width / pillarCount);
                const pillarWidth = width * 0.05;
                const pillarHeight = height * 0.6;

                rect(px - pillarWidth * 0.5, height - pillarHeight, pillarWidth, pillarHeight);

                noStroke();
                fill(8, 6, 4);
                for (let s = 0; s < 3; s++) {
                    const sy = height - pillarHeight + (s + 1) * (pillarHeight / 4);
                    rect(px - pillarWidth * 0.6, sy - 3, pillarWidth * 1.2, 6);
                }

                stroke(20, 16, 12, 200);
                strokeWeight(4);
                fill(10, 8, 6, 255);
            }
            noStroke();
            pop();

            push();
            fill(18, 14, 10, 230);
            noStroke();
            beginShape();
            vertex(0, height);
            for (let i = 0; i <= 15; i++) {
                const x = (i / 15) * width;
                const y = height * 0.85 + noise(i * 0.3 + seed * 0.001) * height * 0.08;
                vertex(x, y);
            }
            vertex(width, height);
            endShape(CLOSE);

            fill(160, 150, 130, 150);
            for (let i = 0; i < 8; i++) {
                const rockX = random(width);
                const rockY = height - random(height * 0.1);
                const rockSize = random(10, 30);
                ellipse(rockX, rockY, rockSize, rockSize * 0.7);
            }
            pop();
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();
