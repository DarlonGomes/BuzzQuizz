// VARIÁVEIS GLOBAIS
let contemErro = 0;

// Variáveis p/ criar quizz (tela 3.1)
let tituloQuizz = "";
let urlImagemQuizz = "";
let qntPerguntasQuizz = "";
let qntNiveisQuizz = "";
let novoQuizz = {};

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
    const titulo = document.querySelector(".tela-tres-info-quizz .titulo-quizz");
    const url = document.querySelector(".tela-tres-info-quizz .url-imagem-quizz");
    const pergunta = document.querySelector(".tela-tres-info-quizz .qnt-perguntas-quizz");
    const nivel = document.querySelector(".tela-tres-info-quizz .qnt-niveis-quizz");

    //pega os inputs
    tituloQuizz = titulo.value;
    urlImagemQuizz = url.value;
    qntPerguntasQuizz = pergunta.value;
    qntNiveisQuizz = nivel.value;


    //verifica se as entradas são válida
    contemErro = 4;

        //Retira excesso de aviso
    if(titulo.classList.contains("tem-erro")) {
        titulo.classList.remove("tem-erro");
        titulo.nextElementSibling.remove();
    }
    if(url.classList.contains("tem-erro")) {
        url.classList.remove("tem-erro");
        url.nextElementSibling.remove();
    } 
    if(nivel.classList.contains("tem-erro")) {
        nivel.classList.remove("tem-erro");
        nivel.nextElementSibling.remove();
    } 
    if(pergunta.classList.contains("tem-erro")) {
        pergunta.classList.remove("tem-erro");
        pergunta.nextElementSibling.remove();
    }

        //confere erro no título
    if(tituloQuizz.length > 65 || tituloQuizz.length < 20) {
        if(!titulo.classList.contains("tem-erro")){
            titulo.classList.add("tem-erro");
            titulo.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O Título precisa ter entre 20 e 65 caracteres</p></div>`);
        } 
    } else contemErro--;
 
        //confere erro na URL
    let ehURL = urlCheck(urlImagemQuizz);
    if(!ehURL) {
        if(!url.classList.contains("tem-erro")){
            url.classList.add("tem-erro");
            url.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O valor informado não é uma URL válida</p></div>`);
        }
    } else contemErro--;

        //confere erro nas perguntas
    if(qntPerguntasQuizz < 3) {
        if(!pergunta.classList.contains("tem-erro")){
            pergunta.classList.add("tem-erro");
            pergunta.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O quizz deve ter no mínimo 3 perguntas</p></div>`);
        }
    } else contemErro--;

        //confere erro nos níveis
    if(qntNiveisQuizz < 2) {
        if(!nivel.classList.contains("tem-erro")){
            nivel.classList.add("tem-erro");
            nivel.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O quizz deve ter no mínimo 2 níveis</p></div>`);
        }
    } else contemErro--;

    if(contemErro !== 0) {
        return;
    }


    
    //avança de página
    document.querySelector(".tela-tres-info-quizz").classList.add("escondido");
    document.querySelector(".tela-tres-perguntas-quizz").classList.remove("escondido");
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
    carregarPagina("home");
}

// Teste se a STRING é uma URL
function urlCheck(str)
{
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}
