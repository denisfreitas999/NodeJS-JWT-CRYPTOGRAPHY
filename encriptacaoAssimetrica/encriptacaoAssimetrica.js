// Importa a função generateKeyPairSync do módulo 'crypto' para gerar pares de chaves
import { generateKeyPairSync } from 'crypto'

// Gera um par de chaves RSA (chave pública e chave privada)
const { privateKey, publicKey } = generateKeyPairSync('rsa',
    {
        // Define o comprimento do módulo para 2048 bits
        modulusLength: 2048,
        // Configura a codificação da chave pública
        publicKeyEncoding: {
            type: 'spki', // Formato da chave pública
            format: 'pem', // Codificação PEM
        },
        // Configura a codificação da chave privada
        privateKeyEncoding: {
            type: 'pkcs8', // Formato da chave privada
            format: 'pem', // Codificação PEM
        },
    }
)

// Exibe a chave pública e a chave privada no console (comentado para segurança)
// console.log(publicKey, privateKey)

// Importa funções para criptografar e descriptografar dados usando chaves RSA
import { publicEncrypt, privateDecrypt } from 'crypto'

// Encriptação

// Criptografa a mensagem usando a chave pública
const dadosCriptografados = publicEncrypt(
    publicKey, // Chave pública para criptografar os dados
    Buffer.from("Mensagem super secreta") // Dados a serem criptografados convertidos para buffer
);

// Exibe os dados criptografados no console em formato hexadecimal
console.log(dadosCriptografados.toString('hex'))

// Transmissão ------------- chave pública, dados criptografados

// Desencriptação

// Descriptografa os dados usando a chave privada
const dadosDesencriptados = privateDecrypt(
    privateKey, // Chave privada para descriptografar os dados
    dadosCriptografados // Dados criptografados a serem descriptografados
)

// Exibe os dados descriptografados no console como uma string UTF-8
console.log(dadosDesencriptados.toString('utf-8'))
