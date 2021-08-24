import $ from "jquery";

let mlocationBtn = document.getElementById("liveToastBtn");

export function myLocationClick() {
    mlocationBtn.addEventListener('click', function () {
        $('#js_location_toast').toast('show');
    });
}