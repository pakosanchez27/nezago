export const carouselPosts = [
  {
    id: 1,
    slug: "pasaporte-gastronomico-neza-2026",
    image: "/img/carrusel/groovelanddesigns-beans-4783866.jpg",
    eyebrow: "POR AMOR A NEZA",
    title: "Pasaporte Gastronomico\nNeza 2026",
    tipo: "Noticia local",
    fecha: "11 de abril de 2026",
    introduccion:
      "El pasaporte gastronomico invita a descubrir sabores locales, reunir visitas y conocer espacios representativos de Nezahualcoyotl.",
    desarrollo: [
      "La iniciativa busca visibilizar cocinas, antojitos y propuestas de barrio que forman parte de la identidad cotidiana de la ciudad.",
      "Cada parada propone una experiencia distinta y ayuda a construir una ruta personal para quienes quieren explorar Neza desde su oferta culinaria.",
    ],
    galeria: [
      "/img/carrusel/groovelanddesigns-beans-4783866.jpg",
      "/img/eventos/evento3.jpg",
      "/img/eventos/evento1.jpg",
    ],
  },
  {
    id: 2,
    slug: "ruta-de-antojitos-imperdibles",
    image: "/img/carrusel/joshuemd-pizza-329523.jpg",
    eyebrow: "SABORES DE BARRIO",
    title: "Ruta de antojitos\nimperdibles",
    tipo: "Blog gastronomico",
    fecha: "11 de abril de 2026",
    introduccion:
      "Una seleccion de paradas recomendadas para recorrer antojitos, cocinas populares y propuestas que distinguen a distintos puntos de la ciudad.",
    desarrollo: [
      "La ruta esta pensada para quienes quieren descubrir combinaciones clasicas, recetas de tradicion y espacios muy visitados por la comunidad.",
      "Ademas de comer bien, el recorrido ayuda a reconocer como la comida conecta historias, barrios y encuentros cotidianos en Neza.",
    ],
    galeria: [
      "/img/carrusel/joshuemd-pizza-329523.jpg",
      "/img/eventos/evento2.jpg",
      "/img/eventos/evento4.jpg",
    ],
  },
  {
    id: 3,
    slug: "mercados-y-experiencias-en-neza",
    image: "/img/carrusel/pexels-beans-1834984.jpg",
    eyebrow: "EXPLORA NEZA",
    title: "Descubre mercados\ny experiencias",
    tipo: "Blog urbano",
    fecha: "11 de abril de 2026",
    introduccion:
      "Una mirada a mercados, puntos de encuentro y experiencias que ayudan a recorrer la ciudad desde su actividad cotidiana.",
    desarrollo: [
      "Los mercados y espacios de intercambio son parte esencial de la vida urbana local y concentran comercio, comida y comunidad.",
      "Este recorrido propone observar los detalles del territorio, la diversidad de productos y el dinamismo que caracteriza a Nezahualcoyotl.",
    ],
    galeria: [
      "/img/carrusel/pexels-beans-1834984.jpg",
      "/img/eventos/evento4.jpg",
      "/img/eventos/evento2.jpg",
    ],
  },
];

export function getCarouselPostBySlug(slug) {
  return carouselPosts.find((post) => post.slug === slug);
}
