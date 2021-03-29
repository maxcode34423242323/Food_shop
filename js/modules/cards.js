function cards(){
    //рендер карточек
    class MenuCard {
        constructor(src, alt, title, decr, price, parentSelector, ...Classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.decr = decr;
            this.price = price;
            this.Classes = Classes; //как массив возращается
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeTOUAH();
        }
        changeTOUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div'); //создаем элемент и добавляем класс через аргументы класса
            if (this.Classes.length === 0) { //проверка если Классес пустой, то добавь классы
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.Classes.forEach(ClassName => {
                    element.classList.add(ClassName);
                });
            }
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.decr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>  
                    </div>
            `;
            this.parent.append(element);
        }
    }
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg, //динамически формируем карточки
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}
export default cards;