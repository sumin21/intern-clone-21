export function menuCalendarBar() {
    const menuCalendarBar = document.getElementById('js_menu_calendar_bar');
    const filterBox = document.getElementById('js_filter_box');
    const filter = document.getElementById('js_filter');
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치

        //메뉴-캘린더 바 애니메이션
        //scroll down
        if (scrollLocation > lastScrollTop) {
            menuCalendarBar.classList.add('mcb-down');
            menuCalendarBar.classList.remove('mcb-up');
            filterBox.classList.add('f-filter-box-down');
            filterBox.classList.remove('f-filter-box-up');
            filter.classList.add('f-filter-down');
            filter.classList.remove('f-filter-up');
        }
        //scroll up
        else {
            menuCalendarBar.classList.remove('mcb-down');
            menuCalendarBar.classList.add('mcb-up');
            filterBox.classList.remove('f-filter-box-down');
            filterBox.classList.add('f-filter-box-up');
            filter.classList.remove('f-filter-down');
            filter.classList.add('f-filter-up');
        }
        lastScrollTop = scrollLocation <= 0 ? 0 : scrollLocation;
    });
}