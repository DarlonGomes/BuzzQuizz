// VARIÁVEIS GLOBAIS
let contemErro = 0;
let erroExtra = 0;
let temRespostaCorreta = false;
let temRespostaIncorreta = false;
let temRespostaIncorreta2 = false;
let temRespostaIncorreta3 = false;
const novoQuizz = {};


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

        //Retira os avisos
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
    if(qntPerguntasQuizz < 3 || isNaN(qntPerguntasQuizz)) {
        if(!pergunta.classList.contains("tem-erro")){
            pergunta.classList.add("tem-erro");
            pergunta.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O quizz deve ter no mínimo 3 perguntas</p></div>`);
        }
    } else contemErro--;

        //confere erro nos níveis
    if(qntNiveisQuizz < 2 || isNaN(qntNiveisQuizz)) {
        if(!nivel.classList.contains("tem-erro")){
            nivel.classList.add("tem-erro");
            nivel.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O quizz deve ter no mínimo 2 níveis</p></div>`);
        }
    } else contemErro--;

    if(contemErro !== 0) {
        return;
    }
    
    //adiciona os valores ao objeto
    colocaNoObjeto(1);

    //renderiza a pagina de perguntas com os inputs
    if(qntNiveisQuizz > 2) {
        for(let i = 0; i < (qntNiveisQuizz - 2); i++) {
            document.querySelector(".tela-tres-niveis-quizz").innerHTML += `
            <div class="nivel-quizz ${3 + i}">
                <h3>Nível ${3 + i}</h3><ion-icon name="create-outline"></ion-icon>
            </div>
            `;
        }
    }
    document.querySelector(".tela-tres-niveis-quizz").innerHTML += `
    <button onclick="finalizarCriacaoQuizz()">Finalizar Quizz</button>
    `

    if(qntPerguntasQuizz > 3) {
        for(let i = 0; i < (qntPerguntasQuizz - 3); i++) {
            document.querySelector(".tela-tres-perguntas-quizz").innerHTML += `
            <div class="perguntas-quizz-pergunta ${4 + i}" onclick="selecionaPergunta(this)">
                <h3>Pergunta ${4 + i}</h3> <ion-icon name="create-outline"></ion-icon>
            </div>
            `
        }
    }
    document.querySelector(".tela-tres-perguntas-quizz").innerHTML += `
    <button onclick="prosseguirParaNiveis()">Prosseguir pra criar níveis</button>
    `;

    //avança de página
    document.querySelector(".tela-tres-info-quizz").classList.add("escondido");
    document.querySelector(".tela-tres-perguntas-quizz").classList.remove("escondido");
}

