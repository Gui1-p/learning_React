import { HeaderLayout } from './components/header';
import { ContentHeader } from './contents/header_description';
//
import { hero_1 as Hero_1 } from "./components/hero_1";
import { ContentHero } from "./contents/hero_1_description";
//
import { Team } from './components/team';
import { ContentTeam } from './contents/team_description';

function App() {

  return (

    //navbar

    <main className="min-h-screen bg-gray-500">
      <HeaderLayout 
        titulo={ContentHeader.sobre.titulo} 
        texto={ContentHeader.sobre.descricao} 
      />
      <Hero_1
        image_1={ContentHero.upper.image_1}
        alt_1={ContentHero.upper.alt_1}
        text_1={ContentHero.upper.text_1}
        image_2={ContentHero.lower.image_2}
        alt_2={ContentHero.lower.alt_2}
        text_2={ContentHero.lower.text_2}
      />
      <Team 
        m1={ContentTeam.membro1} 
        m2={ContentTeam.membro2} 
        //m3={ContentTeam.membro3} 
        //m4={ContentTeam.membro4} 
        //m5={ContentTeam.membro5} 
      />
      

    </main>

    //footer

  )
}

export default App
