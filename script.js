const API_URL =
  "https://sintele-api.onrender.com/api";
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
    linkedin: "assets/icons/linkedin.png",
    instagram: "assets/icons/instagram.png",
    github: "assets/icons/github.png",
    youtube: "assets/icons/youtube.png",
  };
  return (
    icones[platform] ||
    "assets/icons/redes.png"
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
  botao.onclick = () => {
    const url =
      `https://wa.me/55${numeroLimpo}`;
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };
}
function renderizarRedes(socialLinks) {
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
    card.style.display = "none";
    return;
  }
  card.style.display = "block";
  socialLinks.forEach((rede) => {
    if (!rede.platform || !rede.url) {
      return;
    }
    const plataforma =
      rede.platform.toLowerCase();
    const nome =
      redesNomes[plataforma] ||
      plataforma;
    let url = rede.url.trim();
    if (
      plataforma === "instagram" &&
      !url.startsWith("http")
    ) {
      url =
        `https://instagram.com/${url.replace(
          /^@/,
          ""
        )}`;
    }
    if (
      plataforma === "linkedin" &&
      !url.startsWith("http")
    ) {
      url =
        `https://www.linkedin.com/in/${url.replace(
          /^@/,
          ""
        )}`;
    }
    if (
      plataforma === "github" &&
      !url.startsWith("http")
    ) {
      url =
        `https://github.com/${url.replace(
          /^@/,
          ""
        )}`;
    }
    if (
      plataforma === "youtube" &&
      !url.startsWith("http")
    ) {
      url =
        `https://youtube.com/${url}`;
    }
    const link =
      document.createElement("a");
    link.className =
      `rede ${plataforma}`;
    link.href = url;
    link.target = "_blank";
    link.rel =
      "noopener noreferrer";
    const icone =
      document.createElement("div");
    icone.className =
      "rede-icone";
    const imagem =
      document.createElement("img");
    imagem.src =
      getIconeRede(plataforma);
    imagem.alt =
      nome;
    imagem.style.width =
      "100%";
    imagem.style.height =
      "100%";
    imagem.style.objectFit =
      "contain";
    imagem.style.padding =
      "10px";
    icone.appendChild(imagem);
    const texto =
      document.createElement("span");
    texto.textContent =
      nome;
    link.appendChild(icone);
    link.appendChild(texto);
    grid.appendChild(link);
  });
  if (!grid.children.length) {
    card.style.display = "none";
  }
}
async function carregarPerfil() {
  try {
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
    if (foto) {
      if (perfil.photoUrl) {
        foto.src = perfil.photoUrl;
        foto.alt =
          perfil.fullName ||
          "Perfil SINTELE";
      } else {
        foto.style.display = "none";
      }
    }
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
  } catch (error) {
    console.error(
      "Erro ao carregar perfil:",
      error
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
    botao.style.display = "none";
    return;
  }
  botao.href =
    `https://karlabi-dev.github.io/sintele-app/`;
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
    telefone.style.display = "none";
    return;
  }
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
    email.style.display = "none";
    return;
  }
  email.textContent =
    contato.email;
  email.href =
    `mailto:${contato.email}`;
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
        `URL:https://karlabi-dev.github.io/sintele-web/${encodeURIComponent(
          perfil.username ||
            username
        )}`,
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
      URL.createObjectURL(blob);
    const link =
      document.createElement("a");
    link.href = url;
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
    URL.revokeObjectURL(url);
  };
}

function configurarEfeitosBotoes() {
  const botoes =
    document.querySelectorAll(
      "button, .botao, .botao-download"
    );
  botoes.forEach((botao) => {
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
  });
}
carregarPerfil();
configurarEfeitosBotoes();