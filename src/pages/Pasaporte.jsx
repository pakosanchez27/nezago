import { useState } from "react";
import FloatingSealButton from "../components/FloatingSealButton";
import SealErrorAlert from "../components/SealErrorAlert";
import PassportProgressCard from "../components/PassportProgressCard";
import RouteMapCallout from "../components/RouteMapCallout";
import SealScannerModal from "../components/SealScannerModal";
import SealSuccessAlert from "../components/SealSuccessAlert";
import StampGrid from "../components/StampGrid";

const INITIAL_STAMPS = [
  {
    name: "Tacos El Compa",
    status: "visitado",
    detail: "Visitado Mar 2024",
    token: "NEZA-TACOS-COMPA-001",
  },
  {
    name: "Mural de la Identidad",
    status: "visitado",
    detail: "Visitado Feb 2024",
    token: "NEZA-MURAL-IDENTIDAD-002",
  },
  {
    name: "Coyote en Ayuno",
    status: "visitado",
    detail: "Visitado Mar 2024",
    token: "NEZA-COYOTE-AYUNO-003",
  },
  {
    name: "Plaza Union de Fuerzas",
    status: "bloqueado",
    detail: "Bloqueado",
    token: "NEZA-PLAZA-UNION-004",
  },
  {
    name: "Casa del Sabor",
    status: "bloqueado",
    detail: "Bloqueado",
    token: "NEZA-CASA-SABOR-005",
  },
  {
    name: "Mercado del Barrio",
    status: "bloqueado",
    detail: "Bloqueado",
    token: "NEZA-MERCADO-BARRIO-006",
  },
];

export default function Pasaporte() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [stamps, setStamps] = useState(INITIAL_STAMPS);
  const [successStampName, setSuccessStampName] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState({
    isOpen: false,
    eyebrow: "",
    title: "",
    message: "",
  });

  const visitedCount = stamps.filter((stamp) => stamp.status === "visitado").length;
  const totalCount = stamps.length;

  function openErrorAlert(eyebrow, title, message) {
    setErrorAlert({
      isOpen: true,
      eyebrow,
      title,
      message,
    });
  }

  function handleTokenDetected(scannedToken) {
    const normalizedToken = scannedToken.trim().toUpperCase();

    if (normalizedToken === "QR-VENCIDO-001") {
      setIsScannerOpen(false);
      openErrorAlert(
        "QR vencido",
        "Codigo expirado",
        "El QR escaneado ya no es valido. Solicita uno nuevo en el establecimiento."
      );
      return;
    }

    if (normalizedToken === "SIN-INTERNET-001") {
      setIsScannerOpen(false);
      openErrorAlert(
        "Sin internet",
        "Conexion no disponible",
        "No fue posible validar el sello porque no hay conexion a internet."
      );
      return;
    }

    if (normalizedToken === "ERROR-SERVIDOR-001") {
      setIsScannerOpen(false);
      openErrorAlert(
        "Error del servidor",
        "Servicio no disponible",
        "Ocurrio un error al validar el establecimiento. Intenta nuevamente en unos momentos."
      );
      return;
    }

    const matchedStamp = stamps.find((stamp) => stamp.token === normalizedToken);

    if (!matchedStamp) {
      setIsScannerOpen(false);
      openErrorAlert(
        "QR no valido",
        "Intenta de nuevo",
        "El codigo escaneado no corresponde a un establecimiento registrado en la ruta gastronomica."
      );
      return;
    }

    let unlockedStampName = "";

    setStamps((currentStamps) =>
      currentStamps.map((stamp) => {
        if (stamp.token !== normalizedToken) return stamp;
        if (stamp.status === "visitado") return stamp;

        unlockedStampName = stamp.name;

        return {
          ...stamp,
          status: "visitado",
          detail: "Visitado hoy",
        };
      })
    );

    setIsScannerOpen(false);

    if (unlockedStampName) {
      setSuccessStampName(unlockedStampName);
      setIsSuccessOpen(true);
    }
  }

  return (
    <div className="relative space-y-6 pb-24">
      <PassportProgressCard
        visitedCount={visitedCount}
        totalCount={totalCount}
      />
      <RouteMapCallout />
      <StampGrid stamps={stamps} />
      <FloatingSealButton onClick={() => setIsScannerOpen(true)} />
      <SealScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onDetected={handleTokenDetected}
        onCameraUnavailable={() => {
          setIsScannerOpen(false);
          openErrorAlert(
            "Camara no disponible",
            "No se puede abrir la camara",
            "El dispositivo o navegador no permitio acceder a la camara para escanear el QR."
          );
        }}
      />
      <SealSuccessAlert
        isOpen={isSuccessOpen}
        stampName={successStampName}
        onClose={() => setIsSuccessOpen(false)}
      />
      <SealErrorAlert
        isOpen={errorAlert.isOpen}
        eyebrow={errorAlert.eyebrow}
        title={errorAlert.title}
        message={errorAlert.message}
        onClose={() =>
          setErrorAlert({
            isOpen: false,
            eyebrow: "",
            title: "",
            message: "",
          })
        }
      />
    </div>
  );
}
