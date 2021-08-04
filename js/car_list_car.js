import axios from 'axios';
import { type } from 'jquery';
import {f_car_list_more_btn} from './car_list_more_btn.js';
import {f_delivery_modal_make} from './delivery_modal.js';
//import {f_reserved_cars} from './reserved_cars.js';

//차량 리스트에서 보일 수 있는 최대 차종 수
const max_car_num = 5;
//더보기 버튼 클릭 이벤트
const f_car_more_btn_event = () => {
    console.log('btn err test1',document.getElementById('js_car_list_more_btn'));
    console.log('btn err test2', document.getElementsByClassName(`non-car-first`)[0]);
    let last_fist_id = document.getElementsByClassName(`non-car-first`)[0].id;
    let car_index = Number(last_fist_id.split('_')[3]);//js_car_index_6 -> 6
    //let j=none_car_first;
    document.getElementsByClassName(`non-car-first`)[0].classList.remove('non-car-first');
    console.log('btn test first index:',car_index);
    
    let j=car_index;
    for (j; j<(car_index+max_car_num); j++){
        console.log('btn test first index2:',j);
        console.log('btn test car index:',car_index);
        if(document.getElementById(`js_car_index_${j}`) == null){
            
            console.log('btn no test!!!!!',(j));
            document.getElementById('js_car_list_more_btn').style.display = 'none';

            

            return;
        }
        document.getElementById(`js_car_index_${j}`).style.display = 'block';

    };

    //다음번의 첫 차가 없다면 (car_kind_num가 max_car_num의 배수일때)
    if(!document.getElementById(`js_car_index_${j}`)){
        
        document.getElementById('js_car_list_more_btn').style.display = 'none';
    }
    else{
        document.getElementById(`js_car_index_${j}`).classList.add('non-car-first');
    }
    
};



