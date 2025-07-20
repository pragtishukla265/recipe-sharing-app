const express = require('express');
const Recipe = require('../models/Recipe');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const { title, description, ingredients, imageUrl, difficulty } = req.body;

  const recipe = new Recipe({
    title,
    description,
    ingredients,
    imageUrl,
    difficulty,
    createdBy: req.user.userId
  });

  try {
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

