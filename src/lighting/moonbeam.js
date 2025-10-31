(function () {
    const comp = {
        name: 'moonbeam',
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 707);
            push();
            noStroke();

            const beamX = width * (0.2 + random() * 0.6);
            const beamY = 0;
            const beamTargetX = beamX + random(-width * 0.1, width * 0.1);
            const beamTargetY = height * (0.7 + random() * 0.2);
            const beamWidth = min(width, height) * 0.15;

            blendMode(ADD);

            for (let layer = 0; layer < 30; layer++) {
                const t = layer / 30;
                const yPos = lerp(beamY, beamTargetY, t);
                const currentX = lerp(beamX, beamTargetX, t);
                const spread = beamWidth * (0.4 + t * 0.8);
                const turbulence = noise(t * 6 + seed * 0.001) * spread * 0.15;
                const alpha = lerp(50, 2, pow(t, 0.6));

                fill(245, 250, 255, alpha * (0.8 + random() * 0.2));

                beginShape();
                vertex(currentX - spread * 0.5 + turbulence, yPos);
                vertex(currentX + spread * 0.5 - turbulence, yPos);
                vertex(currentX + spread * 0.6, yPos + 25);
                vertex(currentX - spread * 0.6, yPos + 25);
                endShape(CLOSE);
            }

            for (let i = 0; i < 70; i++) {
                const t = pow(random(), 0.7);
                const yPos = lerp(beamY, beamTargetY, t);
                const currentX = lerp(beamX, beamTargetX, t);
                const spread = beamWidth * (0.4 + t * 0.8);
                const px = currentX + (random() - 0.5) * spread;
                const psize = random() * 2.5 + 0.8;
                const brightness = 248 + random() * 7;
                const intensity = 1 - t * 0.5;

                fill(brightness, brightness + 2, 255, random() * 110 * intensity + 25);
                ellipse(px, yPos, psize, psize);

                if (random() > 0.75) {
                    fill(brightness, brightness + 2, 255, random() * 35 * intensity);
                    ellipse(px, yPos, psize * 3, psize * 3);
                }
            }

            fill(248, 252, 255, 35);
            ellipse(beamTargetX, beamTargetY, beamWidth * 2, beamWidth * 1.2);

            fill(245, 250, 255, 20);
            ellipse(beamTargetX, beamTargetY, beamWidth * 2.5, beamWidth * 1.6);

            for (let ring = 0; ring < 5; ring++) {
                const ringRadius = beamWidth * (0.8 + ring * 0.4);
                const alpha = 30 - ring * 5;
                fill(248, 252, 255, alpha);
                ellipse(beamTargetX, beamTargetY, ringRadius * 2, ringRadius * 1.5);
            }

            for (let i = 0; i < 50; i++) {
                const angle = random(TWO_PI);
                const dist = sqrt(random()) * beamWidth * 1.5;
                const px = beamTargetX + cos(angle) * dist;
                const py = beamTargetY + sin(angle) * dist * 0.7;
                const psize = random() * 2 + 0.5;
                const intensity = 1 - (dist / (beamWidth * 1.5));

                fill(250, 252, 255, random() * 80 * intensity + 30);
                ellipse(px, py, psize, psize);
            }

            fill(248, 250, 255, 8);
            ellipse(beamTargetX, beamTargetY + beamWidth * 0.8, beamWidth * 3, beamWidth * 0.7);

            blendMode(BLEND);
            pop();
        }
    };

    if (window.Lighting) window.Lighting.register(comp);
    else window.addEventListener('load', () => window.Lighting && window.Lighting.register(comp));
})();
