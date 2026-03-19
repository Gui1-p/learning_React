import { ContentNavbar } from '../contents/header_description';


/**
 * Componente Navbar do cabeçalho da página.
 * 
 * O que ele faz:
 * Monta o menu superior (barra de navegação móvel) que fica colado (sticky) no alto 
 * da tela. Ele percorre a lista de links importada do arquivo de conteúdos `header_description.ts`,
 * gerando um hiperlink (ancora) para cada seção do site ("sobre", "contato", etc).
 * 
 * O que está sendo utilizado:
 * - A prop `map` nativa do JS para criar múltiplos `<li>` html dinâmicos baseados no Array de `ContentNavbar.links`.
 * - Estilos Tailwind CSS para estruturação responsiva (flex, mx-auto), 
 * - O componente personalizado `<LogoVision />` no canto esquerdo.
 */
export function Navbar() {
  return (
    // 'sticky top-0' mantém a barra fixa no topo enquanto você desce a página
    // 'z-50' garante que ela fique por cima de todos os outros elementos
    <nav className="sticky top-0 z-50 w-full bg-zinc-500 backdrop-blur-md border-b border-zinc-200">
      <div className="mx-auto px-6 h-14 flex items-center justify-between">

        {/* Lado Esquerdo: Logo */}
        <div className="text-xl font-bold text-zinc-900 tracking-tight">
          <LogoVision />
        </div>

        {/* Centro: Links de Navegação */}
        <ul className="flex gap-8">
          {ContentNavbar.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-zinc-50 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
}


/**
 * Componente do Logo VISION estilizado.
 * 
 * O que ele faz:
 * Exibe a palavra VISION estilizada seguida por um traçado com um pequeno efeito brilhante animado 
 * simulando um flash que passa pela linha abaixo do texto (`animate-shimmer`).
 * 
 * O que está sendo utilizado:
 * - Tailwind CSS para a tipografia (text-3xl tracking-widest) além de gerar os gradients de fundo via classes.
 */
export const LogoVision = () => {
  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="flex items-center font-bold tracking-widest text-zinc-50 text-3xl">
        VISION
      </div>

      <div className="w-full h-px bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#32FF7E] to-transparent w-1/2 animate-shimmer"></div>
      </div>
    </div>
  );
};