import $ from "jquery";
import {DateToStr, StrToDate, childClassCheck, emptyElmtChild, classElementRemove, allTimeCalcular, selected} from './common.js';
import {rentTimeSelect} from './rent_time.js';
import {rentTodayTime} from './rent_time.js';
import {bigTime} from './rent_time.js';
import {filterDriverOldCalculStartDate} from './filter_driver_old_calcul.js';



//캘린더 이벤트 생성
export function calendarEvent() {
    //모든 날짜들
    const dates = document.getElementsByClassName("cm-date-td");
    const datesLen = dates.length;
    for (let i = 0; i < datesLen; i++) {
        let date = dates.item(i);

        date.addEventListener('click', function () {
            let fragment = document.createDocumentFragment();
            if (document.getElementsByClassName('cm-active-date').length >= 1) { //클릭된 경우
                if (document.getElementsByClassName('cm-active-date').length == 1) { //하나만 클릭된 경우
                    if (document.getElementsByClassName('cm-active-date')[0] != this) { //이미 선택되어 있지 않은 경우

                        let d1 = StrToDate(document.getElementsByClassName('cm-active-date')[0].id);
                        let d2 = StrToDate(this.id);
                        //클릭된 date보다 뒷날짜 클릭
                        if (d1 < d2) {
                            //15일 이후 (선택 불가능)
                            if (!childClassCheck(this, 'cm-rent-possible-bg')) {
                                $('#dateoverModal').modal('show');
                            }
                            //15일 내 (선택 가능)(푸른 배경)
                            else {
                                clickableDateClick(this, fragment);
                            }
                        }
                        //클릭된 date보다 앞날짜 클릭
                        else if (d1 > d2) {
                            beforeDateClick(this, fragment)
                        }
                    }
                    //이미 선택된 날짜 또 선택
                    else {
                        $('#js_calendar_one_more_toast').toast('show');
                    }
                }
                //이미 두 date 클릭한 경우
                else {
                    thirdDateClick(this, fragment);
                }
            }
            //처음으로 클릭하는 경우
            else {
                firstDateClick(this, fragment);
            }
        });
    }
    defaultCalendarEvent(dates);
}

function clickableDateClick(_date, _fragment) {
    let fragment = _fragment === null ? [] : _fragment;
    _date.classList.add('cm-active-date');
    let div = document.createElement('div');
    div.classList.add('cm-active-child', 'cm-half-circle-start');
    fragment.appendChild(div);
    document.getElementsByClassName('cm-active-date')[0].appendChild(fragment);

    fragment = document.createDocumentFragment();
    div = document.createElement('div');
    div.classList.add('cm-active-child', 'cm-half-circle-end');
    fragment.appendChild(div);
    _date.appendChild(fragment);
    //클래스 가진 요소들 삭제
    classElementRemove('cm-circle');
    //선택된 두 date들 사이의 date들
    let checkBetweenDates = activeDates(StrToDate(document.getElementsByClassName('cm-active-date')[0].id), StrToDate(_date.id));
    for (let checkBetweenDate of checkBetweenDates) {
        div = document.createElement('div');
        div.classList.add('cm-active-child', 'cm-rect');
        fragment.appendChild(div);
        document.getElementById(checkBetweenDate).appendChild(fragment);
        document.getElementById(checkBetweenDate).classList.add('cm-active-date');

    }

    let selectedDefaultEnd = selected('js_rent_end_time');
    //이틀 연속인 경우 (24시간)
    if (document.getElementsByClassName('cm-active-date').length == 2) {

        let selectedDefaultStart = selected('js_rent_start_time');

        //반납시간 강제적으로 바뀔때
        if (bigTime(selectedDefaultEnd, selectedDefaultStart)) {
            $('#js_calendar_end_time_change_toast').toast('show');
        }
        emptyElmtChild('js_rent_end_time');
        rentTimeSelect(selectedDefaultStart, selectedDefaultEnd, 'js_rent_end_time');
        document.getElementById('js_rent_end_date_text2').innerHTML = selected('js_rent_end_time');

        allTimeCalcular(selected('js_rent_start_time'), selected('js_rent_start_time'));
    } else {
        emptyElmtChild('js_rent_end_time');
        rentTimeSelect('07:00', selectedDefaultEnd, 'js_rent_end_time');
        allTimeCalcular(selected('js_rent_start_time'), selectedDefaultEnd);
    }
    document.getElementById('js_rent_end_time').disabled = false;

    document.getElementById('js_rent_end_date_text1').innerHTML = elementDateToText(_date);
    document.getElementById('js_rent_end_date_text').style.display = 'block';
    document.getElementById('js_rent_all_time').style.display = 'block';
}

