import axios from 'axios';
import {deliveryModalMake} from './delivery_modal.js';
import {emptyElmtChild, classCheck} from './common.js';
import {carKindsChangeAreaDomainWeb} from './car_type_event.js';
import {filterCarModel} from './filter_car_model.js';
import {oldTwentyOneBottomEvent} from './old_twentyone_bottom.js';
import {noOldTwentyOneBottomEvent} from './old_twentyone_bottom.js';
import {driverOldClick} from './filter_driver_old.js';
import {filterDriverOldCalculReset} from './filter_driver_old_calcul.js';


//차량 리스트에서 보일 수 있는 최대 차종 수
const MAX_CAR_NUM = 5;

const TYPE_MATCH = {
    '경형': 'light',
    '소형': 'tiny',
    '준중형': 'middle',
    '중형': 'medium',
    '대형': 'large',
    'SUV': 'suv',
    'RV': 'rv',
    '수입': 'import'
}
const Oil_MATCH = {
    'gasoline': '휘발유',
    'diesel': '경유',
    'lpg': 'LPG',
    'elec': '전기',
    'hybrid': '하이브리드',
    'hydrogen': '수소'
}
//전역변수
let mcarTypes = {};
let mcarFinal;

let mcarStart;
let mcarEnd;

let mlocation;
let mstartTime;
let mendTime;
let carsHieghts = [];

let mcarRankArr = [];
let moilArr = [];
let mdriverOldArr = [];

//차량 리스트 서버로부터 받아와서 조건별로 리스트 생성함수 불러오기
export function carListCar(_location, _startTime, _endTime) {
    mlocation = _location;
    mstartTime = _startTime;
    mendTime = _endTime;

    console.log(_location, _startTime, _endTime);

    //데이터 받아오기
    axios.get("http://ec2-52-78-81-30.ap-northeast-2.compute.amazonaws.com:3000/cars", {
        params: {
            location: _location,
            startTime: _startTime,
            endTime: _endTime
        }
    }).then((Response) => {
        console.log('clear');
        console.log(Response.data);
        const carArr = Response.data;

        //필터 - 자동차모델 elements
        carModelElements(carArr);
        mcarTypes['elec'] = typeElecCarArray(carArr); //전기
        mcarTypes['light'] = typeCarArray('경형', carArr); //경소
        mcarTypes['tiny'] = typeCarArray('소형', carArr); //승합
        mcarTypes['medium'] = typeCarArray('중형', carArr); //승합
        mcarTypes['large'] = typeCarArray('대형', carArr); //승합
        mcarTypes['rv'] = typeCarArray('RV', carArr); //승합
        mcarTypes['all'] = typeCarArray('전체', carArr); //승합
        mcarTypes['middle'] = typeCarArray('준중형', carArr); //승합
        mcarTypes['suv'] = typeCarArray('SUV', carArr); //승합
        mcarTypes['import'] = typeCarArray('수입', carArr); //승합

        console.log('mcarTypes', mcarTypes);

        //21세 미만이 선택되어 있는 경우 -> 전체 나이 선택되게
        if (classCheck(document.getElementById('js_driver_old_no'), 'f-driver-old-active')) {
            document.getElementById('js_driver_old_all').click();
        }
        //차량 타입
        carType(carArr);

        //차량리스트에 있는 oil들만 보이게
        filterOilResponse(carArr);
        //차량리스트에 있는 보험나이만 보이게
        filterDriverOldResponse(carArr);

        filterRankCheck();
        //정렬 타입
        orderType(carArr);

    }).catch((Error) => {
        console.log(Error);
    });
}

//자동차 모델 필터 elements 생성
function carModelElements(_cars) {
    let carModels = carPrices(_cars)[1];
    let newCarModels = new Set(carModels);
    newCarModels = [...newCarModels];
    console.log('newCarModels', newCarModels);
    const carModelsLen = newCarModels.length;

    emptyElmtChild('js_car_model_dropdown');
    emptyElmtChild('js_car_model_dropdown_mobile');
    let fragment = document.createDocumentFragment();
    let div;
    for (let i = 0; i < carModelsLen; i++) {
        div = document.createElement('div');
        div.classList.add('f-dropdown-item', 'dropdown-item');
        div.setAttribute('data-cmodel', newCarModels[i]);
        div.textContent = `"${newCarModels[i]}" 전 모델 검색`;
        fragment.appendChild(div);
    }
    document.getElementById('js_car_model_dropdown').appendChild(fragment);

    fragment = document.createDocumentFragment();
    for (let i = 0; i < carModelsLen; i++) {
        div = document.createElement('div');
        div.classList.add('f-dropdown-item', 'dropdown-item');
        div.setAttribute('data-cmodel', newCarModels[i]);
        div.textContent = `"${newCarModels[i]}" 전 모델 검색`;
        fragment.appendChild(div);
    }
    document.getElementById('js_car_model_dropdown_mobile').appendChild(fragment);
    filterCarModel();
}

//더 보기 버튼 클릭 이벤트
document.getElementById('js_car_list_more_btn').addEventListener('click', function () {
    mcarStart += MAX_CAR_NUM;
    mcarEnd += MAX_CAR_NUM;
    carListSlice();
});

//전기차 필터 적용
function typeElecCarArray(_carArr) {
    console.log('_carArr', _carArr);
    let elecCarArr = elecCars(_carArr);
    return elecCarArr;

}

//전기차
function elecCars(_cars) {
    let elecCars = _cars.filter(car => {
        return car['c_fuel'] == '전기';

    })
    console.log('elecCars', elecCars);
    return elecCars;
}

