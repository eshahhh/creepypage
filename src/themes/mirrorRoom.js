(function () {
    const comp = {
        name: 'mirrorRoom',
        fragments: [
            "reflections lie",
            "shattered glass",
            "infinite echoes",
            "distorted reality",
            "mirrored souls",
            "broken reflections"
        ],
        titles: [
            "The Mirror Room",
            "Shattered Reflections",
            "Infinite Hall",
            "Distorted Reality",
            "The Glass Chamber",
            "Echoes of Mirrors"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 500);
            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const c = lerpColor(color(20, 20, 25), color(30, 30, 35), t);
                stroke(c); line(0, y, width, y);
            }
            push();
            noStroke();
            fill(200, 220, 255, 60);
            const gx = width * (0.2 + random() * 0.6);
            const gy = height * (0.1 + random() * 0.3);
            ellipse(gx, gy, 120 + random() * 80, 120 + random() * 80);
            pop();
            noStroke();
            fill(25, 25, 30, 200);
            beginShape();
            vertex(0, height);
            for (let i = 0; i < 8; i++) {
                const dx = (i + 1) * width / 8;
                const h = height * 0.6 + noise(i * 0.3 + seed * 0.0001) * height * 0.1;
                vertex(dx, h);
            }
            vertex(width, height);
            endShape(CLOSE);
            fill(15, 15, 18, 255);
            const count = 7;
            for (let i = 0; i < count; i++) {
                const w = 50 + random() * 100;
                const h = 80 + random() * 150;
                const x = random() * width;
                const y = height - (15 + random() * 70);
                rect(x, y - h, w, h, 6);
                fill(200, 220, 255, 50);
                rect(x + 5, y - h + 5, w - 10, h - 10, 4);
            }
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();