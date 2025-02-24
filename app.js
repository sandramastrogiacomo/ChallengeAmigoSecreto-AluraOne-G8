let amigos = [];

let listaAmigos = []; // Armazena os nomes dos amigos
let paresSorteados = []; // Armazena os pares de amigos sorteados

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nomeAmigo = inputAmigo.value.trim();

    if (nomeAmigo === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    // Verifica se o nome já foi adicionado (ignorando maiúsculas/minúsculas)
    if (listaAmigos.map(nome => nome.toLowerCase()).includes(nomeAmigo.toLowerCase())) {
        alert("Este nome já foi adicionado.");
        return;
    }

    listaAmigos.push(nomeAmigo); // Adiciona o nome à lista de amigos
    atualizarListaAmigos(); // Atualiza a lista exibida na tela
    inputAmigo.value = ""; // Limpa o campo de entrada
}

// Função para atualizar a lista de amigos na tela
function atualizarListaAmigos() {
    const listaAmigosElement = document.getElementById('listaAmigos');
    if (!listaAmigosElement) {
        console.error("Elemento 'listaAmigos' não encontrado.");
        return;
    }
    
    listaAmigosElement.innerHTML = ""; // Limpa a lista atual

    listaAmigos.forEach((amigo) => {
        const novoItem = document.createElement('li');
        novoItem.textContent = amigo;
        listaAmigosElement.appendChild(novoItem);
    });
}

// Função para embaralhar um array usando o algoritmo de Fisher-Yates
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para sortear os pares de amigos secretos
function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Adicione pelo menos dois amigos para realizar o sorteio.");
        return;
    }

   // Cria uma cópia da lista de amigos e a embaralha
   let listaParaSorteio = embaralharArray([...listaAmigos]);

   // Cria os pares de amigos secretos
    paresSorteados = [];
    for (let i = 0; i < listaParaSorteio.length; i++) {
        const amigoAtual = listaParaSorteio[i];
        const amigoSecreto = listaParaSorteio[(i + 1) % listaParaSorteio.length]; // O próximo na lista é o amigo secreto
        paresSorteados.push({ amigo: amigoAtual, amigoSecreto: amigoSecreto });
    }

    // Esconde a lista de resultados inicialmente
    document.getElementById('resultado').classList.add('hidden');
    alert("Sorteio realizado com sucesso! Clique em 'Mostrar resultados' para ver quem é o amigo secreto de quem.");
}

// Função para exibir os resultados do sorteio
function mostrarResultados() {
    if (paresSorteados.length === 0) {
        alert("Nenhum sorteio foi realizado ainda. Clique em 'Sortear' para gerar lista de nomes para sorteio.");
        return;
    }

    const resultadoElement = document.getElementById('resultado');
    if (!resultadoElement) {
        console.error("Elemento 'resultado' não encontrado.");
        return;
    }
   
    resultadoElement.innerHTML = ""; // Limpa o resultado anterior

    paresSorteados.forEach((par) => {
        const novoItem = document.createElement('li');
        novoItem.textContent = `${par.amigo} ➔ ${par.amigoSecreto}`;
        resultadoElement.appendChild(novoItem);
    });

    resultadoElement.classList.remove('hidden'); // Mostra a lista de resultados
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    if (!confirm("Tem certeza que deseja reiniciar o jogo?")) {
        return;
    }
    
    listaAmigos = []; // Limpa a lista de amigos
    paresSorteados = []; // Limpa os pares sorteados
    atualizarListaAmigos(); // Atualiza a lista exibida na tela
    document.getElementById('resultado').innerHTML = ""; // Limpa o resultado
    document.getElementById('resultado').classList.add('hidden'); // Esconde a lista de resultados
    document.getElementById('amigo').value = ""; // Limpa o campo de entrada
}