import axios from 'axios';
import {locationsMake} from './location_list.js'
import {locationsEvent} from './locations_event.js';
import {locationsClickEvent} from './locations_event.js';
import {emptyElmtChild} from './common.js';


let msearchBar = document.getElementById("js_search_bar");
let msearchDomain = document.getElementById("js_search_domain");
let msearchResultDomain = document.getElementById("js_search_result_domain");

//검색바 클릭
export function locationSearchBarClick() {
    let spaceKinds = document.getElementById("js_space_kinds_display");
    let spaceLists = document.getElementById("js_space_lists");
    let backButton = document.getElementById("js_back_button");
    let allDeleteModalOpenBtn = document.getElementById("js_all_delete_modal_open_btn");
    let recentSearchNoText = document.getElementById("js_recent_search_no_text");
    let active;
    let value;

    msearchBar.addEventListener('click', function () {
        let searchRecordNum = document.getElementsByClassName("mm-location-delete-button").length;
        console.log(searchRecordNum);
        if (searchRecordNum) {
            allDeleteModalOpenBtn.style.display = 'block';
            recentSearchNoText.style.display = 'none';
        } else {
            allDeleteModalOpenBtn.style.display = 'none';
            recentSearchNoText.style.display = 'block';

        }
        spaceKinds.style.display = 'none';
        spaceLists.style.display = 'none';
        msearchDomain.style.display = 'block';
        backButton.style.display = 'block';
        active = document.getElementsByClassName("mm-active");
        value = active[0].dataset.index;
        if (value == 1) {
            document.getElementById('js_my_location').style.display = 'none';
        }

        if (msearchBar.value) {
            msearchDomain.style.display = 'none';
            msearchResultDomain.style.display = 'block';
        }

    });
}

//검색 기능
export function locationSearchBarSearch() {
    msearchBar.addEventListener('keyup', function () {

        let value = msearchBar.value;

        if (value) {
            msearchDomain.style.display = 'none';
            msearchResultDomain.style.display = 'block';

            axios.get("http://ec2-52-78-81-30.ap-northeast-2.compute.amazonaws.com:3000/search_location", {
                params: {
                    searchWord: value
                }
            }).then((Response) => {
                console.log('clear location search!!!');
                console.log(Response.data);
                const searchLocations = Response.data;
                emptyElmtChild('js_search_location_list');

                locationsMake(searchLocations, 'search');
                locationsEvent();
                locationsClickEvent();
            }).catch((Error) => {
                console.log(Error);
            });
        } else {
            msearchDomain.style.display = 'block';
            msearchResultDomain.style.display = 'none';
        }

    });
}