import './assets/css/index.css'
import './assets/css/index.less'
console.log('hahaha');
import bear from './assets/img/bear.jpg'

let img = document.createElement('img');
img.src = bear;
img.alt = 'bear';
img.className = 'bear';
document.body.append(img);


() => console.log('hello babel')