import entrada from "@/assets/dish-entrada.jpg";
import massa from "@/assets/dish-massa.jpg";
import carne from "@/assets/dish-carne.jpg";
import peixe from "@/assets/dish-peixe.jpg";
import risoto from "@/assets/dish-risoto.jpg";
import sobremesa from "@/assets/dish-sobremesa.jpg";
import drink from "@/assets/dish-drink.jpg";

// Fotos adicionais (uma para cada prato que antes repetia a imagem de outro
// prato da mesma categoria), escolhidas para combinar com o prato real.
//
// Peso: cada card do cardápio mostra no máximo ~380px de largura (grid de
// 3 colunas). Pedíamos w=900&q=80 do Unsplash — quase 3x mais pixels do que
// qualquer card chega a exibir, mesmo em telas retina (2x ≈ 760px). Reduzido
// para w=640&q=68, que cobre retina com folga e reduz o payload de cada
// imagem em torno de 55-65%, sem perda visível de qualidade em miniatura.
const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?w=640&auto=format&fit=crop&q=68`;

const carpaccio = unsplash("photo-1508471349025-ca3e278cf5e2");
const tagliatelle = unsplash("photo-1755677617146-9d69ea16b199");
const cordeiro = unsplash("photo-1507150370052-1e798df49f29");
const bacalhau = unsplash("photo-1519708227418-c8fd9a32b7a2");
const risotoFunghi = unsplash("photo-1723476662512-6abc972f1167");
const tiramisu = unsplash("photo-1571877227200-a0d98ea607e9");
const spritz = unsplash("photo-1578467759626-f94129ea94a4");
const vinho = unsplash("photo-1553361371-9b22f78e8b1d");
const kombucha = unsplash("photo-1573812914274-226dc19fbe17");

export type MenuCategory =
  | "Entradas"
  | "Massas"
  | "Carnes"
  | "Peixes"
  | "Risotos"
  | "Sobremesas"
  | "Drinks"
  | "Bebidas"
  | "Menu Executivo"
  | "Menu Infantil";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  tag?: string;
  category: MenuCategory;
  image: string;
}

export const menuCategories: MenuCategory[] = [
  "Entradas",
  "Massas",
  "Carnes",
  "Peixes",
  "Risotos",
  "Sobremesas",
  "Drinks",
  "Bebidas",
  "Menu Executivo",
  "Menu Infantil",
];

export const menuItems: MenuItem[] = [
  // ---------- Entradas ----------
  {
    id: "burrata",
    name: "Burrata di Puglia",
    description: "Burrata cremosa com tomates heirloom confitados e manjericão fresco.",
    price: 68,
    ingredients: ["Burrata", "Tomate heirloom", "Manjericão", "Azeite extravirgem"],
    tag: "Assinatura",
    category: "Entradas",
    image: entrada,
  },
  {
    id: "carpaccio",
    name: "Carpaccio de Wagyu",
    description: "Lâminas finas de wagyu, alcaparras crocantes e emulsão de trufa.",
    price: 92,
    ingredients: ["Wagyu", "Alcaparras", "Trufa negra", "Parmesão"],
    category: "Entradas",
    image: carpaccio,
  },
  {
    id: "tartar-atum",
    name: "Tartar de Atum Amarelo",
    description: "Atum cortado na hora, abacate, gergelim tostado e molho ponzu cítrico.",
    price: 78,
    ingredients: ["Atum amarelo", "Abacate", "Gergelim", "Ponzu"],
    tag: "Novo",
    category: "Entradas",
    image: peixe,
  },

  // ---------- Massas ----------
  {
    id: "ravioli",
    name: "Ravioli di Salvia",
    description: "Ravioli artesanal recheado de ricota com manteiga de sálvia queimada.",
    price: 96,
    ingredients: ["Massa fresca", "Ricota", "Sálvia", "Manteiga noisette"],
    tag: "Mais pedido",
    category: "Massas",
    image: massa,
  },
  {
    id: "tagliatelle",
    name: "Tagliatelle al Tartufo",
    description: "Tagliatelle fresco ao creme de trufa negra e parmesão 24 meses.",
    price: 118,
    ingredients: ["Tagliatelle", "Trufa negra", "Parmesão", "Creme de leite fresco"],
    category: "Massas",
    image: tagliatelle,
  },
  {
    id: "linguine-vongole",
    name: "Linguine alle Vongole",
    description: "Linguine com berbigões frescos, alho, vinho branco e salsinha.",
    price: 104,
    ingredients: ["Linguine", "Berbigões", "Alho", "Vinho branco"],
    tag: "Novo",
    category: "Massas",
    image: bacalhau,
  },

  // ---------- Carnes ----------
  {
    id: "ancho",
    name: "Ancho Maturado 45 dias",
    description: "Corte maturado grelhado na brasa com redução de vinho tinto.",
    price: 168,
    ingredients: ["Ancho maturado", "Vinho tinto", "Alecrim", "Flor de sal"],
    tag: "Brasa",
    category: "Carnes",
    image: carne,
  },
  {
    id: "cordeiro",
    name: "Cordeiro ao Alecrim",
    description: "Carré de cordeiro selado, jus de ervas e purê de aipo trufado.",
    price: 154,
    ingredients: ["Cordeiro", "Alecrim", "Aipo", "Alho confitado"],
    category: "Carnes",
    image: cordeiro,
  },
  {
    id: "costela",
    name: "Costela Bovina Braseada 12h",
    description: "Costela cozida lentamente, glacê de vinho do porto e polenta cremosa.",
    price: 148,
    ingredients: ["Costela bovina", "Vinho do porto", "Polenta", "Tomilho"],
    tag: "Novo",
    category: "Carnes",
    image: carpaccio,
  },

  // ---------- Peixes ----------
  {
    id: "robalo",
    name: "Robalo em Beurre Blanc",
    description: "Robalo selado com molho de manteiga cítrica e ervas do jardim.",
    price: 142,
    ingredients: ["Robalo", "Manteiga", "Limão siciliano", "Tomilho"],
    tag: "Leve",
    category: "Peixes",
    image: peixe,
  },
  {
    id: "bacalhau",
    name: "Bacalhau Confitado",
    description: "Lombo confitado lentamente em azeite com azeitonas e batata rústica.",
    price: 158,
    ingredients: ["Bacalhau", "Azeite", "Azeitona preta", "Batata"],
    category: "Peixes",
    image: bacalhau,
  },
  {
    id: "camarao-grelhado",
    name: "Camarão Grelhado ao Limão",
    description: "Camarões grandes grelhados na brasa com manteiga de limão siciliano.",
    price: 136,
    ingredients: ["Camarão", "Limão siciliano", "Manteiga", "Páprica defumada"],
    tag: "Novo",
    category: "Peixes",
    image: carne,
  },

  // ---------- Risotos ----------
  {
    id: "risoto-acafrao",
    name: "Risoto de Açafrão",
    description: "Arroz carnaroli cremoso com açafrão espanhol e crisp de parmesão.",
    price: 108,
    ingredients: ["Carnaroli", "Açafrão", "Parmesão", "Vinho branco"],
    tag: "Vegetariano",
    category: "Risotos",
    image: risoto,
  },
  {
    id: "risoto-funghi",
    name: "Risoto de Funghi",
    description: "Cogumelos selvagens salteados, manteiga trufada e ervas frescas.",
    price: 112,
    ingredients: ["Funghi porcini", "Shitake", "Manteiga trufada", "Salsinha"],
    category: "Risotos",
    image: risotoFunghi,
  },
  {
    id: "risoto-camarao",
    name: "Risoto de Camarão e Limão Siciliano",
    description: "Arroz carnaroli, camarões salteados e toque cítrico de limão siciliano.",
    price: 128,
    ingredients: ["Carnaroli", "Camarão", "Limão siciliano", "Manteiga"],
    tag: "Novo",
    category: "Risotos",
    image: bacalhau,
  },

  // ---------- Sobremesas ----------
  {
    id: "chocolate",
    name: "Ouro Negro",
    description: "Cremoso de chocolate 70% com coulis de frutas vermelhas e folha de ouro.",
    price: 54,
    ingredients: ["Chocolate 70%", "Framboesa", "Folha de ouro", "Baunilha"],
    tag: "Assinatura",
    category: "Sobremesas",
    image: sobremesa,
  },
  {
    id: "tiramisu",
    name: "Tiramisù Savora",
    description: "Mascarpone aerado, café espresso e cacau amargo peneirado na hora.",
    price: 48,
    ingredients: ["Mascarpone", "Espresso", "Cacau", "Savoiardi"],
    category: "Sobremesas",
    image: tiramisu,
  },
  {
    id: "panna-cotta",
    name: "Panna Cotta de Baunilha",
    description: "Panna cotta sedosa de baunilha de Madagascar com calda de frutas vermelhas.",
    price: 46,
    ingredients: ["Creme de leite", "Baunilha", "Frutas vermelhas", "Gelatina"],
    tag: "Novo",
    category: "Sobremesas",
    image: carpaccio,
  },

  // ---------- Drinks ----------
  {
    id: "negroni",
    name: "Negroni Defumado",
    description: "Gin artesanal, vermute e bitter com defumação de madeira de carvalho.",
    price: 46,
    ingredients: ["Gin", "Campari", "Vermute rosso", "Fumaça de carvalho"],
    tag: "Autoral",
    category: "Drinks",
    image: drink,
  },
  {
    id: "spritz",
    name: "Spritz de Pêssego",
    description: "Prosecco, licor de pêssego branco e água tônica artesanal.",
    price: 42,
    ingredients: ["Prosecco", "Pêssego", "Tônica", "Hortelã"],
    category: "Drinks",
    image: spritz,
  },
  {
    id: "mojito-frutas",
    name: "Mojito de Frutas Vermelhas",
    description: "Rum branco, frutas vermelhas frescas, hortelã e água com gás.",
    price: 44,
    ingredients: ["Rum branco", "Frutas vermelhas", "Hortelã", "Limão"],
    tag: "Novo",
    category: "Drinks",
    image: vinho,
  },

  // ---------- Bebidas ----------
  {
    id: "vinho",
    name: "Seleção do Sommelier",
    description: "Taça de tinto ou branco escolhida diariamente pela nossa sommelière.",
    price: 38,
    ingredients: ["Rótulos rotativos", "Harmonização inclusa"],
    category: "Bebidas",
    image: vinho,
  },
  {
    id: "kombucha",
    name: "Kombucha da Casa",
    description: "Fermentação própria com gengibre, capim-limão e mel silvestre.",
    price: 26,
    ingredients: ["Chá verde", "Gengibre", "Capim-limão", "Mel"],
    tag: "Sem álcool",
    category: "Bebidas",
    image: kombucha,
  },
  {
    id: "suco-natural",
    name: "Suco Natural da Estação",
    description: "Suco 100% natural preparado na hora com frutas da estação.",
    price: 22,
    ingredients: ["Frutas da estação", "Água de coco"],
    tag: "Novo",
    category: "Bebidas",
    image: spritz,
  },

  // ---------- Menu Executivo ----------
  {
    id: "exec-almoco",
    name: "Menu Executivo do Chef",
    description: "Entrada, prato principal e sobremesa servidos de terça a sexta no almoço.",
    price: 129,
    ingredients: ["3 tempos", "Couvert incluso", "Café espresso"],
    tag: "Seg a Sex",
    category: "Menu Executivo",
    image: risoto,
  },
  {
    id: "exec-veg",
    name: "Executivo Vegetariano",
    description: "Três tempos de base vegetal com produtos de pequenos produtores.",
    price: 118,
    ingredients: ["Legumes de estação", "Grãos", "Ervas do jardim"],
    tag: "Vegetariano",
    category: "Menu Executivo",
    image: entrada,
  },
  {
    id: "exec-peixe",
    name: "Executivo Peixe do Dia",
    description: "Peixe fresco do dia, acompanhamento e sobremesa, servido no almoço.",
    price: 124,
    ingredients: ["Peixe do dia", "Legumes salteados", "Sobremesa do dia"],
    tag: "Novo",
    category: "Menu Executivo",
    image: peixe,
  },

  // ---------- Menu Infantil ----------
  {
    id: "kids-massa",
    name: "Massinha do Chef",
    description: "Talharim ao molho de tomate fresco com queijo gratinado.",
    price: 52,
    ingredients: ["Talharim", "Tomate fresco", "Muçarela"],
    tag: "Kids",
    category: "Menu Infantil",
    image: massa,
  },
  {
    id: "kids-frango",
    name: "Mini Frango Dourado",
    description: "Iscas de frango empanadas em panko com purê aveludado.",
    price: 56,
    ingredients: ["Frango", "Panko", "Batata", "Manteiga"],
    category: "Menu Infantil",
    image: carne,
  },
  {
    id: "kids-sanduiche",
    name: "Sanduichinho do Chef",
    description: "Pão brioche, queijo derretido e batatas rústicas ao forno.",
    price: 48,
    ingredients: ["Pão brioche", "Queijo", "Batata rústica"],
    tag: "Novo",
    category: "Menu Infantil",
    image: risotoFunghi,
  },
];
