require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from "./modules/tabs";
import modals from "./modules/modals";
import timer from "./modules/timer";
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';

window.addEventListener('DOMContentLoaded', () => {
    tabs();
    modals();
    timer('.timer','2020-12-04');
    cards();
    forms();
    slider({
        container: '.offer__slider',
        next: '.offer__slider-next',
        prev: '.offer__slider-prev',
        slide: ".offer__slide",
        totalCount: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field:'.offer__slider-inner'
    });
    calc();
});
