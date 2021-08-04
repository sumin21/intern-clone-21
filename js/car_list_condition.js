import {f_selected} from './event_calendar.js';
import {f_car_list_car} from './car_list_car.js';

export function f_car_list_condition(rent_order,rent_car_type, rent_location, start_date, start_date_time, end_date, end_date_time, elec_car){
    
    if(rent_order == 0){
        rent_order = document.getElementsByClassName('crt-check-box-active')[0].id; //js_type
    }
    if(rent_car_type == 0){
        
        if(document.getElementsByClassName("ck-car-kinds-active")[0].firstChild.innerHTML == '전기'){//전기
            elec_car = '전기';
        }
        else if(document.getElementsByClassName("ck-car-kinds-active")[0].firstChild.innerHTML == '경소형'){//전기
            rent_car_type = '경형 소형';
        }
        else if(document.getElementsByClassName("ck-car-kinds-active")[0].firstChild.innerHTML == '중대형'){//전기
            rent_car_type = '중형 대형';
        }
        else if(document.getElementsByClassName("ck-car-kinds-active")[0].firstChild.innerHTML == '승합'){//전기
            rent_car_type = 'RV';
        }
        else{
            rent_car_type = document.getElementsByClassName("ck-car-kinds-active")[0].firstChild.innerHTML; //전체
        }
        
    }
    if(rent_location == 0){
        rent_location = document.getElementById('js_menu_bar_text').innerHTML;
    }
    
    if(start_date == 0){
        start_date = document.getElementsByClassName('cm-active-date')[0].id;
    }
    if(start_date_time == 0){
        start_date_time = f_selected('js_rent_start_time');
    }
    if(end_date == 0){
        end_date = document.getElementsByClassName('cm-active-date')[document.getElementsByClassName('cm-active-date').length - 1].id;
    }
    if(end_date_time == 0){
        end_date_time = f_selected('js_rent_end_time');
    }
    
    
    const new_rent_order = rent_order.split('_')[1];
    //const new_rent_car_type = rent_car_type.split('_')[1];
    

    const new_start_date_arr = start_date.split('/');
    const new_end_date_arr = end_date.split('/');
    const rent_start_date = new_start_date_arr[0]+'-'+new_start_date_arr[1]+'-'+new_start_date_arr[2] + ' ' + start_date_time+':00';
    const rent_end_date = new_end_date_arr[0]+'-'+new_end_date_arr[1]+'-'+new_end_date_arr[2] + ' ' + end_date_time+':00';
    f_car_list_car(new_rent_order,rent_car_type,rent_location,rent_start_date,rent_end_date,elec_car);
}

