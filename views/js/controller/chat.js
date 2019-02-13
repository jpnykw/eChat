(() => {
    onload = () => {
        fetch('../../../json/command.json').then(data => data.text()).then(text => {
            let messageStack = [];
            let commandStack = [];
            const commandList = JSON.parse(text);

            let isSafe = false;
            const fps = 1000 / 40;

            const isLogin = document.cookie.includes('accept=true');
            const message = document.getElementById('message');
            const output = document.getElementById('output');
            const cancel = document.getElementById('cancel');
            const send = document.getElementById('send');

            const share = document.getElementById('share');
            const p = [...share.getElementsByTagName('p')];

            p[0].addEventListener('click', () => {
                let room = JSON.parse(localStorage.user).room;
                let key = JSON.parse(localStorage.user).key;

                let url = `https://twitter.com/intent/tweet?text=${encodeURI(`Let's talk with us!\nRoom Name : ${room}\nRoom Key : ${key}\nhttps://e-chat-jpnykw.herokuapp.com/views/html/setup.html`)}`;
                open(url);
            });

            if (!isLogin) {
                location.href = '../html/accept.html';
                return;
            } else {
                document.cookie = 'accept=; max-age=0';
                isSafe = true;
            }

            const user = JSON.parse(localStorage.user);
            const socketio = io();

            const submit = () => {
                if (message.value.trim() == '') return;
                send.disabled = true;

                const data = Object.assign({message: message.value.trim()}, user);
                socketio.emit('submit', data);

                send.disabled = false;
                message.value = '';
            }

            socketio.on('submit', data => {
                const headline = data.headline;
                const div = document.createElement('div');

                const icon = document.createElement('span');
                icon.classList.add('shadow');

                const message = document.createElement('p');
                message.classList.add('message');

                const details = document.createElement('p');
                details.classList.add('details');

                switch (headline) {
                    case 'message':
                        message.innerText = `${data.message}`;
                        details.innerText = `${data.name} ${timestamp(new Date())}`;

                        message.style.bottom = '50px';
                        icon.style.background = data.color;

                        messageStack.push({
                            checked: false,
                            message: data.message
                        });
                        break;

                    case 'system-log':
                        message.innerText = `[System Log] : ${data.message}`;
                        icon.style.background = '#FFF';

                        div.style.background = '#1595F6';
                        div.style.color = 'white';
                        break;
                }

                div.appendChild(icon);
                div.appendChild(details);
                div.appendChild(message);

                if (document.getElementById('output').innerHTML == '') {
                    output.appendChild(div);
                } else {
                    output.insertBefore(div, output.getElementsByTagName('div')[0]);
                }
            });

            const keyBuffer = [];

            message.addEventListener('keydown', e => {
                keyBuffer[e.keyCode] = true;

                if (keyBuffer[13] && keyBuffer[17] ) {
                    keyBuffer[13] = false;
                    keyBuffer[17] = false;
                    submit();
                }
            });

            message.addEventListener('keyup', e => {
                keyBuffer[e.keyCode] = false;
            });

            cancel.addEventListener('click', () => {
                message.value = '';
            });

            send.addEventListener('click', submit);

            window.addEventListener('beforeunload', () => {
                Object.keys(localStorage).map(key => delete localStorage[key]);
                // e.returnValue = 'トップページに戻ります。';
            });

            // start chat
            const main = Object.assign({time: new Date().getTime().toString()}, JSON.parse(localStorage.user));
            if (isSafe) socketio.emit('connected', {room: localStorage.room, main});

            // draw
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');

            let height = innerHeight;
            let width = innerWidth;

            canvas.height = height;
            canvas.width = width;

            const parse = () => {
                messageStack.map(data => {
                    if (!data.checked) {
                        data.checked = true;

                        let time = null;
                        if (data.message.match(/\d+秒/)) time = data.message.match(/\d+秒/)[0].split('秒')[0] * 40;

                        Object.keys(commandList).map(key => {
                            let regexp = new RegExp(commandList[key].regexp, "ig");
                            console.log(regexp);

                            if (data.message.match(regexp) != null) {
                                commandStack.push({text: commandList[key].text, time: time || commandList[key].time});

                                console.log('EMOJI!');
                            }
                        });

                        /*
                        if (cmd.match(/((ね|ネ|ﾈ)(こ|コ|ｺ)|meow|((に|ニ|ﾆ)(ゃ|ャ|ｬ)))/ig)) {
                            data.tick = time || 60;
                            data.type = 'cat';
                            data.ready = false;
                        }

                        if (cmd.match(/(お|ぉ|オ|ォ|ｵ|ｫ)(は|ハ|ﾊ)(よ|ょ|ヨ|ョ|ﾖ|ｮ)/)) {
                            data.tick = time || 30;
                            data.type = 'sunrise';
                            data.ready = false;
                        }
                        */
                    }
                });
            };

            const run = () => {
                commandStack.map(data => {
                    if (!data.used) {
                        const lifeTime = 300 + Math.random() * 700;
                        const p = document.createElement('p');
                        p.innerText = data.text.random();

                        p.style = `
                            position: absolute;
                            pointer-events: none;
                            left: ${Math.random() * innerWidth}px;
                            top: ${Math.random() * innerHeight}px;
                            font-size: ${10 + Math.random() * 60}px;
                            transform: rotate(${Math.random() * 180}deg);
                            animation: showToHide ${lifeTime}ms 500ms ease-in-out forwards;
                        `;

                        document.body.appendChild(p);
                        setTimeout(() => document.body.removeChild(p), 500 + lifeTime);

                        data.time--;
                        data.used = data.time < 1;
                    }
                });
            }

            const draw = () => {
                setTimeout(() => draw(), fps);
                // requestAnimationFrame(draw);

                // context.clearRect(0, 0, width, height);
                context.fillStyle = '#FEFEFE';
                context.fillRect(0, 0, width, height);

                height = innerHeight;
                width = innerWidth;

                canvas.height = height;
                canvas.width = width;

                parse();
                run();

                /*
                messageStack.map(data => {
                    if (!data.ready && data.tick > 0) {
                        let lifeTime = null;
                        let p = null;

                        data.tick --;

                        switch (data.type) {
                            case 'cat':
                                p = document.createElement('p');
                                p.innerText = ['😺', '😻', '😼', '😹', '🙀', '😿'].random();

                                lifeTime = 300 + Math.random() * 700;
                                p.style = `
                                    position: absolute;
                                    left: ${Math.random() * innerWidth}px;
                                    top: ${Math.random() * innerHeight}px;
                                    font-size: ${10 + Math.random() * 60}px;
                                    transform: rotate(${Math.random() * 180}deg);
                                    animation: showToHide ${lifeTime}ms 500ms ease-in-out forwards;
                                `;

                                document.body.appendChild(p);
                                setTimeout(() => document.body.removeChild(p), 500 + lifeTime);
                                break;

                            case 'sunrise':
                                p = document.createElement('p');
                                p.innerText = '🌅';

                                lifeTime = 200 + Math.random() * 500;
                                p.style = `
                                    position: absolute;
                                    opacity: ${Math.random()};
                                    left: ${Math.random() * innerWidth}px;
                                    top: ${Math.random() * innerHeight}px;
                                    font-size: ${40 + Math.random() * 110}px;
                                    animation: showToHide ${lifeTime}ms 500ms ease-in-out forwards;
                                `;

                                document.body.appendChild(p);
                                setTimeout(() => document.body.removeChild(p), 500 + lifeTime);
                                break;
                        }
                    }
                });
                */
            };

            draw();
        });
    };
})();
