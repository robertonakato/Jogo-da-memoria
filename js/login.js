let fechar = document.querySelector(".fechar");
let explicacoes = document.querySelector(".explicar")
let botoes = document.querySelector(".botoes")
let proximo = document.querySelector(".proximo")
let regras = document.querySelector(".regras")
let explicar1 = 0;


const seguinte =[
    "<p>Olá claro Jogador, Eu me chamo Ray e vou te explicar As regras:</p>",
    "<p>1 - Como qualquer jogo da memoria, segue as regras padrão de todos, ache duas figuras iguais para marcar seus pontos</p>",
    "<p> 2 - Ache três Pares Iguais em sequência para ganhar pontos extras</p></br>",
    "<p> 3 - Erre três vezes em sequência e perca um ponto</p></br>",
]

function fechamento() {
    explicacoes.style.display = "none"
    botoes.style.display = "flex"
}

function abrirregras(){
    botoes.style.display = "none"
    explicacoes.style.display = "flex"
}
function seguir(){
    let explicar = document.querySelector(".rayexplica")
    explicar1 = (explicar1 + 1) % seguinte.length;
    explicar.innerHTML =seguinte[explicar1]
}

fechar.addEventListener("click",fechamento)
regras.addEventListener("click",abrirregras)
proximo.addEventListener("click",seguir)