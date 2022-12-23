require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

app.post('/', async (req, res) => {
  const { source, lenguaje, text } = req.body;
  
  const configuration = new Configuration({
    apiKey: process.env.YOUR_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Translate this into 1. ${lenguaje} 2. Persa :\n\n${text}\n\n1.`,
    temperature: 0.81,
    max_tokens: text.length,
  });
  console.log(response.data.choices);
  console.log(lenguaje, text, text.length);
  res.json({ data: response.data.choices });
});

async function start() {
  app.listen(PORT, () => {
    console.log(`🚀. Server ready at: http://localhost:${PORT}  .🚀`);
  });
}
start();
