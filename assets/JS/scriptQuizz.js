function validarResposta(clicado){
    const opcoes = clicado.parentNode.querySelectorAll(".resposta")
    for(let i = 0; i < opcoes.length; i++){
        opcoes[i].removeAttribute("onclick")
        if(opcoes[i] !== clicado){
            opcoes[i].classList.add("opaco") 
        }
    
    }
}
