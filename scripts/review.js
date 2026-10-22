/*
 * Local review setup: starts a temporary in-memory MongoDB, seeds it with
 * sample products, and starts the Next.js server against it.
 *   Usage:  node scripts/review.js
 * Everything lives only in RAM — restarting resets the data.
 */
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { spawn } = require("child_process");
const { MongoMemoryServer } = require("mongodb-memory-server");

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
    title: "Veggie Burger",
    desc: "Crispy veg patty, tomatoes and mayo.",
    img: u("photo-1520072959219-c595dc87015d"),
    prices: [150, 220],
    extraOptions: [{ text: "Extra cheese", price: 40 }],
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
    title: "Mango Shake",
    desc: "Fresh Alphonso mango blended with milk.",
    img: u("photo-1469278448535-f9a2cd6bee6b"),
    prices: [89, 129],
    extraOptions: [],
  },
];

(async () => {
  console.log("Starting in-memory MongoDB (first run downloads a binary, please wait)...");
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri("restaurant");
  console.log("In-memory MongoDB ready:", uri);

  await mongoose.connect(uri);
  await Promise.all([
    Product.insertMany(pizzas),
    Product1.insertMany(burgers),
    Product2.insertMany(beverages),
  ]);
  await mongoose.disconnect();
  console.log("Seeded sample products.");

  const nextBin = path.join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextBin, "start"], {
    stdio: "inherit",
    env: { ...process.env, MONGO_URL: uri, PORT: "3000" },
  });
  child.on("exit", async () => {
    await mongod.stop();
    process.exit(0);
  });
})();
