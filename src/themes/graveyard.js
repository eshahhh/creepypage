(function () {
    const comp = {
        name: 'graveyard',
        fragments: [
            "rest in peace",
            "the dead walk",
            "whispers from the grave",
            "forgotten souls",
            "eternal night",
            "shadows linger"
        ],
        titles: [
            "The Forgotten Graveyard",
            "Whispers of the Tomb",
            "Eternal Rest",
            "Shadows of the Past",
            "The Silent Cemetery",
            "Graves of the Forgotten"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 100);
            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const c = lerpColor(color(10, 10, 15), color(20, 15, 30), t);
                stroke(c); line(0, y, width, y);
            }
            push();
            noStroke();
            fill(240, 240, 220, 150);
            const mx = width * (0.2 + random() * 0.6);
            const my = height * (0.1 + random() * 0.2);
            ellipse(mx, my, 60 + random() * 40, 60 + random() * 40);
            pop();
            noStroke();
            fill(15, 15, 30, 200);
            beginShape();
            vertex(0, height);
            for (let i = 0; i < 8; i++) {
                const dx = (i + 1) * width / 8;
                const h = height * 0.6 + noise(i * 0.4 + seed * 0.0001) * height * 0.15;
                vertex(dx, h);
            }
            vertex(width, height);
            endShape(CLOSE);
            fill(6, 6, 8, 255);
            const count = 8;
            for (let i = 0; i < count; i++) {
                const w = 30 + random() * 80;
                const h = 60 + random() * 150;
                const x = random() * width;
                const y = height - (10 + random() * 80);
                rect(x, y - h, w, h, 4);
            }
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();