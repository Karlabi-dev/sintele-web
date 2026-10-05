import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getDatabase,
  ref,
  runTransaction,
  onValue,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDgOC4ng6X2zdUn3e4TY8s9CsRRhhsVVLc",
  authDomain: "sintele-tech.firebaseapp.com",
  databaseURL: "https://sintele-tech-default-rtdb.firebaseio.com/",
  projectId: "sintele-tech",
  storageBucket: "sintele-tech.firebasestorage.app",
  messagingSenderId: "592273613215",
  appId: "1:592273613215:web:848d8f085c1fe9d3af9daa",
  measurementId: "G-JHVMP8F8SC",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const API_URL =
  "https://sintele-api.onrender.com/api";
const caminho =
  window.location.pathname;
const partes =
  caminho
    .split("/")
    .filter(Boolean);
const username =
  partes.length > 1 &&
  partes[partes.length - 1] === "sintele-web"
    ? "karla-bianca"
    : decodeURIComponent(
        partes[partes.length - 1] ||
        "karla-bianca"
      );
let perfil = null;
const contato = {
  nome: "",
  empresa: "",
  cargo: "",
  telefone: "",
  email: "",
  site: "",
  linkedin: "",
  instagram: "",
  github: "",
  youtube: "",
};
function getNomeRede(platform) {
  const nomes = {
    linkedin: "LinkedIn",
    instagram: "Instagram",
    github: "GitHub",
    youtube: "YouTube",
  };
  return nomes[platform] || platform;
}
function getIconeRede(platform) {
  const icones = {
    linkedin: "assets/icons/linkedin.png",
    instagram: "assets/icons/instagram.png",
    github: "assets/icons/github.png",
    youtube: "assets/icons/youtube.png",
  };
  return icones[platform] || "assets/icons/redes.png";
}
function renderizarRedesSociais(redesSociais) {
  const cardRedes =
    document.getElementById("cardRedes");
  const redesGrid =
    document.getElementById("redesGrid");
  if (!cardRedes || !redesGrid) {
    return;
  }
  redesGrid.innerHTML = "";
  cardRedes.style.display = "none";
  const redesAtivas =
    Array.isArray(redesSociais)
      ? redesSociais.filter((rede) => {
          if (
            !rede ||
            !rede.platform ||
            !rede.url
          ) {
            return false;
          }
          if (
            rede.is_active !== undefined &&
            rede.is_active !== true
          ) {
            return false;
          }
          return true;
        })
      : [];
  if (redesAtivas.length === 0) {
    return;
  }
  redesAtivas.forEach((rede) => {
    const link =
      document.createElement("a");
    link.href =
      rede.url.trim();
    link.target =
      "_blank";
    link.rel =
      "noopener noreferrer";
    link.className =
      "rede";
    const icone =
      document.createElement("div");
    icone.className =
      `rede-icone ${rede.platform}`;
    const imagem =
      document.createElement("img");
    imagem.src =
      getIconeRede(
        rede.platform
      );
    imagem.alt =
      getNomeRede(
        rede.platform
      );
    imagem.loading =
      "lazy";
    imagem.onerror =
      function () {
        this.style.display =
          "none";
      };
    icone.appendChild(
      imagem
    );
    const nome =
      document.createElement("span");
    nome.textContent =
      getNomeRede(
        rede.platform
      );
    link.appendChild(
      icone
    );
    link.appendChild(
      nome
    );
    redesGrid.appendChild(
      link
    );
  });
  cardRedes.style.display =
    "";
}
function configurarWhatsApp(numero) {
  const botaoWhatsApp =
    document.getElementById(
      "botaoWhatsApp"
    );
  if (!botaoWhatsApp) {
    return;
  }
  botaoWhatsApp.style.display =
    "none";
  if (!numero) {
    return;
  }
  let numeroLimpo =
    String(numero).replace(
      /\D/g,
      ""
    );
  if (!numeroLimpo) {
    return;
  }
  if (
    !numeroLimpo.startsWith("55")
  ) {
    numeroLimpo =
      `55${numeroLimpo}`;
  }
  botaoWhatsApp.href =
    `https://wa.me/${numeroLimpo}`;
  botaoWhatsApp.target =
    "_blank";
  botaoWhatsApp.rel =
    "noopener noreferrer";
  botaoWhatsApp.style.display =
    "";
}
async function carregarPerfil() {
  try {
    const response =
      await fetch(
        `${API_URL}/public/professional/${encodeURIComponent(username)}`,
        {
          method: "GET",
          headers: {
            Accept:
              "application/json",
          },
        }
      );
    let data = null;
    try {
      data =
        await response.json();
    } catch {
      data = null;
    }
    if (!response.ok) {
      throw new Error(
        data?.error ||
        "Erro ao carregar perfil."
      );
    }
    if (!data || !data.profile) {
      throw new Error(
        "Perfil não encontrado."
      );
    }
    perfil =
      data.profile;
    const contatos =
      data.contacts || {};
    const redesSociais =
      Array.isArray(
        data.socialLinks
      )
        ? data.socialLinks
        : [];
    renderizarRedesSociais(
      redesSociais
    );
    contato.linkedin = "";
    contato.instagram = "";
    contato.github = "";
    contato.youtube = "";
    redesSociais.forEach(
      (rede) => {
        if (
          !rede ||
          !rede.platform ||
          !rede.url
        ) {
          return;
        }
        if (
          Object.prototype.hasOwnProperty.call(
            contato,
            rede.platform
          )
        ) {
          contato[
            rede.platform
          ] =
            rede.url;
        }
      }
    );
    contato.nome =
      perfil.fullName || "";
    contato.empresa =
      perfil.companyName || "";
    contato.cargo =
      perfil.jobTitle ||
      perfil.profession ||
      "";
    contato.telefone =
      contatos.whatsapp ||
      contatos.phone ||
      "";
    contato.email =
      contatos.email ||
      "";
    const fotoPerfil =
      document.getElementById(
        "fotoPerfil"
      );
    const nomePerfil =
      document.getElementById(
        "nomePerfil"
      );
    const profissaoPerfil =
      document.getElementById(
        "profissaoPerfil"
      );
    const empresaPerfil =
      document.getElementById(
        "empresaPerfil"
      );
    const bioPerfil =
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
    if (
      fotoPerfil &&
      perfil.photoUrl
    ) {
      fotoPerfil.src =
        perfil.photoUrl;
      fotoPerfil.alt =
        perfil.fullName ||
        "Foto de perfil";
    }
    if (nomePerfil) {
      nomePerfil.textContent =
        perfil.fullName || "";
    }
    if (profissaoPerfil) {
      profissaoPerfil.textContent =
        perfil.jobTitle ||
        perfil.profession ||
        "";
    }
    if (empresaPerfil) {
      empresaPerfil.textContent =
        perfil.companyName || "";
    }
    if (bioPerfil) {
      bioPerfil.textContent =
        perfil.bio || "";
    }
    if (empresaInfo) {
      empresaInfo.textContent =
        perfil.companyName || "";
    }
    if (cargoInfo) {
      cargoInfo.textContent =
        perfil.jobTitle ||
        perfil.profession ||
        "";
    }
    if (localizacaoInfo) {
      const cidade =
        perfil.city || "";
      const estado =
        perfil.state || "";
      if (
        cidade &&
        estado
      ) {
        localizacaoInfo.textContent =
          `${cidade}, ${estado}`;
      } else {
        localizacaoInfo.textContent =
          cidade ||
          estado ||
          "";
      }
    }
    if (profissaoInfo) {
      profissaoInfo.textContent =
        perfil.profession || "";
    }
    configurarWhatsApp(
      contatos.whatsapp
    );
    document.title =
      perfil.fullName
        ? `${perfil.fullName} | SINTELE`
        : "SINTELE";
    return perfil;
  } catch (error) {
    console.error(
      "ERRO AO CARREGAR PERFIL:",
      error
    );
    const nomePerfil =
      document.getElementById(
        "nomePerfil"
      );
    const bioPerfil =
      document.getElementById(
        "bioPerfil"
      );
    if (nomePerfil) {
      nomePerfil.textContent =
        "Perfil não encontrado";
    }
    if (bioPerfil) {
      bioPerfil.textContent =
        "Não foi possível carregar este perfil.";
    }
    return null;
  }
}
const visualizacoesRef =
  ref(
    database,
    "sintele/visualizacoes"
  );
