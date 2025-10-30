(function () {
    const comp = {
        name: 'staticGlow',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 303);
            push();

            blendMode(ADD);

            noStroke();
            fill(255, 255, 255, 10 + random() * 12);
            rect(0, 0, width, height);

            stroke(255, 255, 255, 6 + random() * 8);
            strokeWeight(1);
            for (let i = 0; i < 40; i++) {
                const y = random() * height;
                const intensity = random();

                if (intensity > 0.5) {
                    strokeWeight(random() * 2 + 0.5);
                    stroke(255, 255, 255, 8 + random() * 10);
                } else {
                    strokeWeight(1);
                    stroke(255, 255, 255, 4 + random() * 6);
                }

                line(0, y, width, y);
            }

            noStroke();
            for (let i = 0; i < 200; i++) {
                const px = random() * width;
                const py = random() * height;
                const psize = random() * 3 + 0.5;
                const brightness = 200 + random() * 55;

                fill(brightness, brightness, brightness, random() * 120 + 60);
                rect(px, py, psize, psize);
            }

            for (let i = 0; i < 8; i++) {
                const bandY = (i * height / 8 + (seed * 2) % height) % height;
                const bandHeight = 5 + random() * 20;
                const bandIntensity = random();

                fill(255, 255, 255, bandIntensity * 25 + 5);
                rect(0, bandY, width, bandHeight);

                fill(255, 255, 255, bandIntensity * 15);
                rect(0, bandY - 2, width, 2);
                rect(0, bandY + bandHeight, width, 2);
            }

            for (let i = 0; i < 12; i++) {
                const streakY = random() * height;
                const streakWidth = random() * width * 0.6 + width * 0.2;
                const streakX = random() * width * 0.4;
                const streakHeight = 2 + random() * 6;

                fill(255, 255, 255, random() * 40 + 10);
                rect(streakX, streakY, streakWidth, streakHeight);
            }

            stroke(255, 255, 255, 15);
            for (let i = 0; i < 15; i++) {
                const x = random() * width;
                const segmentCount = floor(3 + random() * 6);
                strokeWeight(random() * 2 + 0.5);

                for (let s = 0; s < segmentCount; s++) {
                    const y1 = (s / segmentCount) * height;
                    const y2 = ((s + 0.7) / segmentCount) * height;
                    line(x + random(-3, 3), y1, x + random(-3, 3), y2);
                }
            }

            noStroke();
            for (let i = 0; i < 10; i++) {
                const gx = random() * width;
                const gy = random() * height;
                const gsize = 20 + random() * 80;

                fill(255, 255, 255, random() * 20 + 5);
                ellipse(gx, gy, gsize, gsize * 0.6);
                rect(gx - gsize * 0.3, gy, gsize * 0.6, gsize * 0.3);
            }

            for (let i = 0; i < 5; i++) {
                const fx = random() * width;
                const fy = random() * height;
                const fwidth = 80 + random() * 200;
                const fheight = 60 + random() * 150;

                fill(255, 255, 255, random() * 15 + 3);
                rect(fx, fy, fwidth, fheight);
            }

            fill(255, 255, 255, 8);
            for (let i = 0; i < 5; i++) {
                const inset = i * 20;
                noFill();
                stroke(255, 255, 255, 10 - i * 2);
                strokeWeight(15 - i * 2);
                rect(inset, inset, width - inset * 2, height - inset * 2);
            }

            noStroke();
            for (let i = 0; i < 15; i++) {
                const cx = random() * width;
                const cy = random() * height;
                const csize = 10 + random() * 30;

                fill(255, 100, 100, random() * 30);
                ellipse(cx - 2, cy, csize, csize);

                fill(100, 255, 100, random() * 30);
                ellipse(cx, cy, csize, csize);

                fill(100, 100, 255, random() * 30);
                ellipse(cx + 2, cy, csize, csize);
            }

            noFill();
            stroke(220, 240, 255, 40);
            for (let a = 0; a < 6; a++) {
                strokeWeight(random() * 3 + 1);

                beginShape();
                let x = random() * width;
                let y = random() * height;
                vertex(x, y);

                for (let p = 0; p < 6; p++) {
                    x += random(-50, 50);
                    y += random(-50, 50);
                    x = constrain(x, 0, width);
                    y = constrain(y, 0, height);
                    vertex(x, y);
                }
                endShape();
            }

            blendMode(BLEND);
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
