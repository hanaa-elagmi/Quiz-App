const questions = [
    {
        question: 'What is the longest animal in the world?',

        amswers: [
            {
                text: 'Shark', correct: 'false'
            },
            {
                text: 'Blue Whale', correct: 'true'
            },
            {
                text: 'Elephant', correct: 'false'
            },
            {
                text: 'Giraffe', correct: 'false'
            }
        ]
    },
    {
        question: 'What is the smallest containent in the world?',

        amswers: [
            {
                text: 'Australia', correct: 'true'
            },
            {
                text: 'Asia', correct: 'false'
            },
            {
                text: 'America', correct: 'false'
            },
            {
                text: 'Egypt', correct: 'false'
            }
        ]
    },
    {
        question: 'What is the smallest country in the world?',

        amswers: [
            {
                text: 'Vatican', correct: 'true'
            },
            {
                text: 'Oman', correct: 'false'
            },
            {
                text: 'Jorden', correct: 'false'
            },
            {
                text: 'Egypt', correct: 'false'
            }
        ]
    },

    {
        question: 'What is the fastest animal in the world?',

        amswers: [
            {
                text: 'Lion', correct: 'false'
            },
            {
                text: 'Tiger', correct: 'false'
            },
            {
                text: 'Giraffe', correct: 'false'
            },
            {
                text: 'Acinonyx jubatus', correct: 'true'
            }
        ]
    }
];

const question = document.getElementById('question');
const answerButton = document.getElementById('answer-btn');
const nextButton = document.getElementById('next-btn');

let score = 0;
let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    ShowQuestions();
}

function ShowQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + '.' + currentQuestion.question;

    currentQuestion.amswers.forEach(answer => {
        let button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });

}

startQuiz();


function resetState() {
    nextButton.style.display = 'none';
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    //console.log(selectedBtn);

    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    }
    else {

        selectedBtn.classList.add('incorrect');
    }
    //هنا بيلف علي كل الاختيارات عشان يلون اللي واخده true بس
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', function () {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        ShowQuestions();
    }
    else {
        showScor();
    }
}

function showScor() {
    resetState();
    question.innerHTML = `your score is${score} from ${questions.length}`;
    nextButton.innerHTML = `Start Quiz Again`;
    nextButton.style.display = 'block';
}