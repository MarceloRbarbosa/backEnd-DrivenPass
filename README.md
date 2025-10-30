# DrivenPass API

Este projeto é o **backend da aplicação DrivenPass**, uma API REST desenvolvida em **Node.js**, **TypeScript** e **Express**, com **PostgreSQL** e **Prisma ORM**.  
O sistema é responsável por gerenciar credenciais de usuários de forma segura, utilizando **criptografia com Bcrypt** e **autenticação JWT (JSON Web Token)**.

---

## 1. Tecnologias utilizadas

- Node.js  
- TypeScript  
- Express  
- Prisma ORM  
- PostgreSQL (banco hospedado na Vercel)  
- Bcrypt  
- JWT (JSON Web Token)  
- Joi (validação de dados)  
- Dotenv  
- Jest e Supertest (testes automatizados)

---

## 2. Funcionalidades principais

- Cadastro e autenticação de usuários.  
- Armazenamento de credenciais criptografadas.  
- Acesso seguro via tokens JWT.  
- Validação de dados e tratamento de erros.  
- Testes automatizados de rotas e serviços.  
- Configuração de ambiente para desenvolvimento e produção.

---

## 3. Estrutura do projeto

```

drivenpass-backend-api/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── schemas/
│   └── server.ts
│
├── tests/
│
├── .env
├── package.json
├── tsconfig.json
└── README.md


```
---

## 4. Scripts disponíveis

| Comando | Descrição |
|----------|------------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento (ts-node-dev). |
| `npm run build` | Compila o projeto para JavaScript. |
| `npm start` | Executa migrações, popula o banco e inicia o servidor. |
| `npm run migration:run` | Executa as migrações no banco de dados. |
| `npm run seed` | Executa o script de seed do Prisma. |
| `npm test` | Executa os testes automatizados. |
| `npm run test:coverage` | Executa os testes e gera relatório de cobertura. |

---

## 5. Configuração do ambiente

Crie um arquivo **.env** na raiz do projeto com as seguintes variáveis (exemplo):

- DATABASE_URL="postgresql://usuario:senha@servidor:porta/nome_do_banco"
- JWT_SECRET="sua_chave_secreta"
- PORT=5000 (ou valor de sua preferencia)


Para o ambiente de testes, crie um arquivo **.env.test** com as mesmas variáveis, alterando apenas o nome do banco de dados.

---

## 6. Banco de dados e Prisma

O banco de dados utilizado é o **PostgreSQL**, com as migrações e seeds gerenciadas pelo **Prisma ORM**.  
O banco está hospedado na **Vercel**.

### Comandos úteis do Prisma

```
- npx prisma migrate dev
```
```
- npx prisma studio
```
```
- npx prisma db seed
```


---

## 7. Testes

Os testes são feitos com **Jest** e **Supertest**, garantindo a integridade das rotas e serviços.

Para executá-los:

```
- npm run test
```
```
- npm run test:coverage (para emitir relatório de teste)
```

---


---

## 8. Deploy

A API  e o banco PostgresSQL está hospedada e conectada no **Render** 

- **URL base:**  
  [https://backend-drivenpass.onrender.com/](https://backend-drivenpass.onrender.com/)

- **Rota de verificação de saúde:**  
  [https://backend-drivenpass.onrender.com/health](https://backend-drivenpass.onrender.com/health)

---

## 9. Autor

**Marcelo Ribeiro Barbosa**  
Desenvolvedor Web Full Stack  
Email: marceloribeirobarbosa92@gmail.com  
GitHub: [MarceloRbarbosa](https://github.com/MarceloRbarbosa)

---

## 10. Licença

Este projeto está licenciado sob a licença **ISC**.


