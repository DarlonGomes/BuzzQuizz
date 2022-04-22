// VARIÁVEIS GLOBAIS

// Variáveis p/ criar quizz (tela 3.1)
let tituloQuizz = "";
let urlImagemQuizz = "";
let qntPerguntasQuizz = "";
let qntNiveisQuizz = "";

// Variáveis p/ perguntas do quizz (tela 3.2)
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

// Variáveis p/ níveis do quizz (tela 3.3)
let tituloNivel = "";
let porcentagemAcerto = "";
let urlImagemNivel = "";
let descricaoNivel = "";


//Botão para prosseguir para tela de criar Quizz
function criarQuizz() {
    document.querySelector(".tela-um").classList.add("escondido");
    document.querySelector(".tela-tres").classList.remove("escondido");
    document.querySelector(".tela-tres-info-quizz").classList.remove("escondido");
}

//Botão da primeira página de criar quizz, prossegue de página para perguntas e computa os valores da página atual (tela 3.1)
function prosseguirParaPerguntas() {
    //pega os inputs
    tituloQuizz = document.querySelector(".tela-tres-info-quizz .titulo-quizz").value;
    urlImagemQuizz = document.querySelector(".tela-tres-info-quizz .url-imagem-quizz").value;
    qntPerguntasQuizz = document.querySelector(".tela-tres-info-quizz .qnt-perguntas-quizz").value;
    qntNiveisQuizz = document.querySelector(".tela-tres-info-quizz .qnt-niveis-quizz").value;

    //avança de página
    document.querySelector(".tela-tres-info-quizz").classList.add("escondido");
    document.querySelector(".tela-tres-perguntas-quizz").classList.remove("escondido");

    //verifica se as entradas são válida
}

//Botão da segunda página de criar quizz, prossegue de página para níveis e computa os valores (tela 3.2)
function prosseguirParaNiveis() {
    //pega os inputs
    perguntaTexto = document.querySelector(".tela-tres-perguntas-quizz .texto").value;
    perguntaCorFundo = document.querySelector(".tela-tres-perguntas-quizz .cor-fundo").value;
    respostaCorreta = document.querySelector(".tela-tres-perguntas-quizz .correta").value;
    respostaCorretaUrl = document.querySelector(".tela-tres-perguntas-quizz .correta-url").value;
    respostaIncorreta1 = document.querySelector(".tela-tres-perguntas-quizz .incorreta-1").value;
    respostaIncorretaUrl1 = document.querySelector(".tela-tres-perguntas-quizz .incorreta-url-1").value;
    respostaIncorreta2 = document.querySelector(".tela-tres-perguntas-quizz .incorreta-2").value;
    respostaIncorretaUrl2 = document.querySelector(".tela-tres-perguntas-quizz .incorreta-url-2").value;
    respostaIncorreta3 = document.querySelector(".tela-tres-perguntas-quizz .incorreta-3").value;
    respostaIncorretaUrl3 = document.querySelector(".tela-tres-perguntas-quizz .incorreta-url-3").value;


    //avança de página
    document.querySelector(".tela-tres-perguntas-quizz").classList.add("escondido");
    document.querySelector(".tela-tres-niveis-quizz").classList.remove("escondido");

    //verifica se as entradas são válidas
}

//Botão da terceira página de criar quizz, prossegue de página para o quizz finalizado, computa os valores e envia o quizz para API (tela 3.3)
function finalizarCriacaoQuizz() {
    //pega os inputs
    tituloNivel = document.querySelector(".tela-tres-niveis-quizz .titulo-nivel").value;
    porcentagemAcerto = document.querySelector(".tela-tres-niveis-quizz .porcentagem-acerto").value;
    urlImagemNivel = document.querySelector(".tela-tres-niveis-quizz .url-imagem-nivel").value;
    descricaoNivel = document.querySelector(".tela-tres-niveis-quizz .descricao-nivel").value;

    //avança de página
    document.querySelector(".tela-tres-niveis-quizz").classList.add("escondido");
    document.querySelector(".tela-tres-sucesso-quizz").classList.remove("escondido");

    //verifica se as entradas são válidas

    //envia o quizz para API
}

//Botão da primeira página de criar quizz. Prossegue de página e computa os valores (tela 3.4)
function AcessarQuizz() {

}

//Botão da primeira página de criar quizz. Prossegue de página e computa os valores (tela 3.4)
function voltarHome() {
    //Volta para home
    document.querySelector(".tela-tres-sucesso-quizz").classList.add("escondido");
    document.querySelector(".tela-tres").classList.add("escondido");
    document.querySelector(".tela-um").classList.remove("escondido");

    //Zera as variáveis de criação de quizz
    tituloQuizz = "";
    urlImagemQuizz = "";
    qntPerguntasQuizz = "";
    qntNiveisQuizz = "";
    perguntaTexto = "";
    perguntaCorFundo = "";
    respostaCorreta = "";
    respostaCorretaUrl = "";
    respostaIncorreta1 = "";
    respostaIncorretaUrl1 = "";
    respostaIncorreta2 = "";
    respostaIncorretaUrl2 = "";
    respostaIncorreta3 = "";
    respostaIncorretaUrl3 = "";
    tituloNivel = "";
    porcentagemAcerto = "";
    urlImagemNivel = "";
    descricaoNivel = "";

    //Carrega os Meus quizzes

    //Carrega os quizzes da comunidade
}

