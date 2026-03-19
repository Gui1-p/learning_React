import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
varying vec3 vOrigin;
varying vec3 vDirection;
void main() {
    vOrigin = vec3(inverse(modelMatrix) * vec4(cameraPosition, 1.0));
    vDirection = position - vOrigin;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
precision highp sampler3D;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 vOrigin;
varying vec3 vDirection;

uniform sampler3D uTexture;
uniform float uSteps;
uniform float uThreshold;
uniform float uHueMin;
uniform float uHueMax;
uniform float uCrop;
uniform float uOpacity;

// Noise for jittering (reduces woodgrain banding)
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Hue mask helpers
vec3 rgbToHsv(vec3 c) {
    float cmax = max(c.r, max(c.g, c.b));
    float cmin = min(c.r, min(c.g, c.b));
    float d    = cmax - cmin;
    float h    = 0.0;
    if (d > 1e-5) {
        if      (cmax == c.r) h = mod((c.g - c.b) / d, 6.0);
        else if (cmax == c.g) h =     (c.b - c.r) / d + 2.0;
        else                  h =     (c.r - c.g) / d + 4.0;
        h /= 6.0;
        if (h < 0.0) h += 1.0;
    }
    float s = (cmax < 1e-5) ? 0.0 : d / cmax;
    return vec3(h * 360.0, s, cmax);
}

bool hueInRange(float h, float hMin, float hMax) {
    return (hMin <= hMax) ? (h >= hMin && h <= hMax)
                          : (h >= hMin || h <= hMax);
}

vec2 hitBox(vec3 orig, vec3 dir) {
    vec3 box_min = vec3(-uCrop, -uCrop, -0.5);
    vec3 box_max = vec3(uCrop, uCrop, 0.5);
    vec3 inv_dir = 1.0 / dir;
    vec3 tmin_tmp = (box_min - orig) * inv_dir;
    vec3 tmax_tmp = (box_max - orig) * inv_dir;
    vec3 tmin = min(tmin_tmp, tmax_tmp);
    vec3 tmax = max(tmin_tmp, tmax_tmp);
    float t0 = max(tmin.x, max(tmin.y, tmin.z));
    float t1 = min(tmax.x, min(tmax.y, tmax.z));
    return vec2(t0, t1);
}

void main() {
    vec3 rayDir = normalize(vDirection);
    vec2 bounds = hitBox(vOrigin, rayDir);

    if (bounds.x > bounds.y) discard;
    bounds.x = max(bounds.x, 0.0);

    vec3 p = vOrigin + bounds.x * rayDir;
    vec3 inc = 1.0 / abs(rayDir);
    float delta = min(inc.x, min(inc.y, inc.z)) / uSteps;
    vec3 step = rayDir * delta;

    // Ray Start Jitter to remove banding artifacts
    float jitter = hash(gl_FragCoord.xy) * delta;
    float t = bounds.x + jitter;
    
    vec4 ac = vec4(0.0);
    
    // Better volume rendering with front-to-back compositing
    for (int i = 0; i < 1000; i++) {
        // Dynamic step break to support variable uSteps
        if (float(i) >= uSteps) break;
        if (t > bounds.y || ac.a >= 0.98) break;

        // map p from [-0.5, 0.5] to [0.0, 1.0]
        vec3 samplePos = p + vec3(0.5);
        vec4 color = texture(uTexture, samplePos);
        
        vec3 hsv = rgbToHsv(color.rgb);
        // Volviz logic: precise hue matching + value threshold
        if (hueInRange(hsv.x, uHueMin, uHueMax) && hsv.z > uThreshold) {
            
            // Smoothly fade out edges near the threshold to prevent blocky artifacts
            float smoothAlpha = smoothstep(uThreshold, uThreshold + 0.1, hsv.z);
            float alpha = uOpacity * smoothAlpha;
            
            // Front-to-back blending with pre-multiplied alpha color
            vec4 src = vec4(color.rgb * alpha, alpha);
            ac += (1.0 - ac.a) * src;
        }

        p += step;
        t += delta;
    }

    if (ac.a <= 0.01) discard;
    
    gl_FragColor = ac;
}
`;


/**
 * Componente que renderiza o cubo (boxGeometry) 3D na tela (dentro do Canvas do React Three Fiber).
 * 
 * O que ele faz:
 * Ao invés de usar uma textura simples num cubo padrão 3D, utilizamos um material personalizado (`shaderMaterial`)
 * que contém o código do Shaders (escrito em GLSL), enviando os parâmetros interativos do usuário até ele.
 * A principal mágica do processamento de Raio (Raymarching) da visualização ocorre dentro da GPU.
 * 
 * O que está sendo utilizado:
 * - `useRef`: Um "Hook" do React para guardar uma referência local da material do shader, o que permite atualizar parâmetros.
 * - `useFrame`: Um "Hook" do `@react-three/fiber` que é executado a cada frame renderizado da tela, permitindo atualizar em tempo real
 *   valores que fluem do estado (state) nas props (hue, threshold) direto pra GPU (`materialRef.current.uniforms. ...`).
 * - `useMemo`: Para salvar na memória do react os valores padrões do Material pra evitar que seja recriado se os inputs de React não mudarem.
 * - `THREE.ShaderMaterial` (via ThreeJS): O material bruto utilizado para ligar nossos scripts customizados GLSL no volume 3D.
 * - `<mesh>`, `<boxGeometry>`, `<shaderMaterial>`: Elementos nativos do `@react-three/fiber` que encapsulam funções originárias do WebGL/ThreeJS.
 */
const VolumeBox = ({ texture3D, hueMin, hueMax, threshold, crop, opacity, steps }: any) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(() => {
    if (materialRef.current) {
        materialRef.current.uniforms.uHueMin.value = hueMin;
        materialRef.current.uniforms.uHueMax.value = hueMax;
        materialRef.current.uniforms.uThreshold.value = threshold;
        materialRef.current.uniforms.uCrop.value = crop;
        materialRef.current.uniforms.uOpacity.value = opacity;
        materialRef.current.uniforms.uSteps.value = steps;
    }
  });

  const uniforms = useMemo(() => ({
    uTexture: { value: texture3D },
    uSteps: { value: steps }, 
    uThreshold: { value: threshold },
    uHueMin: { value: hueMin },
    uHueMax: { value: hueMax },
    uCrop: { value: crop },
    uOpacity: { value: opacity }
  }), [texture3D]);

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
        transparent={true}
      />
    </mesh>
  );
};

/**
 * Componente principal do visualizador volumétrico: `VolvizViewer`
 * 
 * O que ele faz:
 * É o coração da ferramenta. Ele constrói a Interface Gráfica que inclui os "slidres" (barras de controle)
 * que definem os tons de cores (Hue) e o limite de transparência (Threshold).
 * Além disso, o componente baixa todas as fatias fatiadas 2D (imagens no /public/) e as junta em um array de 3 Dimensões.
 * 
 * O que está sendo utilizado:
 * - `useState`: Um "Hook" do React para manter o estado atual das variáveis na memória. (Ex: o HueMin selecionado pelo mouse).
 * - `useEffect`: Um "Hook" do React invocado sempre que a página é acessada na tela. Onde roda a lógica de download principal.
 * - `<Canvas>` e `<OrbitControls>`: Componentes de pacote externo `@react-three/fiber`/`@react-three/drei` que 
 *   disponibilizam um container para gráficos WebGL e gerenciam o movimento do mouse na tela para girar a vista e das o zoom.
 */
export const VolvizViewer: React.FC = () => {
    const [texture3D, setTexture3D] = useState<THREE.Data3DTexture | null>(null);
    const [progress, setProgress] = useState(0);

    const [hueMin, setHueMin] = useState(0);
    const [hueMax, setHueMax] = useState(360);
    const [threshold, setThreshold] = useState(0.2);
    const [crop, setCrop] = useState(0.5);
    const [opacity, setOpacity] = useState(0.15); // Better default for solid-looking tissue
    const [steps, setSteps] = useState(250); // Higher default quality
    const numSlices = 266;

    useEffect(() => {
        let isMounted = true;
        /**
         * Função Assíncrona para carregar volumes de imagens (fatias do corpo).
         * 
         * O que ela faz:
         * Ela aloca uma quantidade grande de memória computacional (Uint8Array equivalente às resoluções das 266 fotos),
         * então utiliza um 'Canvas' invisível no site para desenhar (extrair via código) os rascunhos de pixels baseados em cores das imagens originais (as fatias),
         * convertendo para bytes de Array. Em seguida, os unifica empilhando em varíaveis e finalmente passando para uma 
         * Textura 3D (THREE.Data3DTexture - usado por placas de vídeo) quando todo processo de download finaliza.
         * 
         * O que está sendo utilizado:
         * - Função nativa `document.createElement('canvas')` e `ctx.getImageData()` da web pra carregar imagens.
         * - Array nativo `Uint8Array` da web, projetado para bytes/processamentos brutos (memória da GPU).
         * - A Instância `THREE.Data3DTexture` (via Threejs): Serve para representar a sequência das 266 camadas fatiadas (as imagens agrupadas como uma "matriz").
         */
        const loadVolume = async () => {
            const width = 256;
            const height = 256;
            const size = width * height * numSlices * 4;
            const data = new Uint8Array(size);

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            
            if (!ctx) return;

            let loaded = 0;
            const loadSlice = (index: number) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    const padIndex = index.toString().padStart(3, '0');
                    img.src = `/volviz_images/slice_${padIndex}.webp`;
                    img.onload = () => {
                        ctx.clearRect(0, 0, width, height);
                        ctx.drawImage(img, 0, 0, width, height);
                        const imgData = ctx.getImageData(0, 0, width, height);
                        const offset = index * width * height * 4;
                        data.set(imgData.data, offset);
                        resolve();
                    };
                    img.onerror = () => { resolve(); }; // Skip missing
                });
            };

            for (let i = 0; i < numSlices; i++) {
                if (!isMounted) break;
                await loadSlice(i);
                loaded++;
                setProgress(Math.round((loaded / numSlices) * 100));
            }

            if (isMounted) {
                const tex = new THREE.Data3DTexture(data, width, height, numSlices);
                tex.format = THREE.RGBAFormat;
                tex.type = THREE.UnsignedByteType;
                tex.minFilter = THREE.LinearFilter;
                tex.magFilter = THREE.LinearFilter;
                tex.unpackAlignment = 1;
                tex.needsUpdate = true;
                setTexture3D(tex);
            }
        };

        loadVolume();
        return () => { isMounted = false; };
    }, []);

    return (
        <div className="w-full flex-col flex items-center justify-center p-4 bg-zinc-900 rounded-xl shadow-lg relative h-[600px]">
            {!texture3D ? (
                <div className="text-white text-xl font-bold flex flex-col items-center gap-4">
                    <p>Carregando Volume Volviz... {progress}%</p>
                    <div className="w-64 h-2 bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="absolute top-4 left-4 z-10 w-64 bg-zinc-800/80 p-4 rounded-xl text-white backdrop-blur flex flex-col gap-4">
                        <h3 className="font-bold text-lg mb-2 text-blue-400">Volviz Controls</h3>
                        
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-zinc-300">Hue Min: {hueMin}</label>
                            <input 
                                type="range" min="0" max="360" value={hueMin} 
                                onChange={(e) => setHueMin(Number(e.target.value))} 
                                className="w-full accent-blue-500"
                            />
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-zinc-300">Hue Max: {hueMax}</label>
                            <input 
                                type="range" min="0" max="360" value={hueMax} 
                                onChange={(e) => setHueMax(Number(e.target.value))} 
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-zinc-300">Crop Edge (Remove Blue): {crop.toFixed(2)}</label>
                            <input 
                                type="range" min="0.1" max="0.5" step="0.01" value={crop} 
                                onChange={(e) => setCrop(Number(e.target.value))} 
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-zinc-300">Threshold: {threshold.toFixed(2)}</label>
                            <input 
                                type="range" min="0" max="1" step="0.05" value={threshold} 
                                onChange={(e) => setThreshold(Number(e.target.value))} 
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-zinc-300">Solid Opacity: {opacity.toFixed(2)}</label>
                            <input 
                                type="range" min="0.01" max="1.0" step="0.01" value={opacity} 
                                onChange={(e) => setOpacity(Number(e.target.value))} 
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-zinc-300">Render Quality (Steps): {steps}</label>
                            <input 
                                type="range" min="50" max="800" step="10" value={steps} 
                                onChange={(e) => setSteps(Number(e.target.value))} 
                                className="w-full accent-purple-500"
                            />
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                           <button onClick={() => {setHueMin(0); setHueMax(360);}} className="text-xs bg-zinc-700 px-2 py-1 rounded hover:bg-zinc-600 transition">Reset</button>
                           <button onClick={() => {setHueMin(330); setHueMax(30);}} className="text-xs bg-red-900 px-2 py-1 rounded hover:bg-red-800 transition">Reds</button>
                           <button onClick={() => {setHueMin(90); setHueMax(150);}} className="text-xs bg-green-900 px-2 py-1 rounded hover:bg-green-800 transition">Greens</button>
                           <button onClick={() => {setHueMin(150); setHueMax(270);}} className="text-xs bg-blue-900 px-2 py-1 rounded hover:bg-blue-800 transition">Blues</button>
                        </div>
                    </div>
                    
                    <Canvas camera={{ position: [0, 0, 1.5] }}>
                        <color attach="background" args={['#1a1a1a']} />
                        <ambientLight intensity={1.5} />
                        <OrbitControls enableZoom={true} />
                        <VolumeBox texture3D={texture3D} hueMin={hueMin} hueMax={hueMax} threshold={threshold} crop={crop} opacity={opacity} steps={steps} />
                    </Canvas>
                </>
            )}
        </div>
    );
};
