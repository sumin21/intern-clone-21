import {filterDriverOldCalculReset} from './filter_driver_old_calcul.js';

export function filterResetBtn() {
    let btnFilter = document.getElementById('js_filter_reset_btn');
    let btnNoCars = document.getElementById('js_filter_reset_btn_nocars');
    let btn21 = document.getElementById('js_filter_reset_btn_21');
    btnFilter.addEventListener('click', function () {
        filterDriverOldCalculReset();
        filterReset();
    });
    btnNoCars.addEventListener('click', function () {
        filterDriverOldCalculReset();
        filterReset();
    });
    btn21.addEventListener('click', function () {
        filterDriverOldCalculReset();
        filterReset();
    });

}

function filterReset() {
    document.getElementById('js_driver_old_all').click();
    document.getElementById('js_all').click();
    document.getElementById('js_car_model_dropdown_btn').value = null;
    document.getElementById('js_car_model_search_btn').click();
}