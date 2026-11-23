const urlBackend = "http://localhost:3000";

const inputTitulo = document.getElementById("titulo");
const inputArtista = document.getElementById("artista");
const inputGenero = document.getElementById("genero");
const inputAno = document.getElementById("ano");
const inputDuracao = document.getElementById("duracao");
const botaoCadastrar = document.getElementById("botaoCadastrar");
const mensagem = document.getElementById("mensagem");

botaoCadastrar.addEventListener("click", cadastrarMusica);

async function cadastrarMusica() {
    const valores = [
        inputTitulo.value.trim(),
        inputArtista.value.trim(),
        inputGenero.value.trim(),
        inputAno.value,
        inputDuracao.value,
    ];
    if (valores.some((valor) => valor === "")) {
        alert("Preencha todos os campos!");
        return;
    }

    const musica = {
        titulo: inputTitulo.value.trim(),
        artista: inputArtista.value.trim(),
        genero: inputGenero.value.trim(),
        ano: inputAno.valueAsNumber,
        duracao: inputDuracao.valueAsNumber,
    };

    try {
        const resposta = await fetch(`${urlBackend}/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(musica),
        });
        const resultado = await resposta.json();
        if (!resposta.ok) {
            throw new Error(resultado.mensagem || "Não foi possível cadastrar a música.");
        }

        alert(resultado.mensagem);
        window.location.href = "index.html";
    } catch (error) {
        mensagem.textContent = error.message;
    }
}
