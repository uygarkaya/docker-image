document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    
    player.addEventListener('ended', () => {
      player.currentTime = 0;
      player.play();
    });
});