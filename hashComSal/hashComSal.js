// Importa funções do módulo 'crypto' para hashing e comparação de senhas
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto'

// Função que cria um hash com sal para uma senha fornecida
function criaHashComSal(senha) {
    // Gera um valor aleatório de 16 bytes e o converte para uma string hexadecimal
    const sal = randomBytes(16).toString('hex');

    // Gera um hash da senha usando o sal gerado, retornando uma string hexadecimal
    const senhaHasheada = scryptSync(senha, sal, 64).toString('hex');

    // Retorna o sal e o hash concatenados, separados por dois pontos
    return `${sal}:${senhaHasheada}`
}

// Classe para representar um usuário
class Usuario {
    // Construtor da classe, que inicializa o nome e a senha do usuário
    constructor(nome, senha) {
        this.nome = nome;
        // Desestrutura o retorno da função criaHashComSal para obter o sal e o hash da senha
        [this.sal, this.hash] = criaHashComSal(senha).split(':')
    }

    // Método para autenticar o usuário
    autentica(nome, senha) {
        // Verifica se o nome fornecido corresponde ao nome do usuário
        if (nome === this.nome) {
            // Gera um hash da senha fornecida usando o mesmo sal
            const testeHash = scryptSync(senha, this.sal, 64);
            // Converte o hash armazenado de volta para um buffer
            const hashReal = Buffer.from(this.hash, 'hex');

            // Compara os hashes de forma segura para evitar ataques de tempo
            const hashesCorrespondem = timingSafeEqual(testeHash, hashReal)

            // Se os hashes correspondem, a autenticação foi bem-sucedida
            if (hashesCorrespondem) {
                console.log("Usuário autenticado com sucesso")
                return true;
            }
        }

        // Se o nome ou a senha estão incorretos, a autenticação falha
        console.log("Usuário ou senha incorretos.")
        return false;
    }
}

// Cria uma nova instância de usuário com nome e senha fornecidos
const df = new Usuario('Denisson Freitas', 'MinhaSenhaSecreta123')

// Exibe o objeto do usuário no console
console.log(df)

// Teste de sucesso: Autenticação com nome e senha corretos
df.autentica('Denisson Freitas', 'MinhaSenhaSecreta123')

// Teste de insucesso: Nome incorreto
df.autentica('Denisson Ferias', 'MinhaSenhaSecreta123')

// Teste de insucesso: Senha incorreta
df.autentica('Denisson Freitas', 'minhasenhasecreta123')
