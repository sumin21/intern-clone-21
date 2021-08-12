let mckCarKindsActive;
let mmtbCarKindsActive;


export function carTypeEvent() {
    let webCarTypes = document.getElementsByClassName('ck-c-type');
    let mobileCarTypes = document.getElementsByClassName('mtb-c-type');
    const webCarTypeLen = webCarTypes.length;
    const mobileCarTypeLen = mobileCarTypes.length;

    for (let i = 0; i < webCarTypeLen; i++) {
        webCarTypes[i].addEventListener('click', function () {
            CarKindsChangeAreaDomainWeb(this);
        });
    }
    for (let j = 0; j < mobileCarTypeLen; j++) {
        mobileCarTypes[j].addEventListener('click', function () {
            CarKindsChangeAreaDomainMobile(this);
        });
    }

}
//웹
function CarKindsChangeAreaDomainWeb(_ckCarKind) {
    let isExist = _ckCarKind.classList.contains("ck-car-kinds-active");
    //선택 안되어 있을때만
    //선택된 element active로 (색 파란색)
    if (!isExist) {
        mckCarKindsActive = document.getElementsByClassName("ck-car-kinds-active");
        mckCarKindsActive[0].classList.remove('ck-car-kinds-active');
        _ckCarKind.classList.add('ck-car-kinds-active');

        let mtbCarKind = document.getElementById(_ckCarKind.id + '_mobile');
        mmtbCarKindsActive = document.getElementsByClassName("mtb-car-kinds-active");
        mmtbCarKindsActive[0].classList.remove('mtb-car-kinds-active');
        mtbCarKind.classList.add('mtb-car-kinds-active');
    }
}
//모바일
function CarKindsChangeAreaDomainMobile(_mtbCarKind) {
    let isExist = _mtbCarKind.classList.contains("mtb-car-kinds-active");
    //선택 안되어 있을때만
    //선택된 element active로 (색 파란색)
    if (!isExist) {
        mmtbCarKindsActive = document.getElementsByClassName("mtb-car-kinds-active");
        mmtbCarKindsActive[0].classList.remove('mtb-car-kinds-active');
        _mtbCarKind.classList.add('mtb-car-kinds-active');

        let ckCarKindId = _mtbCarKind.id.replace('_mobile', '');
        console.log('ckCarKindId', ckCarKindId);

        let ckCarKind = document.getElementById(ckCarKindId);
        mckCarKindsActive = document.getElementsByClassName("ck-car-kinds-active");
        mckCarKindsActive[0].classList.remove('ck-car-kinds-active');
        ckCarKind.classList.add('ck-car-kinds-active');
    }
}