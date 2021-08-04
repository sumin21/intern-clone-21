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

function ChangeAreaDomain(domain, name) {
    var isExist = domain.classList.contains("mm-active");
    //-선택 안되어 있을때만
    if (!isExist) {
        mm_active = document.getElementsByClassName("mm-active");
        value = mm_active[0].dataset.index;
        target = document.getElementsByClassName('js_domain_' + value);
        target[0].style.display = 'none';
        mm_active[0].classList.remove('mm-active');
        domain.classList.add('mm-active');
        document.getElementById("js_" + name + "_domain").style.display = "block";
        document.getElementById('js_my_location').style.display = 'none';
        if (name == 'popular') {
            document.getElementById('js_my_location').style.display = 'block';

        }
    }
}

//(메뉴 창) 장소 종류 클릭 이벤트
export function f_location_kinds() {

    popular.addEventListener('click', function () {
        ChangeAreaDomain(popular, 'popular');
    });

    airport.addEventListener('click', function () {
        ChangeAreaDomain(airport, 'airport');
    });

    ktx.addEventListener('click', function () {
        ChangeAreaDomain(ktx, 'ktx');
    });

    srt.addEventListener('click', function () {
        ChangeAreaDomain(srt, 'srt');
    });

    bus.addEventListener('click', function () {
        ChangeAreaDomain(bus, 'bus');
    });

    location.addEventListener('click', function () {
        ChangeAreaDomain(location, 'location');
    });

    foreign.addEventListener('click', function () {
        ChangeAreaDomain(foreign, 'foreign');
    });
}