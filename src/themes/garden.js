(function () {
    const comp = {
        name: 'garden',
        fragments: [
            "overgrown paths",
            "thorns entwine",
            "wilted roses",
            "poisoned soil",
            "moonflowers bloom",
            "garden of decay"
        ],
        titles: [
            "The Forgotten Garden",
            "Moonlit Roses",
            "Garden of Thorns",
            "Withered Paradise",
            "The Poison Garden",
            "Overgrown Sanctuary"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 900);

            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const skyColor = lerpColor(color(12, 10, 18), color(25, 22, 35), pow(t, 1.3));
                const noise_val = noise(y * 0.015, seed * 0.001) * 5;
                const c = color(
                    red(skyColor) + noise_val,
                    green(skyColor) + noise_val,
                    blue(skyColor) + noise_val
                );
                stroke(c);
                line(0, y, width, y);
            }

            push();
            noStroke();
            const moonX = width * (0.65 + random() * 0.2);
            const moonY = height * (0.12 + random() * 0.08);
            const moonSize = 70 + random() * 30;

            for (let i = 0; i < 20; i++) {
                const t = i / 20;
                const alpha = pow(1 - t, 2) * 25;
                fill(220, 230, 240, alpha);
                ellipse(moonX, moonY, moonSize + i * 10, moonSize + i * 10);
            }

            fill(230, 235, 245, 200);
            ellipse(moonX, moonY, moonSize, moonSize);
            fill(210, 215, 225, 120);
            ellipse(moonX - moonSize * 0.2, moonY, moonSize * 0.3, moonSize * 0.3);
            pop();

            push();
            noStroke();
            for (let i = 0; i < 50; i++) {
                const sx = random(width);
                const sy = random(height * 0.4);
                fill(220, 230, 240, random(100, 200));
                ellipse(sx, sy, random(1, 2.5), random(1, 2.5));
            }
            pop();

            push();
            noStroke();
            fill(18, 22, 15, 200);
            beginShape();
            vertex(0, height);
            for (let i = 0; i <= 20; i++) {
                const x = (i / 20) * width;
                const y = height * 0.6 + noise(i * 0.3 + seed * 0.001) * height * 0.12;
                vertex(x, y);
            }
            vertex(width, height);
            endShape(CLOSE);
            pop();

            push();
            fill(15, 18, 12, 230);
            noStroke();
            beginShape();
            vertex(0, height);
            for (let i = 0; i <= 18; i++) {
                const x = (i / 18) * width;
                const y = height * 0.7 + noise(i * 0.4 + seed * 0.002) * height * 0.1;
                vertex(x, y);
            }
            vertex(width, height);
            endShape(CLOSE);
            pop();

            push();
            const archCount = 3;
            for (let a = 0; a < archCount; a++) {
                const ax = width * (0.2 + a * 0.3);
                const ay = height * (0.5 + random() * 0.1);
                const archWidth = 80 + random() * 40;
                const archHeight = 120 + random() * 60;

                stroke(15, 18, 12, 200);
                strokeWeight(8);
                noFill();

                push();
                translate(ax, ay);

                beginShape();
                vertex(-archWidth * 0.5, archHeight * 0.5);
                vertex(-archWidth * 0.5, 0);
                for (let i = 0; i <= 10; i++) {
                    const t = i / 10;
                    const angle = PI + t * PI;
                    const x = cos(angle) * archWidth * 0.5;
                    const y = sin(angle) * archHeight * 0.4;
                    vertex(x, y);
                }
                vertex(archWidth * 0.5, 0);
                vertex(archWidth * 0.5, archHeight * 0.5);
                endShape();

                stroke(25, 35, 20, 180);
                strokeWeight(3);
                for (let v = 0; v < 8; v++) {
                    const vx = random(-archWidth * 0.4, archWidth * 0.4);
                    const vy = random(-archHeight * 0.2, archHeight * 0.3);
                    const vlen = random(20, 50);

                    noFill();
                    beginShape();
                    for (let p = 0; p < 8; p++) {
                        const px = vx + sin(p * 0.5) * 8;
                        const py = vy + (p / 8) * vlen;
                        vertex(px, py);
                    }
                    endShape();
                }

                noStroke();
                pop();
            }
            pop();

            push();
            const roseCount = 15;
            for (let i = 0; i < roseCount; i++) {
                const rx = random(width * 0.1, width * 0.9);
                const ry = height * (0.6 + random() * 0.25);
                const roseSize = 15 + random() * 25;
                const stemHeight = 40 + random() * 80;

                stroke(20, 30, 15, 200);
                strokeWeight(3);
                noFill();
                beginShape();
                vertex(rx, ry);
                const midY = ry - stemHeight * 0.5;
                const midX = rx + random(-10, 10);
                vertex(midX, midY);
                vertex(rx + random(-5, 5), ry - stemHeight);
                endShape();

                const leafCount = floor(random(2, 5));
                for (let l = 0; l < leafCount; l++) {
                    const leafY = ry - random(stemHeight * 0.3, stemHeight * 0.8);
                    const leafSide = random() > 0.5 ? 1 : -1;
                    const leafSize = random(8, 15);

                    fill(25, 40, 20, 180);
                    noStroke();
                    ellipse(rx + leafSide * leafSize * 0.5, leafY, leafSize, leafSize * 1.5);
                }

                const roseColor = random() > 0.7 ?
                    color(180, 40, 60, 200) :
                    color(80, 50, 80, 200);

                noStroke();
                for (let p = 0; p < 8; p++) {
                    const angle = (p / 8) * TWO_PI;
                    const petalDist = roseSize * 0.4;
                    fill(roseColor);
                    push();
                    translate(rx, ry - stemHeight);
                    rotate(angle);
                    ellipse(petalDist, 0, roseSize * 0.5, roseSize * 0.8);
                    pop();
                }

                fill(red(roseColor) - 20, green(roseColor) - 10, blue(roseColor) - 10);
                ellipse(rx, ry - stemHeight, roseSize * 0.4, roseSize * 0.4);

                if (random() > 0.7) {
                    stroke(40, 60, 40, 150);
                    strokeWeight(1);
                    for (let t = 0; t < 3; t++) {
                        const thornY = ry - random(stemHeight);
                        const thornLen = random(3, 7);
                        const thornAngle = random(-PI / 4, PI / 4);
                        line(rx, thornY,
                            rx + cos(thornAngle) * thornLen,
                            thornY + sin(thornAngle) * thornLen);
                    }
                    noStroke();
                }
            }
            pop();

            push();
            const pathWidth = width * 0.3;
            const pathX = width * 0.5;

            fill(35, 32, 38, 180);
            noStroke();
            beginShape();
            vertex(pathX - pathWidth * 0.5, height);
            vertex(pathX - pathWidth * 0.15, height * 0.7);
            vertex(pathX + pathWidth * 0.15, height * 0.7);
            vertex(pathX + pathWidth * 0.5, height);
            endShape(CLOSE);

            fill(40, 37, 42, 120);
            for (let i = 0; i < 20; i++) {
                const stoneX = pathX + random(-pathWidth * 0.4, pathWidth * 0.4);
                const stoneY = height * 0.7 + random() * height * 0.3;
                const stoneSize = random(8, 20);
                ellipse(stoneX, stoneY, stoneSize, stoneSize * 0.8);
            }
            pop();

            push();
            noStroke();
            for (let i = 0; i < 10; i++) {
                const fx = random(width);
                const fy = height * (0.65 + random() * 0.2);
                const fsize = random(2, 5);

                for (let g = 0; g < 3; g++) {
                    fill(180, 255, 180, 40 - g * 10);
                    ellipse(fx, fy, fsize + g * 3, fsize + g * 3);
                }

                fill(200, 255, 200, 200);
                ellipse(fx, fy, fsize, fsize);
            }
            pop();

            push();
            const fountainX = width * (0.3 + random() * 0.4);
            const fountainY = height * 0.72;
            const fountainSize = 60 + random() * 30;

            fill(25, 30, 28, 255);
            ellipse(fountainX, fountainY, fountainSize * 1.4, fountainSize * 0.4);

            fill(30, 35, 33, 200);
            ellipse(fountainX, fountainY - 5, fountainSize * 1.3, fountainSize * 0.35);

            fill(40, 50, 55, 150);
            ellipse(fountainX, fountainY - 8, fountainSize * 0.8, fountainSize * 0.25);

            stroke(60, 80, 90, 100);
            strokeWeight(1);
            noFill();
            for (let d = 0; d < 5; d++) {
                const dx = random(-fountainSize * 0.3, fountainSize * 0.3);
                const dy = -random(15, 35);

                beginShape();
                vertex(fountainX + dx, fountainY - 8);
                vertex(fountainX + dx + random(-5, 5), fountainY - 8 + dy * 0.5);
                vertex(fountainX + dx + random(-3, 3), fountainY - 8 + dy);
                endShape();
            }
            noStroke();
            pop();

            push();
            fill(180, 200, 180, 60);
            noStroke();
            for (let i = 0; i < 5; i++) {
                const mistX = width * (0.2 + i * 0.15);
                const mistY = height * 0.75 + random() * height * 0.1;
                ellipse(mistX, mistY, width * 0.15, 40);
            }
            pop();
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();
