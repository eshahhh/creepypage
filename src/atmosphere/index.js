(function () {
    const components = [];

    const api = {
        register(comp) {
            components.push(comp);
        },
        getAll() {
            return components.slice();
        },
        chooseIndex(seed) {
            if (components.length === 0) return -1;
            if (seed !== undefined) randomSeed(seed + 77);
            return floor(random() * components.length);
        },
        choose(seed) {
            const idx = this.chooseIndex(seed);
            return idx >= 0 ? components[idx] : null;
        },
        applyRandom(seed, theme) {
            if (components.length === 0) return null;
            if (seed !== undefined) randomSeed(seed + 77);
            const maxCount = 2;
            const count = floor(1 + random() * 2);
            const applied = [];
            for (let i = 0; i < count; i++) {
                const idx = floor(random() * components.length);
                const comp = components[idx];
                try {
                    comp.apply(seed !== undefined ? seed + i * 10000 : undefined);
                    applied.push(comp);
                } catch (e) {
                    console.warn('Atmosphere component failed:', comp.name, e);
                }
            }
            return applied.length ? { name: applied[0].name, names: applied.map(c => c.name) } : null;
        },
        applyByName(name, seed, theme) {
            const comp = components.find(c => c.name === name);
            if (!comp) return null;
            if (seed !== undefined) randomSeed(seed + 77);
            comp.apply(seed);
            return comp;
        }
    };

    if (!window.Atmosphere) window.Atmosphere = api;
    else Object.assign(window.Atmosphere, api);
})();
