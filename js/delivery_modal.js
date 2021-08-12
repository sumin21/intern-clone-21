import axios from 'axios';

export function deliveryModalMake(_rentCompanyName, _delivery, _rentCompanyClone) {
    axios.get("http://ec2-52-78-81-30.ap-northeast-2.compute.amazonaws.com:3000/delivery_location", {
        params: {
            affiliateName: _rentCompanyName
        }
    }).then((Response) => {
        console.log('clear!!!!!!!!');
        console.log(Response.data);
        const deliveryLocations = Response.data;
        const newDeliveryLocations = deliveryLcoationSort(deliveryLocations);

        //배달지역 있는 경우만
        if (newDeliveryLocations.length != 0) {
            _delivery.setAttribute('src', '../icon/icon-delivery.png');
            deliveryModalDrow(newDeliveryLocations, _rentCompanyName, _rentCompanyClone);
        } else {
            _delivery.style.display = 'none';
        }

    }).catch((Error) => {
        console.log(Error);
    });
}

function deliveryLcoationSort(_deliveryLocations) {
    let newDeliveryLocations = [];
    const sortStandard = ['서울', '인천', '경기'];

    const sortStandardLen = sortStandard.length;
    const deliveryLocationsLen = _deliveryLocations.length;

    for (let i = 0; i < sortStandardLen; i++) {
        for (let j = 0; j < deliveryLocationsLen; j++) {
            let locationsSeparate = _deliveryLocations[j]['dl_sido'].split(' ')[0];
            if (sortStandard[i] == locationsSeparate) {
                newDeliveryLocations.push(_deliveryLocations[j]);
            }
        }
    }
    return newDeliveryLocations;
}

function deliveryModalDrow(_deliveryLocations, _rentCompanyName, _rentCompanyClone) {

    let deliveryModalClone = deliveryClone(_rentCompanyName);
    _rentCompanyClone.querySelector(".clc-rent-company-name").appendChild(deliveryModalClone);

    let lastLocationTitle = '';
    let lastLocationSubtitle = '';
    let locationCheckObj;

    let gyeonggiClone;
    let elementClone;
    let deliveryElementRightClone;

    const deliveryLocationsLen = _deliveryLocations.length;
    for (let i = 0; i < deliveryLocationsLen; i++) {

        let locationsSeparate = _deliveryLocations[i]['dl_sido'].split(' ');
        let locationTitle;

        locationCheckObj = locationCheck(locationsSeparate, lastLocationTitle, lastLocationSubtitle);
        locationTitle = locationTitleCheck(locationsSeparate, _deliveryLocations[i]);

        if (locationCheckObj.lastLocationTitleCheck || (locationsSeparate.length == 2 && locationCheckObj.lastLocationSubtitleCheck)) {
            if (locationCheckObj.lastLocationTitleCheck) {
                //맨 처음 제외하고 bar 생성
                if (lastLocationTitle != '') {
                    hrClone(deliveryModalClone);
                }
                //경기
                if (locationsSeparate.length == 2) {
                    gyeonggiClone = gyeonggiBodyClone();
                    deliveryModalClone.querySelector(".dm-delivery-body").appendChild(gyeonggiClone);

                    elementClone = gyeonggiElementClone();
                    gyeonggiClone.appendChild(elementClone);
                }
                //경기 이외 도시만
                else {
                    elementClone = nonGyeonggiElementClone();
                    deliveryModalClone.querySelector(".dm-delivery-body").appendChild(elementClone);
                }
            }
            if ((locationsSeparate.length == 2 && locationCheckObj.lastLocationSubtitleCheck)) {
                elementClone = gyeonggiSubElementClone();
                gyeonggiClone.appendChild(elementClone);
            }

            //공통
            deliveryElementRightClone = leftRightElementClone(elementClone, locationTitle);
        }
        rightsClone(_deliveryLocations[i], deliveryElementRightClone)

        lastLocationTitle = locationsSeparate[0];
        if (locationsSeparate.length == 2) {
            lastLocationSubtitle = locationsSeparate[1];
        }
    }
}

