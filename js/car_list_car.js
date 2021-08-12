import axios from 'axios';
import {deliveryModalMake} from './delivery_modal.js';
import {emptyElmtChild} from './common.js';


//차량 리스트에서 보일 수 있는 최대 차종 수
const MAX_CAR_NUM = 5;

//전역변수
let mcarTypes = {};
let mcarFinal;

let mcarStart;
let mcarEnd;

let mlocation;
let mstartTime;
let mendTime;
let carsHieghts = [];

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

        mcarTypes['elec'] = typeElecCarArray(carArr); //전기
        mcarTypes['small'] = typeCarArray('경형 소형', carArr); //경소
        mcarTypes['big'] = typeCarArray('중형 대형', carArr); //중대
        mcarTypes['rv'] = typeCarArray('RV', carArr); //승합
        mcarTypes['all'] = typeCarArray('전체', carArr); //전체
        mcarTypes['middle'] = typeCarArray('준중형', carArr); //준중
        mcarTypes['suv'] = typeCarArray('SUV', carArr); //suv
        mcarTypes['import'] = typeCarArray('수입', carArr); //수입

        //선택되어있는 차종에 차량이 없을때 -> 전체 클릭
        let type = document.getElementsByClassName("ck-car-kinds-active")[0].id.split('_')[1];
        if (mcarTypes[type].length == 0) {
            document.getElementById('js_all').click();
        }
        //차량 타입
        carType(carArr);
        document.getElementsByClassName("ck-car-kinds-active")[0].click();

        //정렬 타입
        orderType(carArr);

    }).catch((Error) => {
        console.log(Error);
    });
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
        let types = _type.split(' ');

        //경소형, 중대형 경우
        if (types.length > 1) {
            //경형&소형 or 중형&대형 인 경우
            if ((types[1] in carTypes) && (types[0] in carTypes)) {
                const typesArr1 = carArr.slice(carTypes[types[1]][0], carTypes[types[1]][1] + 1); //소형
                const typesArr2 = carArr.slice(carTypes[types[0]][0], carTypes[types[0]][1] + 1); //경형
                //merge
                for (const item of typesArr1) {
                    typesArr2.push(item);
                }
                newCarArr = typesArr2;
            }
            //경소형에서 한종류(경형) or 중대형에서 한종류(대형) 있는 경우
            else if (types[1] in carTypes) {
                newCarArr = carArr.slice(carTypes[types[1]][0], carTypes[types[1]][1] + 1);

            }
            //경소형에서 한종류(소형) or 중대형에서 한종류(중형) 있는 경우 (위와 반대)
            else if (types[0] in carTypes) {
                newCarArr = carArr.slice(carTypes[types[0]][0], carTypes[types[0]][1] + 1);
            }
        }
        //준중형, suv, 승합, 수입 경우
        else {
            //차량 리스트 있는 경우
            if (types[0] in carTypes) {
                newCarArr = carArr.slice(carTypes[types[0]][0], carTypes[types[0]][1] + 1);
            }
        }
    }
    return newCarArr;
}

//차종 type 선택하는대로 분류돼서 나오게
function carsTypeDivision(_cars) {
    let cars = _cars === null ? [] : _cars;

    let carTypes = {};
    console.log(cars);
    if (cars.length) {

        let carTypeName = '';

        // cars.map(car => {

        // });

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
    return carTypes;
}



//차종 버튼 클릭이벤트
function carType() {

    //이미 차량 리스트가 나열되어 있으면 다 지우고
    emptyElmtChild('js_car_list');

    for (const key in mcarTypes) {
        if (mcarTypes[key].length == 0) {
            if (key != 'all') {
                document.getElementById(`js_${key}`).style.display = 'none';
                console.log(`js_${key} 없어`);
            } else {
                console.log(`js_${key} 없어`);
                //carMoreBtn(0);
                document.getElementById('js_no_cars').style.display = 'block';
                document.getElementById(`js_${key}`).click();
            }
            document.getElementById('js_car_list_more_btn').style.display = 'none';
        } else {
            document.getElementById(`js_${key}`).style.display = 'block';
            console.log(`js_${key} 있어`);
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
                        //차종 필터 적용
                        carArrMake(mcarTypes['elec']);
                        break;
                    case '경소형':
                        carArrMake(mcarTypes['small']);
                        break;
                    case '중대형':
                        carArrMake(mcarTypes['big']);
                        break;
                    case '승합':
                        carArrMake(mcarTypes['rv']);
                        break;
                    case '전체':
                        carArrMake(mcarTypes['all']);
                        break;
                    case '준중형':
                        carArrMake(mcarTypes['middle']);
                        break;
                    case 'SUV':
                        carArrMake(mcarTypes['suv']);
                        break;
                    case '수입':
                        carArrMake(mcarTypes['import']);
                        break;
                }
            }
        });
    }
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


//필터된 array 받아서 차량리스트 로드
function carArrMake(_cars) {
    let cars = _cars === null ? [] : _cars;
    //초기화
    mcarFinal = [];

    //이미 차량 리스트가 나열되어 있으면 다 지우고
    emptyElmtChild('js_car_list');

    if (cars.length == 0) document.getElementById('js_no_cars').style.display = 'block';

    else {
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

    const carsLen = cars.length;
    for (let i = 0; i < carsLen; i++) {
        if (cars[i]['c_name'] != carName) {
            carPriceSortObj[cars[i]['c_name']] = [];
        }
        carPriceSortObj[cars[i]['c_name']].push(cars[i]['car_price']);
        carName = cars[i]['c_name'];

    }
    console.log(carPriceSortObj);
    for (let key in carPriceSortObj) {
        carPriceSortObj[key].sort(function (a, b) { // 오름차순
            return a - b;
        })
    }
    console.log('mon test', carPriceSortObj);

    return carPriceSortObj;
}

function carPriceSort(_cars) {
    let carPriceSortObj = carPrices(_cars);
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
    let carPricesObj = carPrices(mcarFinal);
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