//차종 필터 적용
function typeCarArray(_type, _carArr) {
    let carArr = _carArr === null ? [] : _carArr;
    let newCarArr = [];
    if (_type == '전체') {
        newCarArr = carArr;
    } else {
        const carTypes = carsTypeDivision(carArr);

        //차량 리스트 있는 경우
        if (_type in carTypes) {
            newCarArr = carArr.slice(carTypes[_type][0], carTypes[_type][1] + 1);
            let addType = TYPE_MATCH[_type];
            let addElement = document.getElementById(`js_car_rank_${addType}`).parentNode;
            addElement.style.display = 'inline-block';
            let addElementMobile = document.getElementById(`js_car_rank_${addType}_mobile`).parentNode;
            addElementMobile.style.display = 'inline-block';
        } else {
            let removeType = TYPE_MATCH[_type];
            let removeElement = document.getElementById(`js_car_rank_${removeType}`).parentNode;
            removeElement.style.display = 'none';
            let removeElementMobile = document.getElementById(`js_car_rank_${removeType}_mobile`).parentNode;
            removeElementMobile.style.display = 'none';
        }

    }

    return newCarArr;
}

//차종 type 선택하는대로 분류돼서 나오게
function carsTypeDivision(_cars) {
    let cars = _cars === null ? [] : _cars;

    let carTypes = {};
    if (cars.length) {

        let carTypeName = '';

        const carsLen = cars.length;
        for (let i = 0; i < carsLen; i++) {
            //새로운 type
            if (cars[i]['c_type'] != carTypeName) {
                carTypes[cars[i]['c_type']] = [];
                carTypes[cars[i]['c_type']].push(i);

                if (carTypeName != '') {
                    carTypes[carTypeName].push(i - 1);
                }
            }
            carTypeName = cars[i]['c_type'];

        }
        carTypes[carTypeName].push(carsLen - 1);

        console.log("cars_type_division: ", carTypes);
    }
    console.log('carTypes', carTypes);
    return carTypes;
}



//차종 버튼 이벤트
function carType() {

    //이미 차량 리스트가 나열되어 있으면 다 지우고
    emptyElmtChild('js_car_list');

    for (const key in mcarTypes) {
        if (key == 'light' || key == 'tiny') {
            if (mcarTypes['light'].length || mcarTypes['tiny'].length) {
                document.getElementById('js_small').style.display = 'block';
            } else {
                document.getElementById('js_small').style.display = 'none';
            }
        } else if (key == 'medium' || key == 'large') {
            if (mcarTypes['medium'].length || mcarTypes['large'].length) {
                document.getElementById('js_big').style.display = 'block';
            } else {
                document.getElementById('js_big').style.display = 'none';
            }
        } else {
            if (mcarTypes[key].length == 0) {
                if (key != 'all') {
                    document.getElementById(`js_${key}`).style.display = 'none';
                    console.log(`js_${key} 없어`);
                } else {
                    console.log(`js_${key} 없어`);
                    //carMoreBtn(0);

                    document.getElementById(`js_${key}`).click();
                }
            } else {
                document.getElementById(`js_${key}`).style.display = 'block';
                console.log(`js_${key} 있어`);
            }
        }
    }
}

function filterOilResponse(_cars) {
    //필터-연료 반응형
    const originalOilLabels = ['전체', '휘발유', '경유', 'LPG', '전기', '하이브리드', '수소'];
    let meaningfulLabels = filterOilObj(_cars, originalOilLabels).oilLabels;
    console.log('meaningfulLabels', meaningfulLabels);
    //웹
    let oils = document.getElementsByClassName('f-car-oil-check');
    let oilsLen = oils.length;
    for (let i = 0; i < oilsLen; i++) {
        if (meaningfulLabels.indexOf(Oil_MATCH[oils[i].dataset.oil]) === -1 && oils[i].id != 'js_car_oil_all') {
            oils[i].parentNode.style.display = 'none';
        } else {
            oils[i].parentNode.style.display = 'inline-block';
        }
    }

    //모바일
    let mobileOils = document.getElementsByClassName('mf-car-oil-check');
    let mobileOilsLen = mobileOils.length;
    for (let i = 0; i < mobileOilsLen; i++) {
        if (meaningfulLabels.indexOf(Oil_MATCH[mobileOils[i].dataset.oil]) === -1 && mobileOils[i].id != 'js_car_oil_all_mobile') {
            mobileOils[i].parentNode.style.display = 'none';
        } else {
            mobileOils[i].parentNode.style.display = 'inline-block';
        }
    }
}

//필터-연료 반응형
function filterDriverOldResponse(_cars) {
    let driverOldLabels = ['all', 'no'];
    const carsLen = _cars.length;

    for (let i = 0; i < carsLen; i++) {
        if (driverOldLabels.indexOf(String(_cars[i]['c_driver_age'])) === -1) {
            driverOldLabels.push(String(_cars[i]['c_driver_age']));
        }
    }

    let driverOlds = document.getElementsByClassName('f-driver-old');
    let driverOldsLen = driverOlds.length;

    for (let j = 0; j < driverOldsLen; j++) {
        if (driverOldLabels.indexOf(driverOlds[j].dataset.old) === -1) {
            driverOlds[j].style.display = 'none';
            driverOlds[j].classList.remove('f-driver-old-block');
        } else {
            driverOlds[j].style.display = 'inline-block';
            driverOlds[j].classList.add('f-driver-old-block');
        }
    }
    //모바일
    let driverOldsMobile = document.getElementsByClassName('mf-driver-old');
    let driverOldsMobileLen = driverOldsMobile.length;

    for (let k = 0; k < driverOldsMobileLen; k++) {
        if (driverOldLabels.indexOf(driverOldsMobile[k].dataset.old) === -1) {
            driverOldsMobile[k].style.display = 'none';
            driverOldsMobile[k].classList.remove('mf-driver-old-block');
        } else {
            driverOldsMobile[k].style.display = 'inline-block';
            driverOldsMobile[k].classList.add('mf-driver-old-block');
        }
    }

}

carTypeClick();
//차종 버튼 클릭이벤트 (웹+모바일)
function carTypeClick() {
    let typesWeb = document.getElementsByClassName('ck-c-type');
    let typesMobile = document.getElementsByClassName('mtb-c-type');

    typesWebMobileClick(typesWeb, 'web');
    typesWebMobileClick(typesMobile, 'mobile');
}

