# Savora — Landing Page

Landing page premium para o **Savora**, um restaurante contemporâneo fictício. Site institucional com cardápio digital, seções de apresentação do restaurante, mapa de localização e um formulário de reservas com automação de ponta a ponta via Make — construído como peça de portfólio, com foco em animação de alto padrão e performance.

🔗 Deploy: [savora-landing-page.muryllodouglash-soares.workers.dev](https://savora-landing-page.muryllodouglash-soares.workers.dev/)

## Stack

- **React 19** + **TypeScript**
- **TanStack Start** (SSR) + **TanStack Router**
- **Vite**
- **Tailwind CSS 4**
- **Motion** (Framer Motion) para animações
- **shadcn/ui** + **Radix UI** para primitivos de interface
- **React Hook Form** para o formulário de reservas
- **ESLint** + **Prettier**
- **Cloudflare Workers** (deploy) + **Make** (automação de reservas)

## Como rodar

Requer Node.js e npm (funciona com Bun também — rode `bun install` para gerar o `bun.lock`).

```sh
npm install
npm run dev
```

Outros scripts disponíveis:

```sh
npm run build       # build de produção
npm run build:dev   # build em modo development
npm run preview      # serve o build de produção localmente
npm run lint          # ESLint
npm run format        # Prettier (--write)
```

## Variáveis de ambiente

O formulário de reservas depende de uma variável **de servidor** (não pública):

| Variável           | Onde é lida                                 | Onde configurar                                                                                                                                                                 |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MAKE_WEBHOOK_URL` | `src/lib/reservation-fn.ts`, só no servidor | Local: copie `.dev.vars.example` para `.dev.vars` (já ignorado pelo git). Produção: `npx wrangler secret put MAKE_WEBHOOK_URL` ou pelo dashboard da Cloudflare, como **Secret** |

Por ser lida apenas no `process.env` do lado do servidor (sem prefixo `VITE_`), essa URL **nunca é embutida no bundle JS** enviado ao navegador — o cliente só chama a server function (`submitReservation`), que roda dentro do Worker e encaminha os dados para o Make.

## Estrutura do projeto

```
src/
├── assets/            # imagens (pratos, ingredientes, galeria) — .webp otimizado
├── components/
│   ├── common/         # componentes compartilhados (ex.: MagneticLink)
│   ├── hero/            # Hero e a animação de montagem do prato (ver abaixo)
│   ├── layout/          # Navbar, Footer
│   ├── menu/             # Cardápio digital (cards, filtros por categoria)
│   ├── sections/         # Sobre, Especialidades, Ingredientes, Galeria, Avaliações,
│   │                      # Reservas, Localização, FAQ, CTA final
│   └── ui/                # primitivos shadcn/ui — só os 2 realmente usados
│                           # (accordion, sonner); ver nota de limpeza abaixo
├── data/                # dados do cardápio e do restaurante (menu.ts, site.ts)
├── hooks/               # hooks utilitários (ex.: use-mobile)
├── lib/                  # sistema de motion compartilhado, utils, error reporting,
│                          # server function de reservas (reservation-fn.ts)
└── routes/               # rotas do TanStack Router (__root, index)

docs-relatorio-reservas.html  # template HTML/Handlebars do PDF de relatório de
                                # reservas, usado no cenário do Make (ver abaixo)
```

## A Hero Section

A Hero simula um chef montando o prato: primeiro o **prato de cerâmica** é posto na mesa, depois os ingredientes caem sobre ele um a um — com leve rotação e um pequeno _bounce_ ao pousar —, seguidos por um brilho final e uma polvilhada de tempero. Essa sequência de montagem roda **uma única vez**, ao carregar a página, e depois fica parada.

A única coisa que continua se movendo depois disso é a **auréola dourada** ao redor do prato: um brilho ambiente que respira lentamente e um arco em gradiente que gira ao redor da borda, contínuo, para sempre — a versão "viva" do efeito de borda que se forma na primeira entrada.

A lógica é dividida em componentes pequenos e reutilizáveis dentro de `src/components/hero/`:

| Componente               | Responsabilidade                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `Hero.tsx`               | Orquestra a seção: copy, botões, parallax de scroll e tilt do mouse.                                                      |
| `PlateAnimation.tsx`     | Sequencia a montagem do prato (prato base → dish → ingredientes → aproximação de câmera → brilho → partículas → auréola). |
| `Plate.tsx`              | O prato de cerâmica em si (gradientes CSS, sem imagem), que aparece antes do prato de comida pousar sobre ele.            |
| `PlateRing.tsx`          | A auréola dourada contínua ao redor do prato — glow ambiente + arco giratório, em loop infinito.                          |
| `Ingredient.tsx`         | Uma peça caindo: queda, rotação, bounce e acomodação — sem loops.                                                         |
| `ShineEffect.tsx`        | Brilho único que passa sobre o prato ao final da montagem.                                                                |
| `SeasoningParticles.tsx` | Rajada curta e finita de partículas de tempero.                                                                           |

**Decisões de performance** (a versão anterior ao Lovable usava dezenas de animações em loop infinito e filtros de blur pesados, o que pesava bastante em CPU/GPU):

- A sequência de montagem (queda dos ingredientes, brilho, partículas) anima apenas `transform` e `opacity` e roda **uma única vez** — nada nela usa `repeat: Infinity`.
- A única exceção intencional é a auréola do prato (`PlateRing.tsx`): duas animações leves e baratas (opacidade de um glow e rotação de um gradiente) rodam em loop indefinidamente, mas são propriedades compostas na GPU — não repaintam a cada frame — e o `blur` usado ali é estático, não animado.
- `will-change` é aplicado só enquanto uma peça está caindo e removido assim que ela se acomoda.
- Respeita `prefers-reduced-motion`: quando ativado, o prato já aparece pronto, sem sequência de montagem, e a auréola vira um anel estático — nenhum loop roda.
- No mobile, a sequência usa menos peças (agrupadas), timeline mais rápida e menos partículas.
- Apenas a imagem principal do prato (`hero-dish.webp`) é pré-carregada (`<link rel="preload">` no `__root.tsx`); as demais imagens carregam sob demanda (`loading="lazy"`).

## Cardápio digital

Os itens do cardápio ficam em `src/data/menu.ts`, organizados por categoria (Entradas, Massas, Carnes, Peixes, Risotos, Sobremesas, Drinks, Bebidas, Menu Executivo, Menu Infantil). Cada item tem imagem, nome, descrição, preço, ingredientes e uma tag opcional.

## Localização

A seção de Localização usa um embed real do Google Maps (`google.com/maps?q=<endereço>&output=embed`, sem necessidade de API key), montado a partir do endereço em `src/data/site.ts`. Um filtro CSS (`invert` + `hue-rotate`) escurece o mapa pra combinar com o tema, com uma vinheta nas bordas e um cartão sobreposto com nome e endereço. O botão "Como chegar" abre o mesmo endereço direto no Google Maps.

## Reservas: formulário → Make → planilha → PDF

O formulário de reservas (`src/components/sections/Reservation.tsx`) não é só front-end — ele está integrado de ponta a ponta:

1. O usuário preenche e envia o formulário (React Hook Form cuida da validação).
2. O front-end chama `submitReservation`, uma **server function** do TanStack Start (`src/lib/reservation-fn.ts`) — o código roda dentro do Cloudflare Worker, nunca no navegador.
3. A server function repassa os dados via `POST` para um **Custom Webhook do Make**, cuja URL vive só em `MAKE_WEBHOOK_URL` (secret do Worker) — o cliente nunca tem acesso a essa URL.
4. Do lado do Make, o cenário grava cada reserva numa planilha do Google Sheets e pode gerar um relatório periódico em PDF a partir do template em `docs-relatorio-reservas.html` (HTML + Handlebars, compatível com apps de "HTML/JSON → PDF" como PDFMonkey, Docupilot ou APITemplate.io).
5. O aviso abaixo do botão "Confirmar reserva" informa que os dados são coletados exclusivamente para o registro e a confirmação da reserva — reflete exatamente esse fluxo.

Ver a seção [Variáveis de ambiente](#variáveis-de-ambiente) para configurar o webhook.

## Notas

- Este projeto foi iniciado no [Lovable](https://lovable.dev) e depois evoluído manualmente.
- Todos os dados do restaurante (nome, endereço, telefone, chef, depoimentos) são **fictícios** — construídos para servir como peça de portfólio.

## Limpeza de scaffold (shadcn)

O projeto veio do Lovable com o scaffold completo do shadcn/ui — cerca de 45 componentes prontos (sidebar, carousel, chart, calendar, form, command palette etc.) e as dependências que os sustentam. Só **dois** desses componentes chegaram a ser usados de verdade no site: `accordion` (no FAQ) e `sonner` (toast de confirmação da reserva).

Numa revisão final, o restante foi removido — arquivos de componente, dependências no `package.json` (⁓25 pacotes: várias libs do Radix UI, `recharts`, `cmdk`, `embla-carousel-react`, `react-day-picker`, `vaul`, `zod`, `date-fns`, entre outras) e os tokens de CSS que só existiam pra sustentá-los (variáveis `--chart-*`, `--sidebar-*`, utility `glass-panel` não utilizada). Também saíram as imagens `.png` originais dos ingredientes e do prato principal, já que só as versões `.webp` (bem mais leves) são usadas em qualquer lugar do código — isso sozinho tirou mais de 2 MB do repositório.

Nada disso afetava o bundle final (o Vite já não incluía código nunca importado), mas deixava o repositório maior e mais confuso pra quem fosse ler o projeto. `npm install` agora traz ⁓115 pacotes a menos, e `src/components/ui/` passou de 45 arquivos para 2.

> O `bun.lock` foi removido nessa limpeza porque não há Bun disponível no ambiente onde a limpeza foi feita pra regerá-lo corretamente a partir do `package.json` atualizado. Se você usa Bun, rode `bun install` uma vez — ele recria o lockfile do zero, já refletindo as dependências enxutas.