function locationCheck(_locationsSeparate, _lastLocationTitle, _lastLocationSubtitle) {
    let locationCheckObj = {
        'lastLocationTitleCheck': true,
        'lastLocationSubtitleCheck': true
    };
    //같은 지역에 속하는 경우 ex) 서울 중구 = 서울 종로구
    if (_locationsSeparate[0] == _lastLocationTitle) {
        locationCheckObj['lastLocationTitleCheck'] = false;
        if (_locationsSeparate[1] == _lastLocationSubtitle) {
            locationCheckObj['lastLocationSubtitleCheck'] = false;
        }
    }

    return locationCheckObj;
}

function locationTitleCheck(_locationsSeparate, _deliveryLocation) {
    let locationTitle;
    if (_locationsSeparate.length == 2) {
        locationTitle = _locationsSeparate[1];
    } else {
        locationTitle = _deliveryLocation['dl_sido'];
    }
    return locationTitle;
}

function deliveryClone(_rentCompanyName) {
    let deliveryModal = document.getElementsByClassName('dm-delivery-modal')[0];
    let deliveryModalClone = deliveryModal.cloneNode(true);

    deliveryModalClone.classList.remove('dm-delivery-modal');
    deliveryModalClone.classList.add('dm-delivery-modal-clone');
    deliveryModalClone.setAttribute('id', 'deliveryModal' + _rentCompanyName);

    return deliveryModalClone;
}

function hrClone(_deliveryModalClone) {
    let hr = document.getElementsByClassName('dm-hr')[0];
    let hrClone = hr.cloneNode(true);
    hrClone.classList.remove('dm-hr');
    hrClone.classList.add('dm-hr-clone');
    _deliveryModalClone.querySelector(".dm-delivery-body").appendChild(hrClone);
}

function gyeonggiBodyClone() {
    let gyeonggi = document.getElementsByClassName('dm-delivery-body-element-gyeonggi')[0];
    let gyeonggiClone = gyeonggi.cloneNode(true);
    gyeonggiClone.classList.remove('dm-delivery-body-element-gyeonggi');
    gyeonggiClone.classList.add('dm-delivery-body-element-gyeonggi-clone');

    return gyeonggiClone;
}

function gyeonggiElementClone() {
    let element = document.getElementsByClassName('dm-gyeonggi-element')[0];
    let elementClone = element.cloneNode(true);
    elementClone.classList.remove('dm-gyeonggi-element');
    elementClone.classList.add('dm-gyeonggi-element-clone');

    return elementClone;
}

function nonGyeonggiElementClone() {
    let element = document.getElementsByClassName('dm-delivery-body-element')[0];
    let elementClone = element.cloneNode(true);
    elementClone.classList.remove('dm-delivery-body-element');
    elementClone.classList.add('dm-delivery-body-element-clone');

    return elementClone;
}

function gyeonggiSubElementClone() {
    let element = document.getElementsByClassName('dm-gyeonggi-element')[0];
    let elementClone = element.cloneNode(true);
    elementClone.classList.remove('dm-gyeonggi-element');
    elementClone.classList.add('dm-gyeonggi-element-clone');

    return elementClone;
}

function leftRightElementClone(_elementClone, _locationTitle) {
    let deliveryElementLeft = document.getElementsByClassName('dm-delivery-body-element-left')[0];
    let deliveryElementLeftClone = deliveryElementLeft.cloneNode(true);
    deliveryElementLeftClone.classList.remove('dm-delivery-body-element-left');
    deliveryElementLeftClone.classList.add('dm-delivery-body-element-left-clone');
    deliveryElementLeftClone.textContent = _locationTitle;

    let deliveryElementRight = document.getElementsByClassName('dm-delivery-body-element-right')[0];
    let deliveryElementRightClone = deliveryElementRight.cloneNode(true);
    deliveryElementRightClone.classList.remove('dm-delivery-body-element-right');
    deliveryElementRightClone.classList.add('dm-delivery-body-element-right-clone');

    _elementClone.appendChild(deliveryElementLeftClone);
    _elementClone.appendChild(deliveryElementRightClone);

    return deliveryElementRightClone;
}

function rightsClone(_deliveryLocation, _deliveryElementRightClone) {
    let rightElements = document.getElementsByClassName('dm-right-elements')[0];
    let rightElementsClone = rightElements.cloneNode(true);
    rightElementsClone.classList.remove('dm-right-elements');
    rightElementsClone.classList.add('dm-right-elements-clone');

    rightElementsClone.querySelector('.dm-delivery-body-element-right-text').textContent = _deliveryLocation['dl_gu'];
    _deliveryElementRightClone.appendChild(rightElementsClone);
}