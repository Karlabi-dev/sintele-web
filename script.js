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
  databaseURL: "https://sintele-tech-default-rtdb.firebaseio.com",
  projectId: "sintele-tech",
  storageBucket: "sintele-tech.firebasestorage.app",
  messagingSenderId: "592273613215",
  appId: "1:592273613215:web:848d8f085c1fe9d3af9daa",
  measurementId: "G-JHVMP8F8SC",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const contato = {
  nome: "Karla Bianca",
  empresa: "SINTELE Tech",
  cargo: "Desenvolvedora Full Stack",
  telefone: "+5585999999999",
  email: "seuemail@email.com",
  site: "https://karlabi-dev.github.io/sintele-web/",
  linkedin: "https://www.linkedin.com/in/karla-bianca-563734355/",
  instagram: "https://www.instagram.com/Karla.bi_/",
  github: "https://github.com/karlabi-dev",
};

const visualizacoesRef = ref(database, "sintele/visualizacoes");

const jaVitou = 
localStorage.getItem("sintele_visitou");
if (!jaVitou) {
    runTransaction(visualizacoesRef, (valorAtual) => {
    return (valorAtual || 0) + 1;
    });

    localStorage.setItem("sintele_visitou", "true");
}

const contadorVisualizacoes = document.getElementById("contadorVisualizacoes");

if (contadorVisualizacoes) {
  onValue(visualizacoesRef, (snapshot) => {
    const quantidade = snapshot.val() || 0;
    contadorVisualizacoes.textContent = `👁 ${quantidade} visualizações`;
  });
}

const botaoSalvarContato = document.getElementById("salvarContato");

if (botaoSalvarContato) {
  botaoSalvarContato.addEventListener("click", function () {
    const vCard = `BEGIN:VCARD
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
END:VCARD`;

    const arquivo = new Blob([vCard], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Karla-Bianca.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

const linksEmConstrucao = document.querySelectorAll('a[href="#"]');

linksEmConstrucao.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    alert("Esta área estará disponível em uma próxima versão do SINTELE.");
  });
});
const botoes = document.querySelectorAll(".botao");

botoes.forEach(function (botao) {
  botao.addEventListener("mousedown", function () {
    botao.style.transform = "scale(0.97)";
  });

  botao.addEventListener("mouseup", function () {
    botao.style.transform = "";
  });

  botao.addEventListener("mouseleave", function () {
    botao.style.transform = "";
  });
});

console.log("SINTELE — Perfil profissional carregado com sucesso.");