interface Hero_1_Description {
  titulo: string;
  texto: string;
}

export function Hero_1({ titulo, texto }: Hero_1_Description) {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center bg-zinc-400 px-4 text-center ">
      
      <div className="z-10 max-w-4xl">

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 md:text-7xl">
          {titulo}
        </h1>

        <p className="mb-10 text-lg text-zinc-500 md:text-xl ">
          {texto}
        </p>

      </div>

    </div>
  );
}