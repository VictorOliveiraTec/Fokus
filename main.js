const html = document.querySelector('html');
const img = document.querySelector('.app__image');

const BtnFoco = document.querySelector('.app__card-button--foco');
const BtnFocoCurto = document.querySelector('.app__card-button--curto');
const BtnFocoLongo = document.querySelector('.app__card-button--longo');

const TextInitial = document.querySelector('.app__title');
const TextFinish = document.querySelector('.app__title-strong');

const bottons = document.querySelectorAll('.app__card-button');

const BtnMusica = document.querySelector('#alternar-musica');

const BtnComecar = document.querySelector('#start-pause');

const Musica = new Audio('/sons/luna-rise-part-one.mp3');
Musica.loop = true;

const TimerCount = document.querySelector('.app__card-timer');

const TextComecarAndPause = document.querySelector('.app__card-primary-button span');
const IconImageComecarAndPause = document.querySelector('.app__card-primary-butto-icon');

const AudioPlay = new Audio('/sons/play.wav');
const AudioPause = new Audio('/sons/pause.mp3');
const AudioFinish = new Audio('/sons/beep.mp3');

let TempoEmSegundos = 1500;
let TempoId = null;

function FocoTroca(fundo){
    bottons.forEach(element =>{
        element.classList.remove('active');
    })
    html.setAttribute('data-contexto', `descanso-${fundo}`);
    img.setAttribute('src', `/imagens/descanso-${fundo}.png`);
    switch (fundo) {
        case 'foco':
            html.setAttribute('data-contexto', `${fundo}`);
            img.setAttribute('src', `/imagens/${fundo}.png`);
            TextInitial.innerHTML = 'Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>';
            bottons[0].classList.add('active');
            break;
        case 'curto':
            TextInitial.innerHTML = 'Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta!</strong>';
            bottons[1].classList.add('active');
            break;
        case 'longo':
            TextInitial.innerHTML = 'Hora de voltar à superfície.<br> <strong class="app__title-strong">Faça uma pausa longa!</strong>';
            bottons[2].classList.add('active');
            break;
        default:
            console.log('Error | Troca de fundo com valor definido de forma errada !.')
            break;
    }
    
}

BtnFoco.addEventListener('click', ()=>{
    FocoTroca('foco');
    TempoEmSegundos = 1500;
    Zerar();
    TimerTela();
})

BtnFocoCurto.addEventListener('click', ()=>{
    FocoTroca('curto');
    TempoEmSegundos = 300;
    Zerar();
    TimerTela()
})

BtnFocoLongo.addEventListener('click', ()=>{
    FocoTroca('longo');
    TempoEmSegundos = 900;
    Zerar();
    TimerTela()
})

BtnMusica.addEventListener('change', ()=>{
    if(Musica.paused){
        Musica.play()
    }else{
        Musica.pause()
    }
})

const cotagemregresiva = () =>{
    if(TempoEmSegundos == 0){
        AudioFinish.play();
        alert('Tempo Finalizado!')
        Zerar()
        return
    }
    TempoEmSegundos -= 1;
    TimerTela();
}

BtnComecar.addEventListener('click', InciarAndPauseTime);

function InciarAndPauseTime(){
    if(TempoId == null){
        AudioPlay.play();
    }else if(TempoId){
        AudioPause.play();
        Zerar()
        return
    }
    TempoId = setInterval(cotagemregresiva, 1000);
    TextComecarAndPause.textContent = 'Pausar';
    IconImageComecarAndPause.setAttribute('src', '/imagens/pause.png');
}

function Zerar(){
    clearInterval(TempoId);
    TempoId = null;
    TextComecarAndPause.textContent = 'Começar';
    IconImageComecarAndPause.setAttribute('src', '/imagens/play_arrow.png');
}


function TimerTela(){
    const tempo = new Date(TempoEmSegundos * 1000);
    const TempoFormat = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
    TimerCount.innerHTML = `${TempoFormat}`
}
TimerTela()