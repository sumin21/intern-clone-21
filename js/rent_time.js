export function f_rent_today_time(){
    const start_date = document.getElementsByClassName('cm-half-circle-start')[0];
    const end_date = document.getElementsByClassName('cm-half-circle-end')[0];
    let today = new Date();
    let hours = today.getHours(); // 시 (0~23)
    let minutes = today.getMinutes();  // 분 (0~59)
    let seconds = today.getSeconds();  // 초 (0~59)
    let milliseconds = today.getMilliseconds(); // 밀리초 (0~999)
    console.log(hours + ' ' + minutes + ' ' + seconds);
    
    let new_hours = hours;
    let new_minutes = minutes;
    let new_seconds = seconds;
    let new_milliseconds =milliseconds;

    if(minutes >= 0 && minutes <=29){
        new_minutes = 0;
        new_hours += 1;
        if(new_hours == 24){
            new_hours = 0;
        }
    }
    else{
        new_minutes = 30;
        new_hours += 1;
        if(new_hours == 24){
            new_hours = 0;
        }
    }
    new_hours = (new_hours < 10) ? '0'+new_hours : String(new_hours);
    new_minutes = (new_minutes < 10) ? '0'+new_minutes : String(new_minutes);
    console.log([new_hours, new_minutes]);
    return [new_hours, new_minutes];

}
//'11:00'
export function f_rent_time_select(start_str, default_str, idName){
    let fragment = document.createDocumentFragment();
    
    let start_str1 = start_str;
    let arr = start_str1.split(':');
    //시작 시간이 7시 보다 이르면 7시가 디폴트값
    if(Number(arr[0]) <7){
        start_str1 = '07:00';
        arr = start_str1.split(':');
    }
    
    console.log(arr);
    console.log(Number(arr[0]));
    console.log(Number(arr[1]));

    let check = false;
    if(f_bigTime(default_str, start_str)){
        check = true;
    }
    
    while(Number(arr[0]) != 22){
        
        var option_e = document.createElement('option');
        option_e.setAttribute('value', start_str1);
        option_e.textContent = start_str1;
        
        if(check){
            option_e.selected = true;
        }
        else if(default_str == start_str1){
            option_e.selected = true;
        }
        fragment.appendChild(option_e);

        arr[0] = (arr[1] == '00') ? arr[0] : f_NumberToStr(Number(arr[0])+1);
        arr[1] = (arr[1] == '00') ? '30' : '00';

        start_str1 = arr[0]+':'+arr[1];
        check = false;
    }
    option_e = document.createElement('option');
    option_e.setAttribute('value', start_str1);
    option_e.textContent = start_str1;
    if(check){
        option_e.selected = true;
    }
    else if(default_str == start_str1){
        option_e.selected = true;
    }
    fragment.appendChild(option_e);
    
    document.getElementById(idName).appendChild(fragment);

}

function f_NumberToStr(num){
    let str = (num < 10) ? '0'+num : String(num);
    return str;
}

function f_bigTime(s1, s2){
    let arr1 = s1.split(':');
    let arr2 = s2.split(':');
    if(Number(arr1[0] + arr1[1]) < Number(arr2[0] + arr2[1])){
        return true;
    }
    else return false;
}