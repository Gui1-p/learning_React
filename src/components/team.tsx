interface MembroProps {
  nome: string;
  foto: string;
  alt: string;
  insta: string;
  git: string;
}

// Sub-componente para manter a organização
function CardMembro({ nome, foto, alt, insta, git }: MembroProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm w-64">
      <img src={foto} alt={alt} className="size-32 rounded-full object-cover mb-4 border-2 border-indigo-500" />
      
      <h3 className="text-xl font-bold text-zinc-800 mb-4">{nome}</h3>
      
      <div className="flex gap-4">
        <a href={insta} className="text-sm text-indigo-600">Instagram</a>
        <a href={git} className="text-sm text-indigo-600">Github</a>
      </div>

    </div>
  );
}

export function Team(props: any) {
  return (
    <section className="max-w-9xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">Nossa Equipe</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <CardMembro {...props.m1} />
        <CardMembro {...props.m2} />
        <CardMembro {...props.m3} />
        <CardMembro {...props.m4} />
        <CardMembro {...props.m5} />
      </div>
    </section>
  );
}