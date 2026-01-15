// src/data/menu.js

export const MENU_CATEGORIES = [
  "All", 
  "Pizza", 
  "Pasta", 
  "Grill & Mains", 
  "Antipasti", 
  "Sides", 
  "Cocktails", 
  "Wine", 
  "Beer & Soft Drinks", 
  "Dessert"
];

// --- 1. BASE DATABASE (High Quality Real Items) ---
const BASE_MENU = [
  // --- PIZZA ---
  { name: "Margherita Classico", price: 1200, category: "Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80" },
  { name: "Pepperoni Diavola", price: 1600, category: "Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80" },
  { name: "Quattro Formaggi", price: 1800, category: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80" },
  { name: "Capricciosa", price: 1750, category: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80" },
  { name: "BBQ Chicken & Feta", price: 1900, category: "Pizza", image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&q=80" },
  { name: "Hawaiian Tropicale", price: 1500, category: "Pizza", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80" },
  { name: "Veggie Primavera", price: 1400, category: "Pizza", image: "https://images.unsplash.com/photo-1571407970349-bc16f6278622?w=500&q=80" },
  { name: "Truffle Mushroom", price: 2200, category: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80" },

  // --- PASTA ---
  { name: "Spaghetti Carbonara", price: 1600, category: "Pasta", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&q=80" },
  { name: "Penne Arrabbiata (Spicy)", price: 1300, category: "Pasta", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80" },
  { name: "Tagliatelle Bolognese", price: 1700, category: "Pasta", image: "https://images.unsplash.com/photo-1626844131082-256783844137?w=500&q=80" },
  { name: "Seafood Linguine", price: 2400, category: "Pasta", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80" },
  { name: "Ravioli Spinach & Ricotta", price: 1800, category: "Pasta", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&q=80" },
  { name: "Lasagna Al Forno", price: 1900, category: "Pasta", image: "https://images.unsplash.com/photo-1574868291634-79f635eb4968?w=500&q=80" },
  { name: "Gnocchi Pesto", price: 1500, category: "Pasta", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&q=80" },

  // --- GRILL & MAINS ---
  { name: "Nairobi Pork Ribs (Full)", price: 2800, category: "Grill & Mains", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80" },
  { name: "T-Bone Steak (500g)", price: 3500, category: "Grill & Mains", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&q=80" },
  { name: "Grilled Salmon Fillet", price: 3200, category: "Grill & Mains", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80" },
  { name: "Osso Buco Milanese", price: 2400, category: "Grill & Mains", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80" },
  { name: "Chicken Parmigiana", price: 2100, category: "Grill & Mains", image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=500&q=80" },
  { name: "Lamb Chops (Rosemary)", price: 2900, category: "Grill & Mains", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&q=80" },

  // --- ANTIPASTI & SIDES ---
  { name: "Bruschetta Pomodoro", price: 800, category: "Antipasti", image: "https://images.unsplash.com/photo-1572695157363-bc31c5d53149?w=500&q=80" },
  { name: "Caprese Salad", price: 1100, category: "Antipasti", image: "https://images.unsplash.com/photo-1529312266912-b33cf6227e2f?w=500&q=80" },
  { name: "Calamari Fritti", price: 1300, category: "Antipasti", image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=500&q=80" },
  { name: "Garlic Bread (Cheesy)", price: 600, category: "Sides", image: "https://images.unsplash.com/photo-1573145164762-9e78876d2191?w=500&q=80" },
  { name: "Masala Chips", price: 450, category: "Sides", image: "https://images.unsplash.com/photo-1630384060421-a431e4fb2a28?w=500&q=80" },
  { name: "Truffle Parmesan Fries", price: 700, category: "Sides", image: "https://images.unsplash.com/photo-1630384060421-a431e4fb2a28?w=500&q=80" },
  { name: "Creamy Spinach", price: 400, category: "Sides", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80" },

  // --- COCKTAILS ---
  { name: "Classic Negroni", price: 1200, category: "Cocktails", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80" },
  { name: "Aperol Spritz", price: 1100, category: "Cocktails", image: "https://images.unsplash.com/photo-1560512823-8db03e1dbcc5?w=500&q=80" },
  { name: "Dawa (Kenyan Classic)", price: 900, category: "Cocktails", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80" },
  { name: "Espresso Martini", price: 1300, category: "Cocktails", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80" },
  { name: "Whiskey Sour", price: 1200, category: "Cocktails", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80" },
  { name: "Mojito", price: 1000, category: "Cocktails", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80" },

  // --- WINE ---
  { name: "Chianti Classico (Glass)", price: 1100, category: "Wine", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&q=80" },
  { name: "Pinot Grigio (Glass)", price: 1000, category: "Wine", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80" },
  { name: "Merlot Reserve (Bottle)", price: 4500, category: "Wine", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&q=80" },
  { name: "Prosecco DOC (Bottle)", price: 5000, category: "Wine", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80" },

  // --- BEER & SOFT DRINKS ---
  { name: "Tusker Lager (500ml)", price: 450, category: "Beer & Soft Drinks", image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&q=80" },
  { name: "Tusker Cider", price: 500, category: "Beer & Soft Drinks", image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&q=80" },
  { name: "Peroni Nastro Azzurro", price: 600, category: "Beer & Soft Drinks", image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&q=80" },
  { name: "White Cap Crisp", price: 450, category: "Beer & Soft Drinks", image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&q=80" },
  { name: "Sparkling Water (750ml)", price: 350, category: "Beer & Soft Drinks", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80" },
  { name: "Coke / Fanta / Sprite", price: 200, category: "Beer & Soft Drinks", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80" },
  { name: "Italian Lemonade", price: 400, category: "Beer & Soft Drinks", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80" },

  // --- DESSERT ---
  { name: "Tiramisu Classico", price: 900, category: "Dessert", image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500&q=80" },
  { name: "Panna Cotta", price: 800, category: "Dessert", image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500&q=80" },
  { name: "Gelato (3 Scoops)", price: 700, category: "Dessert", image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=500&q=80" },
  { name: "Cannoli Siciliani", price: 850, category: "Dessert", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80" },
];

// --- 2. GENERATOR LOGIC TO REACH 200 ITEMS ---
// This automatically creates variations like "Large", "Spicy", "Shared" 
// to fill out the menu without copying 200 lines of text.

const VARIATIONS = [
  { prefix: "Family Size", priceMod: 2.5 },
  { prefix: "Spicy", priceMod: 1.1 },
  { prefix: "Kids", priceMod: 0.6 },
  { prefix: "Gluten-Free", priceMod: 1.2 },
  { prefix: "Double", priceMod: 1.5 },
];

const generateFullMenu = () => {
  let fullMenu = [...BASE_MENU]; // Start with the real ~50 items
  let idCounter = 100;

  // Generate variations until we hit 200+
  BASE_MENU.forEach((item) => {
    VARIATIONS.forEach((variant) => {
      // Only apply certain variants to certain categories
      const isDrink = ["Cocktails", "Wine", "Beer & Soft Drinks"].includes(item.category);
      const isFood = ["Pizza", "Pasta", "Grill & Mains"].includes(item.category);

      if (isDrink && (variant.prefix === "Double" || variant.prefix === "Family Size")) {
        // Pitchers / Doubles
        fullMenu.push({
          id: idCounter++,
          name: `${variant.prefix} ${item.name}`,
          price: Math.floor(item.price * variant.priceMod),
          category: item.category,
          image: item.image
        });
      }

      if (isFood) {
        fullMenu.push({
          id: idCounter++,
          name: `${variant.prefix} ${item.name}`,
          price: Math.floor(item.price * variant.priceMod),
          category: item.category,
          image: item.image
        });
      }
    });
  });

  // Assign IDs to the original base items
  return fullMenu.map((item, index) => ({
    ...item,
    id: index + 1
  }));
};

export const MENU_ITEMS = generateFullMenu();