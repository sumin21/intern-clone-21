import $ from "jquery";
import {selected} from './common';
import {emptyElmtChild, classElementRemove} from './common.js';
import {rentTimeSelect} from './rent_time.js';
import {carListCondition} from './car_list_condition.js';

const calendarApplyBtn = document.getElementById('js_calendar_apply_btn');
//적용하기 누른적 없을때 && 뒤로 버튼 클릭
let mstartDate;
let mendDate;
let mstartDateTime = '10:00';
let mendDateTime = '10:00';

export function calendarBarEvent() {
    mstartDate = document.getElementsByClassName('cm-active-date')[0];
    mendDate = document.getElementsByClassName('cm-active-date')[document.getElementsByClassName('cm-active-date').length - 1];

    //적용하기 클릭
    calendarApplyBtn.addEventListener('click', function () {
        if (document.getElementsByClassName('cm-active-date').length > 1) {
            calendarBarChange();
            mstartDate = document.getElementsByClassName('cm-active-date')[0];
            mendDate = document.getElementsByClassName('cm-active-date')[document.getElementsByClassName('cm-active-date').length - 1];
            mstartDateTime = selected('js_rent_start_time');
            mendDateTime = selected('js_rent_end_time');
            $('#calendarModal').modal('hide');

            //선택한 대여날짜, 반납날짜, 시간 (처음에도 생성해)

            carListCondition(0, mstartDate.id, mstartDateTime, mendDate.id, mendDateTime);
        }
        //날짜 하나만 클릭하고 적용하기 눌렀을때 에러/수정
        else {
            alert('dd');
        }
    });
    const calendarBar = document.getElementById('js_calendar_bar');
    const mobileCalendarBar = document.getElementById('js_mobile_calendar_bar');

    //뒤로 버튼 눌렀을 수도 있으니까 (이전에 선택된 값으로 초기화)
    calendarBar.addEventListener('click', calendarChange);
    mobileCalendarBar.addEventListener('click', calendarChange);
}


