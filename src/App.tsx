import { Navbar } from './components/header';
import { VolvizViewer } from './components/VolvizViewer';

import { Hero_1 } from './components/hero_1';
import { ContentHero_1 } from './contents/hero_1_description';
//
import { Hero_2 } from "./components/hero_2";
import { ContentHero_2 } from "./contents/hero_2_description";

import { Hero_3 } from "./components/hero_3";
import { ContentHero_3 } from "./contents/hero_3_description";
//
import { Team } from './components/team';
import { ContentTeam } from './contents/team_description';
import { Footer } from './components/footer';


/**
 * Componente Principal do Sistema Web (App).
 * 
 * O que ele faz:
 * O arquivo `App.tsx` atua como a espinha dorsal de todo o design do React. 
 * A função abaixo agrupa todos os componentes soltos que estão dentro da pasta `/components` 
 * e importa todos os textos vindos da pasta `/contents` e os posiciona do topo até o rodapé em ordem correta,
 * mesclando tudo na tag `<main>` para ser exportada.
 * 
 * O que está sendo utilizado:
 * - A tag principal semântica do HTML5 (`<main>`) que simboliza que todo esse layout é o conteúdo vital do website.
 * - Flexbox Vertical (`flex-col`) do Tailwind CSS para que o Navbar, os Heros e o Rodapé fiquem empilhados.
 * - Ele repassa os textos desestruturados (Ex: `ContentHero_1.sobre.titulo`) para os filhos (`Hero_1`) em formas de Props (parâmetros do React).
 * - Uma aba "Hardcoded" para o componente 3D (`VolvizViewer`) que implementa gradientes coloridos `bg-gradient-to-r` nas tags de títulos.
 */
function App() {

  return (


    <main className="min-h-screen flex flex-col bg-zinc-300">
      <Navbar />

      <Hero_1
        titulo={ContentHero_1.sobre.titulo}
        descricao1={ContentHero_1.sobre.descricao1}
        descricao2={ContentHero_1.sobre.descricao2}
      />

      <section className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center">
         <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-8 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
           Visualizador Volumétrico
         </h2>
         <p className="text-zinc-600 mb-8 text-center max-w-3xl leading-relaxed text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
           Abaixo você pode interagir com o modelo 3D renderizado a partir das fotografias fatiadas. Utilize os controles para filtrar as camadas por máscara de cor (Hue) simulando o Volviz. Explore usando o mouse para rotacionar.
         </p>
         <div className="w-full relative shadow-2xl rounded-2xl overflow-hidden border border-zinc-200" style={{ zIndex: 10 }}>
           <VolvizViewer />
         </div>
      </section>

      <Hero_2
        title_1={ContentHero_2.upper.title_1}
        image_1={ContentHero_2.upper.image_1}
        alt_1={ContentHero_2.upper.alt_1}
        text_1={ContentHero_2.upper.text_1}
        title_2={ContentHero_2.lower.title_2}
        image_2={ContentHero_2.lower.image_2}
        alt_2={ContentHero_2.lower.alt_2}
        text_2={ContentHero_2.lower.text_2}
      />

      <Hero_3
        tituloParte1={ContentHero_3.tituloParte1}
        tituloDestaque={ContentHero_3.tituloDestaque}
        descricao1={ContentHero_3.descricao1}
        descricao2={ContentHero_3.descricao2}
      />

      <Team
        m1={ContentTeam.membro1}
        m2={ContentTeam.membro2}
        m3={ContentTeam.membro3}
        m4={ContentTeam.membro4}
        m5={ContentTeam.membro5}
        m6={ContentTeam.membro6}
      />

      <Footer />

    </main>
  )
}

export default App
