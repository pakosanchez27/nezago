import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CHAT_API_URL =
  import.meta.env.VITE_CHAT_API_URL?.trim() || "/api/chat";

const starterMessages = [
  {
    id: "assistant-1",
    sender: "assistant",
    text: "Hola, soy Coyito, tu guia de Nezahualcoyotl en NezaGo. Puedo ayudarte a descubrir lugares, eventos, historia, rutas y recomendaciones utiles dentro de la app.",
  },
];

function mapMessagesForApi(messages) {
  return messages.map((message) => ({
    role: message.sender === "assistant" ? "assistant" : "user",
    content: message.text,
  }));
}

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(starterMessages);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messageIdRef = useRef(starterMessages.length + 1);

  const headerTimestamp = useMemo(() => {
    const now = new Date();
    return now.toLocaleTimeString("es-MX", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedValue = inputValue.trim();
    if (!trimmedValue || isSending) return;

    const userMessage = {
      id: `message-${messageIdRef.current++}`,
      sender: "user",
      text: trimmedValue,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue("");
    setErrorMessage("");
    setIsSending(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: mapMessagesForApi(nextMessages),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "No fue posible enviar tu mensaje.");
      }

      const responseText =
        data?.text ||
        data?.output_text ||
        data?.output
          ?.flatMap((item) => item.content || [])
          ?.find((item) => item.type === "output_text")?.text;

      if (!responseText) {
        throw new Error("La API no devolvio un texto valido.");
      }

      const assistantMessage = {
        id: `message-${messageIdRef.current++}`,
        sender: "assistant",
        text: responseText,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      setErrorMessage(
        error?.message ||
          "Ocurrio un problema al conectar con el asistente. Intenta de nuevo.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="relative -mx-4 -mt-8 min-h-[calc(100vh-8rem)] overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),rgba(249,245,244,0.98))] md:mx-0 md:mt-0 md:rounded-[32px] md:border md:border-[#f1e9ec]">
      <div className="absolute inset-0 bg-[url('/img/fondos/fondo.png')] bg-cover bg-left opacity-[0.18]" />

      <div className="relative z-10 flex min-h-[calc(100vh-8rem)] flex-col">
        <header className="border-b border-[#f0e7ea] bg-white/90 px-5 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Regresar"
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[24px] text-[#3a2d33]"
            >
              &larr;
            </button>

            <div className="relative">
              <img
                src="/img/avatares/coyito.png"
                alt="Coyito"
                className="h-11 w-11 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#2ecc71]" />
            </div>

            <div>
              <h1 className="text-[18px] font-bold text-[#24181d]">Coyito</h1>
              <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#a47b12]">
                En linea
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 pb-40 pt-6 md:px-6">
          <div className="flex justify-center">
            <span className="rounded-full bg-white/85 px-4 py-2 text-[11px] font-semibold uppercase text-[#8e7f84] shadow-[0_6px_16px_rgba(97,18,50,0.06)]">
              Hoy, {headerTimestamp}
            </span>
          </div>

          {messages.map((message) =>
            message.sender === "assistant" ? (
              <div key={message.id} className="max-w-[86%]">
                <div className="rounded-[28px] rounded-bl-[10px] bg-white/92 px-5 py-4 text-[16px] leading-8 text-[#4d4146] shadow-[0_18px_34px_rgba(97,18,50,0.08)]">
                  {message.text}
                </div>
              </div>
            ) : (
              <div key={message.id} className="flex w-full justify-end">
                <div className="flex max-w-[88%] items-end gap-3">
                  <div className="rounded-[28px] rounded-br-[8px] bg-[#611232] px-5 py-4 text-[16px] leading-8 text-white shadow-[0_18px_34px_rgba(97,18,50,0.18)]">
                    {message.text}
                  </div>

                  <div className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#611232] shadow-[0_14px_24px_rgba(97,18,50,0.18)]">
                    <img
                      src="/img/iconos/chat_bubble.svg"
                      alt=""
                      className="h-5 w-5 brightness-0 invert"
                    />
                  </div>
                </div>
              </div>
            ),
          )}

          {isSending ? (
            <div className="max-w-[86%]">
              <div className="rounded-[28px] rounded-bl-[10px] bg-white/92 px-5 py-4 text-[15px] text-[#7b6d72] shadow-[0_18px_34px_rgba(97,18,50,0.08)]">
                Escribiendo respuesta...
              </div>
            </div>
          ) : null}

          {errorMessage ? (
            <div className="max-w-[92%] rounded-[22px] border border-[#611232]/10 bg-[#fff4f5] px-4 py-3 text-[14px] text-[#7b2c3f] shadow-[0_10px_24px_rgba(97,18,50,0.06)]">
              {errorMessage}
            </div>
          ) : null}
        </div>

        <div className="fixed inset-x-0 bottom-0 z-30 bg-[linear-gradient(180deg,rgba(249,245,244,0),rgba(249,245,244,0.94)_20%,rgba(249,245,244,0.98)_100%)] px-4 pb-4 pt-10 md:left-auto md:right-0 md:px-6">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-[820px] items-center gap-3 rounded-full bg-white px-5 py-3 shadow-[0_18px_36px_rgba(97,18,50,0.10)]"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Escribe un mensaje..."
              className="h-11 flex-1 border-none bg-transparent text-[16px] text-[#3b2f34] outline-none placeholder:text-[#a6989d]"
            />

            <button
              type="submit"
              aria-label="Enviar"
              disabled={isSending || !inputValue.trim()}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#611232] text-white shadow-[0_16px_28px_rgba(97,18,50,0.18)] disabled:cursor-not-allowed disabled:opacity-55"
            >
              <span className="text-[24px] leading-none">&#10148;</span>
            </button>
          </form>


        </div>
      </div>
    </section>
  );
}
