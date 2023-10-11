const burger = document.querySelector(".header__burger-menu");
const close = document.querySelector(".header__close");
const nav = document.querySelector(".header__nav-mobile");

burger.addEventListener("click", () => {
    nav.classList.add("header__nav-mobile--active");
    close.classList.add("header__close--active");
});

close.addEventListener("click", () => {
    nav.classList.remove("header__nav-mobile--active");
    close.classList.remove("header__close--active");
});





const question = document.querySelector(".quiz__right-question");
const answers = document.querySelector(".quiz__right-answers");
const nextBtn = document.querySelector(".quiz__right-next");
const prevBtn = document.querySelector(".quiz__right-prev");
let questionIndex = 0;
const answersTotal = {};
const currentStep = document.querySelector(".quiz__current-step");
const totalSteps = document.querySelector(".quiz__total-steps");
const quizProgress = document.querySelector(".quiz__least-questions");
let giftImage = "";

const questionsVariants = [
    {
        questionTitle: "Какой ваш бюджет на покупку автомобиля?",
        answers: ["до 1 млн", "1-2 млн", "2-3 Млн", "3-4 млн", "более 4-х млн"],
    },
    {
        questionTitle: "Какие марки?",
        answers: [
            "Skoda",
            "Renault",
            "Toyota",
            "Tesla",
            "Subaru",
            "Porshe",
            "Nissan",
            "Ford",
            "Chevrolet",
            "Honda",
            "Mazda",
            "Hyundai",
            "Kia",
            "Volkswagen",
            "Audi",
            "BMW",
            "Mercedes-Benz",
            "Lexus",
            "Jeep",
            "Land Rover",
            "Ferrari",
            "Lamborghini",
            "Maserati",
            "Aston Martin",
            "Jaguar",
            "Volvo",
            "Mini",
            "Mitsubishi",
            "Infiniti",
        ],
    },
    {
        questionTitle: "Пробег",
        answers: ["до 50 тыс", "до 100 тыс", "до 150 тыс", "до 200 тыс"],
    },
    {
        questionTitle: "Трансмиссия",
        answers: ["AT", "MT"],
    },
    {
        questionTitle: "Как скоро вы планируете покупку автомобиля?",
        answers: ["в ближайшие 2 недели", "в ближайший месяц", "в ближайшие 3 месяца", "в ближайшие полгода"],
    },
    {
        questionTitle: "Выберите подарок",
        answers: ["./img/gift-1.jpg", "./img/gift-2.jpg", "./img/gift-3.jpg"],
        descrs: ["Мойка люкс", "Набор автомобилиста", "Скидка 4 тысячи на услугу автоподбора"],
    },
];

totalSteps.textContent = questionsVariants.length - 1;

function updateNextButtonState() {
    const checkboxes = answers.querySelectorAll('input[type="checkbox"]:checked, input[type="checkbox"]:checked');
    const selectedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);

    if (questionIndex === questionsVariants.length - 1) {
        nextBtn.disabled = selectedCheckboxes.length === 0 && !answersTotal[questionsVariants[questionIndex].questionTitle];
    } else {
        nextBtn.disabled = selectedCheckboxes.length === 0;
    }

    prevBtn.disabled = questionIndex === 0;
}

