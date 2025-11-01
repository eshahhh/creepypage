(function () {
    const comp = {
        name: 'lighthouse',
        fragments: [
            "waves crash below",
            "the beacon turns",
            "lost at sea",
            "guiding light",
            "storm approaches",
            "keeper's watch"
        ],
        titles: [
            "The Lonely Lighthouse",
            "Beacon in the Dark",
            "Storm's Edge",
            "The Keeper's Watch",
            "Light Over Deep Waters",
            "Sentinel of the Shore"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 700);

            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const skyColor = lerpColor(color(15, 12, 25), color(28, 25, 40), pow(t, 1.2));
                stroke(skyColor);
                line(0, y, width, y);
            }

            push();
            noStroke();
            for (let i = 0; i < 60; i++) {
                const sx = random(width);
                const sy = random(height * 0.5);
                const brightness = random(180, 255);
                fill(brightness, brightness, brightness - 20, random(100, 200));
                ellipse(sx, sy, random(1, 3), random(1, 3));
            }
            pop();

            push();
            noStroke();
            const moonX = width * (0.7 + random() * 0.2);
            const moonY = height * (0.15 + random() * 0.1);
            const moonSize = 60 + random() * 30;

            for (let i = 0; i < 20; i++) {
                const t = i / 20;
                const alpha = pow(1 - t, 2) * 30;
                fill(240, 240, 220, alpha);
                ellipse(moonX, moonY, moonSize + i * 8, moonSize + i * 8);
            }

            fill(240, 240, 220, 200);
            ellipse(moonX, moonY, moonSize, moonSize);
            fill(220, 220, 200, 100);
            ellipse(moonX - moonSize * 0.15, moonY - moonSize * 0.1, moonSize * 0.25, moonSize * 0.25);
            pop();

            push();
            noStroke();
            for (let layer = 0; layer < 3; layer++) {
                const baseY = height * (0.6 + layer * 0.05);
                const waveCount = 8 + layer * 2;
                const darkness = 255 - layer * 30;

                fill(20 - layer * 5, 25 - layer * 5, 35 - layer * 5, darkness);
                beginShape();
                vertex(0, height);
                for (let i = 0; i <= waveCount; i++) {
                    const x = (i / waveCount) * width;
                    const waveHeight = sin((i / waveCount) * TWO_PI * 2 + seed * 0.001) * height * 0.03;
                    const noiseOffset = noise(i * 0.2 + seed * 0.001 + layer) * height * 0.05;
                    vertex(x, baseY + waveHeight + noiseOffset);
                }
                vertex(width, height);
                endShape(CLOSE);
            }
            pop();

            push();
            const lighthouseX = width * (0.25 + random() * 0.15);
            const groundY = height * (0.65 + random() * 0.05);
            const lighthouseHeight = height * (0.4 + random() * 0.1);
            const baseWidth = 60 + random() * 30;

            fill(10, 10, 15, 255);
            noStroke();
            beginShape();
            vertex(lighthouseX - baseWidth * 0.7, groundY);
            vertex(lighthouseX - baseWidth * 0.4, groundY - lighthouseHeight);
            vertex(lighthouseX + baseWidth * 0.4, groundY - lighthouseHeight);
            vertex(lighthouseX + baseWidth * 0.7, groundY);
            endShape(CLOSE);

            stroke(30, 30, 40, 150);
            strokeWeight(2);
            for (let i = 0; i < 8; i++) {
                const stripY = groundY - (i / 8) * lighthouseHeight;
                line(lighthouseX - baseWidth * 0.65, stripY,
                    lighthouseX + baseWidth * 0.65, stripY);
            }
            noStroke();

            if (floor(random(2)) === 0) {
                fill(40, 35, 45, 255);
                for (let i = 0; i < 4; i++) {
                    const stripY = groundY - (i * 2 + 1) * lighthouseHeight / 8;
                    const stripHeight = lighthouseHeight / 8;
                    const stripW1 = baseWidth * (0.4 + (lighthouseHeight - (stripY - groundY)) / lighthouseHeight * 0.3);
                    const stripW2 = baseWidth * (0.4 + (lighthouseHeight - (stripY - groundY + stripHeight)) / lighthouseHeight * 0.3);

                    quad(
                        lighthouseX - stripW1, stripY,
                        lighthouseX + stripW1, stripY,
                        lighthouseX + stripW2, stripY - stripHeight,
                        lighthouseX - stripW2, stripY - stripHeight
                    );
                }
            }

            const lanternY = groundY - lighthouseHeight - 15;
            const lanternSize = baseWidth * 0.8;

            fill(15, 15, 20, 255);
            rect(lighthouseX - lanternSize * 0.6, lanternY - 5, lanternSize * 1.2, 5);
            rect(lighthouseX - lanternSize * 0.5, lanternY - 35, lanternSize, 30);

            stroke(255, 240, 200, 180);
            strokeWeight(2);
            fill(255, 240, 150, 100);
            rect(lighthouseX - lanternSize * 0.45, lanternY - 33, lanternSize * 0.9, 26);
            noStroke();

            const roofHeight = 20;
            fill(10, 10, 15, 255);
            triangle(
                lighthouseX - lanternSize * 0.6, lanternY - 35,
                lighthouseX + lanternSize * 0.6, lanternY - 35,
                lighthouseX, lanternY - 35 - roofHeight
            );

            blendMode(ADD);
            const beamAngle = random(-PI / 6, PI / 6);
            const beamLength = width * 1.5;

            for (let i = 0; i < 30; i++) {
                const t = i / 30;
                const beamWidth = 80 + i * 20;
                const alpha = pow(1 - t, 2) * 20;

                fill(255, 240, 180, alpha);
                push();
                translate(lighthouseX, lanternY - 20);
                rotate(beamAngle);
                beginShape();
                vertex(-beamWidth * 0.1, 0);
                vertex(beamWidth * 0.1, 0);
                vertex(beamWidth * 0.5, -beamLength);
                vertex(-beamWidth * 0.5, -beamLength);
                endShape(CLOSE);
                pop();
            }
            blendMode(BLEND);

            for (let p = 0; p < 15; p++) {
                const px = lighthouseX + random(-60, 60);
                const py = lanternY - random(0, 80);
                fill(255, 240, 200, random(80, 150));
                ellipse(px, py, random(2, 5), random(2, 5));
            }
            pop();

            push();
            fill(8, 12, 15, 255);
            noStroke();
            const rockCount = 12;
            for (let i = 0; i < rockCount; i++) {
                const rx = random(width);
                const ry = height * 0.65 + random() * height * 0.2;
                const rw = 30 + random() * 60;
                const rh = 20 + random() * 40;

                ellipse(rx, ry, rw, rh);

                fill(6, 9, 12, 200);
                ellipse(rx - rw * 0.2, ry - rh * 0.2, rw * 0.4, rh * 0.3);
            }
            pop();

            push();
            stroke(200, 220, 240, 80);
            strokeWeight(2);
            noFill();
            for (let w = 0; w < 8; w++) {
                const wx = random(width);
                const wy = height * (0.6 + random() * 0.15);
                const waveSize = 20 + random() * 30;

                beginShape();
                for (let i = 0; i < 5; i++) {
                    const x = wx + i * 10;
                    const y = wy + sin(i + seed * 0.01) * waveSize * 0.3;
                    vertex(x, y);
                }
                endShape();
            }
            noStroke();
            pop();
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();
