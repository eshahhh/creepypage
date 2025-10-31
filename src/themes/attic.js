(function () {
    const comp = {
        name: 'attic',
        fragments: [
            "dusty memories",
            "creaking floors",
            "forgotten treasures",
            "whispers in the rafters",
            "old secrets",
            "hidden in the attic"
        ],
        titles: [
            "The Forgotten Attic",
            "Whispers in the Rafters",
            "Dusty Secrets",
            "The Hidden Loft",
            "Echoes of the Past",
            "Attic of Shadows"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 300);

            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const c = lerpColor(color(25, 20, 15), color(35, 30, 25), t);
                stroke(c); line(0, y, width, y);
            }

            push();
            noStroke();
            const lx = width * (0.4 + random() * 0.2);
            const ly = height * (0.2 + random() * 0.3);
            const lightSize = 100 + random() * 50;

            blendMode(ADD);
            for (let r = 0; r < 5; r++) {
                const rayAngle = random(-PI / 6, PI / 6);
                const rayWidth = lightSize * (0.6 + random() * 0.4);

                fill(255, 240, 200, 8);
                push();
                translate(lx, ly);
                rotate(rayAngle);
                beginShape();
                vertex(-rayWidth * 0.3, 0);
                vertex(rayWidth * 0.3, 0);
                vertex(rayWidth * 0.8, height - ly);
                vertex(-rayWidth * 0.8, height - ly);
                endShape(CLOSE);
                pop();
            }
            blendMode(BLEND);

            for (let i = 4; i >= 0; i--) {
                fill(255, 240, 200, 25 - i * 4);
                ellipse(lx, ly, lightSize * (1.4 - i * 0.15), lightSize * (1.4 - i * 0.15));
            }
            fill(255, 245, 210, 100);
            rect(lx - lightSize * 0.4, ly - lightSize * 0.5, lightSize * 0.8, lightSize);

            stroke(40, 35, 30, 150);
            strokeWeight(4);
            line(lx, ly - lightSize * 0.5, lx, ly + lightSize * 0.5);
            line(lx - lightSize * 0.4, ly, lx + lightSize * 0.4, ly);
            noStroke();
            pop();

            push();
            noStroke();
            for (let i = 0; i < 50; i++) {
                const dx = lx + random(-lightSize, lightSize);
                const dy = ly + random(0, height - ly);
                const dustSize = random() * 2 + 0.5;
                const dustBrightness = 200 + random() * 55;
                fill(dustBrightness, dustBrightness - 20, dustBrightness - 40, random() * 100 + 50);
                ellipse(dx, dy, dustSize, dustSize);
            }
            pop();

            push();
            noStroke();
            fill(30, 25, 20, 250);
            beginShape();
            vertex(0, height * 0.3);
            vertex(width, height * 0.2);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);

            stroke(25, 20, 15, 100);
            strokeWeight(2);
            for (let i = 0; i < 15; i++) {
                const plankX = (i / 15) * width;
                const y1 = height * 0.3 + (width - plankX) * 0.1 / width;
                const y2 = height;
                line(plankX, y1, plankX, y2);
            }
            noStroke();
            pop();

            push();
            fill(20, 15, 10, 255);
            stroke(20, 15, 10);
            strokeWeight(10);
            const rafterCount = 5;
            for (let i = 0; i < rafterCount; i++) {
                const x1 = i * width / rafterCount;
                const x2 = (i + 1) * width / rafterCount;
                const y1 = height * (0.3 + random() * 0.08);
                const y2 = height * (0.2 + random() * 0.08);

                strokeWeight(12);
                line(x1, y1, x2, y2);

                if (random() > 0.5) {
                    strokeWeight(6);
                    const midX = (x1 + x2) / 2;
                    const midY = (y1 + y2) / 2;
                    line(midX, midY, midX + random(-20, 20), midY + random(40, 80));
                }
            }
            noStroke();
            pop();

            push();
            stroke(200, 200, 210, 100);
            strokeWeight(1);
            noFill();
            for (let w = 0; w < 4; w++) {
                const webX = w < 2 ? random() * width * 0.3 : width * 0.7 + random() * width * 0.3;
                const webY = height * (0.25 + random() * 0.15);
                const webSize = 40 + random() * 60;

                for (let a = 0; a < 8; a++) {
                    const angle = (a / 8) * TWO_PI;
                    line(webX, webY, webX + cos(angle) * webSize, webY + sin(angle) * webSize);
                }

                for (let r = 0.3; r <= 1; r += 0.35) {
                    ellipse(webX, webY, webSize * r * 2, webSize * r * 2);
                }
            }
            noStroke();
            pop();

            push();
            const itemCount = 6 + floor(random() * 4);
            for (let i = 0; i < itemCount; i++) {
                const w = 40 + random() * 80;
                const h = 30 + random() * 60;
                const x = random() * width;
                const y = height - (20 + random() * 100);

                const itemType = floor(random() * 3);

                if (itemType === 0) {
                    fill(35, 25, 20, 255);
                    rect(x, y - h, w, h, 4);
                    stroke(60, 50, 40);
                    strokeWeight(3);
                    line(x, y - h * 0.5, x + w, y - h * 0.5);
                    noStroke();
                    fill(80, 60, 40);
                    rect(x + w * 0.4, y - h * 0.7, w * 0.2, h * 0.3, 2);
                } else if (itemType === 1) {
                    fill(30, 25, 20, 255);
                    rect(x, y - h, w, h * 0.6, 3);
                    fill(25, 20, 15, 255);
                    rect(x + w * 0.1, y - h * 1.6, w * 0.7, h * 0.6, 3);
                } else {
                    fill(28, 22, 18, 255);
                    rect(x, y - h, w, h, 2);
                    rect(x + w * 0.1, y - h - 10, w * 0.3, 10);
                    rect(x + w * 0.6, y - h - 10, w * 0.3, 10);
                }
            }
            pop();

            push();
            fill(240, 230, 210, 180);
            for (let i = 0; i < 10; i++) {
                const px = random() * width;
                const py = height - random() * 60;
                const pw = 10 + random() * 25;
                const ph = pw * 1.4;

                push();
                translate(px, py);
                rotate(random(-PI / 4, PI / 4));
                rect(0, 0, pw, ph, 1);
                stroke(180, 170, 160, 100);
                strokeWeight(0.5);
                for (let l = 0; l < 3; l++) {
                    line(2, 4 + l * 4, pw - 2, 4 + l * 4);
                }
                noStroke();
                pop();
            }
            pop();
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();