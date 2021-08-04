import {f_car_list_condition} from './car_list_condition.js';
//check-box 클릭

var js_type = document.getElementById('js_type');
var js_popular = document.getElementById('js_popular');
var js_price = document.getElementById('js_price');

var crt_check_box_active;

function CheckChangeAreaDomain(crt_check_element){
    var isExist = crt_check_element.classList.contains("crt-check-box-active");
    console.log(isExist);
    //선택 안되어 있을때만
    //선택된 element active로 (색 파란색)
    if(!isExist){
        crt_check_box_active = document.getElementsByClassName("crt-check-box-active");
        crt_check_box_active[0].classList.remove("crt-check-box-active");
        crt_check_element.classList.add("crt-check-box-active");
    }
}


export function f_check_box_click(){


    js_type.addEventListener('click', function(){
        CheckChangeAreaDomain(js_type);
        f_car_list_condition('js_type',0,0,0,0,0,0,0);
    });
    js_popular.addEventListener('click', function(){
        CheckChangeAreaDomain(js_popular);
        f_car_list_condition('js_popular',0,0,0,0,0,0,0);
    });
    js_price.addEventListener('click', function(){
        CheckChangeAreaDomain(js_price);
        f_car_list_condition('js_price',0,0,0,0,0,0,0);
    });
}