//차종 버튼 클릭이벤트 (웹+모바일)
function typesWebMobileClick(_types, _web) {
    const typeLen = _types.length;
    for (let i = 0; i < typeLen; i++) {
        //차종 클릭 이벤트
        _types[i].addEventListener('click', function () {
            //초기화
            mcarStart = 0;
            mcarEnd = MAX_CAR_NUM;

            if (mcarTypes['all'].length) {
                let typeName;

                //웹
                if (_web == 'web') typeName = _types[i].firstChild.innerHTML;
                //모바일
                else typeName = _types[i].innerHTML;

                switch (typeName) {
                    case '전기':
                        filterCheckAllRemove();
                        //차종 필터 적용
                        let allCheck = filterCheckControl(this, 'rank');
                        filterRankCheckEvent(allCheck);
                        document.getElementById('js_car_oil_elec').click();
                        break;
                    case '경소형':
                        filterCheckAllRemove();
                        document.getElementById('js_car_rank_light').click();
                        document.getElementById('js_car_rank_tiny').click();
                        break;
                    case '중대형':
                        filterCheckAllRemove();
                        document.getElementById('js_car_rank_medium').click();
                        document.getElementById('js_car_rank_large').click();
                        break;
                    case '승합':
                        filterCheckAllRemove();

                        document.getElementById('js_car_rank_rv').click();
                        break;
                    case '전체':
                        filterCheckAllRemove();

                        filterRankCheckEvent(true);
                        break;
                    case '준중형':
                        filterCheckAllRemove();

                        document.getElementById('js_car_rank_middle').click();
                        break;
                    case 'SUV':
                        filterCheckAllRemove();

                        document.getElementById('js_car_rank_suv').click();
                        break;
                    case '수입':
                        filterCheckAllRemove();

                        document.getElementById('js_car_rank_import').click();
                        // carModelFiltering(mcarTypes['import']);
                        break;
                }
            }
        });
    }
}

//차량등급 체크박스 모두 해제
function filterCheckAllRemove() {
    let ranks = document.getElementsByClassName('f-car-rank-check');
    const ranksLen = ranks.length;
    let oils = document.getElementsByClassName('f-car-oil-check');
    const oilsLen = oils.length;

    for (let i = 0; i < ranksLen; i++) {
        ranks[i].checked = false;
    }
    for (let j = 0; j < oilsLen; j++) {
        oils[j].checked = false;
    }
}


//필터 - 차량등급 클릭이벤트
let mranks = document.getElementsByClassName('f-car-rank-check');
let mranksLen = mranks.length;

for (let i = 0; i < mranksLen; i++) {
    mranks[i].addEventListener('click', function () {
        let allCheck = filterCheckControl(this, 'rank');
        filterRankCheckEvent(allCheck);
    });
}

//필터 - 차량등급 클릭
function filterRankCheck() {
    filterRankCheckEvent(false);
}

function filterRankCheckEvent(_allCheck) {
    let ranksArr = [];
    let ranksElements = [];
    //초기화
    mcarStart = 0;
    mcarEnd = MAX_CAR_NUM;

    let ranks = document.getElementsByClassName('f-car-rank-check');
    let ranksLen = ranks.length;

    //arr 생성
    if (document.getElementById('js_car_rank_all').checked || _allCheck || document.querySelectorAll('.f-car-rank-check:checked').length == 0) {
        mcarRankArr = mcarTypes['all'];
        carKindsChangeAreaDomainWeb(document.getElementById('js_all'));
    } else {
        for (let j = 0; j < ranksLen; j++) {
            //체크된 차량등급들
            if (ranks[j].checked == true) {
                ranksArr = ranksArr.concat(mcarTypes[ranks[j].dataset.rank]);
                ranksElements.push(ranks[j].dataset.rank);
            }
        }
        //차 type 버튼 클릭하게
        filterRankTypeClick(ranksElements);
        //자동차 모델 필터링
        mcarRankArr = ranksArr;
    }
    console.log('mcarRankArr', mcarRankArr);
    filterOilCheck();
}

function filterRankTypeClick(_ranksElements) {
    if (_ranksElements.length == 2 && _ranksElements[0] == 'light' && _ranksElements[1] == 'tiny') {
        console.log('small!');
        carKindsChangeAreaDomainWeb(document.getElementById('js_small'));
    } else if (_ranksElements.length == 2 && _ranksElements[0] == 'medium' && _ranksElements[1] == 'large') {
        carKindsChangeAreaDomainWeb(document.getElementById('js_big'));
    } else if (_ranksElements.length == 1) {
        if (_ranksElements[0] == 'middle' || _ranksElements[0] == 'suv' || _ranksElements[0] == 'rv' || _ranksElements[0] == 'import') {
            carKindsChangeAreaDomainWeb(document.getElementById(`js_${_ranksElements[0]}`));
            console.log(`js_${_ranksElements[0]}`);
        } else {
            console.log('??');
            if (document.getElementsByClassName("ck-car-kinds-active")[0]) {
                document.getElementsByClassName("ck-car-kinds-active")[0].classList.remove("ck-car-kinds-active");
                document.getElementsByClassName("mtb-car-kinds-active")[0].classList.remove("mtb-car-kinds-active");
            }
        }
    } else {
        console.log('??');
        if (document.getElementsByClassName("ck-car-kinds-active")[0]) {
            document.getElementsByClassName("ck-car-kinds-active")[0].classList.remove("ck-car-kinds-active");
            document.getElementsByClassName("mtb-car-kinds-active")[0].classList.remove("mtb-car-kinds-active");
        }
    }
    console.log('zz');
}

