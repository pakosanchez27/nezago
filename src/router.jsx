import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/home";
import Mapa from "./pages/Mapa";
import Pasaporte from "./pages/Pasaporte";
import Cupones from "./pages/Cupones";
import Chat from "./pages/Chat";
import RutaGastronomica from "./pages/RutaGastronomica";
import Cuponera from "./pages/Cuponera";
import Eventos from "./pages/Eventos";
import HistoriaNezahualcoyotl from "./pages/HistoriaNezahualcoyotl";
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
                path: "pasaporte",
                element: <Pasaporte />
            },
            {
                path: "cupones",
                element: <Cupones />
            },
            {
                path: "chat",
                element: <Chat />
            },
            {
                path: "ruta-gastronomica",
                element: <RutaGastronomica />
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
                path: "historia-de-nezahualcoyotl",
                element: <HistoriaNezahualcoyotl />
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
                path: "/auth/login",
                element: <Login />
            },
            {
                path: "auth/registro",
                element: <Registro />
            }
        ]
    }

]);

export default router;
