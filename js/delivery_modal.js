import axios from 'axios';

function f_delivery_modal(delivery_locations, rent_company_name,rent_company_clone){
    
    let delivery_modal = document.getElementsByClassName('dm-delivery-modal')[0];
            
    let delivery_modal_clone = delivery_modal.cloneNode(true);

    delivery_modal_clone.classList.remove('dm-delivery-modal');
    delivery_modal_clone.classList.add('dm-delivery-modal-clone');
    delivery_modal_clone.setAttribute('id','deliveryModal'+rent_company_name);
    rent_company_clone.querySelector(".clc-rent-company-name").appendChild(delivery_modal_clone);


    let last_location_title = '';
    let last_location_title_check = true;
    let last_location_subtitle = '';
    let last_location_subtitle_check = true; //경기 경우만

    let gyeonggi;
    let gyeonggi_clone;
    let element;
    let element_clone;
    let delivery_element_left;
    let delivery_element_left_clone;
    let delivery_element_right;
    let delivery_element_right_clone;

    for(let i=0; i<delivery_locations.length; i++){
        
        let locations_separate = delivery_locations[i]['dl_sido'].split(' ');
        let location_title;
        
        //같은 지역에 속하는 경우 ex) 서울 중구 = 서울 종로구
        if(locations_separate[0] == last_location_title){
            console.log('ocation title 같음');
            last_location_title_check = false;
            if(locations_separate[1] != last_location_subtitle){
                last_location_subtitle_check = true;
            }
            else{
                last_location_subtitle_check = false;
            }
        }
        else{
            console.log('ocation title 다름');
            last_location_title_check = true;
        }

        if(locations_separate.length == 2){
            location_title = locations_separate[1];
        }
        else{
            location_title = delivery_locations[i]['dl_sido'];
        }
        
        if(last_location_title_check || (locations_separate.length == 2 && last_location_subtitle_check)){
            
            
            if(last_location_title_check){
                //맨 처음에는 위에 바 없애기
                
                if(last_location_title != ''){
                    let hr_e = document.getElementsByClassName('dm-hr')[0];
                    let hr_clone = hr_e.cloneNode(true);
                    hr_clone.classList.remove('dm-hr');
                    hr_clone.classList.add('dm-hr-clone');

                    delivery_modal_clone.querySelector(".dm-delivery-body").appendChild(hr_clone);


                }

                //경기
                console.log('배달가능'+locations_separate);
                if(locations_separate.length == 2){
                    console.log('delivery 1111');
                    gyeonggi = document.getElementsByClassName('dm-delivery-body-element-gyeonggi')[0];
                    gyeonggi_clone = gyeonggi.cloneNode(true);
                    gyeonggi_clone.classList.remove('dm-delivery-body-element-gyeonggi');
                    gyeonggi_clone.classList.add('dm-delivery-body-element-gyeonggi-clone');

                    delivery_modal_clone.querySelector(".dm-delivery-body").appendChild(gyeonggi_clone);

                    element = document.getElementsByClassName('dm-gyeonggi-element')[0];
                    element_clone = element.cloneNode(true);
                    element_clone.classList.remove('dm-gyeonggi-element');
                    element_clone.classList.add('dm-gyeonggi-element-clone');

                    gyeonggi_clone.appendChild(element_clone);

                }
                //경기 이외 도시만
                else{
                    console.log('delivery 2222');
                    element = document.getElementsByClassName('dm-delivery-body-element')[0];
                    element_clone = element.cloneNode(true);
                    element_clone.classList.remove('dm-delivery-body-element');
                    element_clone.classList.add('dm-delivery-body-element-clone');

                    delivery_modal_clone.querySelector(".dm-delivery-body").appendChild(element_clone);

                    
                }
            }
            if((locations_separate.length == 2 && last_location_subtitle_check)){
                console.log('delivery 3333');
                element = document.getElementsByClassName('dm-gyeonggi-element')[0];
                element_clone = element.cloneNode(true);
                element_clone.classList.remove('dm-gyeonggi-element');
                element_clone.classList.add('dm-gyeonggi-element-clone');

                gyeonggi_clone.appendChild(element_clone);
                
            }
            //공통
            console.log('delivery 4444');
            delivery_element_left = document.getElementsByClassName('dm-delivery-body-element-left')[0];
            delivery_element_left_clone = delivery_element_left.cloneNode(true);
            delivery_element_left_clone.classList.remove('dm-delivery-body-element-left');
            delivery_element_left_clone.classList.add('dm-delivery-body-element-left-clone');
            delivery_element_left_clone.textContent = location_title;

            delivery_element_right = document.getElementsByClassName('dm-delivery-body-element-right')[0];
            delivery_element_right_clone = delivery_element_right.cloneNode(true);
            delivery_element_right_clone.classList.remove('dm-delivery-body-element-right');
            delivery_element_right_clone.classList.add('dm-delivery-body-element-right-clone');
            

            element_clone.appendChild(delivery_element_left_clone);
            element_clone.appendChild(delivery_element_right_clone);

            
        }
        console.log('delivery 5555');
        let right_elements = document.getElementsByClassName('dm-right-elements')[0];
        let right_elements_clone = right_elements.cloneNode(true);
        right_elements_clone.classList.remove('dm-right-elements');
        right_elements_clone.classList.add('dm-right-elements-clone');
        
        right_elements_clone.querySelector('.dm-delivery-body-element-right-text').textContent = delivery_locations[i]['dl_gu'];
        delivery_element_right_clone.appendChild(right_elements_clone);


        
        last_location_title = locations_separate[0];
        if(locations_separate.length == 2){
            last_location_subtitle = locations_separate[1];
        }
        

    }
    
}

export function f_delivery_modal_make(rent_company_name, delivery, rent_company_clone){
    axios.get("http://ec2-13-125-238-123.ap-northeast-2.compute.amazonaws.com:3000/delivery_location", {
        params: {
            affiliateName : rent_company_name
        }}).then((Response)=>{
            console.log('clear!!!!!!!!');
            console.log(Response.data);
            const delivery_locations = Response.data;
            //배달지역 있는 경우만
            if(delivery_locations.length!=0){
                delivery.setAttribute('src','../icon/icon-delivery.png');
                f_delivery_modal(delivery_locations, rent_company_name,rent_company_clone);
               
            }
            else{
                delivery.style.display = 'none';
            }
            
        }).catch((Error)=>{
            console.log(Error);
        });
}