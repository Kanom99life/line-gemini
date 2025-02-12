const shopItems_json = [
  { "name": "iPhone 15 Pro Max", "brand": "Apple", "price": "48,900 THB", "category": "Smartphone", "stock": 10 },
  { "name": "Samsung Galaxy S24 Ultra", "brand": "Samsung", "price": "43,900 THB", "category": "Smartphone", "stock": 15 },
  { "name": "MacBook Air M2", "brand": "Apple", "price": "39,900 THB", "category": "Laptop", "stock": 2 },
  { "name": "Asus ROG Zephyrus G14", "brand": "Asus", "price": "56,900 THB", "category": "Laptop", "stock": 5 },
  { "name": "Sony WH-1000XM5", "brand": "Sony", "price": "12,900 THB", "category": "Headphone", "stock": 9 },
  { "name": "Nintendo Switch OLED", "brand": "Nintendo", "price": "13,900 THB", "category": "Gaming Console", "stock": 4 },
  { "name": "Dell XPS 15", "brand": "Dell", "price": "67,900 THB", "category": "Laptop", "stock": 6 },
  { "name": "HP Spectre x360", "brand": "HP", "price": "49,900 THB", "category": "Laptop", "stock": 3 },
  { "name": "Bose QuietComfort 45", "brand": "Bose", "price": "11,900 THB", "category": "Headphone", "stock": 7 },
  { "name": "PlayStation 5", "brand": "Sony", "price": "19,900 THB", "category": "Gaming Console", "stock": 8 },
  { "name": "Xbox Series X", "brand": "Microsoft", "price": "22,900 THB", "category": "Gaming Console", "stock": 6 },
  { "name": "Google Pixel 7 Pro", "brand": "Google", "price": "37,900 THB", "category": "Smartphone", "stock": 12 },
  { "name": "OnePlus 11", "brand": "OnePlus", "price": "29,900 THB", "category": "Smartphone", "stock": 10 },
  { "name": "DJI Mini 3 Pro", "brand": "DJI", "price": "28,900 THB", "category": "Drone", "stock": 5 },
  { "name": "Samsung Galaxy Tab S8", "brand": "Samsung", "price": "34,900 THB", "category": "Tablet", "stock": 9 },
  { "name": "iPad Pro M2", "brand": "Apple", "price": "41,900 THB", "category": "Tablet", "stock": 6 },
  { "name": "Garmin Fenix 7X", "brand": "Garmin", "price": "29,900 THB", "category": "Smartwatch", "stock": 8 },
  { "name": "Apple Watch Ultra", "brand": "Apple", "price": "31,900 THB", "category": "Smartwatch", "stock": 4 },
  { "name": "Razer DeathAdder V3 Pro", "brand": "Razer", "price": "4,900 THB", "category": "Gaming Mouse", "stock": 10 },
  { "name": "Logitech MX Master 3S", "brand": "Logitech", "price": "3,900 THB", "category": "Mouse", "stock": 12 },
  { "name": "Corsair K70 RGB Pro", "brand": "Corsair", "price": "6,900 THB", "category": "Keyboard", "stock": 7 },
  { "name": "SteelSeries Apex Pro", "brand": "SteelSeries", "price": "8,900 THB", "category": "Keyboard", "stock": 5 }
];

const shop_items_csv =
  "iPhone 15 Pro Max, Apple, 48,900 THB, Smartphone, 10\n" +
  "Samsung Galaxy S23 Ultra, Samsung, 43,900 THB, Smartphone, 15\n" +
  "MacBook Air M2, Apple, 39,900 THB, Laptop, 2\n" +
  "Asus ROG Zephyrus G14, Asus, 56,900 THB, Laptop, 5\n" +
  "Sony WH-1000XM5, Sony, 12,900 THB, Headphone, 9\n" +
  "Nintendo Switch OLED, Nintendo, 13,900 THB, Gaming Console, 4\n" +
  "Dell XPS 15, Dell, 67,900 THB, Laptop, 6\n" +
  "HP Spectre x360, HP, 49,900 THB, Laptop, 3\n" +
  "Bose QuietComfort 45, Bose, 11,900 THB, Headphone, 7\n" +
  "PlayStation 5, Sony, 19,900 THB, Gaming Console, 8\n" +
  "Xbox Series X, Microsoft, 22,900 THB, Gaming Console, 6\n" +
  "Google Pixel 7 Pro, Google, 37,900 THB, Smartphone, 12\n" +
  "OnePlus 11, OnePlus, 29,900 THB, Smartphone, 10\n" +
  "DJI Mini 3 Pro, DJI, 28,900 THB, Drone, 5\n" +
  "Samsung Galaxy Tab S8, Samsung, 34,900 THB, Tablet, 9\n" +
  "iPad Pro M2, Apple, 41,900 THB, Tablet, 6\n" +
  "Garmin Fenix 7X, Garmin, 29,900 THB, Smartwatch, 8\n" +
  "Apple Watch Ultra, Apple, 31,900 THB, Smartwatch, 4\n" +
  "Razer DeathAdder V3 Pro, Razer, 4,900 THB, Gaming Mouse, 10\n" +
  "Logitech MX Master 3S, Logitech, 3,900 THB, Mouse, 12\n" +
  "Corsair K70 RGB Pro, Corsair, 6,900 THB, Keyboard, 7\n" +
  "SteelSeries Apex Pro, SteelSeries, 8,900 THB, Keyboard, 5";

module.exports = { shopItems_json, shop_items_csv };
