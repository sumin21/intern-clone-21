import $ from "jquery";
import 'bootstrap';
import {sum} from './hello.js';
import {f_drow_calendar} from './drow_calendar.js';
import {f_calendar_event} from './event_calendar.js';
import '../scss/style.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import timeicon from '../icon/time-icon.png';




import png from '../caricon/car.png';
import { Modal } from 'bootstrap';
import { data } from "autoprefixer";


f_drow_calendar();
f_calendar_event();

sum();
//document.
//캘린더
//-----
// //캘린더
// f_calendar();
// //캘린더 이벤트 (비동기 함수?)
// var js_test = document.getElementById("js_test");
// console.log(js_test);

// const cm_days = document.getElementsByClassName("cm-day");
// //여기부터 혀 id 넣는건 성공
// //스타일 바꿔
// //중복 안되게 삭제하는것도!


// // let fragment = document.createDocumentFragment();
    
// //         appendTd(fragment, 'sss');
    

// //     document.getElementById('test').appendChild(fragment);


// // function appendTd(_fragment, str) {
// //     let tdElmt = document.createElement('td');
// //     tdElmt.classList.add('aaa', 'bbb');
// //     let daySpan = document.createElement('span');
// //     daySpan.innerHTML = str;
// //     daySpan.dataset.date = str;

// //     tdElmt.appendChild(daySpan);
// //     _fragment.appendChild(tdElmt);

// // }


// for(var i=0; i<cm_days.length; i++){
//     var cm_day = cm_days.item(i);
//     cm_day.addEventListener('click',function(){
//         //let startDate = new Date(this.dataset.date);




//         //두번째
//         if(document.getElementById('js_click_date1')){
//             //뒷날짜 여야함
//             if(document.getElementById('js_click_date1') != this){

//                 if(document.getElementById('js_click_date2')){
//                     console.log(document.getElementById('js_click_date2'));
//                     document.getElementById('js_click_date1').removeAttribute('id');
//                     document.getElementById('js_click_date2').removeAttribute('id');
//                     this.id = 'js_click_date1';
//                     this.classList.add('cm-active-date');
//                     f_15_remove();//지우기
//                     f_15_check(this);//추가
//                     $(".cm-half-circle-start").remove();
//                     $(".cm-half-circle-end").remove();
//                     $(".cm-rect").remove();
//                     f_blue_circle();
//                 }
//                 else if(this.dataset.dateindex > document.getElementById('js_click_date1').dataset.dateindex){//뒷날짜클릭
//                     this.id = 'js_click_date2';
//                     f_blue_circle();
//                 }
//                 else if(this.dataset.dateindex < document.getElementById('js_click_date1').dataset.dateindex){//앞날짜클릭
//                     document.getElementById('js_click_date1').removeAttribute('id');
//                     this.id = 'js_click_date1';
//                     f_15_remove();//지우기
//                     f_15_check(this);//추가
//                     $(".cm-circle").remove();
//                     f_blue_circle();
//                 }
//             }
        
//         }//첫번째
//         else{
            
//             this.id = 'js_click_date1';
            
//             //+15일
//             //this.
//             console.log(this.dataset.date);
//             f_15_check(this);
//             f_blue_circle();

//         }
        
//     });
// }

// //----15일 체크
// function f_15_check(start_check_date){
//     for(var i=0; i<15; i++){
//         var ind = start_check_date.dataset.dateindex;
//         ind *= 1;
//         var check_index = i+ind;
//         console.log(check_index);
//         var possibles = document.getElementsByClassName(`i_${check_index}`)[0];
//         console.log(possibles);
        
        
//         possibles.innerHTML += `<div class="cm-active-child cm-rent-possible-bg"></div>`;
        
//     }
// }

// function f_15_remove(){
//     var cm_rent_possible_bg = document.getElementsByClassName("cm-rent-possible-bg");

//     for(var k=0; k<cm_rent_possible_bg.length; k++){
//         // var rent_possible_bg_element = rent_possible_bg.item(k)	//제거하고자 하는 엘리먼트
//         // rent_possible_bg_element.parentNode.removeChild(rent_possible_bg_element);
//         $(".cm-rent-possible-bg").remove(); //js로 찾아보기!
//         //console.log(rent_possible_bg_element.parentNode);

//     }
// }

