(function () {
    const comp = {
        name: 'crows',
        apply(seed, lighting) {
            if (seed !== undefined) randomSeed(seed + 5050);
            push();
            noStroke();
            const count = floor(1 + random() * 6);
            for (let i = 0; i < count; i++) {
                const x = random() * width;
                const y = height * (0.2 + random() * 0.6);
                const s = 12 + random() * 44;
                fill(10, 10, 12, 230);
                push();
                translate(x, y);
                rotate(random(-0.5, 0.5));
                ellipse(0, 0, s * 1.2, s * 0.7);
                beginShape();
                vertex(-s * 0.2, 0);
                vertex(-s * 1.2, -s * 0.6);
                vertex(-s * 0.6, -s * 0.2);
                vertex(-s * 0.2, 0);
                endShape(CLOSE);
                triangle(s * 0.3, 0, s * 0.9, -s * 0.15, s * 0.9, s * 0.15);
                pop();
            }
            pop();
        }
    };

    if (window.Objects) window.Objects.register(comp);
    else window.addEventListener('load', () => window.Objects && window.Objects.register(comp));
})();
