(function () {
    const comp = {
        name: 'attic',
        fragments: [
            "dusty memories",
            "creaking floors",
            "forgotten treasures",
            "whispers in the rafters",
            "old secrets",
            "hidden in the attic"
        ],
        titles: [
            "The Forgotten Attic",
            "Whispers in the Rafters",
            "Dusty Secrets",
            "The Hidden Loft",
            "Echoes of the Past",
            "Attic of Shadows"
        ],
        apply(seed) {
            if (seed !== undefined) randomSeed(seed + 300);
            for (let y = 0; y < height; y++) {
                const t = map(y, 0, height, 0, 1);
                const c = lerpColor(color(25, 20, 15), color(35, 30, 25), t);
                stroke(c); line(0, y, width, y);
            }
            push();
            noStroke();
            fill(255, 240, 200, 80);
            const lx = width * (0.4 + random() * 0.2);
            const ly = height * (0.2 + random() * 0.3);
            ellipse(lx, ly, 100 + random() * 50, 100 + random() * 50);
            pop();
            noStroke();
            fill(30, 25, 20, 250);
            beginShape();
            vertex(0, height * 0.3);
            vertex(width, height * 0.2);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);
            fill(20, 15, 10, 255);
            for (let i = 0; i < 5; i++) {
                const x1 = i * width / 5;
                const x2 = (i + 1) * width / 5;
                const y1 = height * (0.3 + random() * 0.1);
                const y2 = height * (0.2 + random() * 0.1);
                stroke(20, 15, 10);
                strokeWeight(8);
                line(x1, y1, x2, y2);
                noStroke();
            }
            const count = 6;
            for (let i = 0; i < count; i++) {
                const w = 40 + random() * 80;
                const h = 30 + random() * 60;
                const x = random() * width;
                const y = height - (20 + random() * 100);
                rect(x, y - h, w, h, 4);
            }
        }
    };

    if (window.Themes) window.Themes.register(comp);
    else window.addEventListener('load', () => window.Themes && window.Themes.register(comp));
})();