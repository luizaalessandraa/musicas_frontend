const urlBackend = "http://localhost:3000";

const listaMusicas = document.getElementById("listaMusicas");
const mensagem = document.getElementById("mensagem");

function criarElemento(tag, texto, classe) {
    const elemento = document.createElement(tag);
    elemento.textContent = texto;
    if (classe) {
        elemento.className = classe;
    }
    return elemento;
}

async function buscarMusicas() {
    mensagem.textContent = "";
    listaMusicas.replaceChildren();

    try {
        const resposta = await fetch(urlBackend);
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as músicas.");
        }

        const musicas = await resposta.json();
        musicas.forEach((musica) => {
            const card = criarElemento("article", "", "musica");
            card.append(
                criarElemento("h2", musica.titulo),
                criarElemento("p", musica.artista, "artista"),
                criarElemento(
                    "p",
                    `${musica.genero} | ${musica.ano} | ${musica.duracao} min`,
                    "detalhes",
                ),
            );

            const acoes = criarElemento("div", "", "acoes");
            const linkEditar = criarElemento("a", "Editar", "editar");
            linkEditar.href = `editar.html?id=${encodeURIComponent(musica.id)}`;

            acoes.append(linkEditar);
            card.append(acoes);
            listaMusicas.append(card);
        });
    } catch (error) {
        mensagem.textContent = error.message;
    }
}

buscarMusicas();
