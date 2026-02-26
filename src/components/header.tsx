interface HeaderDescription {
  titulo: string;
  texto: string;
}

export function HeaderLayout({ titulo, texto }: HeaderDescription) {
  return (
    <div>
      <h1>
        {titulo}
      </h1>
      
      <p>
        {texto}
      </p>
    </div>
  );
}