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
            if (seed !== undefined) randomSeed(seed + 55);
            return floor(random() * components.length);
        },
        choose(seed) {
            const idx = this.chooseIndex(seed);
            return idx >= 0 ? components[idx] : null;
        },
        applyRandom(seed) {
            if (components.length === 0) return null;
            if (seed !== undefined) randomSeed(seed + 55);
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
                    console.warn('Themes component failed:', comp.name, e);
                }
            }
            return applied.length ? { name: applied[0].name, names: applied.map(c => c.name) } : null;
        },
        applyByName(name, seed) {
            const comp = components.find(c => c.name === name);
            if (!comp) return null;
            if (seed !== undefined) randomSeed(seed + 55);
            comp.apply(seed);
            return comp;
        }
    };

    if (!window.Themes) window.Themes = api;
    else Object.assign(window.Themes, api);
})();