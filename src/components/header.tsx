interface HeaderDescription {
  titulo: string;
  texto: string;
}

export function HeaderLayout({ titulo, texto }: HeaderDescription) {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center bg-zinc-600 px-4 text-center ">
      
      <div className="z-10 max-w-4xl">

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
          {titulo}
        </h1>

        <p className="mb-10 text-lg text-zinc-400 md:text-xl ">
          {texto}
        </p>

      </div>

    </div>
  );
}