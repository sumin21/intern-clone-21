import axios from 'axios';
import {f_locations_event} from './locations_event.js';
import {f_locations_click_event} from './locations_event.js';
import {f_popular_locations_click_event} from './locations_event.js';

export function f_location_list(){
    axios.get("http://ec2-13-125-238-123.ap-northeast-2.compute.amazonaws.com:3000/locations").then((Response)=>{
            console.log(Response.data);
            const location_arr = Response.data;
            let airports = [];
            let ktxs = [];
            let srts = [];
            let buss = [];
            let regions = [];
            let abroads = [];
            //popular
            const popular_list_arr = f_popular_location_check(location_arr);
            f_popular_location_list_make(popular_list_arr);
            f_popular_locations_click_event();
            //일반지역
            f_locations_separate(location_arr, airports, ktxs, srts, buss, regions, abroads);
            console.log(airports, ktxs, srts, buss, regions, abroads);
            f_locations_make(airports,'airport');
            f_locations_make(ktxs,'ktx');
            f_locations_make(srts,'srt');
            f_locations_make(buss,'bus');
            f_locations_make(regions,'region');
            f_locations_make(abroads,'abroad');

            f_location_events();
            
        }).catch((Error)=>{
            console.log(Error);
        });
    

    //f_region();
}

function f_locations_separate(locations, airports, ktxs, srts, buss, regions, abroads){
    

    for(let i=0; i<locations.length; i++){
        if(locations[i]['l_type'] == 'airport'){
            airports.push(locations[i]);
        }
        if(locations[i]['l_type'] == 'ktx'){
            ktxs.push(locations[i]);
        }
        if(locations[i]['l_type'] == 'srt'){
            srts.push(locations[i]);
        }
        if(locations[i]['l_type'] == 'bus'){
            buss.push(locations[i]);
        }
        if(locations[i]['l_type'] == 'region'){
            regions.push(locations[i]);
        }
        if(locations[i]['l_type'] == 'abroad'){
            abroads.push(locations[i]);
        }
    }

    
}


export function f_locations_make(locations_arr, location){
    

    let fragment = document.createDocumentFragment();

    for(let i=0; i<locations_arr.length; i++){
        var div_e1 = document.createElement('div');
        div_e1.classList.add('mm-location-container');
        div_e1.setAttribute('locationnum',locations_arr[i]['l_index']);
        div_e1.setAttribute('index','9');
        var div_e2 = document.createElement('div');
        div_e2.classList.add('mm-location');
        div_e1.appendChild(div_e2);
        var span_e = document.createElement('span');
        span_e.classList.add('mm-location-name');
        span_e.textContent = locations_arr[i]['l_name'];
        div_e2.appendChild(span_e);
        if(locations_arr[i]['l_immediate_or_not'] == 'y'){
            var div_e3 = document.createElement('div');
            div_e3.classList.add('mm-location-badge', 'badge', 'badge-soft-primary', 'px-1');
            div_e3.textContent = '바로 예약 지역';
            div_e2.appendChild(div_e3);
            
        }
        
        fragment.appendChild(div_e1);
    }
    document.getElementById(`js_${location}_location_list`).appendChild(fragment);
    console.log('욥'+document.getElementsByClassName("mm-location-container")[0].getAttribute('index'));
    
}


function f_location_events(){
    f_locations_event();
    f_locations_click_event();
}



function f_popular_location_check(locations){
    let popular_locations = [];
    for(let i=0; i<locations.length; i++){
        if(locations[i]['l_popular_or_not'] == 'y'){
            popular_locations.push(locations[i]);
        }
    }
    
    return popular_locations;
}
function f_popular_location_list_make(popular_list_arr){
    let fragment = document.createDocumentFragment();

    for(let i=0; i<popular_list_arr.length; i++){
        if(i%3 == 0){
            var tr_e = document.createElement('tr');
            fragment.appendChild(tr_e);
        }
        var td_e = document.createElement('td');
        td_e.classList.add('mm-popular-location-container', 'clickable');
        td_e.setAttribute('data-popularnum', popular_list_arr[i]['l_index']);
        var div_e = document.createElement('div');
        div_e.classList.add('mm-location-icon', `mm-popular-${popular_list_arr[i]['l_index']}`);
        td_e.appendChild(div_e);
        div_e = document.createElement('div');//
        div_e.classList.add('mm-location-text');
        div_e.textContent = popular_list_arr[i]['l_subname'];
        td_e.appendChild(div_e);

        tr_e.appendChild(td_e);
        
    }
    
    document.getElementById('js_popular_location_list').appendChild(fragment);
}