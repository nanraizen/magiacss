(function (root) {
    function activateDarkMode() {
        root.classList.add('dark');
        localStorage.setItem('is-dark', 1);
    }

    function deactivateDarkMode() {
        root.classList.remove('dark');
        localStorage.removeItem('is-dark');
    }

    let toggle = root.querySelector('.toggleColor');
    let media = matchMedia('(prefers-color-scheme: dark)');

    toggle.addEventListener('click', e => {
        if (root.classList.contains('dark')) {
            deactivateDarkMode();
        } else {
            activateDarkMode();
        }
        e.preventDefault();
    }, false);

    media.addEventListener('change', e => {
        if (e.matches) {
            activateDarkMode();
        } else {
            deactivateDarkMode();
        }
    });

    if (localStorage.getItem('is-dark')) {
        root.classList.add('dark');
    }
})(document.documentElement);