//Botão da segunda página de criar quizz, prossegue de página para níveis e computa os valores (tela 3.2)
function prosseguirParaNiveis() {
    const texto = document.querySelector(".tela-tres-perguntas-quizz .texto");
    const corFundo = document.querySelector(".tela-tres-perguntas-quizz .cor-fundo");
    const correta = document.querySelector(".tela-tres-perguntas-quizz .correta");
    const corretaUrl = document.querySelector(".tela-tres-perguntas-quizz .correta-url");
    const incorreta1 = document.querySelector(".tela-tres-perguntas-quizz .incorreta-1");
    const incorretaUrl1 = document.querySelector(".tela-tres-perguntas-quizz .incorreta-url-1");
    const incorreta2 = document.querySelector(".tela-tres-perguntas-quizz .incorreta-2");
    const incorretaUrl2 = document.querySelector(".tela-tres-perguntas-quizz .incorreta-url-2");
    const incorreta3 = document.querySelector(".tela-tres-perguntas-quizz .incorreta-3");
    const incorretaUrl3 = document.querySelector(".tela-tres-perguntas-quizz .incorreta-url-3");

    //pega os inputs
    perguntaTexto = texto.value;
    perguntaCorFundo = corFundo.value;
    respostaCorreta = correta.value;
    respostaCorretaUrl = corretaUrl.value;
    respostaIncorreta1 = incorreta1.value;
    respostaIncorretaUrl1 = incorretaUrl1.value;
    respostaIncorreta2 = incorreta2.value;
    respostaIncorretaUrl2 = incorretaUrl2.value;
    respostaIncorreta3 = incorreta3.value;
    respostaIncorretaUrl3 = incorretaUrl3.value;



    //verifica se as entradas são válida
    contemErro = 6;
    erroExtra = 4;
    temRespostaIncorreta = false;
    temRespostaIncorreta2 = false;
    temRespostaIncorreta3 = false;

        //Retira os avisos
    if(texto.classList.contains("tem-erro")) {
        texto.classList.remove("tem-erro");
        texto.nextElementSibling.remove();
    }
    if(corFundo.classList.contains("tem-erro")) {
        corFundo.classList.remove("tem-erro");
        corFundo.nextElementSibling.remove();
    } 
    if(correta.classList.contains("tem-erro")) {
        correta.classList.remove("tem-erro");
        correta.nextElementSibling.remove();
    } 
    if(corretaUrl.classList.contains("tem-erro")) {
        corretaUrl.classList.remove("tem-erro");
        corretaUrl.nextElementSibling.remove();
    }
    if(incorreta1.classList.contains("tem-erro")) {
        incorreta1.classList.remove("tem-erro");
        incorreta1.nextElementSibling.remove();
    }
    if(incorretaUrl1.classList.contains("tem-erro")) {
        incorretaUrl1.classList.remove("tem-erro");
        incorretaUrl1.nextElementSibling.remove();
    } 
    if(incorreta2.classList.contains("tem-erro")) {
        incorreta2.classList.remove("tem-erro");
        incorreta2.nextElementSibling.remove();
    } 
    if(incorretaUrl2.classList.contains("tem-erro")) {
        incorretaUrl2.classList.remove("tem-erro");
        incorretaUrl2.nextElementSibling.remove();
    }
    if(incorreta3.classList.contains("tem-erro")) {
        incorreta3.classList.remove("tem-erro");
        incorreta3.nextElementSibling.remove();
    }
    if(incorretaUrl3.classList.contains("tem-erro")) {
        incorretaUrl3.classList.remove("tem-erro");
        incorretaUrl3.nextElementSibling.remove();
    } 

        //confere erro no título
    if(perguntaTexto.length < 20) {
        if(!texto.classList.contains("tem-erro")){
            texto.classList.add("tem-erro");
            texto.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O texto precisa ter mais de 20 caracteres</p></div>`);
        } 
    } else contemErro--;

    if(perguntaCorFundo.length !== 7 || perguntaCorFundo[0] !== "#") {
        if(!corFundo.classList.contains("tem-erro")){
            corFundo.classList.add("tem-erro");
            corFundo.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>A cor começa com '#' e tem 6 caracteres em Hexadecimal</p></div>`);
        } 
    } else contemErro--;

        //confere resposta correta
    if(respostaCorreta.length < 1 || !respostaCorreta.replace(/\s/g, '').length) {
        if(!correta.classList.contains("tem-erro")){
            correta.classList.add("tem-erro");
            correta.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>Texto não pode estar vazio</p></div>`);
        } 
    } else {
        contemErro--;
        temRespostaCorreta = true;
    }

        //confere erro na URL da resposta correta
    let ehURL = urlCheck(respostaCorretaUrl);
    if(!ehURL) {
        if(!corretaUrl.classList.contains("tem-erro")){
            corretaUrl.classList.add("tem-erro");
            corretaUrl.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O valor informado não é uma URL válida</p></div>`);
        }
    } else contemErro--;

        //confere resposta errada 1
    if(respostaIncorreta1.length < 1 || !respostaIncorreta1.replace(/\s/g, '').length) {
        if(!incorreta1.classList.contains("tem-erro")){
            incorreta1.classList.add("tem-erro");
            incorreta1.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>É necessário, no mínimo, 2(duas) respostas</p></div>`);
        } 
    } else {
        contemErro--;
        temRespostaIncorreta = true;
    }
 
        //confere erro na URL da resposta errada 1
    ehURL = urlCheck(respostaIncorretaUrl1);
    if(!ehURL) {
        if(!incorretaUrl1.classList.contains("tem-erro")){
            incorretaUrl1.classList.add("tem-erro");
            incorretaUrl1.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O valor informado não é uma URL válida</p></div>`);
        }
    } else contemErro--;

        //confere resposta errada 2
    if(respostaIncorreta2 !== "" && temRespostaIncorreta) {
        erroExtra--;
        temRespostaIncorreta2 = true;
    } else if(temRespostaIncorreta === false) {
        incorreta2.classList.add("tem-erro");
        incorreta2.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>Preencha as respostas em ordem</p></div>`);
    }

        //confere erro na URL da resposta errada 2
    if(temRespostaIncorreta2) {
        ehURL = urlCheck(respostaIncorretaUrl2);
        if(!ehURL) {
            if(!incorretaUrl2.classList.contains("tem-erro")){
                incorretaUrl2.classList.add("tem-erro");
                incorretaUrl2.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O valor informado não é uma URL válida</p></div>`);
            }
        } else erroExtra--;
    }

        //confere resposta errada 3
    if(respostaIncorreta3 !== "" && temRespostaIncorreta2 && temRespostaIncorreta) {
        erroExtra--;
        temRespostaIncorreta3 = true;
    } else if(temRespostaIncorreta === false && temRespostaIncorreta2 === false) {
        incorreta3.classList.add("tem-erro");
        incorreta3.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>Preencha as respostas em ordem</p></div>`);
    }

        //confere resposta errada 3
    if(respostaIncorreta3 !== "" && !temRespostaIncorreta2 && temRespostaIncorreta) {
        incorreta3.classList.add("tem-erro");
        incorreta3.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>Preencha as respostas em ordem</p></div>`);
    }

        //confere erro na URL da resposta errada 3
    if(temRespostaIncorreta3) {
        ehURL = urlCheck(respostaIncorretaUrl3);
        if(!ehURL) {
            if(!incorretaUrl3.classList.contains("tem-erro")){
                incorretaUrl3.classList.add("tem-erro");
                incorretaUrl3.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O valor informado não é uma URL válida</p></div>`);
            }
        } else erroExtra--;
    }

    if(!temRespostaCorreta || contemErro !== 0) {
        return;
    }
    
    if(temRespostaIncorreta && temRespostaIncorreta2 && !temRespostaIncorreta3 && erroExtra !== 2) {
        return;
    }
    
    if(temRespostaIncorreta && temRespostaIncorreta2 && temRespostaIncorreta3 && erroExtra !== 0) {
        return;
    }

    //adiciona os valores ao objeto
    colocaNoObjeto(2);

    //avança de página
    document.querySelector(".tela-tres-perguntas-quizz").classList.add("escondido");
    document.querySelector(".tela-tres-niveis-quizz").classList.remove("escondido");

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

function colocaNoObjeto(parte) {
    if(parte === 1) {
        novoQuizz.title = tituloQuizz;
        novoQuizz.image = urlImagemQuizz;
    }

    if(parte === 2) {
        
    }

    if(parte === 3) {
        
    }

    if(parte === 4) {
        
    }
}