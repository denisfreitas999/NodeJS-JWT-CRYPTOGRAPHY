import jwt from 'jsonwebtoken';

// Chave secreta do servidor (deve ser mantida segura)
const chaveSecreta = "minhaChaveSecretaSuperSegura";

// Função para autenticar o usuário
function autenticarUsuario(email, senha) {
  // Exemplo de verificação de credenciais (em um cenário real, você verificaria no banco de dados)
  if (email === "usuario@gmail.com" && senha === "senhaDoUsuario") {
    // Credenciais válidas, gerar um token JWT
    const token = jwt.sign({ email: email }, chaveSecreta, { expiresIn: '1h' });
    return token;
  } else {
    // Credenciais inválidas
    throw new Error('Email ou senha incorretos');
  }
}

// Simulando o login
try {
  const token = autenticarUsuario("usuario@gmail.com", "senhaDoUsuario");
  console.log(`Token gerado: ${token}`);

  // Verificando o token em uma requisição subsequente
  const tokenDecodificado = jwt.verify(token, chaveSecreta);
  console.log(`Token decodificado:`, tokenDecodificado);
} catch (error) {
  console.error(error.message);
}
