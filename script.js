document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    tornarTitulosEditaveis();
});

function adicionarIp(coluna) {
    const nomeInput = document.getElementById(`${coluna}Nome`);
    const ipInput = document.getElementById(`${coluna}Ip`);
    const nome = nomeInput.value.trim();
    const ip = ipInput.value.trim();

    if (nome && ip) {
        salvarDados(coluna, nome, ip);
        carregarDados();
        nomeInput.value = '';
        ipInput.value = '';
    } else {
        alert("Por favor, insira o nome e o IP.");
    }
}

function salvarDados(coluna, nome, ip) {
    const dados = JSON.parse(localStorage.getItem(coluna)) || [];
    dados.push({ nome, ip });
    localStorage.setItem(coluna, JSON.stringify(dados));
}

function carregarDados() {
    const colunas = ['adm', 'pdv', 'rubs', 'impressoras', 'balancas'];
    colunas.forEach(coluna => {
        const dados = JSON.parse(localStorage.getItem(coluna)) || [];
        const listElement = document.getElementById(`${coluna}List`);
        listElement.innerHTML = '';
        dados.forEach(item => {
            adicionarItemLista(coluna, item.nome, item.ip);
        });
    });
}

function adicionarItemLista(coluna, nome, ip) {
    const listElement = document.getElementById(`${coluna}List`);
    const li = document.createElement('li');
    li.innerHTML = `${nome} - ${ip} <span class='remove-ip' onclick='removerIp("${coluna}", "${ip}")'>✖</span>`;
    listElement.appendChild(li);
}

function removerIp(coluna, ip) {
    let dados = JSON.parse(localStorage.getItem(coluna)) || [];
    dados = dados.filter(item => item.ip !== ip);
    localStorage.setItem(coluna, JSON.stringify(dados));
    carregarDados();
}

function limparColuna(coluna) {
    localStorage.removeItem(coluna);
    carregarDados();
}

function verificarCategoria(coluna) {
    const dados = JSON.parse(localStorage.getItem(coluna)) || [];
    const ips = dados.map(item => item.ip);
    if (ips.length > 0) {
        fetch('http://localhost:3000/verificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ips })
        })
        .then(response => response.json())
        .then(resultados => {
            resultados.forEach(resultado => {
                const li = [...document.getElementById(`${coluna}List`).children]
                    .find(item => item.textContent.includes(resultado.ip));
                li.classList.add(resultado.status === 'success' ? 'success' : 'fail');
                li.textContent += resultado.status === 'success' ? ' - Sucesso' : ' - Falha';
            });
        })
        .catch(error => console.error('Erro:', error));
    }
}

function verificarTudo() {
    ['adm', 'pdv', 'rubs', 'impressoras', 'balancas'].forEach(coluna => verificarCategoria(coluna));
}

function tornarTitulosEditaveis() {
    document.querySelectorAll('.column h2').forEach(h2 => {
        const coluna = h2.parentElement.id;
        const icon = document.createElement('i'); // Criando o ícone do Font Awesome
        icon.classList.add('fa', 'fa-pencil', 'edit-icon'); // Adicionando classes do Font Awesome

        icon.style.cursor = 'pointer'; // Garante que o ícone seja clicável
        icon.onclick = () => editarTitulo(h2, coluna);
        h2.appendChild(icon);

        const nomeSalvo = localStorage.getItem(`titulo_${coluna}`);
        if (nomeSalvo) {
            h2.childNodes[0].textContent = nomeSalvo;
        }
    });
}


function editarTitulo(h2, coluna) {
    const novoNome = prompt('Digite o novo nome:', h2.childNodes[0].textContent.trim());
    if (novoNome) {
        h2.childNodes[0].textContent = novoNome;
        localStorage.setItem(`titulo_${coluna}`, novoNome);
    }
}
