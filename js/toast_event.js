export function toastEvent() {
    let toasts = document.getElementsByClassName('toast');
    const toastsLen = toasts.length;

    for (let i = 0; i < toastsLen; i++) {
        toasts[i].onmouseover = function () {
            this.style.opacity = '1.0';
            this.style.boxShadow = '0 0rem 1rem rgb(0,0,0)';
        };
        toasts[i].onmouseout = function () {
            this.style.opacity = '0.8';
            this.style.boxShadow = '0 0.25rem 0.75rem rgb(255, 255, 255 , 0.2)';
        };
    }
}