import { Header } from './components/header'; 

import { Hero_1 } from './components/hero_1';
import { ContentHero_1 } from './contents/hero_1_description';
//
import { Hero_2 } from "./components/hero_2";
import { ContentHero_2 } from "./contents/hero_2_description";
//
import { Team } from './components/team';
import { ContentTeam } from './contents/team_description';

function App() {

  return (

    //navbar

    <main className="min-h-screen bg-zinc-50">
      
      <Header />

      <Hero_1 
        titulo={ContentHero_1.sobre.titulo} 
        texto={ContentHero_1.sobre.descricao} 
      />
      <Hero_2
        image_1={ContentHero_2.upper.image_1}
        alt_1={ContentHero_2.upper.alt_1}
        text_1={ContentHero_2.upper.text_1}
        image_2={ContentHero_2.lower.image_2}
        alt_2={ContentHero_2.lower.alt_2}
        text_2={ContentHero_2.lower.text_2}
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
