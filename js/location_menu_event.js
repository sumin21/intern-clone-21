import $ from "jquery";
export function locationMenuEvent() {

    //메뉴 모달 닫힐때 다시 스크롤 가능하게
    $('#menuModal').on('hide.bs.modal', function () {
        document.getElementsByTagName('html')[0].classList.remove('no-scroll');
        document.getElementsByTagName('body')[0].classList.remove('no-scroll');
    });

    //메뉴 모달 열릴때마다 popular 보이게
    document.getElementById('js_menu_modal_open_btn').addEventListener('click', function () {
        document.getElementById("js_popular").click();
        document.getElementById("js_back_button").click();
    });
    document.getElementById('js_mobile_menu_modal_open_btn').addEventListener('click', function () {
        document.getElementById("js_popular").click();
        document.getElementById("js_back_button").click();
    });
}