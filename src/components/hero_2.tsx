/**
 * Definição dos tipos dos textos/imagens consumidos pelo componente de Hero_2.
 * Evita erros indicando quais props são obrigatórias na hora de implementar a tela.
 */
interface HeroDescription {
    title_1: string;
    image_1: string;
    alt_1: string;
    text_1: string;
    title_2: string;
    image_2: string;
    alt_2: string;
    text_2: string;
}

/**
 * Componente que mostra duas seções alternadas de "Imagem - Texto" e "Texto - Imagem" sobre o projeto.
 * 
 * O que ele faz:
 * Usado para detalhar com imagens o processo da reconstrução volumétrica (o porquê de tirar as fotos, limpar, etc).
 * Ele exibe duas fileiras. A primeira exibe imagem na direita. A segunda exibe a imagem na esquerda.
 * 
 * O que está sendo utilizado:
 * - Tailwind com Media Queries (`md:flex-row`, `flex-col-reverse`): Ferramenta utilizada para garantir a "Responsividade", 
 *   ou seja, em monitores a foto e o texto ficam lado a lado, enquanto em celulares (resolução menor), as fotos
 *   sobem e o texto desce, adaptando ao usuário mobile automaticamente.
 * - Utilização do CSS `object-cover` e de uma caixa (`div`) com `overflow-hidden` nativos no HTML para cortar o centro da foto importada sem distorcê-la.
 */
export function Hero_2({ title_1, image_1, alt_1, text_1, title_2, image_2, alt_2, text_2 }: HeroDescription) {
    return (
        <div className="bg-zinc-200 border-y border-zinc-300">
            <div id="about" className="max-w-6xl mx-auto space-y-12 py-12">

                <div className="flex items-center justify-between p-4 gap-8 flex-col md:flex-row">
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-zinc-800 mb-4 text-center">{title_1}</h3>
                        <p className="text-lg text-zinc-900 text-justify">
                            {text_1}
                        </p>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="w-72 h-72 md:w-96 md:h-96 rounded-xl overflow-hidden flex items-center justify-center bg-zinc-200 relative shadow-md">
                            <img src={image_1} alt={alt_1}
                                className="absolute w-full h-full object-cover scale-[1.35]" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 gap-8 flex-col-reverse md:flex-row">
                    <div className="flex-1 flex justify-center">
                        <div className="w-72 h-72 md:w-96 md:h-96 rounded-xl overflow-hidden flex items-center justify-center bg-zinc-200 relative shadow-md">
                            <img src={image_2} alt={alt_2}
                                className="absolute w-full h-full object-cover scale-[1.35]" />
                        </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-zinc-800 mb-4 text-center">{title_2}</h3>
                        <p className="text-lg text-zinc-900 text-justify">
                            {text_2}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}