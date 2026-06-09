# Backend

Esta pasta está reservada para o desenvolvimento da API / Backend do projeto no futuro.
Pode receber seu Node.js, Python, Java, etc.

## Estrutura Básica (Sugestão NodeJS + Express)

Se optar por utilizar Node.js com Express, você pode iniciar o seu projeto seguindo os passos:

1. Inicialize o projeto e instale as dependências:
```bash
npm init -y
npm install express cors dotenv
npm install --save-dev typescript @types/express @types/cors @types/node ts-node nodemon
```

2. Estrutura sugerida de pastas:
```text
backend/
  ├── src/
  │   ├── controllers/    # Lógica de manipulação das rotas (ex: ProductController.ts)
  │   ├── routes/         # Definição das rotas (ex: productRoutes.ts)
  │   ├── models/         # Modelos de banco de dados (ex: Mongoose, Prisma)
  │   ├── config/         # Configurações (ex: conexão com BD, variáveis)
  │   └── index.ts        # Ponto de entrada da API
  ├── .env                # Variáveis de ambiente secretas
  ├── tsconfig.json       # Configuração do compilador TypeScript
  └── package.json
```

Com essa estrutura, você poderá substituir a constante `INITIAL_PRODUCTS` no front-end por chamadas HTTP (usando `fetch` ou `axios`) consumindo as rotas configuradas aqui!