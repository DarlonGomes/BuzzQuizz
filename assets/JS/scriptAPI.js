// VARIÁVEIS GLOBAIS
const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

//Função que carrega página principal

function carregarPaginaPrincipal () {
    document.querySelector(".carregando").classList.remove("escondido");

    const promisse = axios.get(API);
    promisse.then(renderizarQuizzes);

}

function renderizarQuizzes (el) {
    const array = el.data;
    const containerComunidade = document.querySelector(".container-comunidade");

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
        <div class="quizz-comunidade" onclick="selecionarQuizz(this)">
            <img src="${array[i].image}" alt="Imagem do Quizz: ${array[i].title}">
            <p>${array[i].title}</p>
        </div>
        `
    }
}

/* <div class="container-comunidade">
                <div class="quizz-comunidade">
                    <p>Lucas é TOP</p>
                </div> */

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

// id: 131
// image: "https://http.cat/411.jpg"
// levels: (2) [{…}, {…}]
// questions: (3) [{…}, {…}, {…}]
// title: "Título do quizz"