const jaVisitou =
  localStorage.getItem(
    "sintele_visitou"
  );
if (!jaVisitou) {
  runTransaction(
    visualizacoesRef,
    (valorAtual) => {
      return (
        (valorAtual || 0) + 1
      );
    }
  );
  localStorage.setItem(
    "sintele_visitou",
    "true"
  );
}
const contadorVisualizacoes =
  document.getElementById(
    "contadorVisualizacoes"
  );
if (contadorVisualizacoes) {
  onValue(
    visualizacoesRef,
    (snapshot) => {
      const quantidade =
        snapshot.val() || 0;
      contadorVisualizacoes.textContent =
        `👁 ${quantidade} visualizações`;
    }
  );
}
const botaoSalvarContato =
  document.getElementById(
    "salvarContato"
  );
if (botaoSalvarContato) {
  botaoSalvarContato.addEventListener(
    "click",
    function () {
      const vCard =
`BEGIN:VCARD
VERSION:3.0
FN:${contato.nome}
ORG:${contato.empresa}
TITLE:${contato.cargo}
TEL;TYPE=CELL:${contato.telefone}
EMAIL:${contato.email}
URL:${contato.site}
X-SOCIALPROFILE;TYPE=linkedin:${contato.linkedin}
X-SOCIALPROFILE;TYPE=instagram:${contato.instagram}
X-SOCIALPROFILE;TYPE=github:${contato.github}
X-SOCIALPROFILE;TYPE=youtube:${contato.youtube}
END:VCARD`;
      const arquivo =
        new Blob(
          [vCard],
          {
            type:
              "text/vcard;charset=utf-8",
          }
        );
      const url =
        URL.createObjectURL(
          arquivo
        );
      const link =
        document.createElement(
          "a"
        );
      link.href =
        url;
      const nomeArquivo =
        contato.nome
          .trim()
          .replace(
            /\s+/g,
            "-"
          )
          .replace(
            /[^a-zA-Z0-9À-ÿ-]/g,
            ""
          );
      link.download =
        `${
          nomeArquivo ||
          "contato"
        }.vcf`;
      document.body.appendChild(
        link
      );
      link.click();
      document.body.removeChild(
        link
      );
      URL.revokeObjectURL(
        url
      );
    }
  );
}
const botoes =
  document.querySelectorAll(
    ".botao"
  );
botoes.forEach(
  function (botao) {
    botao.addEventListener(
      "mousedown",
      function () {
        botao.style.transform =
          "scale(0.97)";
      }
    );
    botao.addEventListener(
      "mouseup",
      function () {
        botao.style.transform =
          "";
      }
    );
    botao.addEventListener(
      "mouseleave",
      function () {
        botao.style.transform =
          "";
      }
    );
  }
);
console.log(
  `SINTELE — Carregando perfil: ${username}`
);
carregarPerfil();