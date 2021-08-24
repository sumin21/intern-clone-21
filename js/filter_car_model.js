export function filterCarModel() {
    //자동차 모델 input 클릭 이벤트
    document.querySelector("body").addEventListener('click', function () {
        let target = event.target;

        if (target == event.currentTarget.querySelector('#js_car_model_dropdown_btn')) {
            document.getElementById('js_car_model_dropdown').classList.add('show');
        } else {
            document.getElementById('js_car_model_dropdown').classList.remove('show');
        }
        //모바일
        if (target == event.currentTarget.querySelector('#js_car_model_dropdown_btn_mobile')) {
            document.getElementById('js_car_model_dropdown_mobile').classList.add('show');
        } else {
            document.getElementById('js_car_model_dropdown_mobile').classList.remove('show');
        }
    });
    //input element 클릭 이벤트
    let dropdownItems = document.getElementsByClassName('f-dropdown-item');
    const dropdownItemLen = dropdownItems.length;

    for (let i = 0; i < dropdownItemLen; i++) {
        dropdownItems[i].addEventListener('click', function () {
            let cModel = dropdownItems[i].dataset.cmodel;
            document.getElementById('js_car_model_dropdown_btn').value = cModel;
            document.getElementById('js_car_model_dropdown_btn_mobile').value = cModel;

            document.getElementById('js_car_model_dropdown').classList.remove('show');
            document.getElementById('js_car_model_dropdown_mobile').classList.remove('show');
            console.log('input click');
        });
    }


}