import DetalleContenidoTemplate from "../components/DetalleContenidoTemplate";

export default function DetalleDatoHistorico() {
  const detailData = {
    tipo: "Dato historico",
    fecha: "15 de abril de 1963",
    titulo: "Los origenes urbanos de Nezahualcoyotl",
    portada: "/img/portada-historia.png",
    introduccion:
      "Nezahualcoyotl se construyo desde la organizacion comunitaria, la ocupacion del territorio y la transformacion constante del paisaje urbano.",
    desarrollo: [
      "El crecimiento de Nezahualcoyotl refleja una historia de esfuerzo colectivo, adaptacion territorial y apropiacion del espacio publico.",
      "Cada etapa de su expansion dejo huellas visibles en sus barrios, avenidas y formas de convivencia, construyendo una identidad propia dentro del oriente metropolitano.",
    ],
    galeria: [
      "/img/portada-historia.png",
      "/img/eventos/evento1.jpg",
      "/img/eventos/evento2.jpg",
    ],
  };

  return <DetalleContenidoTemplate data={detailData} />;
}
