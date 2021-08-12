export function menuCalendarBar() {
    const menuCalendarBar = document.getElementById('js_menu_calendar_bar');
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치

        //메뉴-캘린더 바 애니메이션
        //scroll down
        if (scrollLocation > lastScrollTop) {
            menuCalendarBar.classList.add('mcb-up');
            menuCalendarBar.classList.remove('mcb-down');
        }
        //scroll up
        else {
            menuCalendarBar.classList.remove('mcb-up');
            menuCalendarBar.classList.add('mcb-down');
        }
        lastScrollTop = scrollLocation <= 0 ? 0 : scrollLocation;
    });
}