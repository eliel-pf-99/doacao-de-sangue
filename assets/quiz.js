// ======================== DB
const backUri = "https://blood-donation-api-patm.onrender.com/";
const quizSave = "quiz";

function saveScore(){
    fetch(
         backUri+quizSave,
         {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify({'score': scoreboard}),
        });
}


// ======================== QUESTIONS   
var questions = [
    {
        'question': 'Quem pode doar sangue?',
        'options': [
            'Pessoas saudáveis entre 16 e 69 anos',
            'Pessoas com qualquer doença controlada',
            'Apenas quem já teve COVID-19',
            'Apenas maiores de 18 anos'
        ],
        'answer': 'Pessoas saudáveis entre 16 e 69 anos',
    },
    {
        'question': 'Quantas vidas uma única doação pode salvar?',
        'options': [
            '1',
            '2',
            '4',
            'Depende do tipo sanguíneo'
        ],
        'answer': '4',
    },
    {
        'question': 'Depois de doar sangue, posso voltar às minhas atividades normalmente?',
        'options': [
            'Sim, imediatamente',
            'É recomendável descansar e evitar esforço físico no mesmo dia',
            'Só depois de 3 dias',
            'Não há restrições'
        ],
        'answer': 'É recomendável descansar e evitar esforço físico no mesmo dia',
    },
    {
        'question': 'Quem teve COVID-19 pode doar sangue?',
        'options': [
            'Sim, após 10 dias do fim dos sintomas',
            'Não pode mais doar',
            'Apenas depois de 6 meses',
            'Só se for vacinado'
        ],
        'answer': 'Sim, após 10 dias do fim dos sintomas',
    },
    {
        'question': 'Doar sangue emagrece?',
        'options': [
            'Sim',
            'Não',
            'Sim, se fizer regularmente',
        ],
        'answer': 'Não',
    },
]; 

// ================= QUIZ

function checkAnswer(user_response, right_response){
    return user_response == right_response
}

function createOptions(options){
    var res = "";
    for(var option of options){
        var opt = `<input type="radio" name="option_user" value="${option}">
          <label for="">${option}</label><br><br>`;
        res += opt;
    }
    return res;
}

function createCard(question, id){
    return `
        <form id="${id}" class="text-white p-5! mt-5! w-4/5 bg-red-700 rounded-2xl ">
          <p class="text-center mb-5! text-4xl">${question['question']}</p>
          ${createOptions(question['options'])}
        </form>
    `
}

const toNodes = html => new DOMParser().parseFromString(html, 'text/html').body.childNodes[0];

function insert(nodeCard, element=".quiz"){
    var quiz = document.querySelector(element);
    quiz.appendChild(nodeCard)
}

function createQuiz(question, index){
    var card = createCard(question, index);
    var nodeCard = toNodes(card)
    insert(nodeCard)
}

function removeCard(id){
    var card = document.getElementById(id);
    card.remove();
}

function checkResponse(index){
    var userResponse = document.querySelector('input[name="option_user"]:checked').value;
    findScore(index, checkAnswer(userResponse, questions[index].answer));
    removeCard(index);
    startQuiz(index += 1);
}

function functionalityQuiz(index){
    var optionsUser = document.getElementsByName('option_user');
    for(var optUser of optionsUser){
        optUser.addEventListener('click', () => checkResponse(index))
    }
}

function startQuiz(index){
    if(index == questions.length){
        gameOver();
        return;
    }

    createQuiz(questions[index], index);
    functionalityQuiz(index);
}

// =================== SCORE

let scoreResult = 0;
let scoreboard = "";

function createScoreOpt(id){
    return `<div id="score-${id}"class="h-3 w-3 bg-white rounded-full"></div>`
}

function addScore(score){
    scoreNode = toNodes(score);
    insert(scoreNode, ".score");
}

function createScore(){
    for(var i=0; i < questions.length; i++){
        addScore(createScoreOpt(i))
    }
}

function findScore(index, check){
    let score = document.getElementById("score-"+index);
    score.classList.remove("bg-white");
    
    if(check){
        score.classList.add("bg-green-700")
        scoreboard += "1";
        scoreResult++;
    }
    else {
        score.classList.add("bg-red-900")
        scoreboard += "0"
    }
}

// ================ GAME OVER

function gameOver(){
    saveScore();
    var item = `<div class="text-white p-5! mt-5! w-4/5 bg-green-800 rounded-2xl flex justify-center flex-col items-center">
          <p class="text-center mb-5! text-2xl">Você acertou ${scoreResult} de ${questions.length}!</p>
          <img src="assets/check-mark.svg" class="w-45">
          <p class="text-center mb-5! text-xl">Continue para encontrar o hemocentro mais próximo de você.</p>
        </div>`;

    var itemNode = toNodes(item);
    insert(itemNode);
}

function main(){
    startQuiz(0);
    createScore();
}

main();
