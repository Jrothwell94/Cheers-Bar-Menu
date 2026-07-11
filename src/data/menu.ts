import type { TagId } from "./tags";
import { tags as tagInfo } from "./tags";

export type MenuItem = {
  slug: string;
  name: string;
  category: string;
  subcategory?: string;
  group?: string;
  price: string;
  tagline: string;
  ingredients: string[];
  history: string;
  image?: string;
  tags?: TagId[];
};

export type MenuSubcategory = {
  id: string;
  name: string;
};

export type MenuGroup = {
  id: string;
  name: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  subcategories?: MenuSubcategory[];
  groups?: MenuGroup[];
};

export const categories: MenuCategory[] = [
  {
    id: "cocktails",
    name: "Cocktails",
    groups: [
      { id: "vodka", name: "Vodka Based" },
      { id: "rum", name: "Rum Based" },
      { id: "gin", name: "Gin Based" },
      { id: "tequila", name: "Tequila Based" },
      { id: "whiskey", name: "Whiskey Based" },
      { id: "other", name: "Other" },
      { id: "mocktails", name: "Mocktails" },
    ],
  },
  {
    id: "spirits",
    name: "Spirits",
    subcategories: [
      { id: "whiskeys", name: "Whiskeys" },
      { id: "rums", name: "Rums" },
      { id: "gins", name: "Gins" },
      { id: "vodkas", name: "Vodkas" },
    ],
  },
  {
    id: "beers",
    name: "Beers",
    groups: [
      { id: "draught", name: "Draught" },
      { id: "bottles", name: "Bottles" },
    ],
  },
  {
    id: "ciders",
    name: "Ciders",
    groups: [
      { id: "draught", name: "Draught" },
      { id: "bottles-cans", name: "Bottles / Cans" },
    ],
  },
  { id: "wine", name: "Wine" },
  { id: "alcopops", name: "Alcopops" },
  { id: "soft-drinks", name: "Soft Drinks" },
  { id: "greek-favourites", name: "Greek Favourites" },
];

