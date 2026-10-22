/*
 * Populates your MongoDB database with sample products.
 *
 *   1. Set MONGO_URL in .env to YOUR Atlas connection string
 *   2. Run:  node scripts/seed.js
 *
 * Replaces existing products of the same kind (safe to re-run).
 */
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// Load MONGO_URL straight from .env (no dotenv dependency needed)
const envPath = path.join(__dirname, "..", ".env");
const envFile = fs.readFileSync(envPath, "utf8");
const match = envFile.match(/^MONGO_URL\s*=\s*(.+)$/m);
if (!match) {
  console.error("MONGO_URL not found in .env");
  process.exit(1);
}
const MONGO_URL = match[1].trim();

const { default: Product } = require("../models/Product");
const { default: Product1 } = require("../models/Product1");
const { default: Product2 } = require("../models/Product2");

const u = (id) => `https://images.unsplash.com/${id}?w=500&h=500&fit=crop`;

const pizzas = [
  {
    title: "Margherita",
    desc: "Classic tomato sauce, fresh mozzarella and basil.",
    img: u("photo-1574071318508-1cdbab80d002"),
    prices: [250, 400, 550],
    extraOptions: [
      { text: "Extra cheese", price: 60 },
      { text: "Oregano", price: 20 },
    ],
  },
  {
    title: "Veggie Supreme",
    desc: "Bell peppers, onions, olives, mushrooms and corn.",
    img: u("photo-1513104890138-7c749659a591"),
    prices: [300, 450, 600],
    extraOptions: [{ text: "Extra cheese", price: 60 }],
  },
  {
    title: "Farm House",
    desc: "Loaded with garden veggies and a cheesy blend.",
    img: u("photo-1595854341625-f33ee10dbf94"),
    prices: [320, 480, 640],
    extraOptions: [{ text: "Stuffed crust", price: 100 }],
  },
  {
    title: "Pepperoni Classic",
    desc: "Double pepperoni with mozzarella and spicy tomato sauce.",
    img: u("photo-1565299624946-b28f40a0ae38"),
    prices: [350, 520, 680],
    extraOptions: [
      { text: "Extra cheese", price: 60 },
      { text: "Extra pepperoni", price: 80 },
    ],
  },
  {
    title: "BBQ Chicken Pizza",
    desc: "Smoky BBQ chicken, onions, capsicum and mozzarella.",
    img: u("photo-1593560708920-61dd98c46a4e"),
    prices: [380, 550, 720],
    extraOptions: [{ text: "Cheesy dip", price: 40 }],
  },
  {
    title: "Four Cheese Overload",
    desc: "Mozzarella, cheddar, gouda and parmesan in one bite.",
    img: u("photo-1571407970349-bc81e7e96d47"),
    prices: [420, 600, 780],
    extraOptions: [
      { text: "Extra cheese", price: 60 },
      { text: "Garlic crust", price: 80 },
    ],
  },
  {
    title: "Chilli Paneer Pizza",
    desc: "Fire-roasted paneer cubes with peppers on a tangy base.",
    img: u("photo-1555072956-7758afb20e8f"),
    prices: [340, 500, 660],
    extraOptions: [{ text: "Extra spicy", price: 30 }],
  },
  {
    title: "Corn & Cheese Burst",
    desc: "Sweet corn delight with a molten cheese centre.",
    img: u("photo-1594007654729-407eedc4be65"),
    prices: [280, 430, 580],
    extraOptions: [{ text: "Extra corn", price: 35 }],
  },
  {
    title: "Chicken Tikka Pizza",
    desc: "Tandoori chicken tikka with onion and mint drizzle.",
    img: u("photo-1604382354936-07c5d9983bd3"),
    prices: [390, 560, 730],
    extraOptions: [
      { text: "Mint mayo dip", price: 35 },
      { text: "Extra tikka", price: 70 },
    ],
  },
  {
    title: "Tandoori Paneer Pizza",
    desc: "Clay-oven paneer, onion rings and coriander.",
    img: u("photo-1590947132387-155cc02f3212"),
    prices: [360, 530, 690],
    extraOptions: [{ text: "Extra paneer", price: 60 }],
  },
];

