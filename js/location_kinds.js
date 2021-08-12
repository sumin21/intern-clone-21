//(메뉴 창) 장소 종류 클릭 이벤트
export function locationKinds() {
    let locationKindBtns = document.getElementsByClassName('mm-modal-space-kinds-element');
    const locationKindBtnsLen = locationKindBtns.length;

    for (let i = 0; i < locationKindBtnsLen; i++) {
        locationKindBtns[i].addEventListener('click', function () {
            ChangeAreaDomain(this, this.id);
        })
    }
}

function ChangeAreaDomain(_domain, _name) {
    let active;
    let value;
    let target;
    let isExist = _domain.classList.contains("mm-active");
    //-선택 안되어 있을때만
    if (!isExist) {
        active = document.getElementsByClassName("mm-active");
        value = active[0].dataset.index;
        target = document.getElementsByClassName('js_domain_' + value);
        target[0].style.display = 'none';
        active[0].classList.remove('mm-active');
        _domain.classList.add('mm-active');
        document.getElementById(_name + "_domain").style.display = "block";
        document.getElementById('js_my_location').style.display = 'none';
        if (_name == 'js_popular') {
            document.getElementById('js_my_location').style.display = 'block';

        }
    }
}