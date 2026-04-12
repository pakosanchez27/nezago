import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function openAIChatProxy(mode) {
  const env = loadEnv(mode, process.cwd(), "");
  const apiKey = env.OPENAI_API_KEY;
  const model = env.OPENAI_MODEL || "gpt-4.1-mini";

  return {
    name: "openai-chat-proxy",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Metodo no permitido" }));
          return;
        }

        if (!apiKey) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error:
                "Falta OPENAI_API_KEY. Agrega tu llave en un archivo .env local.",
            }),
          );
          return;
        }

        const chunks = [];

        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", async () => {
          try {
            const rawBody = Buffer.concat(chunks).toString("utf8");
            const body = rawBody ? JSON.parse(rawBody) : {};
            const messages = Array.isArray(body.messages) ? body.messages : [];

            const response = await fetch("/api/chat.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ messages }),
            });

            const data = await response.json();

            if (!response.ok) {
              res.statusCode = response.status;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error:
                    data?.error?.message ||
                    "No fue posible obtener respuesta del asistente.",
                }),
              );
              return;
            }

            const text =
              data?.output_text ||
              data?.output
                ?.flatMap((item) => item.content || [])
                ?.find((item) => item.type === "output_text")?.text ||
              "No recibi una respuesta valida del asistente.";

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ text }));
          } catch (error) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error:
                  error?.message || "Ocurrio un error inesperado en el chat.",
              }),
            );
          }
        });
      });
    },
  };
}

// export default defineConfig({
//   base: "/",
// });

export default defineConfig(({ mode }) => ({
  plugins: [react(), openAIChatProxy(mode)],
  server: {
    host: true,
    allowedHosts: true,
    watch: {
      usePolling: true,
    },
  },
}));
