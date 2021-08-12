export function locationSearchBackBtnClick() {
    let spaceKinds = document.getElementById("js_space_kinds_display");
    let spaceLists = document.getElementById("js_space_lists");
    let searchDomain = document.getElementById("js_search_domain");
    let backButton = document.getElementById("js_back_button");
    let searchResultDomain = document.getElementById("js_search_result_domain");
    let value;
    let active;

    backButton.addEventListener('click', function () {
        spaceKinds.style.display = 'block';
        spaceLists.style.display = 'block';
        searchDomain.style.display = 'none';
        backButton.style.display = 'none';
        searchResultDomain.style.display = 'none';
        active = document.getElementsByClassName("mm-active");
        value = active[0].dataset.index;
        if (value == 1) {
            document.getElementById('js_my_location').style.display = 'block';
        }

    });
}