//선택된 두 date (d1, d2) 사이의 날짜들 (active) 구한 후, array로 반환
function activeDates(_startDate, _endDate) {
    let startDate = new Date();
    startDate.setFullYear(_startDate.getFullYear());
    startDate.setMonth(_startDate.getMonth());
    startDate.setDate(_startDate.getDate());

    let endDate = new Date();
    endDate.setFullYear(_endDate.getFullYear());
    endDate.setMonth(_endDate.getMonth());
    endDate.setDate(_endDate.getDate());

    let arr = [];

    const diffMon = endDate.getTime() - startDate.getTime();
    const diffDay = diffMon / (1000 * 60 * 60 * 24);

    for (let i = 0; i < diffDay - 1; i++) {
        startDate.setDate(startDate.getDate() + 1);
        arr.push(DateToStr(startDate));
    }

    return arr;
}

function elementDateToText(_element) {
    let d1 = StrToDate(_element.id);
    const month = d1.getMonth() + 1;
    const date = d1.getDate();
    const day = d1.getDay();
    const dayArr = ['일', '월', '화', '수', '목', '금', '토'];

    return month + '/' + date + '/' + dayArr[day];
}


function beforeDateClick(_date, _fragment) {
    let lastStartTime = selected('js_rent_start_time');
    document.getElementsByClassName('cm-active-date')[0].classList.remove('cm-active-date');

    classElementRemove('cm-circle');
    _date.classList.add('cm-active-date');
    classElementRemove('cm-rent-possible-bg');
    //선택된 date1 포함 15일 이내인 date들
    dayPossible(_date, _fragment);
    let div = document.createElement('div');
    div.classList.add('cm-active-child', 'cm-circle');
    _fragment.appendChild(div);
    _date.appendChild(_fragment);

    let selectedDefaultStart = selected('js_rent_start_time');
    emptyElmtChild('js_rent_start_time');

    if (_date.classList.contains('cm-today-td')) {
        const todayRentTimeArr = rentTodayTime();
        //대여시간 강제적으로 바뀔때
        if (bigTime(lastStartTime, todayRentTimeArr[0] + ':' + todayRentTimeArr[1])) {
            $('#js_calendar_start_time_change_toast').toast('show');
        }
        rentTimeSelect(`${todayRentTimeArr[0]}:${todayRentTimeArr[1]}`, `${todayRentTimeArr[0]}:${todayRentTimeArr[1]}`, 'js_rent_start_time');
        //맞는지 확인하기!!!!!!!
        document.getElementById('js_rent_end_date_text2').innerHTML = selected('js_rent_start_time');


    } else {
        rentTimeSelect('07:00', selectedDefaultStart, 'js_rent_start_time');
    }
    document.getElementById('js_rent_start_date_text1').innerHTML = elementDateToText(_date);
    document.getElementById('js_rent_start_date_text1').setAttribute('data-startdate', _date.id);
    filterDriverOldCalculStartDate();
    console.log('datedate', _date);
}


//해당 date 포함 15일 이내 날짜들에 div 생성해서 넣기
function dayPossible(_date, _frag) {
    let date15Arr = dayCalcular(StrToDate(_date.id));

    for (let date15 of date15Arr) {
        let div = document.createElement('div');
        div.classList.add('cm-active-child', 'cm-rent-possible-bg');
        _frag.appendChild(div);
        document.getElementById(date15).appendChild(_frag);
    }
}

//해당 date(d1) 포함 15일 이내 날짜들 계산 후, array로 반환
function dayCalcular(_d1) {
    let newDay = new Date();
    newDay.setFullYear(_d1.getFullYear());
    newDay.setMonth(_d1.getMonth());
    newDay.setDate(_d1.getDate());

    let arr = [DateToStr(newDay)];
    //수정 i
    for (let q = 0; q < 14; q++) {
        newDay.setDate(newDay.getDate() + 1);
        arr.push(DateToStr(newDay));
    }

    return arr;
}

