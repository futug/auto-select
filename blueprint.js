const burger = document.querySelector(".header__burger-menu");
const close = document.querySelector(".header__close");
const nav = document.querySelector(".header__nav-mobile");
burger.addEventListener("click", () => {
    nav.classList.add("header__nav-mobile--active");
});
close.addEventListener("click", () => {
    nav.classList.remove("header__nav-mobile--active");
});

//quiz

const question = document.querySelector(".quiz__right-question");
const answers = document.querySelector(".quiz__right-answers");
const nextBtn = document.querySelector(".quiz__right-next ");
let questionIndex = 0;
const answersTotal = {};
const currentStep = document.querySelector(".quiz__current-step");
const totalSteps = document.querySelector(".quiz__total-steps");
const quizProgress = document.querySelector(".quiz__least-questions");

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
];

totalSteps.textContent = questionsVariants.length;

function updateNextButtonState() {
    const checkboxes = answers.querySelectorAll('input[type="radio"]');
    const selectedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);

    nextBtn.disabled = selectedCheckboxes.length === 0;
}

function displayNextQuestion() {
    const currentQuestion = questionsVariants[questionIndex];

    if (!currentQuestion) {
        // Все вопросы пройдены, можно обработать результат
        console.log("Ответы:", answersTotal);
        nextBtn.setAttribute("disabled", "true");
        return;
    }

    question.textContent = currentQuestion.questionTitle;

    answers.innerHTML = "";

    const answerArea = document.querySelector(".quiz__right-answers");

    if (questionIndex === 1) {
        answerArea.style.gridTemplateColumns = "1fr";
    } else {
        answerArea.style.gridTemplateColumns = "repeat(3, 1fr)";
    }

    if (questionIndex === 1) {
        const radioDiv = document.createElement("div");
        const fakeSelectPreview = document.createElement("div");
        radioDiv.classList.add("fake__select");
        fakeSelectPreview.classList.add("fake__select-preview");
        currentQuestion.answers.forEach((answerText, answerIndex) => {
            const answerId = `answer_${answerIndex + 1}`;
            const answerLabel = document.createElement("label");
            const answerCheckbox = document.createElement("input");
            const fakeCheckbos = document.createElement("span");
            const answerArea = document.querySelector(".quiz__right-answers");

            fakeCheckbos.classList.add("custom-radio");
            answerCheckbox.type = "radio";
            answerCheckbox.id = answerId;
            answerCheckbox.classList.add("quiz__right-answer");
            answerCheckbox.value = answerText;

            answerLabel.appendChild(answerCheckbox);
            answerLabel.appendChild(fakeCheckbos);
            answerLabel.appendChild(document.createTextNode(answerText));
            currentStep.textContent = questionIndex + 1;
            quizProgress.textContent = questionsVariants.length - questionIndex;

            answerCheckbox.addEventListener("change", () => {
                if (answerCheckbox.checked) {
                    answersTotal[currentQuestion.questionTitle] = answerText;
                } else {
                    delete answersTotal[currentQuestion.questionTitle];
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
        // Добавляем общий div с радиокнопками в answers
        answers.appendChild(fakeSelectPreview);
        answers.appendChild(radioDiv);

        // Создаем отдельный инпут текст
        const textInput = document.createElement("input");

        textInput.type = "text";
        textInput.placeholder = "Например BQ9";
        textInput.classList.add("quiz__input-answer");
        answers.appendChild(textInput);

        answerArea.style.gridTemplateColumns = "1fr";
    } else {
        // Создаем радиокнопки
        currentQuestion.answers.forEach((answerText, answerIndex) => {
            const answerId = `answer_${answerIndex + 1}`;
            const answerLabel = document.createElement("label");
            const answerCheckbox = document.createElement("input");
            const fakeCheckbos = document.createElement("span");
            const answerArea = document.querySelector(".quiz__right-answers");

            fakeCheckbos.classList.add("custom-radio");
            answerCheckbox.type = "radio";
            answerCheckbox.id = answerId;
            answerCheckbox.name = "answer";
            answerCheckbox.classList.add("quiz__right-answer");
            answerCheckbox.value = `answer${answerIndex + 1}`;

            answerLabel.appendChild(answerCheckbox);
            answerLabel.appendChild(fakeCheckbos);
            answerLabel.appendChild(document.createTextNode(answerText));
            currentStep.textContent = questionIndex + 1;
            quizProgress.textContent = questionsVariants.length - questionIndex;

            answerCheckbox.addEventListener("change", () => {
                if (answerCheckbox.checked) {
                    answersTotal[currentQuestion.questionTitle] = answerText;
                } else {
                    delete answersTotal[currentQuestion.questionTitle];
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

function progressBar() {
    const index = questionIndex;
    const progress = document.querySelector(".quiz__right-progress");
    const fullWidth = progress.offsetWidth;
    const progressInner = document.querySelector(".quiz__right-filler");
    const progressFraction = fullWidth / questionsVariants.length;
    progressInner.style.width = `${progressFraction * index}px`;
}

// Инициализация
displayNextQuestion();
progressBar();

function outerClick(event) {
    const answerArea = document.querySelector(".fake__select-preview");
    const fakeSelect = document.querySelector(".fake__select");

    if (answerArea && fakeSelect) {
        if (event.target !== answerArea && !answerArea.contains(event.target) && event.target !== fakeSelect && !fakeSelect.contains(event.target)) {
            fakeSelect.classList.remove("fake__select--active");
            answerArea.classList.remove("fake__select-preview--active");

            const checkedRadio = document.querySelector('.quiz__right-answers input[type="radio"]:checked');
            if (checkedRadio) {
                const selectedValue = checkedRadio.value;
                answerArea.setAttribute("data-placeholder", selectedValue);
            }
        }
    }
}

document.addEventListener("click", outerClick);
