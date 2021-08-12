import axios from 'axios';
import {locationsEvent} from './locations_event.js';
import {locationsClickEvent} from './locations_event.js';
import {popularLocationsClickEvent} from './locations_event.js';

export function locationList() {
    axios.get("http://ec2-52-78-81-30.ap-northeast-2.compute.amazonaws.com:3000/locations").then((Response) => {
        console.log(Response.data);
        const locations = Response.data;
        let airports = [];
        let ktxs = [];
        let srts = [];
        let buss = [];
        let regions = [];
        let abroads = [];
        //popular
        const popularListArr = popularLocationCheck(locations);
        popularLocationListMake(popularListArr);
        popularLocationsClickEvent();
        //일반지역
        locationsSeparate(locations, airports, ktxs, srts, buss, regions, abroads);
        console.log(airports, ktxs, srts, buss, regions, abroads);
        locationsMake(airports, 'airport');
        locationsMake(ktxs, 'ktx');
        locationsMake(srts, 'srt');
        locationsMake(buss, 'bus');
        locationsMake(regions, 'region');
        locationsMake(abroads, 'abroad');

        locationEvents();

    }).catch((Error) => {
        console.log(Error);
    });


    //f_region();
}

function popularLocationCheck(_locations) {
    let popularLocations = _locations.filter(location => {
        return location['l_popular_or_not'] == 'y';
    });
    return popularLocations;
}

function popularLocationListMake(_popularLists) {
    let fragment = document.createDocumentFragment();
    let tr;
    const popularLen = _popularLists.length;
    for (let i = 0; i < popularLen; i++) {

        if (i % 3 == 0) {
            tr = document.createElement('tr');
            fragment.appendChild(tr);
        }
        let td = document.createElement('td');
        td.classList.add('mm-popular-location-container', 'clickable');
        td.setAttribute('data-popularnum', _popularLists[i]['l_index']);
        let div = document.createElement('div');
        div.classList.add('mm-location-icon', `mm-popular-${_popularLists[i]['l_index']}`);
        td.appendChild(div);
        div = document.createElement('div'); //
        div.classList.add('mm-location-text');
        div.textContent = _popularLists[i]['l_subname'];
        td.appendChild(div);

        tr.appendChild(td);

    }

    document.getElementById('js_popular_location_list').appendChild(fragment);
}

function locationsSeparate(_locations, _airports, _ktxs, _srts, _buss, _regions, _abroads) {

    const locationsLen = _locations.length;
    for (let i = 0; i < locationsLen; i++) {
        if (_locations[i]['l_type'] == 'airport') {
            _airports.push(_locations[i]);
        }
        if (_locations[i]['l_type'] == 'ktx') {
            _ktxs.push(_locations[i]);
        }
        if (_locations[i]['l_type'] == 'srt') {
            _srts.push(_locations[i]);
        }
        if (_locations[i]['l_type'] == 'bus') {
            _buss.push(_locations[i]);
        }
        if (_locations[i]['l_type'] == 'region') {
            _regions.push(_locations[i]);
        }
        if (_locations[i]['l_type'] == 'abroad') {
            _abroads.push(_locations[i]);
        }
    }


}


export function locationsMake(_locationsArr, _location) {


    let fragment = document.createDocumentFragment();

    const locationsArrLen = _locationsArr.length;
    for (let i = 0; i < locationsArrLen; i++) {
        let div1 = document.createElement('div');
        div1.classList.add('mm-location-container');
        div1.setAttribute('locationnum', _locationsArr[i]['l_index']);
        div1.setAttribute('index', '9');
        let div2 = document.createElement('div');
        div2.classList.add('mm-location');
        div1.appendChild(div2);
        let span = document.createElement('span');
        span.classList.add('mm-location-name');
        span.textContent = _locationsArr[i]['l_name'];
        div2.appendChild(span);
        if (_locationsArr[i]['l_immediate_or_not'] == 'y') {
            let div3 = document.createElement('div');
            div3.classList.add('mm-location-badge', 'badge', 'badge-soft-primary', 'px-1');
            div3.textContent = '바로 예약 지역';
            div2.appendChild(div3);

        }

        fragment.appendChild(div1);
    }
    document.getElementById(`js_${_location}_location_list`).appendChild(fragment);
    console.log('욥' + document.getElementsByClassName("mm-location-container")[0].getAttribute('index'));

}


function locationEvents() {
    locationsEvent();
    locationsClickEvent();
}