//차량 리스트 생성
export function f_car_arr(car_list_arr,location_e, startTime_e, endTime_e){
    
    let last_car_name;
    let last_rent_company_name;
    let last_oil_year;
    let last_oil_name;
    let last_driver_age;
    //y/n
    let last_car_check = true;
    let last_rent_company_check = true;
    let last_oil_check = true;
    let last_driver_age_check = false;

    let car_kind_num = 0;

    let one_car_prices = [];
    
    let car;
    let car_clone;
    let rent_company;
    let rent_company_clone;
    let oil;
    let oil_clone;
    let plus_age;
    let plus_age_clone;
    let reserved_car;
    //차량 리스트 받아오기 (객체 하나씩)
    for(let i=0; i<car_list_arr.length; i++){
        //바로 이전의 객체와 차 name이 같은지
        if(car_list_arr[i]['c_name'] == last_car_name){
            console.log(11);
            last_car_check = false;
            last_rent_company_check = true;
            last_oil_check = true;
            last_driver_age_check = false;
            console.log(car_list_arr[i]['a_name'] ,last_rent_company_name);
            //바로 이전의 객체와 렌터카 업체 이름이 같은지
            if(car_list_arr[i]['a_name'] == last_rent_company_name){
                console.log(21);
                last_rent_company_check = false;
                last_oil_check = true;
                last_driver_age_check = false;
                //바로 이전의 객체와 oil이 같은지
                if(car_list_arr[i]['c_production_year'] == last_oil_year && car_list_arr[i]['c_fuel'] == last_oil_name){
                    console.log(31);
                    last_oil_check = false;
                    last_driver_age_check = false;
                    //바로 이전의 객체와 보험 최소 나이가 같은지
                    if(car_list_arr[i]['c_driver_age'] == last_driver_age){
                        console.log(41);           
                        last_driver_age_check = false;
                    }
                    else{
                        console.log(42);          
                        last_driver_age_check = true;
                    }
                }
                else{
                    console.log(32);
                    last_oil_check = true;
                    last_driver_age_check = false; 
                }
            }
            else{
                console.log(22);   
                last_rent_company_check = true;
                last_oil_check = true;
                last_driver_age_check = false;               
            }            
        }
        else{
            console.log(12);
            last_car_check = true;
            last_rent_company_check = true;
            last_oil_check = true;
            last_driver_age_check = false;           
        }
         
        //최저가 ~ 최고가
        one_car_prices.push(car_list_arr[i]['car_price']);
        one_car_prices.sort(function(a, b) { // 오름차순
            return a - b;
        })
        console.log(one_car_prices);
        console.log(typeof(car_list_arr[i]['car_price']));
        
        //차종마다 한번씩
        if(last_car_check){
            
            one_car_prices = [car_list_arr[i]['car_price']];
            
            car_kind_num++;
            //console.log(car_list_arr[1]['c_name']);

            car = document.getElementsByClassName('clc-car-list-component')[0];
            //console.log(car);
            car_clone = car.cloneNode(true);

            car_clone.classList.remove('clc-car-list-component');
            car_clone.classList.add('clc-car-list-component-clone');
            car_clone.setAttribute('id', `js_car_index_${car_kind_num}`);
            

            document.getElementById('js_car_list').appendChild(car_clone);
            
            car_clone.querySelector(".clc-discount").textContent = '3초 가입 시 추가 할인!';
            car_clone.querySelector(".clc-car-text-kinds-text").textContent = car_list_arr[i]['c_type'];
            car_clone.querySelector(".clc-car-text-name").textContent = car_list_arr[i]['c_name'];
            car_clone.querySelector(".clc-car-text-explan").textContent = car_list_arr[i]['c_description'];

            car_clone.querySelector(".clc-person").lastChild.textContent = car_list_arr[i]['c_max_number_of_people']+'인';
            car_clone.querySelector(".clc-auto").lastChild.textContent = car_list_arr[i]['c_gear'];
            car_clone.querySelector(".clc-baggage").lastChild.textContent = car_list_arr[i]['c_number_of_load']+'개';;
            car_clone.querySelector(".clc-door").lastChild.textContent = car_list_arr[i]['c_number_of_door']+'개';;
            if(car_list_arr[i]['c_air_conditioner_or_not']=='y'){
                car_clone.querySelector(".clc-aircon-box").style.display = 'block';
            }
            
            f_reserved_cars(car_list_arr[i]['c_name'],location_e,startTime_e,endTime_e,reserved_car,car_clone);
                    
        }
        //최저가 ~ 최고가
        if(one_car_prices[0] == one_car_prices[one_car_prices.length-1]){
            car_clone.querySelector(".clc-car-text-money").textContent = one_car_prices[0].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+'원';
            
        }
        else{
            car_clone.querySelector(".clc-car-text-money").textContent = one_car_prices[0].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '~' + one_car_prices[one_car_prices.length-1].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+'원';
        }
       
        //한 차종의 렌터카 업체마다 한번씩
        if(last_rent_company_check){
            //렌트카
            
            rent_company = document.getElementsByClassName('clc-rent')[0];
            
            rent_company_clone = rent_company.cloneNode(true);

            rent_company_clone.classList.remove('clc-rent');
            rent_company_clone.classList.add('clc-rent-clone');

            car_clone.querySelector(".clc-car-list-component-rent").appendChild(rent_company_clone);

            
            rent_company_clone.querySelector(".clc-name").textContent = car_list_arr[i]['a_name'];
            rent_company_clone.querySelector(".clc-umo").textContent = car_list_arr[i]['a_info'];
            rent_company_clone.querySelector(".clc-score").textContent = car_list_arr[i]['a_grade'];
            rent_company_clone.querySelector(".clc-rent-company-reserve").textContent = '예약수 ' + car_list_arr[i]['a_number_of_reservation']+'+';
            
            rent_company_clone.querySelector(".clc-delivery").setAttribute('data-target',`#deliveryModal${car_list_arr[i]['a_name']}`);
 
            f_delivery_modal_make(car_list_arr[i]['a_name'],rent_company_clone.querySelector(".clc-delivery"),rent_company_clone);          
        }
        //그 렌터카 업체에서 oil마다 한번씩
        if(last_oil_check){
            //oil

            oil = document.getElementsByClassName('clc-rent-option-container')[0];
            
            oil_clone = oil.cloneNode(true);

            oil_clone.classList.remove('clc-rent-option-container');
            oil_clone.classList.add('clc-rent-option-container-clone');
            
            rent_company_clone.appendChild(oil_clone);
            
            oil_clone.querySelector(".clc-year").textContent = car_list_arr[i]['c_production_year'];
            oil_clone.querySelector(".clc-oil").textContent = car_list_arr[i]['c_fuel'];
            //할인 전 원가 (필요 x)
            // oil_clone.querySelector(".clc-rent-option-original-money").textContent = car_list_arr[i]['car_price'];
            oil_clone.querySelector(".clc-old").textContent = '만 '+car_list_arr[i]['c_driver_age']+'세 이상';
            oil_clone.querySelector(".clc-discount-result").textContent = car_list_arr[i]['car_price'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+'원';//
        
        }
        //21 이외 추가
        if(last_driver_age_check){
            //23세 이상 추가           
            oil_clone.querySelector('.clc-line').style.display = 'block';
            
            plus_age = document.getElementsByClassName('clc-rent-option-text-plus')[0];
            
            plus_age_clone = plus_age.cloneNode(true);

            plus_age_clone.classList.remove('clc-rent-option-text-plus');
            plus_age_clone.classList.add('clc-rent-option-text-plus-clone');
                 
            oil_clone.querySelector(".clc-rent-option").appendChild(plus_age_clone);

            plus_age_clone.querySelector(".clc-plus-old").textContent = '만 '+car_list_arr[i]['c_driver_age']+'세 이상';
            plus_age_clone.querySelector(".clc-plus-discount-result").textContent = car_list_arr[i]['car_price'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+'원';//
                     
        }
        
        last_car_name = car_list_arr[i]['c_name'];//
        last_rent_company_name = car_list_arr[i]['a_name'];
        last_oil_year= car_list_arr[i]['c_production_year'];
        last_oil_name= car_list_arr[i]['c_fuel'];
        last_driver_age = car_list_arr[i]['c_driver_age'];
        
    }
    //차종 개수 (차 이름 개수)
    return car_kind_num;
    
}

//차량 리스트 서버로부터 받아와서 조건별로 리스트 생성함수 불러오기
export function f_car_list_car(order_e, type_e, location_e, startTime_e, endTime_e, elec_car){
    
    //더 보기 클릭 이벤트
    document.getElementById('js_car_list_more_btn').addEventListener('click',f_car_more_btn_event);

    //이미 차량 리스트가 나열되어 있으면 다 지우고
    while(document.getElementById(`js_car_list`).hasChildNodes()) { 
        document.getElementById(`js_car_list`).removeChild( document.getElementById(`js_car_list`).firstChild ); 
    }
    
    

    console.log(order_e, type_e, location_e, startTime_e, endTime_e);
    //데이터 받아오기
    axios.get("http://ec2-13-125-238-123.ap-northeast-2.compute.amazonaws.com:3000/cars", {
        params: {
            location: location_e,
            startTime: startTime_e,
            endTime:endTime_e
        }}).then((Response)=>{
            console.log('clear');
            console.log(Response.data);
            const car_arr = Response.data;
            const elec_cars = f_elec_cars(car_arr);
            //차종 arr
            let cars_names = f_cars_name_division(car_arr);
            console.log('cars_names: ', cars_names);
            //차종 반응형으로
            if(car_arr.length){
                let cars_division = f_cars_type_division(car_arr);
                console.log('cars_division:',cars_division);
                if(elec_cars.length == 0){
                    document.getElementById('js_elec').style.display = 'none';
                }
                else{
                    document.getElementById('js_elec').style.display = 'block';
                }
                if(!('경형' in cars_division) && !('소형' in cars_division)){
                    document.getElementById('js_small').style.display = 'none';
                }
                else{
                    document.getElementById('js_small').style.display = 'block';
                }
                if(!('중형' in cars_division) && !('대형' in cars_division)){
                    document.getElementById('js_big').style.display = 'none';
                }
                else{
                    document.getElementById('js_big').style.display = 'block';
                }
                if(!('준중형' in cars_division)){
                    document.getElementById('js_middle').style.display = 'none';
                }
                else{
                    document.getElementById('js_middle').style.display = 'block';
                }
                if(!('SUV' in cars_division)){
                    document.getElementById('js_suv').style.display = 'none';
                }
                else{
                    document.getElementById('js_suv').style.display = 'block';
                }
                if(!('RV' in cars_division)){
                    document.getElementById('js_rv').style.display = 'none';
                }
                else{
                    document.getElementById('js_rv').style.display = 'block';
                }
                if(!('수입' in cars_division)){
                    document.getElementById('js_import').style.display = 'none';
                }
                else{
                    document.getElementById('js_import').style.display = 'block';
                }

            }
            //모든 차량이 없는 경우
            else{
                document.getElementById('js_elec').style.display = 'none';
                document.getElementById('js_small').style.display = 'none';
                document.getElementById('js_big').style.display = 'none';
                document.getElementById('js_middle').style.display = 'none';
                document.getElementById('js_suv').style.display = 'none';
                document.getElementById('js_rv').style.display = 'none';
                document.getElementById('js_import').style.display = 'none';
            }
            
            
            //type이 전체인 경우
            if(type_e == '전체'){
                
                console.log('!!!!!!!!!!!!!!!!',order_e);
                
                //차량 없을 떄
                if(car_arr.length == 0){
                    document.getElementById('js_no_cars').style.display = 'block';
                    console.log('없오');
                }
                //차량 있을 떄
                else{
                    document.getElementById('js_no_cars').style.display = 'none';
                    cars_names = f_cars_name_division(car_arr);
                    let cars_name_num = Object.keys(cars_names).length;
                    console.log('more btn test2:', cars_name_num);
                    
                    //가격순
                    if(order_e=='price'){
                        let cars_price_sort = f_car_price_sort(car_arr);
                        let new_sort = [];
                        cars_price_sort.forEach((value, index, array)=>{
                            let rent_sort;
                            //한 차량별
                            rent_sort = car_arr.slice(cars_names[cars_price_sort[index][0]][0],cars_names[cars_price_sort[index][0]][1]+1);
                            console.log('all price rent_sort:',rent_sort);
                            
                            
                            let a_car_price_sort = f_a_car_price_sort(rent_sort);
                            
                            let new_a_car_price_sort = [];
                            
                            a_car_price_sort.forEach((value, index, array)=>{
                                for(let k=0; k<a_car_price_sort[index][1].length-1; k++){
                                    let slices = rent_sort.slice(a_car_price_sort[index][1][k][1][0],a_car_price_sort[index][1][k][1][1]+1);
                                    console.log('slices: ', slices);

                                    slices = slices.sort(function(a,b){
                                        return a.car_price-b.car_price;
                                    });

                                    slices.forEach(function(element) {
                                        new_a_car_price_sort.push(element);
                                    });
                                }
                            })
                            //하나의 arr로 합치기 (new_sort)
                            for (const item of new_a_car_price_sort){
                                new_sort.push(item);
                                
                            }
                            console.log('final!!', new_a_car_price_sort);
                            
                            
                            
                        })
                        console.log('zz', new_sort);
                        cars_names = f_cars_name_division(new_sort);
                        f_car_arr(new_sort,location_e,startTime_e,endTime_e);
                        console.log('cars_names',cars_names);
                    }
                    //차종순
                    else{
                        f_car_arr(car_arr,location_e,startTime_e,endTime_e);
                        console.log(car_arr);
                    }
                }
                
            }//전기인 경우
            else if(elec_car != 0){//전기
                console.log('전기!!!!!!!!!!');
                
                console.log('전기!!!!', elec_cars);
                if(elec_cars.length == 0){
                    document.getElementById('js_no_cars').style.display = 'block';
                    console.log('없오');
                }
                else{
                    document.getElementById('js_no_cars').style.display = 'none';
                    cars_names = f_cars_name_division(elec_cars);
                    let new_sort = [];
                    if(order_e=='price'){
                        
                        let cars_price_sort = f_car_price_sort(elec_cars);

                        cars_price_sort.forEach((value, index, array)=>{
                            let rent_sort;
                            //한 차량별
                            rent_sort = elec_cars.slice(cars_names[cars_price_sort[index][0]][0],cars_names[cars_price_sort[index][0]][1]+1);
                            console.log('rent_sort:',rent_sort);
                            
                            
                            let a_car_price_sort = f_a_car_price_sort(rent_sort);
                            
                            let new_a_car_price_sort = [];
                            
                            a_car_price_sort.forEach((value, index, array)=>{
                                for(let k=0; k<a_car_price_sort[index][1].length-1; k++){
                                    let slices = rent_sort.slice(a_car_price_sort[index][1][k][1][0],a_car_price_sort[index][1][k][1][1]+1);

                                    slices = slices.sort(function(a,b){
                                        return a.car_price-b.car_price;
                                    });

                                    slices.forEach(function(element) {
                                        new_a_car_price_sort.push(element);
                                    });
                                }
                            })
                            for (const item of new_a_car_price_sort){
                                new_sort.push(item);
                                
                            }
                            console.log('test!!', new_a_car_price_sort);
                            

                        })
                        cars_names = f_cars_name_division(new_sort);
                        f_car_arr(new_sort,location_e,startTime_e,endTime_e);
                    }
                    else{
                        f_car_arr(elec_cars,location_e,startTime_e,endTime_e);
                    }
                }
               
            }
            //전체, 전기 이외
            else{
                const car_types = f_cars_type_division(car_arr);
                let types = type_e.split(' ');
                console.log(types+'!!');
                console.log('car_types_test:', car_types);
                //경소형, 중대형 경우
                if(types.length > 1){

                    //차량 리스트 있든 없든
                    document.getElementById('js_no_cars').style.display = 'none';

                    console.log(111);
                    //경형&소형 or 중형&대형 인 경우
                    if((types[1] in car_types) && (types[0] in car_types)){
                        console.log(222);

                        const types_1_arr = car_arr.slice(car_types[types[1]][0],car_types[types[1]][1]+1);//소형
                        const types_2_arr = car_arr.slice(car_types[types[0]][0],car_types[types[0]][1]+1);//경형
                        //merge
                        for (const item of types_1_arr){
                            types_2_arr.push(item);
                            
                        }
                        cars_names = f_cars_name_division(types_2_arr);
                        console.log('merge',types_2_arr);
                        if(order_e=='price'){
                            let cars_price_sort = f_car_price_sort(types_2_arr);
                            let new_sort = [];
                            cars_price_sort.forEach((value, index, array)=>{
                                let rent_sort;
                                //한 차량별
                                rent_sort = types_2_arr.slice(cars_names[cars_price_sort[index][0]][0],cars_names[cars_price_sort[index][0]][1]+1);
                                console.log('rent_sort:',rent_sort);
                                
                                
                                let a_car_price_sort = f_a_car_price_sort(rent_sort);
                                
                                let new_a_car_price_sort = [];
                                console.log('!!!!',a_car_price_sort);
                                a_car_price_sort.forEach((value, index, array)=>{
                                    for(let k=0; k<a_car_price_sort[index][1].length-1; k++){
                                        let slices = rent_sort.slice(a_car_price_sort[index][1][k][1][0],a_car_price_sort[index][1][k][1][1]+1);
                                        slices = slices.sort(function(a,b){
                                            return a.car_price-b.car_price;
                                        });
                                        slices.forEach(function(element) {
                                            new_a_car_price_sort.push(element);
                                        });
                                    }
                                    
                                })
                                for (const item of new_a_car_price_sort){
                                    new_sort.push(item);
                                    
                                }
                                console.log('test!!', new_a_car_price_sort);
                                

                            })
                            cars_names = f_cars_name_division(new_sort);
                            f_car_arr(new_sort,location_e,startTime_e,endTime_e);                                      
                        }
                        else{
                            f_car_arr(types_2_arr,location_e,startTime_e,endTime_e);

                        }
                    }
                    //경소형에서 한종류(경형) or 중대형에서 한종류(대형) 있는 경우
                    else if(types[1] in car_types){
                        console.log(333);
                        let new_car_arr = car_arr.slice(car_types[types[1]][0],car_types[types[1]][1]+1);
                        cars_names = f_cars_name_division(new_car_arr);
                        if(order_e=='price'){
                            
                            let cars_price_sort = f_car_price_sort(new_car_arr);
                            let new_sort = [];
                            cars_price_sort.forEach((value, index, array)=>{
                                let rent_sort;
                                //한 차량별
                                rent_sort = new_car_arr.slice(cars_names[cars_price_sort[index][0]][0],cars_names[cars_price_sort[index][0]][1]+1);
                                console.log('rent_sort:',rent_sort);
                                
                                
                                let a_car_price_sort = f_a_car_price_sort(rent_sort);
                                
                                let new_a_car_price_sort = [];
                                console.log('!!!!',a_car_price_sort);
                                a_car_price_sort.forEach((value, index, array)=>{
                                    for(let k=0; k<a_car_price_sort[index][1].length-1; k++){
                                        let slices = rent_sort.slice(a_car_price_sort[index][1][k][1][0],a_car_price_sort[index][1][k][1][1]+1);
                                        slices = slices.sort(function(a,b){
                                            return a.car_price-b.car_price;
                                        });
                                        slices.forEach(function(element) {
                                            new_a_car_price_sort.push(element);
                                        });
                                    }
                                })
                                for (const item of new_a_car_price_sort){
                                    new_sort.push(item);
                                    
                                }
                                console.log('test!!', new_a_car_price_sort);
                                

                            })
                            cars_names = f_cars_name_division(new_sort);
                            f_car_arr(new_sort,location_e,startTime_e,endTime_e);
                        }
                        else{
                            f_car_arr(new_car_arr,location_e,startTime_e,endTime_e);

                        }
                    }
                    //경소형에서 한종류(소형) or 중대형에서 한종류(중형) 있는 경우 (위와 반대)
                    else if(types[0] in car_types){
                        console.log(444);
                        let new_car_arr = car_arr.slice(car_types[types[0]][0],car_types[types[0]][1]+1);
                        cars_names = f_cars_name_division(new_car_arr);
                        if(order_e=='price'){
 
                            let cars_price_sort = f_car_price_sort(new_car_arr);
                            let new_sort = [];

                            cars_price_sort.forEach((value, index, array)=>{
                                let rent_sort;
                                //한 차량별
                                rent_sort = new_car_arr.slice(cars_names[cars_price_sort[index][0]][0],cars_names[cars_price_sort[index][0]][1]+1);
                                console.log('rent_sort:',rent_sort);
                                
                                
                                let a_car_price_sort = f_a_car_price_sort(rent_sort);
                                
                                let new_a_car_price_sort = [];
                                console.log('!!!!',a_car_price_sort);
                                a_car_price_sort.forEach((value, index, array)=>{
                                    
                                    for(let k=0; k<a_car_price_sort[index][1].length-1; k++){
                                        let slices = rent_sort.slice(a_car_price_sort[index][1][k][1][0],a_car_price_sort[index][1][k][1][1]+1);
                                        slices = slices.sort(function(a,b){
                                            return a.car_price-b.car_price;
                                        });
                                        slices.forEach(function(element) {
                                            new_a_car_price_sort.push(element);
                                        });
                                    }
                                })
                                for (const item of new_a_car_price_sort){
                                    new_sort.push(item);
                                    
                                }
                                console.log('test!!', new_a_car_price_sort);
                                

                            })
                            cars_names = f_cars_name_division(new_sort);
                            f_car_arr(new_sort,location_e,startTime_e,endTime_e);
                        }
                        else{
                            f_car_arr(new_car_arr,location_e,startTime_e,endTime_e);
                        }
                    }
                    
                    //차량리스트가 없는 경우
                    else{
                        console.log(555);
                        document.getElementById('js_no_cars').style.display = 'block';
                        console.log('없오');
                    }
                }
                //준중형, suv, 승합, 수입 경우
                else{
                    //차량 리스트 있는 경우
                    if(types[0] in car_types){
                        let new_car_arr = car_arr.slice(car_types[types[0]][0],car_types[types[0]][1]+1);
                        cars_names = f_cars_name_division(new_car_arr);

                        if(order_e=='price'){
                            //해당 차종만 arr
                            let cars_price_sort = f_car_price_sort(new_car_arr);
                            let new_sort = [];
                            cars_price_sort.forEach((value, index, array)=>{
                                let rent_sort;
                                //한 차량별
                                rent_sort = new_car_arr.slice(cars_names[cars_price_sort[index][0]][0],cars_names[cars_price_sort[index][0]][1]+1);
                                console.log('rent_sort:',rent_sort);
                                
                                
                                let a_car_price_sort = f_a_car_price_sort(rent_sort);
                                
                                let new_a_car_price_sort = [];
                                
                                a_car_price_sort.forEach((value, index, array)=>{
                                    for(let k=0; k<a_car_price_sort[index][1].length-1; k++){
                                        let slices = rent_sort.slice(a_car_price_sort[index][1][k][1][0],a_car_price_sort[index][1][k][1][1]+1);
                                        slices = slices.sort(function(a,b){
                                            return a.car_price-b.car_price;
                                        });
                                        slices.forEach(function(element) {
                                            new_a_car_price_sort.push(element);
                                        });
                                    }
                                })
                                for (const item of new_a_car_price_sort){
                                    new_sort.push(item);
                                    
                                }
                                console.log('test!!', new_a_car_price_sort);
                                

                            })
                            cars_names = f_cars_name_division(new_sort);
                            f_car_arr(new_sort,location_e,startTime_e,endTime_e);
                        }
                        else{
                            f_car_arr(new_car_arr,location_e,startTime_e,endTime_e);

                        }
                        
                        document.getElementById('js_no_cars').style.display = 'none';
                    }
                    //차량리스트 없는 경우
                    else{

                        document.getElementById('js_no_cars').style.display = 'block';
                        console.log('없오');
                    }
                }
                   
                
            }
            console.log('final_cars_names', cars_names);
            f_car_more_btn(Object.keys(cars_names).length);
            
        }).catch((Error)=>{
            console.log(Error);
        });


      
}
//차종 2개 이상이면 more btn 보이게 (아직 서버에 차 데이터가 많이 없음)
function f_car_more_btn(car_kind_num){
    
    
    let none_car_first = max_car_num+1; //none되는 start_index (1:보이는 첫번째index)
    console.log('차종 개수' + car_kind_num);
    if(car_kind_num >= max_car_num){
        document.getElementById('js_car_list_more_btn').style.display = 'block';
        
        document.getElementById(`js_car_index_${none_car_first}`).classList.add('non-car-first');
        for(let i=none_car_first; i<=car_kind_num;i++){
            document.getElementById(`js_car_index_${i}`).style.setProperty("display", "none", "important");
            
            console.log('!!!!!!!!!!',document.getElementById(`js_car_index_${i}`));
        }
    }
    
    else{
        document.getElementById('js_car_list_more_btn').style.display = 'none';
    }


}

//마감된 차량 불러오기
function f_reserved_cars(carName,location,startTime,endTime, reserved_car,car_clone){

    
    axios.get("http://ec2-13-125-238-123.ap-northeast-2.compute.amazonaws.com:3000/reserved_cars", {
                    params: {
                        carName: carName,
                        location: location,
                        startTime: startTime,
                        endTime: endTime
                    }}).then((Response)=>{
                        
                        console.log('reserved car!!!:',carName,Response.data);
                        let reserved_cars = Response.data;
                        //마감 차량 1 이상일때
                        if(reserved_cars['number_of_affiliate'] > 0){
                            reserved_car = document.getElementsByClassName('clc-reserved-car-container')[0];
                            let reserved_car_clone = reserved_car.cloneNode(true);
                            reserved_car_clone.style.display = 'block';
                            reserved_car_clone.classList.remove('clc-reserved-car-container');
                            reserved_car_clone.classList.add('clc-reserved-car-container-clone');
                            car_clone.appendChild(reserved_car_clone);

                            reserved_car_clone.querySelector(".clc-reserved-car-text").textContent = `이외에 ${reserved_cars['number_of_affiliate']}개 업체에서 ${reserved_cars['number_of_car']}대의 차량은 이미 모두 마감되었습니다.`;
            
                        }
                    }).catch((Error)=>{
                        console.log(Error);
                    });
                

}
//차종 type 선택하는대로 분류돼서 나오게
function f_cars_type_division(cars){
    let car_types = {};
    console.log(cars);
    if(cars.length){

        let car_type_name = '';
        for(let i=0; i<cars.length; i++){

            console.log('!!'+cars[i]['c_type']);
            //새로운 type
            if(cars[i]['c_type'] != car_type_name){
                car_types[cars[i]['c_type']] = [];
                car_types[cars[i]['c_type']].push(i);
                
                if(car_type_name != ''){
                    car_types[car_type_name].push(i-1);
                }
            }
            car_type_name = cars[i]['c_type'];

        }
        car_types[car_type_name].push(cars.length-1);
       
        console.log("cars_type_division: ",car_types);
    }
    return car_types;
}
//전기차
function f_elec_cars(cars){
    let elec_cars = [];
    for(let i=0; i<cars.length; i++){
        if(cars[i]['c_fuel'] == '전기'){
            elec_cars.push(cars[i]);
        }
    }
    console.log(elec_cars);
    return elec_cars;
}
//차종별로 price 정렬
function f_car_price_sort(cars){
    let cars_price_sort = {};
    let new_cars_price_sort = [];
    let car_name = '';
    for(let i=0; i<cars.length; i++){
        if(cars[i]['c_name'] != car_name){
            cars_price_sort[cars[i]['c_name']] = [];
            
        }
        cars_price_sort[cars[i]['c_name']].push(cars[i]['car_price']);
        car_name = cars[i]['c_name'];

    }
    console.log(cars_price_sort);
    for (var key in cars_price_sort){
        cars_price_sort[key].sort(function(a, b) { // 오름차순
            return a - b;
        })
    }
    
    for (var key in cars_price_sort){
        new_cars_price_sort.push([key, cars_price_sort[key]]);  
    }
    new_cars_price_sort.sort(function(a,b){
        return a[1][0]-b[1][0];
    });
    
    
    console.log('cars_price_sort: ',new_cars_price_sort);
    return new_cars_price_sort;//sort[i][0] = c_name
    

}
//차이름 선택하는대로 분류돼서 나오게
function f_cars_name_division(cars){
    let car_types = {};
    if(cars.length){
        
        let car_type_name = '';
        for(let i=0; i<cars.length; i++){

            console.log('!!'+cars[i]['c_name']);//이거 이용해서 type 바 만들기
            //새로운 type
            if(cars[i]['c_name'] != car_type_name){
                car_types[cars[i]['c_name']] = [];
                car_types[cars[i]['c_name']].push(i);
                if(car_type_name != ''){
                    car_types[car_type_name].push(i-1);
                }
            }
            car_type_name = cars[i]['c_name'];

        }
        car_types[car_type_name].push(cars.length-1);
        // for (var key in car_types) { 
        //     //console.log(car_types[key]); 
        // }

        console.log("cars_name_division: ",car_types);
    }
    return car_types;
}


//한 차종 내에서 price 순으로 sort
function f_a_car_price_sort(a_car_arr){
    let a_car_price_sort = {};
    let rent_company_name = '';
    let oil_name = '';

    let oil_prices;
    let oil_min_price;
    
    let prices;
    for(let i=0; i<a_car_arr.length; i++){
        console.log('a_car_price_sort:' , a_car_price_sort);
        if(a_car_arr[i]['a_name'] != rent_company_name){
            a_car_price_sort[a_car_arr[i]['a_name']] = {};
            
        }
        //oil
        if((a_car_arr[i]['a_name'] != rent_company_name) || (a_car_arr[i]['c_production_year']+a_car_arr[i]['c_fuel']) != oil_name){
            
            a_car_price_sort[a_car_arr[i]['a_name']][(a_car_arr[i]['c_production_year']+a_car_arr[i]['c_fuel'])] = [];
            a_car_price_sort[a_car_arr[i]['a_name']][(a_car_arr[i]['c_production_year']+a_car_arr[i]['c_fuel'])].push(i);
            console.log('oil_err: ', oil_name);
            if(oil_name != ''){
                console.log('push_err!!!!!!', a_car_price_sort);
                console.log('push_err2', a_car_price_sort[rent_company_name][oil_name]);
                
                a_car_price_sort[rent_company_name][oil_name].push(i-1);
                //그 oil에서 가장 최솟값
                oil_min_price = Math.min.apply(null, oil_prices);
                a_car_price_sort[rent_company_name][oil_name].push(oil_min_price);
            }
            //새 oil 가격들
            oil_prices = [];
        }

        oil_prices.push(a_car_arr[i]['car_price']);
        //렌터카 업체 가격 구하기
        if(a_car_arr[i]['a_name'] != rent_company_name){
            if(rent_company_name != ''){
                prices = [];
                for(let j in a_car_price_sort[rent_company_name]){
                    prices.push(a_car_price_sort[rent_company_name][j][a_car_price_sort[rent_company_name][j].length-1]);
                }
                console.log('prices:', prices);
                //한 렌터카 업체가 가지는 가장 최솟값
                a_car_price_sort[rent_company_name]['rent_company_min_price'] = [Math.min.apply(null, prices)];
            }
        }
        rent_company_name = a_car_arr[i]['a_name'];
        oil_name = a_car_arr[i]['c_production_year']+a_car_arr[i]['c_fuel'];
        console.log('oil_name: ',oil_name);
    }
    //마지막 element
    a_car_price_sort[rent_company_name][oil_name].push(a_car_arr.length-1);

    //그 oil에서 가장 최솟값
    oil_min_price = Math.min.apply(null, oil_prices);
    a_car_price_sort[rent_company_name][oil_name].push(oil_min_price);

    prices = [];
    for(let k in a_car_price_sort[rent_company_name]){
        prices.push(a_car_price_sort[rent_company_name][k][a_car_price_sort[rent_company_name][k].length-1]);
    }
    console.log('prices:', prices);
    //한 렌터카 업체가 가지는 가장 최솟값
    a_car_price_sort[rent_company_name]['rent_company_min_price'] = [Math.min.apply(null, prices)];

    let new_rent_company_sort = [];
    let new_oil_sort;

    //렌터카 가격순으로 나열
    for(let rent_company in a_car_price_sort){
        new_oil_sort = [];
        for(let oil in a_car_price_sort[rent_company]){
            new_oil_sort.push([oil, a_car_price_sort[rent_company][oil]]);
        }
        new_rent_company_sort.push([rent_company, new_oil_sort]);
        
    }
    
    
    new_rent_company_sort.sort(function(a,b){
        
        return a[1][1][1]-b[1][1][1];
    });
    
    console.log('new_rent_company_sort:', new_rent_company_sort);

    return new_rent_company_sort;
}
