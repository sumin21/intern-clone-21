import $ from "jquery";
import {f_car_list_condition} from './car_list_condition.js';


// const location_arr = ['인천국제공항','제주국제공항','강릉역','서울역','부산역','수서역','광주송정역','부산역','광양시외버스터미널','순천종합버스터미널','여수종합버스터미널','울릉도','서울','캠핑카','미국(괌)','미국(사이판)','김포국제공항','수원역'];
export function f_locations_event(){
    
    
    //list에 커서 올리고 있을 때 색 변경
    console.log('요오오오');
    const mm_location_lists = document.getElementsByClassName("mm-location-container");
    const mm_location_result_lists = document.getElementsByClassName("mm-location-result-container");
    console.log('요오오'+mm_location_lists[0].getAttribute('locationnum'));
    for(var i=0; i<mm_location_lists.length; i++){
        var mm_location_list = mm_location_lists.item(i);
        
        mm_location_list.onmouseover = function () {
            this.style.backgroundColor= '#eef7ff';
        };
        mm_location_list.onmouseout = function () {
            this.style.backgroundColor= 'white';
        };
    }
    for(var j=0; j<mm_location_result_lists.length; j++){
        var mm_location_result_list = mm_location_result_lists.item(j);
        
        mm_location_result_list.onmouseover = function () {
            this.style.backgroundColor= '#eef7ff';
        };
        mm_location_result_list.onmouseout = function () {
            this.style.backgroundColor= 'white';
        };
    }
    
    
}

export function f_locations_click_event(){
    const locations = document.getElementsByClassName('mm-location-container');
    //console.log(locations);
    

    for(let i=0; i<locations.length; i++){
        var location = locations.item(i);
        //console.log('요오?' + location[0]);
        console.log('야'+locations[i].getAttribute('locationnum'));

        location.addEventListener('click',function(){
            
            console.log('야'+'locations[i].firstChild.firstChild.innerHTML');
            document.getElementById('js_menu_bar_text').innerHTML = locations[i].firstChild.firstChild.innerHTML;
            f_car_list_condition(0,0,document.getElementById('js_menu_bar_text').innerHTML,0,0,0,0,0);
            $('#menuModal').modal('hide');

        });
    }

}

const popular_location_num = {
    1 : '인천국제공항',
    2 : '제주국제공항',
    3 : '강릉역',
    5 : '부산역',
    7 : '광주송정역',
    12 : '울릉도',
    13 : '서울',
    14 : '캠핑카',
    15 : '미국(괌)',
    16 : '미국(사이판)',
    17 : '김포국제공항',
    18: '수원역'
}

export function f_popular_locations_click_event(){

    const popular_locations = document.getElementsByClassName("mm-popular-location-container");

    
    for(let j=0; j<popular_locations.length; j++){
        var popular_location = popular_locations.item(j);
        console.log('요오?!!' + popular_locations[j]);

        popular_location.addEventListener('click',function(){
            
            console.log('야'+popular_locations[j].getAttribute('data-popularnum'));
            document.getElementById('js_menu_bar_text').innerHTML = popular_location_num[popular_locations[j].getAttribute('data-popularnum')];
            
            f_car_list_condition(0,0,document.getElementById('js_menu_bar_text').innerHTML,0,0,0,0,0);
            //f_car_list_condition()
            $('#menuModal').modal('hide');

        });
    }
}

