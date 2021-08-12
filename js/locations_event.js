import $ from "jquery";
import {carListCondition} from './car_list_condition.js';

const POPULAR_LOCATION_NUM = {
    1: '인천국제공항',
    2: '제주국제공항',
    3: '강릉역',
    5: '부산역',
    7: '광주송정역',
    12: '울릉도',
    13: '서울',
    14: '캠핑카',
    15: '미국(괌)',
    16: '미국(사이판)',
    17: '김포국제공항',
    18: '수원역'
}

//list에 커서 올리고 있을 때 색 변경
export function locationsEvent() {
    const locationLists = document.getElementsByClassName("mm-location-container");
    const locationResultLists = document.getElementsByClassName("mm-location-result-container");

    const locationListLen = locationLists.length;
    for (let i = 0; i < locationListLen; i++) {
        let locationList = locationLists.item(i);

        locationList.onmouseover = function () {
            this.style.backgroundColor = '#eef7ff';
        };
        locationList.onmouseout = function () {
            this.style.backgroundColor = 'white';
        };
    }
    const locationResultLen = locationResultLists.length;
    for (let j = 0; j < locationResultLen; j++) {
        let locationResultList = locationResultLists.item(j);

        locationResultList.onmouseover = function () {
            this.style.backgroundColor = '#eef7ff';
        };
        locationResultList.onmouseout = function () {
            this.style.backgroundColor = 'white';
        };
    }
}

//일반지역 클릭이벤트
export function locationsClickEvent() {
    const locations = document.getElementsByClassName('mm-location-container');

    const locationLen = locations.length;
    for (let i = 0; i < locationLen; i++) {
        let location = locations.item(i);

        location.addEventListener('click', function () {
            document.getElementById('js_menu_bar_text').innerHTML = locations[i].firstChild.firstChild.innerHTML;
            document.getElementById('js_mobile_menu_bar_text').innerHTML = locations[i].firstChild.firstChild.innerHTML;
            carListCondition(document.getElementById('js_menu_bar_text').innerHTML, 0, 0, 0, 0);
            $('#menuModal').modal('hide');
        });
    }

}

//인기지역 클릭이벤트
export function popularLocationsClickEvent() {
    const popularLocations = document.getElementsByClassName("mm-popular-location-container");
    const popularLocationLen = popularLocations.length;

    for (let j = 0; j < popularLocationLen; j++) {
        let popularLocation = popularLocations.item(j);
        popularLocation.addEventListener('click', function () {
            document.getElementById('js_menu_bar_text').innerHTML = POPULAR_LOCATION_NUM[popularLocations[j].getAttribute('data-popularnum')];
            document.getElementById('js_mobile_menu_bar_text').innerHTML = POPULAR_LOCATION_NUM[popularLocations[j].getAttribute('data-popularnum')];

            carListCondition(document.getElementById('js_menu_bar_text').innerHTML, 0, 0, 0, 0);
            $('#menuModal').modal('hide');
        });
    }
}