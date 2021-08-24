export function driverOldClick(_driverOld) {
    let driverOldActive;
    let isExist = _driverOld.classList.contains("f-driver-old-active");
    //선택 안되어 있을때만
    //선택된 element active로 (색 파란색)
    if (!isExist) {
        driverOldActive = document.getElementsByClassName("f-driver-old-active");
        driverOldActive[0].classList.remove("f-driver-old-active");
        _driverOld.classList.add("f-driver-old-active");
    }
}