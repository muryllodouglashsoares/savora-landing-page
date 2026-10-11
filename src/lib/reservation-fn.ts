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

const MAX_LEN = { nome: 120, email: 160, telefone: 30, observacoes: 500 } as const;
const GUESTS = new Set(["1", "2", "3", "4", "5", "6", "8", "10+"]);

/**
 * Valida de verdade no servidor (o navegador pode ser contornado): tipos,
 * tamanhos máximos e formatos. Evita encaminhar lixo/payloads enormes ao webhook.
 */
function isReservationPayload(value: unknown): value is ReservationPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const str = (k: string) => (typeof v[k] === "string" ? (v[k] as string) : null);

  const nome = str("nome");
  const email = str("email");
  const telefone = str("telefone");
  const data = str("data");
  const horario = str("horario");
  const pessoas = str("pessoas");
  const observacoes = str("observacoes");
  const enviado = str("enviado_em");
  if ([nome, email, telefone, data, horario, pessoas, observacoes, enviado].includes(null))
    return false;

  return (
    nome!.trim().length > 0 &&
    nome!.length <= MAX_LEN.nome &&
    /^\S+@\S+\.\S+$/.test(email!) &&
    email!.length <= MAX_LEN.email &&
    telefone!.replace(/\D/g, "").length >= 10 &&
    telefone!.length <= MAX_LEN.telefone &&
    /^\d{4}-\d{2}-\d{2}$/.test(data!) &&
    /^\d{2}:\d{2}$/.test(horario!) &&
    GUESTS.has(pessoas!) &&
    observacoes!.length <= MAX_LEN.observacoes &&
    !Number.isNaN(Date.parse(enviado!))
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
      // Não deixa a requisição do usuário pendurada se o Make não responder.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`Make webhook respondeu ${response.status} ${response.statusText}`);
      throw new Error("Não foi possível registrar a reserva.");
    }

    return { ok: true as const };
  });