function displayNextQuestion() {
    const currentQuestion = questionsVariants[questionIndex];

    if (!currentQuestion) {
        console.log("Ответы:", answersTotal);
        nextBtn.setAttribute("disabled", "true");
        finalInitial();
        return;
    }

    question.textContent = currentQuestion.questionTitle;

    answers.innerHTML = "";

    const answerArea = document.querySelector(".quiz__right-answers");

    if (questionIndex === 1) {
        const radioDiv = document.createElement("div");
        const fakeSelectPreview = document.createElement("div");
        radioDiv.classList.add("fake__select");
        fakeSelectPreview.classList.add("fake__select-preview");
        currentQuestion.answers.forEach((answerText, answerIndex) => {
            const answerId = `answer_${answerIndex + 1}`;
            const answerLabel = document.createElement("label");
            const answerCheckbox = document.createElement("input");
            const fakeCheckbox = document.createElement("span");
            const answerArea = document.querySelector(".quiz__right-answers");

            fakeCheckbox.classList.add("custom-radio");
            answerCheckbox.type = "checkbox";
            answerCheckbox.id = answerId;
            answerCheckbox.classList.add("quiz__right-answer");
            answerCheckbox.value = answerText;

            answerLabel.appendChild(answerCheckbox);
            answerLabel.appendChild(fakeCheckbox);
            answerLabel.appendChild(document.createTextNode(answerText));
            currentStep.textContent = questionIndex + 1;
            quizProgress.textContent = questionsVariants.length - 1 - questionIndex;

            answerCheckbox.addEventListener("change", () => {
                if (answerCheckbox.checked) {
                    if (!answersTotal[currentQuestion.questionTitle]) {
                        answersTotal[currentQuestion.questionTitle] = [answerText];
                    } else {
                        answersTotal[currentQuestion.questionTitle].push(answerText);
                    }
                } else {
                    const index = answersTotal[currentQuestion.questionTitle].indexOf(answerText);
                    if (index > -1) {
                        answersTotal[currentQuestion.questionTitle].splice(index, 1);
                    }
                }
                updateNextButtonState();
            });
            fakeSelectPreview.appendChild(answerLabel);
            fakeSelectPreview.setAttribute("data-placeholder", "Audi");
            radioDiv.appendChild(answerLabel);
            if (questionIndex === 4) {
                answerArea.style.gridTemplateColumns = "1fr";
            } else {
                answerArea.style.gridTemplateColumns = "repeat(3, 1fr)";
            }
        });
        fakeSelectPreview.addEventListener("click", () => {
            console.log("click");
            radioDiv.classList.toggle("fake__select--active");
            fakeSelectPreview.classList.toggle("fake__select-preview--active");
        });
        answers.appendChild(fakeSelectPreview);
        answers.appendChild(radioDiv);

        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.placeholder = "Например BQ9";
        textInput.classList.add("quiz__input-answer");
        textInput.addEventListener("input", (event) => {
            const modelValue = event.target.value;

            const selectedCheckboxes = Array.from(document.querySelectorAll(".quiz__right-answer:checked"));
            const selectedBrands = selectedCheckboxes.map((checkbox) => checkbox.value);
            const combinedValue = [...selectedBrands, modelValue];
            answersTotal[currentQuestion.questionTitle] = combinedValue;

            updateNextButtonState();
        });

        const firstParagraph = document.createElement("p");
        firstParagraph.textContent = "Вы можете выбрать несколько интересующих марок";
        firstParagraph.classList.add("quiz__first-par");
        answers.appendChild(firstParagraph);

        const secondParagraph = document.createElement("p");
        secondParagraph.textContent = "Если вы уже определились с конкретной моделью авто, впишите ее сюда:";
        secondParagraph.classList.add("quiz__second-par");
        answers.appendChild(secondParagraph);

        answers.appendChild(textInput);

        answerArea.style.flexDirection = "column";
    } else if (questionIndex === questionsVariants.length - 1) {
        currentQuestion.answers.forEach((imageUrl, answerIndex) => {
            const imageDiv = document.createElement("div");
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = `Answer ${answerIndex + 1}`;
            img.setAttribute("data-answer", currentQuestion.descrs[answerIndex]);
            img.classList.add("quiz__right-img");
            imageDiv.classList.add("quiz__right-imagewrap");

            const descrP = document.createElement("p");
            descrP.textContent = currentQuestion.descrs[answerIndex];
            descrP.classList.add("quiz__right-descr");

            imageDiv.appendChild(img);
            imageDiv.appendChild(descrP);
            answers.appendChild(imageDiv);
            img.addEventListener("click", () => {
                const allImages = document.querySelectorAll(".quiz__right-img");

                allImages.forEach((image) => {
                    image.classList.remove("quiz__right-img--active");
                    giftImage = imageUrl;
                });
                img.classList.add("quiz__right-img--active");

                answersTotal[currentQuestion.questionTitle] = [currentQuestion.descrs[answerIndex]];
                updateNextButtonState();
            });
        });
        const giftBlock = document.querySelector(".quiz__right-gift-descr");
        giftBlock.style.display = "none";
        answerArea.style.flexDirection = "row";
        answerArea.style.gap = "10px";
        document.body.style.padding = "0";
    } else {
        currentQuestion.answers.forEach((answerText, answerIndex) => {
            const answerId = `answer_${answerIndex + 1}`;
            const answerLabel = document.createElement("label");
            const answerCheckbox = document.createElement("input");
            const fakeCheckbox = document.createElement("span");
            const answerArea = document.querySelector(".quiz__right-answers");

            fakeCheckbox.classList.add("custom-radio");
            answerCheckbox.type = "checkbox";
            answerCheckbox.id = answerId;
            answerCheckbox.name = "answer";
            answerCheckbox.classList.add("quiz__right-answer");
            answerCheckbox.value = answerText;

            answerLabel.appendChild(answerCheckbox);
            answerLabel.appendChild(fakeCheckbox);
            answerLabel.appendChild(document.createTextNode(answerText));
            currentStep.textContent = questionIndex + 1;
            quizProgress.textContent = questionsVariants.length - 1 - questionIndex;

            answerCheckbox.addEventListener("change", () => {
                if (answerCheckbox.checked) {
                    if (!answersTotal[currentQuestion.questionTitle]) {
                        answersTotal[currentQuestion.questionTitle] = [answerText];
                    } else {
                        answersTotal[currentQuestion.questionTitle].push(answerText);
                    }
                } else {
                    const index = answersTotal[currentQuestion.questionTitle].indexOf(answerText);
                    if (index > -1) {
                        answersTotal[currentQuestion.questionTitle].splice(index, 1);
                    }
                }
                updateNextButtonState();
            });

            answers.appendChild(answerLabel);
            if (questionIndex === 4) {
                answerArea.style.gridTemplateColumns = "1fr";
            } else {
                answerArea.style.gridTemplateColumns = "repeat(3, 1fr)";
            }
        });
    }

    updateNextButtonState();
}

