import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl tracking-[0.3em]">SAVORA</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Cozinha contemporânea de fogo, técnica e ingredientes vivos. Um jantar pensado como
            cena, servido como memória.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Facebook, label: "Facebook" },
              { icon: MessageCircle, label: "WhatsApp" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href={label === "WhatsApp" ? site.whatsapp : "#"}
                aria-label={label}
                className="rounded-full border border-border p-2.5 text-muted-foreground transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-gold">Navegar</h3>
          <ul className="mt-5 space-y-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-gold">Contato</h3>
          <address className="mt-5 space-y-3 text-sm not-italic text-muted-foreground">
            <p>{site.address}</p>
            <p>{site.phone}</p>
            {site.hours.map((h) => (
              <p key={h.day}>
                {h.day} · {h.time}
              </p>
            ))}
          </address>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Savora Cucina. Todos os direitos reservados.
      </div>
    </footer>
  );
}
