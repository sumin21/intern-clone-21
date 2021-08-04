import axios from 'axios';
import {f_locations_make} from './location_list.js'
import {f_locations_event} from './locations_event.js';
import {f_locations_click_event} from './locations_event.js';

var search_bar = document.getElementById("js_search_bar");
var space_kinds = document.getElementById("js_space_kinds_display");
var space_lists = document.getElementById("js_space_lists");
var search_domain = document.getElementById("js_search_domain");
var search_result_domain = document.getElementById("js_search_result_domain");
var back_button = document.getElementById("js_back_button");

var js_all_delete_modal_open_btn = document.getElementById("js_all_delete_modal_open_btn");
var js_recent_search_no_text = document.getElementById("js_recent_search_no_text");

var mm_active;
var value;


//검색바 클릭
export function f_location_search_bar_click(){
    

    search_bar.addEventListener('click', function(){
        var search_record_num = document.getElementsByClassName("mm-location-delete-button").length;
        console.log(search_record_num);
        if(search_record_num){
            js_all_delete_modal_open_btn.style.display = 'block';
            js_recent_search_no_text.style.display = 'none';
        }
        else{
            js_all_delete_modal_open_btn.style.display = 'none';
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

        if(search_bar.value){
            search_domain.style.display = 'none';
            search_result_domain.style.display = 'block';
        }
        
    });
}

//검색 기능
export function f_location_search_bar_search(){
    search_bar.addEventListener('keyup', function(){
        
        let value;
        while(document.getElementById(`js_search_location_list`).hasChildNodes()) { 
            document.getElementById(`js_search_location_list`).removeChild( document.getElementById(`js_search_location_list`).firstChild ); 
    
        }
        value = search_bar.value;

        if(value){
            search_domain.style.display = 'none';
            search_result_domain.style.display = 'block';
            
            axios.get("http://ec2-13-125-238-123.ap-northeast-2.compute.amazonaws.com:3000/search_location",{
                params: {
                    searchWord : value
                }}).then((Response)=>{
                    console.log('clear location search!!!');
                    console.log(Response.data);
                    const search_locations = Response.data;
                    while(document.getElementById(`js_search_location_list`).hasChildNodes()) { 
                        document.getElementById(`js_search_location_list`).removeChild( document.getElementById(`js_search_location_list`).firstChild ); 
                    }
                    f_locations_make(search_locations, 'search');
                    f_locations_event();
                    f_locations_click_event();
                }).catch((Error)=>{
                    console.log(Error);
                });
        }
        
        else{
            search_domain.style.display = 'block';
            search_result_domain.style.display = 'none';
        }
    
    });
}
