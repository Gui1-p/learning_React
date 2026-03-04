# Modern Landing Page - React + TypeScript 🚀

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Este projeto é uma **Landing Page de alta performance** construída com as tecnologias mais modernas do ecossistema Frontend. O foco principal foi aplicar conceitos de componentização limpa, separação de dados da interface e conteinerização.

## 🛠️ Stack Tecnológica

- **Core:** [React.js](https://reactjs.org/) (Hooks e Componentes Funcionais)
- **Build Tool:** [Vite](https://vitejs.dev/) (Fast Refresh e Optimized Build)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Tipagem estática para robustez)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (Engine de estilização de última geração)
- **Infraestrutura:** [Docker](https://www.docker.com/) (Ambiente isolado e replicável)

## 🏗️ Diferenciais do Projeto

- **Data-Driven UI:** Os textos e descrições não estão "hardcoded" nos componentes. Eles são consumidos de arquivos de configuração em `src/contents/`, facilitando a manutenção e futuras internacionalizações (i18n).
- **Componentização Modular:** Divisão clara entre seções (Header, Hero, Team, Footer), permitindo o reuso de código.
- **Ambiente Profissional:** Configuração pronta para Docker, garantindo que o projeto rode exatamente da mesma forma em qualquer máquina.
- **Design Minimalista:** Paleta de cores baseada em tons de **Zinc** e **Slate**, focada em legibilidade e estética profissional.

## 🚀 Como Executar

### Localmente
1. Instale as dependências:
   ```bash
   npm install

   Rode em modo de desenvolvimento:
   Bash

   npm run dev

2. Via Docker

   Build da imagem:
   Bash

   docker build -t landing-page-tech .

   Execução do container:
   Bash

   docker run -p 80:80 landing-page-tech

## 📂 Organização de Pastas

   src/  
   ├── components/   # UI Units (Navbar, Hero, Team, etc.)  
   ├── contents/     # Textos e configurações (Single Source of Truth)  
   ├── assets/       # Media e Static files  
   ├── App.tsx       # Layout Orchestrator  
   └── main.tsx      # Entry point e CSS Injection  
