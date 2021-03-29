const modal = document.querySelector('.modal');

function OpenMod(num) {
    if (modal.style.display == "block") {
        return;
    } else {
        setTimeout(() => {
            modal.style.display = "block";
            document.body.style.overflow = 'hidden';
        }, num);
    }
}

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        OpenMod(10);
        window.removeEventListener('scroll', showModalByScroll); //удаляем
    }
}
window.addEventListener('scroll', showModalByScroll);

function openModal(open) {
    open.forEach(item => {
        item.addEventListener("click", (e) => {
            if (e.target && e.target.classList.contains("btn_white") || e.target.classList.contains("btn_dark")) {
                modal.style.display = "block";
            }
            document.body.style.overflow = 'hidden';
            window.removeEventListener('scroll', showModalByScroll);
        });
    });

}
const btns = document.querySelectorAll("[data-modal]");

function modals() {
    const close1 = document.querySelector('.modal__close');
    openModal(btns);

    function closeModal(close) {
        close.addEventListener("click", (e) => {
            if (e.target === close) {
                modal.style.display = "none";
            }
            document.body.style.overflow = '';
        });
    }
    closeModal(close1);
    closeModal(modal);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            modal.style.display = "none";
            document.body.style.overflow = '';
        }
    });
}
export default modals;
export {openModal};
export {btns};