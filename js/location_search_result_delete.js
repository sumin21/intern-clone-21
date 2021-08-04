import $ from "jquery";
var mm_delete_btns = document.getElementsByClassName("mm-location-delete-button");

export function f_location_search_result_delete(){
    //기록 삭제
    for(var i=0; i<mm_delete_btns.length; i++){
        var mm_delete_btn = mm_delete_btns.item(i);
        mm_delete_btn.addEventListener('click',function(){
            var parent = this.parentNode;
            var real_parent = parent.parentNode;
            real_parent.parentNode.removeChild(real_parent);
        });
    }
}


//기록 전체 삭제 버튼
var js_all_delete_modal_open_btn = document.getElementById("js_all_delete_modal_open_btn");
var js_recent_search_no_text = document.getElementById("js_recent_search_no_text");
var all_delete_btn = document.getElementById("js_all_delete_close_btn");
var all_remove_modal = document.getElementById("allremoveModal");

//기록 전체 삭제 함수
function delete_all_f(delete_element) {
    var p = delete_element.parentNode;
    var real_p = p.parentNode;
    //console.log(real_p);
    real_p.parentNode.removeChild(real_p);
}



var js_all_delete_cancel_btn1 = document.getElementById("js_all_delete_cancel_btn1");
var js_all_delete_cancel_btn2 = document.getElementById("js_all_delete_cancel_btn2");

export function f_location_search_result_all_delete(){


    js_all_delete_modal_open_btn.addEventListener('click',function(){//기록삭제
        all_remove_modal.style.display = 'block';
        all_remove_modal.setAttribute('aria-hidden', 'true');
        all_remove_modal.setAttribute('aria-modal', 'true');
        all_remove_modal.classList.remove("show");
        console.log(all_remove_modal);
        //all_remove_modal.style.display = 'block';
        //all_remove_modal.style.display = 'none';
        console.log(all_remove_modal);
        
        
    });

    //모달 닫힐때 이벤트
    $('#allremoveModal').on('hidden.bs.modal', function () {
        $('html, body').addClass('no-scroll');
    });


    js_all_delete_cancel_btn1.addEventListener('click',function(){
        $('#allremoveModal').modal('hide');
    })
    js_all_delete_cancel_btn2.addEventListener('click',function(){
        $('#allremoveModal').modal('hide');
    })

    //기록 전체 삭제
    all_delete_btn.addEventListener('click',function(){//삭제
        console.log(all_remove_modal);
        
        
        const k = mm_delete_btns.length;
        for(var j=0; j<k; j++){
            
            delete_all_f(mm_delete_btns[0]);
            
        }

        $('#allremoveModal').modal('hide');
        //body 스크롤 안되게
        //$('html, body').addClass('no-scroll');
        

        var mm_search_record_num = document.getElementsByClassName("mm-location-delete-button").length;
        console.log(mm_search_record_num);
        if(mm_search_record_num){
            js_all_delete_modal_open_btn.style.display = 'block';
            js_recent_search_no_text.style.display = 'none';
        }
        else{
            js_all_delete_modal_open_btn.style.display = 'none';
            js_recent_search_no_text.style.display = 'block';

        }
    });
}


