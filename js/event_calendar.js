import $ from "jquery";
import {f_DateToStr} from './drow_calendar.js';
import {f_StrToDate} from './drow_calendar.js';
import {f_today_timeout} from './drow_calendar.js';
import {f_rent_time_select} from './rent_time.js';
import {f_rent_today_time} from './rent_time.js';



//캘린더 이벤트 생성
export function f_calendar_event(){
    //모든 날짜들
    const cm_dates = document.getElementsByClassName("cm-date-td");

    for(var i=0; i<cm_dates.length; i++){
        var cm_date = cm_dates.item(i);

        cm_date.addEventListener('click',function(){
            let fragment = document.createDocumentFragment();
            if(document.getElementsByClassName('cm-active-date').length >= 1){//클릭된 경우
                if(document.getElementsByClassName('cm-active-date').length == 1){//하나만 클릭된 경우
                    if(!document.getElementsByClassName('cm-active-date')[0] != this){//이미 선택되어 있지 않은 경우
                        var d1 = f_StrToDate(document.getElementsByClassName('cm-active-date')[0].id);
                        var d2 = f_StrToDate(this.id);
                        //클릭된 date보다 뒷날짜 클릭
                        if(d1 < d2){
                            //15일 이후 (선택 불가능)
                            if(!f_classCheck(this, 'cm-rent-possible-bg')){
                                
                                $('#dateoverModal').modal('show');
                            }
                            //15일 내 (선택 가능)(푸른 배경)
                            else{
                                this.classList.add('cm-active-date');
                                var div_e = document.createElement('div');
                                div_e.classList.add('cm-active-child', 'cm-half-circle-start');
                                fragment.appendChild(div_e);
                                document.getElementsByClassName('cm-active-date')[0].appendChild(fragment);
                                
                                fragment = document.createDocumentFragment();
                                var div_e = document.createElement('div');
                                div_e.classList.add('cm-active-child', 'cm-half-circle-end');
                                fragment.appendChild(div_e);
                                this.appendChild(fragment);
                                //클래스 가진 요소들 삭제
                                f_classElementRemove('cm-circle');
                                //선택된 두 date들 사이의 date들
                                var check_between_dates_arr = f_activeDates(f_StrToDate(document.getElementsByClassName('cm-active-date')[0].id), f_StrToDate(this.id));
                                for(const check_between_dates of check_between_dates_arr){                            
                                    var div_e = document.createElement('div');
                                    div_e.classList.add('cm-active-child', 'cm-rect');
                                    fragment.appendChild(div_e);
                                    document.getElementById(check_between_dates).appendChild(fragment);
                                    document.getElementById(check_between_dates).classList.add('cm-active-date');

                                }
                                let selected_default_end = f_selected('js_rent_end_time');
                                //이틀 연속인 경우 (24시간)
                                if(document.getElementsByClassName('cm-active-date').length == 2){
                                    
                                    let selected_default_start = f_selected('js_rent_start_time');
                                    f_childsAllRemove('js_rent_end_time');
                                    f_rent_time_select(selected_default_start, selected_default_end, 'js_rent_end_time'); 
                                    document.getElementById('js_rent_end_date_text2').innerHTML = f_selected('js_rent_end_time');
                                    
                                    f_allTimeCalcular(f_selected('js_rent_start_time'), f_selected('js_rent_start_time'));
                                }
                                else{
                                    f_childsAllRemove('js_rent_end_time');
                                    f_rent_time_select('07:00', selected_default_end, 'js_rent_end_time');
                                    f_allTimeCalcular(f_selected('js_rent_start_time'), selected_default_end);
                                }
                                document.getElementById('js_rent_end_time').disabled = false;
                               
                                document.getElementById('js_rent_end_date_text1').innerHTML = f_elementDateToText(this);
                                document.getElementById('js_rent_end_date_text').style.display = 'block';
                                document.getElementById('js_rent_all_time').style.display = 'block';
                            }
                        }
                        //클릭된 date보다 앞날짜 클릭
                        else if(d1 > d2){
                            document.getElementsByClassName('cm-active-date')[0].classList.remove('cm-active-date');
                            f_classElementRemove('cm-circle');
                            this.classList.add('cm-active-date');
                            f_classElementRemove('cm-rent-possible-bg');
                            //선택된 date1 포함 15일 이내인 date들
                            f_dayPossible(this, fragment);
                            var div_e = document.createElement('div');
                            div_e.classList.add('cm-active-child', 'cm-circle');
                            fragment.appendChild(div_e);
                            this.appendChild(fragment);

                            let selected_default_start = f_selected('js_rent_start_time');
                            f_childsAllRemove('js_rent_start_time');
                            
                            
                            if(this.classList.contains('cm-today-td')){
                                const today_rent_time_arr = f_rent_today_time();
                                f_rent_time_select(`${today_rent_time_arr[0]}:${today_rent_time_arr[1]}`, `${today_rent_time_arr[0]}:${today_rent_time_arr[1]}`, 'js_rent_start_time');
                                //맞는지 확인하기!!!!!!!
                                document.getElementById('js_rent_end_date_text2').innerHTML = f_selected('js_rent_start_time');
                            }
                            else{
                                f_rent_time_select('07:00', selected_default_start, 'js_rent_start_time');
                            }
                            document.getElementById('js_rent_start_date_text1').innerHTML = f_elementDateToText(this);

                        }
                    }
                }
                //이미 두 date 클릭한 경우
                else{
                    var active_dates = document.getElementsByClassName('cm-active-date');
                    var num = active_dates.length;
                    for(var k=0; k < num; k++){
                        active_dates[0].classList.remove('cm-active-date');
                    }
                    f_classElementRemove('cm-half-circle-start');
                    f_classElementRemove('cm-half-circle-end');
                    f_classElementRemove('cm-rect');

                    this.classList.add('cm-active-date');
                    f_classElementRemove('cm-rent-possible-bg');
                    //15일 이내 날짜들
                    f_dayPossible(this, fragment);

                    div_e = document.createElement('div');
                    div_e.classList.add('cm-active-child', 'cm-circle');
                    fragment.appendChild(div_e);
                    this.appendChild(fragment);

                    let selected_default = f_selected('js_rent_start_time');
                    f_childsAllRemove('js_rent_start_time');
                    
                    
                    if(this.classList.contains('cm-today-td')){

                        const today_rent_time_arr = f_rent_today_time();
                        f_rent_time_select(`${today_rent_time_arr[0]}:${today_rent_time_arr[1]}`, `${today_rent_time_arr[0]}:${today_rent_time_arr[1]}`, 'js_rent_start_time');
                        //맞는지 확인하기!!!!!!!
                        console.log('tlqkf'+ f_selected('js_rent_start_time'));
                        document.getElementById('js_rent_start_date_text2').innerHTML = f_selected('js_rent_start_time');
                    }
                    else{
                        f_rent_time_select('05:00', selected_default, 'js_rent_start_time');
                    }
                    document.getElementById('js_rent_end_time').disabled = true;
                    
                    document.getElementById('js_rent_start_date_text1').innerHTML = f_elementDateToText(this);
                    document.getElementById('js_rent_end_date_text').style.display = 'none';
                    document.getElementById('js_rent_all_time').style.setProperty("display", "none", "important");

                }
            }
            //처음으로 클릭하는 경우
            else{
                this.classList.add('cm-active-date');
                //15일 이내 날짜들
                f_dayPossible(this, fragment); 
                div_e = document.createElement('div');
                div_e.classList.add('cm-active-child', 'cm-circle');        
                fragment.appendChild(div_e);
                this.appendChild(fragment);

                f_rent_time_select('07:00', '10:00', 'js_rent_start_time');
                f_rent_time_select('07:00', '10:00', 'js_rent_end_time');
                document.getElementById('js_rent_end_time').disabled = true;
                console.log(f_elementDateToText(this));
                document.getElementById('js_rent_start_date_text1').innerHTML = f_elementDateToText(this);
            }     
        });
    }
    //선택 가능한 dates 중 2,3 번째 디폴트로 선택
    cm_dates[1].click();
    cm_dates[2].click();

    document.getElementById('js_calendar_reselection_btn').addEventListener('click', function(){
        $('#dateoverModal').modal('hide');
        $('html, body').addClass('no-scroll');
    })
}

