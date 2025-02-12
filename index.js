const express = require("express");
const app = express();
// require('dotenv').config();  // Add this line for local environment variables
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const line = require("./utils/line");
const gemini = require("./utils/gemini");
const NodeCache = require("node-cache");

const cache = new NodeCache();
const CACHE_IMAGE = "image_";
// const CACHE_CHAT = "chat_";

app.get('/', (req, res) => {
  res.status(200).send('Hello your bot is running!');
});
// Main webhook handler
app.post('/webhook', async (req, res) => {
// exports.webhook = onRequest(async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405).send("Method not allowed");
      return;
    }

    const events = req.body.events;
    for (const event of events) {
      const userId = event.source.userId;
      console.log("Processing event for userID:", userId);

      switch (event.type) {
        case "message":
          switch (event.message.type) {
            case "text":
              await handleTextMessage(event, userId);
              break;
            case "image":
              await handleImageMessage(event, userId);
              break;
            case "sticker":
              await handleStickerMessage(event);
              break;
            default:
              console.log(`Unsupported message type: ${event.message.type}`);
          }
          break;
        default:
          console.log(`Unsupported event type: ${event.type}`);
      }
    }

    res.status(200).end();
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Internal server error");
  }
});


// Handle different types of messages
async function handleTextMessage(event, userId) {
  const prompt = event.message.text;
  let response;

  const cachedImage = cache.get(CACHE_IMAGE + userId);
  
  // if (cachedImage) {
  //   if (isShopRelatedPrompt(prompt)) {
  //     const imgResponse = await gemini.multimodal(prompt, cachedImage);
  //     const askAndImg = prompt + imgResponse;
  //     response = await gemini.suggestShopItems(askAndImg);
  //     await line.reply(event.replyToken, [{ type: "text", text: response }]);
  //     cache.del(CACHE_IMAGE + userId);
  //     return;
  //   }else{
  //     response = await gemini.multimodal(prompt, cachedImage);
  //     await line.reply(event.replyToken, [{ type: "text", text: response }]);
  //     cache.del(CACHE_IMAGE + userId);
  //     return;

  //   }
  // }
  if (cachedImage) {
    response = await gemini.multimodal(prompt, cachedImage);
    if (isShopRelatedPrompt(prompt)) {
      const askAndImg = prompt + response;
      response = await gemini.suggestShopItems(askAndImg);
    }
    await line.reply(event.replyToken, [{ type: "text", text: response }]);
    cache.del(CACHE_IMAGE + userId);
    return;
  }

  if (isShopRelatedPrompt(prompt)) {
    response = await gemini.suggestShopItems(prompt);
    await line.reply(event.replyToken, [{ type: "text", text: response }]);
    return;
  }

  response = await gemini.chat(event.message.text);
  // response = await gemini.textOnly(event.message.text);
  await line.reply(event.replyToken, [{ type: "text", text: response }]);


}

function isShopRelatedPrompt(prompt) {
  const shopKeywords = [
    "รายการสินค้า", "รายการสินค้าทั้งหมด", "สินค้า", "สินค้าทั้งหมด", 
    "ขายอะไร", "ขายไร", "ขายอะไรบ้าง", "ขายไรบ้าง", "อะไรบ้าง",
    "มีสินค้าอะไรบ้าง", "มีอะไรบ้าง", "มีอะไรขายบ้าง", "มีอะไรให้ซื้อบ้าง",
    "แนะนำสินค้า", "มีกี่ชิ้น", "มีจำนวนเท่าไหร่", "เหลือไหม", "เหลือเยอะไหม", "มีเหลือไหม", "มีเหลือเยอะไหม", "มีขายไหม"
  ];
  if (shopKeywords.some(keyword => prompt.includes(keyword))) {
    return true;
  }

  // const pattern = /มี.*ไหม/;
  // return pattern.test(prompt);
}

async function handleImageMessage(event, userId) {
  const imageBinary = await line.getImageBinary(event.message.id);
  const base64Image = Buffer.from(imageBinary).toString('base64');
  cache.set(CACHE_IMAGE + userId, base64Image, 300); 
  
  // const response = "I've received your image. What would you like to know about it?";
  // await line.reply(event.replyToken, [{ type: "text", text: response }]);
}

async function handleStickerMessage(event) {
  const stickerResponse = {
    type: "sticker",
    packageId: "11537",  
    stickerId: "52002734" 
  };
  const textResponse = {
    type: "text",
    text: "อบคุณสำหรับสติกเกอร์นะ! 😊 น่ารักจังเลย!"
  };

  await line.reply(event.replyToken, [stickerResponse, textResponse]);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the webhook at http://localhost:${PORT}/webhook`);
});
