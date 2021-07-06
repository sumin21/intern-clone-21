import {sum} from './hello.js';
import kk from './kk.js';
import './style.scss';

document.querySelector('#root2').innerHTML = kk;

window.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('#root');
    el.innerHTML = `<h1>1+2 = ${sum(1,2)}</h1>`
})

