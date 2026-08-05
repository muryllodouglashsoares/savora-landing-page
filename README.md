# Savora — Landing Page

Landing page premium para o **Savora**, um restaurante contemporâneo fictício. Site institucional com cardápio digital, seções de apresentação do restaurante e formulário de reservas — construído como peça de portfólio, com foco em animação de alto padrão e performance.

## Stack

- **React 19** + **TypeScript**
- **TanStack Start** (SSR) + **TanStack Router**
- **Vite**
- **Tailwind CSS 4**
- **Motion** (Framer Motion) para animações
- **shadcn/ui** + **Radix UI** para primitivos de interface
- **React Hook Form** + **Zod** para o formulário de reservas
- **ESLint** + **Prettier**

## Como rodar

Requer Node.js e npm (ou Bun, já que o projeto tem `bun.lock`).

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
│   └── ui/                # componentes shadcn/ui (button, dialog, accordion, etc.)
├── data/                # dados do cardápio (menu.ts)
├── hooks/               # hooks utilitários (ex.: use-mobile)
├── lib/                  # sistema de motion compartilhado, utils, error reporting
└── routes/               # rotas do TanStack Router (__root, index)
```

## A Hero Section

A Hero simula um chef montando o prato: os ingredientes caem sobre o prato um a um, com leve rotação e um pequeno *bounce* ao pousar, seguidos por um brilho final e uma polvilhada de tempero. A animação roda **uma única vez**, ao carregar a página — nunca se repete no scroll — e depois fica completamente parada.

A lógica é dividida em componentes pequenos e reutilizáveis dentro de `src/components/hero/`:

| Componente | Responsabilidade |
|---|---|
| `Hero.tsx` | Orquestra a seção: copy, botões, parallax de scroll e tilt do mouse. |
| `PlateAnimation.tsx` | Sequencia a montagem do prato (prato base → ingredientes → aproximação de câmera → brilho → partículas). |
| `Ingredient.tsx` | Uma peça caindo: queda, rotação, bounce e acomodação — sem loops. |
| `ShineEffect.tsx` | Brilho único que passa sobre o prato ao final da montagem. |
| `SeasoningParticles.tsx` | Rajada curta e finita de partículas de tempero. |

**Decisões de performance** (a versão anterior usava dezenas de animações em loop infinito e filtros de blur pesados, o que pesava bastante em CPU/GPU):

- Anima apenas `transform` e `opacity` — nunca propriedades que causam repaint.
- Nenhuma animação usa `repeat: Infinity`; tudo roda uma vez e para.
- `will-change` é aplicado só enquanto a peça está caindo e removido assim que ela se acomoda.
- Sem `filter: blur()` pesado nas peças; sombras leves e pontuais.
- Respeita `prefers-reduced-motion`: quando ativado, o prato já aparece pronto, sem nenhuma animação.
- No mobile, a sequência usa menos peças (agrupadas), timeline mais rápida e menos partículas.
- Apenas a imagem principal do prato (`hero-dish.webp`) é pré-carregada (`<link rel="preload">` no `__root.tsx`); as demais imagens carregam sob demanda (`loading="lazy"`).

## Cardápio digital

Os itens do cardápio ficam em `src/data/menu.ts`, organizados por categoria (Entradas, Massas, Carnes, Peixes, Risotos, Sobremesas, Drinks, Bebidas, Menu Executivo, Menu Infantil). Cada item tem imagem, nome, descrição, preço, ingredientes e uma tag opcional.

## Notas

- Este projeto foi iniciado no [Lovable](https://lovable.dev) e depois evoluído manualmente.
- Preparado para futuras integrações (Google Maps na seção de Localização, envio de reservas, WhatsApp), atualmente com placeholders elegantes.
