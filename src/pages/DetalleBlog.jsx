import { useNavigate, useParams } from "react-router-dom";
import DetalleContenidoTemplate from "../components/DetalleContenidoTemplate";
import { getCarouselPostBySlug } from "../data/carouselPosts";

export default function DetalleBlog() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const post = getCarouselPostBySlug(slug);

  if (!post) {
    return (
      <section className="space-y-6 pb-8">
        <div className="rounded-[28px] border border-[#611232]/8 bg-white p-6 shadow-[0_14px_32px_rgba(97,18,50,0.06)]">
          <h1 className="text-[32px] font-bold text-[#611232]">
            Contenido no encontrado
          </h1>
          <p className="mt-4 text-[15px] leading-6 text-[#5F4B52]">
            La noticia o articulo que intentaste abrir no esta disponible.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#611232] px-4 py-3 text-[14px] font-bold text-white"
          >
            <span aria-hidden="true">&larr;</span>
            Regresar
          </button>
        </div>
      </section>
    );
  }

  return <DetalleContenidoTemplate data={post} />;
}