function filterCheckControl(_rank, _filterName) { //_filterName : rank / oil
    let ranks = document.getElementsByClassName(`f-car-${_filterName}-check`);
    let ranksLen = ranks.length;

    if (_rank.id == `js_car_${_filterName}_all`) {
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
    } else if (document.getElementById(`js_car_${_filterName}_all`).checked) {
        document.getElementById(`js_car_${_filterName}_all`).checked = false;
    } else {
        if (document.querySelectorAll(`.f-car-${_filterName}-check:checked`).length == ranksLen - 1) {
            document.getElementById(`js_car_${_filterName}_all`).click();
        }
    }
    return false;
}

//필터 - 연료 클릭이벤트
let moils = document.getElementsByClassName('f-car-oil-check');
let moilsLen = moils.length;

for (let i = 0; i < moilsLen; i++) {
    moils[i].addEventListener('click', function () {
        let allCheck = filterCheckControl(this, 'oil');
        filterOilCheckEvent(allCheck);
    });
}

//필터 - 연료 클릭
function filterOilCheck() {
    filterOilCheckEvent(false);
}

//오일별 arr 생성
function filterOilObj(_cars, _oilNames) {
    console.log('oil cararr', _cars, _oilNames);
    let carsLen = _cars.length;
    let oilDivision = [];
    let oilLabels = [];
    for (let i = 0; i < carsLen; i++) {
        //해당 오일이 맞다면
        console.log('oil cararr', _cars, _oilNames);
        if (_oilNames.indexOf(_cars[i]['c_fuel']) > -1) {
            console.log('oil cararr', _cars, _oilNames);
            oilDivision.push(_cars[i]);
            if (oilLabels.indexOf(_cars[i]['c_fuel']) === -1) oilLabels.push(_cars[i]['c_fuel']);
        }
    }
    console.log('oilDivision', oilDivision);
    return {
        oilDivision: oilDivision,
        oilLabels: oilLabels
    };
}

//주 함수
function filterOilCheckEvent(_allCheck) {
    //초기화
    mcarStart = 0;
    mcarEnd = MAX_CAR_NUM;

    //전체 오일
    if (document.getElementById('js_car_oil_all').checked || _allCheck || document.querySelectorAll('.f-car-oil-check:checked').length == 0) {
        moilArr = mcarRankArr;
        if (document.getElementsByClassName("ck-car-kinds-active-no-block")[0]) {
            document.getElementsByClassName("ck-car-kinds-active-no-block")[0].classList.remove("ck-car-kinds-active-no-block");
            // document.getElementsByClassName("mtb-car-kinds-active")[0].classList.remove("mtb-car-kinds-active");//모바일
        }
        if (document.querySelectorAll('.f-car-rank-check:checked').length == 0) {
            carKindsChangeAreaDomainWeb(document.getElementById('js_all'));
        }

    } else {
        let oils = document.getElementsByClassName('f-car-oil-check');
        let oilsLen = oils.length;
        let oilsElements = [];
        let oilNames = [];

        for (let j = 0; j < oilsLen; j++) {
            //체크된 차량등급들
            if (oils[j].checked == true) {
                oilNames.push(Oil_MATCH[oils[j].dataset.oil]);
                oilsElements.push(oils[j].id);
            }
        }

        if (classCheck(document.getElementById('js_all'), 'ck-car-kinds-active') && oilsElements.length == 1 && oilsElements[0] == 'js_car_oil_elec') {
            carKindsChangeAreaDomainWeb(document.getElementById('js_elec'));

        } else if (document.getElementsByClassName("ck-car-kinds-active")[0]) {
            document.getElementsByClassName("ck-car-kinds-active")[0].classList.add("ck-car-kinds-active-no-block");
        }
        moilArr = filterOilObj(mcarRankArr, oilNames).oilDivision;

    }
    console.log('moilArr', moilArr);
    //carModelFiltering();
    filterDriverOldCheck();
}

//moilArr -> mdriverOldArr
//필터 - 자동차보험나이 클릭이벤트
let mdriverolds = document.getElementsByClassName('f-driver-old');
let mdriveroldLen = mdriverolds.length;

for (let i = 0; i < mdriveroldLen; i++) {
    mdriverolds[i].addEventListener('click', function () {
        filterDriverOldCalculReset();
        document.getElementsByClassName("f-driver-old-active")[0].classList.remove('f-driver-old-active-no-color');
        document.getElementsByClassName("mf-driver-old-active")[0].classList.remove('mf-driver-old-active-no-color');

        driverOldClick(this);
        //mobileDriverOldClick
        filterDriverOldCheckEvent();

    });
}

//필터 - 자동차보험나이 클릭
function filterDriverOldCheck() {
    filterDriverOldCheckEvent();
}
//주 함수
function filterDriverOldCheckEvent() {
    //초기화
    mcarStart = 0;
    mcarEnd = MAX_CAR_NUM;

    let moilArrLen = moilArr.length;
    let checked = document.getElementsByClassName('f-driver-old-active')[0].dataset.old;
    console.log('check', checked);
    mdriverOldArr = [];

    if (checked == 'all') {
        mdriverOldArr = moilArr;
        noOldTwentyOneBottomEvent();
    } else if (checked == 'no') {
        oldTwentyOneBottomEvent();
    } else {
        console.log('check', Number(checked));
        for (let i = 0; i < moilArrLen; i++) {
            if (moilArr[i]['c_driver_age'] <= Number(checked)) {
                mdriverOldArr.push(moilArr[i]);
            }
        }
        noOldTwentyOneBottomEvent();
    }

    console.log('mdriverOldArr', mdriverOldArr);
    carModelFiltering();
}

//자동차 모델명 필터 버튼클릭
document.getElementById('js_car_model_search_btn').addEventListener('click', function () {
    carModelFiltering();
});

//자동차 모델명 필터링
function carModelFiltering() {
    let cars = [];
    const carModelName = document.getElementById('js_car_model_dropdown_btn').value;
    console.log('carModelName', carModelName);

    if (carModelName) {
        const carsLen = mdriverOldArr.length;

        for (let i = 0; i < carsLen; i++) {
            //있다면
            let originalName = mdriverOldArr[i]['c_name'].toLowerCase();
            let searchName = carModelName.toLowerCase();
            if (originalName.indexOf(searchName) != -1) {
                cars.push(mdriverOldArr[i]);
            }
        }
        carArrMake(cars);
    } else {
        carArrMake(mdriverOldArr);
    }
}

