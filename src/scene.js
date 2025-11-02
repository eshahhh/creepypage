let sceneSeed = 0;

function setup() {
    const mainCanvas = createCanvas(windowWidth, windowHeight);
    pixelDensity(window.devicePixelRatio || 1);
    noLoop();
    generateScene(sceneSeed);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    generateScene(sceneSeed);
}

function generateScene(seed = Math.floor(Math.random() * 1000000)) {
    sceneSeed = seed;
    clear();
    randomSeed(sceneSeed);
    noiseSeed(sceneSeed);

    let selectedThemeComponent = null;
    if (window.Themes) {
        selectedThemeComponent = window.Themes.applyRandom(sceneSeed);
    }

    let selectedAtmosphereComponent = null;
    if (window.Atmosphere) {
        selectedAtmosphereComponent = window.Atmosphere.applyRandom(sceneSeed, selectedThemeComponent && selectedThemeComponent.name);
    }

    let selectedLightingComponent = null;
    if (window.Lighting) {
        selectedLightingComponent = window.Lighting.applyRandom(sceneSeed, selectedAtmosphereComponent && selectedAtmosphereComponent.name, selectedThemeComponent && selectedThemeComponent.name);
    }

    let selectedObjectsComponent = null;
    if (window.Objects) {
        try {
            selectedObjectsComponent = window.Objects.applyRandom(
                sceneSeed,
                selectedLightingComponent && selectedLightingComponent.name,
                selectedAtmosphereComponent && selectedAtmosphereComponent.name,
                selectedThemeComponent && selectedThemeComponent.name
            );
        } catch (e) {
            console.warn('Objects.applyRandom failed', e);
        }
    }

    try {
        const themeComponentName = selectedThemeComponent && selectedThemeComponent.names.join(', ');
        const atmosphereComponentName = selectedAtmosphereComponent && selectedAtmosphereComponent.names.join(', ');
        const lightingComponentName = selectedLightingComponent && selectedLightingComponent.names.join(', ');
        const objectsComponentName = selectedObjectsComponent && selectedObjectsComponent.names.join(', ');
        window.__lastSceneMeta = {
            seed: sceneSeed,
            theme: themeComponentName || null,
            atmosphere: atmosphereComponentName || null,
            lighting: lightingComponentName || null,
            objects: objectsComponentName || null,
            atmosphereComponents: selectedAtmosphereComponent && selectedAtmosphereComponent.names ? selectedAtmosphereComponent.names : [],
            themeNames: selectedThemeComponent && selectedThemeComponent.names ? selectedThemeComponent.names : [],
            lightingNames: selectedLightingComponent && selectedLightingComponent.names ? selectedLightingComponent.names : [],
            objectNames: selectedObjectsComponent && selectedObjectsComponent.names ? selectedObjectsComponent.names : []
        };
        console.log(`Scene seed: ${sceneSeed}`);
        console.log(`Theme: ${themeComponentName || 'none'}`);
        console.log(`Atmosphere: ${atmosphereComponentName || 'none'}`);
        console.log(`Lighting: ${lightingComponentName || 'none'}`);
        console.log(`Objects: ${objectsComponentName || 'none'}`);

        if (window.Sounds) {
            const themeName = selectedThemeComponent ? selectedThemeComponent.name : null;
            const atmosphereNames = selectedAtmosphereComponent ? selectedAtmosphereComponent.names : [];
            const lightingName = selectedLightingComponent ? selectedLightingComponent.name : null;
            const objectNames = selectedObjectsComponent ? selectedObjectsComponent.names : [];

            window.Sounds.play(themeName, atmosphereNames, lightingName, objectNames);
        }
    } catch (e) {
        window.__lastSceneMeta = { seed: sceneSeed };
        console.log(`Scene seed: ${sceneSeed} (error parsing meta)`);
    }

    renderProceduralTitle();
}

function generateProceduralTitle(themeName, lightingName, atmosphereNames, objectNames) {
    const timeDescriptors = ['Midnight', 'Twilight', 'Dusk', 'Dawn', 'Evening', 'Witching Hour'];
    const moodDescriptors = ['Haunted', 'Forsaken', 'Forgotten', 'Silent', 'Eerie', 'Desolate', 'Cursed', 'Abandoned'];
    const locationPrefixes = ['The', 'A', 'An'];

    let title = '';

    if (lightingName === 'fullMoon' || lightingName === 'moonbeam') {
        title = random(['Moonlit', 'Lunar', 'Silver']) + ' ';
    } else if (lightingName === 'candlelight' || lightingName === 'lantern') {
        title = random(['Candlelit', 'Flickering', 'Dimly Lit']) + ' ';
    } else if (lightingName === 'redGlow') {
        title = random(['Crimson', 'Blood-Red', 'Scarlet']) + ' ';
    } else if (lightingName === 'stormLight') {
        title = random(['Storm-Swept', 'Tempestuous', 'Lightning-Struck']) + ' ';
    } else if (lightingName === 'fireflies') {
        title = random(['Glimmering', 'Luminous', 'Phosphorescent']) + ' ';
    } else if (lightingName === 'auroraGlow') {
        title = random(['Ethereal', 'Spectral', 'Otherworldly']) + ' ';
    } else {
        title = random(moodDescriptors) + ' ';
    }

    if (themeName === 'graveyard') {
        title += random(['Cemetery', 'Graveyard', 'Burial Ground', 'Necropolis']);
    } else if (themeName === 'forest') {
        title += random(['Woods', 'Forest', 'Grove', 'Thicket']);
    } else if (themeName === 'attic') {
        title += random(['Attic', 'Loft', 'Upper Chamber']);
    } else if (themeName === 'alleyway') {
        title += random(['Alley', 'Passage', 'Corridor', 'Lane']);
    } else if (themeName === 'mirrorRoom') {
        title += random(['Hall of Mirrors', 'Mirror Chamber', 'Reflection Room']);
    } else if (themeName === 'shoreline') {
        title += random(['Shore', 'Beach', 'Coastline', 'Waterfront']);
    } else {
        title += random(['Place', 'Realm', 'Domain', 'Sanctum']);
    }

    if (atmosphereNames && atmosphereNames.length > 0) {
        const atmo = atmosphereNames[0];
        if (atmo === 'rain' || atmo === 'dripping') {
            title = random(timeDescriptors) + ' Rain at the ' + title;
        } else if (atmo === 'snow') {
            title = 'Snow-Covered ' + title;
        } else if (atmo === 'foggy') {
            title = 'Fog-Shrouded ' + title;
        } else if (atmo === 'whispers' || atmo === 'echoing') {
            title = 'Whispering ' + title;
        } else if (atmo === 'shadows' || atmo === 'shifting') {
            title = 'Shadow-Draped ' + title;
        }
    }

    return title;
}

function renderProceduralTitle() {
    const meta = window.__lastSceneMeta || {};
    const title = generateProceduralTitle(
        meta.theme,
        meta.lighting,
        meta.atmosphereComponents,
        meta.objects
    );

    push();
    textAlign(LEFT);
    fill(200, 200, 230, 230);
    textSize(24);
    text(title, 18, 36);

    textSize(12);
    fill(180, 180, 210, 180);
    text('Click anywhere to regenerate', 18, height - 18);
    pop();
}

window.regenerateSceneWithSeed = (seed) => {
    generateScene(seed);
    redraw();
};

function mouseClicked() {
    if (window.Sounds && !window.Sounds.canChangeScene()) {
        return;
    }

    if (window.Sounds) {
        window.Sounds.fadeOut(500);
    }

    setTimeout(() => {
        generateScene();
        redraw();
    }, 100);
}
