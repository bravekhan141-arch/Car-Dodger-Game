// موبائل بٹن
document.getElementById('leftBtn').addEventListener('touchstart', () => keys.ArrowLeft = true);
document.getElementById('leftBtn').addEventListener('touchend', () => keys.ArrowLeft = false);
document.getElementById('rightBtn').addEventListener('touchstart', () => keys.ArrowRight = true);
document.getElementById('rightBtn').addEventListener('touchend', () => keys.ArrowRight = false);
