import {selected} from './common.js';
import {carListCar} from './car_list_car.js';

export function carListCondition(_rentLocation, _startDate, _startDateTime, _endDate, _endDateTime) {
    if (_rentLocation == 0) {
        _rentLocation = document.getElementById('js_menu_bar_text').innerHTML;
    }
    if (_startDate == 0) {
        _startDate = document.getElementsByClassName('cm-active-date')[0].id;
    }
    if (_startDateTime == 0) {
        _startDateTime = selected('js_rent_start_time');
    }
    if (_endDate == 0) {
        _endDate = document.getElementsByClassName('cm-active-date')[document.getElementsByClassName('cm-active-date').length - 1].id;
    }
    if (_endDateTime == 0) {
        _endDateTime = selected('js_rent_end_time');
    }

    const newStartDateArr = _startDate.split('/');
    const newEndDateArr = _endDate.split('/');
    const rentStartDate = newStartDateArr[0] + '-' + newStartDateArr[1] + '-' + newStartDateArr[2] + ' ' + _startDateTime + ':00';
    const rentEndDate = newEndDateArr[0] + '-' + newEndDateArr[1] + '-' + newEndDateArr[2] + ' ' + _endDateTime + ':00';

    carListCar(_rentLocation, rentStartDate, rentEndDate);
}