let step = 1, // ARMAZENA PASSO PARA SABER QUAL CARTÃO FOI SELECIONADO (PRIMEIRO OU SEGUNDO)
    correctMoves = 0, // ARMAZENA QUANTIDADE DE CARTAS CORRETAS
    totalMoves = 0, // ARMAZENA QUANTIDADE TOTAL DE MOVIMENTOS
    stars = 3, // ARMAZENA QUANTIDADE DE ESTRELAS
    cardsSelected = [], // ARRAY QUE ARMAZENA OS DOIS CARTÕES SELECIONADOS
    icons = ["fa-bowling-ball", "fa-ambulance", "fa-bowling-ball", "fa-anchor", "fa-bath", "fa-bomb", "fa-bell", "fa-cut", "fa-crown", "fa-ambulance", "fa-bell", "fa-cut", "fa-bath", "fa-bomb", "fa-anchor", "fa-crown"];

// ALIMENTA CARTÕES
$(".card").each(function (i) {
    // ESCOLHE UM NUMERO ALEATORIAMENTE COM O MAXIMO SENDO O TAMANHO DO ARRAY
    let aux = Math.floor(Math.random() * Math.floor(icons.length));
    // ADICIONA IMAGEM AO ARRAY
    $(this).children(":first").addClass(icons[aux]);
    // REMOVE IMAGEM DO ARRAY
    icons.splice(aux, 1);
})

// ADICIONA EVENTO PARA QUANDO ALGUM CARTÃO FOR CLICADO
$(".card").click(function () {
    // VERIFICA QUAL PASSO ESTA ACONTECENDO (PRIMEIRO OU SEGUNDO)
    if (step === 1) {
        // VIRA O PRIMEIRO CARTÃO
        showCard($(this));
        // ARMAZENA O PRIMEIRO CARTÃO
        cardsSelected[0] = $(this)
    } else if (step === 2) {
        // VIRA O SEGUNDO CARTÃO
        showCard($(this))
        // ARMAZENA O SEGUNDO CARTÃO
        cardsSelected[1] = $(this)
        // ATUALIZA TOTAL DE MOVIMENTOS
        updateMoves();
        // AGUARDA ANIMAÇÃO DE FLIP FINALIZAR
        setTimeout(function () {
            // VERIFICA SE AS CLASSES DO PRIMEIRO CARTÃO SÃO IGUAIS AS DO SEGUNDO CARTÃO
            if (cardsSelected[0].children(":first")[0].className === cardsSelected[1].children(":first")[0].className) {
                // CHAMA ANIMAÇÃO DE CARDS IGUAIS
                correctAnimation();
                // AGUARDA ANIMAÇÃO FINALIZAR
                setTimeout(function () {
                    // CHAMA FUNÇÃO PARA INICIAR PROXIMA RODADA
                    nextRound();
                }, 1000);
            } else {
                // CHAMA ANIMAÇÃO DE CARTAS INCORRETAS
                wrongAnimation();
                // AGUARDA ANIMAÇÃO FINALIZAR
                setTimeout(function () {
                    // CHAMA FUNÇÃO PARA ESCONDER CARTAS
                    hideCards();
                }, 1000);
            }
        }, 1000);
    }
});

function showCard(card) {
    // VIRA CARTAO
    card.addClass("show-card animated flipInY");
    // EXIBE IMAGEM DO CARTAO
    card.children(":first").removeAttr("hidden");
    // ADICIONA AO CONTADOR DE RODADAS
    step++;
    // VERIFICA RATING
    checkRating();
}

function nextRound() {
    // REINICIA O CONTADOR DE PASSOS
    step = 1;
    // LIMPA ARRAYS DE CARTAS SELECIONADAS
    cardsSelected = [];
    // ALIMENTA CONTADOR DE ACERTOS
    correctMoves++;
    // VERIFICA SE O JOGO ACABOU
    isTheEnd();
}

function hideCards() {
    // ESCONDE AS CARTAS SELECIONADAS
    for (let i = 0; i < cardsSelected.length; i++) {
        cardsSelected[i].removeClass("show-card animated wobble wrong-card");
        cardsSelected[i].children(":first").attr("hidden", " ");
    }
    // LIMPA O ARRAY DE CARTAS SELECIONADAS
    cardsSelected = [];
    // REINICIA O CONTADOR DE PASSOS
    step = 1;
}

// ANIMA CARTAS QUANDO ESTÃO CORRETAS
function correctAnimation() {
    for (let i = 0; i < cardsSelected.length; i++) {
        cardsSelected[i].removeClass("animated flipInY");
        cardsSelected[i].addClass("animated rubberBand");
    }
}

// ANIMA CARTAS QUANTO ESTÃO ERRADAS
function wrongAnimation() {
    for (let i = 0; i < cardsSelected.length; i++) {
        cardsSelected[i].removeClass("animated flipInY");
        cardsSelected[i].addClass("animated wobble wrong-card");
    }
}

// ALIMENTA O CONTADOR DE JOGADAS
function updateMoves() {
    totalMoves++;
    $("#qtMov").text(totalMoves);
}

// EVENTO QUE ATUALIZA PAGINA PARA COMEÇAR O JOGO NOVAMENTE
$("#restartGame, #playAgain").click(function () {
    document.location.reload();
})

// DIMINUI ESTRELA
function checkRating() {
    if (totalMoves === 15) {
        // REMOVE A PRIMEIRA ESTRELA
        $("#star3").removeClass("fas");
        $("#star3").addClass("far animated zoomIn");
        stars--;
    } else if (totalMoves === 20) {
        // REMOVE A SEGUNDA ESTRELA
        $("#star2").removeClass("fas");
        $("#star2").addClass("far animated zoomIn");
        stars--;
    }
}

// VERIFICA FIM DE JOGO
function isTheEnd() {
    // VERIFICA SE O NUMERO DE ACERTOS É IGUAL AO NUMERO 8, EQUIVALENTE AOS 8 PARES
    if (correctMoves === 8) {
        // REMOVE O HEADER DA PAGINA
        $("header").remove();
        // REMOVE AS CARTAS DO JOGO
        $("#game").remove();
        // REMOVE O ATRIBUTO HIDEN DA MENSAGEM FINAL E EXIBE AO JOGADOR
        $("#game-end").removeAttr("hidden");
        // ATUALIZA QUANTIDADE DE MOVIMENTOS NO DOM
        $("#qtMovFinal").text(totalMoves);
        // ATUALIZA QUANTIDADE DE ESTRELAS NO DOM
        $("#qtStarsFinal").text(stars);
    }
}