nextBtn.addEventListener("click", () => {
    questionIndex++;
    displayNextQuestion();
    progressBar();
});

prevBtn.addEventListener("click", () => {
    if (questionIndex > 0) {
        questionIndex--;
        displayNextQuestion();
        progressBar();
    }
});

function progressBar() {
    const index = questionIndex;
    const progress = document.querySelector(".quiz__right-progress");
    const fullWidth = progress.offsetWidth;
    const progressInner = document.querySelector(".quiz__right-filler");
    const progressFraction = fullWidth / 5;

    if (index === questionsVariants.length) {
        progressInner.style.width = `${fullWidth}px`;
    } else {
        progressInner.style.width = `${progressFraction * index}px`;
    }
}

displayNextQuestion();
progressBar();

function outerClick(event) {
    const answerArea = document.querySelector(".fake__select-preview");
    const fakeSelect = document.querySelector(".fake__select");

    if (answerArea && fakeSelect) {
        if (event.target !== answerArea && !answerArea.contains(event.target) && event.target !== fakeSelect && !fakeSelect.contains(event.target)) {
            fakeSelect.classList.remove("fake__select--active");
            answerArea.classList.remove("fake__select-preview--active");

            const checkedRadio = document.querySelector('.quiz__right-answers input[type="checkbox"]:checked, input[type="checkbox"]:checked');
            if (checkedRadio) {
                const selectedValue = checkedRadio.value;
                answerArea.setAttribute("data-placeholder", selectedValue);
            }
        }
    }
}

