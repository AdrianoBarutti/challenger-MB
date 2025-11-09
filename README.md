# Nome do app: VagasMottu em instantes 


Aplicativo desenvolvido em **React Native com Expo**, com o objetivo de otimizar a organização do pátio de motos da **Mottu**.

---

## ⚙️ Pré-requisitos
Antes de iniciar, certifique-se de ter o **Node.js** instalado na sua máquina.

---

## 🚀 Como iniciar o projeto

### 1. Acesse a pasta do projeto
```bash
cd Challenger
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Iniciar o projeto
```bash
npm start
```

Ao iniciar, escolha o modo de exibição:
- **A** → Abrir no app mobile (Expo Go)
- **W** → Abrir no navegador (modo Web)

---

## 💡 Proposta e Funcionalidades

O **Challenger-MB** tem como propósito facilitar a gestão e o estacionamento das motos no pátio da **Mottu**, utilizando tecnologias modernas e acessíveis.

### Funcionalidades principais:
- 📷 **Escaneamento de QR Code** — identifica a vaga da moto automaticamente.  
- 🏍️ **Exibição da vaga correspondente** — mostra na tela o local exato onde estacionar.  
- 💬 **Tela de suporte** — formulário para enviar chamados e visualizar os já salvos.  
- 👤 **Perfil do usuário** — informações da conta e opção de logout.  
- 🌐 **Suporte a múltiplos idiomas** — alternância entre **português e espanhol**.  
- 📄 **Tela "Sobre o App"** — informações da versão, commit e descrição do projeto.

---

## 🗂️ Estrutura de Pastas 

```
Challenger/
│
├── App/                    # Páginas principais do app
│   ├── Login.tsx
│   ├── Cadastro.tsx
│   ├── Suporte.tsx
│   ├── Perfil.tsx
│   └── SobreApp.tsx
│
├── services/               # Configurações e integrações
│   ├── i18n.ts             # Internacionalização (PT/ES)
│   └── firebaseConfig.ts   # Conexão com Firebase
│
├── assets/                 # Imagens e ícones
│
├── commit.json             # Informações do commit atual
├── package.json
└── App.tsx                 # Arquivo principal
```

---

## 👨‍💻 Autores



| **Adriano Barutti** | RM556760 | [github.com/AdrianoBarutti](https://github.com/AdrianoBarutti) |
| **Vitor Kenzo Mizumoto** | RM557245 | [github.com/vitorkenzoo](https://github.com/vitorkenzoo) |

---

## 💬 Solução

A solução permite que o usuário **escaneie o QR Code fixado na moto** para identificar automaticamente a **vaga onde ela está estacionada**.  
Após a leitura, o aplicativo exibe o local exato da vaga, tornando o processo **mais prático, rápido e organizado**, melhorando a experiência do usuário e **reduzindo o tempo perdido procurando motos**.
