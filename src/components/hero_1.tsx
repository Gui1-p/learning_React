interface Hero_1_Description {
  titulo: string;
  descricao1: string;
  descricao2: string;
}

/**
 * Componente principal (Hero) que atua como banner inicial na tela principal ("Home").
 * 
 * O que ele faz:
 * Gera um campo gigantesco ocupando 80% da altura da tela (`min-h-[80vh]`), contendo o título do site e os
 * primeiros parágrafos informativos sobre o projeto VISION.
 * Ele aplica "bolhas" animadas no cenário, com brilhos verdes e azuis que aumentam e diminuem (`animate-pulse`).
 * 
 * O que está sendo utilizado:
 * - A interface Typescript `Hero_1_Description` para tipar estaticamente os textos (titulo, descricao) trazidos do conteúdo para evitar bugs.
 * - Desestruturação de propriedades (`{ titulo, descricao1, descricao2 }`) do React para separar e consumir dados puros.
 * - O utilitário do React `dangerouslySetInnerHTML`: Uma funcionalidade para forçar a renderização de strings como HTML legítimo em vez de injetar textos limpos
 *   Isso ocorre pois o texto `descricao` carregado do arquivo de configs contem formatações de `<strong/>`. 
 * - Tailwind CSS: A estilização dos gradientes radiais do fundo, os textos cortados como máscara e o design dos borrões (`blur`).
 */
export function Hero_1({ titulo, descricao1, descricao2 }: Hero_1_Description) {
  return (
    <div id="home"
      className="relative flex min-h-[80vh] flex-col items-center justify-center bg-zinc-50 bg-[radial-gradient(circle,#e2e8f0_1px,transparent_1px)] bg-[size:20px_20px] px-4 text-center border-y border-zinc-300 overflow-hidden">

      <div
        className="absolute top-1/4 left-[15%] w-72 h-72 bg-blue-400/20 rounded-full blur-[80px] pointer-events-none animate-pulse">
      </div>
      <div className="absolute bottom-1/4 right-[15%] w-72 h-72 bg-emerald-400/20 rounded-full blur-[80px] pointer-events-none animate-pulse"
        style={{ animationDelay: "1.5s" }}></div>

      <div className="z-10 max-w-4xl flex flex-col items-center relative">
        <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-zinc-900 md:text-7xl">
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 pb-2">{titulo}</span>
        </h1>
        <div className="mb-10 text-lg text-zinc-600 md:text-xl text-justify max-w-3xl leading-relaxed space-y-4">
          <p dangerouslySetInnerHTML={{ __html: descricao1 }}></p>
          <p dangerouslySetInnerHTML={{ __html: descricao2 }}></p>
        </div>
      </div>
    </div>
  );
}