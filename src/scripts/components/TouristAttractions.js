export class TouristAttractions {
    constructor () {
        this.list = [
            {
                image: 'img1-992.png',
                titulo: 'Pão de Açucar',
                description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.',
            },
            {
                image: 'img2-992.png',
                titulo: 'Cristo Redentor',
                description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.',
            },
            {
                image: 'img3-992.png',
                titulo: 'Ilha Grande',
                description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.',
            },
            {
                image: 'img4-992.png',
                titulo: 'Centro Histórico de Paraty',
                description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.',
            },

        ];

        this.selectors();
        this.events();
        this.carrossel();
        this.renderListItems();
        this.slickAdd();
    }

    selectors () {
        this.inputFile = document.querySelector('#input__img');
        this.spanInput = document.querySelector('.input__span');
        this.textSpanInput = "Imagem";
        this.spanInput.innerText = this.textSpanInput;
        this.labelInput = document.querySelector('.label-input')
        this.form = document.querySelector('.form__tourist-attractions');
        this.ulList = document.querySelector('.wrapper-ul__cards');
        this.inputTitle = document.querySelector('.input-text__titulo');
        this.inputDescription = document.querySelector('.input-text__descricao');
    }

    events () {
        this.inputFile.addEventListener('change', this.imgPreview.bind(this), false);
        this.form.addEventListener('submit', this.addProperty.bind(this));

    }

    imgPreview (i) {
        const inputTarget = i.target;
        const file = inputTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                const readerTarget = e.target;
                const img = document.createElement('img');
                img.src = readerTarget.result;
                img.classList.add('img-result');
                this.spanInput.innerHTML = "";
                this.labelInput.style.border = "none";
                this.spanInput.appendChild(img);
            });
            reader.readAsDataURL(file);
            i.target.value = '';
        }else {
            this.spanInput.innerText = this.textSpanInput;
            this.labelInput.style.border = "";
        }
    };

    addProperty (e) {
    e.preventDefault();

    const spotImg = this.spanInput.children[0].src
        const spotTitle = e.target['input-title'].value
        const spotDescription = e.target['input-description'].value

        if (spotImg != '' && spotTitle != '' && spotDescription != '') {

            const spot = {
                image: spotImg,
                titulo: spotTitle,
                description: spotDescription,
            };
            this.list.push(spot);
            this.renderListItems();
            this.resetInputs();
        }
    };

    renderListItems () {
        let spotStructure = '';

        this.list.forEach((i) => {
            spotStructure += `
            <li class="wrapper-cards__li" data-test="item-list">
                <figure class="container-card__img">
                    <img class="result-card__img" data-test="image-item-list" src="${i.image}"/>
                </figure>
                <div class="container-texto">
                    <h3 class="result-card__title" data-test="title-item-list">${i.titulo}</h3>
                    <p class="result-card__description" data-test="description-item-list">${i.description}</p>
                </div>
            </li>`;
        });

        this.removeSlick();
        this.ulList.innerHTML = spotStructure;
        this.carrossel();
    };

    carrossel () {
        if(window.screen.width > 1024) {
            $('.wrapper-ul__cards').slick({
                dots: true,
                infinite: true,
                arrows: true,
                slidesToShow: 4,
                slidesToScroll: 1,
            })

        }
    };
    removeSlick () {
        if(window.screen.width > 1024) {
            $('.wrapper-ul__cards').slick('unslick');
        }
    };

    slickAdd () {
        const ulListSlick = this.ulList;
        if (ulListSlick.classList.value === 'slick-initialized') {
            this.carrossel();
        }else {
            this.removeSlick();
        }
    }

    resetInputs () {
        this.inputTitle.value = '';
        this.inputDescription.value = '';
        this.labelInput.style.border = '';
        this.spanInput.innerText = this.textSpanInput;
        this.spanInput.style.border = '';
    };


}
