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
            if (seed !== undefined) randomSeed(seed);
            return floor(random() * components.length);
        },
        choose(seed) {
            const idx = this.chooseIndex(seed);
            return idx >= 0 ? components[idx] : null;
        },
        applyRandom(seed, atmosphereName, themeName) {
            if (components.length === 0) return null;
            if (seed !== undefined) randomSeed(seed);
            const maxCount = 1;
            const count = 1;
            const applied = [];
            for (let i = 0; i < count; i++) {
                const idx = floor(random() * components.length);
                const comp = components[idx];
                try {
                    comp.apply(seed !== undefined ? seed + i * 10000 : undefined);
                    applied.push(comp);
                } catch (e) {
                    console.warn('Lighting component failed:', comp.name, e);
                }
            }
            return applied.length ? { name: applied[0].name, names: applied.map(c => c.name) } : null;
        },
        applyByName(name, seed, atmosphereName, themeName) {
            const comp = components.find(c => c.name === name);
            if (!comp) return null;
            if (seed !== undefined) randomSeed(seed);
            comp.apply(seed);
            return comp;
        }
    };

    if (!window.Lighting) window.Lighting = api;
    else Object.assign(window.Lighting, api);
})();
