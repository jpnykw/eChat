(() => {
    onload = () => {
        const loadCircle = [...document.getElementsByClassName('load-circle')];
        loadCircle.map((dom, index) => {
            let delay = index * 160;
            dom.style.animation = `load-motion 600ms ${delay}ms ease-in-out infinite`;
        });

        const hide = [...document.getElementsByClassName('hide')];
        hide.map(dom => dom.style.animation = 'hideToShow 400ms 100ms ease-in-out forwards');

        const detail = document.getElementsByClassName('detail')[0];

        const faild = label => {
            alert(label);
            document.getElementsByClassName('circle')[0].style.background = '#ff2841';
            loadCircle.map(dom => dom.classList.add('hide'));

            detail.getElementsByTagName('h1')[0].innerText = 'Failed';
            detail.getElementsByTagName('p')[0].innerText = 'please retry setup';

            const gotoTop = document.createElement('button');
            gotoTop.classList.add('shadow');
            gotoTop.style = `
                background: #1595F6;
                color: #FEFEFE;

                border-radius: 40px;
                border: none;

                font-family: filson-soft, sans-serif;
                font-weight: 300;
                font-size: 20px;

                outline: none;
                width: 160px;

                position: relative;
                top: 60px;

                padding: 8px;

                cursor: pointer;
            `;

            gotoTop.innerText = 'back';
            detail.appendChild(gotoTop);

            const accept = document.getElementsByTagName('i')[0];
            accept.classList.remove('fa-check');
            accept.classList.add('fa-times');

            document.title = 'eChat | Faild';

            gotoTop.addEventListener('click', () => {
                hide.map(dom => {
                    dom.classList.remove('hide');
                    dom.style.animation = 'showToHide 400ms 100ms ease-in-out forwards';
                });

                setTimeout(() => location.href = '../html/setup.html', 600);
            });
        };

        const start = () => {
            setTimeout(() => {
                document.cookie = 'accept=true; max-age=5';
                detail.getElementsByTagName('h1')[0].innerText = 'Accept!';
                document.getElementById('main').style.animation = 'showToHide 300ms 50ms ease-in-out forwards';

                setTimeout(() => {
                    location.href = '../html/chat.html';
                }, 600);
            }, 1000);
        };

        if (!document.cookie.includes('setup=true')) {
            // location.href = '../../../index.html';
            // alert('不正なアクセスです');
            faild('Invalid access.');
            return;
        } else {
            document.cookie = 'setup=; max-age=0';
        }

        fetch('../../../json/room.json').then(data => data.text()).then(text => {
            const roomData = JSON.parse(text);
            const userData = JSON.parse(localStorage.user);

            console.log('room data\n', roomData);
            console.log('user data\n', userData);

            if (Object.keys(roomData).includes(userData.room)) {
                if (roomData[userData.room].key == userData.key) {
                    // authorize
                    roomData[userData.room].member.push(userData.name);
                    // roomData[userData.room].new = false;

                    localStorage.room = JSON.stringify(roomData);
                    start();
                } else {
                    // faild
                    faild('That name has already been taken.\nAnd the password is wrong.');
                }
            } else {
                console.log('new room');

                roomData[userData.room] = {
                    member: [userData.name],
                    key: userData.key,

                    binarist: {
                        play: false,
                        start: false,
                        questions: []
                    }
                    // new: true
                };

                localStorage.room = JSON.stringify(roomData);
                start();
            }
        });
    };
})();
