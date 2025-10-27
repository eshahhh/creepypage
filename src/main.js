document.addEventListener('DOMContentLoaded', () => {
    const regenerateButton = document.getElementById('regenerate');
    if (regenerateButton) {
        regenerateButton.addEventListener('click', () => {
            window.regenerateScene();
        });
    }
});
