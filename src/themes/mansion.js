(function () {
    const comp = {
        name: 'mansion',
        fragments: [
            "grand and empty",
            "portraits watch you",
            "creaking stairs",
            "abandoned splendor",
            "dust settles",
            "echoes of wealth"
        ],
        titles: [
            "The Abandoned Mansion",
            "Hall of Portraits",
            "Decaying Grandeur",
            "The Empty Estate",
            "Forgotten Manor",
            "Shadows of Wealth"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 800);

            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const wallColor = lerpColor(color(22, 18, 25), color(35, 28, 38), pow(t, 1.4));
                stroke(wallColor);
                line(0, y, width, y);
            }

            push();
            stroke(40, 35, 42, 100);
            strokeWeight(1);
            const panelRows = 4;
            const panelCols = 6;
            const panelPadding = 30;
            const panelWidth = (width - panelPadding * 2) / panelCols;
            const panelHeight = (height - panelPadding * 2) / panelRows;

            for (let row = 0; row < panelRows; row++) {
                for (let col = 0; col < panelCols; col++) {
                    const px = panelPadding + col * panelWidth;
                    const py = panelPadding + row * panelHeight;
                    noFill();
                    rect(px + 10, py + 10, panelWidth - 20, panelHeight - 20);
                }
            }
            noStroke();
            pop();

            push();
            const chandelierX = width * 0.5;
            const chandelierY = height * 0.15;
            const chainHeight = 60;

            stroke(60, 55, 50);
            strokeWeight(2);
            line(chandelierX, 0, chandelierX, chandelierY - chainHeight);
            noStroke();

            fill(80, 70, 60, 255);
            ellipse(chandelierX, chandelierY - chainHeight, 10, chainHeight);

            const armCount = 6;
            const chandelierRadius = 80;

            fill(100, 90, 70, 255);
            ellipse(chandelierX, chandelierY, 40, 15);

            for (let i = 0; i < armCount; i++) {
                const angle = (i / armCount) * TWO_PI;
                const armX = chandelierX + cos(angle) * chandelierRadius;
                const armY = chandelierY + sin(angle) * chandelierRadius * 0.3;

                stroke(80, 70, 60);
                strokeWeight(3);
                noFill();
                beginShape();
                vertex(chandelierX, chandelierY);
                const midX = (chandelierX + armX) * 0.5;
                const midY = chandelierY + 20;
                vertex(midX, midY);
                vertex(armX, armY);
                endShape();
                noStroke();

                fill(220, 200, 150, 255);
                ellipse(armX, armY, 12, 18);

                blendMode(ADD);
                for (let g = 0; g < 15; g++) {
                    const t = g / 15;
                    const glowSize = 30 - g * 1.5;
                    const alpha = pow(1 - t, 2) * 25;
                    fill(255, 220, 150, alpha);
                    ellipse(armX, armY - 5, glowSize, glowSize * 1.2);
                }
                blendMode(BLEND);

                fill(255, 240, 200, 220);
                ellipse(armX, armY - 8, 8, 10);
            }

            fill(90, 80, 65, 255);
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * TWO_PI;
                const dx = cos(angle) * 50;
                const dy = sin(angle) * 15;
                triangle(
                    chandelierX + dx, chandelierY + dy,
                    chandelierX + dx + 5, chandelierY + dy + 15,
                    chandelierX + dx - 5, chandelierY + dy + 15
                );
            }
            pop();

            push();
            const windowCount = 3;
            const windowWidth = 100;
            const windowHeight = 180;
            const windowY = height * 0.25;

            for (let i = 0; i < windowCount; i++) {
                const wx = width * (0.2 + i * 0.3);

                fill(8, 10, 18, 255);
                rect(wx - windowWidth * 0.5, windowY, windowWidth, windowHeight, 5);

                fill(15, 18, 30, 200);
                rect(wx - windowWidth * 0.45, windowY + 5, windowWidth * 0.9, windowHeight - 10, 3);

                stroke(10, 12, 20);
                strokeWeight(4);
                line(wx, windowY, wx, windowY + windowHeight);
                line(wx - windowWidth * 0.5, windowY + windowHeight * 0.5,
                    wx + windowWidth * 0.5, windowY + windowHeight * 0.5);
                noStroke();

                if (random() > 0.5) {
                    blendMode(ADD);
                    fill(180, 200, 220, 30);
                    rect(wx - windowWidth * 0.45, windowY + 5, windowWidth * 0.9, windowHeight - 10, 3);
                    blendMode(BLEND);
                }

                fill(60, 58, 55, 200);
                rect(wx - windowWidth * 0.6, windowY, windowWidth * 1.2, 20);
                rect(wx - windowWidth * 0.6, windowY + windowHeight - 20, windowWidth * 1.2, 20);
            }
            pop();

            push();
            const portraitCount = 5;
            const portraitWidth = 80;
            const portraitHeight = 110;
            const portraitY = height * 0.55;

            for (let i = 0; i < portraitCount; i++) {
                const px = width * (0.1 + i * 0.18);

                fill(60, 50, 40, 255);
                rect(px - portraitWidth * 0.55, portraitY - portraitHeight * 0.55,
                    portraitWidth * 1.1, portraitHeight * 1.1, 3);

                fill(40, 35, 30, 255);
                rect(px - portraitWidth * 0.5, portraitY - portraitHeight * 0.5,
                    portraitWidth, portraitHeight);

                const figureWidth = portraitWidth * 0.6;
                const figureHeight = portraitHeight * 0.7;
                const figureY = portraitY + portraitHeight * 0.1;

                fill(80, 70, 60, 255);
                ellipse(px, figureY - figureHeight * 0.3, figureWidth * 0.5, figureWidth * 0.5);

                fill(90, 75, 65, 255);
                beginShape();
                vertex(px - figureWidth * 0.4, figureY - figureHeight * 0.15);
                vertex(px + figureWidth * 0.4, figureY - figureHeight * 0.15);
                vertex(px + figureWidth * 0.5, figureY + figureHeight * 0.15);
                vertex(px - figureWidth * 0.5, figureY + figureHeight * 0.15);
                endShape(CLOSE);

                if (random() > 0.4) {
                    fill(200, 50, 50, 180);
                    ellipse(px - figureWidth * 0.12, figureY - figureHeight * 0.35, 6, 6);
                    ellipse(px + figureWidth * 0.12, figureY - figureHeight * 0.35, 6, 6);
                }
            }
            pop();

            push();
            fill(15, 12, 18, 255);
            noStroke();
            beginShape();
            vertex(0, height);
            for (let i = 0; i <= 20; i++) {
                const x = (i / 20) * width;
                const y = height * 0.75 + noise(i * 0.2 + seed * 0.001) * height * 0.05;
                vertex(x, y);
            }
            vertex(width, height);
            endShape(CLOSE);

            stroke(20, 18, 25, 150);
            strokeWeight(2);
            for (let i = 0; i < 15; i++) {
                const fx = (i / 15) * width;
                line(fx, height * 0.75, fx, height);
            }
            noStroke();

            const furnitureCount = 8;
            for (let i = 0; i < furnitureCount; i++) {
                const fx = random(width);
                const fy = height - random(height * 0.15);
                const fw = 40 + random() * 60;
                const fh = 30 + random() * 50;

                fill(25, 20, 22, 255);

                const furnType = floor(random(3));
                if (furnType === 0) {
                    rect(fx, fy - fh, fw, fh, 3);
                    fill(20, 16, 18);
                    rect(fx + 5, fy - fh + 5, fw - 10, 5);
                } else if (furnType === 1) {
                    rect(fx, fy - fh * 0.6, fw, fh * 0.6);
                    rect(fx - 5, fy - fh, fw + 10, fh * 0.4, 2);
                } else {
                    ellipse(fx + fw * 0.5, fy - fh * 0.5, fw, fh);
                    rect(fx + fw * 0.4, fy - fh * 0.5, fw * 0.2, fh * 0.5);
                }
            }
            pop();

            push();
            fill(200, 190, 180, 100);
            noStroke();
            for (let i = 0; i < 12; i++) {
                const dx = random(width);
                const dy = random(height);
                const dsize = random(1, 4);
                ellipse(dx, dy, dsize, dsize);
            }
            pop();
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();