//필터된 array 받아서 차량리스트 로드
function carArrMake(_cars) {
    if (!classCheck(document.getElementById('js_driver_old_no'), 'f-driver-old-active')) {
        let cars = _cars === null ? [] : _cars;
        //초기화
        mcarFinal = [];

        //이미 차량 리스트가 나열되어 있으면 다 지우고
        emptyElmtChild('js_car_list');

        if (cars.length == 0) {
            document.getElementById('js_no_cars').style.display = 'block';
            document.getElementById('js_car_list_more_btn').style.display = 'none';

        } else {
            console.log('dkdeod');
            document.getElementById('js_no_cars').style.display = 'none';

            //차종순 or 가격순
            const rentOrder = document.getElementsByClassName('crt-check-box-active')[0].id; //js_type
            const order = rentOrder.split('_')[1];

            //가격순
            if (order == 'price') {
                mcarFinal = priceSort(cars);
            }

            //차종순
            else {
                mcarFinal = cars;
            }
            carListSlice();

        }
    }
}

//가격순으로 정렬
function priceSort(_cars) {
    let carNames = carsNameDivision(_cars);
    let carsPriceSort = carPriceSort(_cars);
    const carsPriceSortLen = carsPriceSort.length;
    let cars = [];
    //차종별 (레이)
    for (let i = 0; i < carsPriceSortLen; i++) {
        //한 차종별 (레이)
        let carName = carsPriceSort[i][0];
        let rentSort = _cars.slice(carNames[carName][0], carNames[carName][1] + 1);

        let aCarPriceSortArr = aCarPriceSort(rentSort);
        let aCarPriceSortArrLen = aCarPriceSortArr.length;

        let newACarPriceSort = [];
        for (let j = 0; j < aCarPriceSortArrLen; j++) {
            const arrLen = aCarPriceSortArr[j][1].length;

            for (let k = 0; k < arrLen - 1; k++) {
                let slices = rentSort.slice(aCarPriceSortArr[j][1][k][1][0], aCarPriceSortArr[j][1][k][1][1] + 1);
                console.log('slices', slices);

                slices = slices.sort(function (a, b) {
                    return a.car_price - b.car_price;
                });

                slices.forEach(function (element) {
                    newACarPriceSort.push(element);
                });
            }
        }
        //하나의 arr로 합치기 (cars)
        for (const item of newACarPriceSort) {
            cars.push(item);

        }

    }
    console.log('가격순', cars);
    return cars;
}

//차이름 선택하는대로 분류돼서 나오게
function carsNameDivision(_cars) {
    let cars = _cars === null ? [] : _cars;

    let carTypes = {};

    const carsLen = cars.length;
    if (carsLen) {

        let carTypeName = '';
        for (let i = 0; i < carsLen; i++) {

            console.log('!!' + cars[i]['c_name']); //이거 이용해서 type 바 만들기
            //새로운 type
            if (cars[i]['c_name'] != carTypeName) {
                carTypes[cars[i]['c_name']] = [];
                carTypes[cars[i]['c_name']].push(i);
                if (carTypeName != '') {
                    carTypes[carTypeName].push(i - 1);
                }
            }
            carTypeName = cars[i]['c_name'];

        }
        carTypes[carTypeName].push(carsLen - 1);


        console.log("cars_name_division: ", carTypes);
    }
    return carTypes;
}


//차종별로 price 정렬
function carPrices(_cars) {
    let cars = _cars === null ? [] : _cars;

    let carPriceSortObj = {};
    let carName = '';
    let carModels = [];
    const carsLen = cars.length;
    for (let i = 0; i < carsLen; i++) {
        if (cars[i]['c_name'] != carName) {
            carPriceSortObj[cars[i]['c_name']] = [];
            carModels.push(cars[i]['c_name'].split(' ')[0]);
        }
        carPriceSortObj[cars[i]['c_name']].push(cars[i]['car_price']);
        carName = cars[i]['c_name'];

    }

    console.log('carModels', carModels);
    for (let key in carPriceSortObj) {
        carPriceSortObj[key].sort(function (a, b) { // 오름차순
            return a - b;
        })
    }
    console.log('mon test', carPriceSortObj);

    return [carPriceSortObj, carModels];
}

function carPriceSort(_cars) {
    let carPriceSortObj = carPrices(_cars)[0];
    let newCarPriceSortArr = [];

    for (let key in carPriceSortObj) {
        newCarPriceSortArr.push([key, carPriceSortObj[key]]);
    }
    newCarPriceSortArr.sort(function (a, b) {
        return a[1][0] - b[1][0];
    });

    console.log('carPriceSortObj: ', newCarPriceSortArr);
    return newCarPriceSortArr; //sort[i][0] = c_name
}


