function Tabs() {
    //табы
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => { //табы убираем видимость
            item.style.display = "none";
            item.classList.add('fade');
        });
        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        }); //убираем активность класса
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";
        tabsContent[i].classList.add("fade");
        tabs[i].classList.add("tabheader__item_active");
    }
    hideTabContent();
    showTabContent();
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) { //проверям есть ли нужный класс у элемента
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}
export default Tabs;