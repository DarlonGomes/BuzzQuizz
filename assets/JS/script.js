// VARIÁVEIS GLOBAIS
const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

// Variáveis p/ criar quizz
let tituloQuizz = "";
let urlImagemQuizz = "";
let qntPerguntasQuizz = "";
let qntNiveisQuizz = "";

// Variáveis p/ perguntas quizz
let perguntaTexto = "";
let perguntaCorFundo = "";
let respostaCorreta = "";
let respostaCorretaUrl = "";
let respostaIncorreta1 = "";
let respostaIncorretaUrl1 = "";
let respostaIncorreta2 = "";
let respostaIncorretaUrl2 = "";
let respostaIncorreta3 = "";
let respostaIncorretaUrl3 = "";


function criarQuizz () {
    document.querySelector(".tela1").classList.add("escondido");
    document.querySelector(".tela3").classList.remove("escondido");
    document.querySelector(".tela3-info-quizz").classList.remove("escondido");
}

function prosseguirParaPerguntas () {
    //pega os inputs
    tituloQuizz = document.querySelector(".tela3-info-quizz .titulo-quizz").value;
    urlImagemQuizz = document.querySelector(".tela3-info-quizz .url-imagem-quizz").value;
    qntPerguntasQuizz = document.querySelector(".tela3-info-quizz .qnt-perguntas-quizz").value;
    qntNiveisQuizz = document.querySelector(".tela3-info-quizz .qnt-niveis-quizz").value;

    //avança de página
    document.querySelector(".tela3-info-quizz").classList.add("escondido");
    document.querySelector(".tela3-perguntas-quizz").classList.remove("escondido");

    //verifica se as entradas são válida
}

function prosseguirParaNiveis () {
    //pega os inputs
    perguntaTexto = document.querySelector(".tela3-perguntas-quizz .texto").value;
    perguntaCorFundo = document.querySelector(".tela3-perguntas-quizz .cor-fundo").value;
    respostaCorreta = document.querySelector(".tela3-perguntas-quizz .correta").value;
    respostaCorretaUrl = document.querySelector(".tela3-perguntas-quizz .correta-url").value;
    respostaIncorreta1 = document.querySelector(".tela3-perguntas-quizz .incorreta-1").value;
    respostaIncorretaUrl1 = document.querySelector(".tela3-perguntas-quizz .incorreta-url-1").value;
    respostaIncorreta2 = document.querySelector(".tela3-perguntas-quizz .incorreta-2").value;
    respostaIncorretaUrl2 = document.querySelector(".tela3-perguntas-quizz .incorreta-url-2").value;
    respostaIncorreta3 = document.querySelector(".tela3-perguntas-quizz .incorreta-3").value;
    respostaIncorretaUrl3 = document.querySelector(".tela3-perguntas-quizz .incorreta-url-3").value;


    //avança de página
    document.querySelector(".tela3-perguntas-quizz").classList.add("escondido");
    document.querySelector(".tela3-niveis-quizz").classList.remove("escondido");

    //verifica se as entradas são válidas
}

function finalizarCriacaoQuizz () {

}

function AcessarQuizz () {

}

function voltarHome () {

}