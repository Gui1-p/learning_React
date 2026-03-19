import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "../index.css"

/**
 * Ponto de Entrada da Aplicação (Entrypoint).
 * 
 * O que ele faz:
 * É o primeiro código Javascript executado nas navegadores quando o site é aberto (criado pelo framework Vite).
 * Busca no `index.html` estático uma caixa `<div>` invisível cujo ID é "root" e projeta dentro da tela virtual do React nela.
 * 
 * O que está sendo utilizado:
 * - `createRoot` provido pelo React versão 18 na qual inicializa todos os processamentos que envolvem o arquivo inteiro do `<App />` global.
 * - `<StrictMode>` (Strict Mode): Um invólucro (wrapper) do modo de desenvolvimento (sumirá ao gerar Bundle para produção `npm run build`) 
 *   que detecta possíveis warnings e duplica as renderizações do browser pra expor mais bugs na sua cara, forçando boas práticas no código.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
