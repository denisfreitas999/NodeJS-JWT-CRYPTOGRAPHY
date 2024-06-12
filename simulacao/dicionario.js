import { createHash } from 'crypto'

class Usuario {
    constructor(nome, senha) {
        this.nome = nome;
        this.hash = this.criaHash(senha);
    }

    criaHash(senha) {
        return createHash('sha256').update(senha).digest('hex')
    }

    autentica(nome, senha) {
        if (nome === this.nome && this.hash === this.criaHash(senha)) {
            console.log("Usuário autenticado com sucesso!");
            return true;
        }

        /* console.log("Usuário ou senha incorretos."); */
        return false;
    }
}

const usuario = new Usuario('Denisson Freitas', 'Senha123')

const senhasComuns = [
    "senha",
    "12345",
    "aniversario123",
    "senha123456",
    154658,
    "password",
    "senha123",
    "Senha123"
]

senhasComuns.map((senha) => {
    if (usuario.autentica("Denisson Freitas", senha.toString())) {
        console.log(`A senha do usuário é: ${senha}`)
    }
})