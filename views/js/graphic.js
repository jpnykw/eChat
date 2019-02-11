CanvasRenderingContext2D.prototype.shape = function (status) {
    if (status.v < 3) return false;

    let color = status.color || '#e3e3e1';
    let bold = status.bold || null;
    this.beginPath();

    if (bold == null) {
        this.fillStyle = color;
    } else {
        this.strokeStyle = color;
        this.lineWidth = bold;
    }

    let x = status.x || 0;
    let y = status.y || 0;
    let d = status.d || status.direction || 0;
    let r = status.r || status.radius || 32;
    let v = status.v || status.vertex || 3;

    let zeroVertex = new Array(v).fill(0);
    let fv = status.fv || zeroVertex;
    let fx = status.fx || zeroVertex;
    let fy = status.fy || zeroVertex;
    let dis_theta = 360 / v;
    let theta = d;

    for (let i = 0; i < v; i ++) {
        let point = {
            x: x + Math.cos(theta.toRadian()) * (r + fv[i]) + fx[i],
            y: y + Math.sin(theta.toRadian()) * (r + fv[i]) + fy[i]
        };

        if (i == 0) {
            this.moveTo(point.x, point.y);
        } else {
            this.lineTo(point.x, point.y);
        }

        theta += dis_theta;
    }

    this.closePath();

    if (bold == null) {
        this.fill();
    } else {
        this.stroke();
    }
}

CanvasRenderingContext2D.prototype.glitch = function (status) {
    let x = status.x;
    let y = status.y;
    let width = status.width;
    let height = status.height;

    let level = status.level;
    let image = this.getImageData(x, y, width, height);
    let data = image.data;

    switch (status.type) {
        case 'noise':
            let redFix = (Math.random() * level) >> 0;
            let greenFix = (Math.random() * level) >> 0 * level;
            let blueFix = (Math.random() * level) >> 0;

            for (let i = 0; i < data.length; i += 4) {
                data[i] = data[i + redFix * 4];
                data[i + 1] = data[i + 1 + greenFix * 4];
                data[i + 2] = data[i + 2 + blueFix * 4];
                data[i + 3] = 180;
            }
            break;

        case 'box':
            let max = width * height;
            let mix = this.mix || false;

            for (let i = 0; i < level; i ++) {
                let i = ((Math.random() * max) >> 0) * 4;

                for (let j = 0, l = (Math.random() * 8000) >> 0; j < l; j ++) {
                    if (mix && Math.random() < 0.5) {
                        [data[i], data[i - width * 4]] = [data[i - width * 4], data[i]];
                        [data[i + 1], data[i + 1 - width * 4]] = [data[i + 1 - width * 4], data[i + 1]];
                        [data[i + 2], data[i + 2 - width * 4]] = [data[i + 2 - width * 4], data[i + 2]];
                    } else {
                        [data[i], data[i + width * 4]] = [data[i + width * 4], data[i]];
                        [data[i + 1], data[i + 1 + width * 4]] = [data[i + 1 + width * 4], data[i + 1]];
                        [data[i + 2], data[i + 2 + width * 4]] = [data[i + 2 + width * 4], data[i + 2]];
                    }

                    i += 4;
                }
            }
            break;

        case 'line':
            let w = image.width;
            let h = image.height;
            let yPos = new Array(h).fill(0).map((...x) => x[1]);
            let ids = new Array(level).fill(0).map(() => 4 * yPos.random(true) * w);

            ids.map(id => {
                let dy = (-level + Math.random() * (level * 2)) >> 0;
                for (let i = id, l = id + w * 4; i < l; i += 4) {
                    [data[i], data[i + dy * w]] = [data[i + dy * w], data[i]];
                    [data[i + 1], data[i + 1 + dy * w]] = [data[i + 1 + dy * w], data[i + 1]];
                    [data[i + 2], data[i + 2 + dy * w]] = [data[i + 2 + dy * w], data[i + 2]];
                }
            });
            break;
    }

    this.putImageData(image, x, y);
}

CanvasRenderingContext2D.prototype.noise = function (status) {
    let x = status.x;
    let y = status.y;
    let level = status.level;
    let width = status.width;
    let height = status.height;

    let image = this.getImageData(x, y, width, height);
    let data = image.data;

    for (let i = 0; i < level; i++) {
        let id = ((Math.random() * (data.length / 4)) >> 0) * 4;
        let color = new Array(3).fill(null).map(() => (-64 + Math.random() * 128) >> 0);

        if (status.gray) {
            color[1] = color[0];
            color[2] = color[0];
        }

        data[id] += color[0];
        data[id + 1] += color[1];
        data[id + 2] += color[2];
    }


    this.putImageData(image, x, y);
}

CanvasRenderingContext2D.prototype.negative = function (status) {
    let x = status.x;
    let y = status.y;
    let width = status.w || status.width;
    let height = status.h || status.height;
    let image = this.getImageData(x, y, width, height);
    let data = image.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }

    this.putImageData(image, x, y);
}