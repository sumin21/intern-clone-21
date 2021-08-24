export function rentTodayTime() {
    let today = new Date();
    let hours = today.getHours(); // 시 (0~23)
    let minutes = today.getMinutes(); // 분 (0~59)
    let seconds = today.getSeconds(); // 초 (0~59)
    console.log(hours + ' ' + minutes + ' ' + seconds);

    let newHours = hours;
    let newMinutes = minutes;

    if (minutes >= 0 && minutes <= 29) {
        newMinutes = 0;
        newHours += 1;
        if (newHours == 24) {
            newHours = 0;
        }
    } else {
        newMinutes = 30;
        newHours += 1;
        if (newHours == 24) {
            newHours = 0;
        }
    }
    newHours = (newHours < 10) ? '0' + newHours : String(newHours);
    newMinutes = (newMinutes < 10) ? '0' + newMinutes : String(newMinutes);
    console.log([newHours, newMinutes]);
    return [newHours, newMinutes];

}

//'11:00'
export function rentTimeSelect(_startStr, _defaultStr, _idName) {
    let fragment = document.createDocumentFragment();

    let startStr = _startStr;
    let arr = startStr.split(':');
    //시작 시간이 7시 보다 이르면 7시가 디폴트값
    if (Number(arr[0]) < 7) {
        startStr = '07:00';
        arr = startStr.split(':');
    }

    let check = false;
    if (bigTime(_defaultStr, _startStr)) {
        check = true;
    }
    let option;
    while (Number(arr[0]) != 22) {

        option = document.createElement('option');
        option.setAttribute('value', startStr);
        option.textContent = startStr;

        if (check) {
            option.selected = true;
        } else if (_defaultStr == startStr) {
            option.selected = true;
        }
        fragment.appendChild(option);

        arr[0] = (arr[1] == '00') ? arr[0] : NumberToStr(Number(arr[0]) + 1);
        arr[1] = (arr[1] == '00') ? '30' : '00';

        startStr = arr[0] + ':' + arr[1];
        check = false;
    }
    option = document.createElement('option');
    option.setAttribute('value', startStr);
    option.textContent = startStr;
    if (check) {
        option.selected = true;
    } else if (_defaultStr == startStr) {
        option.selected = true;
    }
    fragment.appendChild(option);

    document.getElementById(_idName).appendChild(fragment);

}

function NumberToStr(_num) {
    let str = (_num < 10) ? '0' + _num : String(_num);
    return str;
}

export function bigTime(_str1, _str2) {
    let arr1 = _str1.split(':');
    let arr2 = _str2.split(':');
    if (Number(arr1[0] + arr1[1]) < Number(arr2[0] + arr2[1])) {
        return true;
    } else return false;
}