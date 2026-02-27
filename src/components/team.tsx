//Definições das estruturas de dados

interface RedeSocial {
    plataforma: "Github" | "Linkedin" | "Instagram";
    url: string;
}

interface Membro {
    nome: string;
    foto: string;
    alt: string;
    redes: RedeSocial[];
}

interface CardMembroProps {
    dados: Membro;
}

//Definições das estruturas do site

export function CardMembro({dados}:CardMembroProps) {
    <div>
        <img src = {dados.foto} alt = {dados.alt} />
        <h3> {dados.nome} </h3>
        {/* aqui vai as redes sociais depois */}
    </div>
}