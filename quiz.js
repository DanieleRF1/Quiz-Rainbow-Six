let atual = 1;

let corretas = {
    pergunta1: "Ace",
    pergunta2: "Zero",
    pergunta3: "Solis",
    pergunta4: "Denari",
};

let respostasUsuario = {};

function proximaPergunta() {

    let opcoes = document.getElementsByName("pergunta" + atual);

    let respostaSelecionada = null;

    // 🔽 ADICIONADO: trata input text
    if (opcoes.length === 1 && opcoes[0].type === "text") {
        respostaSelecionada = opcoes[0].value.trim();
    }

    for (let i = 0; i < opcoes.length; i++) {
        if (opcoes[i].checked) {
            respostaSelecionada = opcoes[i].value;
            break;
        }
    }

    if (!respostaSelecionada) {
        alert("Responda antes de continuar!");
        return;
    }

    // salva resposta
    respostasUsuario["pergunta" + atual] = respostaSelecionada;

    // troca de pergunta
    document.getElementById("p" + atual).style.display = "none";
    atual++;

    let prox = document.getElementById("p" + atual);

    if (prox) {
        prox.style.display = "block";
    } else {
        mostrarResultado();
    }
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

    // monta mensagem
    let mensagem = "Você acertou " + pontos + " de " + total + " perguntas!";

    // mostra na tela
    document.getElementById("textoResultado").innerText = mensagem;

    document.getElementById("resultado").style.display = "block";

    document.getElementById("titulo").style.display = "none";   
    
    document.getElementById("subtitulo").style.display = "none";
}