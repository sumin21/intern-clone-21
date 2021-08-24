let mcrtCheckActive;
let mmtbCheckActive;

export function checkBoxClick() {
    let webSortTypes = document.getElementsByClassName('crt-sort-type');
    let mobileSortTypes = document.getElementsByClassName('mtb-sort-type');
    const webSortTypeLen = webSortTypes.length;
    const mobileSortTypeLen = mobileSortTypes.length;

    //웹
    for (let i = 0; i < webSortTypeLen; i++) {
        webSortTypes[i].addEventListener('click', function () {
            checkChangeAreaDomainWeb(this);
        })
    }
    //모바일
    for (let j = 0; j < mobileSortTypeLen; j++) {
        mobileSortTypes[j].addEventListener('click', function () {
            checkChangeAreaDomainMobile(this);
        })
    }

}

//웹 (여기부터 혀 웹/모바일 방식 달라서 좀 다르게)
function checkChangeAreaDomainWeb(_crtCheck) {
    let isExist = _crtCheck.classList.contains("crt-check-box-active");
    console.log(isExist);
    //선택 안되어 있을때만
    //선택된 element active로 (색 파란색)
    if (!isExist) {
        mcrtCheckActive = document.getElementsByClassName("crt-check-box-active");
        mcrtCheckActive[0].classList.remove("crt-check-box-active");
        _crtCheck.classList.add("crt-check-box-active");

        let mtbCheck = document.getElementById(_crtCheck.id + '_mobile');
        mmtbCheckActive = document.getElementsByClassName("mtb-dropdown-active");
        mmtbCheckActive[0].classList.remove("mtb-dropdown-active");
        mtbCheck.classList.add("mtb-dropdown-active");

        document.getElementById('js_mobile_dropdown_title').textContent = mtbCheck.textContent;
    }
}
//모바일
function checkChangeAreaDomainMobile(_mtbCheck) {
    let isExist = _mtbCheck.classList.contains("mtb-dropdown-active");
    console.log(isExist);
    //선택 안되어 있을때만
    //선택된 element active로 (색 파란색)
    if (!isExist) {
        mmtbCheckActive = document.getElementsByClassName("mtb-dropdown-active");
        mmtbCheckActive[0].classList.remove("mtb-dropdown-active");
        _mtbCheck.classList.add("mtb-dropdown-active");

        let crtCheckId = _mtbCheck.id.replace('_mobile', '');
        console.log('crtCheckId', crtCheckId);

        let crtCheck = document.getElementById(crtCheckId);
        mcrtCheckActive = document.getElementsByClassName("crt-check-box-active");
        mcrtCheckActive[0].classList.remove("crt-check-box-active");
        crtCheck.classList.add("crt-check-box-active");

        document.getElementById('js_mobile_dropdown_title').textContent = _mtbCheck.textContent;
    }
}