//한 차종 내에서 price 순으로 sort
function aCarPriceSort(_aCarArr) {
    let aCarArr = _aCarArr === null ? [] : _aCarArr;
    let aCarPriceSortObj = {};
    let rentCompanyName = '';
    let oilName = '';
    let oilPrices;
    let oilMinPrice;
    let prices;
    let newRentCompanySort;

    const aCarArrLen = aCarArr.length;
    for (let i = 0; i < aCarArrLen; i++) {

        if (aCarArr[i]['a_name'] != rentCompanyName) {
            aCarPriceSortObj[aCarArr[i]['a_name']] = {};
        }
        //oil
        if ((aCarArr[i]['a_name'] != rentCompanyName) || (aCarArr[i]['c_production_year'] + aCarArr[i]['c_fuel']) != oilName) {
            aCarPriceSortObj[aCarArr[i]['a_name']][(aCarArr[i]['c_production_year'] + aCarArr[i]['c_fuel'])] = [];
            aCarPriceSortObj[aCarArr[i]['a_name']][(aCarArr[i]['c_production_year'] + aCarArr[i]['c_fuel'])].push(i);

            if (oilName != '') {
                aCarPriceSortObj[rentCompanyName][oilName].push(i - 1);
                //그 oil에서 가장 최솟값
                oilMinPrice = Math.min.apply(null, oilPrices);
                aCarPriceSortObj[rentCompanyName][oilName].push(oilMinPrice);
            }
            //새 oil 가격들
            oilPrices = [];
        }
        oilPrices.push(aCarArr[i]['car_price']);

        //렌터카 업체 가격 구하기
        if (aCarArr[i]['a_name'] != rentCompanyName) {
            if (rentCompanyName != '') {
                prices = [];
                for (let j in aCarPriceSortObj[rentCompanyName]) {
                    prices.push(aCarPriceSortObj[rentCompanyName][j][aCarPriceSortObj[rentCompanyName][j].length - 1]);
                }
                //한 렌터카 업체가 가지는 가장 최솟값
                aCarPriceSortObj[rentCompanyName]['rentCompanyMinPrice'] = [Math.min.apply(null, prices)];
            }
        }
        rentCompanyName = aCarArr[i]['a_name'];
        oilName = aCarArr[i]['c_production_year'] + aCarArr[i]['c_fuel'];
    }
    //마지막 element
    aCarPriceSortObj[rentCompanyName][oilName].push(aCarArrLen - 1);

    //그 oil에서 가장 최솟값
    oilMinPrice = Math.min.apply(null, oilPrices);
    aCarPriceSortObj[rentCompanyName][oilName].push(oilMinPrice);

    prices = [];
    for (let k in aCarPriceSortObj[rentCompanyName]) {
        prices.push(aCarPriceSortObj[rentCompanyName][k][aCarPriceSortObj[rentCompanyName][k].length - 1]);
    }

    //한 렌터카 업체가 가지는 가장 최솟값
    aCarPriceSortObj[rentCompanyName]['rentCompanyMinPrice'] = [Math.min.apply(null, prices)];

    newRentCompanySort = aRentPriceSort(aCarPriceSortObj);

    return newRentCompanySort;
}

//렌터카 가격순으로 나열
function aRentPriceSort(_aCarPriceSortObj) {
    let newRentCompanySort = [];
    let newOilSort;

    for (let rentCompany in _aCarPriceSortObj) {
        newOilSort = [];
        for (let oil in _aCarPriceSortObj[rentCompany]) {
            newOilSort.push([oil, _aCarPriceSortObj[rentCompany][oil]]);
        }
        newRentCompanySort.push([rentCompany, newOilSort]);
    }
    newRentCompanySort.sort(function (a, b) {
        return a[1][1][1] - b[1][1][1];
    });
    console.log('newRentCompanySort:', newRentCompanySort);
    return newRentCompanySort;
}

//final 차량리스트에서 차량 MAX 개로 끊어서 append
function carListSlice() {

    console.log('mcarFinal', mcarFinal);
    let carPricesObj = carPrices(mcarFinal)[0];
    let cars = [];
    let carNames = carsNameDivision(mcarFinal);
    let carNamesArr = [];

    //carNames 순서 맞게 carNameArr에 새로 정렬
    for (let key in carNames) {
        carNamesArr.push([key, carNames[key]]);
    }
    carNamesArr.sort(function (a, b) {
        return a[0] - b[0];
    });

    let carNamesNum = carNamesArr.length;
    let startIndex = carNamesArr[mcarStart][1][0];
    let endIndex;

    if (carNamesNum <= mcarEnd) { //없다면
        endIndex = carNamesArr[carNamesNum - 1][1][1];
        document.getElementById('js_car_list_more_btn').style.display = 'none';
        //더보기 버튼 없애기
    } else {
        endIndex = carNamesArr[mcarEnd - 1][1][1];
        document.getElementById('js_car_list_more_btn').style.display = 'block';
        //더보기 버튼 보이게
    }

    for (let i = startIndex; i <= endIndex; i++) {
        cars.push(mcarFinal[i]);
    }
    console.log('cars!', mcarFinal, cars, carNames, carNamesNum, carNamesArr);

    carArr(cars, mlocation, mstartTime, mendTime, carPricesObj);
    //스크롤이벤트
    carListScroll();
}




//차량 리스트 생성
export function carArr(_carList, _location, _startTime, _endTime, _carPricesObj) {
    let lastCarName;
    let lastRentCompanyName;
    let lastOilYear;
    let lastOilName;
    let lastDriverAge;

    let carCheckObj;
    let carKindNum = Object.keys(_carPricesObj).length;

    let carClone;
    let rentCompanyClone;
    let oilClone;
    let plusAgeClone;
    let reservedCar;
    const carListLen = _carList.length;

    console.log('차종개수', carKindNum);

    //차량 리스트 받아오기 (객체 하나씩)
    for (let i = 0; i < carListLen; i++) {
        //바로 이전의 객체와 차 name이 같은지  
        carCheckObj = carCheck({
            car: _carList[i],
            lastCarName: lastCarName,
            lastRentCompanyName: lastRentCompanyName,
            lastOilYear: lastOilYear,
            lastOilName: lastOilName,
            lastDriverAge: lastDriverAge,
            lastCarCheck: true,
            lastRentCompanyCheck: true,
            lastOilCheck: true,
            lastDriverAgeCheck: false
        });

        //차종마다 한번씩
        if (carCheckObj.lastCarCheck) {
            //차종 클론
            carClone = aCar(_carList[i]);
            document.getElementById('js_car_list').appendChild(carClone);

            //최저가 ~ 최고가
            minMaxPrice(_carPricesObj, _carList[i], carClone);

            //마감차량
            reservedCars(_carList[i]['c_name'], _location, _startTime, _endTime, reservedCar, carClone);
        }

        //모바일 - 차량 리스트 스크롤 이벤트에서 표기할 최저~최고가
        carClone.setAttribute('c_price', carClone.querySelector(".clc-car-text-money").textContent);

        //한 차종의 렌터카 업체마다 한번씩
        if (carCheckObj.lastRentCompanyCheck) {
            //렌트카
            rentCompanyClone = aRentCompany(_carList[i]);
            carClone.querySelector(".clc-car-list-component-rent").appendChild(rentCompanyClone);
            //배달가능 모달
            deliveryModalMake(_carList[i]['a_name'], rentCompanyClone.querySelector(".clc-delivery"), rentCompanyClone);

        }
        //그 렌터카 업체에서 oil마다 한번씩
        if (carCheckObj.lastOilCheck) {
            //oil
            oilClone = aOil(_carList[i]);
            rentCompanyClone.appendChild(oilClone);
        }
        //21 이외 추가
        if (carCheckObj.lastDriverAgeCheck) {
            //23세 이상 추가           
            oilClone.querySelector('.clc-line').style.display = 'block';
            plusAgeClone = aPlusAge(_carList[i]);
            oilClone.querySelector(".clc-rent-option").appendChild(plusAgeClone);
        }
        lastCarName = _carList[i]['c_name'];
        lastRentCompanyName = _carList[i]['a_name'];
        lastOilYear = _carList[i]['c_production_year'];
        lastOilName = _carList[i]['c_fuel'];
        lastDriverAge = _carList[i]['c_driver_age'];
    }
}

