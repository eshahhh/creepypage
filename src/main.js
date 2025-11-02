document.addEventListener('DOMContentLoaded', () => {
    const regenerateButton = document.getElementById('regenerate');
    if (regenerateButton) {
        regenerateButton.addEventListener('click', () => {
            if (window.Sounds && !window.Sounds.canChangeScene()) {
                return;
            }

            if (window.Sounds) {
                window.Sounds.fadeOut(500);
            }

            setTimeout(() => {
                if (window.generateScene) {
                    generateScene();
                    redraw();
                }
            }, 100);
        });
    }
});
