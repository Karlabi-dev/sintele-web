# SINTELE Web

### Sistema de Identidade, Networking e Tecnologia

O SINTELE Web é a página pública do ecossistema SINTELE. Ele apresenta o perfil profissional gerenciado pelo SINTELE App.

O SINTELE App e o SINTELE Web trabalham em conjunto: o aplicativo gerencia as informações do profissional e o Web apresenta essas informações em uma página pública.

## 🌐 Perfil público

Cada profissional possui um endereço público baseado no seu username:

`https://sintele-web.vercel.app/{username}`

Exemplo:

`https://sintele-web.vercel.app/karla-bianca`

## 📋 Informações apresentadas

O perfil público pode apresentar:

- Nome
- Foto de perfil
- Cargo
- Profissão
- Empresa
- Biografia
- Cidade e estado
- Contatos
- Redes sociais
- Projetos

Os dados são carregados através da API do SINTELE.

## 🔗 Integração com o SINTELE App

O fluxo atual entre os dois projetos é:

```text
SINTELE App
     │
     │ dados do profissional
     ▼
API SINTELE
     │
     ▼
SINTELE Web
     │
     ├── Perfil público
     ├── Link público
     └── QR Code
```

O link público pode ser compartilhado diretamente pelo aplicativo ou utilizado na geração do QR Code.

## 🎨 Interface

A página pública foi desenvolvida para apresentar as informações profissionais de forma organizada e adaptada para dispositivos móveis.

A página conta com seções para:

- Perfil profissional
- Informações profissionais
- Redes sociais
- Projetos
- Contatos
- Compartilhamento

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript

## 🚀 Hospedagem

O SINTELE Web está hospedado na **Vercel**.

Perfil público de exemplo:

**Karla Bianca**

`https://sintele-web.vercel.app/karla-bianca`

## 📌 Status

🚧 Em desenvolvimento.

A página pública já está funcionando e integrada à API do SINTELE. O projeto continua recebendo melhorias conforme novas funcionalidades são desenvolvidas no SINTELE App.

O botão de download do SINTELE permanece em desenvolvimento.

## 🔮 Evolução do projeto

O SINTELE Web acompanha a evolução do SINTELE App. Novos recursos serão adicionados conforme as funcionalidades de networking e outras áreas do aplicativo forem implementadas.

## 👩‍💻 Desenvolvedora

**Karla Bianca**  
Desenvolvedora Full Stack e criadora do SINTELE.

- 📧 E-mail: [karlabianca2319@gmail.com](mailto:karlabianca2319@gmail.com)
- 💼 LinkedIn: [Karla Bianca](https://www.linkedin.com/in/karla-bianca-563734355/)
- 📸 Instagram: [@karla.bi_](https://www.instagram.com/karla.bi_/)
- 🐙 GitHub: [Karlabi-dev](https://github.com/Karlabi-dev)

---

**SINTELE — conectando pessoas, talentos e oportunidades.**