// //선택 날짜 푸른색 동그라미
// function f_blue_circle(){
//     if(!document.getElementById('js_click_date2')){
//         document.getElementById('js_click_date1').innerHTML += `<div class="cm-active-child cm-circle"></div>`;
//         document.getElementById('js_click_date1').classList.add('cm-active-date');
//     }
//     else if(document.getElementById('js_click_date2')){
//         $(".cm-circle").remove();
//         document.getElementById('js_click_date1').innerHTML += `<div class="cm-active-child cm-half-circle-start"></div>`;
//         document.getElementById('js_click_date2').innerHTML += `<div class="cm-active-child cm-half-circle-end"></div>`;
//         var a = document.getElementById('js_click_date1').dataset.dateindex;
//         a *= 1;
//         var b = document.getElementById('js_click_date2').dataset.dateindex;

//         b *= 1;
//         console.log(b-a);
//         for(var c=a+1; c<b; c++){
//             var checked = document.getElementsByClassName(`i_${c}`)[0];
//             checked.innerHTML += `<div class="cm-active-child cm-rect></div>`;
//             console.log('1111' + checked.innerHTML);

//         }
//         document.getElementById('js_click_date2').classList.add('cm-active-date');
//     }

// }












// function f_15_check(start_check_date){//선택자로
//     const dates = document.getElementsByClassName("dates");
    
//     for(var i=0; i<15; i++){
//         for(var j=0; j<dates.length; j++){
//         var date = dates.item(j);
//         if(date.dataset.date == start_check_date.dataset.date+i){
//             var date_innerhtml = date.innerHTML;
//             date.innerHTML = `<span>${date_innerhtml}`
//         }
//     }
// }
//------
// function f_check_date(){
//     var js_click_date1 = document.getElementById('js_click_date1');
//     var js_click_date2 = document.getElementById('js_click_date2');

//     if(js_click_date2){//2있다면

//     }
//     else{//2없다면
//         var js_click_date1_date  = js_click_date1.innerHTML;
//         console.log(js_click_date1_date);
//         js_click_date1.innerHTML = `<span>${js_click_date1_date}</span><div class="active-child
//     }

// }


//---------------------

var popular = document.getElementById("js_popular_title");
var airport = document.getElementById("js_airport_title");
var ktx = document.getElementById("js_ktx_title");
var srt = document.getElementById("js_srt_title");
var bus = document.getElementById("js_bus_title");
var location = document.getElementById("js_location_title");
var foreign = document.getElementById("js_foreign_title");

//global?
var mm_active;
var value;
var target;

function ChangeAreaDomain(domain,name){
    var isExist = domain.classList.contains("mm-active");
    //-선택 안되어 있을때만
    if(!isExist){
        mm_active = document.getElementsByClassName("mm-active");
        value = mm_active[0].dataset.index;
        target = document.getElementsByClassName('js_domain_'+value);
        target[0].style.display = 'none';
        mm_active[0].classList.remove('mm-active');
        domain.classList.add('mm-active');
        document.getElementById("js_" + name + "_domain").style.display = "block";
        document.getElementById('js_my_location').style.display = 'none';
        if(name == 'popular'){
            document.getElementById('js_my_location').style.display = 'block';

        }
    }
}
popular.addEventListener('click', function(){
    ChangeAreaDomain(popular, 'popular');
});

airport.addEventListener('click', function(){
    ChangeAreaDomain(airport, 'airport');
});

ktx.addEventListener('click', function(){
    ChangeAreaDomain(ktx, 'ktx');
});

srt.addEventListener('click', function(){
    ChangeAreaDomain(srt, 'srt');
});

bus.addEventListener('click', function(){
    ChangeAreaDomain(bus, 'bus');
});

location.addEventListener('click', function(){
    ChangeAreaDomain(location, 'location');
});

foreign.addEventListener('click', function(){
    ChangeAreaDomain(foreign, 'foreign');
});


var search_bar = document.getElementById("js_search_bar");
var space_kinds = document.getElementById("js_space_kinds_display");
var space_lists = document.getElementById("js_space_lists");
var search_domain = document.getElementById("js_search_domain");
var back_button = document.getElementById("js_back_button");

var menuModal = document.getElementById("menuModal");


