function changeGame() {
    var gameSelector = document.getElementById('gameSelect');
    var iframe = document.getElementById('gameFrame');
    iframe.src = gameSelector.value;
    resizeIframe(iframe);
}
