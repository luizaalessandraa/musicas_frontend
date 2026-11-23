const urlBackend = "http://localhost:3000";

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const inputTitulo = document.getElementById("titulo");
const inputArtista = document.getElementById("artista");
const inputGenero = document.getElementById("genero");
const inputAno = document.getElementById("ano");
const inputDuracao = document.getElementById("duracao");
const botaoSalvar = document.getElementById("botaoSalvar");
const mensagem = document.getElementById("mensagem");

async function buscarMusica() {
    if (!id) {
        mensagem.textContent = "ID da música não informado.";
        botaoSalvar.disabled = true;
        return;
    }

    try {
        const resposta = await fetch(`${urlBackend}/musica/${encodeURIComponent(id)}`);
        const musica = await resposta.json();
        if (!resposta.ok) {
            throw new Error(musica.mensagem || "Não foi possível carregar a música.");
        }

        inputTitulo.value = musica.titulo;
        inputArtista.value = musica.artista;
        inputGenero.value = musica.genero;
        inputAno.value = musica.ano;
        inputDuracao.value = musica.duracao;
    } catch (error) {
        mensagem.textContent = error.message;
        botaoSalvar.disabled = true;
    }
}

buscarMusica();
botaoSalvar.addEventListener("click", salvarAlteracoes);

async function salvarAlteracoes() {
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
        const resposta = await fetch(`${urlBackend}/editar/${encodeURIComponent(id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(musica),
        });
        const resultado = await resposta.json();
        if (!resposta.ok) {
            throw new Error(resultado.mensagem || "Não foi possível editar a música.");
        }

        alert(resultado.mensagem);
        window.location.href = "index.html";
    } catch (error) {
        mensagem.textContent = error.message;
    }
}
