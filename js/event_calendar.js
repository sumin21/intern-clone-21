import {f_DateToStr} from './drow_calendar.js';
import {f_StrToDate} from './drow_calendar.js';
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
                                alert('no');//이중 modal로 수정할 예정
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
            }     
        });
    }
}

//해당 date(d1) 포함 15일 이내 날짜들 계산 후, array로 반환
function f_dayCalcular(d1){
    var new_day = new Date();
    new_day.setFullYear(d1.getFullYear());
    new_day.setMonth(d1.getMonth());
    new_day.setDate(d1.getDate());
    
    var str = f_DateToStr(new_day) + ' ';
    for(var q=0; q<14; q++){
        new_day.setDate(new_day.getDate() + 1);
        str += f_DateToStr(new_day) + ' ';
    }
    var arr = str.split(' ');
    //마지막 element는 빈것이라 삭제
    arr.pop();
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
function f_activeDates(d1, d2){
    var new_d1 = new Date();
    new_d1.setFullYear(d1.getFullYear());
    new_d1.setMonth(d1.getMonth());
    new_d1.setDate(d1.getDate());

    var new_d2 = new Date();
    new_d2.setFullYear(d2.getFullYear());
    new_d2.setMonth(d2.getMonth());
    new_d2.setDate(d2.getDate());

    var str = '';

    const diff_mon = new_d2.getTime() - new_d1.getTime();
    const diff_day = diff_mon / (1000 * 60 * 60 * 24);

    for(let i=0; i<diff_day-1; i++){
        new_d1.setDate(new_d1.getDate()+1);
        str += f_DateToStr(new_d1) + ' ';
    }
    var arr = str.split(' ');
    arr.pop();
    return arr;
}

//해당 클래스 이름 가진 요소들 모두 삭제
function f_classElementRemove(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}