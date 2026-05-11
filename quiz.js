let atual = 1;

let corretas = {
    pergunta1: "Ace",
    pergunta2: "Zero",
    pergunta3: "Solis",
    pergunta4: "Denari",
};

let respostasUsuario = {};
let opcaoSelecionada = {}; 
let perguntasRespondidas = {};

function selecionarOpcao(btn, pergunta) { 
    let botoes = btn.parentElement.querySelectorAll("button");
    botoes.forEach(b => b.classList.remove("selecionada"));
    btn.classList.add("selecionada");
    opcaoSelecionada[pergunta] = btn.innerText;
}

function proximaPergunta() {

    let opcoes = document.getElementsByName("pergunta" + atual);
    let respostaSelecionada = null;

    if (opcoes.length === 1 && opcoes[0].type === "text") {
        respostaSelecionada = opcoes[0].value.trim();
    }

   
    if (!respostaSelecionada) {
        respostaSelecionada = opcaoSelecionada["pergunta" + atual] || null;
    }

    if (!respostaSelecionada) {
        alert("Responda antes de continuar!");
        return;
 }
 

    // ✅ NOVO - feedback de certo/errado nos botões
    let correta = corretas["pergunta" + atual];
    let botoes = document.querySelectorAll("#ops" + atual + " button");

    botoes.forEach(btn => {

    btn.disabled = true;

    if (btn.innerText.toLowerCase() === correta.toLowerCase()) {
        btn.classList.add("correta");
    } else {
        btn.classList.add("errada");
    }

});

    setTimeout(() => { // ✅ NOVO - delay para ver o feedback
        respostasUsuario["pergunta" + atual] = respostaSelecionada;
        perguntasRespondidas["pergunta" + atual] = true;

        document.getElementById("p" + atual).style.display = "none";
        atual++;

        let prox = document.getElementById("p" + atual);
        if (prox) {
            prox.style.display = "block";
        } else {
            mostrarResultado();
        }
    }, 1000);
}

function mostrarResultado() { 
    let pontos = 0;

    for (let pergunta in corretas) {
        if (
            respostasUsuario[pergunta] &&
            respostasUsuario[pergunta].toLowerCase().trim() ===
            corretas[pergunta].toLowerCase().trim()
        ) {
            pontos++;
        }
    }

    let total = Object.keys(corretas).length;
    let mensagem = "Você acertou " + pontos + " de " + total + " perguntas!";

    document.getElementById("textoResultado").innerText = mensagem;
    document.getElementById("resultado").style.display = "block";
}



function voltarPergunta() {

    if (atual <= 1) return;

    document.getElementById("p" + atual).style.display = "none";

    atual--;

    document.getElementById("p" + atual).style.display = "block";

    // se já foi respondida, mantém bloqueado e visual
    if (perguntasRespondidas["pergunta" + atual]) {

        let correta = corretas["pergunta" + atual];
        let botoes = document.querySelectorAll("#ops" + atual + " button");

        botoes.forEach(btn => {

            btn.disabled = true;

            if (btn.innerText.toLowerCase() === correta.toLowerCase()) {
                btn.classList.add("correta");
            } else {
                btn.classList.add("errada");
            }
        });
    }
}