//기록삭제 버튼
var js_all_delete_open_btn = document.getElementById("js_all_delete_open_btn");
var js_recent_search_no_text = document.getElementById("js_recent_search_no_text");
//검색바 클릭
search_bar.addEventListener('click', function(){
    var search_record_num = document.getElementsByClassName("mm-location-delete-button").length;
    console.log(search_record_num);
    if(search_record_num){
        js_all_delete_open_btn.style.display = 'block';
        js_recent_search_no_text.style.display = 'none';
    }
    else{
        js_all_delete_open_btn.style.display = 'none';
        js_recent_search_no_text.style.display = 'block';

    }
    space_kinds.style.display = 'none';
    space_lists.style.display = 'none';
    search_domain.style.display = 'block';
    back_button.style.display = 'block';
    mm_active = document.getElementsByClassName("mm-active");
    value = mm_active[0].dataset.index;
    if(value == 1){
        document.getElementById('js_my_location').style.display = 'none';
    }
    
});

back_button.addEventListener('click',function(){
    space_kinds.style.display = 'block';
    space_lists.style.display = 'block';
    search_domain.style.display = 'none';
    back_button.style.display = 'none';
    mm_active = document.getElementsByClassName("mm-active");
    value = mm_active[0].dataset.index;
    if(value == 1){
        document.getElementById('js_my_location').style.display = 'block';
    }
});

var mm_delete_btns = document.getElementsByClassName("mm-location-delete-button");

for(var i=0; i<mm_delete_btns.length; i++){
    var mm_delete_btn = mm_delete_btns.item(i);
    mm_delete_btn.addEventListener('click',function(){
        var parent = this.parentNode;
        var real_parent = parent.parentNode;
        real_parent.parentNode.removeChild(real_parent);
    });
}

//기록 전체 삭제
var all_delete_btn = document.getElementById("js_all_delete_close_btn");
var mm_delete_elements = document.getElementsByClassName("mm-location-delete-button");

function delete_all_f(delete_element) {
    var p = delete_element.parentNode;
    var real_p = p.parentNode;
    //console.log(real_p);
    real_p.parentNode.removeChild(real_p);
}

var all_remove_modal = document.getElementById("allremoveModal");
var js_all_delete_cancel_btn1 = document.getElementById("js_all_delete_cancel_btn1");
var js_all_delete_cancel_btn2 = document.getElementById("js_all_delete_cancel_btn2");

js_all_delete_cancel_btn1.addEventListener('click',function(){
    $('html, body').addClass('no-scroll');
})
js_all_delete_cancel_btn2.addEventListener('click',function(){
    $('html, body').addClass('no-scroll');
})
all_delete_btn.addEventListener('click',function(){//삭제
    console.log(all_remove_modal);
    
    
    const k = mm_delete_elements.length;
    for(var j=0; j<k; j++){
        
        delete_all_f(mm_delete_elements[0]);
        
    }

    $('#allremoveModal').modal('hide');
    //body 스크롤 안되게
    $('html, body').addClass('no-scroll');
    

    var mm_search_record_num = document.getElementsByClassName("mm-location-delete-button").length;
    console.log(mm_search_record_num);
    if(mm_search_record_num){
        js_all_delete_open_btn.style.display = 'block';
        js_recent_search_no_text.style.display = 'none';
    }
    else{
        js_all_delete_open_btn.style.display = 'none';
        js_recent_search_no_text.style.display = 'block';

    }
});
//menu모달 닫힐때 다시 스크롤 가능하게
$('#menuModal').on('hide.bs.modal', function () {
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.getElementsByTagName('body')[0].classList.remove('no-scroll');
});

//메뉴 모달 열릴때마다 popular 보이게
document.getElementById('js_menu_modal_open_btn').addEventListener('click', function(){
    popular.click();
    back_button.click();
})


js_all_delete_open_btn.addEventListener('click',function(){//기록삭제
    all_remove_modal.style.display = 'block';
    all_remove_modal.setAttribute('aria-hidden', 'true');
    all_remove_modal.setAttribute('aria-modal', 'true');
    all_remove_modal.classList.remove("show");
    console.log(all_remove_modal);
    //all_remove_modal.style.display = 'block';
    //all_remove_modal.style.display = 'none';
    console.log(all_remove_modal);
    
    
});

//list에 커서 올리고 있을 때 색 변경

