import entrada from "@/assets/dish-entrada.jpg";
import massa from "@/assets/dish-massa.jpg";
import carne from "@/assets/dish-carne.jpg";
import peixe from "@/assets/dish-peixe.jpg";
import risoto from "@/assets/dish-risoto.jpg";
import sobremesa from "@/assets/dish-sobremesa.jpg";
import drink from "@/assets/dish-drink.jpg";

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
    image: entrada,
  },
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
    image: massa,
  },
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
    image: carne,
  },
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
    image: peixe,
  },
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
    image: risoto,
  },
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
    image: sobremesa,
  },
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
    image: drink,
  },
  {
    id: "vinho",
    name: "Seleção do Sommelier",
    description: "Taça de tinto ou branco escolhida diariamente pela nossa sommelière.",
    price: 38,
    ingredients: ["Rótulos rotativos", "Harmonização inclusa"],
    category: "Bebidas",
    image: drink,
  },
  {
    id: "kombucha",
    name: "Kombucha da Casa",
    description: "Fermentação própria com gengibre, capim-limão e mel silvestre.",
    price: 26,
    ingredients: ["Chá verde", "Gengibre", "Capim-limão", "Mel"],
    tag: "Sem álcool",
    category: "Bebidas",
    image: drink,
  },
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
];
