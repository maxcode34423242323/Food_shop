import {openModal} from './modals';
import {btns} from './modals';

function forms(){
    
    const modal = document.querySelector('.modal');
    // Forms
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'spinner.svg',
        success: 'Спасибо, с Вами скоро свяжутся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindData(item);
    });
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            //create client window status
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanks(message.success);
                    statusMessage.src='';
                }).catch(() => {
                    showThanks(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }
    function showThanks(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.style.display = "none";
        modal.style.display = "block";
        openModal(btns);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class='modal__content'>
                <div class='modal__close'>×</div>
                <div class='modal__title'>${message}</div>
            </div>
        `;
        thanksModal.addEventListener("click", (e) => {
            if (e.target.classList.contains('modal__close')) {
                modal.style.display = "none";
            }
        });
        /////!!!!!!
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.style.display = "block";
            modal.style.display = "none";
        }, 4000);
    }
}
export default forms;