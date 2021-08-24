let mfilterApplyOld;

export function filterDriverOldCalcul() {
    let btn = document.getElementById('js_driver_old_calcul_btn');
    btn.addEventListener('click', function () {
        document.getElementById('js_driver_old_calcul').style.display = 'block';
        document.getElementById('js_driver_old_calcul_mobile').style.display = 'block';
        this.style.display = 'none';
        document.getElementById('js_driver_old_calcul_btn_mobile').style.display = 'none';
    });
    //모바일
    let mobileBtn = document.getElementById('js_driver_old_calcul_btn_mobile');
    mobileBtn.addEventListener('click', function () {
        document.getElementById('js_driver_old_calcul').style.display = 'block';
        document.getElementById('js_driver_old_calcul_mobile').style.display = 'block';
        this.style.display = 'none';
        document.getElementById('js_driver_old_calcul_btn').style.display = 'none';
    });

    filterDriverOldCalculInput();

}

export function filterDriverOldCalculStartDate() {
    let start_date = document.getElementById('js_rent_start_date_text1').dataset.startdate;
    let start_date_str = dateStrChange(start_date);
    document.getElementById('js_driver_old_calcul_start_date').textContent = start_date_str;
    document.getElementById('js_driver_old_calcul_start_date_mobile').textContent = start_date_str;
}

function dateStrChange(_str) {
    let str = _str === null ? [] : _str;
    let arr = str.split('/');
    let newArr = arr.map(x => Number(x));
    return newArr[0] + '년 ' + newArr[1] + '월 ' + newArr[2] + '일';
}

function filterDriverOldCalculInput() {
    let input = document.getElementById('js_driver_old_calcul_input');
    input.addEventListener('keyup', function () {
        filterDriverOldCalculInputWebMobile(this);

    });

    let inputMobile = document.getElementById('js_driver_old_calcul_input_mobile');
    inputMobile.addEventListener('keyup', function () {
        filterDriverOldCalculInputWebMobile(this);

    });
}

