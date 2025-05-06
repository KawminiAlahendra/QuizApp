const questions = [
    {
        question: "What is cybersecurity focused on protecting?",
        answers: [
            { text: "Hardware", correct: false},
            { text: "Software", correct: false},
            { text: "Information", correct: true},
            { text: "Electricity", correct: false},
        ]
    },
    {
        question: "What is the primary function of a router?",
        answers: [
            { text: "Connectivity", correct: true},
            { text: "Storage", correct: false},
            { text: "Processing", correct: false},
            { text: "Output", correct: false},
        ]
    },
    {
        question: "Which device is used primarily for data storage?",
        answers: [
            { text: "Server", correct: false},
            { text: "Switch", correct: false},
            { text: "Router", correct: false},
            { text: "Hard Drive", correct: true},
        ]
    },
    {
        question: "Which component is essential for a computer's processing power?",
        answers: [
            { text: "CPU", correct: true},
            { text: "GPU", correct: false},
            { text: "SSD", correct: false},
            { text: "RAM", correct: false},
        ]
    }  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();