import {f_car_list_condition} from './car_list_condition.js';

//차종 선택
var js_all = document.getElementById('js_all');
var js_elec = document.getElementById('js_elec');
var js_small = document.getElementById('js_small');
var js_middle = document.getElementById('js_middle');
var js_big = document.getElementById('js_big');
var js_suv = document.getElementById('js_suv');
var js_rv = document.getElementById('js_rv');
var js_import = document.getElementById('js_import');

var ck_car_kinds_active;

function CarKindsChangeAreaDomain(ck_car_kinds_element){
    var isExist = ck_car_kinds_element.classList.contains("ck-car-kinds-active");
    //선택 안되어 있을때만
    //선택된 element active로 (색 파란색)
    if(!isExist){
        ck_car_kinds_active = document.getElementsByClassName("ck-car-kinds-active");
        ck_car_kinds_active[0].classList.remove('ck-car-kinds-active');
        ck_car_kinds_element.classList.add('ck-car-kinds-active');
    }
}

export function f_car_type_event(){


    js_all.addEventListener('click', function(){
        CarKindsChangeAreaDomain(js_all);
        f_car_list_condition(0,'전체',0,0,0,0,0,0);
    });
    js_elec.addEventListener('click', function(){
        CarKindsChangeAreaDomain(js_elec);
        f_car_list_condition(0,0,0,0,0,0,0,'전기');

    });
    js_small.addEventListener('click', function(){
        CarKindsChangeAreaDomain(js_small);
        f_car_list_condition(0,'경형 소형',0,0,0,0,0,0);

    });
    js_middle.addEventListener('click', function(){
        CarKindsChangeAreaDomain(js_middle);
        f_car_list_condition(0,'준중형',0,0,0,0,0,0);

    });
    js_big.addEventListener('click', function(){
        CarKindsChangeAreaDomain(js_big);
        f_car_list_condition(0,'중형 대형',0,0,0,0,0,0);
    });
    js_suv.addEventListener('click', function(){
        CarKindsChangeAreaDomain(js_suv);
        f_car_list_condition(0,'SUV',0,0,0,0,0,0);
    });
    js_rv.addEventListener('click', function(){
        CarKindsChangeAreaDomain(js_rv);
        f_car_list_condition(0,'RV',0,0,0,0,0,0);
    });
    js_import.addEventListener('click', function(){
        CarKindsChangeAreaDomain(js_import);
        f_car_list_condition(0,'수입',0,0,0,0,0,0);
    });
}