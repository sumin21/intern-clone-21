//_parentId 자식 모두 제거
export function emptyElmtChild(_parentId) {
    while (document.getElementById(_parentId).hasChildNodes()) {
        document.getElementById(_parentId).removeChild(document.getElementById(_parentId).firstChild);
    }
}

//두 날짜가 같은지
export function equalDate(_date1, _date2) {
    return _date1.getTime() == _date2.getTime();
}

//날짜 비교
export function bigDate(_date1, _date2) { //1 < 2 true
    return _date1 < _date2;
}

//날짜 비교
export function smallDate(_date1, _date2) { //1 > 2 true
    return _date1 > _date2;
}

//date -> str
export function DateToStr(_date) {
    let year = _date.getFullYear();
    let month = _date.getMonth() + 1;
    let day = _date.getDate();
    year = String(year);
    month = (month < 10) ? '0' + String(month) : String(month);
    day = (day < 10) ? '0' + String(day) : String(day);
    return year + '/' + month + '/' + day;
}

//str= "2021/07/24" -> date
export function StrToDate(_str) {
    let newDate = new Date();
    let newStr = _str.split('/');
    newDate.setFullYear(Number(newStr[0]));
    newDate.setMonth(Number(newStr[1] - 1));
    newDate.setDate(Number(newStr[2]));
    return newDate;
}

//해당 요소element 자식중에 특정클래스class_name을 가진 요소가 있는지 
export function classCheck(_element, _className) {
    if (_element.firstChild.nextSibling) {
        let sib = _element.firstChild.nextSibling;
        const sibClassNum = sib.classList.length;
        for (let i = 0; i < sibClassNum; i++) {
            if (sib.classList[i] == _className) {
                return true;
            }
        }
    }
    return false;
}

//해당 클래스 이름 가진 요소들 모두 삭제
export function classElementRemove(_className) {
    let elements = document.getElementsByClassName(_className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

//선택된 두 날짜 사이의 시간 계산
export function allTimeCalcular(_startTime, _endTime) {
    const d1Arr = document.getElementsByClassName('cm-active-date')[0].id.split('/');
    const d2Arr = document.getElementsByClassName('cm-active-date')[document.getElementsByClassName('cm-active-date').length - 1].id.split('/');
    const d1TimeArr = _startTime.split(':');
    const d2TimeArr = _endTime.split(':');
    const day1 = new Date(d1Arr[0], d1Arr[1], d1Arr[2], d1TimeArr[0], d1TimeArr[1]);
    const day2 = new Date(d2Arr[0], d2Arr[1], d2Arr[2], d2TimeArr[0], d2TimeArr[1]);

    const timeDiff = Math.ceil((day2 - day1) / 3600000);
    let days = parseInt(timeDiff / 24);
    let hours = timeDiff % 24;

    if (days == 1 && hours == 0) {
        days = 0;
        hours = 24;
    }
    if (days) {
        document.getElementById('js_rent_all_time_days_num').style.display = 'inline';
        document.getElementById('js_rent_all_time_days_text').style.display = 'inline';
        document.getElementById('js_rent_all_time_days_num').innerHTML = days;

    } else {
        document.getElementById('js_rent_all_time_days_num').style.display = 'none';
        document.getElementById('js_rent_all_time_days_text').style.display = 'none';
    }

    if (hours) {
        document.getElementById('js_rent_all_time_hours_num').style.display = 'inline';
        document.getElementById('js_rent_all_time_hours_text').style.display = 'inline';
        document.getElementById('js_rent_all_time_hours_num').innerHTML = hours;
    } else {
        document.getElementById('js_rent_all_time_hours_num').style.display = 'none';
        document.getElementById('js_rent_all_time_hours_text').style.display = 'none';
    }
}

//선택된 option의 값 얻기
export function selected(_idName) {
    let element = document.getElementById(_idName);
    let index = element.options.selectedIndex;

    return element.options[index].value;
}