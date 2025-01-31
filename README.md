# Monitoramento de Dispositivos na Rede

Este sistema permite o monitoramento de dispositivos conectados à rede local, categorizando-os em diferentes grupos como computadores administrativos, PDVs, impressoras e balanças. Ele oferece funcionalidades para adicionar, remover e verificar o status dos dispositivos.

## Funcionalidades

- **Adicionar dispositivos**: Insira nome e IP de um dispositivo em uma das categorias.
- **Remover dispositivo específico**: Clique no "X" vermelho ao lado do IP para removê-lo individualmente.
- **Verificar status dos dispositivos**: Clique no botão correspondente para testar a conectividade via ping.
- **Editar categorias**: Passe o mouse sobre o nome de uma categoria e clique no ícone de lápis para renomeá-la.
- **Persistência de dados**: As informações são armazenadas no `localStorage` do navegador.

## Instalação e Execução

### Requisitos

- Node.js instalado no sistema
- Navegador compatível com `localStorage`

### Passos

1. Clone ou baixe este repositório:
   ```sh
   git clone https://github.com/Maciel76/Dispositivo-Rede.git
   cd Dispositivo-Rede
   ```
2. Instale as dependências do servidor:
   ```sh
   npm install
   ```
3. Inicie o servidor backend:
   ```sh
   node server.js
   ```
4. Abra o arquivo `index.html` no navegador para acessar o sistema.

## Deploy no Vercel

O sistema está disponível online para demonstração. Acesse:

🔗 [Demonstração no Vercel](https://seu-projeto.vercel.app/)

## API do Servidor

O backend, rodando com Node.js e Express, fornece a seguinte rota:

- **POST `/verificar`**: Recebe uma lista de IPs e retorna o status de conectividade (`success` ou `fail`).

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS e JavaScript (armazenamento no `localStorage`)
- **Backend**: Node.js, Express e a biblioteca `ping`

## Contribuição

Sinta-se à vontade para contribuir enviando pull requests ou relatando problemas na aba de issues.

## Licença

Este sistema é de uso livre e não está atrelado a nenhuma licença específica. Você pode utilizá-lo, modificá-lo e distribuí-lo sem restrições.

# Dispositivo-Rede
