
import 'bootstrap';

import {locationList} from './location_list.js';

import {locationKinds} from './location_kinds.js';
import {locationSearchBarClick} from './location_search_bar_event.js';
import {locationSearchBarSearch} from './location_search_bar_event.js';
import {locationSearchBackBtnClick} from './location_search_back_btn_click.js';
import {locationSearchResultDelete} from './location_search_result_delete.js';
import {locationSearchResultAllDelete} from './location_search_result_delete.js';
import {locationMenuEvent} from './location_menu_event.js';
import {toastEvent} from './toast_event.js';
import {myLocationClick} from './my_location_click.js';
import {checkBoxClick} from './check_box_click.js';
import {carTypeEvent} from './car_type_event.js';
import {carListCondition} from './car_list_condition.js';
import {menuCalendarBar} from './menu_calendar_bar.js';



import {drowCalendar} from './drow_calendar.js';
import {calendarEvent} from './event_calendar.js';
import {dateChange} from './date_change.js';
import {calendarBarEvent} from './calendar_bar_event.js';
import {calendarBarChange} from './calendar_bar_event.js';

import '../scss/style.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';


locationKinds();
locationSearchBarClick();
locationSearchBarSearch();//
locationSearchBackBtnClick();
locationSearchResultDelete();
locationSearchResultAllDelete();
locationMenuEvent();
toastEvent();
myLocationClick();
checkBoxClick();
carTypeEvent();
locationList();
menuCalendarBar();
drowCalendar();
calendarEvent();
dateChange();
calendarBarEvent();
calendarBarChange();

//처음 로드되는 차량 리스트
carListCondition(0,0,0,0,0);


