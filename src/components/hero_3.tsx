/**
 * Tipos de preenchimento para as props do Componente Hero_3.
 */
interface Hero3Description {
    tituloParte1: string;
    tituloDestaque: string;
    descricao1: string;
    descricao2: string;
}

/**
 * Componente sobre Metodologia (o 'Como Funciona') utilizado a sessão três.
 * 
 * O que ele faz:
 * Gera uma grande área que exibe os textos explicativos na esquerda e uma arte gerada puramente
 * com código CSS (matrizes de quadrados) animada na direita, para evitar carregamento pesado de imagens ("assets").
 * 
 * O que está sendo utilizado:
 * - Renderização via HTML (dangerouslySetInnerHTML) baseada no texto do `<p>`.
 * - Tailwind CSS para a grade CSS complexa (usando classes como `grid`, `grid-cols-3`, `translate-y`).
 * - Utilitários de Gradientes (como `bg-gradient-to-tr`, `from-blue-200`) e Desfoque (como `blur-3xl`).
 */
export function Hero_3({ tituloParte1, tituloDestaque, descricao1, descricao2 }: Hero3Description) {
    return (
        <div className="bg-zinc-50 border-y border-zinc-300 relative overflow-hidden">

            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-6xl mx-auto py-16 px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-800 tracking-tight text-center md:text-left">
                            {tituloParte1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">{tituloDestaque}</span>
                        </h2>

                        <div className="space-y-4 text-lg text-zinc-900 text-justify">
                            <p dangerouslySetInnerHTML={{ __html: descricao1 }}></p>
                            <p dangerouslySetInnerHTML={{ __html: descricao2 }}></p>
                        </div>
                    </div>


                    <div className="flex-1 flex justify-center w-full">
                        <div className="relative w-full max-w-sm aspect-square">

                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-emerald-200 rounded-2xl transform rotate-3 scale-105 shadow-lg transition-transform hover:rotate-6 duration-500"></div>


                            <div className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-zinc-200 flex items-center justify-center overflow-hidden group">


                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>


                                <div className="relative z-10 grid grid-cols-3 gap-2 p-6 transform -rotate-12 scale-110 group-hover:scale-125 transition-transform duration-700">

                                    <div className="w-14 h-14 bg-zinc-200 border border-zinc-300 rounded-lg shadow-sm"></div>
                                    <div className="w-14 h-14 bg-zinc-300 border border-zinc-400 rounded-lg shadow-sm transform translate-y-4"></div>
                                    <div className="w-14 h-14 bg-zinc-200 border border-zinc-300 rounded-lg shadow-sm"></div>

                                    <div className="w-14 h-14 bg-zinc-300 border border-zinc-400 rounded-lg shadow-sm transform -translate-y-2"></div>

                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-emerald-400 border border-emerald-300 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.5)] transform scale-110 animate-pulse"></div>
                                    <div className="w-14 h-14 bg-zinc-300 border border-zinc-400 rounded-lg shadow-sm transform translate-y-6"></div>

                                    <div className="w-14 h-14 bg-zinc-200 border border-zinc-300 rounded-lg shadow-sm transform translate-y-2"></div>
                                    <div className="w-14 h-14 bg-zinc-300 border border-zinc-400 rounded-lg shadow-sm"></div>
                                    <div className="w-14 h-14 bg-zinc-200 border border-zinc-300 rounded-lg shadow-sm transform -translate-y-4"></div>
                                </div>


                                <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