//한 차량마다 check (차이름, 렌터카업체, oil, 운전자나이)
function carCheck(_carObj) {
    let lastCarCheck = _carObj.lastCarCheck;
    let lastRentCompanyCheck = _carObj.lastRentCompanyCheck;
    let lastOilCheck = _carObj.lastOilCheck;
    let lastDriverAgeCheck = _carObj.lastDriverAgeCheck;

    if (_carObj.car['c_name'] == _carObj.lastCarName) {
        console.log(11);
        lastCarCheck = false;
        //바로 이전의 객체와 렌터카 업체 이름이 같은지
        if (_carObj.car['a_name'] == _carObj.lastRentCompanyName) {
            console.log(21);
            lastRentCompanyCheck = false;
            //바로 이전의 객체와 oil이 같은지
            if (_carObj.car['c_production_year'] == _carObj.lastOilYear && _carObj.car['c_fuel'] == _carObj.lastOilName) {
                console.log(31);
                lastOilCheck = false;
                //바로 이전의 객체와 보험 최소 나이가 같은지
                if (_carObj.car['c_driver_age'] == _carObj.lastDriverAge) {
                    console.log(41);
                    lastDriverAgeCheck = false;
                } else {
                    console.log(42);
                    lastDriverAgeCheck = true;
                }
            } else {
                console.log(32);
                lastOilCheck = true;
            }
        } else {
            console.log(22);
            lastRentCompanyCheck = true;
        }
    } else {
        console.log(12);
        lastCarCheck = true;
    }

    return {
        lastCarCheck: lastCarCheck,
        lastRentCompanyCheck: lastRentCompanyCheck,
        lastOilCheck: lastOilCheck,
        lastDriverAgeCheck: lastDriverAgeCheck
    }
}
//한 차종별 clone 생성
function aCar(_carObj) {
    let car = document.getElementsByClassName('clc-car-list-component')[0];
    let carClone = car.cloneNode(true);

    carClone.classList.remove('clc-car-list-component');
    carClone.classList.add('clc-car-list-component-clone');
    carClone.setAttribute('c_name', _carObj['c_name']);

    carClone.querySelector(".clc-discount").textContent = '3초 가입 시 추가 할인!';
    carClone.querySelector(".clc-car-text-kinds-text").textContent = _carObj['c_type'];
    carClone.querySelector(".clc-car-text-name").textContent = _carObj['c_name'];
    carClone.querySelector(".clc-car-text-explan").textContent = _carObj['c_description'];

    carClone.querySelector(".clc-person").lastChild.textContent = _carObj['c_max_number_of_people'] + '인';
    carClone.querySelector(".clc-auto").lastChild.textContent = _carObj['c_gear'];
    carClone.querySelector(".clc-baggage").lastChild.textContent = _carObj['c_number_of_load'] + '개';
    carClone.querySelector(".clc-door").lastChild.textContent = _carObj['c_number_of_door'] + '개';
    if (_carObj['c_air_conditioner_or_not'] == 'y') {
        carClone.querySelector(".clc-aircon-box").style.display = 'block';
    }
    return carClone;
}
//한 렌트카별 clone 생성
function aRentCompany(_carObj) {
    let rentCompany = document.getElementsByClassName('clc-rent')[0];
    let rentCompanyClone = rentCompany.cloneNode(true);

    rentCompanyClone.classList.remove('clc-rent');
    rentCompanyClone.classList.add('clc-rent-clone');
    rentCompanyClone.querySelector(".clc-name").textContent = _carObj['a_name'];
    rentCompanyClone.querySelector(".clc-umo").textContent = _carObj['a_info'];
    rentCompanyClone.querySelector(".clc-score").textContent = _carObj['a_grade'];
    rentCompanyClone.querySelector(".clc-rent-company-reserve").textContent = '예약수 ' + _carObj['a_number_of_reservation'] + '+';
    rentCompanyClone.querySelector(".clc-delivery").setAttribute('data-target', `#deliveryModal${_carObj['a_name']}`);

    return rentCompanyClone;
}
//한 oil별 clone 생성
function aOil(_carObj) {
    let oil = document.getElementsByClassName('clc-rent-option-container')[0];
    let oilClone = oil.cloneNode(true);

    oilClone.classList.remove('clc-rent-option-container');
    oilClone.classList.add('clc-rent-option-container-clone');
    oilClone.querySelector(".clc-rent-option-top").classList.add('clickable');
    oilClone.querySelector(".clc-year").textContent = _carObj['c_production_year'];
    oilClone.querySelector(".clc-oil").textContent = _carObj['c_fuel'];
    oilClone.querySelector(".clc-old").textContent = '만 ' + _carObj['c_driver_age'] + '세 이상';
    oilClone.querySelector(".clc-discount-result").textContent = _carObj['car_price'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원'; //

    return oilClone;
}
//한 plusage별 clone 생성
function aPlusAge(_carObj) {
    let plusAge = document.getElementsByClassName('clc-rent-option-text-plus')[0];
    let plusAgeClone = plusAge.cloneNode(true);

    plusAgeClone.classList.remove('clc-rent-option-text-plus');
    plusAgeClone.classList.add('clc-rent-option-text-plus-clone', 'clickable');
    plusAgeClone.querySelector(".clc-plus-old").textContent = '만 ' + _carObj['c_driver_age'] + '세 이상';
    plusAgeClone.querySelector(".clc-plus-discount-result").textContent = _carObj['car_price'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원'; //
    return plusAgeClone;
}
//최저가 ~ 최고가
function minMaxPrice(_carPricesObj, _carObj, _carClone) {
    let aCarPrices = _carPricesObj[_carObj['c_name']];
    aCarPrices.sort(function (a, b) { // 오름차순
        return a - b;
    });

    if (aCarPrices[0] == aCarPrices[aCarPrices.length - 1]) {
        _carClone.querySelector(".clc-car-text-money").textContent = aCarPrices[0].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';

    } else {
        _carClone.querySelector(".clc-car-text-money").textContent = aCarPrices[0].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '~' + aCarPrices[aCarPrices.length - 1].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
    }
}
//마감된 차량 불러오기
function reservedCars(_carName, _location, _startTime, _endTime, _reservedCar, _carClone) {

    axios.get("http://ec2-52-78-81-30.ap-northeast-2.compute.amazonaws.com:3000/reserved_cars", {
        params: {
            carName: _carName,
            location: _location,
            startTime: _startTime,
            endTime: _endTime
        }
    }).then((Response) => {

        console.log('reserved car!!!:', _carName, Response.data);
        let reservedCars = Response.data;
        //마감 차량 1 이상일때
        if (reservedCars['number_of_affiliate'] > 0) {
            _reservedCar = document.getElementsByClassName('clc-reserved-car-container')[0];

            let reservedCarClone = _reservedCar.cloneNode(true);
            reservedCarClone.style.display = 'block';
            reservedCarClone.classList.remove('clc-reserved-car-container');
            reservedCarClone.classList.add('clc-reserved-car-container-clone');
            _carClone.appendChild(reservedCarClone);

            reservedCarClone.querySelector(".clc-reserved-car-text").textContent = `이외에 ${reservedCars['number_of_affiliate']}개 업체에서 ${reservedCars['number_of_car']}대의 차량은 이미 모두 마감되었습니다.`;

        }
    }).catch((Error) => {
        console.log(Error);
    });
}

//모바일 - 차량 리스트 스크롤 이벤트
export function carListScroll() {
    carsHieghts = [];
    let cars = document.getElementsByClassName('clc-car-list-component-clone');
    const carsLen = cars.length;

    for (let i = 0; i < carsLen; i++) {
        console.log('cars[i]', cars[i]);
        let relativeTop = cars[i].getBoundingClientRect().top;
        let scrolledTopLength = window.pageYOffset;
        let absoluteTop = scrolledTopLength + relativeTop;
        carsHieghts.push([absoluteTop, cars[i]]);
    }
    console.log('carsHieghts', carsHieghts);
}

//스크롤 이벤트
carListScrollEvent();

function carListScrollEvent() {
    window.addEventListener('scroll', () => {
        let scrollLocation = document.documentElement.scrollTop + 100; // 현재 스크롤바 위치
        const carsHieghtsLen = carsHieghts.length;
        for (let j = 0; j < carsHieghtsLen - 1; j++) {
            if (scrollLocation >= carsHieghts[j][0] && scrollLocation < carsHieghts[j + 1][0]) {

                document.getElementById('js_car_detail').style.display = 'block';
                document.getElementById('js_car_detail_c_name').textContent = carsHieghts[j][1].getAttribute('c_name');
                document.getElementById('js_car_detail_c_price').textContent = carsHieghts[j][1].getAttribute('c_price');

            } else if (scrollLocation < carsHieghts[0][0]) {
                document.getElementById('js_car_detail').style.display = 'none';
            }
        }

    });
}

//정렬순 클릭이벤트
function orderType() {
    let webTypes = document.getElementsByClassName('crt-sort-type');
    const webTypesLen = webTypes.length;
    let mobileTypes = document.getElementsByClassName('mtb-sort-type');
    const mobileTypesLen = mobileTypes.length;
    for (let i = 0; i < webTypesLen; i++) {
        console.log('webTypes[i]', webTypes[i]);

        webTypes[i].addEventListener('click', function () {
            document.getElementsByClassName("ck-car-kinds-active")[0].click();
        });
    }
    for (let j = 0; j < mobileTypesLen; j++) {

        mobileTypes[j].addEventListener('click', function () {
            document.getElementsByClassName("ck-car-kinds-active")[0].click();
        });
    }
}
//window 사이즈 변할때마다(576, 767.98, 992) scroll event 호출
windowSizeEvent();

function windowSizeEvent() {
    window.onload = function () {
        const lastWindowSize = window.innerWidth;
        let lastDomainNum = windowSizeDomain(lastWindowSize);
        window.addEventListener('resize', function () {
            let domainNum = windowSizeDomain(window.innerWidth);
            if (domainNum != lastDomainNum) {
                carListScroll();
                lastDomainNum = domainNum;
            }
        });
    }
}

function windowSizeDomain(_size) {
    if (_size <= 576) {
        return 1;
    } else if (_size <= 767.98) {
        return 2;
    } else if (_size <= 992) {
        return 3;
    } else return 4;
}