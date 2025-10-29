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
            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const c = lerpColor(color(15, 20, 10), color(25, 35, 20), t);
                stroke(c); line(0, y, width, y);
            }
            push();
            noStroke();
            fill(240, 240, 220, 120);
            const mx = width * (0.3 + random() * 0.4);
            const my = height * (0.05 + random() * 0.15);
            ellipse(mx, my, 50 + random() * 30, 50 + random() * 30);
            pop();
            noStroke();
            fill(20, 30, 15, 220);
            beginShape();
            vertex(0, height);
            for (let i = 0; i < 8; i++) {
                const dx = (i + 1) * width / 8;
                const h = height * 0.55 + noise(i * 0.4 + seed * 0.0001) * height * 0.2;
                vertex(dx, h);
            }
            vertex(width, height);
            endShape(CLOSE);
            fill(10, 15, 5, 255);
            const count = 10;
            for (let i = 0; i < count; i++) {
                const w = 20 + random() * 60;
                const h = 100 + random() * 200;
                const x = random() * width;
                const y = height - (5 + random() * 50);
                rect(x, y - h, w, h, 2);
            }
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();