document.addEventListener("click", outerClick);

function finalInitial() {
    const quizArea = document.querySelector(".quiz__content-quiz");
    const quizFinal = document.querySelector(".quiz__content-final");
    const giftPreview = document.querySelector(".quiz__content-gift-preview");
    const giftSelected = giftPreview.querySelector("img");

    quizArea.style.display = "none";
    quizFinal.style.display = "block";
    const quizBg = document.querySelector(".quiz__content");
    quizBg.style.backgroundImage = 'url("./img/contacts-bg.jpg")';
    quizBg.style.backgroundSize = "cover";
    quizBg.style.backgroundPosition = "center";
    quizBg.style.backgroundRepeat = "no-repeat";
    const gift = document.querySelector(".specify__gift");

    const lastAnswerArray = answersTotal[questionsVariants[5].questionTitle];
    const lastAnswer = lastAnswerArray ? lastAnswerArray[lastAnswerArray.length - 1] : "";
    gift.textContent = lastAnswer;
    giftSelected.src = giftImage;

  



function handleResize() {
    const screenWidth = window.screen.width;

    if (screenWidth < 525 ) {
        quizBg.style.backgroundImage = 'url("./img/contacts-mobile-bg.jpg")';
        
    } else {
        quizBg.style.backgroundImage = 'url("./img/contacts-bg.jpg")';
    }
}


window.addEventListener("resize", handleResize);


handleResize();

}

const sendBtn = document.querySelector(".quiz__content-send");

sendBtn.addEventListener("click", () => {
    const inputBlock = document.querySelector(".quiz__content-final-input");
    const input = inputBlock.querySelector("input");
    const phoneNumber = input.value;

    const orderData = {
        // email: "savazkitim@gmail.com",
        email: "auto_4u@bk.ru",
        present: answersTotal["Выберите подарок"],
        time: answersTotal["Как скоро вы планируете покупку автомобиля?"],
        mark: answersTotal["Какие марки?"],
        amount: answersTotal["Какой ваш бюджет на покупку автомобиля?"],
        mileAge: answersTotal["Пробег"],
        phone: phoneNumber,
        transmition: answersTotal["Трансмиссия"],
    };

    console.log(orderData);

    sendObj(orderData);
});

async function sendObj(dataToSend) {
    try {
        const response = await fetch("https://futug-mailer.vercel.app/api/send", {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (response.ok) {
            const popupWrapper = document.querySelector(".popup");
            const popupModal = document.querySelector(".popup__content");

            popupWrapper.classList.add("popup--active");
            popupModal.classList.add("popup__content--active");

            const closeBtn = document.querySelector(".popup__content-btn");
            closeBtn.addEventListener("click", () => {
                popupWrapper.classList.remove("popup--active");
                popupModal.classList.remove("popup__content--active");
                location.reload();
            });
            console.log("Данные успешно отправлены.");
        } else {
            console.error("Ошибка при отправке данных. Статус:", response.status);
        }
    } catch (error) {
        console.error("Произошла ошибка:", error);
    }
}

const phone = document.querySelector(".quiz__content-phone");

phone.addEventListener("click", () => {
    const maskOptions = {
        mask: "+7(000)000-00-00",
        lazy: false,
    };
    const mask = new IMask(phone, maskOptions);
});


function closeBurgerMenu() {
    nav.classList.remove("header__nav-mobile--active");
    close.classList.remove("header__close--active");
}

document.addEventListener("click", (event) => {
    const isBurgerMenuOpen = nav.classList.contains("header__nav-mobile--active");
    const isClickInsideMenu = event.target === nav || nav.contains(event.target);
    const isClickInsideBurger = event.target === burger;
    const isClickInsideClose = event.target === close;

    if (isBurgerMenuOpen && !isClickInsideMenu && !isClickInsideBurger && !isClickInsideClose) {
        closeBurgerMenu();
    }
});

