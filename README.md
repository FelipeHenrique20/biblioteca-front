# 📚 Biblioteca Front-end

> 🌐 **Demo ao vivo:** [biblioteca-front-puce-mu.vercel.app](https://biblioteca-front-puce-mu.vercel.app)
> 
> Conta de demonstração: `admin@biblioteca-demo.com` / `Admin5tD@aA`

> 🔗 Back-end deste projeto: [biblioteca-do-zero](https://github.com/FelipeHenrique20/biblioteca-do-zero)

Interface web para o sistema de gerenciamento de biblioteca, desenvolvida com **React, TypeScript e Vite**, consumindo a API REST do projeto [biblioteca-do-zero](https://github.com/FelipeHenrique20/biblioteca-do-zero).

---

## 🚀 Sobre o projeto

A interface permite gerenciar autores, livros, usuários e empréstimos de uma biblioteca, com um painel administrativo protegido por login e controle de acesso baseado em papéis (`admin` / `comum`).

---

## ✨ Funcionalidades

✅ Login com e-mail e senha, com sessão persistida entre recarregamentos
✅ Rotas protegidas: acesso ao painel exige autenticação
✅ Dashboard com indicadores em tempo real e atividades recentes
✅ Cadastro, edição, listagem e remoção de autores, livros e usuários
✅ Registro e devolução de empréstimos, com checagem de disponibilidade
✅ Controle de acesso por papel: apenas administradores criam, editam e removem registros
✅ Tela de gestão de contas, para promover e rebaixar administradores
✅ Detecção de sessão expirada, com logout automático

---

## 🛠️ Tecnologias utilizadas

* **React**
* **TypeScript**
* **React Router**
* **Vite**
* **Lucide React** — ícones
* **ESLint**
* **Git e GitHub**

---

## 📂 Estrutura do projeto

```
biblioteca-front
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── AutorSection.tsx
│   │   ├── LivroSection.tsx
│   │   ├── UsuarioSection.tsx
│   │   ├── EmprestimoSection.tsx
│   │   ├── ContaSection.tsx
│   │   ├── Sidebat.tsx
│   │   ├── Layout.tsx
│   │   ├── RotaProtegida.tsx
│   │   └── RotaPublica.tsx
│   ├── contexts
│   │   └── AuthContext.tsx
│   ├── pages
│   │   ├── Autores.tsx
│   │   ├── Contas.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Emprestimos.tsx
│   │   ├── Livros.tsx
│   │   ├── Login.tsx
│   │   └── Usuario.tsx   
│   ├── utils
│   │   └── api.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.ts
```


---

## 🏗️ Arquitetura do projeto

* **contexts:** `AuthContext` centraliza sessão do usuário (token, conta, login, logout), acessível por qualquer componente via `useAuth()`
* **components:** um componente por entidade, além de componentes de layout e proteção de rotas
* **pages:** telas ligadas a uma rota, geralmente encaixando um component
* **RotaProtegida / RotaPublica:** controlam redirecionamento com base na existência de sessão ativa
* Cada componente se comunica com a API via `fetch`, anexando o token de autenticação nas requisições que alteram dados

---

## 🔐 Autenticação

A sessão é armazenada no `localStorage` do navegador e reidratada automaticamente ao carregar a aplicação. Rotas do painel exigem sessão ativa; a rota de login redireciona automaticamente para o painel caso já exista uma sessão válida.

Botões de criação, edição e remoção só aparecem para contas com papel `admin` — contas `comum` visualizam os dados, mas não podem alterá-los.

---

## ⚙️ Como executar o projeto

### Pré-requisitos

* Node.js
* npm
* Git

**Importante:** este projeto consome a API do [biblioteca-do-zero](https://github.com/FelipeHenrique20/biblioteca-do-zero) — é necessário ter o back-end rodando em `http://localhost:3000`.

### Clone o repositório

```bash
git clone https://github.com/FelipeHenrique20/biblioteca-front.git
cd biblioteca-front
npm install
npm run dev
```

A aplicação estará disponível em:
http://localhost:5173


Para acessar o painel, é necessário criar uma conta via `POST /contas/registro` na API e promovê-la a `admin` (pela tela de Contas, já logado como um administrador existente, ou diretamente no banco para a primeira conta).

---

## 🧠 Conceitos aplicados

* Componentização em React
* Gerenciamento de estado com `useState` e Context API
* Efeitos colaterais com `useEffect`
* Roteamento com React Router, incluindo rotas aninhadas e protegidas
* Consumo de API REST com `fetch`, incluindo autenticação via token
* Formulários controlados, com edição inline
* Renderização condicional baseada em papéis de usuário
* Persistência de sessão com `localStorage`
* Tipagem de dados de API com TypeScript
* Versionamento com Git

---

## 🔮 Próximas melhorias

* [ ] Portal do leitor (catálogo de busca e pedido de empréstimo)
* [ ] Deploy da aplicação

---

## 👨‍💻 Autor

**Felipe Henrique**

GitHub: https://github.com/FelipeHenrique20

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
