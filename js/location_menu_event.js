import $ from "jquery";
export function f_location_menu_event() {


    //메뉴 모달 닫힐때 다시 스크롤 가능하게
    $('#menuModal').on('hide.bs.modal', function () {
        document.getElementsByTagName('html')[0].classList.remove('no-scroll');
        document.getElementsByTagName('body')[0].classList.remove('no-scroll');
    });

    //메뉴 모달 열릴때마다 popular 보이게
    document.getElementById('js_menu_modal_open_btn').addEventListener('click', function () {
        document.getElementById("js_popular_title").click();
        document.getElementById("js_back_button").click();
    })
}