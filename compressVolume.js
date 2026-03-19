import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = path.resolve('../Fotografias Tratadas e Recortadas');
const destDir = path.resolve('./public/volviz_images/');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

/**
 * Função principal para processar e comprimir imagens.
 * 
 * O que esta função faz:
 * Lê as imagens em formato PNG no diretório de origem ('../Fotografias Tratadas e Recortadas'),
 * altera as dimensões e converte o formato de arquivo de cada imagem para WebP a fim de reduzir seu tamanho, 
 * e salva os arquivos finais no diretório de destino renomeando-os em uma sequência numérica (ex: slice_001.webp). 
 * Isso torna o arquivo mais leve para as texturas 3D no VolvizViewer e mais fácil para o laço de exibição.
 * 
 * Bibliotecas que estão sendo utilizadas nesta função:
 * - `fs` (Node.js): Para interagir com o sistema de arquivos (ler diretórios com readdirSync, checar pastas, etc.).
 * - `path` (Node.js): Para construir e resolver os caminhos absolutos dos diretórios e arquivos.
 * - `sharp` (NPM package): Uma biblioteca de alto desempenho utilizada para processar as imagens, alterar dimensões (resize) e converter os formatos (.toFile e .webp).
 */
async function run() {
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.png'));
  files.sort();

  console.log(`Processing ${files.length} images...`);
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const srcPath = path.join(srcDir, file);
    // Use sequential numbering to be easier to load in Threejs
    const padIndex = i.toString().padStart(3, '0');
    const destPath = path.join(destDir, `slice_${padIndex}.webp`);
    
    // Resize to 512x512 max to preserve quality but keep it light
    await sharp(srcPath)
      .resize(512, 512, { fit: 'inside' })
      .webp({ quality: 80, effort: 4 })
      .toFile(destPath);
      
    if (i % 50 === 0) {
      console.log(`Processed ${i} / ${files.length}`);
    }
  }
  console.log('Done mapping volume to WebP!');
}

run().catch(err => console.error(err));
