import {emptyElmtChild} from './common.js';
import {selected} from './common.js';
import {allTimeCalcular} from './common.js';
import {rentTimeSelect} from './rent_time.js';

export function dateChange() {
    const startDates = document.getElementById('js_rent_start_time');
    const endDates = document.getElementById('js_rent_end_time');

    startDates.addEventListener('change', function () {
        let startDateTime = selected('js_rent_start_time');
        let endDateTime = selected('js_rent_end_time');
        console.log(startDateTime);
        document.getElementById('js_rent_start_date_text2').innerHTML = startDateTime;

        allTimeCalcular(startDateTime, endDateTime);

        //날짜는 안바뀌는 채로 start time 시간만 변경될때 반납시간 select는 재로드
        if (document.getElementsByClassName('cm-active-date').length == 2) {


            emptyElmtChild('js_rent_end_time');
            rentTimeSelect(startDateTime, endDateTime, 'js_rent_end_time');
            document.getElementById('js_rent_end_time').disabled = false;
            endDateTime = selected('js_rent_end_time');
            document.getElementById('js_rent_end_date_text2').innerHTML = endDateTime;

            allTimeCalcular(startDateTime, endDateTime);

        }

    })
    endDates.addEventListener('change', function () {
        let startDateTime = selected('js_rent_start_time');
        let endDateTime = selected('js_rent_end_time');
        console.log(endDateTime);
        document.getElementById('js_rent_end_date_text2').innerHTML = endDateTime;
        allTimeCalcular(startDateTime, endDateTime);
    })
}