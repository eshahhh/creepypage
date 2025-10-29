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
                const c = lerpColor(color(15, 18, 25), color(25, 28, 35), t);
                stroke(c); line(0, y, width, y);
            }
            push();
            noStroke();
            fill(240, 240, 220, 140);
            const mx = width * (0.3 + random() * 0.4);
            const my = height * (0.08 + random() * 0.12);
            ellipse(mx, my, 70 + random() * 50, 70 + random() * 50);
            pop();
            noStroke();
            fill(10, 15, 25, 220);
            beginShape();
            vertex(0, height);
            for (let i = 0; i < 8; i++) {
                const dx = (i + 1) * width / 8;
                const h = height * 0.65 + noise(i * 0.6 + seed * 0.0001) * height * 0.1;
                vertex(dx, h);
            }
            vertex(width, height);
            endShape(CLOSE);
            fill(8, 10, 12, 255);
            const count = 9;
            for (let i = 0; i < count; i++) {
                const w = 25 + random() * 70;
                const h = 20 + random() * 80;
                const x = random() * width;
                const y = height - (10 + random() * 60);
                ellipse(x, y - h / 2, w, h);
            }
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();