# 📚 Biblioteca Front-end

> 🔗 Back-end deste projeto: [biblioteca-do-zero](https://github.com/FelipeHenrique20/biblioteca-do-zero)

Interface web para o sistema de gerenciamento de biblioteca, desenvolvida com **React, TypeScript e Vite**, consumindo a API REST do projeto [biblioteca-do-zero](https://github.com/FelipeHenrique20/biblioteca-do-zero).

O projeto tem como objetivo aplicar conceitos de desenvolvimento front-end, como consumo de API REST, componentização, gerenciamento de estado e organização de código com TypeScript.

---

## 🚀 Sobre o projeto

A interface permite gerenciar autores, livros, usuários e empréstimos de uma biblioteca, consumindo diretamente os endpoints da API back-end através de requisições HTTP.

Cada entidade possui sua própria seção, com formulário de cadastro, listagem de dados em tempo real e ações de remoção — refletindo as regras de negócio já validadas no back-end (como disponibilidade de exemplares e bloqueio de remoção de registros com vínculos).

---

## ✨ Funcionalidades

✅ Cadastro e listagem de autores
✅ Cadastro e listagem de livros, vinculados a um autor
✅ Cadastro e listagem de usuários
✅ Registro de empréstimos, com checagem de disponibilidade de exemplares
✅ Devolução de empréstimos
✅ Remoção de registros, com exibição de erros de negócio vindos da API (ex: remoção bloqueada por vínculo)
✅ Atualização automática das listas após cada ação

---

## 🛠️ Tecnologias utilizadas

* **React**
* **TypeScript**
* **Vite**
* **ESLint**
* **Git e GitHub**

---

## 📦 Principais dependências

* **React** — construção da interface baseada em componentes
* **TypeScript** — tipagem estática e maior segurança no desenvolvimento
* **Vite** — build e servidor de desenvolvimento

---

## 📂 Estrutura do projeto

```
biblioteca-front
│
├── public
│   └── favicon.svg
│
├── src
│   ├── assets
│   ├── components
│   │   ├── AutorSection.tsx
│   │   ├── EmprestimoSection.tsx
│   │   ├── LivroSection.tsx
│   │   └── UsuarioSection.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🏗️ Arquitetura do projeto

O projeto segue uma organização baseada em componentização por entidade:

* **components:** um componente por entidade do sistema (Autor, Livro, Usuário, Empréstimo), cada um responsável por buscar, exibir, criar e remover seus próprios dados
* **App:** componente raiz que agrupa todas as seções
* Cada componente se comunica diretamente com a API através da função `fetch`, tratando tanto respostas de sucesso quanto de erro retornadas pelo back-end

Essa estrutura facilita a manutenção e a adição de novas entidades no futuro.

---

## ⚙️ Como executar o projeto

### Pré-requisitos

Antes de iniciar, tenha instalado:

* Node.js
* npm
* Git

**Importante:** este projeto consome a API do [biblioteca-do-zero](https://github.com/FelipeHenrique20/biblioteca-do-zero) — é necessário ter o back-end rodando em `http://localhost:3000` para que os dados sejam carregados corretamente.

---

### Clone o repositório

```bash
git clone https://github.com/FelipeHenrique20/biblioteca-front.git
```

Entre na pasta:

```bash
cd biblioteca-front
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

A aplicação estará disponível em:
http://localhost:5173

---

## 🧠 Conceitos aplicados

Durante o desenvolvimento foram praticados:

* Componentização em React
* Gerenciamento de estado com `useState`
* Efeitos colaterais com `useEffect`
* Consumo de API REST com `fetch`
* Formulários controlados
* Renderização condicional e de listas
* Tipagem de dados de API com TypeScript
* Tratamento de erros retornados pelo back-end
* Versionamento com Git

---

## 🔮 Próximas melhorias

Algumas melhorias planejadas:

* [ ] Estilização visual completa
* [ ] Edição de registros (além de criar e remover)
* [ ] Autenticação de usuários
* [ ] Deploy da aplicação

---

## 👨‍💻 Autor

**Felipe Henrique**

GitHub:
https://github.com/FelipeHenrique20

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.