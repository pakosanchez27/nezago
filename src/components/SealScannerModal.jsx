import { useEffect, useRef, useState } from "react";

export default function SealScannerModal({
  isOpen,
  onClose,
  onDetected,
  onCameraUnavailable,
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const detectorRef = useRef(null);
  const [status, setStatus] = useState("Apunta la camara al QR del establecimiento.");
  const [result, setResult] = useState("");
  const [manualCode, setManualCode] = useState("");

  useEffect(() => {
    if (!isOpen) return undefined;

    let cancelled = false;

    async function startScanner() {
      try {
        setResult("");
        setStatus("Solicitando acceso a la camara...");

        if (!navigator.mediaDevices?.getUserMedia) {
          setStatus("La camara no esta disponible en este dispositivo.");
          onCameraUnavailable?.();
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        if ("BarcodeDetector" in window) {
          detectorRef.current = new window.BarcodeDetector({
            formats: ["qr_code"],
          });
          setStatus("Escaneando QR...");
          scanFrame();
        } else {
          setStatus(
            "La camara ya esta abierta. Este navegador no soporta lectura QR automatica."
          );
        }
      } catch {
        setStatus("No se pudo acceder a la camara. Revisa los permisos.");
        onCameraUnavailable?.();
      }
    }

    async function scanFrame() {
      if (
        !videoRef.current ||
        !detectorRef.current ||
        videoRef.current.readyState < 2
      ) {
        animationRef.current = requestAnimationFrame(scanFrame);
        return;
      }

      try {
        const codes = await detectorRef.current.detect(videoRef.current);
        if (codes.length > 0) {
          const rawValue = codes[0]?.rawValue ?? "";
          setResult(rawValue);
          setStatus("QR detectado. Validando token...");
          stopStream();
          onDetected?.(rawValue);
          return;
        }
      } catch {
        setStatus("No fue posible leer el QR. Intenta de nuevo.");
      }

      animationRef.current = requestAnimationFrame(scanFrame);
    }

    function stopStream() {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }

    startScanner();

    return () => {
      cancelled = true;
      stopStream();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 p-4 md:items-center">
      <button
        type="button"
        aria-label="Cerrar escaner"
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-[0_24px_48px_rgba(0,0,0,0.24)]">
        <div className="flex items-center justify-between border-b border-[#f0e6e9] px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8D6B10]">
              Sellar pasaporte
            </p>
            <h2 className="mt-1 text-[22px] font-bold text-[#611232]">
              Escanear QR
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f1f3] text-2xl text-[#611232]"
          >
            &times;
          </button>
        </div>

        <div className="p-5">
          <div className="relative overflow-hidden rounded-[24px] bg-[#1d1015]">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 border-[3px] border-white/16" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-[28px] border-2 border-[#ffd175]" />
          </div>

          <p className="mt-4 text-[13px] leading-5 text-[#6b5b61]">{status}</p>

          {result ? (
            <div className="mt-4 rounded-[18px] bg-[#f8f3f1] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8D6B10]">
                QR detectado
              </p>
              <p className="mt-2 break-all text-[12px] text-[#4d3a41]">{result}</p>
            </div>
          ) : null}

          <div className="mt-4 rounded-[18px] bg-[#fbf6f4] px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8D6B10]">
              Prueba manual
            </p>
            <input
              type="text"
              value={manualCode}
              onChange={(event) => setManualCode(event.target.value)}
              placeholder="Ingresa token estatico"
              className="mt-3 w-full rounded-full border border-[#eadde1] bg-white px-4 py-3 text-[13px] text-[#4d3a41] outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (!manualCode.trim()) return;
                setResult(manualCode.trim());
                setStatus("Token capturado. Validando...");
                onDetected?.(manualCode.trim());
              }}
              className="mt-3 inline-flex rounded-full bg-[#611232] px-4 py-3 text-[13px] font-bold text-white"
            >
              Validar token
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
