
import 'bootstrap';

import {f_location_list} from './location_list.js';

import {f_location_kinds} from './location_kinds.js';
import {f_location_search_bar_click} from './location_search_bar_event.js';
import {f_location_search_bar_search} from './location_search_bar_event.js';
import {f_location_search_back_btn_click} from './location_search_back_btn_click.js';
import {f_location_search_result_delete} from './location_search_result_delete.js';
import {f_location_search_result_all_delete} from './location_search_result_delete.js';
import {f_location_menu_event} from './location_menu_event.js';
import {f_my_location_toast} from './my_location_toast.js';
import {f_check_box_click} from './check_box_click.js';
import {f_car_type_event} from './car_type_event.js';
import {f_car_list_condition} from './car_list_condition.js';


import {f_drow_calendar} from './drow_calendar.js';
import {f_calendar_event} from './event_calendar.js';
import {f_date_change} from './date_change.js';
import {f_calendar_bar_event} from './calendar_bar_event.js';
import {f_calendar_bar_default} from './calendar_bar_event.js';

import '../scss/style.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';


f_location_kinds();
f_location_search_bar_click();
f_location_search_bar_search();//
f_location_search_back_btn_click();
f_location_search_result_delete();
f_location_search_result_all_delete();
f_location_menu_event();
f_my_location_toast();
f_check_box_click();
f_car_type_event();


f_location_list();


f_drow_calendar();
f_calendar_event();
f_date_change();
f_calendar_bar_event();
f_calendar_bar_default();

//처음 로드되는 차량 리스트
f_car_list_condition(0,0,0,0,0,0,0,0);