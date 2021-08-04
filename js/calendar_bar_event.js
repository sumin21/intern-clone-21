import $ from "jquery";
import {f_selected} from './event_calendar.js';
import {f_rent_time_select} from './rent_time.js';
import {f_car_list_condition} from './car_list_condition.js';

export function f_calendar_bar_event(){
      
    const calendar_apply_btn = document.getElementById('js_calendar_apply_btn');
    //적용하기 누른적 없을때 && 뒤로 버튼 클릭
    let start_date = document.getElementsByClassName('cm-active-date')[0];;
    let end_date = document.getElementsByClassName('cm-active-date')[document.getElementsByClassName('cm-active-date').length - 1];
    let start_date_time = '10:00';
    let end_date_time = '10:00';
    //혹시 시작option도..?

    //적용하기 클릭
    calendar_apply_btn.addEventListener('click', function(){
        if(document.getElementsByClassName('cm-active-date').length >1){
            const start_date_num = document.getElementById('js_rent_start_date_text1');
            const start_date_text = document.getElementById('js_rent_start_date_text2');

            const end_date_num = document.getElementById('js_rent_end_date_text1');
            const end_date_text = document.getElementById('js_rent_end_date_text2');

            const all_days_num = document.getElementById('js_rent_all_time_days_num');

            const all_hours_num = document.getElementById('js_rent_all_time_hours_num');

            const bar_start_date_num = document.getElementById('js_calendar_bar_start_date');
            const bar_start_date_text = document.getElementById('js_calendar_bar_start_time');
            const bar_end_date_num = document.getElementById('js_calendar_bar_end_date');
            const bar_end_date_text = document.getElementById('js_calendar_bar_end_time');
            const bar_all_days_num = document.getElementById('js_calendar_bar_all_time_days_num');
            const bar_all_days_text = document.getElementById('js_calendar_bar_all_time_days_text');
            const bar_all_hours_num = document.getElementById('js_calendar_bar_all_time_hours_num');
            const bar_all_hours_text = document.getElementById('js_calendar_bar_all_time_hours_text');

            bar_start_date_num.innerHTML = start_date_num.innerHTML;
            bar_start_date_text.innerHTML = start_date_text.innerHTML;
            bar_end_date_num.innerHTML = end_date_num.innerHTML;
            bar_end_date_text.innerHTML = end_date_text.innerHTML;

            if(all_days_num.style.display == 'inline'){
                bar_all_days_num.style.display = 'block';
                bar_all_days_text.style.display = 'block';
                bar_all_days_num.innerHTML = all_days_num.innerHTML;
            }
            else{
                bar_all_days_num.style.display = 'none';
                bar_all_days_text.style.display = 'none';
            }
            console.log('kk?' + all_hours_num.innerHTML);
            if(all_hours_num.style.display == 'inline'){
                bar_all_hours_num.style.display = 'block';
                bar_all_hours_text.style.display = 'block';
                bar_all_hours_num.innerHTML = all_hours_num.innerHTML;
            }
            else{
                bar_all_hours_num.style.display = 'none';
                bar_all_hours_text.style.display = 'none';
            }
            start_date = document.getElementsByClassName('cm-active-date')[0];
            end_date = document.getElementsByClassName('cm-active-date')[document.getElementsByClassName('cm-active-date').length - 1];
            start_date_time = f_selected('js_rent_start_time');
            end_date_time = f_selected('js_rent_end_time');
            $('#calendarModal').modal('hide');

            //선택한 대여날짜, 반납날짜, 시간 (처음에도 생성해)
            
            f_car_list_condition(0,0,0,start_date.id,start_date_time,end_date.id,end_date_time,0);
        }
        //날짜 하나만 클릭하고 적용하기 눌렀을때 에러
        else{
            alert('dd');
        }
        

    });
    const calendar_bar = document.getElementById('js_calendar_bar');
    calendar_bar.addEventListener('click', function(){


        if(start_date && end_date){
            start_date.click();
            end_date.click();
            const start_option_num = document.getElementById('js_rent_start_time').childNodes.length;
            const end_option_num = document.getElementById('js_rent_start_time').childNodes.length;

            for(let i=0; i<start_option_num; i++){
                if(document.getElementById('js_rent_start_time').children[i].value == start_date_time){
                    document.getElementById('js_rent_start_time').children[i].selected = true;
                }
            }
            
            if(document.getElementsByClassName('cm-active-date').length == 2){
                f_rent_time_select(start_date_time, end_date_time, 'js_rent_end_time');
            }
            else{
                for(let j=0; j<end_option_num; j++){
                    if(document.getElementById('js_rent_end_time').children[j].value == end_date_time){
                        document.getElementById('js_rent_end_time').children[j].selected = true;
                    }
                }
            }
            
        }
    })
    
}



export function f_calendar_bar_default(){
    const start_date_num = document.getElementById('js_rent_start_date_text1');
    const start_date_text = document.getElementById('js_rent_start_date_text2');

    const end_date_num = document.getElementById('js_rent_end_date_text1');
    const end_date_text = document.getElementById('js_rent_end_date_text2');

    const all_days_num = document.getElementById('js_rent_all_time_days_num');

    const all_hours_num = document.getElementById('js_rent_all_time_hours_num');

    const bar_start_date_num = document.getElementById('js_calendar_bar_start_date');
    const bar_start_date_text = document.getElementById('js_calendar_bar_start_time');
    const bar_end_date_num = document.getElementById('js_calendar_bar_end_date');
    const bar_end_date_text = document.getElementById('js_calendar_bar_end_time');
    const bar_all_days_num = document.getElementById('js_calendar_bar_all_time_days_num');
    const bar_all_days_text = document.getElementById('js_calendar_bar_all_time_days_text');
    const bar_all_hours_num = document.getElementById('js_calendar_bar_all_time_hours_num');
    const bar_all_hours_text = document.getElementById('js_calendar_bar_all_time_hours_text');

    bar_start_date_num.innerHTML = start_date_num.innerHTML;
    bar_start_date_text.innerHTML = start_date_text.innerHTML;
    bar_end_date_num.innerHTML = end_date_num.innerHTML;
    bar_end_date_text.innerHTML = end_date_text.innerHTML;

    if(all_days_num.style.display == 'inline'){
        bar_all_days_num.style.display = 'block';
        bar_all_days_text.style.display = 'block';
        bar_all_days_num.innerHTML = all_days_num.innerHTML;
    }
    else{
        bar_all_days_num.style.display = 'none';
        bar_all_days_text.style.display = 'none';
    }
    console.log('kk?' + all_hours_num.innerHTML);
    if(all_hours_num.style.display == 'inline'){
        bar_all_hours_num.style.display = 'block';
        bar_all_hours_text.style.display = 'block';
        bar_all_hours_num.innerHTML = all_hours_num.innerHTML;
    }
    else{
        bar_all_hours_num.style.display = 'none';
        bar_all_hours_text.style.display = 'none';
    }
    
}
