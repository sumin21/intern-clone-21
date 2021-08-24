export function mobileFilterApply() {
    let applyBtn = document.getElementById('js_mobile_filter_apply_btn');

    applyBtn.addEventListener('click', function () {
        document.getElementById('js_filter_reset_btn').click(); //초기화

        document.getElementById('js_car_model_dropdown_btn').value = document.getElementById('js_car_model_dropdown_btn_mobile').value;
        document.getElementById('js_car_model_search_btn').click(); //모델명

        let checkedCarRanks = document.querySelectorAll('.mf-car-rank-check:checked');
        let checkedCarRanksLen = checkedCarRanks.length;
        for (let i = 0; i < checkedCarRanksLen; i++) {
            let rank = checkedCarRanks[i].dataset.rank;
            document.getElementById(`js_car_rank_${rank}`).click(); //차량등급
        }

        let checkedCarOils = document.querySelectorAll('.mf-car-oil-check:checked');
        let checkedCarOilsLen = checkedCarOils.length;
        for (let j = 0; j < checkedCarOilsLen; j++) {
            let oil = checkedCarOils[j].dataset.oil;
            document.getElementById(`js_car_oil_${oil}`).click(); //오일
        }

        let checkedDriverOld = document.getElementsByClassName('mf-driver-old-active')[0]; //보험나이
        let checkedDriverOldNoColor = document.getElementsByClassName('mf-driver-old-active-no-color')[0];
        let old = checkedDriverOld.dataset.old;
        document.getElementById(`js_driver_old_${old}`).click();

        if (checkedDriverOldNoColor) {
            document.getElementsByClassName('f-driver-old-active')[0].classList.add('f-driver-old-active-no-color');
        }
    });
}


export function mobileDriverOldClick() {
    let driverOlds = document.getElementsByClassName('mf-driver-old');
    let driverOldsLen = driverOlds.length;

    for (let k = 0; k < driverOldsLen; k++) {
        driverOlds[k].addEventListener('click', function () {
            let driverOldActive;
            let isExist = this.classList.contains("mf-driver-old-active");
            //선택 안되어 있을때만
            //선택된 element active로 (색 파란색)
            if (!isExist) {
                driverOldActive = document.getElementsByClassName("mf-driver-old-active");
                driverOldActive[0].classList.remove("mf-driver-old-active");
                this.classList.add("mf-driver-old-active");
            }
        });
    }
}
//초기화버튼 클릭이벤트
export function mobileFilterResetBtn() {
    document.getElementById('js_mobile_filter_reset_btn').addEventListener('click', function () {
        filterDriverOldCalculReset(); //import
        document.getElementById('js_driver_old_all_mobile').click();
        document.getElementById('js_car_model_dropdown_btn_mobile').value = null;

        let checkedCarRanks = document.querySelectorAll('.mf-car-rank-check:checked');
        let checkedCarRanksLen = checkedCarRanks.length;
        for (let i = 0; i < checkedCarRanksLen; i++) {
            checkedCarRanks[i].click();
        }

        let checkedCarOils = document.querySelectorAll('.mf-car-oil-check:checked');
        let checkedCarOilsLen = checkedCarOils.length;
        for (let j = 0; j < checkedCarOilsLen; j++) {
            checkedCarOils[j].click();
        }
    });
}


export function mobileCarRankAllClick() {
    let carRanks = document.getElementsByClassName('mf-car-rank-check');
    let carRanksLen = carRanks.length;

    for (let i = 0; i < carRanksLen; i++) {
        carRanks[i].addEventListener('click', function () {
            mobileCarRankAllClickEvent('rank', this);
        });
    }
}

export function mobileCarOilAllClick() {
    let carOils = document.getElementsByClassName('mf-car-oil-check');
    let carOilsLen = carOils.length;

    for (let i = 0; i < carOilsLen; i++) {
        carOils[i].addEventListener('click', function () {
            mobileCarRankAllClickEvent('oil', this);
        });
    }
}

//차량등급 전체클릭
function mobileCarRankAllClickEvent(_filterName, _rank) {
    let ranks = document.getElementsByClassName(`mf-car-${_filterName}-check`);
    let ranksLen = ranks.length;

    if (_rank.id == `js_car_${_filterName}_all_mobile`) {
        //전체 체크
        if (_rank.checked) {
            for (let q = 0; q < ranksLen; q++) {
                ranks[q].checked = true;
            }
        }
        //전체 취소
        else {
            for (let k = 0; k < ranksLen; k++) {
                ranks[k].checked = false;
            }
            return true;
        }
    } else if (document.getElementById(`js_car_${_filterName}_all_mobile`).checked) {
        document.getElementById(`js_car_${_filterName}_all_mobile`).checked = false;
    } else {
        if (document.querySelectorAll(`.mf-car-${_filterName}-check:checked`).length == ranksLen - 1) {
            document.getElementById(`js_car_${_filterName}_all_mobile`).click();
        }
    }
    return false;
}