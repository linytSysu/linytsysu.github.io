(function() {
    var menuBarDom = document.getElementById('menu-bar');
    var navListDom = document.getElementById('nav-list');
    menuBarDom.addEventListener('click', function() {
        if (menuBarDom.classList.contains('exit')) {
            menuBarDom.classList.remove('exit');
            navListDom.classList.remove('show');
        } else {
            menuBarDom.classList.add('exit');
            navListDom.classList.add('show');
        }
    });
})();