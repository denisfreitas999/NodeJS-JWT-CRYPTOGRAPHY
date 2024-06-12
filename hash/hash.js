import { createHash } from 'crypto'

function criaHash(senha) {
    return createHash('sha256').update(senha).digest('hex')
}

console.log(criaHash("MinhaSenha123"))

class Usuario {
    constructor(nome, senha) {
        this.nome = nome;
        this.hash = criaHash(senha);
    }

    autentica(nome, senha) {
        if (nome === this.nome && this.hash === criaHash(senha)) {
            console.log("Usuário autenticado com sucesso!");
            return true;
        }

        console.log("Usuário ou senha incorretos.");
        return false;
    }
}

const usuario = new Usuario('Denisson Freitas', 'MinhaSenha123')

console.log(usuario)

// Caso de sucesso
usuario.autentica('Denisson Freitas', 'MinhaSenha123')

// Casos de fracasso
usuario.autentica('Denisson Ferias', 'MinhaSenha123')
usuario.autentica('Denisson Freitas', 'minhasenha123')