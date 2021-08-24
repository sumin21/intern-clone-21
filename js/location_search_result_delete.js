import $ from "jquery";

//기록삭제 버튼 (한 기록 당)
let mdeleteBtns = document.getElementsByClassName("mm-location-delete-button");
let mallDeleteModalOpenBtn = document.getElementById("js_all_delete_modal_open_btn");
let mrecentSearchNoText = document.getElementById("js_recent_search_no_text");

export function locationSearchResultDelete() {
    const deleteBtnsLen = mdeleteBtns.length;
    //기록 삭제
    for (let i = 0; i < deleteBtnsLen; i++) {
        let deleteBtn = mdeleteBtns.item(i);
        deleteBtn.addEventListener('click', function () { //검색기록 리스트의 x버튼
            let parent = this.parentNode;
            parent = parent.parentNode;
            parent.parentNode.removeChild(parent);

            const searchRecordNum = document.getElementsByClassName("mm-location-delete-button").length;
            if (searchRecordNum) {
                mallDeleteModalOpenBtn.style.display = 'block';
                mrecentSearchNoText.style.display = 'none';
            } else {
                mallDeleteModalOpenBtn.style.display = 'none';
                mrecentSearchNoText.style.display = 'block';
            }
        });
    }
}

//기록 전체 삭제 버튼 (모든 기록)

export function locationSearchResultAllDelete() {

    let allDeleteBtn = document.getElementById("js_all_delete_close_btn");
    let allRemoveModal = document.getElementById("allremoveModal");
    let allDeleteCancelBtn1 = document.getElementById("js_all_delete_cancel_btn1");
    let allDeleteCancelBtn2 = document.getElementById("js_all_delete_cancel_btn2");

    mallDeleteModalOpenBtn.addEventListener('click', function () { //기록삭제 버튼
        allRemoveModal.style.display = 'block';
        allRemoveModal.setAttribute('aria-hidden', 'true');
        allRemoveModal.setAttribute('aria-modal', 'true');
        allRemoveModal.classList.remove("show");
    });

    //모달 닫힐때 이벤트
    $('#allremoveModal').on('hidden.bs.modal', function () {
        $('html, body').addClass('no-scroll');
    });

    //기록삭제 modal에서 취소 / x 버튼
    allDeleteCancelBtn1.addEventListener('click', function () {
        $('#allremoveModal').modal('hide');
    })
    allDeleteCancelBtn2.addEventListener('click', function () {
        $('#allremoveModal').modal('hide');
    })

    //기록삭제 modal에서 삭제버튼 -> 전체 삭제
    allDeleteBtn.addEventListener('click', function () {
        const deleteBtnsLen = mdeleteBtns.length;
        for (let j = 0; j < deleteBtnsLen; j++) {
            deleteAll(mdeleteBtns[0]);
        }
        $('#allremoveModal').modal('hide');

        mallDeleteModalOpenBtn.style.display = 'none';
        mrecentSearchNoText.style.display = 'block';
    });
}
//기록 전체 삭제 함수
function deleteAll(_deleteElement) {
    let parent = _deleteElement.parentNode;
    parent = parent.parentNode;
    parent.parentNode.removeChild(parent);
}