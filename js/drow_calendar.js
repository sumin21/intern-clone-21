import {equalDate, bigDate, smallDate, DateToStr} from './common.js';

export function drowCalendar() { //캘린더 그리기
    const startDate = new Date(); //시작 날짜 (6.27)
    const endDate = new Date(); //끝 날짜 (12.31)
    const nowDate = new Date(); //현재 날짜
    const comparedDate = new Date(); //시작 날짜부터 +1 증가
    const realendDate = new Date(); //렌트 가능한 마지막 날짜 (우선 12.15로 설정)


    dateSet(realendDate, 12, 15); //임의로
    dateSet(endDate, 12, 31); //12/31 설정

    const viewYear = nowDate.getFullYear();
    const viewMonth = nowDate.getMonth();
    let prevLast = new Date(viewYear, viewMonth, 0);
    let PLDay = prevLast.getDay(); //해당 전월 마지막 날 요일

    let fragment = document.createDocumentFragment();

    comparedDate.setDate(1); //7.1
    startDate.setDate(1); //7.1

    if (PLDay != 6) { //당월이 딱 일요일부터 시작하지 않는 경우
        comparedDate.setDate(comparedDate.getDate() - (PLDay + 1)); //6.27
        startDate.setDate(startDate.getDate() - (PLDay + 1)); //6.27
    }
    console.log('start date:', startDate);

    let table;
    let td;
    let tr;

    while (bigDate(comparedDate, endDate)) { //첫날부터 끝날까지 반복
        //첫 7월은 전달(6.27)일때, 둘쨋달부터는 1일일때 (시작달이 일요일부터 시작할경우 추가)
        if (equalDate(startDate, comparedDate) || ((comparedDate.getMonth() != startDate.getMonth() + 1) && (comparedDate.getDate() == 1)) || (PLDay == 6 && comparedDate.getDate() == 1)) {
            table = document.createElement('table');
            //달 text, 전달 텍스트 지우기
            tr = monthStartDrow(table, startDate, comparedDate, PLDay);
            fragment.appendChild(table);
        }
        //일요일인 경우 tr 생성 (7개 단위로 끊기 위해)
        if (comparedDate.getDay() == 0) {
            tr = document.createElement('tr');
            table.appendChild(tr);
        }
        //일반 day들
        td = commonDateDrow(comparedDate);

        //당일보다 이르면 color-grey
        if (bigDate(comparedDate, nowDate)) {
            td.classList.add('color-grey');
        }
        //당일 푸른 동그라미
        else if (equalDate(comparedDate, nowDate)) {
            td = todayDrow(td);
        }
        //당일보다 뒷날짜들 normal
        else if (smallDate(comparedDate, nowDate)) {
            td = afterDateDrow(td, comparedDate);
        }

        tr.appendChild(td);
        comparedDate.setDate(comparedDate.getDate() + 1); //+1씩 증가
    }
    document.getElementById('js_calendar').appendChild(fragment);
}
//month 텍스트 그리기
function monthStartDrow(_table, _startDate, _comparedDate, _PLDay) {
    _table.classList.add('cm-calendar-table');
    let realMonth;
    let tr;
    //첫달만 (시작날이 이전달이니까)
    if (equalDate(_startDate, _comparedDate) && _PLDay != 6) {
        realMonth = _comparedDate.getMonth() + 2;
    }
    //둘쨋달부터
    else {
        realMonth = _comparedDate.getMonth() + 1;
    }

    _table.id = `js_${realMonth}_calendar`;
    //달 첫날에 먼저 넣고
    let trMonthText = document.createElement('tr');
    let tdMonthText = document.createElement('td');
    tdMonthText.classList.add('cm-month');
    tdMonthText.id = `js_${_comparedDate.getMonth()+1}_month`;
    tdMonthText.setAttribute('colspan', `${realMonth}`);
    tdMonthText.textContent = `${_comparedDate.getFullYear()}.${realMonth}`;
    trMonthText.appendChild(tdMonthText);

    _table.appendChild(trMonthText);

    //당월 첫요일이 일요일이 아닌 경우 (빈칸 만들기 위함)
    if (_comparedDate.getDay() != 0) {
        //수정
        tr = document.createElement('tr');
        _table.appendChild(tr);
        let dayOfStart = _comparedDate.getDay(); //0,1,2,3,4,5,6
        let td;
        for (let j = 0; j < dayOfStart; j++) {
            td = document.createElement('td');
            td.classList.add('cm-not-first-week');
            tr.appendChild(td);
        }
    }
    return tr;
}
//일반 date들 그리기
function commonDateDrow(_comparedDate) {
    let span = document.createElement('span');
    let td = document.createElement('td');
    td.classList.add('cm-not-first-week');
    td.id = `${DateToStr(_comparedDate)}`;
    span.textContent = `${_comparedDate.getDate()}`;
    td.appendChild(span);

    return td;
}
//당일 동그라미
function todayDrow(_td) {
    let td = _td === null ? [] : _td;

    td.classList.add('cm-today-td', 'clickable', 'color-red', 'cm-date-td');

    if (todayTimeout()) { //선택 안되게
        td.classList.remove('clickable', 'cm-date-td', 'color-red');
        td.classList.add('color-grey');
    }
    let div = document.createElement('div');
    div.classList.add('cm-active-child', 'cm-today-circle');
    td.appendChild(div);

    return td;
}
//당일 이후 그리기
function afterDateDrow(_td, _comparedDate) {
    let td = _td === null ? [] : _td;

    //공휴일
    const holidays = ['2021/08/15', '2021/08/16', '2021/09/20', '2021/09/21', '2021/09/22', '2021/10/03', '2021/10/04', '2021/10/09', '2021/10/11', '2021/12/25'];

    td.classList.add('clickable', 'cm-date-td');
    //일요일
    if (_comparedDate.getDay() == 0) {
        td.classList.add('color-red');
    }
    //휴일
    else {
        for (const holiday of holidays) {
            if (DateToStr(_comparedDate) == holiday) {
                td.classList.add('color-red');
            }
        }
    }

    return td;
}

//date 월, 일 설정
function dateSet(_date, _month, _day) {
    _date.setMonth(_month - 1);
    _date.setDate(_day);
}
//당일 시간이 21:30을 지난 경우 true
export function todayTimeout() {
    const today = new Date();
    if (today.getHours >= 21 && today.getMinutes >= 30) {
        return true;
    }
    return false;
}