//해당 date(d1) 포함 15일 이내 날짜들 계산 후, array로 반환
function f_dayCalcular(d1){
    var new_day = new Date();
    new_day.setFullYear(d1.getFullYear());
    new_day.setMonth(d1.getMonth());
    new_day.setDate(d1.getDate());
    
    var arr = [f_DateToStr(new_day)];
    for(var q=0; q<14; q++){
        new_day.setDate(new_day.getDate() + 1);
        arr.push(f_DateToStr(new_day));
    }
    
    return arr;
}

//해당 date 포함 15일 이내 날짜들에 div 생성해서 넣기
function f_dayPossible(date, frag){
    var date_15_arr = f_dayCalcular(f_StrToDate(date.id));
    
    for(const arr_ele of date_15_arr){
        var div_e = document.createElement('div');
        div_e.classList.add('cm-active-child', 'cm-rent-possible-bg');
        frag.appendChild(div_e);
        document.getElementById(arr_ele).appendChild(frag);
    }
}
//해당 요소element 자식중에 특정클래스class_name을 가진 요소가 있는지 
function f_classCheck(element, class_name){
    console.log(element.firstChild);
    if(element.firstChild.nextSibling){
        var sib = element.firstChild.nextSibling;
        for(let i=0; i<sib.classList.length; i++){
            console.log(sib.classList[i]);
            if(sib.classList[i] == class_name){
                return true;
            }
        }
    }
    return false;
}
//선택된 두 date (d1, d2) 사이의 날짜들 (active) 구한 후, array로 반환
function f_activeDates(start_d, end_d){
    var new_d1 = new Date();
    new_d1.setFullYear(start_d.getFullYear());
    new_d1.setMonth(start_d.getMonth());
    new_d1.setDate(start_d.getDate());

    var new_d2 = new Date();
    new_d2.setFullYear(end_d.getFullYear());
    new_d2.setMonth(end_d.getMonth());
    new_d2.setDate(end_d.getDate());

    var arr = [];

    const diff_mon = new_d2.getTime() - new_d1.getTime();
    const diff_day = diff_mon / (1000 * 60 * 60 * 24);

    for(let i=0; i<diff_day-1; i++){
        new_d1.setDate(new_d1.getDate()+1);
        arr.push(f_DateToStr(new_d1));
    }
    
    return arr;
}