var mm_location_lists = document.getElementsByClassName("mm-location-container");

for(var i=0; i<mm_location_lists.length; i++){
    var mm_location_list = mm_location_lists.item(i);
    
    mm_location_list.onmouseover = function () {
        this.style.backgroundColor= '#eef7ff';
    };
    mm_location_list.onmouseout = function () {
        this.style.backgroundColor= 'white';
    };
}

var location_btn = document.getElementById("liveToastBtn");
var location_toasts = document.getElementById("js_location_toasts");
var liveToast = document.getElementById("js_location_toast");

location_btn.addEventListener('click', function() {
    $('.toast').toast('show');
})

liveToast.onmouseover = function () {
    liveToast.style.opacity = '1.0';
    liveToast.style.boxShadow = '0 0rem 1rem rgb(0,0,0)';
    
    // if(liveToast.getAttribute('data-autohide')){
    //     return;
    // }
    // liveToast.setAttribute('data-autohide', "false");
    // console.log(liveToast.getAttribute('data-autohide'));
    

    
};

location_toasts.onmouseout = function () {
    liveToast.style.opacity = '0.8';
    liveToast.style.boxShadow = '0 0.25rem 0.75rem rgb(255, 255, 255 , 0.2)';
    // liveToast.classList.add('hide');
    // liveToast.removeAttribute('data-autohide');
};

//shadow p-3 mb-5

//check-box 클릭

var js_car_kinds_list = document.getElementById('js_car_kinds_list');
var js_popularity = document.getElementById('js_popularity');
var js_price = document.getElementById('js_price');

var crt_check_box_active;

function CheckChangeAreaDomain(crt_check_element){
    var isExist = crt_check_element.classList.contains("crt-check-box-active");
    console.log(isExist);
    //선택 안되어 있을때만
    //선택된 element active로 (색 파란색)
    if(!isExist){
        crt_check_box_active = document.getElementsByClassName("crt-check-box-active");
        crt_check_box_active[0].classList.remove("crt-check-box-active");
        crt_check_element.classList.add("crt-check-box-active");
    }
}

js_car_kinds_list.addEventListener('click', function(){
    CheckChangeAreaDomain(js_car_kinds_list);
});
js_popularity.addEventListener('click', function(){
    CheckChangeAreaDomain(js_popularity);
});
js_price.addEventListener('click', function(){
    CheckChangeAreaDomain(js_price);
});

//차종 선택


var js_all_car = document.getElementById('js_all_car');
var js_electronic_car = document.getElementById('js_electronic_car');
var js_small_car = document.getElementById('js_small_car');
var js_normal_car = document.getElementById('js_normal_car');
var js_big_car = document.getElementById('js_big_car');
var js_suv_car = document.getElementById('js_suv_car');
var js_rv_car = document.getElementById('js_rv_car');
var js_foreign_car = document.getElementById('js_foreign_car');

var ck_car_kinds_active;

function CarKindsChangeAreaDomain(ck_car_kinds_element){
    var isExist = ck_car_kinds_element.classList.contains("ck-car-kinds-active");
    //선택 안되어 있을때만
    //선택된 element active로 (색 파란색)
    if(!isExist){
        ck_car_kinds_active = document.getElementsByClassName("ck-car-kinds-active");
        ck_car_kinds_active[0].classList.remove('ck-car-kinds-active');
        ck_car_kinds_element.classList.add('ck-car-kinds-active');
    }
}
js_all_car.addEventListener('click', function(){
    CarKindsChangeAreaDomain(js_all_car);
});
js_electronic_car.addEventListener('click', function(){
    CarKindsChangeAreaDomain(js_electronic_car);
});
js_small_car.addEventListener('click', function(){
    CarKindsChangeAreaDomain(js_small_car);
});
js_normal_car.addEventListener('click', function(){
    CarKindsChangeAreaDomain(js_normal_car);
});
js_big_car.addEventListener('click', function(){
    CarKindsChangeAreaDomain(js_big_car);
});
js_suv_car.addEventListener('click', function(){
    CarKindsChangeAreaDomain(js_suv_car);
});
js_rv_car.addEventListener('click', function(){
    CarKindsChangeAreaDomain(js_rv_car);
});
js_foreign_car.addEventListener('click', function(){
    CarKindsChangeAreaDomain(js_foreign_car);
});