const state ={
    view:{
 pontos: document.querySelector(".pontos"),
 tempo: document.querySelector(".temp")

    },
    values:{
 suapontuacao: 0,
 seutempo: 0,
 segundos:0,
 minutos:0,
 erros:0,
 acertos:0

    }
}
const imagens = [
    'img/01.png',
    'img/01.png',
    'img/02.png',
    'img/02.png',
];

const seguinte =[
    "<p>Olá claro Jogador, Eu me chamo Ray e vou te explicar As regras:</p>",
    "<p>1 - Como qualquer jogo da memoria, segue as regras padrão de todos, ache duas figuras iguais para marcar seus pontos</p>",
    "<p> 2 - Ache três Pares Iguais em sequência para ganhar pontos extras</p></br>",
    "<p> 3 - Erre três vezes em sequência e perca um ponto</p></br>",
]
let explicar1 = 0;
let fase = 1;
let novoselementos = 3;
let openCards = [];
let regras = document.querySelector(".explicacoes");;
let nomeregras = document.querySelector(".contregras")
let informacoes = document.querySelector(".topicos");
let regrasvisiveis = false;
let tempocorrendo = setInterval(tempo, 1000);
let tempos = true;
let sortearCards = imagens.sort(()=>(Math.random() > 0.5 ? 2: -1 ));


function proximo(){
    let explicar = document.querySelector(".rayexplica")
    explicar1 = (explicar1 + 1) % seguinte.length;
explicar.innerHTML =seguinte[explicar1]   }
   
function mostrarregras(){
    if ( !regrasvisiveis){
        clearInterval(tempocorrendo)
        regras.style.display = "flex";
        nomeregras.textContent = "Fechar Regras";
        regras.style.display = "flex";
        regrasvisiveis = true
        tempos = false
    }
    else{
        nomeregras.textContent = "Regras"
        regras.style.display = "none";
        regrasvisiveis = false
        tempos = true
    }
    if (tempos === true) {
        tempocorrendo = setInterval(tempo, 1000)
    }
}

for (let i = 0; i < imagens.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    let img = document.createElement("img");
    img.src = sortearCards[i];
    img.alt = "Card Image"; 
    box.appendChild(img);
    box.onclick = handclick;
    document.querySelector(".game").appendChild(box);
}

 
function handclick(){
if (this.classList.contains("boxOpen")) {
        return;
    }

if( openCards.length < 2 ){
    this.classList.add("boxOpen");
    openCards.push(this);
}
if(openCards.length===2){
    setTimeout(() => {
        check();
    }, 700);
}
}
function check() {
    if (openCards.length === 2) {
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            openCards[0].classList.add("boxMacth");
            openCards[1].classList.add("boxMacth");
            state.values.suapontuacao++;
            state.values.acertos++
            state.values.erros = 0
           
            acertou()
        } else {
            openCards[0].classList.remove("boxOpen");
            openCards[1].classList.remove("boxOpen");
            state.values.erros++
            state.values.acertos = 0
            errou()
        }
        openCards = [];
        if (document.querySelectorAll(".boxMacth").length === imagens.length) {
            fase++
            informacoes.innerHTML = `<p class="fase"> Parabéns Jogador, você passou para a Fase ${fase} </p>`
            mostrarregras()
            setTimeout(() => {
                mostrarregras();
            }, 1000);
            setTimeout(() => {
                informacoes.innerHTML = ` <p>Olá claro Jogador, Eu me chamo Ray e vou te explicar As regras:</p>
                <p> 1 - Como qualquer jogo da memoria, segue as regras padrão de todos, ache duas figuras iguais para marcar seus pontos</p>
                <p> 2 - Ache três Pares Iguais em sequência para ganhar pontos extras</p>
                <p> 3 - Erre três vezes em sequência e perca um ponto</p>
                <p> 4 - O Jogo termina quanto passar por todas as fases, ou bater os 10 minutos</p>`;
            }, 1500);
            setTimeout(() => {
                proximafase();
            }, 1000);
        }
    bonus()
    state.view.pontos.textContent = state.values.suapontuacao;
}
}
function acertou(){
    let audio = new Audio ("./audios/certo.mp3")
    audio.volume =0.5;
    audio.play();
}
function errou(){
    let audio = new Audio ("./audios/errou.mp3")
    audio.volume =0.5;
    audio.play();
}

function bonus( ){
    if( state.values.acertos === 3){
        state.values.suapontuacao +=3;
        state.values.acertos = 0
    }
    if(state.values.erros ===3){
        state.values.suapontuacao  -=1
        state.values.erros = 0

    }

}

function proximafase() {
    openCards = [];
    imagens.push(`img/0${novoselementos}.png`, `img/0${novoselementos}.png`);
     novoselementos += 1

    let gameContainer = document.querySelector(".game");
    gameContainer.innerHTML = ''; 

    imagens.sort(() => Math.random() > 0.5 ? 2 : -1);

    for (let i = 0; i < imagens.length; i++) {
        if (novoselementos === 12) {
            alert("Você finalizou o Jogo!");
            break; 
        }
        let box = document.createElement("div");
        box.className = "item";
        let img = document.createElement("img");
        img.src = imagens[i];
        img.alt = "Card Image"; 
        box.appendChild(img);
        box.onclick = handclick;
        gameContainer.appendChild(box);
    }

    if( novoselementos >= 10){
        let item = document.querySelectorAll(".item")
        item.forEach(item => {
           item.style.width = "6rem";
           item.style.height = "6rem";
       });
       }
}

function tempo(){
    state.values.segundos++;
    if(state.values.segundos === 60){
        state.values.segundos = 0
        state.values.minutos++
    }
    state.view.tempo.textContent = state.values.seutempo;
    state.values.seutempo = `0${state.values.minutos}:${state.values.segundos}`

}
