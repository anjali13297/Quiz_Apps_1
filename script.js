const questions = [
    {
        question: "HTML stands for -",
        answers: [
            {text: "HighText Machine Language", correct: false},
            {text: "HyperText and links Markup Language", correct: false},
            {text: "HyperText Markup Language", correct: true},
            {text: "None of these", correct: false},
        ]
    },
    {
        question: "The correct sequence of HTML tags for starting a webpage is -",
        answers: [
            {text: "Head, Title, HTML, body", correct: false},
            {text: "HTML, Body, Title, Head", correct: false},
            {text: "Head, HTML, Title, Body", correct: false},
            {text: "HTML, Head, Title, Body", correct: true},
        ]
    },
    {
        question: "Which of the following element is responsible for making the text bold in HTML?",
        answers: [
            {text: "&ltpre&gt tag", correct: false},
            {text: "&lta&gt tag", correct: false},
            {text: "&ltb&gt", correct: true},
            {text: "&ltbr&gt", correct: false},
        ]
    },
    {
        question: "Which of the following tag is used to insert a line-break in HTML?",
        answers: [
            {text: "&ltbr&gt tag", correct: true},
            {text: "&ltb&gt tag", correct: false},
            {text: "&ltpre&gt tag", correct: false},
            {text: "None of these", correct: false},
        ]
    },
    {
        question: "How to create an ordered list (a list with the list items in numbers) in HTML?",
        answers: [
            {text: "&ltul&gt tag", correct: false},
            {text: "&ltol&gt tag", correct: true},
            {text: "&ltli&gt tag", correct: false},
            {text: "&ltdd&gt tag", correct: false},
        ]
    },
    {
        question: "The &lthr&gt tag in HTML is used for -",
        answers: [
            {text: "new line", correct: false},
            {text: "vertical ruler", correct: false},
            {text: "new paragraph", correct: false},
            {text: "horizontal ruler", correct: true},
        ]
    }

];

const queElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQueIndex = 0;
let score = 0;

function startQuiz(){
    currentQueIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQue = questions[currentQueIndex];
    let questionNo = currentQueIndex + 1;
    queElement.innerHTML = questionNo + ". " + currentQue.question;

    currentQue.answers.forEach(answer => {
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
    queElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQueIndex++;
    if(currentQueIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQueIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();