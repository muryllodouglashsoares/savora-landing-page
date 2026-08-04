export const site = {
  name: "Savora",
  tagline: "Cozinha contemporânea",
  phone: "+55 11 4002-8922",
  whatsapp: "https://wa.me/5511400289220",
  address: "Rua das Oliveiras, 1287 — Jardins, São Paulo",
  hours: [
    { day: "Terça a Quinta", time: "18h — 23h" },
    { day: "Sexta e Sábado", time: "12h — 00h" },
    { day: "Domingo", time: "12h — 17h" },
  ],
  nav: [
    { label: "Cardápio", href: "#cardapio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Especialidades", href: "#especialidades" },
    { label: "Galeria", href: "#galeria" },
    { label: "Reservas", href: "#reservas" },
    { label: "Contato", href: "#localizacao" },
  ],
};

export const specialties = [
  {
    title: "Brasa Viva",
    description: "Fogo de lenha controlado a 400°C para selar cortes maturados por até 45 dias.",
    icon: "Flame",
  },
  {
    title: "Massa Fresca",
    description: "Sovada diariamente às 6h, com semolina italiana e ovos caipiras.",
    icon: "Wheat",
  },
  {
    title: "Mar do Dia",
    description: "Pescados recebidos pela manhã direto da costa de Ubatuba.",
    icon: "Fish",
  },
  {
    title: "Adega Curada",
    description: "220 rótulos selecionados por nossa sommelière para cada tempo do menu.",
    icon: "Wine",
  },
];

export const ingredients = [
  { name: "Trufa Negra", origin: "Alba, Itália", icon: "Sparkles" },
  { name: "Azeite Extravirgem", origin: "Primeira prensa a frio", icon: "Droplets" },
  { name: "Ervas do Jardim", origin: "Horta própria", icon: "Leaf" },
  { name: "Parmesão 24 meses", origin: "Reggio Emilia", icon: "CircleDot" },
  { name: "Sal de Flor", origin: "Algarve, Portugal", icon: "Snowflake" },
  { name: "Pimenta Sarawak", origin: "Bornéu, Malásia", icon: "Flame" },
];

export const reviews = [
  {
    name: "Marina Duarte",
    role: "Crítica gastronômica",
    text: "O tagliatelle ao tartufo é, sem exagero, o melhor prato de massa da cidade neste ano.",
    rating: 5,
  },
  {
    name: "Rafael Lins",
    role: "Cliente desde 2019",
    text: "Serviço impecável, iluminação perfeita e uma carta de vinhos que surpreende a cada visita.",
    rating: 5,
  },
  {
    name: "Helena Prado",
    role: "Chef convidada",
    text: "A técnica na brasa é precisa. Cada corte chega no ponto exato, com aroma de lenha real.",
    rating: 5,
  },
  {
    name: "Tomás Ferreira",
    role: "Sommelier",
    text: "Harmonizações inteligentes e uma equipe que entende profundamente cada rótulo servido.",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "Preciso reservar com antecedência?",
    a: "Recomendamos reservar com pelo menos 48 horas. Sextas e sábados costumam esgotar na mesma semana.",
  },
  {
    q: "Há opções vegetarianas e sem glúten?",
    a: "Sim. Todo o menu possui versões adaptadas, e nossa cozinha trabalha com estações separadas para evitar contaminação cruzada.",
  },
  {
    q: "Existe dress code?",
    a: "Sugerimos traje smart casual. Não exigimos terno, mas evitamos bermudas e chinelos no jantar.",
  },
  {
    q: "Vocês recebem grupos e eventos privados?",
    a: "Temos um salão reservado para até 24 pessoas, com menus degustação exclusivos criados pelo chef.",
  },
  {
    q: "Há estacionamento no local?",
    a: "Oferecemos manobrista das 18h às 00h, com acesso direto pela Rua das Oliveiras.",
  },
];
