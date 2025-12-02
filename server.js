import express from "express";
import cors from "cors";
import { OpenAI } from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;   // <-- Flutter मधून "message" येईल

    if (!userMessage) {
      return res.status(400).json({ error: "Message missing" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: userMessage },
      ],
    });

    const reply = completion.choices[0].message.content;

    return res.json({ reply });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: err.toString() });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));