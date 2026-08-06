import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { toast } from "sonner";
import { CalendarCheck } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { MagneticButton } from "@/components/common/MagneticButton";
import { EASE } from "@/lib/motion";
import { submitReservation } from "@/lib/reservation-fn";

interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes?: string;
}

const fieldClass =
  "w-full rounded-md border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-all duration-500 placeholder:text-muted-foreground/70 focus:border-gold focus:bg-background";

/**
 * Formato enviado ao servidor (e, de lá, ao Make). Chaves em português para
 * bater 1:1 com as colunas da planilha do Google Sheets e com os
 * placeholders do template do PDF (relatorio-reservas.html).
 */
function toReservationPayload(data: ReservationForm) {
  return {
    nome: data.name,
    email: data.email,
    telefone: data.phone,
    data: data.date,
    horario: data.time,
    pessoas: data.guests,
    observacoes: data.notes ?? "",
    enviado_em: new Date().toISOString(),
  };
}

export function Reservation() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationForm>({
    defaultValues: { guests: "2" },
  });

  const onSubmit = async (data: ReservationForm) => {
    try {
      // Chama a server function — roda no Worker, nunca no navegador. A URL
      // do webhook do Make fica só no servidor (variável MAKE_WEBHOOK_URL),
      // nunca é enviada ao cliente.
      await submitReservation({ data: toReservationPayload(data) });

      toast.success("Reserva enviada", {
        description: `${data.name}, confirmaremos sua mesa para ${data.guests} em instantes.`,
      });
      reset({ guests: "2" });
    } catch (error) {
      console.error("Falha ao enviar reserva:", error);
      toast.error("Não conseguimos enviar sua reserva", {
        description: "Tente novamente em instantes ou fale conosco por telefone.",
      });
    }
  };

  return (
    <section id="reservas" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="Reservas"
          title="Garanta sua mesa"
          description="Respondemos em até duas horas durante o horário de funcionamento."
          variant="refined"
        />

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE.crisp }}
          className="card-luxe mt-14 grid gap-5 rounded-xl p-8 sm:grid-cols-2"
          noValidate
        >
          <div className="sm:col-span-2">
            <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-gold">
              Nome completo
            </label>
            <input
              id="name"
              className={`mt-2 ${fieldClass}`}
              placeholder="Como devemos chamá-lo?"
              aria-invalid={!!errors.name}
              {...register("name", { required: "Informe seu nome" })}
            />
            {errors.name ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-gold">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className={`mt-2 ${fieldClass}`}
              placeholder="voce@email.com"
              aria-invalid={!!errors.email}
              {...register("email", {
                required: "Informe seu e-mail",
                pattern: { value: /\S+@\S+\.\S+/, message: "E-mail inválido" },
              })}
            />
            {errors.email ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="phone" className="text-xs uppercase tracking-[0.2em] text-gold">
              Telefone
            </label>
            <input
              id="phone"
              type="tel"
              className={`mt-2 ${fieldClass}`}
              placeholder="(11) 90000-0000"
              aria-invalid={!!errors.phone}
              {...register("phone", { required: "Informe um telefone" })}
            />
            {errors.phone ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.phone.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="date" className="text-xs uppercase tracking-[0.2em] text-gold">
              Data
            </label>
            <input
              id="date"
              type="date"
              className={`mt-2 ${fieldClass}`}
              aria-invalid={!!errors.date}
              {...register("date", { required: "Escolha a data" })}
            />
            {errors.date ? (
              <p className="mt-1.5 text-xs text-destructive">{errors.date.message}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="time" className="text-xs uppercase tracking-[0.2em] text-gold">
                Horário
              </label>
              <input
                id="time"
                type="time"
                className={`mt-2 ${fieldClass}`}
                aria-invalid={!!errors.time}
                {...register("time", { required: "Escolha o horário" })}
              />
              {errors.time ? (
                <p className="mt-1.5 text-xs text-destructive">{errors.time.message}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="guests" className="text-xs uppercase tracking-[0.2em] text-gold">
                Pessoas
              </label>
              <select id="guests" className={`mt-2 ${fieldClass}`} {...register("guests")}>
                {["1", "2", "3", "4", "5", "6", "8", "10+"].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="notes" className="text-xs uppercase tracking-[0.2em] text-gold">
              Observações
            </label>
            <textarea
              id="notes"
              rows={3}
              className={`mt-2 resize-none ${fieldClass}`}
              placeholder="Restrições alimentares, comemorações, preferência de mesa…"
              {...register("notes")}
            />
          </div>

          <MagneticButton
            type="submit"
            disabled={isSubmitting}
            className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-[box-shadow,filter] duration-500 hover:shadow-[0_0_40px_-6px_var(--gold)] hover:brightness-110 disabled:opacity-60 sm:col-span-2"
          >
            <CalendarCheck className="size-4 transition-transform duration-500 group-hover:-rotate-6" />
            {isSubmitting ? "Enviando…" : "Confirmar reserva"}
          </MagneticButton>
        </motion.form>
      </div>
    </section>
  );
}
