const API_URL =
  "https://sintele-api.onrender.com/api";
const PUBLIC_SINTELE_URL =
  "https://sintele-web.vercel.app";
const SINTELE_APP_URL =
  "https://sintele.vercel.app";
const caminho =
  window.location.pathname;
const partes =
  caminho
    .split("/")
    .filter(Boolean);
const ultimoSegmento =
  partes[partes.length - 1];
const parametros =
  new URLSearchParams(
    window.location.search
  );
const usernameUrl =
  parametros.get("username");
const username =
  ultimoSegmento &&
  ultimoSegmento !== "sintele-web"
    ? decodeURIComponent(
        ultimoSegmento
      )
    : usernameUrl || "";
const contato = {
  whatsapp: "",
  phone: "",
  email: "",
};
const redesNomes = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  github: "GitHub",
  youtube: "YouTube",
};
function getIconeRede(platform) {
  const icones = {
    linkedin:
      "/assets/icons/linkedin.png",
    instagram:
      "/assets/icons/instagram.png",
    github:
      "/assets/icons/github.png",
    youtube:
      "/assets/icons/youtube.png",
  };
  return (
    icones[platform] ||
    "/assets/icons/redes.png"
  );
}
function formatarTelefone(numero) {
  if (!numero) {
    return "";
  }
  const somenteNumeros =
    numero.replace(/\D/g, "");
  if (
    somenteNumeros.length === 11
  ) {
    return `(${somenteNumeros.slice(
      0,
      2
    )}) ${somenteNumeros.slice(
      2,
      7
    )}-${somenteNumeros.slice(7)}`;
  }
  return numero;
}
function configurarWhatsApp(numero) {
  const botao =
    document.getElementById(
      "botaoWhatsApp"
    );
  if (!botao) {
    return;
  }
  if (!numero) {
    botao.style.display = "none";
    return;
  }
  const numeroLimpo =
    numero.replace(/\D/g, "");
  botao.style.display = "";
  botao.href =
    `https://wa.me/55${numeroLimpo}`;
  botao.target = "_blank";
  botao.rel =
    "noopener noreferrer";
}
function criarAvatarPadrao(
  foto,
  fotoContainer,
  nomeCompleto
) {
  if (
    !foto ||
    !fotoContainer
  ) {
    return;
  }
  const nome =
    nomeCompleto ||
    "SINTELE";
  const inicial =
    nome
      .trim()
      .charAt(0)
      .toUpperCase() || "S";
  foto.removeAttribute("src");
  foto.alt =
    `Avatar de ${nome}`;
  foto.style.display = "none";
  fotoContainer.classList.add(
    "foto-padrao"
  );
  fotoContainer.setAttribute(
    "data-inicial",
    inicial
  );
  fotoContainer.style.display =
    "flex";
}
function configurarFoto(
  foto,
  fotoContainer,
  perfil
) {
  if (
    !foto ||
    !fotoContainer
  ) {
    return;
  }
  fotoContainer.classList.remove(
    "foto-padrao"
  );
  fotoContainer.removeAttribute(
    "data-inicial"
  );
  if (
    perfil.photoUrl &&
    perfil.photoUrl.trim()
  ) {
    foto.src =
      perfil.photoUrl;
    foto.alt =
      perfil.fullName ||
      "Foto de perfil";
    foto.style.display =
      "block";
    fotoContainer.style.display =
      "flex";
    return;
  }
  criarAvatarPadrao(
    foto,
    fotoContainer,
    perfil.fullName
  );
}
function normalizarUrlRede(
  plataforma,
  valor
) {
  if (!valor) {
    return "";
  }
  let url =
    valor.trim();
  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }
  const usuario =
    url.replace(/^@/, "");
  if (
    plataforma === "instagram"
  ) {
    return `https://instagram.com/${usuario}`;
  }
  if (
    plataforma === "linkedin"
  ) {
    return `https://www.linkedin.com/in/${usuario}`;
  }
  if (
    plataforma === "github"
  ) {
    return `https://github.com/${usuario}`;
  }
  if (
    plataforma === "youtube"
  ) {
    return `https://youtube.com/${usuario}`;
  }
  return url;
}
function renderizarRedes(
  socialLinks
) {
  const card =
    document.getElementById(
      "cardRedes"
    );
  const grid =
    document.getElementById(
      "redesGrid"
    );
  if (!card || !grid) {
    return;
  }
  grid.innerHTML = "";
  if (
    !socialLinks ||
    socialLinks.length === 0
  ) {
    card.style.display =
      "none";
    return;
  }
  socialLinks.forEach(
    (rede) => {
      if (
        !rede.platform ||
        !rede.url
      ) {
        return;
      }
      const plataforma =
        rede.platform
          .toLowerCase()
          .trim();
      const nome =
        redesNomes[
          plataforma
        ] ||
        plataforma;
      const url =
        normalizarUrlRede(
          plataforma,
          rede.url
        );
      if (!url) {
        return;
      }
      const link =
        document.createElement(
          "a"
        );
      link.className =
        `rede ${plataforma}`;
      link.href = url;
      link.target =
        "_blank";
      link.rel =
        "noopener noreferrer";
      const icone =
        document.createElement(
          "div"
        );
      icone.className =
        "rede-icone";
      const imagem =
        document.createElement(
          "img"
        );
      imagem.src =
        getIconeRede(
          plataforma
        );
      imagem.alt =
        nome;
      icone.appendChild(
        imagem
      );
      const texto =
        document.createElement(
          "span"
        );
      texto.textContent =
        nome;
      link.appendChild(
        icone
      );
      link.appendChild(
        texto
      );
      grid.appendChild(
        link
      );
    }
  );
  if (
    !grid.children.length
  ) {
    card.style.display =
      "none";
    return;
  }
  card.style.display =
    "block";
}
function configurarContatoTelefone() {
  const telefone =
    document.querySelector(
      '[data-contato="telefone"]'
    );
  if (!telefone) {
    return;
  }
  if (!contato.phone) {
    telefone.style.display =
      "none";
    return;
  }
  telefone.style.display =
    "";
  telefone.textContent =
    formatarTelefone(
      contato.phone
    );
  telefone.href =
    `tel:${contato.phone.replace(
      /\D/g,
      ""
    )}`;
}
function configurarEmail() {
  const email =
    document.querySelector(
      '[data-contato="email"]'
    );
  if (!email) {
    return;
  }
  if (!contato.email) {
    email.style.display =
      "none";
    return;
  }
  email.style.display =
    "";
  email.textContent =
    contato.email;
  email.href =
    `mailto:${contato.email}`;
}
function configurarPerfilCompleto(
  perfil
) {
  const botao =
    document.getElementById(
      "botaoPerfilCompleto"
    );
  if (!botao) {
    return;
  }
  if (!perfil.username) {
    botao.style.display =
      "none";
    return;
  }
  botao.style.display =
    "";
  botao.href =
    "#";
  botao.onclick = (
    evento
  ) => {
    evento.preventDefault();
    alert(
      "A funcionalidade de perfil completo ainda está em desenvolvimento."
    );
  };
}
function configurarSalvarContato(
  perfil
) {
  const botao =
    document.getElementById(
      "salvarContato"
    );
  if (!botao) {
    return;
  }
  botao.onclick = () => {
    const nome =
      perfil.fullName ||
      "Contato SINTELE";
    const telefone =
      contato.phone ||
      contato.whatsapp ||
      "";
    const email =
      contato.email ||
      "";
    const perfilUrl =
      `${PUBLIC_SINTELE_URL}/${encodeURIComponent(
        perfil.username ||
          username
      )}`;
    const vcard =
      [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${nome}`,
        telefone
          ? `TEL;TYPE=CELL:${telefone}`
          : "",
        email
          ? `EMAIL:${email}`
          : "",
        `URL:${perfilUrl}`,
        "END:VCARD",
      ]
        .filter(Boolean)
        .join("\n");
    const blob =
      new Blob(
        [vcard],
        {
          type:
            "text/vcard;charset=utf-8",
        }
      );
    const url =
      URL.createObjectURL(
        blob
      );
    const link =
      document.createElement(
        "a"
      );
    link.href =
      url;
    link.download =
      `${nome.replace(
        /\s+/g,
        "-"
      )}.vcf`;
    document.body.appendChild(
      link
    );
    link.click();
    link.remove();
    URL.revokeObjectURL(
      url
    );
  };
}
function configurarProjetos(
  perfil,
  projetos
) {
  const verTodos =
    document.getElementById(
      "verTodosProjetos"
    );
  const grid =
    document.getElementById(
      "projetosGrid"
    );
  const semProjetos =
    document.getElementById(
      "semProjetos"
    );
  if (!grid) {
    return;
  }
  grid.innerHTML = "";
  if (verTodos) {
    if (perfil.allProjectsUrl) {
      verTodos.href =
        perfil.allProjectsUrl;
      verTodos.style.display =
        "";
    } else {
      verTodos.href =
        "#";
      verTodos.style.display =
        "";
      verTodos.onclick = (
        evento
      ) => {
        evento.preventDefault();
        alert(
          "A funcionalidade de ver todos os projetos ainda está em desenvolvimento."
        );
      };
    }
  }
  if (
    !projetos ||
    projetos.length === 0
  ) {
    if (semProjetos) {
      semProjetos.style.display =
        "block";
    }
    return;
  }
  if (semProjetos) {
    semProjetos.style.display =
      "none";
  }
  projetos.forEach(
    (projeto) => {
      const possuiLink =
        Boolean(
          projeto.project_url ||
          projeto.github_url
        );
      const card =
        document.createElement(
          "article"
        );
      card.className =
        "projeto-card";
      if (possuiLink) {
        card.style.cursor =
          "pointer";
        card.addEventListener(
          "click",
          () => {
            const destino =
              projeto.project_url ||
              projeto.github_url;
            window.open(
              destino,
              "_blank",
              "noopener,noreferrer"
            );
          }
        );
      }
      if (projeto.image_url) {
        const imagem =
          document.createElement(
            "img"
          );
        imagem.src =
          projeto.image_url;
        imagem.alt =
          projeto.title ||
          "Projeto";
        imagem.className =
          "projeto-imagem";
        card.appendChild(
          imagem
        );
      }
      const conteudo =
        document.createElement(
          "div"
        );
      conteudo.className =
        "projeto-conteudo";
      const titulo =
        document.createElement(
          "h3"
        );
      titulo.textContent =
        projeto.title ||
        "Projeto";
      conteudo.appendChild(
        titulo
      );
      if (
        projeto.description
      ) {
        const descricao =
          document.createElement(
            "p"
          );
        descricao.textContent =
          projeto.description;
        conteudo.appendChild(
          descricao
        );
      }
      const links =
        document.createElement(
          "div"
        );
      links.className =
        "projeto-links";
      if (projeto.project_url) {
        const linkProjeto =
          document.createElement(
            "a"
          );
        linkProjeto.href =
          projeto.project_url;
        linkProjeto.target =
          "_blank";
        linkProjeto.rel =
          "noopener noreferrer";
        linkProjeto.textContent =
          "Ver projeto";
        linkProjeto.addEventListener(
          "click",
          (evento) => {
            evento.stopPropagation();
          }
        );
        links.appendChild(
          linkProjeto
        );
      }
      if (projeto.github_url) {
        const linkGithub =
          document.createElement(
            "a"
          );
        linkGithub.href =
          projeto.github_url;
        linkGithub.target =
          "_blank";
        linkGithub.rel =
          "noopener noreferrer";
        linkGithub.textContent =
          "GitHub";
        linkGithub.addEventListener(
          "click",
          (evento) => {
            evento.stopPropagation();
          }
        );
        links.appendChild(
          linkGithub
        );
      }
      if (
        links.children.length
      ) {
        conteudo.appendChild(
          links
        );
      }
      card.appendChild(
        conteudo
      );
      grid.appendChild(
        card
      );
    }
  );
}
async function carregarPerfil() {
  try {
    if (!username) {
      throw new Error(
        "Usuário não informado."
      );
    }
    const resposta =
      await fetch(
        `${API_URL}/public/professional/${encodeURIComponent(
          username
        )}`
      );
    if (!resposta.ok) {
      throw new Error(
        `Erro HTTP ${resposta.status}`
      );
    }
    const dados =
      await resposta.json();
    const perfil =
      dados.profile || {};
    const contatos =
      dados.contacts || {};
    const socialLinks =
      dados.socialLinks || [];
    const projetos =
      dados.projects || [];
    contato.whatsapp =
      contatos.whatsapp || "";
    contato.phone =
      contatos.phone || "";
    contato.email =
      contatos.email || "";
    const foto =
      document.getElementById(
        "fotoPerfil"
      );
    const fotoContainer =
      document.getElementById(
        "fotoContainer"
      );
    const nome =
      document.getElementById(
        "nomePerfil"
      );
    const profissao =
      document.getElementById(
        "profissaoPerfil"
      );
    const empresa =
      document.getElementById(
        "empresaPerfil"
      );
    const bio =
      document.getElementById(
        "bioPerfil"
      );
    const empresaInfo =
      document.getElementById(
        "empresaInfo"
      );
    const cargoInfo =
      document.getElementById(
        "cargoInfo"
      );
    const localizacaoInfo =
      document.getElementById(
        "localizacaoInfo"
      );
    const profissaoInfo =
      document.getElementById(
        "profissaoInfo"
      );
    configurarFoto(
      foto,
      fotoContainer,
      perfil
    );
    if (nome) {
      nome.textContent =
        perfil.fullName ||
        "Nome não informado";
    }
    if (profissao) {
      profissao.textContent =
        perfil.jobTitle ||
        perfil.profession ||
        "";
    }
    if (empresa) {
      empresa.textContent =
        perfil.companyName ||
        "";
    }
    if (bio) {
      bio.textContent =
        perfil.bio ||
        "";
    }
    if (empresaInfo) {
      empresaInfo.textContent =
        perfil.companyName ||
        "Não informado";
    }
    if (cargoInfo) {
      cargoInfo.textContent =
        perfil.jobTitle ||
        perfil.profession ||
        "Não informado";
    }
    if (localizacaoInfo) {
      const cidade =
        perfil.city || "";
      const estado =
        perfil.state || "";
      const localizacao =
        [cidade, estado]
          .filter(Boolean)
          .join(" - ");
      localizacaoInfo.textContent =
        localizacao ||
        "Não informado";
    }
    if (profissaoInfo) {
      profissaoInfo.textContent =
        perfil.profession ||
        perfil.jobTitle ||
        "Não informado";
    }
    document.title =
      perfil.fullName
        ? `${perfil.fullName} | SINTELE`
        : "SINTELE";
    configurarWhatsApp(
      contato.whatsapp
    );
    renderizarRedes(
      socialLinks
    );
    configurarPerfilCompleto(
      perfil
    );
    configurarSalvarContato(
      perfil
    );
    configurarContatoTelefone();
    configurarEmail();
    configurarProjetos(
      perfil,
      projetos
    );
  } catch (error) {
    console.error(
      "Erro ao carregar perfil:",
      error
    );
    const foto =
      document.getElementById(
        "fotoPerfil"
      );
    const fotoContainer =
      document.getElementById(
        "fotoContainer"
      );
    const nome =
      document.getElementById(
        "nomePerfil"
      );
    const profissao =
      document.getElementById(
        "profissaoPerfil"
      );
    const empresa =
      document.getElementById(
        "empresaPerfil"
      );
    const bio =
      document.getElementById(
        "bioPerfil"
      );
    if (foto) {
      criarAvatarPadrao(
        foto,
        fotoContainer,
        "SINTELE"
      );
    }
    if (nome) {
      nome.textContent =
        "Perfil não encontrado";
    }
    if (profissao) {
      profissao.textContent =
        "";
    }
    if (empresa) {
      empresa.textContent =
        "";
    }
    if (bio) {
      bio.textContent =
        "";
    }
  }
}
function configurarEfeitosBotoes() {
  const botoes =
    document.querySelectorAll(
      "button, .botao, .botao-download"
    );
  botoes.forEach(
    (botao) => {
      botao.addEventListener(
        "click",
        () => {
          botao.style.transform =
            "scale(0.97)";
          setTimeout(() => {
            botao.style.transform =
              "";
          }, 120);
        }
      );
    }
  );
}
carregarPerfil();
configurarEfeitosBotoes();