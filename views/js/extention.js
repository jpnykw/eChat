Number.prototype.toRadian = function () {
    return this * (Math.PI / 180);
}

Array.prototype.random = function (getIndex) {
    let index = (Math.random() * this.length) >> 0;
    return getIndex ? index : this[index];
}

const timestamp = date => `${`00${date.getHours()}`.slice(-2)}:${`00${date.getMinutes()}`.slice(-2)}`;

const randomColor = () => `#${new Array(3).fill().map(() => ((Math.random() * 256) >> 0).toString(16)).map(hex => `00${hex}`.slice(-2)).join('')}`;

const randomString = length => new Array(length).fill().map(() => String.fromCharCode(97 + ((Math.random() * 26) >> 0))).map(str => Math.random() < 0.5 ? str.toUpperCase() : Math.random() < 0.5 ? `${(Math.random() * 10) >> 0}` : str).join('');
