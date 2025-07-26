const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());


require('dotenv').config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  const lang = req.body.language;

  const systemPrompt = `
You are a digital literacy assistant for senior citizens.
Answer in simple, friendly language.
Support both English and Hindi. Reply in ${lang === 'hindi' ? 'Hindi' : 'English'}.
Focus on topics like: basic phone use, internet safety, digital banking, WhatsApp, etc.
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ]
  });

  res.json({ reply: completion.choices[0].message.content });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
