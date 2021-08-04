import $ from "jquery";
var location_btn = document.getElementById("liveToastBtn");
var location_toasts = document.getElementById("js_location_toasts");
var liveToast = document.getElementById("js_location_toast");

export function f_my_location_toast() {


    location_btn.addEventListener('click', function () {
        $('.toast').toast('show');
    })

    liveToast.onmouseover = function () {
        liveToast.style.opacity = '1.0';
        liveToast.style.boxShadow = '0 0rem 1rem rgb(0,0,0)';

    };

    location_toasts.onmouseout = function () {
        liveToast.style.opacity = '0.8';
        liveToast.style.boxShadow = '0 0.25rem 0.75rem rgb(255, 255, 255 , 0.2)';

    };
}