export function calendarBarChange() {
    const startDateNum = document.getElementById('js_rent_start_date_text1');
    const startDateText = document.getElementById('js_rent_start_date_text2');
    const endDateNum = document.getElementById('js_rent_end_date_text1');
    const endDateText = document.getElementById('js_rent_end_date_text2');
    const allDaysNum = document.getElementById('js_rent_all_time_days_num');
    const allHoursNum = document.getElementById('js_rent_all_time_hours_num');

    //웹
    const barStartDateNum = document.getElementById('js_calendar_bar_start_date');
    const barStartDateText = document.getElementById('js_calendar_bar_start_time');
    const barEndDateNum = document.getElementById('js_calendar_bar_end_date');
    const barEndDateText = document.getElementById('js_calendar_bar_end_time');
    const barAllDaysNum = document.getElementById('js_calendar_bar_all_time_days_num');
    const barAllDaysText = document.getElementById('js_calendar_bar_all_time_days_text');
    const barAllHoursNum = document.getElementById('js_calendar_bar_all_time_hours_num');
    const barAllHoursText = document.getElementById('js_calendar_bar_all_time_hours_text');

    //모바일
    const mobileBarStartDateNum = document.getElementById('js_mobile_calendar_bar_start_date');
    const mobileBarStartDateText = document.getElementById('js_mobile_calendar_bar_start_time');
    const mobileBarEndDateNum = document.getElementById('js_mobile_calendar_bar_end_date');
    const mobileBarEndDateText = document.getElementById('js_mobile_calendar_bar_end_time');
    const mobileBarAllDaysNum = document.getElementById('js_mobile_calendar_bar_all_time_days_num');
    const mobileBarAllDaysText = document.getElementById('js_mobile_calendar_bar_all_time_days_text');
    const mobileBarAllHoursNum = document.getElementById('js_mobile_calendar_bar_all_time_hours_num');
    const mobileBarAllHoursText = document.getElementById('js_mobile_calendar_bar_all_time_hours_text');

    barStartDateNum.innerHTML = startDateNum.innerHTML;
    barStartDateText.innerHTML = startDateText.innerHTML;
    barEndDateNum.innerHTML = endDateNum.innerHTML;
    barEndDateText.innerHTML = endDateText.innerHTML;

    mobileBarStartDateNum.innerHTML = startDateNum.innerHTML;
    mobileBarStartDateText.innerHTML = startDateText.innerHTML;
    mobileBarEndDateNum.innerHTML = endDateNum.innerHTML;
    mobileBarEndDateText.innerHTML = endDateText.innerHTML;

    calendarBarAllDay(allDaysNum, barAllDaysNum, barAllDaysText, mobileBarAllDaysNum, mobileBarAllDaysText);
    calendarBarAllHour(allHoursNum, barAllHoursNum, barAllHoursText, mobileBarAllHoursNum, mobileBarAllHoursText);
}
//웹
function calendarBarAllDay(_allDaysNum, _barAllDaysNum, _barAllDaysText, _mobileBarAllDaysNum, _mobileBarAllDaysText) {
    if (_allDaysNum.style.display == 'inline') {
        _barAllDaysNum.style.display = 'block';
        _barAllDaysText.style.display = 'block';

        _mobileBarAllDaysNum.style.display = 'block';
        _mobileBarAllDaysText.style.display = 'block';

        _barAllDaysNum.innerHTML = _allDaysNum.innerHTML;
        _mobileBarAllDaysNum.innerHTML = _allDaysNum.innerHTML;
    } else {
        _barAllDaysNum.style.display = 'none';
        _barAllDaysText.style.display = 'none';

        _mobileBarAllDaysNum.style.display = 'none';
        _mobileBarAllDaysText.style.display = 'none';
    }
}
//모바일
function calendarBarAllHour(_allHoursNum, _barAllHoursNum, _barAllHoursText, _mobileBarAllHoursNum, _mobileBarAllHoursText) {
    if (_allHoursNum.style.display == 'inline') {
        _barAllHoursNum.style.display = 'block';
        _barAllHoursText.style.display = 'block';

        _mobileBarAllHoursNum.style.display = 'block';
        _mobileBarAllHoursText.style.display = 'block';

        _barAllHoursNum.innerHTML = _allHoursNum.innerHTML;
        _mobileBarAllHoursNum.innerHTML = _allHoursNum.innerHTML;
    } else {
        _barAllHoursNum.style.display = 'none';
        _barAllHoursText.style.display = 'none';

        _mobileBarAllHoursNum.style.display = 'none';
        _mobileBarAllHoursText.style.display = 'none';
    }
}
//캘린더 바 클릭 이벤트
function calendarChange() {
    if (mstartDate && mendDate) {
        if (document.getElementsByClassName('cm-active-date').length == 1) {
            document.getElementsByClassName('cm-active-date')[0].classList.remove('cm-active-date');
            classElementRemove('cm-rent-possible-bg');
            emptyElmtChild('js_rent_start_time');
        }
        mstartDate.click();
        mendDate.click();

        const startOptionNum = document.getElementById('js_rent_start_time').childNodes.length;
        const endOptionNum = document.getElementById('js_rent_end_time').childNodes.length;

        for (let i = 0; i < startOptionNum; i++) {
            if (document.getElementById('js_rent_start_time').children[i].value == mstartDateTime) {
                document.getElementById('js_rent_start_time').children[i].selected = true;
            }
        }

        if (document.getElementsByClassName('cm-active-date').length == 2) {
            console.log('startOptionNum*', mstartDateTime, document.getElementById('js_rent_end_time').childNodes, mendDateTime);
            emptyElmtChild('js_rent_end_time');
            rentTimeSelect(mstartDateTime, mendDateTime, 'js_rent_end_time');
        } else {
            for (let j = 0; j < endOptionNum; j++) {
                if (document.getElementById('js_rent_end_time').children[j].value == mendDateTime) {
                    document.getElementById('js_rent_end_time').children[j].selected = true;
                }
            }
        }
    }
}