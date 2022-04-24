let contadorReposta = 0;

function validarResposta(clicado){
    const opcoes = clicado.parentNode.querySelectorAll(".resposta")
    const tela = clicado.parentNode
    for(let i = 0; i < opcoes.length; i++){
        opcoes[i].removeAttribute("onclick")
        if(opcoes[i] !== clicado){
            opcoes[i].classList.add("opaco") 
        }
        const validar = opcoes[i].querySelector("img");
        const texto = opcoes[i].querySelector("p");
        if (validar == "true"){
            texto.classList.add("textoCerto");
            console.log(texto)
        }else{
            texto.classList.add("textoErrado")
        }
    }
contadorReposta += 1;
    scrollNext(tela)
    if(perguntas == contadorReposta){
        exibirNivel()
    }
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

function renderizarResultado(promise){
    const telaExibida = document.querySelector(".tela-dois");

}