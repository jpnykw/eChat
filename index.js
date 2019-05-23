const fs = require('fs');
const http = require('http');
const socketIO = require('socket.io');

const serverSetting = (req, res) => {
    const url = req.url;
    const path = '.' + url;
    const tmp = url.split('.');
    const extension = tmp[tmp.length - 1];

    switch (extension) {
        case '/':
            fs.readFile('./index.html', (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data, 'utf-8');
            });
            break;

            default:
                let type = null;

                switch (extension) {
                    case 'js':
                            type = 'text/javascript';
                            break;

                    case 'css':
                            type = 'text/css';
                            break;
                }

                fs.readFile(path, (err, data) => {
                    res.writeHead(200, {'Content-Type': type});
                    res.end(data, 'utf-8');
                });
                break;
    }
};

const isExistenceRoom = room => {
    const roomList = JSON.parse(fs.readFileSync('./json/room.json'));
    return Object.keys(roomList).includes(room);
};

const server = http.createServer(serverSetting);
const io = socketIO.listen(server);

io.sockets.on('connection', socket => {
    socket.on('connected', input => {
        const data = input.main;
        console.log(`[System Log]    CONNECTED   =>   <${data.name}>`);
        console.log(`[System Log]    UNIQUE-ID   =>   <${socket.id}>`);
        console.log(`[System Log]         ROOM   =>   <${data.room}>`);
        console.log(`[System Log]          KEY   =>   <${data.key != null ? data.key : 'No Key'}>`);

        // add to global user list
        const userList = JSON.parse(fs.readFileSync('./json/user.json'));
        userList[socket.id] = data;

        fs.writeFileSync('./json/user.json', JSON.stringify(userList));

        socket.join(data.room);
        io.sockets.to(data.room).emit('submit', {headline: 'system-log', message: `${data.name} has connected.`});

        fs.writeFileSync('./json/room.json', input.room);

        console.log(`[System Log] ${'='.repeat(16)}`);
    });

    socket.on('disconnect',  () => {
        try {
            const id = socket.id;

            const userList = JSON.parse(fs.readFileSync('./json/user.json'));
            const userRoom = userList[id].room;
            const myself = userList[id];

            const roomList = JSON.parse(fs.readFileSync('./json/room.json'));

            if (roomList[userRoom].member.length == 1) {
                console.log(`[System Log] DELETED-ROOM   =>   <${myself.room}>`)
                delete roomList[userRoom];
            } else {
                roomList[userRoom].member.splice(roomList[userRoom].member.indexOf(myself.name), 1);
            }

            io.sockets.to(myself.room).emit('submit', {headline: 'system-log', message: `${myself.name} has disconnect.`});
            delete userList[id];

            fs.writeFileSync('./json/user.json', JSON.stringify(userList));
            fs.writeFileSync('./json/room.json', JSON.stringify(roomList));

            console.log(`[System Log] DISCONNECTED   =>   <${myself.name}>`);
            console.log(`[System Log]    UNIQUE-ID   =>   <${id}>`);
            console.log(`[System Log]         ROOM   =>   <${myself.room}>`);
        } catch (e) {
            console.log(`[Action Log] Some error in disconnect <${e.toString()}>`);
        };

        console.log(`[System Log] ${'='.repeat(16)}`);
    });

    socket.on('submit', data => {
        console.log(`[Action Log] Submitted by <${data.name}> in <${data.room}> message <${data.message}>`);

        data.headline = 'message';
        io.sockets.to(data.room).emit('submit', data);
        const room = JSON.parse(fs.readFileSync('./json/room.json'));

        if (data.message == 'binarist' && room[data.room].binarist.play == false) {
            room[data.room].binarist.play = true;

            // generate questions
            for (let i = 0; i < 5; i++) {
                let operator = Math.random() < .5 ? '+' : '-';
                let planeX = ((Math.random() * 16) >> 0);
                let planeY = ((Math.random() * 16) >> 0);

                if (operator == '-' && planeX - planeY < 0) [planeX, planeY] = [planeY, planeX];

                let x = `0000${planeX.toString(2)}`.slice(-4);
                let y = `0000${planeY.toString(2)}`.slice(-4);

                room[data.room].binarist.questions.push({
                    message: {headline: 'system-log', message: `${x} ${operator} ${y} = ?`},
                    answer: operator == '+' ? planeX + planeY : planeX - planeY
                });
            }

            fs.writeFileSync('./json/room.json', JSON.stringify(room));

            // send
            io.sockets.to(data.room).emit('submit', {headline: 'system-log', message: 'Will be start in 10 seconds! 5 questions.'});

            setTimeout(() => isExistenceRoom(data.room) && io.sockets.to(data.room).emit('submit', {headline: 'system-log', message: '3 ...'}), 7000);
            setTimeout(() => isExistenceRoom(data.room) && io.sockets.to(data.room).emit('submit', {headline: 'system-log', message: '2 ...'}), 8000);
            setTimeout(() => isExistenceRoom(data.room) && io.sockets.to(data.room).emit('submit', {headline: 'system-log', message: '1 ...'}), 9000);
            setTimeout(() => {
                if (isExistenceRoom(data.room)) {
                    io.sockets.to(data.room).emit('submit', room[data.room].binarist.questions[0].message);
                    room[data.room].binarist.start = true;

                    fs.writeFileSync('./json/room.json', JSON.stringify(room));
                }
            }, 10000);
        } else if (room[data.room].binarist.start == true && room[data.room].binarist.questions[0].answer == data.message) {
            // if (room[data.room].binarist.questions[0].answer == data.message) {
                room[data.room].binarist.questions.shift();
                if (room[data.room].binarist.questions.length > 0) {
                    io.sockets.to(data.room).emit('submit', {headline: 'system-log', message: `${data.name} You're correct! and Next.`});
                    io.sockets.to(data.room).emit('submit', room[data.room].binarist.questions[0].message);
                } else {
                    io.sockets.to(data.room).emit('submit', {headline: 'system-log', message: `${data.name} You're correct! Finish!`});

                    room[data.room].binarist.questions = [];
                    room[data.room].binarist.start = false;
                    room[data.room].binarist.play = false;
                }

                fs.writeFileSync('./json/room.json', JSON.stringify(room));
            // }
        }
    });
});

// start the server
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`[System Log] Listning on ${port}`));
