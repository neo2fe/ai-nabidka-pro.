import OpenAI from "openai";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

app.post("/generate", async (req, res) => {
  const { popis } = req.body;

  const prompt = `
Rozepsat jednotlivé práce pro zakázku: "${popis}".
Vypiš konkrétní kroky, logické pořadí a stručný popis každé práce.
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });

  res.json({
    vysledek: response.choices[0].message.content
  });
});

app.listen(3001, () => console.log("AI server běží na portu 3001"));
