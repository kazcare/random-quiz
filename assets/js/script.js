
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];


//push the questions  into availableQuestions Array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i]);
    }
}

//set question number, question text and options
function getNewQuestion(){
    //set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1 ) + "of " + quiz.length;

    //set question text
    //ger random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //get the position of 'questionIndex' from the availableQuestions Array
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove the 'questionIndex' from the availableQuestions, so the question does not repreat
    availableQuestions.splice(index1,1);
    
    //set options
    //get the legth of options
    const optionLen = currentQuestion.options.length
    //push options into availableOptions Array
    for (let i=0; i < optionLen; i++){
        availableOptions.push(i);
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.1;
    // create options in html
    for (let i=0; i < optionLen; i++){
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //get the position of 'optionIndex' from the available Options
        const index2 = availableOptions.indexOf(optionIndex);
        //remove the 'optionIndex' from the availableOptions, so that the option does not repeat
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.1;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++;
  }

//get the result of current attemted question
function getResult(element) {
    const id = parseInt(element.id);
    //get the answer by comparing the id of clicked option
    if(id === currentQuestion.answer){
        //set the green color to the correct option
        element.classList.add("correct");
    }
    else {
        //set the red color to the incorrect option
        element.classList.add("wrong");

        //if the answer is incorrect, show the correct answer by adding green color to the correct option
        const optionLen = optionContainer.children.length;
        for (let i=0; i < optionLen; i++) {
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct")
            }
        }
    }
    unclickableOptions();
}  

//make all options unclickable once the user select an option
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i=0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function next() {
    if(questionCounter === quiz.length){
        console.log("quiz over");
    }
    else {
        getNewQuestion();
    }
}

window.onload = function(){

    //first we will set all question in availableQuestions Array
    setAvailableQuestions()
    //then we will call getNewQuestion(); function
    getNewQuestion()
}