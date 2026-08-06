import { createServerFn } from "@tanstack/react-start";

/**
 * Payload enviado pelo formulário de reservas. Chaves em português para
 * bater 1:1 com as colunas da planilha do Google Sheets e com os
 * placeholders do template do PDF usados no cenário do Make.
 */
export interface ReservationPayload {
  nome: string;
  email: string;
  telefone: string;
  data: string;
  horario: string;
  pessoas: string;
  observacoes: string;
  enviado_em: string;
}

function isReservationPayload(value: unknown): value is ReservationPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v["nome"] === "string" &&
    typeof v["email"] === "string" &&
    typeof v["telefone"] === "string" &&
    typeof v["data"] === "string" &&
    typeof v["horario"] === "string" &&
    typeof v["pessoas"] === "string" &&
    typeof v["observacoes"] === "string" &&
    typeof v["enviado_em"] === "string"
  );
}

/**
 * Encaminha a reserva para o webhook do Make, rodando inteiramente no
 * servidor (Cloudflare Worker). O navegador do cliente nunca vê a URL do
 * webhook — só chama esta server function, que o TanStack Start expõe como
 * uma rota RPC interna (ex.: POST /_serverFn/submitReservation).
 *
 * A URL fica em `MAKE_WEBHOOK_URL` (sem prefixo VITE_), configurada como
 * Secret do Worker no Cloudflare — nunca é embutida no bundle JS público,
 * ao contrário de uma variável VITE_*.
 */
export const submitReservation = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (!isReservationPayload(data)) {
      throw new Error("Dados de reserva inválidos");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const webhookUrl = process.env["MAKE_WEBHOOK_URL"];

    if (!webhookUrl) {
      // Erro de configuração do servidor, não do cliente. A mensagem não
      // vaza nenhum detalhe da URL/infra — só avisa que falta configurar.
      console.error("MAKE_WEBHOOK_URL não está configurada no Worker.");
      throw new Error("Reservas indisponíveis no momento.");
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`Make webhook respondeu ${response.status} ${response.statusText}`);
      throw new Error("Não foi possível registrar a reserva.");
    }

    return { ok: true as const };
  });
