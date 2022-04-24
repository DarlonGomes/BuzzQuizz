function validarResposta(clicado){
    const opcoes = clicado.parentNode.querySelectorAll(".resposta")
    for(let i = 0; i < opcoes.length; i++){
        opcoes[i].removeAttribute("onclick")
        if(opcoes[i] !== clicado){
            opcoes[i].classList.add("opaco") 
        }
        const resposta = opcoes[i].querySelector("img")
        const texto = opcoes[i].querySelector("p")
        if(resposta[i].isCorrectAnswer){
            texto.classList.add("textoCerto");
            console.log("rolou")
            console.log(texto)
        }else{
            texto.classList.add("textoErrado");
        }
    }
}
