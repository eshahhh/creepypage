(function () {
    const comp = {
        name: 'forest',
        fragments: [
            "whispers in the trees",
            "roots entwine",
            "the forest watches",
            "ancient secrets",
            "leaves rustle",
            "hidden paths"
        ],
        titles: [
            "The Enchanted Forest",
            "Whispers of the Woods",
            "Ancient Grove",
            "Shadows of the Trees",
            "The Forgotten Path",
            "Enchanted Thicket"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 200);

            // Deep forest gradient sky
            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const c = lerpColor(color(12, 18, 8), color(25, 38, 18), t);
                stroke(c); line(0, y, width, y);
            }

            // Fireflies scattered in forest
            push();
            noStroke();
            for (let i = 0; i < 25; i++) {
                const fx = random() * width;
                const fy = random() * height * 0.8 + height * 0.1;
                const brightness = random() * 100 + 155;
                const size = random() * 3 + 1;

                // Glow effect
                for (let g = 0; g < 3; g++) {
                    fill(brightness, brightness - 20, 50, 30 - g * 8);
                    ellipse(fx, fy, size * (3 - g), size * (3 - g));
                }
                fill(255, 255, 180, 200);
                ellipse(fx, fy, size, size);
            }
            pop();

            // Moon through trees
            push();
            noStroke();
            const mx = width * (0.3 + random() * 0.4);
            const my = height * (0.05 + random() * 0.15);
            const moonSize = 50 + random() * 30;

            // Filtered moonlight
            for (let i = 3; i >= 0; i--) {
                fill(240, 255, 220, 15 - i * 3);
                ellipse(mx, my, moonSize * (1.5 - i * 0.12), moonSize * (1.5 - i * 0.12));
            }
            fill(240, 245, 220, 160);
            ellipse(mx, my, moonSize, moonSize);
            pop();

            // Distant tree line with layered depth
            push();
            noStroke();
            fill(25, 35, 18, 180);
            beginShape();
            vertex(0, height);
            for (let i = 0; i <= 15; i++) {
                const dx = i * width / 15;
                const h = height * 0.65 + noise(i * 0.25 + seed * 0.0001) * height * 0.15;
                vertex(dx, h);
            }
            vertex(width, height);
            endShape(CLOSE);
            pop();

            // Mid-ground forest layer with varied canopy
            push();
            noStroke();
            fill(20, 30, 15, 230);
            beginShape();
            vertex(0, height);
            for (let i = 0; i <= 12; i++) {
                const dx = i * width / 12;
                const h = height * 0.55 + noise(i * 0.4 + seed * 0.0001) * height * 0.2;
                vertex(dx, h);
            }
            vertex(width, height);
            endShape(CLOSE);
            pop();

            // Ground mist and undergrowth
            push();
            noStroke();
            fill(30, 45, 25, 40);
            for (let i = 0; i < 8; i++) {
                const mistX = width * (random() * 0.8 + 0.1);
                const mistY = height * 0.7 + random() * height * 0.2;
                ellipse(mistX, mistY, width * 0.2, 30 + random() * 20);
            }
            pop();

            // Foreground tree trunks with texture and variety
            push();
            fill(10, 15, 5, 255);
            const treeCount = 10 + floor(random() * 5);
            for (let i = 0; i < treeCount; i++) {
                const tx = random() * width;
                const ty = height - (5 + random() * 50);
                const treeHeight = 100 + random() * 250;
                const trunkWidth = 20 + random() * 60;

                // Main trunk with taper
                push();
                translate(tx, ty);

                // Draw tapered trunk
                beginShape();
                vertex(-trunkWidth * 0.5, 0);
                vertex(-trunkWidth * 0.3, -treeHeight);
                vertex(trunkWidth * 0.3, -treeHeight);
                vertex(trunkWidth * 0.5, 0);
                endShape(CLOSE);

                // Bark texture
                stroke(8, 12, 3, 100);
                strokeWeight(1);
                for (let b = 0; b < 5; b++) {
                    const barkY = -random() * treeHeight;
                    line(-trunkWidth * 0.4, barkY, trunkWidth * 0.4, barkY + random() * 20);
                }
                noStroke();

                // Roots
                fill(8, 12, 3, 255);
                for (let r = 0; r < 3; r++) {
                    const rootAngle = random(-PI / 4, PI / 4);
                    const rootLen = trunkWidth * (0.8 + random() * 0.6);
                    push();
                    rotate(rootAngle);
                    ellipse(0, rootLen * 0.5, trunkWidth * 0.3, rootLen);
                    pop();
                }

                // Hanging vines
                if (random() > 0.6) {
                    stroke(15, 25, 10, 180);
                    strokeWeight(2);
                    for (let v = 0; v < 2; v++) {
                        const vineX = random(-trunkWidth * 0.3, trunkWidth * 0.3);
                        const vineStart = -treeHeight * (0.5 + random() * 0.4);
                        const vineLen = random() * treeHeight * 0.4;
                        noFill();
                        beginShape();
                        for (let vp = 0; vp < 10; vp++) {
                            const vpY = vineStart + (vp / 10) * vineLen;
                            const vpX = vineX + sin(vp) * 5;
                            vertex(vpX, vpY);
                        }
                        endShape();
                    }
                    noStroke();
                }

                pop();
            }
            pop();

            // Forest floor ferns and plants
            push();
            noStroke();
            fill(15, 25, 10, 200);
            for (let i = 0; i < 15; i++) {
                const px = random() * width;
                const py = height - random() * 40;
                const psize = 10 + random() * 30;

                // Simple fern shape
                for (let f = 0; f < 5; f++) {
                    const angle = -PI / 2 + (f - 2) * 0.3;
                    push();
                    translate(px, py);
                    rotate(angle);
                    ellipse(0, -psize * 0.5, psize * 0.3, psize);
                    pop();
                }
            }
            pop();
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();