import { HeaderLayout } from './components/header';
import { ContentHeader } from './Texts/header_description';

function App() {

  return (

    //navbar

    <main className="min-h-screen bg-gray-50 py-10">
      <HeaderLayout 
        titulo={ContentHeader.sobre.titulo} 
        texto={ContentHeader.sobre.descricao} 
      />
    </main>

    //footer

  )
}

export default App
