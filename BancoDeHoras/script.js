// Banco de dados simulado em forma de array
let usuarios = [];

// Referências aos elementos do HTML (usados na página index.html)

// Função para adicionar um novo usuário
function adicionarUsuario() {
    const nome = document.getElementById('nome').value;
    const matricula = document.getElementById('matricula').value;
    const entrada = document.getElementById('entrada').value;
    const saida = document.getElementById('saida').value;

    if (nome && matricula && entrada && saida) {
        // Calcula as horas trabalhadas
        const horasTrabalhadas = calcularHorasTrabalhadas(entrada, saida);

        let novoUsuario = {
            id: usuarios.length + 1,
            nome: nome,
            matricula: matricula,
            entrada: entrada,
            saida: saida,
            horasTrabalhadas: horasTrabalhadas
        };
        usuarios.push(novoUsuario);
        exibirUsuarios();
        limparFormulario();
        console.log(`Usuário ${nome} adicionado com sucesso!`);
    } else {
        console.log('Por favor, preencha todos os campos corretamente.');
    }
}

// Função para calcular as horas trabalhadas com base na hora de entrada e saída
function calcularHorasTrabalhadas(entrada, saida) {
    const horaEntrada = new Date(`01/01/2024 ${entrada}`);
    const horaSaida = new Date(`01/01/2024 ${saida}`);

    // Calcula a diferença em milissegundos
    const diff = horaSaida - horaEntrada;

    // Converte a diferença para horas
    const horas = diff / 1000 / 60 / 60;

    return horas.toFixed(2); // Retorna as horas formatadas com duas casas decimais
}

// Função para exibir os usuários na interface
function exibirUsuarios() {
    const usuariosDiv = document.getElementById('usuarios');
    usuariosDiv.innerHTML = '';
    usuarios.forEach(usuario => {
        const usuarioDiv = document.createElement('div');
        usuarioDiv.classList.add('usuario');
        usuarioDiv.innerHTML = `
            <p><strong>ID:</strong> ${usuario.id}</p>
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>Número de Matrícula:</strong> ${usuario.matricula}</p>
            <p><strong>Hora de Entrada:</strong> ${usuario.entrada}</p>
            <p><strong>Hora de Saída:</strong> ${usuario.saida}</p>
            <p><strong>Horas Trabalhadas:</strong> ${usuario.horasTrabalhadas}</p>
            <button onclick="editarUsuario(${usuario.id})">Editar</button>
            <button onclick="excluirUsuario(${usuario.id})">Excluir</button>
        `;
        usuariosDiv.appendChild(usuarioDiv);
    });
}

// Função para limpar o formulário após adicionar um usuário
function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('matricula').value = '';
    document.getElementById('entrada').value = '';
    document.getElementById('saida').value = '';
}

// Função para buscar um usuário pelo ID
function buscarUsuarioPorId(id) {
    return usuarios.find(usuario => usuario.id === id);
}

// Função para editar um usuário pelo ID
function editarUsuario(id) {
    const usuario = buscarUsuarioPorId(id);
    if (usuario) {
        document.getElementById('nome').value = usuario.nome;
        document.getElementById('matricula').value = usuario.matricula;
        document.getElementById('entrada').value = usuario.entrada;
        document.getElementById('saida').value = usuario.saida;
        usuarios = usuarios.filter(u => u.id !== id); // Remove o usuário da lista
        exibirUsuarios();
    } else {
        console.log(`Usuário com ID ${id} não encontrado.`);
    }
}

// Função para excluir um usuário pelo ID
function excluirUsuario(id) {
    usuarios = usuarios.filter(usuario => usuario.id !== id);
    exibirUsuarios();
    console.log(`Usuário com ID ${id} excluído com sucesso!`);
}

// Exibir usuários inicialmente (caso haja dados no array ao carregar a página index.html)
exibirUsuarios();
