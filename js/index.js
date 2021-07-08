import { Tooltip, Toast, Popover } from 'bootstrap';
import {sum} from './hello.js';
import {mbclick} from './kk.js';
import '../scss/style.scss';
import png from '../logo/logo-carmore@3x.png';





window.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('#root');
    el.innerHTML = `<h1>1+2 = ${sum(1,2)}</h1>`
    
})

//document.

console.log(mbclick());

