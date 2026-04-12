export const featuredEvent = {
  slug: "gran-concierto-neza-80s",
  title: "Gran Concierto Neza 80s",
  image: "/img/eventos/evento1.jpg",
  scheduleLabel: "24 NOV | 18:00",
  date: "24 NOV",
  time: "18:00",
  location: "Estadio Neza 86",
  cta: "Mas informacion",
  availability: "Quedan pocos lugares",
  interested: "12+ personas interesadas",
  aboutTitle: "Sobre el Evento",
  description:
    "Revive la decada prodigiosa en el corazon de Nezahualcoyotl. El Gran Concierto Neza 80s no es solo un show, es un homenaje a la identidad cultural que forjo a nuestra ciudad. Reunimos a los artistas locales mas iconicos y leyendas del rock que marcaron una era en el mitico Estadio Neza 86. Una noche de nostalgia, energia y el legado musical que sigue vibrando en nuestras calles.",
  mapTitle: "Como llegar",
  mapSubtitle: "Av. Rancho Grande, Gral. Vicente Villada",
  mapImage: "/img/fondos/Vector.png",
  coordinates: [19.4006, -99.0148],
};

export const upcomingEvents = [
  {
    slug: "festival-del-taco-neza-2024",
    title: "Festival del Taco Neza 2024",
    scheduleLabel: "15 OCT | 19:00",
    date: "15 OCT",
    time: "19:00",
    location: "Plaza Union de Fuerzas",
    price: "Gratuito",
    image: "/img/eventos/evento4.jpg",
    availability: "Acceso libre",
    interested: "8 personas interesadas",
    aboutTitle: "Sobre el Evento",
    description:
      "Una celebracion gastronomica dedicada al sabor local. Disfruta tacos al pastor, suadero, campechanos y propuestas especiales de cocineros de Neza, junto con musica en vivo y actividades para toda la familia.",
    mapTitle: "Como llegar",
    mapSubtitle: "Av. Pantitlan, Plaza Union de Fuerzas",
    mapImage: "/img/fondos/Vector.png",
    coordinates: [19.4052, -99.0281],
  },
  {
    slug: "expo-arte-urbano-neza",
    title: "Expo Arte Urbano Neza",
    scheduleLabel: "22 OCT | 10:00",
    date: "22 OCT",
    time: "10:00",
    location: "Centro Cultural Jaime Torres Bodet",
    price: "$50 MXN",
    image: "/img/eventos/evento2.jpg",
    availability: "Cupo limitado",
    interested: "20 personas interesadas",
    aboutTitle: "Sobre el Evento",
    description:
      "Recorre una muestra dedicada al arte mural, fotografia y diseno urbano de creadores emergentes de la zona oriente. La expo incluye conversatorios, recorridos guiados y piezas inmersivas.",
    mapTitle: "Como llegar",
    mapSubtitle: "Centro Cultural Jaime Torres Bodet, Neza",
    mapImage: "/img/fondos/Vector.png",
    coordinates: [19.3928, -99.0214],
  },
  {
    slug: "noche-de-musica-local",
    title: "Noche de Musica Local",
    scheduleLabel: "02 NOV | 20:30",
    date: "02 NOV",
    time: "20:30",
    location: "Foro Cultural Neza",
    price: "Acceso libre",
    image: "/img/eventos/evento3.jpg",
    availability: "Entrada abierta",
    interested: "15 personas interesadas",
    aboutTitle: "Sobre el Evento",
    description:
      "Bandas emergentes y proyectos independientes se encuentran en una noche dedicada al talento local. Un espacio para descubrir nuevas voces y celebrar la escena musical de Nezahualcoyotl.",
    mapTitle: "Como llegar",
    mapSubtitle: "Foro Cultural Neza, Zona Centro",
    mapImage: "/img/fondos/Vector.png",
    coordinates: [19.4091, -99.0067],
  },
];

export const events = [featuredEvent, ...upcomingEvents];

export function getEventBySlug(slug) {
  return events.find((event) => event.slug === slug);
}