function thirdDateClick(_date, _fragment) {
    let lastStartTime = selected('js_rent_start_time');
    let activeDates = document.getElementsByClassName('cm-active-date');
    const num = activeDates.length;
    for (let k = 0; k < num; k++) {
        activeDates[0].classList.remove('cm-active-date');
    }
    classElementRemove('cm-half-circle-start');
    classElementRemove('cm-half-circle-end');
    classElementRemove('cm-rect');

    _date.classList.add('cm-active-date');
    classElementRemove('cm-rent-possible-bg');
    //15일 이내 날짜들
    dayPossible(_date, _fragment);

    let div = document.createElement('div');
    div.classList.add('cm-active-child', 'cm-circle');
    _fragment.appendChild(div);
    _date.appendChild(_fragment);

    let selectedDefault = selected('js_rent_start_time');
    emptyElmtChild('js_rent_start_time');

    if (_date.classList.contains('cm-today-td')) {
        //대여시간 강제적으로 바뀔때
        const todayRentTimeArr = rentTodayTime();
        if (bigTime(lastStartTime, todayRentTimeArr[0] + ':' + todayRentTimeArr[1])) {
            $('#js_calendar_start_time_change_toast').toast('show');
        }

        rentTimeSelect(`${todayRentTimeArr[0]}:${todayRentTimeArr[1]}`, `${todayRentTimeArr[0]}:${todayRentTimeArr[1]}`, 'js_rent_start_time');
        //맞는지 확인하기!!!!!!!
        console.log('오늘 클릭' + selected('js_rent_start_time'));
        document.getElementById('js_rent_start_date_text2').innerHTML = selected('js_rent_start_time');
    } else {
        rentTimeSelect('05:00', selectedDefault, 'js_rent_start_time');
    }
    document.getElementById('js_rent_end_time').disabled = true;

    document.getElementById('js_rent_start_date_text1').innerHTML = elementDateToText(_date);
    document.getElementById('js_rent_start_date_text1').setAttribute('data-startdate', _date.id);
    filterDriverOldCalculStartDate();
    document.getElementById('js_rent_end_date_text').style.display = 'none';
    document.getElementById('js_rent_all_time').style.setProperty("display", "none", "important");

}

function firstDateClick(_date, _fragment) {
    _date.classList.add('cm-active-date');
    //15일 이내 날짜들
    dayPossible(_date, _fragment);
    let div = document.createElement('div');
    div.classList.add('cm-active-child', 'cm-circle');
    _fragment.appendChild(div);
    _date.appendChild(_fragment);

    if (_date.classList.contains('cm-today-td')) {

        const todayRentTimeArr = rentTodayTime();
        rentTimeSelect(`${todayRentTimeArr[0]}:${todayRentTimeArr[1]}`, `${todayRentTimeArr[0]}:${todayRentTimeArr[1]}`, 'js_rent_start_time');
        //맞는지 확인하기!!!!!!!
        console.log('처음 오늘 클릭' + selected('js_rent_start_time'));
        document.getElementById('js_rent_start_date_text2').innerHTML = selected('js_rent_start_time');
    } else {
        rentTimeSelect('07:00', '10:00', 'js_rent_start_time');
    }

    rentTimeSelect('07:00', '10:00', 'js_rent_end_time');
    document.getElementById('js_rent_end_time').disabled = true;
    console.log(elementDateToText(_date));
    document.getElementById('js_rent_start_date_text1').innerHTML = elementDateToText(_date);
    document.getElementById('js_rent_start_date_text1').setAttribute('data-startdate', _date.id);
    filterDriverOldCalculStartDate();
}

//처음에만
function defaultCalendarEvent(_dates) {
    //선택 가능한 dates 중 2,3 번째 디폴트로 선택
    _dates[1].click();
    _dates[2].click();

    document.getElementById('js_calendar_reselection_btn').addEventListener('click', function () {
        $('#dateoverModal').modal('hide');
    })

    //모달 닫힐때 이벤트
    $('#dateoverModal').on('hidden.bs.modal', function () {
        $('html, body').addClass('no-scroll');
    });

    document.getElementById('js_dateover_modal_close_btn').addEventListener('click', function () {
        $('#dateoverModal').modal('hide');
    })
    //캘린더 닫힐 때 스크롤 가능하게
    $('#calendarModal').on('hide.bs.modal', function () {
        document.getElementsByTagName('html')[0].classList.remove('no-scroll');
        document.getElementsByTagName('body')[0].classList.remove('no-scroll');
    });
}