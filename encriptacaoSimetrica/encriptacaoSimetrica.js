// Importa funções do módulo 'crypto' para criptografar e descriptografar mensagens
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto'

// Mensagem que será criptografada
const mensagem = 'Esta é uma mensagem secreta';
// Gera uma chave aleatória de 32 bytes para usar na criptografia
const chave = randomBytes(32);
// Gera um vetor de inicialização (IV) aleatório de 16 bytes
const vi = randomBytes(16);

// Cria um objeto de cifra utilizando o algoritmo 'aes256', a chave e o IV gerados
const cifra = createCipheriv('aes256', chave, vi);

// Criptografa a mensagem: update() realiza a criptografia parcial e final() completa o processo
const mensagemCifrada = cifra.update(mensagem, 'utf-8', 'hex') + cifra.final('hex');

// Exibe a mensagem criptografada no console
console.log(mensagemCifrada)

// Transmissão ------------- chave, vi, mensagem

// Decifra a mensagem

// Cria um objeto de decifra utilizando o mesmo algoritmo, chave e IV usados na criptografia
const decifra = createDecipheriv('aes256', chave, vi);

// Descriptografa a mensagem: update() realiza a descriptografia parcial e final() completa o processo
const mensagemDecifrada = decifra.update(mensagemCifrada, 'hex', 'utf-8') + decifra.final('utf-8')

// Exibe a mensagem decifrada no console
console.log(`Decifrado: ${mensagemDecifrada.toString('utf-8')}`)
