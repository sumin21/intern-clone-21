
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
export function f_DateToStr(date){
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    year = String(year);
    month = (month<10) ? '0'+String(month) : String(month);
    day = (day<10) ? '0'+String(day) : String(day);
    return year+'/'+month+'/'+day;
}
//str= "2021/07/24" -> date
export function f_StrToDate(str){
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
