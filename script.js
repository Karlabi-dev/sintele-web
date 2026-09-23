const contato = {
    nome: "Karla Bianca",
    empresa: "SINTELE Tech",
    cargo: "Desenvolvedora Full Stack",
    telefone: "+558592455842",
    email: "karlabianca2319@gmail.com",
    site: "https://sintele.app/karlabianca",
    linkedin: "https://www.linkedin.com/in/karla-bianca-563734355/",
    instagram: "https://www.instagram.com/Karla.bi_/",
    github: "https://github.com/karlabi-dev"
};

const botaoSalvarContato =
    document.getElementById("salvarContato");
if (botaoSalvarContato) {

    botaoSalvarContato.addEventListener("click", function () {
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
END:VCARD`;

        const arquivo =
            new Blob(
                [vCard],
                { type: "text/vcard;charset=utf-8" }
            );
        const url =
            URL.createObjectURL(arquivo);

        const link =
            document.createElement("a");

        link.href = url;
        link.download = "Karla-Bianca.vcf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

    });

}

const linksEmConstrucao =
    document.querySelectorAll('a[href="#"]');
linksEmConstrucao.forEach(function (link) {

    link.addEventListener("click", function (event) {
        event.preventDefault();
        alert(
            "Esta área estará disponível em uma próxima versão do SINTELE."
        );
    });

});

const botoes =
    document.querySelectorAll(".botao");
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

console.log(
    "SINTELE — Perfil profissional carregado com sucesso."
);