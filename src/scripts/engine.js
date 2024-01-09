const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life")
    },
    values: {       
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLife: 3
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    state.values.currentTime -= 1;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        gameOver()
    }
}

function gameOver(){
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })
    state.values.hitPosition = null
    alert(`Game Over! O seu resultado foi: ${state.values.result}`)
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('click', () => {
            if(square.id === state.values.hitPosition){
                console.log('clicou')
                state.values.result += 1
                playAudio('hit')
                console.log(state.values.result)
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null
            }else{
                state.values.currentLife -= 1;
                state.view.life.textContent = `x${state.values.currentLife}`;
                if(state.values.currentLife === 0){
                    gameOver()
                }
            }
        })
    })
}

function playAudio(audioName){
    let audio = new Audio(`../src/sounds/${audioName}.m4a`)
    audio.volume = 0.1;
    audio.play()
}

function init() {
    randomSquare();
    addListenerHitbox();
}

init();