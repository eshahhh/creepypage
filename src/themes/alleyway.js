(function () {
    const comp = {
        name: 'alleyway',
        fragments: [
            "narrow passages",
            "echoes in the dark",
            "hidden alleys",
            "shadowy corners",
            "forgotten streets",
            "whispers of the city"
        ],
        titles: [
            "The Narrow Alley",
            "Shadows of the Street",
            "Forgotten Passage",
            "Echoes in the Dark",
            "The Hidden Alleyway",
            "City Shadows"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 400);
            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const c = lerpColor(color(12, 12, 15), color(22, 20, 25), t);
                stroke(c); line(0, y, width, y);
            }
            push();
            noStroke();
            fill(255, 250, 200, 100);
            const lx = width * (0.5 + random() * 0.3);
            const ly = height * (0.3 + random() * 0.2);
            ellipse(lx, ly, 80 + random() * 40, 80 + random() * 40);
            pop();
            noStroke();
            fill(15, 15, 20, 240);
            beginShape();
            vertex(0, height);
            for (let i = 0; i < 6; i++) {
                const dx = (i + 1) * width / 6;
                const h = height * 0.5 + noise(i * 0.5 + seed * 0.0001) * height * 0.2;
                vertex(dx, h);
            }
            vertex(width, height);
            endShape(CLOSE);
            fill(10, 10, 12, 255);
            const count = 12;
            for (let i = 0; i < count; i++) {
                const w = 20 + random() * 50;
                const h = 60 + random() * 120;
                const x = random() * width;
                const y = height - (5 + random() * 60);
                rect(x, y - h, w, h, 2);
            }
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();