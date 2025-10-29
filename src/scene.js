let sceneSeed = 0;
let defaultTextFragments = [
    "it moved again",
    "this wasn't here before",
    "the note rewrote itself",
    "listen closer",
    "do not open the door",
    "we are still here"
];
let defaultTitles = [
    "The Whispering Hallway",
    "The Forgotten Room",
    "The Quiet Shore",
    "The Hollow Attic",
    "A Frame of Leaves"
];

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

    window.currentFragments = selectedThemeComponent ? selectedThemeComponent.fragments : defaultTextFragments;
    window.currentTitles = selectedThemeComponent ? selectedThemeComponent.titles : defaultTitles;

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
            atmosphereComponents: selectedAtmosphereComponent && selectedAtmosphereComponent.names ? selectedAtmosphereComponent.names : []
        };
        console.log(`Scene seed: ${sceneSeed}`);
        console.log(`Theme: ${themeComponentName || 'none'}`);
        console.log(`Atmosphere: ${atmosphereComponentName || 'none'}`);
        console.log(`Lighting: ${lightingComponentName || 'none'}`);
        console.log(`Objects: ${objectsComponentName || 'none'}`);
    } catch (e) {
        window.__lastSceneMeta = { seed: sceneSeed };
        console.log(`Scene seed: ${sceneSeed} (error parsing meta)`);
    }

    renderTextFragments();
}

function renderBackground() {
    for (let y = 0; y < height; y++) {
        const lerpFactor = map(y, 0, height, 0, 1);
        const interpolatedColor = lerpColor(color(18, 18, 25), color(30, 22, 50), lerpFactor);
        stroke(interpolatedColor);
        line(0, y, width, y);
    }
    push();
    noStroke();
    fill(240, 240, 220, 200);
    const highlightX = width * (0.2 + random() * 0.6);
    const highlightY = height * (0.12 + random() * 0.25);
    ellipse(highlightX, highlightY, 80 + random() * 60, 80 + random() * 60);
    pop();
}

function selectTitle() {
    return random(window.currentTitles);
}

function renderMidgroundLayer() {
    noStroke();
    fill(15, 15, 30, 200);
    beginShape();
    vertex(0, height);
    for (let i = 0; i < 8; i++) {
        const vertexX = (i + 1) * width / 8;
        const vertexHeight = height * 0.55 + noise(i * 0.4 + sceneSeed * 0.0001) * height * 0.18;
        vertex(vertexX, vertexHeight);
    }
    vertex(width, height);
    endShape(CLOSE);
}

function renderForegroundLayer() {
    fill(6, 6, 8, 255);
    const columnCount = 6;
    for (let i = 0; i < columnCount; i++) {
        const columnWidth = 40 + random() * 120;
        const columnHeight = 80 + random() * 220;
        const columnX = random() * width;
        const columnY = height - (20 + random() * 120);
        rect(columnX, columnY - columnHeight, columnWidth, columnHeight, 6);
    }
}

function renderTextFragments() {
    textAlign(CENTER);
    for (let i = 0; i < 3; i++) {
        const textFragment = random(window.currentFragments);
        const textX = width * (0.2 + random() * 0.6);
        const textY = height * (0.2 + random() * 0.6);
        push();
        translate(textX, textY);
        rotate(random(-0.08, 0.08));
        fill(220, 220, 230, 200);
        textSize(18 + random() * 10);
        text(textFragment, 0, 0);
        pop();
    }

    const chosenTitle = selectTitle();
    push();
    textAlign(LEFT);
    fill(200, 200, 230, 230);
    textSize(24);
    text(chosenTitle, 18, 36);
    pop();
}

window.regenerateSceneWithSeed = (seed) => {
    generateScene(seed);
    redraw();
};

function mouseClicked() {
    generateScene();
    redraw();
}
