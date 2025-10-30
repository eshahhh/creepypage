(function () {
    const comp = {
        name: 'chairs',
        apply(seed, lighting) {
            if (seed !== undefined) randomSeed(seed + 2020);
            push();
            noStroke();

            const count = floor(1 + random() * 5);
            for (let i = 0; i < count; i++) {
                const x = random() * width;
                const y = height - (10 + random() * 140);
                const sx = 22 + random() * 70;
                const sy = 22 + random() * 70;
                const tilt = random(-0.08, 0.08);

                let tintR = 20, tintG = 20, tintB = 24;
                if (lighting === 'candlelight' || lighting === 'lantern') {
                    tintR = 65; tintG = 52; tintB = 38;
                } else if (lighting === 'redGlow') {
                    tintR = 95; tintG = 22; tintB = 22;
                } else if (lighting === 'fullMoon') {
                    tintR = 82; tintG = 98; tintB = 115;
                }

                push();
                translate(x, y);
                rotate(tilt);

                fill(tintR - 5, tintG - 5, tintB - 5, 255);
                const legWidth = sx * 0.08;
                const legHeight = sy * 0.55;

                rect(-sx * 0.4, sy * 0.5, legWidth, legHeight, 2);
                rect(sx * 0.4 - legWidth, sy * 0.5, legWidth, legHeight, 2);

                rect(-sx * 0.4, -sy * 0.5, legWidth, sy + legHeight * 0.3, 2);
                rect(sx * 0.4 - legWidth, -sy * 0.5, legWidth, sy + legHeight * 0.3, 2);

                fill(tintR - 8, tintG - 8, tintB - 8, 240);
                rect(-sx * 0.4, sy * 0.35, sx * 0.8, legWidth, 2);

                fill(tintR, tintG, tintB, 255);
                rect(-sx * 0.5, -sy * 0.5, sx, sy * 0.15, 4);

                fill(tintR - 10, tintG - 10, tintB - 10, 200);
                ellipse(0, -sy * 0.42, sx * 0.6, sy * 0.1);

                stroke(tintR - 15, tintG - 15, tintB - 15, 180);
                strokeWeight(2);
                line(-sx * 0.5, -sy * 0.35, sx * 0.5, -sy * 0.35);
                noStroke();

                fill(tintR + 5, tintG + 5, tintB + 5, 255);
                rect(-sx * 0.48, -sy * 1.25, sx * 0.96, sy * 0.5, 4);

                fill(tintR - 8, tintG - 8, tintB - 8, 200);
                const slatCount = 3;
                for (let s = 0; s < slatCount; s++) {
                    const slatY = -sy * 1.18 + (s / (slatCount - 1)) * sy * 0.35;
                    rect(-sx * 0.42, slatY, sx * 0.84, sy * 0.04, 1);
                }

                fill(tintR + 10, tintG + 10, tintB + 10, 230);
                rect(-sx * 0.48, -sy * 1.28, sx * 0.96, sy * 0.08, 3);

                if (random() > 0.4) {
                    fill(tintR, tintG, tintB, 240);
                    rect(-sx * 0.55, -sy * 0.5, sx * 0.12, sy * 0.6, 3);
                    rect(-sx * 0.6, -sy * 0.55, sx * 0.22, sy * 0.1, 3);

                    rect(sx * 0.43, -sy * 0.5, sx * 0.12, sy * 0.6, 3);
                    rect(sx * 0.38, -sy * 0.55, sx * 0.22, sy * 0.1, 3);
                }

                stroke(tintR - 12, tintG - 12, tintB - 12, 100);
                strokeWeight(1);
                for (let g = 0; g < 4; g++) {
                    const grainY = -sy * 0.45 + g * sy * 0.15;
                    line(-sx * 0.45, grainY, sx * 0.45, grainY);
                }

                for (let g = 0; g < 3; g++) {
                    const grainY = -sy * 1.2 + g * sy * 0.12;
                    line(-sx * 0.43, grainY, sx * 0.43, grainY);
                }
                noStroke();

                fill(5, 5, 8, 120);
                ellipse(0, sy * 0.5 + legHeight, sx * 1.3, sy * 0.2);

                if (random() > 0.6) {
                    fill(tintR - 18, tintG - 18, tintB - 18, 180);
                    ellipse(random(-sx * 0.3, sx * 0.3), -sy * 0.45, sx * 0.15, sy * 0.08);
                }

                fill(200, 195, 190, 40);
                ellipse(0, -sy * 0.42, sx * 0.7, sy * 0.15);

                pop();
            }

            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