//해당 클래스 이름 가진 요소들 모두 삭제
function f_classElementRemove(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
//id 요소의 모든 자식들 삭제
export function f_childsAllRemove(idName){
    var element = document.getElementById(idName); 
    while ( element.hasChildNodes() ) { 
        element.removeChild( element.firstChild ); 
    }

}

//선택된 option의 값 얻기
export function f_selected(idName){
    var element = document.getElementById(idName);
    var index = element.options.selectedIndex;

    return element.options[index].value;
}

function f_elementDateToText(element){
    var d1 = f_StrToDate(element.id);
    const month = d1.getMonth()+1;
    const date = d1.getDate();
    const day = d1.getDay();
    const day_arr = ['일', '월', '화', '수', '목', '금', '토'];
    
    return month+'/'+date+'/'+day_arr[day];

}
//선택된 두 날짜 사이의 시간 계산
export function f_allTimeCalcular(start_time, end_time){
    const d1_arr = document.getElementsByClassName('cm-active-date')[0].id.split('/');
    const d2_arr = document.getElementsByClassName('cm-active-date')[document.getElementsByClassName('cm-active-date').length-1].id.split('/');
    const d1_time_arr = start_time.split(':');
    const d2_time_arr = end_time.split(':');
    const day1 = new Date(d1_arr[0], d1_arr[1], d1_arr[2], d1_time_arr[0], d1_time_arr[1]);
    const day2 = new Date(d2_arr[0], d2_arr[1], d2_arr[2], d2_time_arr[0], d2_time_arr[1]);
    console.log("계산:" + day1 + day2);

    const timeDiff = Math.ceil((day2 - day1) / 3600000);
    console.log(timeDiff);

    let days = parseInt(timeDiff/24);
    let hours = timeDiff%24;

    if(days == 1 && hours == 0){
        days = 0;
        hours = 24;
    }
    if(days){
        document.getElementById('js_rent_all_time_days_num').style.display = 'inline';
        document.getElementById('js_rent_all_time_days_text').style.display = 'inline';
        document.getElementById('js_rent_all_time_days_num').innerHTML = days;
        
    }
    else{
        document.getElementById('js_rent_all_time_days_num').style.display = 'none';
        document.getElementById('js_rent_all_time_days_text').style.display = 'none';
    }
    
    if(hours){
        document.getElementById('js_rent_all_time_hours_num').style.display = 'inline';
        document.getElementById('js_rent_all_time_hours_text').style.display = 'inline';
        document.getElementById('js_rent_all_time_hours_num').innerHTML = hours;
    }
    else{
        document.getElementById('js_rent_all_time_hours_num').style.display = 'none';
        document.getElementById('js_rent_all_time_hours_text').style.display = 'none';
    }
    console.log('kk' + days + hours);
}