function filterDriverOldCalculInputWebMobile(_this) {
    let value = _this.value;

    document.getElementsByClassName("f-driver-old-active")[0].classList.remove('f-driver-old-active-no-color');
    document.getElementsByClassName("mf-driver-old-active")[0].classList.remove('mf-driver-old-active-no-color');

    if (value) {
        filterDriverOldCalculInputErr();
        if (value.length < 6) {
            console.log('no');
            document.getElementById('js_driver_old_calcul_input_err_text').style.display = 'block';
            document.getElementById('js_driver_old_calcul_input_err_text').textContent = '생년월 6자리를 다 입력해주세요';
            document.getElementById('js_driver_old_calcul_input_err_text_mobile').style.display = 'block';
            document.getElementById('js_driver_old_calcul_input_err_text_mobile').textContent = '생년월 6자리를 다 입력해주세요';
        }
        //정상적인 인풋
        else {
            if (Number(value) >= 300000) {
                value = String(Number(value) + 19000000);
            } else {
                value = String(Number(value) + 20000000);
            }
            let y = parseInt(value.substr(0, 4), 10);
            let m = parseInt(value.substr(4, 2), 10);
            let d = parseInt(value.substr(6, 2), 10);

            let dt = new Date(y, m - 1, d);

            //유효x
            if (dt.getDate() != d || dt.getMonth() + 1 != m || dt.getFullYear() != y) {

                document.getElementById('js_driver_old_calcul_input_err_text').style.display = 'block';
                document.getElementById('js_driver_old_calcul_input_err_text').textContent = '생년월일이 형식에 맞지 않습니다';
                document.getElementById('js_driver_old_calcul_input_err_text_mobile').style.display = 'block';
                document.getElementById('js_driver_old_calcul_input_err_text_mobile').textContent = '생년월일이 형식에 맞지 않습니다';
            }
            //유효
            else {
                const today = new Date();
                const birthDate = new Date(y, m - 1, d);
                let age = today.getFullYear() - birthDate.getFullYear();
                const ageM = today.getMonth() - birthDate.getMonth();
                if (ageM < 0 || (ageM === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                console.log(age); //만나이

                if (age > 20) {
                    //웹
                    document.getElementById('js_driver_old_calcul_result').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_input_err_text').style.display = 'none';
                    document.getElementById('js_driver_old_calcul_result_old').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_result_old').textContent = `만 ${age}세`
                    document.getElementById('js_driver_old_calcul_result_normal').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_result_normal_old').textContent = `만 ${age}세`
                    document.getElementById('js_driver_old_calcul_result_filter_apply_btn').style.display = 'inline-block';

                    //모바일
                    document.getElementById('js_driver_old_calcul_result_mobile').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_input_err_text_mobile').style.display = 'none';
                    document.getElementById('js_driver_old_calcul_result_old_mobile').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_result_old_mobile').textContent = `만 ${age}세`
                    document.getElementById('js_driver_old_calcul_result_normal_mobile').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_result_normal_old_mobile').textContent = `만 ${age}세`
                    document.getElementById('js_driver_old_calcul_result_filter_apply_btn_mobile').style.display = 'inline-block';


                    document.getElementsByClassName("f-driver-old-active")[0].classList.add('f-driver-old-active-no-color');
                    document.getElementsByClassName("mf-driver-old-active")[0].classList.add('mf-driver-old-active-no-color');

                    let blockOlds = document.getElementsByClassName("f-driver-old-block");
                    let blockOldsLen = blockOlds.length;
                    let blockOldsArr = [];
                    for (let i = 2; i < blockOldsLen; i++) {
                        blockOldsArr.push(Number(blockOlds[i].dataset.old));
                    }
                    blockOldsArr.push(1000);
                    console.log(blockOldsArr);

                    if (age < blockOldsArr[0]) { //해당 조건에 맞는 차량이 조회되지 않습니다T_T
                        document.getElementById('js_driver_old_calcul_result_normal').style.display = 'none';
                        document.getElementById('js_driver_old_calcul_result_filter_apply_btn').style.display = 'none';
                        document.getElementById('js_driver_old_calcul_result_err').style.display = 'block';

                        //모바일
                        document.getElementById('js_driver_old_calcul_result_normal_mobile').style.display = 'none';
                        document.getElementById('js_driver_old_calcul_result_filter_apply_btn_mobile').style.display = 'none';
                        document.getElementById('js_driver_old_calcul_result_err_mobile').style.display = 'block';
                    }

                    mfilterApplyOld = 0;

                    let blockOldsArrLen = blockOldsArr.length;
                    console.log(blockOldsArrLen);
                    for (let j = 0; j < blockOldsArrLen - 1; j++) {
                        if (age >= blockOldsArr[j] && age < blockOldsArr[j + 1]) {
                            document.getElementById('js_driver_old_calcul_result_normal').style.display = 'block';
                            document.getElementById('js_driver_old_calcul_result_normal_mobile').style.display = 'block';

                            let str = '';
                            for (let k = 0; k < j + 1; k++) {
                                if (k != 0) {
                                    str += '세, ';
                                }
                                if (k == j) { //마지막
                                    mfilterApplyOld = blockOldsArr[k];
                                }
                                str += blockOldsArr[k];
                            }

                            document.getElementById('js_driver_old_calcul_result_normal_old').textContent = `만 ${str}`;
                            document.getElementById('js_driver_old_calcul_result_normal_old_mobile').textContent = `만 ${str}`;
                        }
                    }


                } else if (age > 17) {
                    //웹
                    document.getElementById('js_driver_old_calcul_result').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_input_err_text').style.display = 'none';
                    document.getElementById('js_driver_old_calcul_result_old').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_result_old').textContent = `만 ${age}세`
                    document.getElementById('js_driver_old_calcul_result_err').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_result_err_detail').style.display = 'block';

                    //모바일
                    document.getElementById('js_driver_old_calcul_result_mobile').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_input_err_text_mobile').style.display = 'none';
                    document.getElementById('js_driver_old_calcul_result_old_mobile').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_result_old_mobile').textContent = `만 ${age}세`
                    document.getElementById('js_driver_old_calcul_result_err_mobile').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_result_err_detail_mobile').style.display = 'block';

                    document.getElementsByClassName("f-driver-old-active")[0].classList.add('f-driver-old-active-no-color');
                    document.getElementsByClassName("mf-driver-old-active")[0].classList.add('mf-driver-old-active-no-color');

                } else {
                    document.getElementById('js_driver_old_calcul_input_err_text').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_input_err_text').textContent = '렌트는 만 18세 이상 가능합니다';
                    //모바일
                    document.getElementById('js_driver_old_calcul_input_err_text_mobile').style.display = 'block';
                    document.getElementById('js_driver_old_calcul_input_err_text_mobile').textContent = '렌트는 만 18세 이상 가능합니다';
                }

            }
        }
    } else {
        document.getElementById('js_driver_old_calcul_input_err_text').style.display = 'none';
        document.getElementById('js_driver_old_calcul_input_err_text_mobile').style.display = 'none';
        filterDriverOldCalculInputErr();
    }
}

function filterDriverOldCalculInputErr() {
    document.getElementById('js_driver_old_calcul_result_old').style.display = 'none';
    document.getElementById('js_driver_old_calcul_result_err').style.display = 'none';
    document.getElementById('js_driver_old_calcul_result_err_detail').style.display = 'none';
    document.getElementById('js_driver_old_calcul_result').style.display = 'none';
    document.getElementById('js_driver_old_calcul_result_normal').style.display = 'none';
    document.getElementById('js_driver_old_calcul_result_filter_apply_btn').style.display = 'none';
    //모바일
    document.getElementById('js_driver_old_calcul_result_old_mobile').style.display = 'none';
    document.getElementById('js_driver_old_calcul_result_err_mobile').style.display = 'none';
    document.getElementById('js_driver_old_calcul_result_err_detail_mobile').style.display = 'none';
    document.getElementById('js_driver_old_calcul_result_mobile').style.display = 'none';
    document.getElementById('js_driver_old_calcul_result_normal_mobile').style.display = 'none';
    document.getElementById('js_driver_old_calcul_result_filter_apply_btn_mobile').style.display = 'none';

}

//초기화
export function filterDriverOldCalculReset() {
    filterDriverOldCalculInputErr();
    document.getElementById('js_driver_old_calcul_input_err_text').style.display = 'none';
    document.getElementById('js_driver_old_calcul').style.display = 'none';
    document.getElementById('js_driver_old_calcul_btn').style.display = 'block';
    document.getElementById('js_driver_old_calcul_input').value = null;

    //모바일
    document.getElementById('js_driver_old_calcul_input_err_text_mobile').style.display = 'none';
    document.getElementById('js_driver_old_calcul_mobile').style.display = 'none';
    document.getElementById('js_driver_old_calcul_btn_mobile').style.display = 'block';
    document.getElementById('js_driver_old_calcul_input_mobile').value = null;

}

export function filterDriverOldCalculApplyFilter() {
    let applyBtn = document.getElementById('js_driver_old_calcul_result_filter_apply_btn');
    let applyBtnMobile = document.getElementById('js_driver_old_calcul_result_filter_apply_btn_mobile');

    applyBtn.addEventListener('click', function () {
        document.getElementById(`js_driver_old_${mfilterApplyOld}`).click();
    });

    applyBtnMobile.addEventListener('click', function () {
        document.getElementById(`js_driver_old_${mfilterApplyOld}_mobile`).click();
        document.getElementsByClassName('mf-driver-old-active-no-color')[0].classList.remove('mf-driver-old-active-no-color');
    });
}