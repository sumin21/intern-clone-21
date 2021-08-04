export function f_car_list_more_btn(){
    let fragment = document.createDocumentFragment();
    var button_e = document.createElement('button');
    button_e.classList.add('cl-more-button');
    button_e.id = 'js_car_list_more_btn';
    button_e.textContent = '더 보기';
    fragment.appendChild(button_e);
    document.getElementById('js_car_list').appendChild(fragment);
}