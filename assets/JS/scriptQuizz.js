let contadorReposta = 0;
let contadorAcertos = 0;
let porcentagem;
function validarResposta(element){
    const opcoes = element.parentNode.querySelectorAll(".resposta")
    const tela = element.parentNode
    for(let i = 0; i < opcoes.length; i++){
        opcoes[i].removeAttribute("onclick")
        if(opcoes[i] !== element){
            opcoes[i].classList.add("opaco") 
        }
    }
    const acerto = element.querySelector("img")
    if(acerto.id == "true"){
        contadorAcertos += 1
    }
    const validar = element.parentNode.querySelectorAll("img")
    const texto = element.parentNode.querySelector("p")
    let arr = [];
    for(let i = 0;i< validar.length; i++){
    arr.push(validar[i])
    let item = arr[i].toString()
        console.log(item)
        if(arr[i].id != "false"){
            arr[i].parentNode.querySelector("p").style.color = "green"
        }else{
            arr[i].parentNode.querySelector("p").style.color = "red";
        }
    }
contadorReposta += 1;
    if(perguntas == contadorReposta){
        exibirNivel()
    }
    scrollNext(tela)
    
}

function scrollNext(elemento){
    const tela = elemento;
    const proximo = tela.parentNode.nextElementSibling;
    setTimeout(function (){proximo.scrollIntoView({behavior: "smooth"})}, 2000);
}

function exibirNivel(){
    const promise = axios.get(`${API}/${idQuizz}`);
    promise.then(renderizarResultado);
}

function renderizarResultado(){
     porcentagem = (contadorAcertos / perguntas) * 100;
     const media = Math.ceil(porcentagem);
     const telaExibida = document.querySelector(".tela-dois");
     const indice = [];
    for (let i=0;i<nivel.length;i++){
        if(media >= nivel[i].minValue){
            indice.push(i)
        }
    }
    let j = indice.length - 1;
    telaExibida.innerHTML += `
                <div class="container-resultado">
                    <div class="resultado">
                            <p>${nivel[j].title}</p>
                    </div>
                    <div class="descricao-resultado">
                        <img src="${nivel[j].image}" alt=""/>
                        <div class="texto">
                            <p>${nivel[j].text}</p>
                    </div>
                </div>
                </div>
                <button>Reiniciar Quizz</button>
                <div class="home">
                    <button onclick="retornaHome()">Voltar pra home</button>
                </div>
                `
}
    
    

