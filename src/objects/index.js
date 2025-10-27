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
            if (seed !== undefined) randomSeed(seed + 7777);
            return floor(random() * components.length);
        },
        choose(seed) {
            const idx = this.chooseIndex(seed);
            return idx >= 0 ? components[idx] : null;
        },
        applyRandom(seed, lightingName, atmosphereName, themeName) {
            if (components.length === 0) return null;
            if (seed !== undefined) randomSeed(seed + 8888);
            const maxCount = min(3, components.length);
            const count = floor(random(1, maxCount + 1));
            const applied = [];
            for (let i = 0; i < count; i++) {
                const idx = floor(random() * components.length);
                const comp = components[idx];
                try {
                    comp.apply(seed !== undefined ? seed + i * 10000 : undefined, lightingName, atmosphereName, themeName);
                    applied.push(comp);
                } catch (e) {
                    console.warn('Objects component failed:', comp.name, e);
                }
            }
            return applied.length ? { name: applied[0].name, names: applied.map(c => c.name) } : null;
        },
        applyByName(name, seed, lightingName, atmosphereName, themeName) {
            const comp = components.find(c => c.name === name);
            if (!comp) return null;
            if (seed !== undefined) randomSeed(seed + 9999);
            comp.apply(seed, lightingName, atmosphereName, themeName);
            return comp;
        }
    };

    if (!window.Objects) window.Objects = api;
    else Object.assign(window.Objects, api);
})();
