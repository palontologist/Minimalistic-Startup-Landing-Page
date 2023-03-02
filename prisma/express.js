const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware for parsing JSON body
app.use(express.json());

// POST endpoint for subscribing new users
app.post('/subscribe', async (req, res) => {
  const { name, email } = req.body;

  try {
    const subscriber = await prisma.subscriber.create({
      data: {
        name,
        email
      }
    });
    res.status(201).json(subscriber);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error subscribing user');
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
