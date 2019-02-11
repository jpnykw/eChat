(() => {
    onload = () => {
        // const socketio = io();

        const button = document.getElementsByTagName('button');
        const input = [...document.getElementsByTagName('input')];

        const form = document.getElementsByClassName('form')[0];
        form.style.animation = 'hideToShow 300ms 50ms ease-in-out forwards';

        const userName = input[0];
        const roomName = input[1];
        const password = input[2];
        const passwordConfirm = input[3];

        const decision = button[0];
        const cancel = button[1];

        setTimeout(() => {
            input.map(dom => {
                console.log(dom);
                dom.addEventListener('input ', () => {
                    console.log('detected');

                    if (dom.value.trim() != '') {
                        dom.style.border = '2px solid #ff2841';
                        dom.style.borderRadius = '5px';
                    } else {
                        dom.style.border = 'none';
                        dom.style.borderBottom = '1px solid #E2E2E2';
                        dom.style.borderRadius = '0';
                    }
                });
            })

            decision.addEventListener('click', () => {
                // check details
                let pass = false;

                let base = password.value;
                let conf = passwordConfirm.value;

                if (base != '' || conf != '') {
                    pass = base == base.trim() && conf == conf.trim() && base == conf;
                } else {
                    pass = true;
                }

                if (!pass) {
                    passwordConfirm.style.border = '2px solid #ff2841';
                    password.style.border = '2px solid #ff2841';

                    passwordConfirm.style.borderRadius = '5px';
                    password.style.borderRadius = '5px';
                    return;
                }

                // generate user data and send
                let key = base.trim();
                let name = userName.value.trim();
                let room = roomName.value.trim();
                let color = randomColor();

                if (key == '') key = randomString(10);
                if (name == '') name = randomString(4 + ((Math.random() * 3) >> 0));
                if (room == '') room = randomString(4 + ((Math.random() * 6) >> 0));

                // let key = base == '' ? null : base;
                let user = {color, name, room, key};
                // console.log('user', user);

                // let data = Object.assign({time: new Date().getTime().toString()}, user);
                // socketio.emit('connected', data);
                // console.log('data', data);

                // save to localstorage
                Object.keys(localStorage).map(key => delete localStorage[key]);
                localStorage.user = JSON.stringify(user);

                form.classList.remove('hide');
                form.style.animation = 'showToHide 300ms 50ms ease-in-out forwards';

                document.cookie = 'setup=true; max-age: 60';
                setTimeout(() => location.href = '../html/accept.html', 500);
            })

            cancel.addEventListener('click', () => {
                if (confirm('Are you sure leave the page?')) {
                    location.href = '../../index.html';
                }
            });
        }, 400);
    };
})();