import gitHubIcon from '../assets/github.svg';
import lattesIcon from '../assets/lattes.svg';
import linkedinIcon from '../assets/linkedin.svg';

interface MembroProps {
  nome: string;
  funcao?: string;
  foto: string;
  alt: string;
  git: string;
  lattes: string;
  linkedin: string;
}

/**
 * Sub-componente (CardMembro) para manter a organização do código.
 * 
 * O que ele faz:
 * Gera um "cartão" individual (`Card`) de cada pessoa da equipe. Este card contém a foto, 
 * o nome, a função no projeto e três ícones (GitHub, Lattes, LinkedIn) atuando como links externos.
 * 
 * O que está sendo utilizado:
 * - Renderização Condicional no React (`{funcao && ...}`): Se houver função declarada, a exibe; do contrário, oculta sem quebrar.
 * - Desestruturação do Props `{ nome, ... }` via type `MembroProps` (Typescript)
 * - Importação explícitas dos SVGs de fora do código como `githubIcon`.
 */
function CardMembro({ nome, funcao, foto, alt, git, lattes, linkedin }: MembroProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white border border-zinc-300 rounded-2xl shadow-sm w-64">
      <img src={foto} alt={alt} className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-zinc-800" />

      <h3 className="text-xl font-bold text-zinc-800 mb-1 text-center">{nome}</h3>
      {funcao && <h2 className="text-lg text-zinc-700 mb-4 text-center">{funcao}</h2>}

      <div className="flex gap-4 items-center">
        <a href={git} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:scale-110 transition-transform">
          <img src={gitHubIcon} alt="GitHub" className="w-6 h-6" />
        </a>
        <a href={lattes} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:scale-110 transition-transform">
          <img src={lattesIcon} alt="Lattes" className="w-6 h-6" />
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:scale-110 transition-transform">
          <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
        </a>
      </div>

    </div>
  );
}

/**
 * Componente Principal da Equipe.
 * 
 * O que ele faz:
 * Cria um loop estático (instanciamento) do sub-componente <CardMembro> criado acima.
 * Ele recebe através das suas propriedades (`props`) todos os 6 membros vindos do arquivo `App.tsx` (e `team_description.ts`)
 * e os descompacta usando o operador Espalhamento (Spread Operator `...`).
 * 
 * O que está sendo utilizado:
 * - Operador Spread de Javascript (`{...props.m1}`): Passa pra dentro do componente `<CardMembro/>` todos os itens
 *   (nome, função, git, etc) de uma só vez, evitando ter que digitar `<CardMembro nome={props.m1.nome} ... />`.
 * - Estilização Tailwind `flex-wrap`: Garante que, se a tela não couber as 6 fotos em uma linha, elas caiam pra próxima.
 */
export function Team(props: any) {
  return (
    <section id="team" className="w-full py-12 bg-zinc-100 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-10 text-zinc-800">Nossa Equipe</h2>
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl px-4 mx-auto">
        <CardMembro {...props.m1} />
        <CardMembro {...props.m2} />
        <CardMembro {...props.m3} />
        <CardMembro {...props.m4} />
        <CardMembro {...props.m5} />
        <CardMembro {...props.m6} />
      </div>
    </section>
  );
}