export const menuItems: MenuItem[] = [
  {
    slug: "mojito",
    name: "Mojito",
    category: "cocktails",
    group: "rum",
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
    group: "tequila",
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
    group: "whiskey",
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
    group: "gin",
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
    group: "vodka",
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
    group: "other",
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
    group: "rum",
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
    group: "vodka",
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
    group: "rum",
    price: "€9.00",
    tagline: "Blended rum, strawberry and lime",
    ingredients: ["White rum", "Fresh strawberries", "Lime juice", "Sugar syrup", "Crushed ice"],
    history:
      "The Daiquiri dates back to early 1900s Cuba, named after a mining town near Santiago. The frozen, blended version took off in the mid-20th century as electric blenders became common behind the bar.",
    tags: ["frozen", "fruity", "refreshing"],
  },
  {
    slug: "cheers-sunset",
    name: "Cheers Sunset (Mocktail)",
    category: "cocktails",
    group: "mocktails",
    price: "€5.50",
    tagline: "Non-alcoholic tropical sunset in a glass",
    ingredients: ["Orange juice", "Passion fruit syrup", "Grenadine", "Soda water", "Fresh orange slice"],
    history:
      "Our alcohol-free house special, built in layers so the grenadine settles at the base like the sun dipping over the bay — all the ritual of a great cocktail, none of the alcohol.",
    tags: ["fruity", "refreshing", "tropical"],
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
    slug: "captain-morgan-spiced",
    name: "Captain Morgan Spiced",
    category: "spirits",
    subcategory: "rums",
    price: "€6.50",
    tagline: "Golden rum with vanilla & spice",
    ingredients: [],
    history:
      "Named after the 17th-century privateer Sir Henry Morgan, this spiced rum blend has become one of the world's best-selling rum brands since its launch in Jamaica in the 1940s.",
  },
  {
    slug: "captain-morgan-dark",
    name: "Captain Morgan Dark",
    category: "spirits",
    subcategory: "rums",
    price: "€6.50",
    tagline: "Rich, full-bodied dark rum",
    ingredients: [],
    history:
      "A deeper, more molasses-forward expression than its spiced sibling, favoured by those who like a bolder rum on the rocks or in a classic rum and cola.",
  },
  {
    slug: "bacardi-white",
    name: "Bacardi White",
    category: "spirits",
    subcategory: "rums",
    price: "€6.00",
    tagline: "Light, smooth Cuban-style rum",
    ingredients: [],
    history:
      "Founded in Santiago de Cuba in 1862, Bacardi pioneered the light, filtered rum style that's now the backbone of countless classic cocktails, from the Daiquiri to the Mojito.",
  },
  {
    slug: "bacardi-black",
    name: "Bacardi Black",
    category: "spirits",
    subcategory: "rums",
    price: "€6.50",
    tagline: "Full-bodied aged dark rum",
    ingredients: [],
    history:
      "Aged longer than the classic white, Bacardi's dark rum brings deeper caramel and oak notes, best enjoyed neat, on the rocks, or in a Cuba Libre.",
  },
  {
    slug: "kraken-rum",
    name: "Kraken",
    category: "spirits",
    subcategory: "rums",
    price: "€7.00",
    tagline: "Bold black spiced rum",
    ingredients: [],
    history:
      "Named after the legendary sea monster, Kraken is a jet-black spiced rum from Trinidad & Tobago, known for its bold molasses, vanilla and spice character.",
  },
  {
    slug: "dead-mans-fingers",
    name: "Dead Man's Fingers",
    category: "spirits",
    subcategory: "rums",
    price: "€7.00",
    tagline: "Cornish spiced rum",
    ingredients: [],
    history:
      "A newer name on the rum scene, this Cornwall-distilled spiced rum has built a cult following for its bold branding and punchy, spice-forward flavour.",
  },
  {
    slug: "havana-club-7",
    name: "Havana Club Seven",
    category: "spirits",
    subcategory: "rums",
    price: "€8.00",
    tagline: "Aged 7 years, rich Cuban rum",
    ingredients: [],
    history:
      "Distilled and aged in Cuba for seven years, this is one of the island's most celebrated rums — deep, smooth and traditionally sipped neat or over a single large ice cube.",
  },
  {
    slug: "don-papa",
    name: "Don Papa",
    category: "spirits",
    subcategory: "rums",
    price: "€8.50",
    tagline: "Smooth Filipino rum, aged in the mountains",
    ingredients: [],
    history:
      "Named after a local folk hero, Don Papa is aged in the foothills of Mount Kanlaon in the Philippines, prized for its smooth, naturally sweet caramel and vanilla character.",
  },
  {
    slug: "don-papa-baroko",
    name: "Don Papa Baroko",
    category: "spirits",
    subcategory: "rums",
    price: "€9.00",
    tagline: "Don Papa infused with rich cacao",
    ingredients: [],
    history:
      "A cacao-infused twist on the original Don Papa, blending the rum's signature smoothness with rich Filipino cocoa for a dessert-like sipping rum.",
  },
  {
    slug: "alfa-pint",
    name: "Alfa Pint",
    category: "beers",
    group: "draught",
    price: "€5.00",
    tagline: "Alfa on tap, poured fresh",
    ingredients: ["Malt", "Hops", "Water", "Yeast"],
    history:
      "Brewed since 1965 by Athenian Brewery, Alfa is one of Greece's longest-running lager brands — a staple in tavernas and bars across the country.",
  },
  {
    slug: "alfa-half-pint",
    name: "Alfa 1/2 Pint",
    category: "beers",
    group: "draught",
    price: "€3.00",
    tagline: "A lighter pour of Alfa on tap",
    ingredients: ["Malt", "Hops", "Water", "Yeast"],
    history:
      "Brewed since 1965 by Athenian Brewery, Alfa is one of Greece's longest-running lager brands — a staple in tavernas and bars across the country.",
  },
  {
    slug: "milokleftis",
    name: "Milokleftis (400ml)",
    category: "ciders",
    group: "draught",
    price: "€5.00",
    tagline: "Greek apple cider on tap",
    ingredients: ["Apple juice", "Yeast"],
    history:
      "Milokleftis — Greek for 'apple thief' — is a crisp, refreshing Greek cider served straight from the tap.",
  },
  {
    slug: "alfa",
    name: "Alfa",
    category: "beers",
    group: "bottles",
    price: "€4.50",
    tagline: "Greece's crisp everyday lager",
    ingredients: ["Malt", "Hops", "Water", "Yeast"],
    history:
      "Brewed since 1965 by Athenian Brewery, Alfa is one of Greece's longest-running lager brands — a staple in tavernas and bars across the country.",
  },
  {
    slug: "fix-hellas",
    name: "Fix",
    category: "beers",
    group: "bottles",
    price: "€4.50",
    tagline: "Greece's original beer brand",
    ingredients: ["Malt", "Hops", "Water", "Yeast"],
    history:
      "The Fix name dates back to 1864, when Johann Karl Fuchs founded Greece's very first brewery in Athens. The brand faded in the 1980s but was later revived, reviving a genuine piece of Greek brewing history.",
  },
  {
    slug: "mythos",
    name: "Mythos",
    category: "beers",
    group: "bottles",
    price: "€4.50",
    tagline: "Crisp Greek lager",
    ingredients: ["Pilsner malt", "Hops", "Water", "Yeast"],
    history:
      "Launched in 1997, Mythos quickly became one of Greece's most recognisable lagers, known for its light, easy-drinking character — a perfect match for warm island evenings.",
  },
  {
    slug: "amstel",
    name: "Amstel",
    category: "beers",
    group: "bottles",
    price: "€4.50",
    tagline: "Smooth Dutch pilsner",
    ingredients: ["Pilsner malt", "Hops", "Water", "Yeast"],
    history:
      "Brewed in Amsterdam since 1870, Amstel is one of the Netherlands' best-known lagers and part of the worldwide Heineken family.",
  },
  {
    slug: "radler",
    name: "Radler",
    category: "beers",
    group: "bottles",
    price: "€4.50",
    tagline: "Lager cut with lemon",
    ingredients: ["Lager", "Lemon"],
    history:
      "The Radler style dates back to 1922 Bavaria, when a brewer stretched his beer supply with lemonade for a hot day's cyclists — light, refreshing, and low on the alcohol.",
  },
  {
    slug: "mamos",
    name: "Mamos",
    category: "beers",
    group: "bottles",
    price: "€4.50",
    tagline: "Easy-drinking local lager",
    ingredients: ["Malt", "Hops", "Water", "Yeast"],
    history:
      "A smooth, sessionable lager popular on the islands for its light, easy-drinking character.",
  },
  {
    slug: "amstel-alcohol-free",
    name: "Amstel (Alc Free)",
    category: "beers",
    group: "bottles",
    price: "€4.50",
    tagline: "All the Amstel flavour, none of the alcohol",
    ingredients: ["Pilsner malt", "Hops", "Water", "Yeast"],
    history:
      "A dealcoholised version of the classic Amstel pilsner, brewed for full flavour at under 0.5% ABV.",
  },
  {
    slug: "heineken",
    name: "Heineken",
    category: "beers",
    group: "bottles",
    price: "€5.00",
    tagline: "The world's favourite green-bottle lager",
    ingredients: ["Pale malt", "Hops", "Water", "Yeast"],
    history:
      "Founded in Amsterdam in 1873 by Gerard Adriaan Heineken, it's now one of the most recognised beer brands on the planet.",
  },
  {
    slug: "budweiser",
    name: "Budweiser",
    category: "beers",
    group: "bottles",
    price: "€5.00",
    tagline: "Crisp American-style lager",
    ingredients: ["Barley malt", "Rice", "Hops", "Water"],
    history:
      "Brewed by Anheuser-Busch since 1876 and beechwood-aged, Budweiser is one of the best-selling beers in the United States.",
  },
  {
    slug: "corona",
    name: "Corona",
    category: "beers",
    group: "bottles",
    price: "€6.00",
    tagline: "Mexican pale lager, served with lime",
    ingredients: ["Pale malt", "Corn", "Hops", "Water"],
    history:
      "Brewed in Mexico since 1925, Corona's clear bottle and lime wedge have made it a beach-bar icon worldwide.",
  },
  {
    slug: "guinness-can",
    name: "Guinness Can",
    category: "beers",
    group: "bottles",
    price: "€6.00",
    tagline: "Ireland's legendary dry stout",
    ingredients: ["Roasted barley", "Hops", "Water", "Yeast"],
    history:
      "Brewed at St. James's Gate, Dublin since 1759, Guinness's roasted barley gives it that famous dark colour and creamy head.",
  },
  {
    slug: "john-smiths",
    name: "John Smiths",
    category: "beers",
    group: "bottles",
    price: "€6.00",
    tagline: "Classic smooth English bitter",
    ingredients: ["Pale malt", "Hops", "Water", "Yeast"],
    history:
      "Brewed in Tadcaster, Yorkshire since 1758, John Smith's is one of Britain's best-known bitters, prized for its smooth, creamy pour.",
  },
  {
    slug: "kopparberg-strawberry",
    name: "Kopparberg Strawberry",
    category: "ciders",
    group: "bottles-cans",
    price: "€6.00",
    tagline: "Swedish fruit cider, served over ice",
    ingredients: ["Cider", "Strawberry flavouring"],
    history:
      "Kopparberg has been brewing in Sweden since 1882; its fruit ciders helped popularise the style worldwide.",
  },
  {
    slug: "kopparberg-mixed-fruit",
    name: "Kopparberg Mixed Fruit",
    category: "ciders",
    group: "bottles-cans",
    price: "€6.00",
    tagline: "Swedish fruit cider, served over ice",
    ingredients: ["Cider", "Mixed fruit flavouring"],
    history:
      "Kopparberg has been brewing in Sweden since 1882; its fruit ciders helped popularise the style worldwide.",
  },
  {
    slug: "strongbow",
    name: "Strongbow",
    category: "ciders",
    group: "bottles-cans",
    price: "€5.50",
    tagline: "Classic English dry cider",
    ingredients: ["Apple juice", "Yeast"],
    history:
      "Bulmers has brewed Strongbow in Hereford since 1960; it's one of the world's best-selling ciders.",
  },
  {
    slug: "magners",
    name: "Magners (500ml)",
    category: "ciders",
    group: "bottles-cans",
    price: "€6.00",
    tagline: "Irish cider, traditionally served over ice",
    ingredients: ["Apple juice", "Yeast"],
    history:
      "Made in Clonmel, County Tipperary since 1935, Magners (sold as Bulmers in Ireland) is traditionally poured over ice.",
  },
  {
    slug: "smirnoff-ice",
    name: "Smirnoff Ice",
    category: "alcopops",
    price: "€5.00",
    tagline: "Vodka-based lemon alcopop",
    ingredients: ["Vodka", "Malt base", "Lemon flavouring"],
    history:
      "Launched in the late 1990s, Smirnoff Ice popularised the modern flavoured malt beverage — or 'alcopop' — category.",
  },
  {
    slug: "bacardi-breezer",
    name: "Bacardi Breezer",
    category: "alcopops",
    price: "€5.00",
    tagline: "Fruity rum-based alcopop",
    ingredients: ["Rum", "Fruit juice"],
    history:
      "Introduced by Bacardi in the 1990s, Breezer became one of the defining alcopops of the era, sold in a range of fruit flavours.",
  },
  {
    slug: "white-wine",
    name: "White Wine",
    category: "wine",
    price: "€3.00 / glass",
    tagline: "Crisp house white, served chilled",
    ingredients: ["White wine"],
    history: "Our house white — light, crisp and always chilled.",
  },
  {
    slug: "red-wine",
    name: "Red Wine",
    category: "wine",
    price: "€3.00 / glass",
    tagline: "Smooth, medium-bodied house red",
    ingredients: ["Red wine"],
    history: "Our house red — smooth and easy to drink, on its own or with meze.",
  },
  {
    slug: "rose-wine",
    name: "Rose",
    category: "wine",
    price: "€3.00 / glass",
    tagline: "Light, dry house rosé",
    ingredients: ["Rosé wine"],
    history: "Our house rosé — light, dry and perfect for a sunset drink.",
  },
  {
    slug: "wine-carafe",
    name: "1/2 Litre Carafe",
    category: "wine",
    price: "€5.00",
    tagline: "House wine by the carafe, share-sized",
    ingredients: ["House wine"],
    history: "Half a litre of our house wine — good for sharing, or not.",
  },
  {
    slug: "coca-cola",
    name: "Coca-Cola",
    category: "soft-drinks",
    price: "€3.00",
    tagline: "Classic, ice-cold",
    ingredients: [],
    history: "Some things don't need reinventing.",
  },
  {
    slug: "fanta-orange",
    name: "Fanta Orange",
    category: "soft-drinks",
    price: "€3.00",
    tagline: "Fizzy orange soft drink",
    ingredients: [],
    history: "",
  },
  {
    slug: "sprite",
    name: "Sprite",
    category: "soft-drinks",
    price: "€3.00",
    tagline: "Crisp lemon-lime soda",
    ingredients: [],
    history: "",
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
    ingredients: [],
    history: "",
  },
];

export function getItemBySlug(slug: string) {
  return menuItems.find((item) => item.slug === slug);
}

export function getItemsByCategory(categoryId: string) {
  return menuItems.filter((item) => item.category === categoryId);
}

export function getItemsBySubcategory(categoryId: string, subcategoryId: string) {
  return menuItems.filter(
    (item) => item.category === categoryId && item.subcategory === subcategoryId
  );
}

export function getItemsByGroup(categoryId: string, groupId: string) {
  return menuItems.filter(
    (item) => item.category === categoryId && item.group === groupId
  );
}

export function getCategoryById(categoryId: string) {
  return categories.find((cat) => cat.id === categoryId);
}

export function getTagsForItems(items: MenuItem[]): TagId[] {
  const used = new Set<TagId>();
  for (const item of items) {
    item.tags?.forEach((t) => used.add(t));
  }
  return (Object.keys(tagInfo) as TagId[]).filter((id) => used.has(id));
}

export function getTagsForCategory(categoryId: string): TagId[] {
  return getTagsForItems(getItemsByCategory(categoryId));
}
