var space_kinds = document.getElementById("js_space_kinds_display");
var space_lists = document.getElementById("js_space_lists");
var search_domain = document.getElementById("js_search_domain");
var back_button = document.getElementById("js_back_button");
var search_result_domain = document.getElementById("js_search_result_domain");
var value;
var mm_active;
export function f_location_search_back_btn_click(){


    back_button.addEventListener('click',function(){
        space_kinds.style.display = 'block';
        space_lists.style.display = 'block';
        search_domain.style.display = 'none';
        back_button.style.display = 'none';
        search_result_domain.style.display = 'none';
        mm_active = document.getElementsByClassName("mm-active");
        value = mm_active[0].dataset.index;
        if(value == 1){
            document.getElementById('js_my_location').style.display = 'block';
        }

    });
}