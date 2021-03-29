function sliders({container,slide, next,prev,totalCount,currentCounter, wrapper,field }){
    const Prev = document.querySelector(prev);
    const Next = document.querySelector(next);
    const slides = document.querySelectorAll(slide);
    const totaltBtn = document.querySelector(totalCount);
    const currentBtn = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;
    const slider = document.querySelector(container);

    let count = 1;
    let offset = 0;
    if (slides.length < 10) {
        totaltBtn.textContent = `0${slides.length}`;
        currentBtn.textContent = `0${count}`;
    } else {
        totaltBtn.textContent = slides.length;
        currentBtn.textContent = count;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = "0.5s all";
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });
    slider.style.position = 'relative';
    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none; 
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNonDig(e) {
        return +e.replace(/\D/g, '');
    }
    Next.addEventListener('click', () => {
        if (offset == deleteNonDig(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNonDig(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (count == slides.length) {
            count = 1;
        } else {
            count++;
        }
        if (slides.length < 10) {
            currentBtn.textContent = `0${count}`;
        } else {
            currentBtn.textContent = count;
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[count - 1].style.opacity = 1;

    });
    Prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNonDig(width) * (slides.length - 1);
        } else {
            offset -= deleteNonDig(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (count == 1) {
            count = slides.length;
        } else {
            count--;
        }
        if (slides.length < 10) {
            currentBtn.textContent = `0${count}`;
        } else {
            currentBtn.textContent = count;
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[count - 1].style.opacity = 1;
    });
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slidesTo = e.target.getAttribute('data-slide-to');
            count = slidesTo;
            offset = deleteNonDig(width) * (slidesTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[count - 1].style.opacity = 1;
            if (slides.length < 10) {
                currentBtn.textContent = `0${count}`;
            } else {
                currentBtn.textContent = count;
            }
        });
    });
}
export default sliders;