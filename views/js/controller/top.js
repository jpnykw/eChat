(() => {
    onload = () => {
        Object.keys(localStorage).map(key => delete localStorage[key]);
        const button = document.getElementsByTagName('button')[0];
        const hide = [...document.getElementsByClassName('hide')];

        button.addEventListener('click', () => {
            // location.href = './views/html/setup.html';

            hide.map(dom => {
                dom.classList.remove('hide');
                dom.style.animation = '';
            });

            hide[0].style.animation = 'showToHide 300ms 140ms ease-in-out forwards';
            hide[1].style.animation = 'showToHide 300ms 140ms ease-in-out forwards';
            hide[2].style.animation = 'showToHide 300ms 140ms ease-in-out forwards';
            hide[3].style.animation = 'showToHide 300ms 140ms ease-in-out forwards';

            setTimeout(() => location.href = './views/html/setup.html', 510);
        });

        hide[0].style.animation = 'hideToShow 300ms 140ms ease-in-out forwards';
        hide[1].style.animation = 'hideToShow 300ms 140ms ease-in-out forwards';
        hide[2].style.animation = 'hideToShow 300ms 140ms ease-in-out forwards';
        hide[3].style.animation = 'hideToShow 300ms 140ms ease-in-out forwards';

        // canvas animation
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        const motion = () => {
            requestAnimationFrame(motion);

            // 背景のモーション
            // 優先順位は低め
        }

        // motion();
    };
})();
