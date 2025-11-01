(function () {
    const comp = {
        name: 'books',
        apply(seed, lighting, atmosphere, theme) {
            if (seed !== undefined) randomSeed(seed + 1717);
            push();
            noStroke();

            const isShelf = random() > 0.5;
            const bookCount = isShelf ? floor(8 + random() * 15) : floor(3 + random() * 8);

            if (isShelf) {
                const shelfY = height * (0.5 + random() * 0.3);
                const shelfWidth = width * (0.4 + random() * 0.4);
                const shelfX = (width - shelfWidth) / 2;

                let tintR = 35, tintG = 30, tintB = 25;
                if (lighting === 'candlelight' || lighting === 'lantern') {
                    tintR = 70; tintG = 60; tintB = 45;
                } else if (lighting === 'redGlow') {
                    tintR = 80; tintG = 30; tintB = 30;
                } else if (lighting === 'fullMoon') {
                    tintR = 85; tintG = 95; tintB = 110;
                }

                fill(tintR - 10, tintG - 10, tintB - 10, 255);
                rect(shelfX - 20, shelfY, shelfWidth + 40, 12, 2);

                stroke(tintR - 20, tintG - 20, tintB - 20, 180);
                strokeWeight(1.5);
                line(shelfX - 15, shelfY, shelfX - 15, shelfY + 8);
                line(shelfX + shelfWidth + 15, shelfY, shelfX + shelfWidth + 15, shelfY + 8);
                noStroke();

                let currentX = shelfX;
                for (let b = 0; b < bookCount; b++) {
                    const bw = 12 + random() * 35;
                    const bh = 40 + random() * 80;
                    const tilt = random(-0.08, 0.08);

                    const spineHue = floor(random() * 3);
                    let br, bg, bb;
                    if (spineHue === 0) {
                        br = tintR + random() * 40;
                        bg = tintG + random() * 20;
                        bb = tintB + random() * 15;
                    } else if (spineHue === 1) {
                        br = tintR + random() * 20;
                        bg = tintG + random() * 40;
                        bb = tintB + random() * 25;
                    } else {
                        br = tintR + random() * 15;
                        bg = tintG + random() * 25;
                        bb = tintB + random() * 40;
                    }

                    push();
                    translate(currentX + bw / 2, shelfY);
                    rotate(tilt);

                    fill(br, bg, bb, 240);
                    rect(-bw / 2, -bh, bw, bh, 2);

                    fill(br - 20, bg - 20, bb - 20, 200);
                    rect(-bw / 2 + 2, -bh + 5, bw - 4, bh * 0.15, 1);

                    stroke(br + 20, bg + 20, bb + 20, 180);
                    strokeWeight(0.8);
                    for (let l = 0; l < 3; l++) {
                        const ly = -bh * (0.25 + l * 0.15);
                        line(-bw / 2 + 3, ly, bw / 2 - 3, ly);
                    }
                    noStroke();

                    fill(br + 30, bg + 30, bb + 30, 220);
                    rect(-bw / 2, -bh, bw * 0.15, bh, 1);

                    fill(10, 10, 12, 150);
                    rect(bw / 2 - 2, -bh * 0.9, 2, bh * 0.8);

                    pop();

                    currentX += bw + random(-3, 3);
                    if (currentX > shelfX + shelfWidth) break;
                }

                fill(5, 5, 8, 100);
                rect(shelfX, shelfY + 12, shelfWidth, 8, 0, 0, 4, 4);
            } else {
                for (let b = 0; b < bookCount; b++) {
                    const bx = random() * width;
                    const by = height - (20 + random() * 150);
                    const bw = 30 + random() * 70;
                    const bh = 8 + random() * 18;
                    const angle = random(-PI / 12, PI / 12);

                    let tintR = 40, tintG = 35, tintB = 30;
                    if (lighting === 'candlelight' || lighting === 'lantern') {
                        tintR = 75; tintG = 65; tintB = 50;
                    } else if (lighting === 'redGlow') {
                        tintR = 85; tintG = 35; tintB = 35;
                    } else if (lighting === 'fullMoon') {
                        tintR = 90; tintG = 100; tintB = 115;
                    }

                    const coverHue = floor(random() * 3);
                    let br, bg, bb;
                    if (coverHue === 0) {
                        br = tintR + random() * 50;
                        bg = tintG + random() * 25;
                        bb = tintB + random() * 20;
                    } else if (coverHue === 1) {
                        br = tintR + random() * 25;
                        bg = tintG + random() * 50;
                        bb = tintB + random() * 30;
                    } else {
                        br = tintR + random() * 20;
                        bg = tintG + random() * 30;
                        bb = tintB + random() * 50;
                    }

                    push();
                    translate(bx, by);
                    rotate(angle);

                    fill(br, bg, bb, 250);
                    rect(0, 0, bw, bh, 1);

                    fill(br - 25, bg - 25, bb - 25, 230);
                    rect(0, 0, bw * 0.1, bh);

                    fill(240, 235, 220, 200);
                    rect(bw * 0.15, bh * 0.15, bw * 0.7, bh * 0.7);

                    fill(220, 215, 200, 180);
                    for (let p = 0; p < floor(bh * 0.5); p++) {
                        rect(bw * 0.18, bh * 0.2 + p * 1.5, bw * 0.64, 0.8);
                    }

                    fill(5, 5, 8, 120);
                    rect(bw, bh * 0.15, 3, bh * 0.7);

                    pop();

                    fill(5, 5, 8, 100);
                    ellipse(bx + bw / 2, by + bh + 5, bw * 1.2, bh * 0.5);
                }
            }

            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
