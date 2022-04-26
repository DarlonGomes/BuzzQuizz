// VARIÁVEIS GLOBAIS
let contemErro = 0;
let erroExtra = 0;
let temRespostaCorreta = false;
let temRespostaIncorreta = false;
let temRespostaIncorreta2 = false;
let temRespostaIncorreta3 = false;
const novoQuizz = {};
let numIdPergunta = 0;
let numIdNivel = 0;

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
let perguntasCriadas = 0;
let nivelCriados = 0;
let qntRespostas = 4;
let ultimoElemento = "";

// Variáveis p/ níveis do quizz (tela 3.3)
let tituloNivel = "";
let porcentagemAcerto = "";
let urlImagemNivel = "";
let descricaoNivel = "";
let temPorcentagemZero = false;


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


    //verifica se as entradas são válidas
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

    //renderiza a pagina de perguntas e níveis com os inputs
    if(qntNiveisQuizz > 2) {
        for(let i = 0; i < (qntNiveisQuizz - 2); i++) {
            document.querySelector(".niveis-quizz").innerHTML += `
            <div class="nivel-quizz" id="n${3 + i}" onclick="selecionaNivel(this)">
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
            <div class="perguntas-quizz-pergunta" id="p${4 + i}" onclick="selecionaPergunta(this)">
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

    //Verifica se a pergunta aberta está preenchida corretamente
    const selecionado = document.querySelector(".organizador");
    numIdPergunta = Number(selecionado.id.replace("p",""));
    const semErro = verificaPergunta(ultimoElemento.firstElementChild.id);
    if(!semErro) {
        return;
    }

    //verifica se todas as perguntas estão preenchidas
    const tudoFeito = document.querySelectorAll(".feito").length;
    if(tudoFeito !== Number(qntPerguntasQuizz)) {
        return;
    }

    //avança de página
    document.querySelector(".tela-tres-perguntas-quizz").classList.add("escondido");
    document.querySelector(".tela-tres-niveis-quizz").classList.remove("escondido");

}

//Botão da terceira página de criar quizz, prossegue de página para o quizz finalizado, computa os valores e envia o quizz para API (tela 3.3)
function finalizarCriacaoQuizz() {
    //confere porcentagem 0
    for(let i = 0; i < qntNiveisQuizz; i++) {
        if(novoQuizz.levels[i].minValue === 0 || Number(document.querySelector(".porcentagem-acerto").value) === 0) {
            temPorcentagemZero = true;
        }
    }
    if(!temPorcentagemZero) {
        return;
    }

    //Verifica se o nível aberto está preenchido corretamente
    const selecionado = document.querySelector(".nivel");
    numIdNivel = Number(selecionado.id.replace("n",""));
    const semErro = verificaNivel(ultimoElemento.id);
    if(!semErro) {
        return;
    }

    //verifica se todas as perguntas estão preenchidas
    const tudoFeito = document.querySelectorAll(".feito").length;
    if(tudoFeito !== (Number(qntNiveisQuizz) + Number(qntPerguntasQuizz))) {
        return;
    }

    //envia o quizz para API
    retiraRespostaVazia()
    enviaQuizz();

    //avança de página
    //document.querySelector(".tela-tres-niveis-quizz").classList.add("escondido");
    //document.querySelector(".tela-tres-sucesso-quizz").classList.remove("escondido");
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
        novoQuizz.questions = [];
        novoQuizz.levels = [];

        for(let i = 0; i < qntPerguntasQuizz; i++) {
            novoQuizz.questions.push({title:"",color:"",answers:[]});
        }
        for(let i = 0; i < qntNiveisQuizz; i++) {
            novoQuizz.levels.push({title:"",image:"",text:"",minValue:""});
        }
    }

    if(parte === 2) {
    //confere se o array das respostas está definido ou não
    const jahPreenchido = novoQuizz.questions[numIdPergunta - 1].answers[0];

    //caso não esteja faz o push com a quantidade de respostas
    if(typeof(jahPreenchido) === "undefined") {
        for(let i = 0; i < qntRespostas; i++) {
            novoQuizz.questions[numIdPergunta - 1].answers.push({text:"",image:"",isCorrectAnswer:""});
        }
    }

    //atribui os valores
        novoQuizz.questions[numIdPergunta - 1].title = perguntaTexto;
        novoQuizz.questions[numIdPergunta - 1].color = perguntaCorFundo;
        novoQuizz.questions[numIdPergunta - 1].answers[0].text = respostaCorreta;
        novoQuizz.questions[numIdPergunta - 1].answers[0].image = respostaCorretaUrl;
        novoQuizz.questions[numIdPergunta - 1].answers[0].isCorrectAnswer = true;
        novoQuizz.questions[numIdPergunta - 1].answers[1].text = respostaIncorreta1;
        novoQuizz.questions[numIdPergunta - 1].answers[1].image = respostaIncorretaUrl1;
        novoQuizz.questions[numIdPergunta - 1].answers[1].isCorrectAnswer = false;
        novoQuizz.questions[numIdPergunta - 1].answers[2].text = respostaIncorreta2;
        novoQuizz.questions[numIdPergunta - 1].answers[2].image = respostaIncorretaUrl2;
        novoQuizz.questions[numIdPergunta - 1].answers[2].isCorrectAnswer = false;
        novoQuizz.questions[numIdPergunta - 1].answers[3].text = respostaIncorreta3;
        novoQuizz.questions[numIdPergunta - 1].answers[3].image = respostaIncorretaUrl3;
        novoQuizz.questions[numIdPergunta - 1].answers[3].isCorrectAnswer = false;
    }

    if(parte === 3) {
    //confere se o array das respostas está definido ou não
    //const jahPreenchido = novoQuizz.levels[numIdNivel - 1].answers[0];

    //caso não esteja faz o push com a quantidade de respostas
    //if(typeof(jahPreenchido) === "undefined") {
    //    for(let i = 0; i < qntNiveisQuizz; i++) {
    //        novoQuizz.questions[numIdPergunta - 1].answers.push({text:"",image:"",isCorrectAnswer:""});
    //    }
    //}

    //atribui os valores
    novoQuizz.levels[numIdNivel - 1].title = tituloNivel;
    novoQuizz.levels[numIdNivel - 1].image = urlImagemNivel;
    novoQuizz.levels[numIdNivel - 1].text = descricaoNivel;
    novoQuizz.levels[numIdNivel - 1].minValue = porcentagemAcerto;     
    }

    if(parte === 4) {
        
    }
}

function selecionaPergunta(el) {
    const selecionado = document.querySelector(".organizador");
    const novoId = Number(el.id.replace("p",""));
    numIdPergunta = Number(selecionado.id.replace("p",""));
    let semErro = verificaPergunta(selecionado.id);
    
    if(selecionado === el) {
        console.log("nada acontece, feijoada");
        return;
    }

    if(!semErro) {
        console.log("tem erro, arrume e tente de novo")
        return;
    }

    ultimoElemento = el;

    //Arruma o layout para preencher os inputs do item selecionado
    selecionado.parentElement.classList.add("perguntas-quizz-pergunta");
    selecionado.parentElement.classList.add("feito");
    selecionado.parentElement.setAttribute("id", selecionado.id);
    selecionado.parentElement.setAttribute("onclick", "selecionaPergunta(this)");
    selecionado.parentElement.classList.remove("container-info-pergunta");
    selecionado.parentElement.innerHTML = `
    <h3>Pergunta ${numIdPergunta}</h3> <ion-icon name="create-outline"></ion-icon>
    `


    //Coloca os inputs no item selecionado

    el.innerHTML = `
    <div class="organizador" id="p${novoId}" onclick="selecionaPergunta(this)">
        <h3>Pergunta ${novoId}</h3>
        <div class="pergunta-texto">
            <input type="text" class="texto" placeholder="Texto da pergunta">
            <input type="text" class="cor-fundo" placeholder="Cor de fundo da pergunta">
        </div>
        <h3>Resposta correta</h3>
        <div class="resposta-correta">
            <input type="text" class="correta" placeholder="Resposta correta">
            <input type="text" class="correta-url" placeholder="URL da imagem">
        </div>
        <h3>Respostas incorretas</h3>
        <div class="resposta-incorreta">
            <input type="text" class="incorreta-1" placeholder="Resposta incorreta 1">
            <input type="text" class="incorreta-url-1" placeholder="URL da imagem 1">
        </div>
        <div class="resposta-incorreta">
            <input type="text" class="incorreta-2" placeholder="Resposta incorreta 2">
            <input type="text" class="incorreta-url-2" placeholder="URL da imagem 2">
        </div>
        <div class="resposta-incorreta">
            <input type="text" class="incorreta-3" placeholder="Resposta incorreta 3">
            <input type="text" class="incorreta-url-3" placeholder="URL da imagem 3">
        </div>
    </div>    
    `;
    el.classList.add("container-info-pergunta");
    el.classList.remove("perguntas-quizz-pergunta");

    if(el.classList.contains("feito")) { //essa parte da pra melhorar entrando com input
        el.classList.remove("feito"); //
        el.querySelector(".texto").value = novoQuizz.questions[novoId - 1].title;
        el.querySelector(".cor-fundo").value = novoQuizz.questions[novoId - 1].color;
        el.querySelector(".correta").value = novoQuizz.questions[novoId - 1].answers[0].text;
        el.querySelector(".correta-url").value = novoQuizz.questions[novoId - 1].answers[0].image;
        el.querySelector(".incorreta-1").value = novoQuizz.questions[novoId - 1].answers[1].text;
        el.querySelector(".incorreta-url-1").value = novoQuizz.questions[novoId - 1].answers[1].image;
        el.querySelector(".incorreta-2").value = novoQuizz.questions[novoId - 1].answers[2].text;
        el.querySelector(".incorreta-url-2").value = novoQuizz.questions[novoId - 1].answers[2].image;
        el.querySelector(".incorreta-3").value = novoQuizz.questions[novoId - 1].answers[3].text;
        el.querySelector(".incorreta-url-3").value = novoQuizz.questions[novoId - 1].answers[3].image;
    }

    el.removeAttribute("id");
    el.removeAttribute("onclick");
}

function selecionaNivel(el) {

    const selecionado = document.querySelector(".nivel");
    const novoId = Number(el.id.replace("n",""));
    numIdNivel = Number(selecionado.id.replace("n",""));
    let semErro = verificaNivel(selecionado.id);


    if(selecionado === el) {
        console.log("nada acontece, feijoada - nivel");
        return;
    }

    if(!semErro) {
        console.log("tem erro, arrume e tente de novo - nivel")
        return;
    }

    ultimoElemento = el;

    //Arruma o layout para preencher os inputs do item selecionado
    selecionado.classList.add("nivel-quizz");
    selecionado.classList.add("feito");
    //selecionado.setAttribute("id", selecionado.id);
    //selecionado.setAttribute("onclick", "selecionaPergunta(this)");
    selecionado.classList.remove("nivel");
    selecionado.innerHTML = `
    <h3>Nível ${numIdNivel}</h3><ion-icon name="create-outline"></ion-icon>
    `;

    //Coloca os inputs no item selecionado
    el.innerHTML = `
    <div class="container-nivel">
        <h3>Nível ${novoId}</h3>
        <input type="text" class="titulo-nivel" placeholder="Título do nível">
        <input type="text" class="porcentagem-acerto" placeholder="% de acerto mínima">
        <input type="text" class="url-imagem-nivel" placeholder="URL da imagem do nível">
        <input type="text" class="descricao-nivel" placeholder="Descrição do nível">
    </div>   
    `;
    el.classList.add("nivel");
    el.classList.remove("nivel-quizz");

    if(el.classList.contains("feito")) { //essa parte da pra melhorar entrando com input
        el.classList.remove("feito"); //
        el.querySelector(".titulo-nivel").value = novoQuizz.levels[novoId - 1].title;
        el.querySelector(".url-imagem-nivel").value = novoQuizz.levels[novoId - 1].image;
        el.querySelector(".descricao-nivel").value = novoQuizz.levels[novoId - 1].text;
        el.querySelector(".porcentagem-acerto").value = novoQuizz.levels[novoId - 1].minValue;
    }

    // el.removeAttribute("id");
    // el.removeAttribute("onclick");
}

function verificaPergunta(id) {
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

    //verifica se as entradas são válidas
    contemErro = 6;
    erroExtra = 4;
    temRespostaIncorreta = false;
    temRespostaIncorreta2 = false;
    temRespostaIncorreta3 = false;
    const qualPergunta = document.getElementById(id);

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

    let testCor = /^#([0-9a-f]{3}){1,2}$/i;
    if(perguntaCorFundo[0] !== "#" || !testCor.test(perguntaCorFundo)) {
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

    //caso tenha erro retira a classe feito se tiver e retorna false
    if(!temRespostaCorreta || contemErro !== 0) {
        if(qualPergunta.classList.contains("feito")) {
            qualPergunta.classList.remove("feito");
            perguntasCriadas--;
            return false;
        } else {
            return false;
        }
    }
    
    if(temRespostaIncorreta && temRespostaIncorreta2 && !temRespostaIncorreta3 && erroExtra !== 2) {
        if(qualPergunta.classList.contains("feito")) {
            qualPergunta.classList.remove("feito");
            perguntasCriadas--;
            return false;
        } else {
            return false;
        }
    }
    
    if(temRespostaIncorreta && temRespostaIncorreta2 && temRespostaIncorreta3 && erroExtra !== 0) {
        if(qualPergunta.classList.contains("feito")) {
            qualPergunta.classList.remove("feito");
            perguntasCriadas--;
            return false;
        } else {
            return false;
        }
    }

    //se tudo está correto adiciona a classe feito, caso não tenha, e retorna verdadeiro
    if(qualPergunta.classList.contains("feito")) {
        //adiciona os valores ao objeto
        colocaNoObjeto(2);

        return true;

    } else {
        qualPergunta.classList.add("feito");
        perguntasCriadas++;

        //adiciona os valores ao objeto
        colocaNoObjeto(2);

        return true;
    }
}

function verificaNivel(id) {
    const titulo = document.querySelector(".tela-tres-niveis-quizz .titulo-nivel");
    const acerto = document.querySelector(".tela-tres-niveis-quizz .porcentagem-acerto");
    const urlNivel = document.querySelector(".tela-tres-niveis-quizz .url-imagem-nivel");
    const descricao = document.querySelector(".tela-tres-niveis-quizz .descricao-nivel");

    //pega os inputs
    tituloNivel = titulo.value;
    porcentagemAcerto = Number(acerto.value);
    urlImagemNivel = urlNivel.value;
    descricaoNivel = descricao.value;

    //verifica se as entradas são válidas
    contemErro = 4;
    const qualNivel = document.getElementById(id);

        //Retira os avisos
    if(titulo.classList.contains("tem-erro")) {
        titulo.classList.remove("tem-erro");
        titulo.nextElementSibling.remove();
    }
    if(acerto.classList.contains("tem-erro")) {
        acerto.classList.remove("tem-erro");
        acerto.nextElementSibling.remove();
    } 
    if(urlNivel.classList.contains("tem-erro")) {
        urlNivel.classList.remove("tem-erro");
        urlNivel.nextElementSibling.remove();
    } 
    if(descricao.classList.contains("tem-erro")) {
        descricao.classList.remove("tem-erro");
        descricao.nextElementSibling.remove();
    }

        //confere erro no título
    if(tituloNivel.length < 10) {
        if(!titulo.classList.contains("tem-erro")){
            titulo.classList.add("tem-erro");
            titulo.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O Título precisa ter mais de 10 caracteres</p></div>`);
        } 
    } else contemErro--;
 
        //confere erro na URL
    let ehURL = urlCheck(urlImagemNivel);
    if(!ehURL) {
        if(!urlNivel.classList.contains("tem-erro")){
            urlNivel.classList.add("tem-erro");
            urlNivel.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>O valor informado não é uma URL válida</p></div>`);
        }
    } else contemErro--;

        //confere erro nas perguntas
    if(porcentagemAcerto < 0 || porcentagemAcerto > 100 || isNaN(porcentagemAcerto) || porcentagemAcerto === "") {
        if(!acerto.classList.contains("tem-erro")){
            acerto.classList.add("tem-erro");
            acerto.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>A % de acerto precisa estar entre 0 e 100</p></div>`);
        }
    } else contemErro--;

        //confere erro nos níveis
    if(descricaoNivel.length < 30) {
        if(!descricao.classList.contains("tem-erro")){
            descricao.classList.add("tem-erro");
            descricao.insertAdjacentHTML("afterend",`<div class="aviso-erro"><p>A descrição precisa ter no mínimo 30 caracteres</p></div>`);
        }
    } else contemErro--;

    if(contemErro !== 0) {
        return;
    }

        //caso tenha erro retira a classe feito se tiver e retorna false
        if(!temRespostaCorreta || contemErro !== 0) {
            if(qualNivel.classList.contains("feito")) {
                qualNivel.classList.remove("feito");
                nivelCriados--;
                return false;
            } else {
                return false;
            }
        }
        
        if(temRespostaIncorreta && temRespostaIncorreta2 && !temRespostaIncorreta3 && erroExtra !== 2) {
            if(qualNivel.classList.contains("feito")) {
                qualNivel.classList.remove("feito");
                nivelCriados--;
                return false;
            } else {
                return false;
            }
        }
        
        if(temRespostaIncorreta && temRespostaIncorreta2 && temRespostaIncorreta3 && erroExtra !== 0) {
            if(qualNivel.classList.contains("feito")) {
                qualNivel.classList.remove("feito");
                nivelCriados--;
                return false;
            } else {
                return false;
            }
        }
    
        //se tudo está correto adiciona a classe feito, caso não tenha, e retorna verdadeiro
        if(qualNivel.classList.contains("feito")) {
            //adiciona os valores ao objeto
            colocaNoObjeto(3);
            return true;
    
        } else {
            qualNivel.classList.add("feito");
            nivelCriados++;
    
            //adiciona os valores ao objeto
            colocaNoObjeto(3);
            return true;
        }
} 