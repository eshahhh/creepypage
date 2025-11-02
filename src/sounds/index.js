(function () {
    const soundMap = {
        themes: {
            graveyard: ['graveyard_wind.mp3', 'graveyard_ambient.mp3'],
            forest: ['forest_night.mp3', 'forest_crickets.mp3'],
            attic: ['attic_creak.mp3', 'attic_ambient.mp3'],
            alleyway: ['alley_drip.mp3', 'alley_distant.mp3'],
            mirrorRoom: ['mirror_echo.mp3', 'mirror_ambient.mp3'],
            shoreline: ['shore_waves.mp3', 'shore_wind.mp3'],
            mansion: ['mansion_ambient.mp3', 'mansion_creak.mp3'],
            catacombs: ['catacombs_drip.mp3', 'catacombs_echo.mp3'],
            lighthouse: ['lighthouse_waves.mp3', 'lighthouse_foghorn.mp3'],
            garden: ['garden_night.mp3', 'garden_rustle.mp3']
        },
        atmosphere: {
            rain: ['rain_heavy.mp3', 'rain_light.mp3'],
            snow: ['snow_wind.mp3', 'snow_quiet.mp3'],
            foggy: ['fog_ambient.mp3'],
            whispers: ['whispers_distant.mp3', 'whispers_close.mp3'],
            shadows: ['shadows_ambient.mp3'],
            shifting: ['shifting_sound.mp3'],
            echoing: ['echo_distant.mp3', 'echo_voices.mp3'],
            dripping: ['water_drip.mp3', 'drip_echo.mp3']
        },
        lighting: {
            fullMoon: ['night_ambient.mp3'],
            moonbeam: ['moonlight_soft.mp3'],
            candlelight: ['candle_flicker.mp3', 'fire_crackle.mp3'],
            lantern: ['lantern_creak.mp3'],
            redGlow: ['ominous_hum.mp3'],
            stormLight: ['thunder_distant.mp3', 'storm_wind.mp3'],
            fireflies: ['insects_night.mp3'],
            auroraGlow: ['ethereal_hum.mp3'],
            fogBeam: ['fog_ambient.mp3']
        },
        objects: {
            crows: ['crow_caw.mp3', 'crow_wings.mp3'],
            spiders: ['spider_skitter.mp3'],
            chains: ['chain_rattle.mp3', 'chain_drag.mp3'],
            bones: ['bone_rattle.mp3'],
            candles: ['candle_flicker.mp3'],
            eyes: ['breathing_slow.mp3'],
            moths: ['moth_flutter.mp3'],
            portraits: ['portrait_creak.mp3'],
            books: ['page_turn.mp3', 'book_thud.mp3'],
            tombstones: ['stone_grind.mp3'],
            chairs: ['chair_creak.mp3'],
            sigils: ['ritual_hum.mp3']
        }
    };

    let currentAudio = [];
    let isPlaying = false;
    let canChange = true;
    let changeTimeout = null;
    const MIN_PLAY_TIME = 3000;

    const api = {
        play(themeName, atmosphereNames, lightingName, objectNames) {
            this.stop();

            const audioFiles = [];

            if (themeName && soundMap.themes[themeName]) {
                const themeSound = random(soundMap.themes[themeName]);
                audioFiles.push({ file: themeSound, volume: 0.4 });
            }

            if (atmosphereNames && Array.isArray(atmosphereNames)) {
                atmosphereNames.forEach(atmo => {
                    if (soundMap.atmosphere[atmo]) {
                        const atmoSound = random(soundMap.atmosphere[atmo]);
                        audioFiles.push({ file: atmoSound, volume: 0.3 });
                    }
                });
            }

            if (lightingName && soundMap.lighting[lightingName]) {
                const lightSound = random(soundMap.lighting[lightingName]);
                audioFiles.push({ file: lightSound, volume: 0.25 });
            }

            if (objectNames && Array.isArray(objectNames)) {
                const maxObjects = 2;
                const objectsToPlay = objectNames.slice(0, maxObjects);
                objectsToPlay.forEach(obj => {
                    if (soundMap.objects[obj]) {
                        const objSound = random(soundMap.objects[obj]);
                        audioFiles.push({ file: objSound, volume: 0.2 });
                    }
                });
            }

            canChange = false;
            isPlaying = true;

            audioFiles.forEach(({ file, volume }) => {
                try {
                    const audio = new Audio(`sounds/${file}`);
                    audio.volume = volume;
                    audio.loop = true;
                    audio.play().catch(e => console.warn('Audio play failed:', file, e));
                    currentAudio.push(audio);
                } catch (e) {
                    console.warn('Audio creation failed:', file, e);
                }
            });

            if (changeTimeout) clearTimeout(changeTimeout);
            changeTimeout = setTimeout(() => {
                canChange = true;
            }, MIN_PLAY_TIME);
        },

        stop() {
            currentAudio.forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
            currentAudio = [];
            isPlaying = false;
        },

        canChangeScene() {
            return canChange;
        },

        fadeOut(duration = 1000) {
            const steps = 20;
            const stepTime = duration / steps;
            let currentStep = 0;

            const fadeInterval = setInterval(() => {
                currentStep++;
                const volumeMultiplier = 1 - (currentStep / steps);

                currentAudio.forEach(audio => {
                    const originalVolume = audio.volume;
                    audio.volume = Math.max(0, originalVolume * volumeMultiplier);
                });

                if (currentStep >= steps) {
                    clearInterval(fadeInterval);
                    this.stop();
                }
            }, stepTime);
        }
    };

    if (!window.Sounds) window.Sounds = api;
    else Object.assign(window.Sounds, api);
})();
