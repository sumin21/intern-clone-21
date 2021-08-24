import {emptyElmtChild} from './common.js';

//필터 - 21세 미만 버튼 클릭 시
export function oldTwentyOneBottom() {
    document.getElementById('js_driver_old_no').addEventListener('click', function () {
        oldTwentyOneBottomEvent();
    });
}

export function oldTwentyOneBottomEvent() {
    emptyElmtChild('js_car_list');
    document.getElementById('js_car_list_more_btn').style.display = 'none';
    document.getElementById('js_no_old').style.display = 'block';
    document.getElementById('js_no_cars').style.display = 'none';
}

export function noOldTwentyOneBottomEvent() {
    document.getElementById('js_car_list_more_btn').style.display = 'block';
    document.getElementById('js_no_old').style.display = 'none';
}