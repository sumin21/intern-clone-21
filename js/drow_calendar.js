
export function f_drow_calendar(){//캘린더 그리기
    const startDate = new Date();//시작 날짜 (6.27)
    const endDate = new Date();//끝 날짜 (12.31)
    const nowDate = new Date();//현재 날짜
    const comparedDate = new Date();//시작 날짜부터 +1 증가
    const realendDate = new Date();//렌트 가능한 마지막 날짜 (우선 12.15로 설정)

    //공휴일
    const holidays = ['2021/08/15','2021/08/16','2021/09/20','2021/09/21','2021/09/22','2021/10/03','2021/10/04','2021/10/09','2021/10/11','2021/12/25'];

    f_date_set(realendDate, 12, 15);//임의로
    
    f_date_set(endDate, 12, 31);//12/31 설정

    const viewYear = nowDate.getFullYear();
    const viewMonth = nowDate.getMonth();
    var prevLast = new Date(viewYear, viewMonth, 0);
    var PLDay = prevLast.getDay();//해당 전월 마지막 날 요일

    let fragment = document.createDocumentFragment();

    comparedDate.setDate(1);//7.1
    startDate.setDate(1);//7.1

    if(PLDay != 6){//당월이 딱 일요일부터 시작하지 않는 경우
        comparedDate.setDate(comparedDate.getDate() - (PLDay+1)); //6.27
        startDate.setDate(startDate.getDate() - (PLDay+1)); //6.27
    }

    while(f_bigDate(comparedDate, endDate)){//첫날부터 끝날까지 반복
        //첫 7월은 전달(6.27)일때, 둘쨋달부터는 1일일때
        if(f_equalDate(startDate,comparedDate) || ((comparedDate.getMonth()!=startDate.getMonth()+1) && (comparedDate.getDate() == 1))){
            var table_e = document.createElement('table');
            table_e.classList.add('cm-calendar-table');

            //첫달만 (시작날이 이전달이니까)
            if(f_equalDate(startDate,comparedDate)){
                var real_month = comparedDate.getMonth()+2;
            }
            //둘쨋달부터
            else{
                var real_month = comparedDate.getMonth()+1;
            }

            table_e.id = `js_${real_month}_calendar`;
            fragment.appendChild(table_e);//달 첫날에 먼저 넣고
            var tr_e = document.createElement('tr');
            var td_e = document.createElement('td');
            td_e.classList.add('cm-month');
            td_e.id = `js_${comparedDate.getMonth()+1}_month`;
            td_e.setAttribute('colspan', `${real_month}`);
            td_e.textContent = `${comparedDate.getFullYear()}.${real_month}`;
            tr_e.appendChild(td_e);
            table_e.appendChild(tr_e);
            //당월 첫요일이 일요일이 아닌 경우 (빈칸 만들기 위함)
            if(comparedDate.getDay() != 0){
                var tr_e = document.createElement('tr');
                table_e.appendChild(tr_e);
                let day_of_start= comparedDate.getDay();//0,1,2,3,4,5,6

                for(var j=0; j<day_of_start;j++){
                    var td_e = document.createElement('td');
                    td_e.classList.add('cm-not-first-week');
                    tr_e.appendChild(td_e);
                }               
            }
        }
        //일요일인 경우 tr 생성 (7개 단위로 끊기 위해)
        if(comparedDate.getDay()==0){
            var tr_e = document.createElement('tr');
            table_e.appendChild(tr_e);
        }

        var span_e = document.createElement('span'); 
        var td_e = document.createElement('td');
        td_e.classList.add('cm-not-first-week');
        td_e.id = `${f_DateToStr(comparedDate)}`;
        span_e.textContent = `${comparedDate.getDate()}`;
        
        //당일보다 이르면 color-grey
        if(f_bigDate(comparedDate, nowDate)){
            td_e.classList.add('color-grey');
        }
        //당일 푸른 동그라미
        else if(f_equalDate(comparedDate,nowDate)){
            td_e.classList.add('cm-today-td', 'clickable', 'color-red', 'cm-date-td');
            var div_e = document.createElement('div');
            div_e.classList.add('cm-active-child', 'cm-today-circle');
            td_e.appendChild(div_e);
        }
        //당일보다 뒷날짜들 normal
        else if(f_smallDate(comparedDate,nowDate)){
            td_e.classList.add('clickable', 'cm-date-td');
            //일요일
            if(comparedDate.getDay() == 0){
                td_e.classList.add('color-red');
            }
            //휴일
            else{
                for(const holiday of holidays){
                    if(f_DateToStr(comparedDate) == holiday){
                        td_e.classList.add('color-red');
                    }
                }
            }
        }
        
        td_e.appendChild(span_e);
        tr_e.appendChild(td_e);
        comparedDate.setDate(comparedDate.getDate() + 1);//+1씩 증가
    }  
    document.getElementById('js_calendar').appendChild(fragment);

}
//두 날짜가 같은지
function f_equalDate(date1, date2){
    return date1.getTime() == date2.getTime();
}
//날짜 비교
function f_bigDate(date1, date2){//1 < 2 true
    return date1 < date2;
}
//날짜 비교
function f_smallDate(date1, date2){//1 > 2 true
    return date1 > date2;
}
//date -> str
function f_DateToStr(date){
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    year = String(year);
    month = (month<10) ? '0'+String(month) : String(month);
    day = (day<10) ? '0'+String(day) : String(day);
    return year+'/'+month+'/'+day;
}
//str= "2021/07/24" -> date
function f_StrToDate(str){
    var new_date = new Date();
    var new_str = str.split('/');
    new_date.setFullYear(Number(new_str[0]));
    new_date.setMonth(Number(new_str[1]-1));
    new_date.setDate(Number(new_str[2]));
    return new_date;
}
//date 월, 일 설정
function f_date_set(date, month, day){
    date.setMonth(month-1);
    date.setDate(day);
}

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