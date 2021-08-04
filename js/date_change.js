import {f_calendar_event} from './event_calendar.js';
import {f_childsAllRemove} from './event_calendar.js';
import {f_selected} from './event_calendar.js';
import {f_allTimeCalcular} from './event_calendar.js';
import {f_rent_time_select} from './rent_time.js';


export function f_date_change(){
    const start_dates = document.getElementById('js_rent_start_time');
    const end_dates = document.getElementById('js_rent_end_time');

    start_dates.addEventListener('change', function(){
        var start_date_time = f_selected('js_rent_start_time');
        var end_date_time = f_selected('js_rent_end_time');
        console.log(start_date_time);
        document.getElementById('js_rent_start_date_text2').innerHTML = start_date_time;

        f_allTimeCalcular(start_date_time, end_date_time);

        //날짜는 안바뀌는 채로 start time 시간만 변경될때 반납시간 select는 재로드
        if(document.getElementsByClassName('cm-active-date').length == 2){
            

            f_childsAllRemove('js_rent_end_time');
            f_rent_time_select(start_date_time, end_date_time, 'js_rent_end_time'); 
            document.getElementById('js_rent_end_time').disabled = false;
            end_date_time = f_selected('js_rent_end_time');
            document.getElementById('js_rent_end_date_text2').innerHTML = end_date_time;

            f_allTimeCalcular(start_date_time, end_date_time);

        }
        
    })
    end_dates.addEventListener('change', function(){
        var start_date_time = f_selected('js_rent_start_time');
        var end_date_time = f_selected('js_rent_end_time');
        console.log(end_date_time);
        document.getElementById('js_rent_end_date_text2').innerHTML = end_date_time;
        f_allTimeCalcular(start_date_time, end_date_time);
    })
}