const burgers = [
  {
    title: "Classic Cheeseburger",
    desc: "Juicy patty with cheddar, lettuce and house sauce.",
    img: u("photo-1568901346375-23c9450c58cd"),
    prices: [180, 250],
    extraOptions: [{ text: "Double patty", price: 90 }],
  },
  {
    title: "All American Burger",
    desc: "Grilled patty, tomato, pickles and secret sauce.",
    img: u("photo-1550547660-d9450f859349"),
    prices: [200, 270],
    extraOptions: [{ text: "Extra cheese", price: 40 }],
  },
  {
    title: "Peri Peri Chicken Burger",
    desc: "Spicy peri peri grilled chicken with crunchy lettuce.",
    img: u("photo-1594212699903-ec8a3eca50f5"),
    prices: [220, 290],
    extraOptions: [{ text: "Extra spicy", price: 30 }],
  },
  {
    title: "Double Patty Zinger",
    desc: "Two crispy zinger fillets with garlic mayo.",
    img: u("photo-1561758033-d89a9ad46330"),
    prices: [260, 340],
    extraOptions: [{ text: "Extra mayo", price: 25 }],
  },
  {
    title: "Mushroom Melt Burger",
    desc: "Juicy patty topped with sauteed mushrooms and melted cheese.",
    img: u("photo-1571091718767-18b5b1457add"),
    prices: [230, 300],
    extraOptions: [
      { text: "Extra cheese", price: 40 },
      { text: "Extra mushrooms", price: 50 },
    ],
  },
  {
    title: "BBQ Bean Burger",
    desc: "Smoky BBQ glazed beans patty with crispy onions.",
    img: u("photo-1553979459-d2229ba7433b"),
    prices: [190, 260],
    extraOptions: [{ text: "Cheese slice", price: 30 }],
  },
  {
    title: "Spicy Jalapeno Burger",
    desc: "Fire it up with jalapenos, pepper jack and chipotle mayo.",
    img: u("photo-1551782450-a2132b4ba21d"),
    prices: [210, 280],
    extraOptions: [{ text: "Extra jalapeno", price: 25 }],
  },
  {
    title: "Chicken Maharaja",
    desc: "Double chicken patties, lettuce, and tandoori mayo.",
    img: u("photo-1550317138-10000687a72b"),
    prices: [270, 350],
    extraOptions: [{ text: "Triple decker", price: 80 }],
  },
  {
    title: "Crispy Chicken Deluxe",
    desc: "Golden fried chicken thigh with slaw and ranch.",
    img: u("photo-1572802419224-296b0aeee0d9"),
    prices: [240, 310],
    extraOptions: [{ text: "Extra ranch", price: 25 }],
  },
  {
    title: "Paneer Tikka Burger",
    desc: "Grilled paneer patty with mint chutney.",
    img: u("photo-1586816001966-79b736744398"),
    prices: [250, 320],
    extraOptions: [{ text: "Extra paneer", price: 60 }],
  },
];

const beverages = [
  {
    title: "Cold Coffee",
    desc: "Chilled classic cold brew with cream.",
    img: u("photo-1461023058943-07fcbe16d735"),
    prices: [99, 149],
    extraOptions: [{ text: "Extra shot", price: 30 }],
  },
  {
    title: "Iced Latte",
    desc: "Smooth espresso over milk and ice.",
    img: u("photo-1470337458703-46ad1756a187"),
    prices: [109, 159],
    extraOptions: [{ text: "Caramel syrup", price: 25 }],
  },
  {
    title: "Cola Fizz",
    desc: "Classic chilled cola over crushed ice.",
    img: u("photo-1554866585-cd94860890b7"),
    prices: [59, 89],
    extraOptions: [],
  },
  {
    title: "Mango Smoothie",
    desc: "Fresh mango blended with creamy milk and honey.",
    img: u("photo-1525385133512-2f3bdd039054"),
    prices: [109, 149],
    extraOptions: [{ text: "Extra honey", price: 20 }],
  },
  {
    title: "Fresh Lime Soda",
    desc: "Cool soda with fresh lime and a hint of mint.",
    img: u("photo-1556881286-fc6915169721"),
    prices: [69, 99],
    extraOptions: [{ text: "Extra masala", price: 15 }],
  },
  {
    title: "Masala Chai",
    desc: "Slow-brewed chai with cardamom and ginger.",
    img: u("photo-1571934811356-5cc061b6821f"),
    prices: [49, 79],
    extraOptions: [{ text: "Extra adrak", price: 10 }],
  },
  {
    title: "Cappuccino",
    desc: "Rich espresso topped with velvety foam.",
    img: u("photo-1502462041640-b3d7e50d0662"),
    prices: [89, 119],
    extraOptions: [{ text: "Extra foam", price: 15 }],
  },
  {
    title: "Virgin Mojito",
    desc: "Mint, lime and sparkling soda over crushed ice.",
    img: u("photo-1513558161293-cdaf765ed2fd"),
    prices: [129, 169],
    extraOptions: [{ text: "Extra lemon", price: 10 }],
  },
  {
    title: "Blackberry Mint Cooler",
    desc: "Blackberry fizz with orange and fresh mint.",
    img: u("photo-1536935338788-846bb9981813"),
    prices: [99, 129],
    extraOptions: [{ text: "Extra mint", price: 10 }],
  },
  {
    title: "Berry Blast Smoothie",
    desc: "Raspberries, blueberries and yogurt blended thick.",
    img: u("photo-1553530666-ba11a7da3888"),
    prices: [119, 159],
    extraOptions: [{ text: "Chia seeds", price: 20 }],
  },
];

(async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    await Promise.all([
      Product.deleteMany({}),
      Product1.deleteMany({}),
      Product2.deleteMany({}),
    ]);
    await Promise.all([
      Product.insertMany(pizzas),
      Product1.insertMany(burgers),
      Product2.insertMany(beverages),
    ]);

    console.log("Seeded:", pizzas.length, "pizzas,", burgers.length, "burgers,", beverages.length, "beverages");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
})();
