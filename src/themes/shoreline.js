(function () {
    const comp = {
        name: 'shoreline',
        fragments: [
            "waves crash",
            "sandy shores",
            "forgotten beach",
            "tides whisper",
            "ocean's call",
            "distant horizons"
        ],
        titles: [
            "The Forgotten Shore",
            "Whispers of the Tide",
            "Sandy Graves",
            "Ocean's Edge",
            "The Haunted Beach",
            "Tides of Night"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 600);

            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const c = lerpColor(color(15, 18, 28), color(25, 30, 40), t);
                stroke(c); line(0, y, width, y);
            }

            push();
            noStroke();
            for (let i = 0; i < 30; i++) {
                const sx = random() * width;
                const sy = random() * height * 0.4;
                const brightness = 180 + random() * 75;
                fill(brightness, brightness, brightness - 20, random() * 120 + 80);
                ellipse(sx, sy, random() * 2.5 + 0.5, random() * 2.5 + 0.5);
            }
            pop();

            push();
            noStroke();
            const mx = width * (0.3 + random() * 0.4);
            const my = height * (0.08 + random() * 0.12);
            const moonSize = 70 + random() * 50;

            for (let i = 5; i >= 0; i--) {
                fill(240, 245, 230, 25 - i * 4);
                ellipse(mx, my, moonSize * (1.8 - i * 0.12), moonSize * (1.8 - i * 0.12));
            }

            fill(240, 245, 230, 180);
            ellipse(mx, my, moonSize, moonSize);

            fill(220, 225, 210, 100);
            ellipse(mx - moonSize * 0.2, my - moonSize * 0.1, moonSize * 0.25, moonSize * 0.25);
            ellipse(mx + moonSize * 0.15, my + moonSize * 0.2, moonSize * 0.18, moonSize * 0.18);
            pop();

            push();
            noStroke();
            for (let i = 0; i < 6; i++) {
                const cx = width * random();
                const cy = height * (0.15 + random() * 0.15);
                fill(20, 22, 30, 120);
                ellipse(cx, cy, width * 0.2, height * 0.08);
                ellipse(cx + 40, cy + 10, width * 0.15, height * 0.06);
            }
            pop();

            push();
            noStroke();
            fill(12, 18, 28, 240);
            beginShape();
            vertex(0, height);
            for (let i = 0; i <= 15; i++) {
                const dx = i * width / 15;
                const h = height * 0.65 + noise(i * 0.6 + seed * 0.0001) * height * 0.08;
                vertex(dx, h);
            }
            vertex(width, height);
            endShape(CLOSE);
            pop();

            push();
            noStroke();
            const reflectionStart = height * 0.65;
            const reflectionSegments = 10;

            for (let i = 0; i < reflectionSegments; i++) {
                const t = i / reflectionSegments;
                const segmentY = reflectionStart + t * (height - reflectionStart);
                const segmentWidth = moonSize * (0.5 + t * 1.5);
                const shimmer = noise(i * 0.5 + seed * 0.001) * 15;

                fill(240, 245, 220, 40 - t * 30);
                ellipse(mx + shimmer, segmentY, segmentWidth, 8 + t * 12);
            }
            pop();

            push();
            noStroke();
            for (let w = 0; w < 8; w++) {
                const waveY = height * 0.7 + w * 15;
                const wavePhase = seed * 0.01 + w * 0.3;

                fill(18, 22, 32, 180);
                beginShape();
                for (let x = 0; x <= width; x += 20) {
                    const waveHeight = sin((x * 0.01 + wavePhase)) * 8;
                    vertex(x, waveY + waveHeight);
                }
                vertex(width, height);
                vertex(0, height);
                endShape(CLOSE);

                if (random() > 0.5) {
                    fill(200, 220, 240, 80);
                    for (let f = 0; f < 5; f++) {
                        const fx = random() * width;
                        const fy = waveY + sin((fx * 0.01 + wavePhase)) * 8;
                        ellipse(fx, fy, 10 + random() * 15, 3 + random() * 5);
                    }
                }
            }
            pop();

            push();
            noStroke();
            fill(8, 10, 15, 255);
            beginShape();
            vertex(0, height * 0.85);
            for (let i = 0; i <= 10; i++) {
                const dx = i * width / 10;
                const h = height * 0.85 + noise(i * 0.4 + seed * 0.002) * 10;
                vertex(dx, h);
            }
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);

            for (let s = 0; s < 100; s++) {
                fill(15, 18, 20, random() * 60 + 40);
                const sx = random() * width;
                const sy = height * 0.85 + random() * height * 0.15;
                ellipse(sx, sy, random() * 2 + 0.5, random() * 2 + 0.5);
            }
            pop();

            push();
            fill(8, 10, 12, 255);
            const debrisCount = 9 + floor(random() * 5);
            for (let i = 0; i < debrisCount; i++) {
                const dx = random() * width;
                const dy = height - (10 + random() * 60);
                const dw = 25 + random() * 70;
                const dh = 20 + random() * 80;
                const angle = random(-PI / 6, PI / 6);

                push();
                translate(dx, dy);
                rotate(angle);

                if (random() > 0.4) {
                    fill(12, 10, 8);
                    ellipse(0, 0, dw, dh * 0.4);

                    stroke(8, 6, 4, 120);
                    strokeWeight(1);
                    for (let g = 0; g < 3; g++) {
                        line(-dw * 0.4, g * 5 - 5, dw * 0.4, g * 5 - 5);
                    }
                    noStroke();
                } else {
                    fill(10, 12, 15);
                    ellipse(0, 0, dw * 0.8, dh * 0.7);

                    fill(15, 25, 15, 160);
                    ellipse(random(-dw * 0.2, dw * 0.2), 0, dw * 0.3, dh * 0.25);
                }

                pop();
            }
            pop();

            push();
            stroke(20, 22, 28, 200);
            strokeWeight(2);
            noFill();
            for (let b = 0; b < 5; b++) {
                const bx = random() * width;
                const by = height * (0.3 + random() * 0.3);
                const bsize = 8 + random() * 12;

                arc(bx, by, bsize, bsize * 0.4, PI, TWO_PI);
            }
            noStroke();
            pop();

            if (random() > 0.5) {
                push();
                const lx = width * (0.1 + random() * 0.8);
                const ly = height * 0.68;

                fill(15, 15, 18, 200);
                rect(lx - 4, ly - 40, 8, 40);
                rect(lx - 6, ly - 45, 12, 8);

                stroke(255, 255, 200, 60);
                strokeWeight(30);
                const beamAngle = (seed * 0.01) % TWO_PI;
                line(lx, ly - 45, lx + cos(beamAngle) * 100, ly - 45 + sin(beamAngle) * 100);
                noStroke();

                fill(255, 255, 180, 180);
                ellipse(lx, ly - 45, 6, 6);
                pop();
            }
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();