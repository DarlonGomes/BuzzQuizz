// VARIÁVEIS GLOBAIS
const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
let qualPagina = "";
let idQuizz = "";
let primeiroAcesso = 0;

//Função que carrega página principal

if(primeiroAcesso === 0) {
    carregarPagina("home");
    primeiroAcesso = 1;
}

function carregarPagina (pagina) {
    document.querySelector(".tela-um").classList.add("escondido");
    document.querySelector(".tela-dois").classList.add("escondido");
    document.querySelector(".tela-tres").classList.add("escondido");
    document.querySelector(".carregando").classList.remove("escondido");

    const promisse = axios.get(API);
    promisse.then(renderizarQuizzes);
    qualPagina = pagina;
}


//Renderiza os quizzes da COMUNIDADE
function renderizarQuizzes (el) {
    const array = el.data;
    const containerComunidade = document.querySelector(".container-comunidade");
    const containerUsuario = document.querySelector(".container-usuario");

    console.log(array.length);
    console.log(el);
    console.log(el.data[1]);
    console.log(el.data[1].id);
    console.log(el.data[1].image);
    console.log(el.data[1].levels);
    console.log(el.data[1].questions);
    console.log(el.data[1].title);

    for(let i = 0; i < array.length; i++) {
        containerComunidade.innerHTML += `
        <div class="quizz-comunidade" id="${array[i].id}" onclick="selecionarQuizz(this)" title="${array[i].title}">
            <img src="${array[i].image}" alt="Imagem do Quizz: ${array[i].title}">
            <p>${array[i].title}</p>
        </div>
        `
    }

    for(let i = 0; i < array.length; i++) {
        containerComunidade.innerHTML += `
        <div class="quizz-comunidade" id="${array[i].id}" onclick="selecionarQuizz(this)" title="${array[i].title}">
            <img src="${array[i].image}" alt="Imagem do Quizz: ${array[i].title}">
            <p>${array[i].title}</p>
        </div>
        `
    }

    if(qualPagina === "home") {
        document.querySelector(".tela-um").classList.remove("escondido");
        document.querySelector(".carregando").classList.add("escondido");
    }
}

function selecionarQuizz(el) {
    idQuizz = el.id;
    const promisse = axios.get(`${API}/${idQuizz}`);
 
    promisse.then(renderizarQuizzSelecionado);
}

function renderizarQuizzSelecionado (el) {

    const quizz = el.data;
    console.log(quizz)
    console.log(quizz)
    console.log(quizz.id)
    console.log(quizz)

    

    if(qualPagina === "tela-dois") {
        document.querySelector(".tela-dois").classList.remove("escondido");
        document.querySelector(".carregando").classList.add("escondido");
    }
}

// <div class="banner">
// <p>O quão TOP o Lucas é?</p>
// </div>
// <div class="container-questao">
// <div class="questao">
//     <div class="pergunta"><p>Qual desses Lucas é o mais TOP?</p></div>
//     <div class="resposta">
//         <img src="assets/IMAGE/lucas-sorridente.png" alt="Lucas sendo TOP"/>
//         <p>Lucas Sorridente</p>
//     </div>
//     <div class="resposta">
//         <img src="assets/IMAGE/lucas-coxinha.png" alt="Lucas com coxinha"/>
//         <p>Lucas coxinha</p>
//     </div>
//     <div class="resposta">
//         <img src="assets/IMAGE/lucas-sem-cabelo.png" alt="Lucas sem cabelo"/>
//         <p>Lucas sem cabelo</p>
//     </div>
//     <div class="resposta">
//         <img src="assets/IMAGE/lucas-encantador.png" alt="Lucas encantador de gatos"/>
//         <p>Lucas encantador de gatos</p>
//     </div>
// </div>
// </div>

// id: 160
// image: "https://http.cat/411.jpg"
// levels: (2) [{…}, {…}]
// questions: (3) [{…}, {…}, {…}]
// title: "Título do quizz"