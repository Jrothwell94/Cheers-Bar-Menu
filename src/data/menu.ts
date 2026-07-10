import type { TagId } from "./tags";
import { tags as tagInfo } from "./tags";

export type MenuItem = {
  slug: string;
  name: string;
  category: string;
  price: string;
  tagline: string;
  ingredients: string[];
  history: string;
  image?: string;
  tags?: TagId[];
};

export type MenuCategory = {
  id: string;
  name: string;
};

export const categories: MenuCategory[] = [
  { id: "cocktails", name: "Cocktails" },
  { id: "greek-favourites", name: "Greek Favourites" },
  { id: "beers", name: "Beers" },
  { id: "wine", name: "Wine" },
  { id: "soft-drinks", name: "Soft Drinks" },
];

export const menuItems: MenuItem[] = [
  {
    slug: "mojito",
    name: "Mojito",
    category: "cocktails",
    price: "€8.50",
    tagline: "Cuban rum highball with mint & lime",
    ingredients: ["White rum", "Fresh lime juice", "Sugar", "Soda water", "Mint leaves"],
    history:
      "The Mojito's roots trace back to 16th-century Havana, evolving from an earlier drink called 'El Draque'. It became a staple of Cuban bar culture and was famously Ernest Hemingway's drink of choice at La Bodeguita del Medio.",
    tags: ["refreshing"],
  },
  {
    slug: "margarita",
    name: "Margarita",
    category: "cocktails",
    price: "€8.50",
    tagline: "Tequila, lime and orange liqueur, salt rim",
    ingredients: ["Tequila", "Triple sec", "Fresh lime juice", "Salt rim"],
    history:
      "One of the world's most ordered cocktails, the Margarita's exact origin is disputed, with several bartenders in 1930s-40s Mexico claiming to have invented it. Its name is Spanish for 'daisy'.",
    tags: ["classic", "refreshing"],
  },
  {
    slug: "old-fashioned",
    name: "Old Fashioned",
    category: "cocktails",
    price: "€9.50",
    tagline: "Whiskey, sugar and bitters, stirred not shaken",
    ingredients: ["Bourbon or rye whiskey", "Sugar cube", "Angostura bitters", "Orange twist"],
    history:
      "Widely considered one of the oldest known cocktails, the Old Fashioned dates to the early 1800s and was originally simply called a 'whiskey cocktail' — spirit, sugar, water and bitters.",
    tags: ["strong", "classic"],
  },
  {
    slug: "negroni",
    name: "Negroni",
    category: "cocktails",
    price: "€9.00",
    tagline: "Bold, bitter Italian aperitif",
    ingredients: ["Gin", "Campari", "Sweet vermouth", "Orange peel"],
    history:
      "Legend has it the Negroni was born in Florence in 1919, when Count Camillo Negroni asked a bartender to strengthen his usual Americano by swapping the soda water for gin.",
    tags: ["bitter", "strong", "classic"],
  },
  {
    slug: "espresso-martini",
    name: "Espresso Martini",
    category: "cocktails",
    price: "€9.50",
    tagline: "Vodka, coffee liqueur and a hit of espresso",
    ingredients: ["Vodka", "Coffee liqueur", "Fresh espresso", "Sugar syrup"],
    history:
      "Created in 1980s London by legendary bartender Dick Bradsell, this drink was invented on the spot for a customer who asked for something that would wake her up. It's remained a global favourite ever since.",
    tags: ["strong", "classic"],
  },
  {
    slug: "aperol-spritz",
    name: "Aperol Spritz",
    category: "cocktails",
    price: "€8.00",
    tagline: "Bright, bittersweet Italian aperitivo",
    ingredients: ["Aperol", "Prosecco", "Soda water", "Orange slice"],
    history:
      "Born in Venice, the Spritz has roots in the Austro-Hungarian era, but the Aperol version took off from the 2000s onward to become one of the most popular aperitivo drinks in the world.",
    tags: ["refreshing", "bitter"],
  },
  {
    slug: "mai-tai",
    name: "Mai Tai",
    category: "cocktails",
    price: "€10.00",
    tagline: "Tiki classic with rum, lime and orgeat",
    ingredients: ["Aged rum", "Lime juice", "Orgeat", "Orange curaçao"],
    history:
      "Created in 1944 at Trader Vic's in Oakland, California, the Mai Tai kicked off the mid-century tiki bar craze. Its name comes from the Tahitian phrase 'maita'i roa a'e', meaning 'out of this world - the best'.",
    tags: ["fruity", "tropical"],
  },
  {
    slug: "pornstar-martini",
    name: "Pornstar Martini",
    category: "cocktails",
    price: "€10.00",
    tagline: "Passion fruit & vanilla vodka, Prosecco on the side",
    ingredients: ["Vanilla vodka", "Passion fruit puree", "Passion fruit liqueur", "Lime juice", "Prosecco (side pour)"],
    history:
      "Invented by London bartender Douglas Ankrah in the early 2000s, this modern classic has become one of the most popular cocktails of the last two decades.",
    tags: ["fruity", "tropical"],
  },
  {
    slug: "frozen-strawberry-daiquiri",
    name: "Frozen Strawberry Daiquiri",
    category: "cocktails",
    price: "€9.00",
    tagline: "Blended rum, strawberry and lime",
    ingredients: ["White rum", "Fresh strawberries", "Lime juice", "Sugar syrup", "Crushed ice"],
    history:
      "The Daiquiri dates back to early 1900s Cuba, named after a mining town near Santiago. The frozen, blended version took off in the mid-20th century as electric blenders became common behind the bar.",
    tags: ["frozen", "fruity", "refreshing"],
  },
  {
    slug: "metaxa",
    name: "Metaxa",
    category: "greek-favourites",
    price: "€6.50",
    tagline: "Greece's iconic amber spirit",
    ingredients: ["Metaxa (brandy & wine distillate blend)", "Served neat or on ice"],
    history:
      "Created in 1888 by Spyros Metaxas, this uniquely Greek spirit blends aged brandy, Muscat wines and a secret mix of botanicals. It's not quite a brandy, not quite a wine — Greeks simply call it Metaxa.",
  },
  {
    slug: "ouzo",
    name: "Ouzo",
    category: "greek-favourites",
    price: "€6.00",
    tagline: "Anise-flavoured spirit, served with ice & water",
    ingredients: ["Ouzo", "Water", "Ice"],
    history:
      "Greece's national spirit, ouzo is distilled with anise and other botanicals. Traditionally sipped slowly alongside meze, it turns a cloudy white — locals call this the 'louche effect' — the moment water hits the glass.",
  },
  {
    slug: "verdea",
    name: "Verdea (Zakynthos White)",
    category: "greek-favourites",
    price: "€7.00 / glass",
    tagline: "A rare native wine, grown right here on the island",
    ingredients: ["Verdea grape blend (Skiadopoulo, Goustolidi & Pavlos)"],
    history:
      "Verdea is a traditional wine made almost exclusively on Zakynthos, aged for years in old wooden barrels to develop its distinctive, slightly oxidative character. It's one of the island's proudest and best-kept secrets.",
  },
  {
    slug: "mythos",
    name: "Mythos",
    category: "beers",
    price: "€4.50",
    tagline: "Crisp Greek lager",
    ingredients: ["Pilsner malt", "Hops", "Water", "Yeast"],
    history:
      "Launched in 1997, Mythos quickly became one of Greece's most recognisable lagers, known for its light, easy-drinking character — a perfect match for warm island evenings.",
  },
  {
    slug: "fix-hellas",
    name: "Fix Hellas",
    category: "beers",
    price: "€4.50",
    tagline: "Greece's original beer brand",
    ingredients: ["Malt", "Hops", "Water", "Yeast"],
    history:
      "The Fix name dates back to 1864, when Johann Karl Fuchs founded Greece's very first brewery in Athens. The brand faded in the 1980s but was later revived, reviving a genuine piece of Greek brewing history.",
  },
  {
    slug: "draft-lager",
    name: "House Draft Lager",
    category: "beers",
    price: "€4.00",
    tagline: "Cold, crisp, always on tap",
    ingredients: ["Draft lager"],
    history:
      "Our house draft — cold, reliable, and best enjoyed with your feet up and a sea view.",
  },
  {
    slug: "house-red",
    name: "House Red Wine",
    category: "wine",
    price: "€6.00 / glass",
    tagline: "Smooth, medium-bodied red",
    ingredients: ["Red wine blend"],
    history:
      "Our house red is a smooth, approachable blend chosen to pair well with everything from meze to a late-night glass on its own.",
  },
  {
    slug: "assyrtiko",
    name: "Assyrtiko",
    category: "wine",
    price: "€7.50 / glass",
    tagline: "Crisp, mineral white from Santorini",
    ingredients: ["Assyrtiko grape"],
    history:
      "Originating from the volcanic soils of Santorini, Assyrtiko has become Greece's most celebrated white grape, prized worldwide for its bright acidity and mineral edge.",
  },
  {
    slug: "coca-cola",
    name: "Coca-Cola",
    category: "soft-drinks",
    price: "€3.00",
    tagline: "Classic, ice-cold",
    ingredients: ["Coca-Cola"],
    history: "Some things don't need reinventing.",
  },
  {
    slug: "fresh-lemonade",
    name: "Fresh Lemonade",
    category: "soft-drinks",
    price: "€3.50",
    tagline: "Squeezed fresh, not from a bottle",
    ingredients: ["Fresh lemon juice", "Sugar syrup", "Soda water", "Mint"],
    history: "Made fresh behind the bar with real lemons — nothing from a syrup gun.",
  },
  {
    slug: "sparkling-water",
    name: "Sparkling Water",
    category: "soft-drinks",
    price: "€2.50",
    tagline: "Chilled and bubbly",
    ingredients: ["Sparkling water"],
    history: "",
  },
];

export function getItemBySlug(slug: string) {
  return menuItems.find((item) => item.slug === slug);
}

export function getItemsByCategory(categoryId: string) {
  return menuItems.filter((item) => item.category === categoryId);
}

export function getTagsForCategory(categoryId: string): TagId[] {
  const used = new Set<TagId>();
  for (const item of getItemsByCategory(categoryId)) {
    item.tags?.forEach((t) => used.add(t));
  }
  return (Object.keys(tagInfo) as TagId[]).filter((id) => used.has(id));
}
