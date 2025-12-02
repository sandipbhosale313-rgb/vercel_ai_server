import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST API
app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message; // <-- SINGLE message

    if (!message) {
      return res.status(400).json({ error: "Message missing!" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    return res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.log("SERVER ERROR:", error);
    return res.status(500).json({ error: "Server crashed!" });
  }
});

// PORT (Vercel auto)
app.listen(3000, () => console.log("Server running on 3000"));
export default app;