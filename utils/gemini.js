const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const context = require("./context");

class Gemini {
  constructor() {
    this.multimodalModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    // this.chatModel = genAI.getGenerativeModel({ model: "gemini-pro" });
    this.chatModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  async textOnly(prompt) {
    const result = await this.chatModel.generateContent(prompt);
    return result.response.text();
  }

  async suggestShopItems(prompt) {
    const parts = [{
      text: "แนะนำสินค้าจากรายการเหล่านี้ โดยใช้ข้อมูลคลังสินค้าของร้านจาก JSON: name, brand, price, category, stock \n" + JSON.stringify(context.shopItems_json) + "\nและต้องตอบกลับเป็นภาษาที่เป็นกันเองเเหมือนคนขายคุยกับลูกค้า"
    }];
    const result = await this.chatModel.generateContent([prompt, ...parts]);
    return result.response.text();
  }

  async multimodal(prompt, base64Image) {
    const mimeType = "image/png";
    const imageParts = [{
      inlineData: { data: base64Image, mimeType }
    }];
    const result = await this.multimodalModel.generateContent([prompt, ...imageParts]);
    return result.response.text();
  }

  async chat(prompt) {
    const chat = this.chatModel.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "สวัสดี" }]
        },
        {
          role: "model",
          parts: [{ text: "สวัสดีครับ ผมชื่อเหมียว ผมเป็นผู้ช่วยให้คำแนะนำสำหรับสินค้าภายในร้านค้าแห่งนี้ครับ" }]
        },
        {
          role: "user",
          parts: [{ text: "มีสินค้าอะไรบ้าง" }]
        },
        {
          role: "model",
          parts: [{ text: "ตอบคำถามเกี่ยวกับสินค้าที่มีภายในร้าน โดยใช้ข้อมูลคลังสินค้าของร้านจาก CSV: name, brand, price, category, stock \n" + context.shop_items_csv + "\nและต้องตอบกลับเป็นภาษาที่เป็นกันเองเเหมือนคนขายคุยกับลูกค้า" }]
        },
        {
          role: "user",
          parts: [{ text: "มีสินค้านี้ไหม" }]
        },
        {
          role: "model",
          parts: [{ text: "ตอบว่ามีสินค้านั้นภายในร้านหรือไม่ โดยใช้ข้อมูลคลังสินค้าของร้านจาก CSV: name, brand, price, category, stock \n" + context.shop_items_csv + "\nและต้องตอบกลับเป็นภาษาที่เป็นกันเองเเหมือนคนขายคุยกับลูกค้า" }]
        },
      ]
    });
    const result = await chat.sendMessage(prompt);
    return result.response.text();
  }

  //   async chat(cacheChatHistory, prompt) {
  //     const initialMessage = {
  //       role: "model",
  //       parts: [{ text: "สวัสดีครับ ผมชื่อเหมียว ผมเป็นผู้ช่วยให้คำแนะนำสำหรับสินค้าภายในร้านค้าแห่งนี้ครับ" }]
  //     };

  //     const chatHistory = [
  //       {
  //         role: "user",
  //         parts: [{ text: "ตอบคำถามเฉพาะที่เกี่ยวกับสินค้าที่มีภายในร้านเท่านั้นและใช้ถ้อยคำที่สุภาพให้เหมาะกับงานบริการลูกค้า โดยคำตอบให้อ้างอิงข้อมูลของ CSV: name, brand, price, category \n" + context.shop_items_csv }]
  //       },
  //       initialMessage
  //     ];

  //     if (cacheChatHistory.length > 0) {
  //       chatHistory.push(...cacheChatHistory);
  //     }

  //     const chat = this.chatModel.startChat(chatHistory);
  //     const result = await chat.sendMessage(prompt);
  //     return result.response.text();
  //   }
}

module.exports = new Gemini();