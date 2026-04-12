import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import Mapa from "./pages/Mapa";
import Pasaporte from "./pages/Pasaporte";
import Cupones from "./pages/Cupones";
import Chat from "./pages/Chat";
import RutaGastronomica from "./pages/RutaGastronomica";
import Cuponera from "./pages/Cuponera";
import Eventos from "./pages/Eventos";
import DetalleEvento from "./pages/DetalleEvento";
import DatosHistoricos from "./pages/DatosHistoricos";
import DetalleDatoHistorico from "./pages/DetalleDatoHistorico";
import DetalleLugarMapa from "./pages/DetalleLugarMapa";
import DetalleBlog from "./pages/DetalleBlog";
import HistoriaNezahualcoyotl from "./pages/HistoriaNezahualcoyotl";
import MapaRutaGastronomica from "./pages/MapaRutaGastronomica";
import RutasTransporte from "./pages/RutasTransporte";
import TianguisHoy from "./pages/TianguisHoy";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "mapa",
                element: <Mapa />
            },
            {
                path: "ruta-gastronomica/mapa",
                element: <MapaRutaGastronomica />
            },
            {
                path: "mapa/detalle",
                element: <DetalleLugarMapa />
            },
            {
                path: "pasaporte",
                element: <Pasaporte />
            },
            {
                path: "cupones",
                element: <Cupones />
            },
            {
                path: "coyito",
                element: <Chat />
            },
            {
                path: "ruta-gastronomica",
                element: <MapaRutaGastronomica />
            },
            {
                path: "cuponera",
                element: <Cuponera />
            },
            {
                path: "eventos",
                element: <Eventos />
            },
            {
                path: "eventos/:slug",
                element: <DetalleEvento />
            },
            {
                path: "blog/:slug",
                element: <DetalleBlog />
            },
            {
                path: "historia-de-nezahualcoyotl",
                element: <HistoriaNezahualcoyotl />
            },
            {
                path: "historia-de-nezahualcoyotl/datos-historicos",
                element: <DatosHistoricos />
            },
            {
                path: "historia-de-nezahualcoyotl/detalle",
                element: <DetalleDatoHistorico />
            },
            {
                path: "rutas-de-transporte",
                element: <RutasTransporte />
            },
            {
                path: "tianguis-de-hoy",
                element: <TianguisHoy />
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "registro",
                element: <Registro />
            }
        ]
    }

]);

export default router;
